import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { OFFICIAL_LINKS } from '@spaz/config'

export const metadata: Metadata = { title: 'Release', description: 'Listen to Spaz SsG releases.' }

export default function ReleaseDetailStaticPage() {
  return <>
    <section className="page-hero"><div className="container"><Link className="text-link" href="/music">← All music</Link><div className="eyebrow" style={{ marginTop: 28 }}>Official release</div><h1 className="page-heading">Catalog Release</h1><p>Spaz SsG</p></div></section>
    <section className="section"><div className="container release-detail">
      <div className="release-detail__art"><Image src="/spaz-ssg-logo.png" alt="Spaz SsG official logo" width={1842} height={854} sizes="(max-width: 720px) 90vw, 480px" /></div>
      <div><div className="eyebrow">About this release</div><h2>Stream now</h2><p className="muted">Explore official releases and profiles on your preferred streaming platform.</p>
        <div className="platforms"><a href={OFFICIAL_LINKS.SPOTIFY} target="_blank" rel="noreferrer">Listen on Spotify ↗</a><a href={OFFICIAL_LINKS.APPLE_MUSIC} target="_blank" rel="noreferrer">Listen on Apple Music ↗</a><a href={OFFICIAL_LINKS.UNITEDMASTERS} target="_blank" rel="noreferrer">Listen on UnitedMasters ↗</a></div>
      </div>
    </div></section>
  </>
}
