'use client'

import Link from 'next/link'
import { useHome } from '@spaz/hooks'
import { OFFICIAL_LINKS, ARTIST_INFO } from '@spaz/config'

export default function HomePage() {
  const { data, loading, error } = useHome()

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-midnight-black/95 backdrop-blur border-b border-charcoal z-50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-electric-cyan">SPAZ</h1>
            <span className="text-xs text-burnt-orange font-semibold">SSG</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-metallic-silver hover:text-electric-cyan">Home</Link>
            <Link href="/music" className="text-metallic-silver hover:text-electric-cyan">Music</Link>
            <Link href="/social" className="text-metallic-silver hover:text-electric-cyan">Social</Link>
            <Link href="/live" className="text-metallic-silver hover:text-electric-cyan">Live</Link>
            <Link href="/everything-spaz" className="text-metallic-silver hover:text-electric-cyan">Links</Link>
            <Link href="/dreamers-club" className="text-metallic-silver hover:text-electric-cyan">Community</Link>
            <Link href="/admin" className="btn-primary text-sm">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-midnight-black to-charcoal">
        <div className="container text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-electric-cyan">SPAZ</span>
              <br />
              <span className="text-metallic-silver">SSG</span>
            </h1>
            <p className="text-xl text-metallic-silver max-w-2xl mx-auto">
              {ARTIST_INFO.BIO}
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <a href={OFFICIAL_LINKS.SPOTIFY} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Listen on Spotify
            </a>
            <a href={OFFICIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Join {ARTIST_INFO.COMMUNITY_NAME}
            </a>
          </div>
        </div>
      </section>

      {/* Featured Release */}
      {data?.featured && (
        <section className="py-20 bg-midnight-black">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-electric-cyan">Featured Release</h2>
            <div className="card flex gap-8 items-center">
              <div className="flex-1">
                <img
                  src={data.featured.coverArtUrl}
                  alt={data.featured.title}
                  className="rounded-lg"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-2 text-metallic-silver">{data.featured.title}</h3>
                <p className="text-burnt-orange mb-4">{data.featured.artistName}</p>
                <p className="text-metallic-silver mb-6">{data.featured.description}</p>
                <div className="flex gap-3 flex-wrap">
                  {data.featured.platformLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary text-sm"
                    >
                      Listen on {link.platform.replace('_', ' ')}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Releases */}
      {data?.recent && data.recent.length > 0 && (
        <section className="py-20 bg-charcoal">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-electric-cyan">Recent Releases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.recent.map((release) => (
                <Link key={release.id} href={`/music/${release.id}`}>
                  <div className="card cursor-pointer">
                    <img
                      src={release.coverArtUrl}
                      alt={release.title}
                      className="rounded-lg mb-4 w-full"
                    />
                    <h3 className="text-lg font-bold text-metallic-silver mb-1">{release.title}</h3>
                    <p className="text-burnt-orange text-sm">{release.artistName}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Announcements */}
      {data?.announcements && data.announcements.length > 0 && (
        <section className="py-20 bg-midnight-black">
          <div className="container">
            <h2 className="text-4xl font-bold mb-12 text-electric-cyan">Announcements</h2>
            <div className="space-y-4">
              {data.announcements.map((announcement) => (
                <div key={announcement.id} className="card border-l-4 border-electric-cyan">
                  {announcement.isPinned && (
                    <span className="inline-block bg-burnt-orange text-midnight-black px-2 py-1 rounded text-xs font-bold mb-2">
                      PINNED
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-metallic-silver mb-2">{announcement.title}</h3>
                  <p className="text-metallic-silver">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dreamers Club CTA */}
      <section className="py-20 bg-gradient-to-r from-electric-cyan/10 to-burnt-orange/10">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4 text-metallic-silver">
            Calling All Dreamers
          </h2>
          <p className="text-lg text-metallic-silver mb-8 max-w-2xl mx-auto">
            Join {ARTIST_INFO.COMMUNITY_NAME} — a community of artists, creators, and supporters united by music and ambition.
          </p>
          <a href={OFFICIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">
            Join the Community
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal border-t border-midnight-black py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold text-electric-cyan mb-4">Music</h4>
              <ul className="space-y-2">
                <li><a href={OFFICIAL_LINKS.SPOTIFY} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">Spotify</a></li>
                <li><a href={OFFICIAL_LINKS.APPLE_MUSIC} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">Apple Music</a></li>
                <li><a href={OFFICIAL_LINKS.UNITEDMASTERS} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">UnitedMasters</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-electric-cyan mb-4">Social</h4>
              <ul className="space-y-2">
                <li><a href={OFFICIAL_LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">Instagram</a></li>
                <li><a href={OFFICIAL_LINKS.TIKTOK} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">TikTok</a></li>
                <li><a href={OFFICIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-electric-cyan mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href={OFFICIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">Discord</a></li>
                <li><a href={OFFICIAL_LINKS.TWITCH} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">Twitch</a></li>
                <li><a href="/dreamers-club" className="text-metallic-silver hover:text-electric-cyan">Dreamers Club</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-electric-cyan mb-4">Submit</h4>
              <ul className="space-y-2">
                <li><a href={OFFICIAL_LINKS.MUSIC_SUBMISSIONS} target="_blank" rel="noopener noreferrer" className="text-metallic-silver hover:text-electric-cyan">Music Submissions</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-midnight-black pt-8 text-center text-metallic-silver">
            <p>&copy; 2026 Spaz SsG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
