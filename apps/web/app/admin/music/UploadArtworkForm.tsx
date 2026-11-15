'use client'

import { useRef, useState, type FormEvent } from 'react'
import { createSupabaseBrowserClient } from '../../../lib/supabase/client'

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
const maxBytes = 10 * 1024 * 1024

export default function UploadArtworkForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setMessage('')
    const file = inputRef.current?.files?.[0]
    if (!file) return setError('Select an image to upload.')
    if (!allowedTypes.includes(file.type)) return setError('Use a JPEG, PNG, WebP, or AVIF image.')
    if (file.size > maxBytes) return setError('Image must be 10 MB or smaller.')

    const signatureBytes = new Uint8Array(await file.slice(0, 12).arrayBuffer())
    const png = signatureBytes[0] === 0x89 && signatureBytes[1] === 0x50 && signatureBytes[2] === 0x4e && signatureBytes[3] === 0x47
    const jpeg = signatureBytes[0] === 0xff && signatureBytes[1] === 0xd8 && signatureBytes[2] === 0xff
    const webp = String.fromCharCode(...signatureBytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...signatureBytes.slice(8, 12)) === 'WEBP'
    const avif = String.fromCharCode(...signatureBytes.slice(4, 12)).includes('ftypavif') || String.fromCharCode(...signatureBytes.slice(4, 12)).includes('ftypavis')
    if (!png && !jpeg && !webp && !avif) return setError('This file does not appear to be a supported image.')

    setBusy(true)
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const extension = file.type === 'image/jpeg' ? 'jpg' : file.type.split('/')[1]
      const path = `release-art/${crypto.randomUUID()}.${extension}`
      const { error: uploadError } = await supabase.storage.from('website-media').upload(path, file, { contentType: file.type, upsert: false })
      if (uploadError) throw new Error(uploadError.message)
      const { data } = supabase.storage.from('website-media').getPublicUrl(path)
      setUrl(data.publicUrl)
      setMessage('Artwork uploaded. Copy its URL into the release cover artwork field.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Upload failed.')
    } finally {
      setBusy(false)
    }
  }

  return <form className="admin-card cms-form" onSubmit={upload}>
    <h2>Upload cover artwork</h2>
    <p className="muted">JPEG, PNG, WebP or AVIF, up to 10 MB. Admin authorization is enforced by Supabase Storage policies.</p>
    <label htmlFor="artwork-file">Image file</label>
    <input ref={inputRef} id="artwork-file" type="file" accept="image/jpeg,image/png,image/webp,image/avif" required />
    <button className="button" type="submit" disabled={busy}>{busy ? 'Uploading…' : 'Upload image'}</button>
    {error && <p className="admin-form-error" role="alert">{error}</p>}
    {message && <p className="admin-form-message" role="status">{message}</p>}
    {url && <div><label htmlFor="uploaded-art-url">Uploaded image URL</label><input id="uploaded-art-url" readOnly value={url} onFocus={(event) => event.currentTarget.select()} /></div>}
  </form>
}
