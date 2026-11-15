'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabase/client'

type Announcement = { id: string; title: string; content: string; is_published: boolean; is_pinned: boolean; published_at: string | null; scheduled_for: string | null }
const empty = { title: '', content: '', is_published: false, is_pinned: false, scheduled_for: '' }

export default function AnnouncementManager({ initial }: { initial: Announcement[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initial)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  function edit(item: Announcement) {
    setEditingId(item.id)
    setForm({ title: item.title, content: item.content, is_published: item.is_published, is_pinned: item.is_pinned, scheduled_for: item.scheduled_for ? new Date(item.scheduled_for).toISOString().slice(0, 16) : '' })
    setError('')
    setMessage('Editing announcement.')
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const values = { title: form.title.trim(), content: form.content.trim(), is_published: form.is_published, is_pinned: form.is_pinned, scheduled_for: form.scheduled_for ? new Date(form.scheduled_for).toISOString() : null, published_at: form.is_published ? new Date().toISOString() : null }
      const { data: savedId, error: saveError } = await supabase.rpc('admin_upsert_announcement', { p_announcement: values, p_announcement_id: editingId })
      if (saveError || !savedId) throw new Error(saveError?.message ?? 'Could not save announcement.')
      const saved: Announcement = { id: savedId, ...values, published_at: values.is_published && (!values.scheduled_for || new Date(values.scheduled_for).getTime() <= Date.now()) ? new Date().toISOString() : null }
      setItems((current) => editingId ? current.map((item) => item.id === saved.id ? saved : item) : [saved, ...current])
      setEditingId(null)
      setForm(empty)
      setMessage('Announcement saved.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save announcement.')
    } finally {
      setBusy(false)
    }
  }

  async function remove(id: string, title: string) {
    if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: deleteError } = await supabase.rpc('admin_delete_announcement', { p_announcement_id: id })
      if (deleteError) throw new Error(deleteError.message)
      setItems((current) => current.filter((item) => item.id !== id))
      setMessage('Announcement deleted.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete announcement.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="release-manager">
    <section className="admin-card"><h2>{editingId ? 'Edit announcement' : 'Write an announcement'}</h2>
      <form className="cms-form" onSubmit={save}>
        <label htmlFor="announcement-title">Title</label><input id="announcement-title" required maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <label htmlFor="announcement-content">Message</label><textarea id="announcement-content" rows={6} required maxLength={10000} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} />
        <label htmlFor="announcement-schedule">Schedule (optional)</label><input id="announcement-schedule" type="datetime-local" value={form.scheduled_for} onChange={(event) => setForm({ ...form, scheduled_for: event.target.value })} />
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_pinned} onChange={(event) => setForm({ ...form, is_pinned: event.target.checked })} /> Pin this announcement</label>
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} /> Publish (scheduled messages stay hidden until their scheduled time)</label>
        {error && <p className="admin-form-error" role="alert">{error}</p>}{message && <p className="admin-form-message" role="status">{message}</p>}
        <div className="hero__actions"><button className="button" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Save announcement'}</button>{editingId && <button className="button button--ghost" type="button" onClick={() => { setEditingId(null); setForm(empty); setMessage('') }} disabled={busy}>Cancel</button>}</div>
      </form>
    </section>
    <section className="admin-card"><h2>Announcements</h2>{items.length === 0 ? <p className="muted">No announcements yet.</p> : <div className="release-list">{items.map((item) => <article className="release-row" key={item.id}><div><h3>{item.title}</h3><p className="muted">{item.is_published ? 'Published' : 'Draft'}{item.is_pinned ? ' · Pinned' : ''}{item.scheduled_for ? ` · Scheduled ${new Date(item.scheduled_for).toLocaleString()}` : ''}</p><p>{item.content}</p></div><div className="release-row__actions"><button className="button button--ghost" type="button" disabled={busy} onClick={() => edit(item)}>Edit</button><button className="button button--danger" type="button" disabled={busy} onClick={() => remove(item.id, item.title)}>Delete</button></div></article>)}</div>}</section>
  </div>
}
