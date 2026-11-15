# PHASE 3: ARCHITECTURE & PROJECT STRUCTURE

**Status**: Architecture Planning & Setup Documentation  
**Date**: 2026-11-14  
**For**: React Native/Expo Mobile Application  
**Next Step**: Code Implementation (once approved)

---

## PROJECT OVERVIEW

The Spaz SsG mobile application is structured as a React Native/Expo project with clear separation of concerns:

### Technology Stack (Confirmed)

**Frontend**:
- React Native 0.73
- Expo 50.0
- Expo Router (file-based navigation)
- TypeScript 5.2
- Zustand (state management)

**Backend**:
- Supabase (PostgreSQL + Auth + Storage)
- Axios (HTTP client)
- Environment-based configuration

**Build & Deploy**:
- Expo Application Services (EAS)
- iOS + Android support

---

## COMPLETE PROJECT STRUCTURE

```
spaz-ssg-mobile/
├── mobile/                              # React Native/Expo app
│   ├── app/                             # Expo Router pages (file-based routing)
│   │   ├── _layout.tsx                  # Root layout with providers
│   │   ├── (tabs)/                      # Tab group (bottom navigation)
│   │   │   ├── _layout.tsx              # Tab navigator setup
│   │   │   ├── home.tsx                 # Home tab screen
│   │   │   ├── music.tsx                # Music tab screen
│   │   │   ├── social.tsx               # Social tab screen
│   │   │   ├── live.tsx                 # LIVE tab screen
│   │   │   ├── everything-spaz.tsx      # Everything Spaz tab
│   │   │   └── dreamers-club.tsx        # Dreamers Club tab
│   │   │
│   │   ├── (auth)/                      # Auth group (login/signup)
│   │   │   ├── login.tsx                # Login screen
│   │   │   ├── signup.tsx               # Sign up screen
│   │   │   └── reset-password.tsx       # Password reset
│   │   │
│   │   ├── [details]/                   # Dynamic route for detail screens
│   │   │   ├── music-detail.tsx         # Music release detail
│   │   │   ├── artist-profile.tsx       # Artist profile
│   │   │   └── content-detail.tsx       # Social content detail
│   │   │
│   │   ├── admin/                       # Admin dashboard (web-based)
│   │   │   ├── _layout.tsx              # Admin layout
│   │   │   ├── dashboard.tsx            # Admin home
│   │   │   ├── artist-profile.tsx       # Edit artist profile
│   │   │   ├── music-management.tsx     # Manage music releases
│   │   │   ├── social-management.tsx    # Manage social content
│   │   │   ├── integrations.tsx         # Configure integrations
│   │   │   ├── notifications.tsx        # Send notifications
│   │   │   └── analytics.tsx            # View analytics
│   │   │
│   │   ├── +html.tsx                    # Web fallback
│   │   └── +not-found.tsx               # 404 page
│   │
│   ├── components/                      # Reusable UI components
│   │   ├── shared/                      # Shared/base components
│   │   │   ├── Button.tsx               # Button component
│   │   │   ├── Input.tsx                # Input component
│   │   │   ├── Card.tsx                 # Card component
│   │   │   ├── Badge.tsx                # Badge component
│   │   │   ├── Modal.tsx                # Modal component
│   │   │   ├── Loader.tsx               # Loading spinner
│   │   │   ├── EmptyState.tsx           # Empty state
│   │   │   ├── ErrorState.tsx           # Error state
│   │   │   └── SafeArea.tsx             # Safe area wrapper
│   │   │
│   │   ├── Navigation/                  # Navigation components
│   │   │   ├── TabBar.tsx               # Bottom tab navigation
│   │   │   ├── TabBarIcon.tsx           # Tab icon
│   │   │   └── Header.tsx               # Screen header
│   │   │
│   │   ├── Home/                        # Home screen components
│   │   │   ├── HeroSection.tsx          # Hero with logo
│   │   │   ├── LiveBadge.tsx            # Live status badge
│   │   │   ├── FeaturedRelease.tsx      # Featured music card
│   │   │   ├── RecentCarousel.tsx       # Recent releases carousel
│   │   │   ├── SocialFeed.tsx           # Social feed integration
│   │   │   ├── AnnouncementBanner.tsx   # Announcement display
│   │   │   └── DreamersCTA.tsx          # CTA banner
│   │   │
│   │   ├── Music/                       # Music screen components
│   │   │   ├── DSPCard.tsx              # Music platform card
│   │   │   ├── ReleaseList.tsx          # Releases list
│   │   │   ├── ReleaseItem.tsx          # Single release item
│   │   │   ├── TrackList.tsx            # Track listing
│   │   │   └── ReleaseDetail.tsx        # Release detail screen
│   │   │
│   │   ├── Social/                      # Social screen components
│   │   │   ├── PlatformTabs.tsx         # Platform filter tabs
│   │   │   ├── SocialFeedItem.tsx       # Social post item
│   │   │   ├── MediaViewer.tsx          # Image/video viewer
│   │   │   └── SocialList.tsx           # Feed list
│   │   │
│   │   ├── Live/                        # Live screen components
│   │   │   ├── StreamStatus.tsx         # Stream status card
│   │   │   ├── OfflineState.tsx         # Offline display
│   │   │   ├── ScheduleItem.tsx         # Stream schedule
│   │   │   ├── VODCard.tsx              # VOD/clip card
│   │   │   └── StreamList.tsx           # Previous streams
│   │   │
│   │   ├── EverythingSpaz/              # Everything Spaz components
│   │   │   ├── LinkCard.tsx             # Link directory card
│   │   │   ├── CategoryHeader.tsx       # Category label
│   │   │   ├── LinkGrid.tsx             # Links organized
│   │   │   └── ShareButton.tsx          # Share directory
│   │   │
│   │   └── DreamersClub/                # Dreamers Club components
│   │       ├── HeroBanner.tsx           # Hero banner
│   │       ├── CommunityInfo.tsx        # Community description
│   │       ├── InfoCard.tsx             # Info highlight
│   │       ├── Guidelines.tsx           # Guidelines list
│   │       └── EventsList.tsx           # Events display
│   │
│   ├── hooks/                           # Custom React hooks
│   │   ├── useAuth.ts                   # Authentication hook
│   │   ├── useMusic.ts                  # Music data hook
│   │   ├── useSocial.ts                 # Social content hook
│   │   ├── useLive.ts                   # Livestream hook
│   │   ├── useNotifications.ts          # Notifications hook
│   │   ├── useTheme.ts                  # Theme hook
│   │   ├── useTabRouting.ts             # Tab navigation hook
│   │   └── useAsync.ts                  # Async data loading
│   │
│   ├── services/                        # API & external services
│   │   ├── supabase.ts                  # Supabase client setup
│   │   ├── auth.service.ts              # Authentication service
│   │   ├── music.service.ts             # Music API service
│   │   ├── social.service.ts            # Social media service
│   │   ├── live.service.ts              # Livestream service
│   │   ├── notifications.service.ts     # Notifications service
│   │   ├── analytics.service.ts         # Analytics tracking
│   │   ├── storage.service.ts           # Local device storage
│   │   ├── api.client.ts                # Axios HTTP client
│   │   └── integrations/                # External API integrations
│   │       ├── spotify.ts               # Spotify API
│   │       ├── youtube.ts               # YouTube API
│   │       ├── twitch.ts                # Twitch API
│   │       └── social.ts                # Social platforms
│   │
│   ├── state/                           # State management (Zustand)
│   │   ├── auth.store.ts                # Auth state
│   │   ├── music.store.ts               # Music data state
│   │   ├── social.store.ts              # Social content state
│   │   ├── live.store.ts                # Livestream state
│   │   ├── app.store.ts                 # App settings state
│   │   └── notifications.store.ts       # Notification preferences
│   │
│   ├── types/                           # TypeScript type definitions
│   │   ├── auth.ts                      # Auth types
│   │   ├── music.ts                     # Music types
│   │   ├── social.ts                    # Social types
│   │   ├── live.ts                      # Livestream types
│   │   ├── api.ts                       # API response types
│   │   ├── app.ts                       # App types
│   │   └── index.ts                     # Type exports
│   │
│   ├── styles/                          # Design tokens & themes
│   │   ├── tokens.ts                    # All design tokens
│   │   ├── colors.ts                    # Color definitions
│   │   ├── typography.ts                # Font setup
│   │   ├── spacing.ts                   # Spacing scale
│   │   ├── animations.ts                # Animation definitions
│   │   ├── theme.ts                     # Theme provider
│   │   └── GlobalStyles.tsx             # Global styling
│   │
│   ├── utils/                           # Utility functions
│   │   ├── formatting.ts                # Text formatting (dates, currency)
│   │   ├── validation.ts                # Form validation
│   │   ├── storage.ts                   # Device storage helpers
│   │   ├── constants.ts                 # App constants
│   │   ├── deeplink.ts                  # Deep linking
│   │   ├── error-handler.ts             # Error handling
│   │   ├── logger.ts                    # Logging utility
│   │   └── platform.ts                  # Platform detection
│   │
│   ├── assets/                          # Images, fonts, media
│   │   ├── branding/                    # Brand assets
│   │   │   └── logo/
│   │   │       ├── spaz-ssg-logo-original.png
│   │   │       ├── spaz-ssg-logo-sm.png
│   │   │       ├── spaz-ssg-logo-md.png
│   │   │       ├── spaz-ssg-logo-lg.png
│   │   │       └── spaz-ssg-logo-hero.png
│   │   ├── icons/                       # App icons
│   │   │   ├── home.svg
│   │   │   ├── music.svg
│   │   │   ├── social.svg
│   │   │   └── ... (more icons)
│   │   ├── platform-logos/              # DSP & platform logos
│   │   │   ├── spotify.svg
│   │   │   ├── apple-music.svg
│   │   │   ├── youtube.svg
│   │   │   └── ... (more)
│   │   └── backgrounds/                 # Background images
│   │       ├── gradient-hero.png
│   │       └── pattern.png
│   │
│   ├── contexts/                        # React contexts
│   │   ├── AuthContext.tsx              # Auth provider
│   │   ├── ThemeContext.tsx             # Theme provider
│   │   └── NotificationContext.tsx      # Notification provider
│   │
│   ├── constants/                       # App constants
│   │   ├── urls.ts                      # URLs (music platforms, social)
│   │   ├── api.ts                       # API endpoints
│   │   ├── mockData.ts                  # Mock data for development
│   │   └── features.ts                  # Feature flags
│   │
│   ├── mocks/                           # Mock data & services
│   │   ├── mockMusic.ts                 # Mock music releases
│   │   ├── mockSocial.ts                # Mock social content
│   │   ├── mockLive.ts                  # Mock livestream data
│   │   └── mockServices.ts              # Mock API responses
│   │
│   ├── __tests__/                       # Test files (mirroring src)
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── app.json                         # Expo configuration
│   ├── app.config.ts                    # Expo config (TypeScript)
│   ├── eas.json                         # EAS build configuration
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── package.json                     # Dependencies (created)
│   ├── .env.example                     # Environment template
│   ├── .gitignore                       # Git ignore rules
│   ├── babel.config.js                  # Babel configuration
│   ├── metro.config.js                  # Metro bundler config
│   └── jest.config.js                   # Jest test configuration
│
├── backend/                             # Backend configuration
│   ├── supabase/
│   │   ├── migrations/                  # SQL migrations
│   │   │   ├── 001_initial_schema.sql
│   │   │   ├── 002_rls_policies.sql
│   │   │   └── 003_indexes.sql
│   │   ├── functions/                   # Edge Functions
│   │   │   ├── sync-spotify/index.ts
│   │   │   ├── sync-youtube/index.ts
│   │   │   ├── send-notification/index.ts
│   │   │   ├── update-livestream-status/index.ts
│   │   │   └── analytics-event/index.ts
│   │   └── config.toml                  # Supabase config
│   └── .env.example                     # Backend env template
│
├── docs/                                # Documentation (Phase 1-2)
│   ├── ARCHITECTURE.md
│   ├── DATABASE_SCHEMA.md
│   ├── API_CREDENTIALS_SETUP.md
│   ├── API_INTEGRATION_STATUS.md
│   ├── DESIGN_SYSTEM.md
│   ├── SCREEN_SPECIFICATIONS.md
│   ├── PHASE_1_SUMMARY.md
│   ├── PHASE_2_SUMMARY.md
│   └── PHASE_3_STRUCTURE.md (this file)
│
├── .env.example                         # Root environment template
├── .gitignore                           # Git ignore
├── README.md                            # Project README
├── CLAUDE.md                            # Claude development guide
├── SPAZ_SSG_LOGO_ASSET.txt             # Logo documentation
└── package.json                         # Root workspace config
```

