'use client'

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-midnight-black pt-24">
      <nav className="fixed top-0 left-0 right-0 bg-midnight-black/95 backdrop-blur border-b border-charcoal z-50">
        <div className="container flex items-center justify-between h-16">
          <a href="/" className="text-2xl font-bold text-electric-cyan">SPAZ SSG</a>
          <div className="flex gap-8">
            <a href="/" className="text-metallic-silver hover:text-electric-cyan">Home</a>
            <a href="/music" className="text-metallic-silver hover:text-electric-cyan">Music</a>
            <a href="/social" className="text-electric-cyan">Social</a>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-charcoal">
        <div className="container">
          <h1 className="text-4xl font-bold text-electric-cyan mb-12">Social Media</h1>
          <p className="text-metallic-silver text-lg">
            Follow Spaz SsG across social media for the latest content, announcements, and behind-the-scenes updates.
          </p>
        </div>
      </section>
    </div>
  )
}
