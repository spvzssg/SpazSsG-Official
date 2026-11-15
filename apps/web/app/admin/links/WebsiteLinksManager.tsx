'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabase/client'

type WebsiteLink = { id: string; title: string; url: string; platform: string | null; description: string | null; icon_url: string | null; category: string; is_featured: boolean; is_published: boolean; display_order: number }
const empty = { title: '', url: '', platform: '', description: '', icon_url: '', category: 'other', is_featured: false, is_published: false, display_order: 0 }
const httpsOrEmpty = (value: string) => !value.trim() || /^https:\/\//i.test(value.trim())

export default function WebsiteLinksManager({ initial }: { initial: WebsiteLink[] }) {
  const router = useRouter()
  const [items, setItems] = useState(initial)
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function edit(item: WebsiteLink) {
    setEditingId(item.id)
    setForm({ title: item.title, url: item.url, platform: item.platform ?? '', description: item.description ?? '', icon_url: item.icon_url ?? '', category: item.category, is_featured: item.is_featured, is_published: item.is_published, display_order: item.display_order })
    setError('')
    setMessage('Editing website link.')
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')
    try {
      if (!httpsOrEmpty(form.url) || !httpsOrEmpty(form.icon_url)) throw new Error('Link and icon URLs must use HTTPS.')
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const values = { title: form.title.trim(), url: form.url.trim(), platform: form.platform.trim() || null, description: form.description.trim() || null, icon_url: form.icon_url.trim() || null, category: form.category.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-') || 'other', is_featured: form.is_featured, is_published: form.is_published, display_order: form.display_order }
      const { data: savedId, error: saveError } = await supabase.rpc('admin_upsert_website_link', { p_link: values, p_link_id: editingId })
      if (saveError || !savedId) throw new Error(saveError?.message ?? 'Could not save link.')
      const saved = { id: savedId, ...values } as WebsiteLink
      setItems((current) => editingId ? current.map((item) => item.id === saved.id ? saved : item) : [...current, saved])
      setEditingId(null)
      setForm(empty)
      setMessage('Website link saved.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save link.')
    } finally {
      setBusy(false)
    }
  }

  async function remove(item: WebsiteLink) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return
    setBusy(true)
    setError('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: deleteError } = await supabase.rpc('admin_delete_website_link', { p_link_id: item.id })
      if (deleteError) throw new Error(deleteError.message)
      setItems((current) => current.filter((existing) => existing.id !== item.id))
      setMessage('Website link deleted.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete link.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="release-manager">
    <section className="admin-card"><h2>{editingId ? 'Edit link' : 'Add a website link'}</h2>
      <form className="cms-form" onSubmit={save}>
        <label htmlFor="website-link-title">Title</label><input id="website-link-title" required maxLength={100} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <label htmlFor="website-link-url">URL</label><input id="website-link-url" type="url" required placeholder="https://…" value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} />
        <label htmlFor="website-link-platform">Platform (optional)</label><input id="website-link-platform" maxLength={60} value={form.platform} onChange={(event) => setForm({ ...form, platform: event.target.value })} />
        <label htmlFor="website-link-category">Category</label><input id="website-link-category" required maxLength={60} value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
        <label htmlFor="website-link-description">Description</label><textarea id="website-link-description" rows={3} maxLength={500} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <label htmlFor="website-link-icon">Icon/image URL (optional)</label><input id="website-link-icon" type="url" placeholder="https://…" value={form.icon_url} onChange={(event) => setForm({ ...form, icon_url: event.target.value })} />
        <label htmlFor="website-link-order">Display order</label><input id="website-link-order" type="number" min="0" max="100000" value={form.display_order} onChange={(event) => setForm({ ...form, display_order: Number(event.target.value) })} />
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} /> Feature this link</label>
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} /> Publish this link</label>
        {error && <p className="admin-form-error" role="alert">{error}</p>}{message && <p className="admin-form-message" role="status">{message}</p>}
        <div className="hero__actions"><button className="button" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Add link'}</button>{editingId && <button className="button button--ghost" type="button" disabled={busy} onClick={() => { setEditingId(null); setForm(empty); setMessage('') }}>Cancel</button>}</div>
      </form>
    </section>
    <section className="admin-card"><h2>Website links</h2>{items.length === 0 ? <p className="muted">No custom links yet.</p> : <div className="release-list">{items.map((item) => <article className="release-row" key={item.id}><div><h3>{item.title}</h3><p className="muted">{item.category} · {item.is_published ? 'Published' : 'Draft'}{item.is_featured ? ' · Featured' : ''} · order {item.display_order}</p><p>{item.url}</p></div><div className="release-row__actions"><button className="button button--ghost" type="button" disabled={busy} onClick={() => edit(item)}>Edit</button><button className="button button--danger" type="button" disabled={busy} onClick={() => remove(item)}>Delete</button></div></article>)}</div>}</section>
  </div>
}