---

## CORE ARCHITECTURE PATTERNS

### 1. File-Based Routing (Expo Router)

**How it works**:
- Each file in `app/` directory becomes a route
- `(tabs)` = route group (not in URL)
- `_layout.tsx` = layout wrapper
- Dynamically generated bottom navigation

**Route structure**:
```
app/
  (tabs)/
    _layout.tsx         → Renders TabNavigator with bottom nav
    home.tsx            → tab.home
    music.tsx           → tab.music
    social.tsx          → tab.social
    live.tsx            → tab.live
    everything-spaz.tsx → tab.everything-spaz
    dreamers-club.tsx   → tab.dreamers-club
```

**Navigation pattern**:
```typescript
// Navigate between tabs
router.push('/(tabs)/music');

// Navigate to detail screen
router.push('/music-detail/release-id-123');

// Navigate with params
router.push({
  pathname: '/(tabs)/music',
  params: { refresh: true }
});
```

### 2. State Management (Zustand)

**Why Zustand?**
- Lightweight (no boilerplate)
- Easy to understand
- Works great with React Hooks
- TypeScript support
- No context hell

**Store pattern**:
```typescript
// Example: auth.store.ts
import { create } from 'zustand';
import { AuthState } from '@/types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

// Usage in components
const { user, isLoggedIn } = useAuthStore();
```

