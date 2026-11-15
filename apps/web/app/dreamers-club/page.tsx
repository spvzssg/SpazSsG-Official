import type { Metadata } from 'next'
import { OFFICIAL_LINKS, ARTIST_INFO } from '@spaz/config'

export const metadata: Metadata = { title: 'The Dreamers Club', description: 'Join The Dreamers Club community on Discord.' }

export default function DreamersClubPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">{ARTIST_INFO.COMMUNITY_SLOGAN}</div><h1 className="page-heading">The Dreamers Club</h1><p>A community for people who believe in what they are building—even when the path gets difficult.</p></div></section>
    <section className="section"><div className="container about-layout">
      <div className="about-art" aria-hidden="true" />
      <div className="about-copy"><div className="eyebrow">A place to connect</div><h2 className="page-heading">Keep your people close.</h2><p>The Dreamers Club brings together fans, listeners, independent artists, producers, songwriters, and creators around music and ambition.</p><p>Join the Discord to meet the community and find out what is happening. Community events and announcements will be added here as they are published.</p><a className="button" href={OFFICIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">Join on Discord ↗</a></div>
    </div></section>
  </>
}
