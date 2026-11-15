import Link from 'next/link'
import BrandLogo from './BrandLogo'
import { OFFICIAL_LINKS } from '@spaz/config'

const groups = [
  { title: 'Music', links: [
    { label: 'Spotify', href: OFFICIAL_LINKS.SPOTIFY },
    { label: 'Apple Music', href: OFFICIAL_LINKS.APPLE_MUSIC },
    { label: 'UnitedMasters', href: OFFICIAL_LINKS.UNITEDMASTERS },
  ] },
  { title: 'Follow', links: [
    { label: 'Instagram', href: OFFICIAL_LINKS.INSTAGRAM },
    { label: 'TikTok', href: OFFICIAL_LINKS.TIKTOK },
    { label: 'YouTube', href: OFFICIAL_LINKS.YOUTUBE_CHANNEL },
    { label: 'Twitch', href: OFFICIAL_LINKS.TWITCH },
  ] },
  { title: 'Community', links: [
    { label: 'The Dreamers Club', href: OFFICIAL_LINKS.DISCORD },
    { label: 'Music submissions', href: OFFICIAL_LINKS.MUSIC_SUBMISSIONS },
  ] },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <Link className="site-footer__logo" href="/" aria-label="Spaz SsG home"><BrandLogo className="site-footer__logo-image" /></Link>
          <p className="muted">Independent sound. Unfinished dreams. No shortcuts.</p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            {group.links.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="site-footer__bottom">© {new Date().getFullYear()} Spaz SsG. All rights reserved.</div>
    </footer>
  )
}
