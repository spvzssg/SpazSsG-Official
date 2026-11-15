'use client'

import { useState } from 'react'
import { useMusic } from '@spaz/hooks'
import Link from 'next/link'

export default function AdminMusicPage() {
  const { releases, loading, error } = useMusic()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: '',
    isFeatured: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to actual API
    console.log('Submitting music release:', formData)
    alert('Music release submitted (demo - not connected to database yet)')
    setFormData({
      title: '',
      description: '',
      releaseDate: '',
      isFeatured: false,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-electric-cyan">Music Management</h1>
        <Link href="/admin/music/new" className="btn-primary">
          Add Release
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="card">
            <h2 className="text-2xl font-bold text-electric-cyan mb-6">New Release</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-metallic-silver text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Song title"
                  className="w-full px-3 py-2 bg-midnight-black border border-charcoal rounded-lg text-metallic-silver placeholder-charcoal"
                />
              </div>

              <div>
                <label className="block text-metallic-silver text-sm font-bold mb-2">
                  Release Date
                </label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-midnight-black border border-charcoal rounded-lg text-metallic-silver"
                />
              </div>

              <div>
                <label className="block text-metallic-silver text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Release description"
                  rows={4}
                  className="w-full px-3 py-2 bg-midnight-black border border-charcoal rounded-lg text-metallic-silver placeholder-charcoal"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label className="text-metallic-silver text-sm">
                  Feature this release
                </label>
              </div>

              <button type="submit" className="w-full btn-primary">
                Create Release
              </button>
            </form>
          </div>
        </div>

        {/* Releases List */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-2xl font-bold text-electric-cyan mb-6">Recent Releases</h2>

            {loading && (
              <p className="text-metallic-silver">Loading releases...</p>
            )}

            {error && (
              <p className="text-burnt-orange">Error loading releases</p>
            )}

            {releases && releases.length > 0 ? (
              <div className="space-y-4">
                {releases.map((release) => (
                  <div key={release.id} className="border-l-4 border-electric-cyan pl-4 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-metallic-silver">{release.title}</h3>
                        <p className="text-burnt-orange text-sm">{release.artistName}</p>
                        {release.isFeatured && (
                          <span className="inline-block bg-electric-cyan text-midnight-black px-2 py-1 rounded text-xs font-bold mt-2">
                            FEATURED
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="btn-secondary text-sm">Edit</button>
                        <button className="btn-secondary text-sm">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-metallic-silver">No releases yet. Create your first one!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
