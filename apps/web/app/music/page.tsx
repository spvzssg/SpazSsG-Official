import type { Metadata } from 'next'
import { OFFICIAL_LINKS } from '@spaz/config'
import { getPublishedReleases } from '../../lib/supabase/content'
import ReleaseGrid from './ReleaseGrid'

export const metadata: Metadata = { title: 'Music', description: 'Listen to Spaz SsG on official music platforms and discover published releases.' }

const platforms = [
  { name: 'Spotify', note: 'Artist profile & releases', href: OFFICIAL_LINKS.SPOTIFY },
  { name: 'Apple Music', note: 'Artist profile & releases', href: OFFICIAL_LINKS.APPLE_MUSIC },
  { name: 'UnitedMasters', note: 'Official artist profile', href: OFFICIAL_LINKS.UNITEDMASTERS },
  { name: 'YouTube', note: 'Official channel', href: OFFICIAL_LINKS.YOUTUBE_CHANNEL },
]

export default async function MusicPage() {
  const result = await getPublishedReleases()

  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Official artist profiles</div><h1 className="page-heading">Music</h1><p>Choose where you listen. Browse official Spaz SsG profiles and releases on your preferred platform.</p></div></section>
    <section className="section"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">Stream and discover</div><h2>Take the sound with you.</h2></div></div>
      <div className="link-grid">
        {platforms.map((platform) => <a className="link-card" href={platform.href} target="_blank" rel="noreferrer" key={platform.name}><span>Listen / discover</span><strong>{platform.name}</strong><small>{platform.note} ↗</small></a>)}
      </div>
    </div></section>
    <section className="section section--dark"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">Official catalog</div><h2>Releases</h2></div></div>
      {!result.configured ? <p className="muted">The release catalog will appear here once the website is connected to Supabase.</p> : result.unavailable ? <p className="muted">The release catalog is temporarily unavailable. Use the official streaming profiles above.</p> : <ReleaseGrid releases={result.data} />}
    </div></section>
  </>
}
