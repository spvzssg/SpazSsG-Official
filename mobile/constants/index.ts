/**
 * App Constants
 */

export const URLS = {
  SPOTIFY: 'https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92?si=qOhXAWBXTzydQ8kupDamSA',
  APPLE_MUSIC: 'https://music.apple.com/us/artist/spaz-ssg/1482065224',
  UNITEDMASTERS: 'https://unitedmasters.com/a/spaz-ssg',
  INSTAGRAM: 'https://www.instagram.com/spvzssg',
  TIKTOK: 'https://www.tiktok.com/@spvzssg',
  YOUTUBE: 'https://youtube.com/@spazssglive?si=Q2W5bWtYsfmAIA9p',
  TWITCH: 'https://www.twitch.tv/spazssg',
  DISCORD: 'https://discord.gg/pk3r75EgD',
  MUSIC_SUBMISSIONS: 'https://www.nero.fan/spazssglive',
};

export const ARTIST_INFO = {
  NAME: 'Spaz SsG',
  BIO: 'East Coast Hip-Hop Artist. Dark melodic trap. Atmospheric R&B. Cinematic production driven by ambition, sacrifice, loyalty, and dreams.',
  COMMUNITY_NAME: 'The Dreamers Club',
  COMMUNITY_SLOGAN: 'Calling All Dreamers',
};

export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  SLOWER: 400,
};

export const TAB_ROUTES = {
  HOME: 'home',
  MUSIC: 'music',
  SOCIAL: 'social',
  LIVE: 'live',
  EVERYTHING_SPAZ: 'everything-spaz',
  DREAMERS_CLUB: 'dreamers-club',
} as const;