### 3. Service Layer

**Services handle**:
- API calls (Supabase, external APIs)
- Data transformation
- Error handling
- Caching logic

**Example structure**:
```typescript
// services/music.service.ts
export class MusicService {
  // Fetch releases from Supabase
  static async getReleases() { }
  
  // Fetch from Spotify
  static async getSpotifyArtist() { }
  
  // Search music
  static async searchReleases(query) { }
}

// Usage in hook
const useMusic = () => {
  const [releases, setReleases] = useState([]);
  
  useEffect(() => {
    MusicService.getReleases().then(setReleases);
  }, []);
  
  return { releases };
};
```

### 4. Hook-Based Data Loading

**Custom hooks encapsulate data logic**:
```typescript
// hooks/useMusic.ts
export const useMusic = () => {
  const [data, setData] = useState<Music[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const releases = await MusicService.getReleases();
        setData(releases);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  return { data, loading, error };
};

// Usage in component
export function MusicScreen() {
  const { data: releases, loading } = useMusic();
  
  if (loading) return <Loader />;
  return <ReleaseList releases={releases} />;
}
```

### 5. Component Composition

**Small, focused components**:
```typescript
// Button.tsx - Base component
export interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, variant = 'primary', ...props }: ButtonProps) {
  return <Pressable style={[styles.button, styles[variant]]} {...props}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>;
}

// DSPCard.tsx - Composite component using Button
export function DSPCard({ platform, url }: DSPCardProps) {
  return <Card>
    <Image source={getPlatformIcon(platform)} />
    <Text>{platform}</Text>
    <Button title="Open" onPress={() => openURL(url)} />
  </Card>;
}
```

