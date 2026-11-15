import type { Metadata } from 'next'
import { OFFICIAL_LINKS } from '@spaz/config'

export const metadata: Metadata = { title: 'All Links', description: 'Official music, social, community and service links for Spaz SsG.' }

const linkGroups = [
  { title: 'Stream music', items: [
    { name: 'Spotify', href: OFFICIAL_LINKS.SPOTIFY, detail: 'Artist profile' },
    { name: 'Apple Music', href: OFFICIAL_LINKS.APPLE_MUSIC, detail: 'Artist profile' },
    { name: 'UnitedMasters', href: OFFICIAL_LINKS.UNITEDMASTERS, detail: 'Official artist page' },
  ] },
  { title: 'Follow & watch', items: [
    { name: 'Instagram', href: OFFICIAL_LINKS.INSTAGRAM, detail: 'Official artist account' },
    { name: 'TikTok', href: OFFICIAL_LINKS.TIKTOK, detail: 'Official artist account' },
    { name: 'YouTube', href: OFFICIAL_LINKS.YOUTUBE_CHANNEL, detail: 'Official channel' },
    { name: 'Twitch', href: OFFICIAL_LINKS.TWITCH, detail: 'Live channel' },
  ] },
  { title: 'Connect', items: [
    { name: 'The Dreamers Club', href: OFFICIAL_LINKS.DISCORD, detail: 'Join the community' },
    { name: 'Music submissions', href: OFFICIAL_LINKS.MUSIC_SUBMISSIONS, detail: 'Submit for review' },
  ] },
]

export default function EverythingSpazPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">One place to find it</div><h1 className="page-heading">All Links</h1><p>Official music, social, livestream, community and submission destinations for Spaz SsG.</p></div></section>
    {linkGroups.map((group) => <section className="section" key={group.title}><div className="container"><div className="section-heading"><div><div className="eyebrow">Official destinations</div><h2>{group.title}</h2></div></div><div className="link-grid">{group.items.map((item) => <a className="link-card" href={item.href} key={item.name} target="_blank" rel="noreferrer"><span>Spaz SsG</span><strong>{item.name}</strong><small>{item.detail} ↗</small></a>)}</div></div></section>)}
  </>
}
