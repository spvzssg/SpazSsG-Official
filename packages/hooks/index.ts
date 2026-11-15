/**
 * Shared React Hooks
 * Data fetching and state management hooks used by both mobile and web
 *
 * These hooks abstract away platform differences and provide consistent
 * data access patterns across all applications.
 */

import { useState, useEffect, useCallback } from 'react';
import type {
  HomeData,
  Music,
  SocialContent,
  LiveStream,
  Announcement,
  AppError,
} from '@spaz/types';

// Mock data - replaced with real API calls in production
const mockHomeData: HomeData = {
  featured: {
    id: '1',
    title: 'Featured Track',
    artistName: 'Spaz SsG',
    releaseDate: new Date(),
    coverArtUrl: 'https://via.placeholder.com/300',
    description: 'Latest featured release',
    isFeatured: true,
    platformLinks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  recent: [],
  announcements: [],
  social: [],
  liveStream: null,
};

// ============================================================================
// HOME HOOK - Fetch featured content, recent releases, announcements
// ============================================================================

interface UseHomeReturn {
  data: HomeData | null;
  loading: boolean;
  error: AppError | null;
  refresh: () => Promise<void>;
}

export function useHome(): UseHomeReturn {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const fetchHomeData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase queries
      // const [featured, recent, announcements, social] = await Promise.all([
      //   supabase.from('music_releases').select('*').eq('is_featured', true).single(),
      //   supabase.from('music_releases').select('*').order('release_date', { ascending: false }).limit(3),
      //   supabase.from('announcements').select('*').eq('is_published', true).limit(5),
      //   supabase.from('social_content').select('*').eq('is_hidden', false).limit(6),
      // ]);

      // For now, use mock data
      setData(mockHomeData);
    } catch (err) {
      const appError = err instanceof Error
        ? new (require('@spaz/types')).AppError('FETCH_ERROR', err.message, true)
        : new (require('@spaz/types')).AppError('UNKNOWN_ERROR', 'An unknown error occurred', true);
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  return { data, loading, error, refresh: fetchHomeData };
}

// ============================================================================
// MUSIC HOOK - Fetch music releases
// ============================================================================

interface UseMusicReturn {
  releases: Music[];
  loading: boolean;
  error: AppError | null;
  refresh: () => Promise<void>;
}

export function useMusic(): UseMusicReturn {
  const [releases, setReleases] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const fetchMusic = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase query
      // const { data, error: err } = await supabase
      //   .from('music_releases')
      //   .select('*')
      //   .order('release_date', { ascending: false });

      setReleases([]);
    } catch (err) {
      const appError = err instanceof Error
        ? new (require('@spaz/types')).AppError('FETCH_ERROR', err.message, true)
        : new (require('@spaz/types')).AppError('UNKNOWN_ERROR', 'An unknown error occurred', true);
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMusic();
  }, [fetchMusic]);

  return { releases, loading, error, refresh: fetchMusic };
}

// ============================================================================
// SOCIAL HOOK - Fetch social content
// ============================================================================

interface UseSocialReturn {
  content: SocialContent[];
  loading: boolean;
  error: AppError | null;
  refresh: () => Promise<void>;
}

export function useSocial(): UseSocialReturn {
  const [content, setContent] = useState<SocialContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const fetchSocial = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase query
      // const { data, error: err } = await supabase
      //   .from('social_content')
      //   .select('*')
      //   .eq('is_hidden', false)
      //   .order('posted_at', { ascending: false });

      setContent([]);
    } catch (err) {
      const appError = err instanceof Error
        ? new (require('@spaz/types')).AppError('FETCH_ERROR', err.message, true)
        : new (require('@spaz/types')).AppError('UNKNOWN_ERROR', 'An unknown error occurred', true);
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSocial();
  }, [fetchSocial]);

  return { content, loading, error, refresh: fetchSocial };
}

// ============================================================================
// LIVE HOOK - Fetch livestream status and schedule
// ============================================================================

interface UseLiveReturn {
  stream: LiveStream | null;
  loading: boolean;
  error: AppError | null;
  refresh: () => Promise<void>;
}

export function useLive(): UseLiveReturn {
  const [stream, setStream] = useState<LiveStream | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const fetchLive = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase query
      // const { data, error: err } = await supabase
      //   .from('livestreams')
      //   .select('*')
      //   .eq('is_live', true)
      //   .single();

      setStream(null);
    } catch (err) {
      const appError = err instanceof Error
        ? new (require('@spaz/types')).AppError('FETCH_ERROR', err.message, true)
        : new (require('@spaz/types')).AppError('UNKNOWN_ERROR', 'An unknown error occurred', true);
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLive();
  }, [fetchLive]);

  return { stream, loading, error, refresh: fetchLive };
}

// ============================================================================
// ANNOUNCEMENTS HOOK - Fetch announcements
// ============================================================================

interface UseAnnouncementsReturn {
  announcements: Announcement[];
  loading: boolean;
  error: AppError | null;
  refresh: () => Promise<void>;
}

export function useAnnouncements(): UseAnnouncementsReturn {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Replace with actual Supabase query
      // const { data, error: err } = await supabase
      //   .from('announcements')
      //   .select('*')
      //   .eq('is_published', true)
      //   .order('published_at', { ascending: false });

      setAnnouncements([]);
    } catch (err) {
      const appError = err instanceof Error
        ? new (require('@spaz/types')).AppError('FETCH_ERROR', err.message, true)
        : new (require('@spaz/types')).AppError('UNKNOWN_ERROR', 'An unknown error occurred', true);
      setError(appError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  return { announcements, loading, error, refresh: fetchAnnouncements };
}

// ============================================================================
// INDEX - Export all hooks
// ============================================================================

export * from './useHome';