### 6. Type Safety

**Comprehensive TypeScript types**:
```typescript
// types/music.ts
export interface Music {
  id: string;
  title: string;
  artistName: string;
  releaseDate: Date;
  coverArtUrl: string;
  description?: string;
  isFeatured: boolean;
  platformLinks: PlatformLink[];
}

export interface PlatformLink {
  platform: 'spotify' | 'apple_music' | 'youtube_music';
  url: string;
}
```

### 7. Error Handling

**Consistent error handling**:
```typescript
// utils/error-handler.ts
export class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public isRetryable: boolean = true
  ) {
    super(message);
  }
}

// services/music.service.ts
try {
  const data = await supabase.from('music_releases').select();
} catch (error) {
  throw new AppError(
    'FETCH_RELEASES_ERROR',
    'Failed to load music releases',
    true
  );
}

// Component
const { data, error } = useMusic();
if (error?.isRetryable) {
  return <ErrorState onRetry={() => refetch()} />;
}
```

---

## SCREEN IMPLEMENTATION PATTERN

Each screen follows this structure:

### Example: Home Screen

**File**: `app/(tabs)/home.tsx`

```typescript
import { useHome } from '@/hooks/useHome';
import { HeroSection } from '@/components/Home/HeroSection';
import { FeaturedRelease } from '@/components/Home/FeaturedRelease';
import { SafeArea } from '@/components/shared/SafeArea';

export default function HomeScreen() {
  // 1. Data loading
  const { 
    featured, 
    recent, 
    social, 
    liveStatus, 
    loading, 
    error 
  } = useHome();
  
  // 2. Error state
  if (error) return <ErrorState />;
  
  // 3. Loading state
  if (loading) return <Loader />;
  
  // 4. Render
  return (
    <SafeArea>
      <ScrollView>
        <HeroSection />
        {liveStatus.isLive && <LiveBadge {...liveStatus} />}
        <FeaturedRelease release={featured} />
        <RecentCarousel releases={recent} />
        <SocialFeed items={social} />
        {/* More sections */}
      </ScrollView>
    </SafeArea>
  );
}
```

