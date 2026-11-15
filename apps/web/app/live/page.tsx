import type { Metadata } from 'next'
import Image from 'next/image'
import { OFFICIAL_LINKS } from '@spaz/config'
import { getPublishedStreams, safeHttpsUrl } from '../../lib/supabase/content'

export const metadata: Metadata = { title: 'Live', description: 'Find Spaz SsG livestreams, stream archives and the official channels.' }

export default async function LivePage() {
  const result = await getPublishedStreams(12)
  const streams = result.data
  const now = Date.now()
  const liveStream = streams.find((stream) => stream.live_verified_at && now - new Date(stream.live_verified_at).getTime() < 5 * 60 * 1000 && !stream.ended_at)
  const upcoming = streams.filter((stream) => stream.scheduled_at && new Date(stream.scheduled_at).getTime() > now)
  const archives = streams.filter((stream) => stream.vod_url)

  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">The stream room</div><h1 className="page-heading">Live</h1><p>Livestreams, music sessions, reviews and community moments—follow the official channels to catch the next broadcast.</p></div></section>
    <section className="section"><div className="container">
      <div className="live-panel"><div><span className={`live-status ${liveStream ? 'live-status--active' : 'live-status--offline'}`}>{liveStream ? 'LIVE · status verified recently' : 'Offline · no active stream verified'}</span><h2 style={{ margin: '18px 0 8px', fontSize: 'clamp(25px, 4vw, 38px)' }}>{liveStream?.title ?? 'The next session starts here.'}</h2><p className="muted">{liveStream?.description ?? 'A stream is marked LIVE only when a recent verification timestamp is present. Check the official channels for current broadcasts.'}</p></div>{liveStream && safeHttpsUrl(liveStream.stream_url) ? <a className="button" href={safeHttpsUrl(liveStream.stream_url)!} target="_blank" rel="noreferrer">Watch now ↗</a> : <a className="button" href={OFFICIAL_LINKS.TWITCH} target="_blank" rel="noreferrer">Visit Twitch ↗</a>}</div>
      {liveStream && safeHttpsUrl(liveStream.embed_url) && <div className="stream-player"><iframe src={safeHttpsUrl(liveStream.embed_url)!} title={`Live stream: ${liveStream.title}`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" /></div>}
      {upcoming.length > 0 && <div className="section-heading" style={{ marginTop: 58 }}><div><div className="eyebrow">What is next</div><h2>Upcoming streams.</h2></div></div>}
      {upcoming.map((stream) => <article className="stream-row" key={stream.id}><div><span className="eyebrow">{stream.platform}</span><h3>{stream.title}</h3><p className="muted">{stream.description}</p></div><time dateTime={stream.scheduled_at ?? undefined}>{stream.scheduled_at ? new Date(stream.scheduled_at).toLocaleString() : ''}</time></article>)}
      {archives.length > 0 && <div className="section-heading" style={{ marginTop: 58 }}><div><div className="eyebrow">Watch again</div><h2>Recent streams.</h2></div></div>}
      {archives.map((stream) => { const vod = safeHttpsUrl(stream.vod_url); return vod ? <a className="stream-row stream-row--link" href={vod} target="_blank" rel="noreferrer" key={stream.id}><div><span className="eyebrow">{stream.platform}</span><h3>{stream.title}</h3></div><span className="text-link">Watch archive ↗</span></a> : null })}
      {streams.length === 0 && <div className="link-grid" style={{ marginTop: 28 }}><a className="link-card" href={OFFICIAL_LINKS.TWITCH} target="_blank" rel="noreferrer"><span>Live channel</span><strong>Twitch</strong><small>Official channel ↗</small></a><a className="link-card" href={OFFICIAL_LINKS.YOUTUBE_CHANNEL} target="_blank" rel="noreferrer"><span>Video &amp; live</span><strong>YouTube</strong><small>Official channel ↗</small></a></div>}
      <div className="live-banner" aria-hidden="true"><Image src="/spaz-ssg-logo.png" alt="" width={1842} height={854} sizes="(max-width: 640px) 90vw, 700px" /></div>
    </div></section>
  </>
}
