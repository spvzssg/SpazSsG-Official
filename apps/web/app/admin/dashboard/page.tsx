'use client'

import { useMusic } from '@spaz/hooks'

export default function AdminDashboard() {
  const { releases, loading } = useMusic()

  return (
    <div>
      <h1 className="text-4xl font-bold text-electric-cyan mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="card">
          <p className="text-metallic-silver text-sm mb-2">Total Releases</p>
          <p className="text-3xl font-bold text-electric-cyan">{releases.length}</p>
        </div>
        <div className="card">
          <p className="text-metallic-silver text-sm mb-2">Featured Releases</p>
          <p className="text-3xl font-bold text-burnt-orange">{releases.filter(r => r.isFeatured).length}</p>
        </div>
        <div className="card">
          <p className="text-metallic-silver text-sm mb-2">Last Updated</p>
          <p className="text-lg font-bold text-metallic-silver">Today</p>
        </div>
        <div className="card">
          <p className="text-metallic-silver text-sm mb-2">Status</p>
          <p className="text-lg font-bold text-electric-cyan">✓ Live</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-electric-cyan mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <a href="/admin/music/new" className="btn-primary">
            Add Music Release
          </a>
          <a href="/admin/announcements/new" className="btn-secondary">
            Post Announcement
          </a>
          <a href="/admin/social/new" className="btn-secondary">
            Add Social Content
          </a>
          <a href="/admin/livestreams/new" className="btn-secondary">
            Schedule Livestream
          </a>
        </div>
      </div>
    </div>
  )
}
