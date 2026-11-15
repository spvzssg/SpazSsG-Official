'use client'

import { OFFICIAL_LINKS } from '@spaz/config'

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-midnight-black pt-24">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-midnight-black/95 backdrop-blur border-b border-charcoal z-50">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="text-2xl font-bold text-electric-cyan">SPAZ SSG</a>
          <div className="flex gap-8">
            <a href="/" className="text-metallic-silver hover:text-electric-cyan">Home</a>
            <a href="/music" className="text-electric-cyan">Music</a>
            <a href="/social" className="text-metallic-silver hover:text-electric-cyan">Social</a>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-charcoal">
        <div className="container">
          <h1 className="text-4xl font-bold text-electric-cyan mb-12">Music</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="card">
              <h2 className="text-2xl font-bold text-electric-cyan mb-4">Spotify</h2>
              <p className="text-metallic-silver mb-4">
                Listen to all releases on Spotify
              </p>
              <a href={OFFICIAL_LINKS.SPOTIFY} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Open on Spotify
              </a>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-electric-cyan mb-4">Apple Music</h2>
              <p className="text-metallic-silver mb-4">
                Listen to all releases on Apple Music
              </p>
              <a href={OFFICIAL_LINKS.APPLE_MUSIC} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Open on Apple Music
              </a>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-electric-cyan mb-4">UnitedMasters</h2>
              <p className="text-metallic-silver mb-4">
                View artist profile and releases
              </p>
              <a href={OFFICIAL_LINKS.UNITEDMASTERS} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Profile
              </a>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-electric-cyan mb-4">YouTube Music</h2>
              <p className="text-metallic-silver mb-4">
                Music videos and official releases
              </p>
              <a href={OFFICIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Open on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
