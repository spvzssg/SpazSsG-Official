import Image from 'next/image'
import Link from 'next/link'
import { OFFICIAL_LINKS, ARTIST_INFO } from '@spaz/config'
import HeroMedia from './components/HeroMedia'

const destinations = [
  { number: '01', title: 'The music', text: 'Find the releases and follow the sound across your preferred streaming platform.', href: '/music', label: 'Explore music' },
  { number: '02', title: 'The signal', text: 'Follow new videos, short-form content, and updates from the official channels.', href: '/social', label: 'Find the socials' },
  { number: '03', title: 'The community', text: 'Meet the Dreamers Club and connect with the people moving in the same direction.', href: '/dreamers-club', label: 'Meet the Dreamers' },
]

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <div className="eyebrow">Independent artist · Official site</div>
          <HeroMedia />
          <p className="hero__copy">Dark melodic trap. Atmospheric R&amp;B. Cinematic emotion. A sound built for the late hours and the ones still chasing what they believe in.</p>
          <div className="hero__actions">
            <a className="button" href={OFFICIAL_LINKS.SPOTIFY} target="_blank" rel="noreferrer">Listen on Spotify <span aria-hidden="true">↗</span></a>
            <Link className="button button--ghost" href="/music">Explore the music</Link>
          </div>
          <p className="hero__index">{ARTIST_INFO.COMMUNITY_SLOGAN} <span> / </span> Keep dreaming forward</p>
        </div>
      </section>

      <section className="section" aria-labelledby="sound-heading">
        <div className="container">
          <div className="section-heading">
            <div><div className="eyebrow">Listen your way</div><h2 id="sound-heading">The sound, in your rotation.</h2></div>
            <Link className="text-link" href="/music">All music links ↗</Link>
          </div>
          <div className="release-feature">
            <div className="release-art" aria-label="Spaz SsG official logo artwork"><Image src="/spaz-ssg-logo.png" alt="Spaz SsG official logo" width={1842} height={854} sizes="(max-width: 640px) 82vw, 450px" className="release-art__logo" /></div>
            <div className="release-feature__body">
              <div className="eyebrow">Official artist profiles</div>
              <h3>Find Spaz SsG<br />on your platform.</h3>
              <p className="muted">Choose a streaming destination to explore the artist catalog. Release details will appear here when the catalog is connected.</p>
              <div className="platforms">
                <a href={OFFICIAL_LINKS.SPOTIFY} target="_blank" rel="noreferrer">Spotify ↗</a>
                <a href={OFFICIAL_LINKS.APPLE_MUSIC} target="_blank" rel="noreferrer">Apple Music ↗</a>
                <a href={OFFICIAL_LINKS.UNITEDMASTERS} target="_blank" rel="noreferrer">UnitedMasters ↗</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="journey-heading">
        <div className="container">
          <div className="section-heading"><div><div className="eyebrow">Stay connected</div><h2 id="journey-heading">Follow the journey.</h2></div></div>
          <div className="feature-grid">
            {destinations.map((item) => (
              <article className="feature-card" key={item.number}>
                <span className="feature-card__number">{item.number} / 03</span>
                <h3>{item.title}</h3><p>{item.text}</p>
                <Link href={item.href}>{item.label} ↗</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><div className="eyebrow">On the platforms</div><h2>Stay close to the signal.</h2></div></div>
          <div className="link-grid">
            <a className="link-card" href={OFFICIAL_LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noreferrer"><span>Watch</span><strong>YouTube</strong><small>Videos, streams &amp; more ↗</small></a>
            <a className="link-card" href={OFFICIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer"><span>Follow</span><strong>Instagram</strong><small>Official artist account ↗</small></a>
            <a className="link-card" href={OFFICIAL_LINKS.TIKTOK} target="_blank" rel="noreferrer"><span>Follow</span><strong>TikTok</strong><small>Official artist account ↗</small></a>
          </div>
        </div>
      </section>

      <section className="community-band">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>The Dreamers Club</div>
        <h2>For those who keep going.</h2>
        <p>A community around music, creativity, and the courage to keep dreaming through the setbacks.</p>
        <a className="button" href={OFFICIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">Join the Discord ↗</a>
      </section>
    </>
  )
}
