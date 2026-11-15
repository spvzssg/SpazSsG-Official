/**
 * Mock Data - Development fallback data
 * Used when API is not available
 */

import { Music, SocialContent, LiveStream, Announcement, User } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  email: 'artist@spazssglive.com',
  name: 'Spaz SsG',
  role: 'admin',
  createdAt: new Date('2023-01-01'),
};

export const mockMusicReleases: Music[] = [
  {
    id: 'music-1',
    title: 'Midnight Dreams',
    artistName: 'Spaz SsG',
    releaseDate: new Date('2024-01-15'),
    coverArtUrl: 'https://via.placeholder.com/300x300?text=Midnight+Dreams',
    description: 'A cinematic journey through late-night production and reflection',
    isFeatured: true,
    releaseOrder: 1,
    platformLinks: [
      {
        id: 'link-1',
        platform: 'spotify',
        url: 'https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92',
      },
      {
        id: 'link-2',
        platform: 'apple_music',
        url: 'https://music.apple.com/us/artist/spaz-ssg/1482065224',
      },
    ],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'music-2',
    title: 'Ambition & Sacrifice',
    artistName: 'Spaz SsG',
    releaseDate: new Date('2023-11-20'),
    coverArtUrl: 'https://via.placeholder.com/300x300?text=Ambition',
    description: 'Dark melodic trap exploring the cost of success',
    isFeatured: true,
    releaseOrder: 2,
    platformLinks: [
      { id: 'link-3', platform: 'spotify', url: 'https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92' },
    ],
    createdAt: new Date('2023-11-15'),
    updatedAt: new Date('2023-11-20'),
  },
];

export const mockSocialContent: SocialContent[] = [
  {
    id: 'social-1',
    platform: 'instagram',
    externalId: 'insta-123',
    title: 'Studio Session',
    description: 'Late night production vibes 🎹✨',
    thumbnailUrl: 'https://via.placeholder.com/400x500?text=Studio+Session',
    contentUrl: 'https://www.instagram.com/spvzssg',
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isFeatured: true,
    isHidden: false,
    syncedAt: new Date(),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'social-2',
    platform: 'tiktok',
    externalId: 'tiktok-456',
    title: 'Beat Drop Preview',
    description: 'New track incoming 🔥',
    thumbnailUrl: 'https://via.placeholder.com/400x500?text=Beat+Drop',
    contentUrl: 'https://www.tiktok.com/@spvzssg',
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isFeatured: true,
    isHidden: false,
    syncedAt: new Date(),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: 'social-3',
    platform: 'youtube',
    externalId: 'youtube-789',
    title: 'Production Tutorial',
    description: 'How to create cinematic trap beats',
    thumbnailUrl: 'https://via.placeholder.com/400x500?text=Tutorial',
    contentUrl: 'https://youtube.com/@spazssglive',
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    isFeatured: false,
    isHidden: false,
    syncedAt: new Date(),
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
];

export const mockLiveStream: LiveStream = {
  id: 'live-1',
  platform: 'twitch',
  title: 'Late Night Production Session',
  isLive: false,
  scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  startedAt: undefined,
  endedAt: undefined,
  thumbnailUrl: 'https://via.placeholder.com/500x300?text=Production+Session',
  vodUrl: 'https://www.twitch.tv/spazssg',
  viewerCount: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockAnnouncements: Announcement[] = [
  {
    id: 'announce-1',
    title: 'New Album Coming Soon',
    content: 'Excited to announce that the new album "Nocturnal Elevation" will be released next month!',
    isPublished: true,
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isPinned: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const mockData = {
  user: mockUser,
  musicReleases: mockMusicReleases,
  socialContent: mockSocialContent,
  liveStream: mockLiveStream,
  announcements: mockAnnouncements,
};
