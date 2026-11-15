/**
 * Core Application Types
 * TypeScript type definitions for the entire application
 */

// Auth Types
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

// Music Types
export interface Music {
  id: string;
  title: string;
  artistName: string;
  releaseDate: Date;
  coverArtUrl: string;
  description?: string;
  isFeatured: boolean;
  releaseOrder?: number;
  platformLinks: PlatformLink[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlatformLink {
  id: string;
  platform: 'spotify' | 'apple_music' | 'youtube_music' | 'unitedmasters' | 'soundcloud' | 'tidal' | 'deezer';
  url: string;
  platformOrder?: number;
}

// Social Types
export interface SocialContent {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitch' | 'facebook';
  externalId: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  contentUrl: string;
  postedAt: Date;
  isFeatured: boolean;
  isHidden: boolean;
  contentOrder?: number;
  syncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialAccount {
  id: string;
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitch' | 'facebook';
  accountUrl: string;
  isConnected: boolean;
  lastSync?: Date;
  syncError?: string;
}

// Livestream Types
export interface LiveStream {
  id: string;
  platform: 'twitch' | 'tiktok' | 'youtube';
  title?: string;
  isLive: boolean;
  scheduledAt?: Date;
  startedAt?: Date;
  endedAt?: Date;
  thumbnailUrl?: string;
  vodUrl?: string;
  vodId?: string;
  viewerCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface StreamSchedule {
  id: string;
  platform: 'twitch' | 'tiktok' | 'youtube';
  title: string;
  scheduledAt: Date;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// App State Types
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  notificationsEnabled: boolean;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  newMusic: boolean;
  newVideos: boolean;
  newSocial: boolean;
  liveNotifications: boolean;
  announcements: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  publishedAt?: Date;
  scheduledFor?: Date;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error: null;
  success: true;
}

export interface ApiError {
  data: null;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  success: false;
}

// Navigation Types
export interface RootStackParamList {
  index: undefined;
  '(tabs)': undefined;
  '(auth)': undefined;
  '[details]': {
    type: 'music' | 'social' | 'artist';
    id: string;
  };
  'not-found': undefined;
}

export interface TabsParamList {
  home: undefined;
  music: undefined;
  social: undefined;
  live: undefined;
  'everything-spaz': undefined;
  'dreamers-club': undefined;
}

// Component Prop Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  testID?: string;
}

export interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  editable?: boolean;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  testID?: string;
}

export interface CardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'elevated' | 'featured';
  onPress?: () => void;
  style?: Record<string, any>;
  testID?: string;
}

// Error Types
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public isRetryable: boolean = true,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
