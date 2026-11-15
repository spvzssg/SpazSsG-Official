import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import AnnouncementManager from './AnnouncementManager'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Announcement management', robots: { index: false, follow: false } }

export default async function AdminAnnouncementsPage() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Announcements</h1></div></div><section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Configure Supabase and apply the website CMS migration to manage announcements. Nothing will be saved until then.</div></section></>
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')
  const { data, error } = await supabase.from('announcements').select('id,title,content,is_published,is_pinned,published_at,scheduled_for').order('created_at', { ascending: false })
  if (error) return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Announcements</h1></div></div><section className="admin-card"><h2>CMS migration required</h2><p className="muted">Apply `backend/supabase/migrations/001_website_cms.sql` and refresh this page.</p></section></>
  return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Announcements</h1></div></div><AnnouncementManager initial={(data ?? []) as Parameters<typeof AnnouncementManager>[0]['initial']} /></>
}
