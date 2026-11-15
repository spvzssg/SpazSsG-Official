import Image from 'next/image'
import Link from 'next/link'
import type { PublicRelease } from '../../lib/supabase/content'
import { safeHttpsUrl } from '../../lib/supabase/content'

export default function ReleaseGrid({ releases }: { releases: PublicRelease[] }) {
  if (releases.length === 0) return <div className="admin-placeholder">No releases are published yet. Check back for new music.</div>

  return <div className="release-grid">
    {releases.map((release) => {
      const art = safeHttpsUrl(release.cover_art_url)
      return <article className="public-release-card" key={release.id}>
        <Link href={`/music/${release.slug}`} className="public-release-card__art">
          {art ? <Image src={art} alt={`${release.title} cover artwork`} width={640} height={640} sizes="(max-width: 640px) 90vw, (max-width: 920px) 44vw, 30vw" /> : <span aria-label="Artwork not available">SPAZ<br />SSG</span>}
          {release.is_featured && <span className="public-release-card__badge">Featured</span>}
        </Link>
        <div className="public-release-card__body">
          <p className="eyebrow">{release.release_type}{release.release_date ? ` · ${new Date(`${release.release_date}T00:00:00`).getFullYear()}` : ''}</p>
          <h3><Link href={`/music/${release.slug}`}>{release.title}</Link></h3>
          <p className="muted">{release.artist_name}</p>
          <div className="platforms">{[...release.music_platform_links].sort((a, b) => a.display_order - b.display_order).map((link) => {
            const href = safeHttpsUrl(link.url)
            return href ? <a href={href} target="_blank" rel="noreferrer" key={link.id}>{link.platform.replace('_', ' ')} ↗</a> : null
          })}</div>
        </div>
      </article>
    })}
  </div>
}