### Component Structure

Each screen component:
1. **Imports** - Dependencies, components, hooks
2. **Types** - Component prop types
3. **Hooks** - Data loading
4. **State** - Local UI state
5. **Effects** - Setup and cleanup
6. **Render** - JSX with error/loading states

---

## COMPONENT LIBRARY ORGANIZATION

### Base Components (`components/shared/`)

These are reusable across all screens:

```
Button.tsx
├── Props: title, variant, onPress, disabled, size
├── Variants: primary, secondary, tertiary, disabled
├── States: default, hover, active, focus, disabled
└── Exports: Button component, button styles

Input.tsx
├── Props: value, onChangeText, placeholder, error, disabled
├── Types: text, email, password, number
└── States: focused, error, disabled

Card.tsx
├── Props: children, variant, onPress, style
├── Variants: standard, elevated, featured
└── States: default, pressed

Badge.tsx
├── Props: text, variant, size
├── Variants: primary, secondary, success, error, warning
└── Sizes: sm, md, lg
```

### Composite Components

Built from base components:

```
DSPCard (Music/Social)
├── Icon + Text + Button (base components)
└── Purpose: Link to music platform

ReleaseCard (Music)
├── Image + Title + Subtitle + Button
└── Purpose: Display music release

SocialFeedItem (Social)
├── Badge + Image + Caption + Link
└── Purpose: Display social post

StreamStatus (Live)
├── Badge + Title + Metadata + Button
└── Purpose: Show stream status
```

---

## STATE MANAGEMENT FLOWS

### Authentication Flow

```
1. User opens app
   ↓
2. Check localStorage for session
   ↓
3. If session exists → Load user data
   ↓
4. Show app or login screen
   ↓
5. User logs in/signs up
   ↓
6. Create session in Supabase
   ↓
7. Store in localStorage
   ↓
8. Update authStore
   ↓
9. Navigate to home
```

### Data Loading Flow

```
1. Screen mounts
   ↓
2. useMusic hook triggers
   ↓
3. Set loading = true
   ↓
4. Call MusicService.getReleases()
   ↓
5. Supabase returns data
   ↓
6. Transform data
   ↓
7. Update store
   ↓
8. Set loading = false
   ↓
9. Component re-renders
```

