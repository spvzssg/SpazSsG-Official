/**
 * Custom Hook for Home Screen Data
 */

import { useEffect } from 'react';
import {
  useMusicStore,
  useSocialStore,
  useLiveStore,
  useAppStore,
} from '@/state';
import {
  mockMusicReleases,
  mockSocialContent,
  mockLiveStream,
  mockAnnouncements,
} from '@/constants/mockData';

export function useHome() {
  const { releases, featured, setReleases, setFeatured } = useMusicStore();
  const { content: socialContent, setContent: setSocialContent } = useSocialStore();
  const { stream: liveStream, setStream: setLiveStream } = useLiveStore();
  const { announcements, setAnnouncements } = useAppStore();

  useEffect(() => {
    // Load mock data
    const featuredMusic = mockMusicReleases[0];
    const recentMusic = mockMusicReleases.slice(0, 3);
    const socialFeed = mockSocialContent.slice(0, 5);

    setFeatured(featuredMusic);
    setReleases(recentMusic);
    setSocialContent(socialFeed);
    setLiveStream(mockLiveStream);
    setAnnouncements(mockAnnouncements);
  }, [setFeatured, setReleases, setSocialContent, setLiveStream, setAnnouncements]);

  return {
    featured,
    recent: releases,
    social: socialContent,
    liveStream,
    announcements,
    isLive: liveStream?.isLive ?? false,
  };
}
