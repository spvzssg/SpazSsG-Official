/**
 * Core Application Types
 * Shared TypeScript type definitions across mobile and web platforms
 *
 * Single source of truth for all data structures in the application
 */

// ============================================================================
// AUTH TYPES
// ============================================================================

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

// ============================================================================
// MUSIC TYPES
// ============================================================================

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

// ============================================================================
// SOCIAL TYPES
// ============================================================================

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

// ============================================================================
// LIVESTREAM TYPES
// ============================================================================

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

// ============================================================================
// APP STATE TYPES
// ============================================================================

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

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

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

// ============================================================================
// NAVIGATION TYPES (React Router for web, React Navigation for mobile)
// ============================================================================

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

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

export interface ButtonProps {
  title: string;
  onPress?: () => void;
  onClick?: () => void;
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
  onChangeText?: (text: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  type?: string;
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
  onClick?: () => void;
  style?: Record<string, any>;
  className?: string;
  testID?: string;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

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

// ============================================================================
// PAGINATION TYPES
// ============================================================================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// HOME PAGE TYPES
// ============================================================================

export interface HomeData {
  featured: Music | null;
  recent: Music[];
  announcements: Announcement[];
  social: SocialContent[];
  liveStream: LiveStream | null;
}

// ============================================================================
// ADMIN TYPES
// ============================================================================

export interface AdminDashboardStats {
  totalReleases: number;
  totalSocialPosts: number;
  totalAnnouncements: number;
  activeIntegrations: number;
  lastUpdated: Date;
}
