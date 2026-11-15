import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import LivestreamManager from './LivestreamManager'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Livestream management', robots: { index: false, follow: false } }

export default async function AdminLivestreamsPage() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Livestreams</h1></div></div><section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Configure Supabase and apply the CMS migration to manage schedules. No stream will be shown as LIVE unless a recent verification timestamp exists.</div></section></>
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')
  const { data, error } = await supabase.from('livestreams').select('id,platform,title,description,scheduled_at,started_at,ended_at,live_verified_at,stream_url,embed_url,thumbnail_url,vod_url,is_published').order('scheduled_at', { ascending: true })
  if (error) return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Livestreams</h1></div></div><section className="admin-card"><h2>CMS migration required</h2><p className="muted">Apply `backend/supabase/migrations/001_website_cms.sql` and refresh this page.</p></section></>
  return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Livestreams</h1></div></div><LivestreamManager initial={(data ?? []) as Parameters<typeof LivestreamManager>[0]['initial']} /></>
}
