import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import SocialContentManager from './SocialContentManager'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Social content management', robots: { index: false, follow: false } }

export default async function AdminSocialPage() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Social content</h1></div></div><section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Configure Supabase and apply the CMS migration to manage social content. Nothing will be saved until connected.</div></section></>
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')
  const { data, error } = await supabase.from('social_content').select('id,platform,external_id,title,description,thumbnail_url,embed_url,content_url,posted_at,is_featured,is_published,display_order').order('posted_at', { ascending: false })
  if (error) return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Social content</h1></div></div><section className="admin-card"><h2>CMS migration required</h2><p className="muted">Apply `backend/supabase/migrations/001_website_cms.sql` and refresh this page.</p></section></>
  return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Social content</h1></div></div><SocialContentManager initial={(data ?? []) as Parameters<typeof SocialContentManager>[0]['initial']} /></>
}
