import type { Metadata } from 'next'
import Image from 'next/image'
import { OFFICIAL_LINKS } from '@spaz/config'

export const metadata: Metadata = { title: 'Live', description: 'Find Spaz SsG livestreams, stream archives and the official channels.' }

export default function LivePage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">The stream room</div><h1 className="page-heading">Live</h1><p>Livestreams, music sessions, reviews and community moments—follow the official channels to catch the next broadcast.</p></div></section>
    <section className="section"><div className="container">
      <div className="live-panel"><div><span className="live-status live-status--offline">Offline · No active stream verified</span><h2 style={{ margin: '18px 0 8px', fontSize: 'clamp(25px, 4vw, 38px)' }}>The next session starts here.</h2><p className="muted">This site does not have a live-status integration connected, so it will not claim a stream is live. Check the official channels for current broadcasts.</p></div><a className="button" href={OFFICIAL_LINKS.TWITCH} target="_blank" rel="noreferrer">Visit Twitch ↗</a></div>
      <div className="link-grid" style={{ marginTop: 16 }}><a className="link-card" href={OFFICIAL_LINKS.TWITCH} target="_blank" rel="noreferrer"><span>Live channel</span><strong>Twitch</strong><small>Official channel ↗</small></a><a className="link-card" href={OFFICIAL_LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noreferrer"><span>Video &amp; live</span><strong>YouTube</strong><small>Official channel ↗</small></a></div>
      <div className="live-banner" aria-hidden="true"><Image src="/spaz-ssg-logo.png" alt="" width={1842} height={854} sizes="(max-width: 640px) 90vw, 700px" /></div>
    </div></section>
  </>
}
