import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin dashboard' }

export default function AdminIndexPage() {
  return <>
    <div className="admin-title"><div><div className="eyebrow">Management</div><h1>Dashboard</h1></div><Link className="button button--ghost" href="/">View public site ↗</Link></div>
    <section className="admin-card"><h2>Administrator access is not configured</h2><div className="admin-placeholder">The website is running in preview mode. Admin sign-in and protected publishing require Supabase project credentials, a verified admin-role policy, and server-side session checks. Do not enter credentials on this preview dashboard.</div></section>
  </>
}
