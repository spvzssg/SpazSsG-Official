import type { Metadata } from 'next'
import { OFFICIAL_LINKS } from '@spaz/config'
import InstagramFeed from '../components/InstagramFeed'

export const metadata: Metadata = { title: 'Socials', description: 'Follow Spaz SsG across official social and video platforms.' }

const channels = [
  { platform: 'Instagram', description: 'Official artist account', href: OFFICIAL_LINKS.INSTAGRAM },
  { platform: 'TikTok', description: 'Official artist account', href: OFFICIAL_LINKS.TIKTOK },
  { platform: 'YouTube', description: 'Videos, Shorts and livestreams', href: OFFICIAL_LINKS.YOUTUBE_CHANNEL },
  { platform: 'Twitch', description: 'Livestream channel', href: OFFICIAL_LINKS.TWITCH },
]

export default function SocialPage() {
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Official channels</div><h1 className="page-heading">Socials</h1><p>Find the latest posts, videos and updates on the artist's official channels.</p></div></section>
    <section className="section"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">Follow the updates</div><h2>Across the platforms.</h2></div></div>
      <div className="link-grid">{channels.map((channel) => <a className="link-card" href={channel.href} target="_blank" rel="noreferrer" key={channel.platform}><span>Official channel</span><strong>{channel.platform}</strong><small>{channel.description} ↗</small></a>)}</div>
    </div></section>
    <section className="section section--dark" aria-labelledby="instagram-feed-heading">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">Instagram</div><h2 id="instagram-feed-heading">Latest from the feed.</h2></div><a className="text-link" href={OFFICIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer">Open Instagram ↗</a></div>
        <InstagramFeed />
      </div>
    </section>
  </>
}
