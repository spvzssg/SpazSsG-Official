import 'server-only'

import { createSupabaseServerClient } from './server'

export type PublicRelease = {
  id: string
  title: string
  slug: string
  artist_name: string
  release_type: string
  release_date: string | null
  cover_art_url: string | null
  description: string | null
  is_featured: boolean
  music_platform_links: { id: string; platform: string; url: string; display_order: number }[]
}

export type PublicAnnouncement = {
  id: string
  title: string
  content: string
  published_at: string | null
  is_pinned: boolean
}

export type PublicLink = {
  id: string
  title: string
  url: string
  platform: string | null
  description: string | null
  category: string
  is_featured: boolean
}

export type PublicArtistProfile = {
  display_name: string
  bio: string
  mission: string
}

export type PublicStream = {
  id: string
  platform: string
  title: string
  description: string | null
  scheduled_at: string | null
  started_at: string | null
  ended_at: string | null
  live_verified_at: string | null
  stream_url: string | null
  embed_url: string | null
  thumbnail_url: string | null
  vod_url: string | null
}

export async function getPublishedReleases(limit = 12) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { configured: false as const, data: [] as PublicRelease[] }

  const { data, error } = await supabase
    .from('music_releases')
    .select('id,title,slug,artist_name,release_type,release_date,cover_art_url,description,is_featured,music_platform_links(id,platform,url,display_order)')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('release_order', { ascending: true })
    .order('release_date', { ascending: false })
    .limit(limit)

  if (error) return { configured: true as const, data: [] as PublicRelease[], unavailable: true as const }
  return { configured: true as const, data: (data ?? []) as PublicRelease[] }
}

export async function getPublishedReleaseBySlug(slug: string) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { configured: false as const, data: null }

  const { data, error } = await supabase
    .from('music_releases')
    .select('id,title,slug,artist_name,release_type,release_date,cover_art_url,description,is_featured,music_platform_links(id,platform,url,display_order)')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle()

  if (error) return { configured: true as const, data: null, unavailable: true as const }
  return { configured: true as const, data: data as PublicRelease | null }
}

export async function getPublishedAnnouncements(limit = 3) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { configured: false as const, data: [] as PublicAnnouncement[] }

  const { data, error } = await supabase
    .from('announcements')
    .select('id,title,content,published_at,is_pinned')
    .eq('is_published', true)
    .or(`scheduled_for.is.null,scheduled_for.lte.${new Date().toISOString()}`)
    .order('is_pinned', { ascending: false })
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) return { configured: true as const, data: [] as PublicAnnouncement[], unavailable: true as const }
  return { configured: true as const, data: (data ?? []) as PublicAnnouncement[] }
}

export async function getPublishedLinks() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { configured: false as const, data: [] as PublicLink[] }

  const { data, error } = await supabase
    .from('website_links')
    .select('id,title,url,platform,description,category,is_featured')
    .eq('is_published', true)
    .order('is_featured', { ascending: false })
    .order('display_order', { ascending: true })

  if (error) return { configured: true as const, data: [] as PublicLink[], unavailable: true as const }
  return { configured: true as const, data: (data ?? []) as PublicLink[] }
}

export async function getPublicArtistProfile() {
  const fallback: PublicArtistProfile = { display_name: 'Spaz SsG', bio: 'East Coast Hip-Hop Artist. Dark melodic trap. Atmospheric R&B. Cinematic production driven by ambition, sacrifice, loyalty, and dreams.', mission: '' }
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { configured: false as const, data: fallback }

  const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'artist_profile').eq('is_public', true).maybeSingle()
  if (error || !data?.value || typeof data.value !== 'object') return { configured: true as const, data: fallback }
  const value = data.value as Record<string, unknown>
  return { configured: true as const, data: {
    display_name: typeof value.display_name === 'string' ? value.display_name : fallback.display_name,
    bio: typeof value.bio === 'string' ? value.bio : fallback.bio,
    mission: typeof value.mission === 'string' ? value.mission : fallback.mission,
  } }
}

export async function getPublishedStreams(limit = 12) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return { configured: false as const, data: [] as PublicStream[] }

  const { data, error } = await supabase
    .from('livestreams')
    .select('id,platform,title,description,scheduled_at,started_at,ended_at,live_verified_at,stream_url,embed_url,thumbnail_url,vod_url')
    .eq('is_published', true)
    .or(`scheduled_at.is.null,scheduled_at.gte.${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}`)
    .order('scheduled_at', { ascending: true })
    .limit(limit)

  if (error) return { configured: true as const, data: [] as PublicStream[], unavailable: true as const }
  return { configured: true as const, data: (data ?? []) as PublicStream[] }
}

export function safeHttpsUrl(value: string | null | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}