### Real-Time Updates (Future)

```
1. Subscribe to database changes
   ↓
2. On update received
   ↓
3. Update store
   ↓
4. Components re-render automatically
```

---

## ENVIRONMENT CONFIGURATION

### `.env.example` Structure

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Spotify
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

# YouTube
YOUTUBE_API_KEY=your_api_key

# Twitch
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret

# App
EXPO_PUBLIC_APP_ENV=development|staging|production
EXPO_PUBLIC_LOG_LEVEL=debug|info|warn|error
```

**Note**: Prefix with `EXPO_PUBLIC_` for values accessible in client code (public values only).

---

## TESTING STRATEGY

### Unit Tests

```typescript
// __tests__/utils/formatting.test.ts
describe('formatDate', () => {
  it('formats date correctly', () => {
    const result = formatDate(new Date('2024-01-15'));
    expect(result).toBe('Jan 15, 2024');
  });
});
```

### Component Tests

```typescript
// __tests__/components/Button.test.tsx
describe('Button', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="Test" onPress={onPress} />);
    fireEvent.press(getByText('Test'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### Hook Tests

```typescript
// __tests__/hooks/useMusic.test.ts
describe('useMusic', () => {
  it('loads music releases', async () => {
    const { result } = renderHook(() => useMusic());
    await waitFor(() => {
      expect(result.current.data.length).toBeGreaterThan(0);
    });
  });
});
```

---

## DEVELOPMENT WORKFLOW

### Local Development

```bash
# Install dependencies
cd mobile
npm install

# Start development server
npm run start

# On separate terminal, start on iOS simulator
npm run ios

# Or Android
npm run android

# Run tests
npm run test

# Lint code
npm run lint

# Type check
npm run type-check
```

### Mock Data Development

**Before API integration**:
1. Create mock data in `constants/mockData.ts`
2. Use mock services in development
3. Switch to real services when ready

```typescript
// Development with mocks
if (__DEV__) {
  const releases = mockMusic.releases;
}

// Production with real API
const releases = await MusicService.getReleases();
```

---

## PERFORMANCE OPTIMIZATION

### Image Optimization

```typescript
// Fast-loading images with placeholder
<Image
  source={require('@/assets/logo.png')}
  style={{ width: 200, height: 120 }}
  placeholder={require('@/assets/placeholder.png')}
  placeholderContentFit="cover"
/>
```

### List Optimization

```typescript
// FlatList instead of ScrollView for lists
<FlatList
  data={releases}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ReleaseCard release={item} />}
  windowSize={10}  // Only render 10 items at a time
  maxToRenderPerBatch={5}
/>
```

### Navigation Performance

```typescript
// Prevent unnecessary re-renders
useFocusEffect(
  useCallback(() => {
    // Only load data when screen is focused
    loadData();
  }, [])
);
```

---

## SECURITY PRACTICES

### Secure Storage

```typescript
// Sensitive data: use AsyncStorage with encryption
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('sessionToken', token);
const token = await AsyncStorage.getItem('sessionToken');
```

### API Credential Management

```typescript
// Never hardcode secrets
// Use environment variables only
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL; // ✅
const secret = process.env.SPOTIFY_CLIENT_SECRET; // ✅ Not exposed in client

// Wrong
const secret = 'sk_live_...' // ❌ Never hardcode
```

### Input Validation

```typescript
// Validate all inputs
function handleMusicSearch(query: string) {
  const validated = validateSearchQuery(query);
  if (!validated) return setError('Invalid query');
  
  search(validated);
}
```

---

## BUILD CONFIGURATION

### `app.json` (Expo Configuration)

```json
{
  "expo": {
    "name": "Spaz SsG",
    "slug": "spaz-ssg-mobile",
    "version": "0.1.0",
    "platforms": ["ios", "android"],
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#08090C"
    },
    "plugins": ["expo-router"],
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/icon.png",
        "backgroundColor": "#08090C"
      }
    },
    "ios": {
      "bundleIdentifier": "com.spazssglive.mobile",
      "buildNumber": "1"
    }
  }
}
```

### `eas.json` (Build Configuration)

```json
{
  "build": {
    "production": {
      "ios": { "resourceClass": "large" },
      "android": { "resourceClass": "large" }
    }
  }
}
```

---

## DEVELOPMENT PHASES BREAKDOWN

### Week 1: Foundation Setup
- Initialize React Native/Expo project
- Set up Expo Router navigation
- Create design token system
- Build base component library (5 components)
- Set up Zustand stores
- Configure Supabase connection

### Week 2: Core Screens
- Implement Home screen
- Implement Music screen
- Implement Social screen
- Implement navigation between tabs
- Add mock data

### Week 3: Advanced Screens & Integration
- Implement LIVE screen
- Implement Everything Spaz screen
- Implement Dreamers Club screen
- Connect to Supabase for real data
- Implement authentication

### Week 4: Refinement & Testing
- Add all animations
- Implement error handling
- Add analytics
- Test on iOS and Android
- Performance optimization

---

## NEXT STEPS (DECISION POINT)

**Before Phase 3 implementation begins, decide:**

1. **Which screen should I prioritize first?**
   - A) Home screen (foundation for understanding app)
   - B) Music screen (core feature)
   - C) Social screen (complex feed)
   - D) Multiple screens in parallel (full Week 1 foundation first)

