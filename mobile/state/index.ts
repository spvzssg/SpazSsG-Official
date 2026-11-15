/**
 * Zustand State Management Stores
 * Centralized application state
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  User,
  Music,
  SocialContent,
  LiveStream,
  AppSettings,
  Announcement
} from '@/types';

// Auth Store
interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    setUser: (user) => set({ user }),
    setIsLoggedIn: (value) => set({ isLoggedIn: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setError: (error) => set({ error }),
    logout: () => set({ user: null, isLoggedIn: false, error: null }),
  }))
);

// Music Store
interface MusicStore {
  releases: Music[];
  featured: Music | null;
  isLoading: boolean;
  error: string | null;
  setReleases: (releases: Music[]) => void;
  setFeatured: (music: Music | null) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMusicStore = create<MusicStore>()(
  devtools((set) => ({
    releases: [],
    featured: null,
    isLoading: false,
    error: null,
    setReleases: (releases) => set({ releases }),
    setFeatured: (featured) => set({ featured }),
    setIsLoading: (value) => set({ isLoading: value }),
    setError: (error) => set({ error }),
  }))
);

// Social Store
interface SocialStore {
  content: SocialContent[];
  isLoading: boolean;
  error: string | null;
  setContent: (content: SocialContent[]) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSocialStore = create<SocialStore>()(
  devtools((set) => ({
    content: [],
    isLoading: false,
    error: null,
    setContent: (content) => set({ content }),
    setIsLoading: (value) => set({ isLoading: value }),
    setError: (error) => set({ error }),
  }))
);

// Live Store
interface LiveStore {
  stream: LiveStream | null;
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  setStream: (stream: LiveStream | null) => void;
  setIsLive: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
}

export const useLiveStore = create<LiveStore>()(
  devtools((set) => ({
    stream: null,
    isLive: false,
    isLoading: false,
    error: null,
    setStream: (stream) => set({ stream }),
    setIsLive: (value) => set({ isLive: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setError: (error) => set({ error }),
  }))
);

// App Store
interface AppStore {
  settings: AppSettings;
  announcements: Announcement[];
  theme: 'light' | 'dark' | 'system';
  updateSettings: (settings: Partial<AppSettings>) => void;
  setAnnouncements: (announcements: Announcement[]) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useAppStore = create<AppStore>()(
  devtools((set) => ({
    settings: {
      theme: 'system',
      notificationsEnabled: true,
      notificationPreferences: {
        newMusic: true,
        newVideos: true,
        newSocial: true,
        liveNotifications: true,
        announcements: true,
      },
    },
    announcements: [],
    theme: 'system',
    updateSettings: (updates) =>
      set((state) => ({
        settings: { ...state.settings, ...updates },
      })),
    setAnnouncements: (announcements) => set({ announcements }),
    setTheme: (theme) => set({ theme }),
  }))
);
