'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabase/client'

type Stream = { id: string; platform: string; title: string; description: string | null; scheduled_at: string | null; started_at: string | null; ended_at: string | null; live_verified_at: string | null; stream_url: string | null; embed_url: string | null; thumbnail_url: string | null; vod_url: string | null; is_published: boolean }
const empty = { platform: 'twitch', title: '', description: '', scheduled_at: '', stream_url: '', embed_url: '', thumbnail_url: '', vod_url: '', is_published: false }
const isHttpsOrEmpty = (value: string) => !value.trim() || /^https:\/\//i.test(value.trim())
const liveVerified = (stream: Stream) => Boolean(stream.live_verified_at && !stream.ended_at && Date.now() - new Date(stream.live_verified_at).getTime() < 300000)

export default function LivestreamManager({ initial }: { initial: Stream[] }) {
  const router = useRouter()
  const [streams, setStreams] = useState(initial)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function edit(stream: Stream) {
    setEditingId(stream.id)
    setForm({ platform: stream.platform, title: stream.title, description: stream.description ?? '', scheduled_at: stream.scheduled_at ? new Date(stream.scheduled_at).toISOString().slice(0, 16) : '', stream_url: stream.stream_url ?? '', embed_url: stream.embed_url ?? '', thumbnail_url: stream.thumbnail_url ?? '', vod_url: stream.vod_url ?? '', is_published: stream.is_published })
    setError('')
    setMessage('Editing schedule. Live status must be separately verified by an admin.')
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      if (![form.stream_url, form.embed_url, form.thumbnail_url, form.vod_url].every(isHttpsOrEmpty)) throw new Error('Stream, embed, thumbnail, and archive URLs must use HTTPS.')
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const values = { platform: form.platform, title: form.title.trim(), description: form.description.trim() || null, scheduled_at: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null, stream_url: form.stream_url.trim() || null, embed_url: form.embed_url.trim() || null, thumbnail_url: form.thumbnail_url.trim() || null, vod_url: form.vod_url.trim() || null, is_published: form.is_published }
      const { data: savedId, error: saveError } = await supabase.rpc('admin_upsert_livestream', { p_stream: values, p_stream_id: editingId })
      if (saveError || !savedId) throw new Error(saveError?.message ?? 'Could not save stream.')
      const saved: Stream = { id: savedId, ...values, started_at: null, ended_at: null, live_verified_at: null }
      setStreams((current) => editingId ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current])
      setEditingId(null)
      setForm(empty)
      setMessage('Livestream schedule saved. LIVE state was not changed.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save livestream.')
    } finally {
      setBusy(false)
    }
  }

  async function remove(stream: Stream) {
    if (!window.confirm(`Delete “${stream.title}”? This cannot be undone.`)) return
    setBusy(true)
    setError('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: removeError } = await supabase.from('livestreams').delete().eq('id', stream.id)
      if (removeError) throw new Error(removeError.message)
      setStreams((current) => current.filter((item) => item.id !== stream.id))
      setMessage('Livestream schedule deleted.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete livestream.')
    } finally {
      setBusy(false)
    }
  }

  async function verifyLive(stream: Stream) {
    if (!window.confirm(`Confirm that “${stream.title}” is live now? This will show a public LIVE status for up to five minutes.`)) return
    setBusy(true)
    setError('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: verifyError } = await supabase.rpc('admin_verify_livestream', { p_stream_id: stream.id })
      if (verifyError) throw new Error(verifyError.message)
      const verifiedAt = new Date().toISOString()
      setStreams((current) => current.map((item) => item.id === stream.id ? { ...item, started_at: item.started_at ?? verifiedAt, ended_at: null, live_verified_at: verifiedAt } : item))
      setMessage('Stream verified LIVE. The verification expires after five minutes unless rechecked.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to verify stream.')
    } finally {
      setBusy(false)
    }
  }

  async function endStream(stream: Stream) {
    if (!window.confirm(`Mark “${stream.title}” as ended?`)) return
    setBusy(true)
    setError('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: endError } = await supabase.rpc('admin_end_livestream', { p_stream_id: stream.id })
      if (endError) throw new Error(endError.message)
      const endedAt = new Date().toISOString()
      setStreams((current) => current.map((item) => item.id === stream.id ? { ...item, ended_at: endedAt, live_verified_at: null } : item))
      setMessage('Stream marked as ended.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to end stream.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="release-manager">
    <section className="admin-card"><h2>{editingId ? 'Edit stream schedule' : 'Schedule a stream'}</h2><p className="muted">Schedules never set LIVE status. An authorized admin must separately confirm an active broadcast; confirmation expires after five minutes unless rechecked.</p>
      <form className="cms-form" onSubmit={save}>
        <label htmlFor="stream-platform">Platform</label><select id="stream-platform" value={form.platform} onChange={(event) => setForm({ ...form, platform: event.target.value })}>{['twitch', 'youtube', 'tiktok', 'facebook'].map((platform) => <option key={platform}>{platform}</option>)}</select>
        <label htmlFor="stream-title">Title</label><input id="stream-title" required maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <label htmlFor="stream-description">Description</label><textarea id="stream-description" rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <label htmlFor="stream-scheduled">Scheduled time</label><input id="stream-scheduled" type="datetime-local" value={form.scheduled_at} onChange={(event) => setForm({ ...form, scheduled_at: event.target.value })} />
        <label htmlFor="stream-url">Stream URL</label><input id="stream-url" type="url" placeholder="https://…" value={form.stream_url} onChange={(event) => setForm({ ...form, stream_url: event.target.value })} />
        <label htmlFor="stream-embed">Official embed URL (optional)</label><input id="stream-embed" type="url" placeholder="https://…" value={form.embed_url} onChange={(event) => setForm({ ...form, embed_url: event.target.value })} />
        <label htmlFor="stream-thumbnail">Thumbnail URL</label><input id="stream-thumbnail" type="url" placeholder="https://…" value={form.thumbnail_url} onChange={(event) => setForm({ ...form, thumbnail_url: event.target.value })} />
        <label htmlFor="stream-vod">Archive URL</label><input id="stream-vod" type="url" placeholder="https://…" value={form.vod_url} onChange={(event) => setForm({ ...form, vod_url: event.target.value })} />
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} /> Publish schedule</label>
        {error && <p className="admin-form-error" role="alert">{error}</p>}{message && <p className="admin-form-message" role="status">{message}</p>}
        <div className="hero__actions"><button className="button" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save schedule' : 'Create schedule'}</button>{editingId && <button className="button button--ghost" type="button" onClick={() => { setEditingId(null); setForm(empty); setMessage('') }} disabled={busy}>Cancel</button>}</div>
      </form>
    </section>
    <section className="admin-card"><h2>Streams</h2>{streams.length === 0 ? <p className="muted">No streams or schedules yet.</p> : <div className="release-list">{streams.map((stream) => <article className="release-row" key={stream.id}><div><h3>{stream.title}</h3><p className="muted">{stream.platform} · {stream.is_published ? 'Published' : 'Draft'}{stream.scheduled_at ? ` · ${new Date(stream.scheduled_at).toLocaleString()}` : ''}{stream.ended_at ? ' · Ended' : liveVerified(stream) ? ' · LIVE verified recently' : ' · Not verified LIVE'}</p></div><div className="release-row__actions">{stream.is_published && !stream.ended_at && <button className="button button--ghost" type="button" disabled={busy} onClick={() => verifyLive(stream)}>{liveVerified(stream) ? 'Re-verify LIVE' : 'Verify LIVE'}</button>}{liveVerified(stream) && <button className="button button--ghost" type="button" disabled={busy} onClick={() => endStream(stream)}>End stream</button>}<button className="button button--ghost" type="button" disabled={busy} onClick={() => edit(stream)}>Edit</button><button className="button button--danger" type="button" disabled={busy} onClick={() => remove(stream)}>Delete</button></div></article>)}</div>}</section>
  </div>
}
