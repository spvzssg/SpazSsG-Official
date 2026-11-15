/**
 * Shared Configuration
 * Brand tokens, design system, and constants used across all platforms
 */

// ============================================================================
// BRAND COLORS
// ============================================================================

export const BRAND_COLORS = {
  electricCyan: '#00DDF5',
  burntOrange: '#FF791D',
  metallicSilver: '#D9DDE2',
  midnightBlack: '#08090C',
  charcoal: '#151515',
  white: '#FFFFFF',
} as const;

// ============================================================================
// DESIGN TOKENS
// ============================================================================

export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 48,
  10: 64,
} as const;

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;

export const FONT_SIZES = {
  xxs: 10,
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.5,
  loose: 1.6,
} as const;

export const ANIMATIONS = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 400,
} as const;

// ============================================================================
// ARTIST INFORMATION
// ============================================================================

export const ARTIST_INFO = {
  NAME: 'Spaz SsG',
  BIO: 'East Coast Hip-Hop Artist. Dark melodic trap. Atmospheric R&B. Cinematic production driven by ambition, sacrifice, loyalty, and dreams.',
  COMMUNITY_NAME: 'The Dreamers Club',
  COMMUNITY_SLOGAN: 'Calling All Dreamers',
} as const;

// ============================================================================
// OFFICIAL LINKS
// ============================================================================

export const OFFICIAL_LINKS = {
  SPOTIFY: 'https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92?si=qOhXAWBXTzydQ8kupDamSA',
  APPLE_MUSIC: 'https://music.apple.com/us/artist/spaz-ssg/1482065224',
  UNITEDMASTERS: 'https://unitedmasters.com/a/spaz-ssg',
  INSTAGRAM: 'https://www.instagram.com/spvzssg',
  TIKTOK: 'https://www.tiktok.com/@spvzssg',
  YOUTUBE: 'https://youtube.com/@spazssglive?si=Q2W5bWtYsfmAIA9p',
  TWITCH: 'https://www.twitch.tv/spazssg',
  DISCORD: 'https://discord.gg/pk3r75EgD',
  MUSIC_SUBMISSIONS: 'https://www.nero.fan/spazssglive',
} as const;

// ============================================================================
// SOCIAL PLATFORMS
// ============================================================================

export const SOCIAL_PLATFORMS = {
  INSTAGRAM: 'instagram',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  TWITCH: 'twitch',
  FACEBOOK: 'facebook',
} as const;

// ============================================================================
// STREAMING PLATFORMS
// ============================================================================

export const STREAMING_PLATFORMS = {
  SPOTIFY: 'spotify',
  APPLE_MUSIC: 'apple_music',
  YOUTUBE_MUSIC: 'youtube_music',
  UNITEDMASTERS: 'unitedmasters',
  SOUNDCLOUD: 'soundcloud',
  TIDAL: 'tidal',
  DEEZER: 'deezer',
} as const;

// ============================================================================
// LIVESTREAM PLATFORMS
// ============================================================================

export const LIVESTREAM_PLATFORMS = {
  TWITCH: 'twitch',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
} as const;

// ============================================================================
// API ENDPOINTS (for backend calls)
// ============================================================================

export const API_ENDPOINTS = {
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
} as const;

// ============================================================================
// PAGE ROUTES (for web)
// ============================================================================

export const PAGE_ROUTES = {
  HOME: '/',
  MUSIC: '/music',
  SOCIAL: '/social',
  LIVE: '/live',
  EVERYTHING_SPAZ: '/everything-spaz',
  DREAMERS_CLUB: '/dreamers-club',
  ABOUT: '/about',
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_MUSIC: '/admin/music',
  ADMIN_SOCIAL: '/admin/social',
  ADMIN_LIVESTREAMS: '/admin/livestreams',
  ADMIN_ANNOUNCEMENTS: '/admin/announcements',
} as const;

// ============================================================================
// TAB ROUTES (for mobile)
// ============================================================================

export const TAB_ROUTES = {
  HOME: 'home',
  MUSIC: 'music',
  SOCIAL: 'social',
  LIVE: 'live',
  EVERYTHING_SPAZ: 'everything-spaz',
  DREAMERS_CLUB: 'dreamers-club',
} as const;

// ============================================================================
// ENVIRONMENT
// ============================================================================

export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;

// ============================================================================
// EXPORT ALL
// ============================================================================

export const CONFIG = {
  BRAND_COLORS,
  SPACING,
  BORDER_RADIUS,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  ANIMATIONS,
  ARTIST_INFO,
  OFFICIAL_LINKS,
  SOCIAL_PLATFORMS,
  STREAMING_PLATFORMS,
  LIVESTREAM_PLATFORMS,
  API_ENDPOINTS,
  PAGE_ROUTES,
  TAB_ROUTES,
  ENV,
} as const;
