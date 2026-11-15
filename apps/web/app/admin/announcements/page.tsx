import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Announcement management' }

export default function AdminAnnouncementsPage() {
  return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Announcements</h1></div></div><section className="admin-card"><h2>Announcements are not connected</h2><div className="admin-placeholder">Publishing will be enabled after authenticated database access and publication controls are configured. This preview does not save announcements.</div></section></>
}
