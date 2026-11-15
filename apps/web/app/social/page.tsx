import type { Metadata } from 'next'
import { OFFICIAL_LINKS } from '@spaz/config'
import InstagramFeed from '../components/InstagramFeed'
import { createSupabaseServerClient } from '../../lib/supabase/server'
import { safeHttpsUrl } from '../../lib/supabase/content'

export const metadata: Metadata = { title: 'Socials', description: 'Follow Spaz SsG across official social and video platforms.' }

type SocialPost = { id: string; platform: string; title: string | null; description: string | null; thumbnail_url: string | null; embed_url: string | null; content_url: string; posted_at: string | null; is_featured: boolean }

const channels = [
  { platform: 'Instagram', description: 'Official artist account', href: OFFICIAL_LINKS.INSTAGRAM },
  { platform: 'TikTok', description: 'Official artist account', href: OFFICIAL_LINKS.TIKTOK },
  { platform: 'YouTube', description: 'Videos, Shorts and livestreams', href: OFFICIAL_LINKS.YOUTUBE_CHANNEL },
  { platform: 'Twitch', description: 'Livestream channel', href: OFFICIAL_LINKS.TWITCH },
]

function safeSocialEmbed(value: string | null) {
  const url = safeHttpsUrl(value)
  if (!url) return null
  try {
    const parsed = new URL(url)
    const allowed = ['youtube.com', 'www.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com', 'player.twitch.tv', 'www.tiktok.com', 'www.instagram.com']
    return allowed.includes(parsed.hostname) ? parsed.toString() : null
  } catch {
    return null
  }
}

export default async function SocialPage() {
  const supabase = await createSupabaseServerClient()
  let posts: SocialPost[] = []
  if (supabase) {
    const { data } = await supabase.from('social_content').select('id,platform,title,description,thumbnail_url,embed_url,content_url,posted_at,is_featured').eq('is_published', true).order('is_featured', { ascending: false }).order('posted_at', { ascending: false }).limit(12)
    posts = (data ?? []) as SocialPost[]
  }

  return <>
    <section className="page-hero"><div className="container"><div className="eyebrow">Official channels</div><h1 className="page-heading">Socials</h1><p>Find the latest posts, videos and updates on the artist's official channels.</p></div></section>
    <section className="section"><div className="container">
      <div className="section-heading"><div><div className="eyebrow">Follow the updates</div><h2>Across the platforms.</h2></div></div>
      <div className="link-grid">{channels.map((channel) => <a className="link-card" href={channel.href} target="_blank" rel="noreferrer" key={channel.platform}><span>Official channel</span><strong>{channel.platform}</strong><small>{channel.description} ↗</small></a>)}</div>
    </div></section>
    {posts.length > 0 && <section className="section"><div className="container"><div className="section-heading"><div><div className="eyebrow">Published content</div><h2>Recent posts.</h2></div></div><div className="social-grid">{posts.map((post) => { const external = safeHttpsUrl(post.content_url); const embed = safeSocialEmbed(post.embed_url); const thumbnail = safeHttpsUrl(post.thumbnail_url); return <article className="social-card" key={post.id}>{embed && <iframe src={embed} title={post.title ?? `${post.platform} post`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}{!embed && thumbnail && <a href={external ?? '#'} target="_blank" rel="noreferrer"><img src={thumbnail} alt={post.title ?? `${post.platform} post`} loading="lazy" /></a>}<div className="social-card__body"><span className="eyebrow">{post.platform}{post.is_featured ? ' · featured' : ''}</span><h3>{post.title ?? 'Spaz SsG'}</h3>{post.description && <p className="muted">{post.description}</p>}{external && <a className="text-link" href={external} target="_blank" rel="noreferrer">Open original ↗</a>}</div></article> })}</div></div></section>}
    <section className="section section--dark" aria-labelledby="instagram-feed-heading">
      <div className="container">
        <div className="section-heading"><div><div className="eyebrow">Instagram</div><h2 id="instagram-feed-heading">Latest from the feed.</h2></div><a className="text-link" href={OFFICIAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer">Open Instagram ↗</a></div>
        <InstagramFeed />
      </div>
    </section>
  </>
}
