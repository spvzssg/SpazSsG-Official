import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Admin dashboard' }

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return <>
      <div className="admin-title"><div><div className="eyebrow">Management</div><h1>Dashboard preview</h1></div><Link className="button button--ghost" href="/">View public site ↗</Link></div>
      <section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Add the Supabase project URL and public anon key to `.env.local`, apply the CMS migration, and provision an admin user to enable content management. The preview does not save edits.</div></section>
    </>
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')

  const [releasesResult, socialResult, announcementResult, livestreamResult, linksResult] = await Promise.all([
    supabase.from('music_releases').select('id', { count: 'exact', head: true }),
    supabase.from('social_content').select('id', { count: 'exact', head: true }),
    supabase.from('announcements').select('id', { count: 'exact', head: true }),
    supabase.from('livestreams').select('id', { count: 'exact', head: true }),
    supabase.from('website_links').select('id', { count: 'exact', head: true }),
  ])

  if (releasesResult.error || socialResult.error || announcementResult.error || livestreamResult.error || linksResult.error) {
    return <>
      <div className="admin-title"><div><div className="eyebrow">Management</div><h1>Dashboard</h1></div><Link className="button button--ghost" href="/">View public site ↗</Link></div>
      <section className="admin-card"><h2>CMS migration required</h2><p className="muted">Apply `backend/supabase/migrations/001_website_cms.sql` through `005_admin_social_content.sql` in the connected Supabase project. The dashboard could not load its counts; no changes were made.</p></section>
    </>
  }

  const stats = [
    { label: 'Music releases', count: releasesResult.count ?? 0, href: '/admin/music' },
    { label: 'Social posts', count: socialResult.count ?? 0, href: '/admin/social' },
    { label: 'Announcements', count: announcementResult.count ?? 0, href: '/admin/announcements' },
    { label: 'Livestreams', count: livestreamResult.count ?? 0, href: '/admin/livestreams' },
    { label: 'Website links', count: linksResult.count ?? 0, href: '/admin/links' },
  ]

  return <>
    <div className="admin-title"><div><div className="eyebrow">Management</div><h1>Dashboard</h1></div><Link className="button button--ghost" href="/">View public site ↗</Link></div>
    <div className="admin-stats">{stats.map((stat) => <Link className="admin-stat" href={stat.href} key={stat.label}><span>{stat.label}</span><strong>{stat.count}</strong></Link>)}</div>
    <section className="admin-card"><h2>Connected content</h2><p className="muted">Counts are read from the Supabase CMS. Public pages show only published content, as enforced by row-level security.</p></section>
  </>
}
