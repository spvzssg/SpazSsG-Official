import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { OFFICIAL_LINKS } from '@spaz/config'
import { getPublicArtistProfile } from '../../lib/supabase/content'

export const metadata: Metadata = { title: 'About', description: 'Learn about Spaz SsG, the sound, and the mission behind the music.' }

export default async function AboutPage() {
  const { data: artist } = await getPublicArtistProfile()
  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Artist · creator · dreamer</div><h1 className="page-heading">About {artist.display_name}</h1><p>A sound shaped by late nights, hard lessons, loyalty, and the decision to keep moving forward.</p></div></section>
    <section className="section"><div className="container about-layout">
      <div className="about-art"><Image src="/spaz-ssg-logo.png" alt="Spaz SsG official logo" width={1842} height={854} sizes="(max-width: 640px) 90vw, 460px" /></div>
      <div className="about-copy"><div className="eyebrow">The artist</div><h2 className="page-heading">{artist.display_name}</h2><p>{artist.bio}</p><p>{artist.mission || 'The work is rooted in ambition, sacrifice, loyalty, family, and the choice to keep dreaming through uncertainty. Each release is part of a larger journey: turning setbacks into comebacks and making something real from the hours spent creating.'}</p><p>This site is the home base for the music, the content, and the people who connect with the message.</p><div className="hero__actions"><a className="button" href={OFFICIAL_LINKS.UNITEDMASTERS} target="_blank" rel="noreferrer">Official artist profile ↗</a><Link className="button button--ghost" href="/dreamers-club">Meet the Dreamers</Link></div></div>
    </div></section>
  </>
}
