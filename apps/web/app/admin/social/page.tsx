import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Social content management' }

export default function AdminSocialPage() {
  return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Social content</h1></div></div><section className="admin-card"><h2>Social content is not connected</h2><div className="admin-placeholder">Connect the database and authenticated admin permissions to manage social content. No content changes can be made from this preview.</div></section></>
}
