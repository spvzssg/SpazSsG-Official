'use client'

export default function AdminAnnouncementsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-electric-cyan mb-8">Announcements</h1>
      <div className="card">
        <p className="text-metallic-silver mb-4">
          Create and manage announcements for the website and mobile app.
        </p>
        <button className="btn-primary">Create Announcement</button>
      </div>
    </div>
  )
}
