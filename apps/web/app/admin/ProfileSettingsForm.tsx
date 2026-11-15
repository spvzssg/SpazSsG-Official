'use client'

import { useState, type FormEvent } from 'react'
import { createSupabaseBrowserClient } from '../../lib/supabase/client'

type Profile = { bio: string; mission: string; display_name: string }

export default function ProfileSettingsForm({ initial }: { initial: Profile }) {
  const [form, setForm] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: saveError } = await supabase.rpc('admin_update_artist_profile', { p_value: form })
      if (saveError) throw new Error(saveError.message)
      setMessage('Artist profile saved.')
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save artist profile.')
    } finally {
      setBusy(false)
    }
  }

  return <form className="admin-card cms-form" onSubmit={save}>
    <h2>Artist profile</h2>
    <label htmlFor="artist-display-name">Display name</label><input id="artist-display-name" value={form.display_name} readOnly aria-describedby="artist-name-note" />
    <p className="muted" id="artist-name-note">The official display name remains Spaz SsG; edit the bio and mission below.</p>
    <label htmlFor="artist-bio">Artist biography</label><textarea id="artist-bio" rows={6} maxLength={5000} value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} />
    <label htmlFor="artist-mission">Artist mission</label><textarea id="artist-mission" rows={4} maxLength={2000} value={form.mission} onChange={(event) => setForm({ ...form, mission: event.target.value })} />
    {error && <p className="admin-form-error" role="alert">{error}</p>}{message && <p className="admin-form-message" role="status">{message}</p>}
    <button className="button" disabled={busy}>{busy ? 'Saving…' : 'Save artist profile'}</button>
  </form>
}
