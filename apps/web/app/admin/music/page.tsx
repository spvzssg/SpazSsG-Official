import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ReleaseEditor from './ReleaseEditor'
import UploadArtworkForm from './UploadArtworkForm'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

type SearchParams = { error?: string }

export const metadata: Metadata = { title: 'Music management', robots: { index: false, follow: false } }

export default async function AdminMusicPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return <>
    <div className="admin-title"><div><div className="eyebrow">Content</div><h1>Music releases</h1></div></div>
    <section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Add the public Supabase URL and anon key to `.env.local`, apply the CMS migration, and add an authorized admin user to enable release editing. This page will not save draft or release data until connected.</div></section>
  </>

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')

  const { data, error } = await supabase
    .from('music_releases')
    .select('id,title,slug,artist_name,release_type,release_date,cover_art_url,description,is_featured,is_published,music_platform_links(platform,url)')
    .order('release_date', { ascending: false })

  if (error) return <>
    <div className="admin-title"><div><div className="eyebrow">Content</div><h1>Music releases</h1></div></div>
    <section className="admin-card"><h2>CMS migration required</h2><p className="muted">Apply `backend/supabase/migrations/001_website_cms.sql` in Supabase, then refresh this page.</p></section>
  </>

  return <>
    <div className="admin-title"><div><div className="eyebrow">Content</div><h1>Music releases</h1></div></div>
    {searchParams.error === 'media-upload' && <p className="admin-form-error" role="alert">The artwork upload failed. Check that Supabase Storage has the `website-media` bucket and admin storage policies.</p>}
    <UploadArtworkForm />
    <ReleaseEditor initialReleases={(data ?? []) as Parameters<typeof ReleaseEditor>[0]['initialReleases']} />
  </>
}
