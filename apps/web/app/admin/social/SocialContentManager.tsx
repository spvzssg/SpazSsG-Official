'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabase/client'

type SocialItem = { id: string; platform: string; external_id: string | null; title: string | null; description: string | null; thumbnail_url: string | null; embed_url: string | null; content_url: string; posted_at: string | null; is_featured: boolean; is_published: boolean; display_order: number }
const empty = { platform: 'instagram', external_id: '', title: '', description: '', thumbnail_url: '', embed_url: '', content_url: '', posted_at: '', is_featured: false, is_published: false }
const platforms = ['instagram', 'tiktok', 'youtube', 'twitch', 'facebook', 'other']
const httpsOrEmpty = (value: string) => !value.trim() || /^https:\/\//i.test(value.trim())

export default function SocialContentManager({ initial }: { initial: SocialItem[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initial)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  function edit(item: SocialItem) {
    setEditingId(item.id)
    setForm({ platform: item.platform, external_id: item.external_id ?? '', title: item.title ?? '', description: item.description ?? '', thumbnail_url: item.thumbnail_url ?? '', embed_url: item.embed_url ?? '', content_url: item.content_url, posted_at: item.posted_at ? new Date(item.posted_at).toISOString().slice(0, 16) : '', is_featured: item.is_featured, is_published: item.is_published })
    setError('')
    setMessage('Editing social item.')
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      if (!httpsOrEmpty(form.thumbnail_url) || !httpsOrEmpty(form.embed_url) || !httpsOrEmpty(form.content_url)) throw new Error('Content, embed, and thumbnail links must use HTTPS.')
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const values = { platform: form.platform, external_id: form.external_id.trim() || null, title: form.title.trim() || null, description: form.description.trim() || null, thumbnail_url: form.thumbnail_url.trim() || null, embed_url: form.embed_url.trim() || null, content_url: form.content_url.trim(), posted_at: form.posted_at ? new Date(form.posted_at).toISOString() : null, is_featured: form.is_featured, is_published: form.is_published }
      const { data: savedId, error: saveError } = await supabase.rpc('admin_upsert_social_content', { p_content: values, p_content_id: editingId })
      if (saveError || !savedId) throw new Error(saveError?.message ?? 'Could not save social item.')
      const saved = { id: savedId, ...values, display_order: 0 } as SocialItem
      setItems((current) => editingId ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current])
      setEditingId(null)
      setForm(empty)
      setMessage('Social item saved.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save social item.')
    } finally {
      setBusy(false)
    }
  }

  async function remove(item: SocialItem) {
    if (!window.confirm(`Delete “${item.title || item.platform}”? This cannot be undone.`)) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: deleteError } = await supabase.rpc('admin_delete_social_content', { p_content_id: item.id })
      if (deleteError) throw new Error(deleteError.message)
      setItems((current) => current.filter((existing) => existing.id !== item.id))
      setMessage('Social item deleted.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete social item.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="release-manager">
    <section className="admin-card"><h2>{editingId ? 'Edit social content' : 'Add social content'}</h2>
      <form className="cms-form" onSubmit={save}>
        <label htmlFor="social-platform">Platform</label><select id="social-platform" value={form.platform} onChange={(event) => setForm({ ...form, platform: event.target.value })}>{platforms.map((platform) => <option key={platform} value={platform}>{platform}</option>)}</select>
        <label htmlFor="social-title">Title</label><input id="social-title" maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <label htmlFor="social-description">Description</label><textarea id="social-description" rows={3} maxLength={5000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <label htmlFor="social-content-url">Original content URL</label><input id="social-content-url" type="url" required placeholder="https://…" value={form.content_url} onChange={(event) => setForm({ ...form, content_url: event.target.value })} />
        <label htmlFor="social-embed-url">Embed URL (optional)</label><input id="social-embed-url" type="url" placeholder="Official embeddable URL" value={form.embed_url} onChange={(event) => setForm({ ...form, embed_url: event.target.value })} />
        <label htmlFor="social-thumbnail">Thumbnail URL (optional)</label><input id="social-thumbnail" type="url" placeholder="https://…" value={form.thumbnail_url} onChange={(event) => setForm({ ...form, thumbnail_url: event.target.value })} />
        <label htmlFor="social-date">Publication date</label><input id="social-date" type="datetime-local" value={form.posted_at} onChange={(event) => setForm({ ...form, posted_at: event.target.value })} />
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} /> Feature on the website</label>
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} /> Publish this item</label>
        {error && <p className="admin-form-error" role="alert">{error}</p>}{message && <p className="admin-form-message" role="status">{message}</p>}
        <div className="hero__actions"><button className="button" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Add content'}</button>{editingId && <button className="button button--ghost" type="button" disabled={busy} onClick={() => { setEditingId(null); setForm(empty); setMessage('') }}>Cancel</button>}</div>
      </form>
    </section>
    <section className="admin-card"><h2>Social content</h2>{items.length === 0 ? <p className="muted">No social content yet.</p> : <div className="release-list">{items.map((item) => <article className="release-row" key={item.id}><div><h3>{item.title || item.platform}</h3><p className="muted">{item.platform} · {item.is_published ? 'Published' : 'Draft'}{item.is_featured ? ' · Featured' : ''}{item.posted_at ? ` · ${new Date(item.posted_at).toLocaleDateString()}` : ''}</p><a className="text-link" href={item.content_url} target="_blank" rel="noreferrer">Open original ↗</a></div><div className="release-row__actions"><button className="button button--ghost" type="button" disabled={busy} onClick={() => edit(item)}>Edit</button><button className="button button--danger" type="button" disabled={busy} onClick={() => remove(item)}>Delete</button></div></article>)}</div>}</section>
  </div>
}