2. **Mock data or real API immediately?**
   - A) Start with comprehensive mock data
   - B) Build API integration alongside mock data
   - C) Focus on UI first, API later

3. **Component library scope?**
   - A) All 15+ components immediately
   - B) Core 5-7 components, add others as needed
   - C) Just base components, build composites per screen

4. **Testing approach?**
   - A) Full unit + component tests as we go
   - B) Focus on component tests only
   - C) Add tests after screens are working

5. **Deployment readiness?**
   - A) Build fully production-ready (follow all best practices)
   - B) Pragmatic approach (good enough to work, refine later)
   - C) Focus on functionality, worry about polish last

---

## ARCHITECTURE SUMMARY

### Key Principles

✅ **Modular**: Components, services, hooks are independent  
✅ **Type-Safe**: Full TypeScript coverage  
✅ **Scalable**: Easy to add screens, components, services  
✅ **Testable**: Unit, component, and integration tests  
✅ **Maintainable**: Clear folder structure, documented patterns  
✅ **Performant**: Optimized rendering, lazy loading  
✅ **Accessible**: WCAG AA compliance built-in  
✅ **Brand-Consistent**: Design tokens throughout  

### Technology Choices Rationale

| Tech | Why |
|------|-----|
| **Expo Router** | File-based routing, automatic bottom nav, handles deep links |
| **Zustand** | Lightweight state, no boilerplate, great DX |
| **Supabase** | PostgreSQL + Auth + Storage, open-source, cost-effective |
| **TypeScript** | Type safety, IDE support, fewer runtime errors |
| **Axios** | Simple HTTP client, interceptor support, error handling |
| **Jest + Testing Library** | Standard React testing stack, great tooling |

---

**Architecture Status**: ✅ DEFINED  
**Ready for Implementation**: ✅ YES (pending decisions below)  
**Expected Phase 3 Duration**: 3-4 weeks  
**Total Lines of Code Expected**: 15,000-25,000 lines

---

## QUESTIONS FOR ALIGNMENT

Before I proceed with implementation, please answer:

1. **Which screen to build first?** (Home / Music / Social / Social / Everything Spaz / Dreamers Club / All foundation first)

2. **Mock data approach?** (Full mocks / Mocks + API / API only)

3. **Component library scope?** (All 15+ / Core 5-7 / As-needed)

4. **Testing level?** (Full coverage / Component tests / Functionality first)

5. **Production readiness?** (Full best practices / Pragmatic / Functionality first)

6. **Any architecture changes or concerns?**

Once confirmed, I'll proceed with complete Phase 3 implementation.

