import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Livestream management' }

export default function AdminLivestreamsPage() {
  return <><div className="admin-title"><div><div className="eyebrow">Content</div><h1>Livestreams</h1></div></div><section className="admin-card"><h2>Livestream management is not connected</h2><div className="admin-placeholder">Connect authenticated database operations before creating schedules or publishing live status. This preview will not claim that a stream is active.</div></section></>
}
