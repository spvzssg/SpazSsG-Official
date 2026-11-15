import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Admin dashboard' }

const sections = [
  { label: 'Music releases', href: '/admin/music' },
  { label: 'Social posts', href: '/admin/social' },
  { label: 'Livestreams', href: '/admin/livestreams' },
]

export default function AdminDashboard() {
  return <>
    <div className="admin-title"><div><div className="eyebrow">Management</div><h1>Dashboard</h1></div><Link className="button button--ghost" href="/">View public site ↗</Link></div>
    <div className="admin-stats">
      {sections.map((section) => <Link className="admin-stat" href={section.href} key={section.label}><span>{section.label}</span><strong style={{ fontSize: 16 }}>Not connected</strong></Link>)}
    </div>
    <section className="admin-card"><h2>Preview mode</h2><div className="admin-placeholder">This dashboard is a website preview, not a live CMS. Supabase credentials and secure admin-role policies are not configured in this environment. Content editing and publishing are intentionally disabled until the backend is connected.</div></section>
  </>
}
