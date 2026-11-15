'use client'

import { OFFICIAL_LINKS } from '@spaz/config'

export default function DreamersClubPage() {
  return (
    <div className="min-h-screen bg-midnight-black pt-24">
      <nav className="fixed top-0 left-0 right-0 bg-midnight-black/95 backdrop-blur border-b border-charcoal z-50">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="text-2xl font-bold text-electric-cyan">SPAZ SSG</a>
          <div className="flex gap-8">
            <a href="/" className="text-metallic-silver hover:text-electric-cyan">Home</a>
            <a href="/dreamers-club" className="text-electric-cyan">Dreamers Club</a>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-gradient-to-b from-electric-cyan/10 to-burnt-orange/10">
        <div className="container text-center">
          <h1 className="text-5xl font-bold text-electric-cyan mb-4">The Dreamers Club</h1>
          <p className="text-xl text-metallic-silver mb-8 max-w-2xl mx-auto">
            A community of artists, creators, and supporters united by music and ambition. Join us on Discord.
          </p>
          <a href={OFFICIAL_LINKS.DISCORD} target="_blank" rel="noopener noreferrer" className="btn-primary text-lg">
            Join on Discord
          </a>
        </div>
      </section>
    </div>
  )
}
