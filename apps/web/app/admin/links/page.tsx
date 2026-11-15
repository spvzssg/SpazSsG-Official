import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import WebsiteLinksManager from './WebsiteLinksManager'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Website links', robots: { index: false, follow: false } }

export default async function WebsiteLinksPage() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return <><div className="admin-title"><div><div className="eyebrow">Configuration</div><h1>Website links</h1></div></div><section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Configure Supabase and apply the CMS migration to manage the public link directory.</div></section></>
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')
  const { data, error } = await supabase.from('website_links').select('id,title,url,platform,description,icon_url,category,is_featured,is_published,display_order').order('category').order('display_order')
  if (error) return <><div className="admin-title"><div><div className="eyebrow">Configuration</div><h1>Website links</h1></div></div><section className="admin-card"><h2>CMS migration required</h2><p className="muted">Apply `backend/supabase/migrations/001_website_cms.sql` and refresh this page.</p></section></>
  return <><div className="admin-title"><div><div className="eyebrow">Configuration</div><h1>Website links</h1></div></div><WebsiteLinksManager initial={(data ?? []) as Parameters<typeof WebsiteLinksManager>[0]['initial']} /></>
}
