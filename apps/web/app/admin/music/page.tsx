import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Music management' }

export default function AdminMusicPage() {
  return <>
    <div className="admin-title"><div><div className="eyebrow">Content</div><h1>Music releases</h1></div></div>
    <section className="admin-card"><h2>Release management is not connected</h2><div className="admin-placeholder">The form and release list will be enabled after Supabase authentication, database policies, and storage are configured. This preview does not save or publish content.</div></section>
  </>
}
