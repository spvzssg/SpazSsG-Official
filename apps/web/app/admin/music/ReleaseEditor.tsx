'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '../../../lib/supabase/client'

type ReleaseLink = { platform: string; url: string }
type Release = {
  id: string
  title: string
  slug: string
  artist_name: string
  release_type: string
  release_date: string | null
  cover_art_url: string | null
  description: string | null
  is_featured: boolean
  is_published: boolean
  music_platform_links?: ReleaseLink[]
}

const platforms = ['spotify', 'apple_music', 'youtube_music', 'unitedmasters', 'soundcloud', 'tidal', 'deezer']
const blankForm = { title: '', slug: '', release_type: 'single', release_date: '', cover_art_url: '', description: '', is_featured: false, is_published: false, platformLinks: Object.fromEntries(platforms.map((platform) => [platform, ''])) as Record<string, string> }

function toSlug(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function ReleaseEditor({ initialReleases }: { initialReleases: Release[] }) {
  const router = useRouter()
  const [releases, setReleases] = useState(initialReleases)
  const [form, setForm] = useState(blankForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  function startNew() {
    setEditingId(null)
    setForm(blankForm)
    setError('')
    setMessage('')
  }

  function startEdit(release: Release) {
    const links = Object.fromEntries(platforms.map((platform) => [platform, release.music_platform_links?.find((link) => link.platform === platform)?.url ?? '']))
    setEditingId(release.id)
    setForm({ title: release.title, slug: release.slug, release_type: release.release_type, release_date: release.release_date ?? '', cover_art_url: release.cover_art_url ?? '', description: release.description ?? '', is_featured: release.is_featured, is_published: release.is_published, platformLinks: links })
    setError('')
    setMessage('Editing release. Save changes when ready.')
  }

  async function saveRelease(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured. Set the project URL and public anon key in `.env.local`.')

      const slug = toSlug(form.slug || form.title)
      if (!slug) throw new Error('Add a title to generate a valid release slug.')
      if (form.cover_art_url && !/^https:\/\//i.test(form.cover_art_url.trim())) throw new Error('Artwork URL must use HTTPS.')
      const invalidPlatform = platforms.find((platform) => form.platformLinks[platform].trim() && !/^https:\/\//i.test(form.platformLinks[platform].trim()))
      if (invalidPlatform) throw new Error(`${invalidPlatform.replace('_', ' ')} URL must use HTTPS.`)
      const releaseData = {
        title: form.title.trim(),
        slug,
        artist_name: 'Spaz SsG',
        release_type: form.release_type,
        release_date: form.release_date || null,
        cover_art_url: form.cover_art_url.trim() || null,
        description: form.description.trim() || null,
        is_featured: form.is_featured,
        is_published: form.is_published,
      }

      const platformLinks = platforms.filter((platform) => form.platformLinks[platform].trim()).map((platform, index) => ({ platform, url: form.platformLinks[platform].trim(), display_order: index }))
      const { data: savedId, error: saveError } = await supabase.rpc('admin_upsert_music_release', {
        p_release: releaseData,
        p_links: platformLinks,
        p_release_id: editingId,
      })
      if (saveError || !savedId) throw new Error(saveError?.message ?? 'Unable to save the release.')

      setMessage('Release saved.')
      setEditingId(null)
      setForm(blankForm)
      router.refresh()
      const { data: refreshed, error: refreshError } = await supabase.from('music_releases').select('id,title,slug,artist_name,release_type,release_date,cover_art_url,description,is_featured,is_published,music_platform_links(platform,url)').order('release_date', { ascending: false })
      if (!refreshError && refreshed) setReleases(refreshed as Release[])
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save release.')
    } finally {
      setBusy(false)
    }
  }

  async function deleteRelease(release: Release) {
    if (!window.confirm(`Delete “${release.title}”? This cannot be undone.`)) return
    setBusy(true)
    setError('')
    setMessage('')
    try {
      const supabase = createSupabaseBrowserClient()
      if (!supabase) throw new Error('Supabase is not configured.')
      const { error: deleteError } = await supabase.rpc('admin_delete_music_release', { p_release_id: release.id })
      if (deleteError) throw new Error(deleteError.message)
      setReleases((current) => current.filter((item) => item.id !== release.id))
      if (editingId === release.id) startNew()
      setMessage('Release deleted.')
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to delete release.')
    } finally {
      setBusy(false)
    }
  }

  return <div className="release-manager">
    <section className="admin-card">
      <h2>{editingId ? 'Edit release' : 'Add a release'}</h2>
      <p className="muted">Drafts stay hidden from the public site until published.</p>
      <form className="cms-form" onSubmit={saveRelease}>
        <label htmlFor="release-title">Title</label>
        <input id="release-title" required maxLength={160} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value, slug: editingId ? form.slug : toSlug(event.target.value) })} />
        <label htmlFor="release-slug">URL slug</label>
        <input id="release-slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug} onChange={(event) => setForm({ ...form, slug: toSlug(event.target.value) })} />
        <label htmlFor="release-type">Release type</label>
        <select id="release-type" value={form.release_type} onChange={(event) => setForm({ ...form, release_type: event.target.value })}><option value="single">Single</option><option value="ep">EP</option><option value="album">Album</option><option value="mixtape">Mixtape</option></select>
        <label htmlFor="release-date">Release date</label>
        <input id="release-date" type="date" value={form.release_date} onChange={(event) => setForm({ ...form, release_date: event.target.value })} />
        <label htmlFor="release-art">Cover artwork URL</label>
        <input id="release-art" type="url" placeholder="https://…" value={form.cover_art_url} onChange={(event) => setForm({ ...form, cover_art_url: event.target.value })} />
        <label htmlFor="release-description">Description</label>
        <textarea id="release-description" rows={4} maxLength={5000} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <fieldset className="platform-fieldset"><legend>Streaming links (optional)</legend>{platforms.map((platform) => <div key={platform}><label htmlFor={`platform-${platform}`}>{platform.replace('_', ' ')}</label><input id={`platform-${platform}`} type="url" placeholder="https://…" value={form.platformLinks[platform]} onChange={(event) => setForm({ ...form, platformLinks: { ...form.platformLinks, [platform]: event.target.value } })} /></div>)}</fieldset>
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_featured} onChange={(event) => setForm({ ...form, is_featured: event.target.checked })} /> Feature on the website</label>
        <label className="cms-checkbox"><input type="checkbox" checked={form.is_published} onChange={(event) => setForm({ ...form, is_published: event.target.checked })} /> Publish this release</label>
        {error && <p className="admin-form-error" role="alert">{error}</p>}
        {message && <p className="admin-form-message" role="status">{message}</p>}
        <div className="hero__actions"><button className="button" type="submit" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Create release'}</button>{editingId && <button className="button button--ghost" type="button" onClick={startNew} disabled={busy}>Cancel edit</button>}</div>
      </form>
    </section>

    <section className="admin-card"><div className="admin-title"><h2>Releases</h2><span className="muted">{releases.length} total</span></div>
      {releases.length === 0 ? <div className="admin-placeholder">No releases yet. Add a release above to begin managing the catalog.</div> : <div className="release-list">{releases.map((release) => <article className="release-row" key={release.id}><div><h3>{release.title}</h3><p className="muted">{release.release_type} · {release.release_date ?? 'Date not set'} · {release.is_published ? 'Published' : 'Draft'}{release.is_featured ? ' · Featured' : ''}</p><p className="release-row__slug">/{release.slug}</p></div><div className="release-row__actions"><button className="button button--ghost" type="button" disabled={busy} onClick={() => startEdit(release)}>Edit</button><button className="button button--danger" type="button" disabled={busy} onClick={() => deleteRelease(release)}>Delete</button></div></article>)}</div>}
    </section>
    <p className="muted"><Link href="/music">Preview the public Music page ↗</Link></p>
  </div>
}
