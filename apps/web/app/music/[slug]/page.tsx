import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPublishedReleaseBySlug, safeHttpsUrl } from '../../../lib/supabase/content'

export const dynamicParams = true

type PageProps = { params: { slug: string } }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = await getPublishedReleaseBySlug(params.slug)
  if (!result.data) return { title: 'Release not found' }
  const image = safeHttpsUrl(result.data.cover_art_url)
  return {
    title: result.data.title,
    description: result.data.description ?? `Listen to ${result.data.title} by ${result.data.artist_name}.`,
    openGraph: {
      title: `${result.data.title} | Spaz SsG`,
      description: result.data.description ?? `Listen to ${result.data.title} by ${result.data.artist_name}.`,
      ...(image ? { images: [image] } : {}),
      type: 'music.song',
    },
  }
}

export default async function ReleaseDetailPage({ params }: PageProps) {
  const result = await getPublishedReleaseBySlug(params.slug)
  if (!result.configured) return <section className="page-hero"><div className="container"><h1 className="page-heading">Catalog not connected</h1><p>The release catalog will be available after Supabase is configured.</p><Link className="text-link" href="/music">← All music</Link></div></section>
  if (result.unavailable) return <section className="page-hero"><div className="container"><h1 className="page-heading">Release unavailable</h1><p>Try again later or visit an official artist profile.</p><Link className="text-link" href="/music">← All music</Link></div></section>
  if (!result.data) notFound()

  const release = result.data
  const artwork = safeHttpsUrl(release.cover_art_url)

  return <>
    <section className="page-hero"><div className="container"><Link className="text-link" href="/music">← All music</Link><div className="eyebrow" style={{ marginTop: 28 }}>{release.release_type}{release.release_date ? ` · ${release.release_date}` : ''}</div><h1 className="page-heading">{release.title}</h1><p>{release.artist_name}</p></div></section>
    <section className="section"><div className="container release-detail">
      <div className="release-detail__art">{artwork ? <Image src={artwork} alt={`${release.title} cover artwork`} width={900} height={900} priority sizes="(max-width: 720px) 90vw, 480px" /> : <div className="release-detail__fallback">SPAZ<br />SSG</div>}</div>
      <div><div className="eyebrow">About this release</div><h2>{release.title}</h2><p className="muted">{release.description ?? `Listen to ${release.title} by ${release.artist_name}.`}</p>
        <div className="platforms">{[...release.music_platform_links].sort((a, b) => a.display_order - b.display_order).map((link) => { const href = safeHttpsUrl(link.url); return href ? <a href={href} target="_blank" rel="noreferrer" key={link.id}>Listen on {link.platform.replace('_', ' ')} ↗</a> : null })}</div>
      </div>
    </div></section>
  </>
}
