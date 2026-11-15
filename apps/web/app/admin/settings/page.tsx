import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import ProfileSettingsForm from '../ProfileSettingsForm'
import { createSupabaseServerClient } from '../../../lib/supabase/server'

export const metadata: Metadata = { title: 'Website settings', robots: { index: false, follow: false } }

export default async function WebsiteSettingsPage() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return <><div className="admin-title"><div><div className="eyebrow">Configuration</div><h1>Website settings</h1></div></div><section className="admin-card"><h2>Supabase is not configured</h2><div className="admin-placeholder">Configure Supabase and apply the CMS migrations to manage artist profile content.</div></section></>
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: membership, error: membershipError } = await supabase.from('admin_users').select('user_id').eq('user_id', user.id).maybeSingle()
  if (membershipError || !membership) redirect('/admin/login?error=not-authorized')
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'artist_profile').maybeSingle()
  const value = data?.value && typeof data.value === 'object' ? data.value as Record<string, unknown> : {}
  const initial = { display_name: 'Spaz SsG', bio: typeof value.bio === 'string' ? value.bio : '', mission: typeof value.mission === 'string' ? value.mission : '' }
  return <><div className="admin-title"><div><div className="eyebrow">Configuration</div><h1>Website settings</h1></div></div><ProfileSettingsForm initial={initial} /></>
}
