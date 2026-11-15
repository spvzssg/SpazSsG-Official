# SPAZ SSG: MOBILE-TO-WEB TRANSFORMATION ANALYSIS
**Strategic Plan: React Native Mobile App + Next.js Website**

**Status**: Analysis & Architecture Planning  
**Date**: 2026-11-15  
**Scope**: Dual-platform expansion (mobile + web)  

---

## EXECUTIVE SUMMARY

### The Opportunity

The current React Native/Expo mobile app has an excellent foundation:
- ✅ Complete Home screen with all interactive elements
- ✅ 6-tab navigation structure fully implemented
- ✅ Design system and brand colors integrated
- ✅ Zustand state management ready
- ✅ TypeScript strict mode throughout
- ✅ Component library established
- ✅ Database schema designed for extensibility

**New Requirement**: Build a full-featured website alongside the mobile app, NOT replacing it.

### Strategic Approach

**Phase A (Months 1-2)**: Create Next.js website sharing backend infrastructure
- Leverage existing Supabase database entirely
- Rebuild UI components in Next.js/React (web-optimized)
- Use same state management patterns (TanStack Query for web)
- Deploy alongside mobile app
- Share admin dashboard

**Phase B (Months 2-3)**: Complete remaining mobile screens
- Continue with 5 placeholder screens (Music, Social, LIVE, Everything Spaz, Dreamers Club)
- Same patterns as Phase 3
- No regression, independent build path

**Result**: Two first-class applications sharing one backend

### Key Principle

**Database-first architecture**: The Supabase schema is the source of truth. Both mobile and web consume the same API. Separation happens only at the UI/UX layer.

---

## 1. DATABASE COMPATIBILITY ANALYSIS

### Current State ✅

**Supabase PostgreSQL Schema** (from DATABASE_SCHEMA.md):
- 11 tables designed for flexibility
- Row-level security policies in place
- Proper foreign keys and indexes
- JSONB fields for extensible configuration

**Tables**:
```
✅ profiles
✅ artist_settings
✅ music_releases
✅ music_platform_links
✅ social_accounts
✅ social_content
✅ livestreams
✅ announcements
✅ push_subscriptions
✅ integrations
✅ app_sections
✅ analytics_events
```

### Full Compatibility: YES ✅

**Why the schema works for both platforms**:

1. **Platform-agnostic data structure**
   - No mobile-specific columns
   - No web-specific columns
   - All data is normalized and relational
   - JSONB `section_config` handles future extensibility

2. **RLS policies already platform-agnostic**
   - Public read access for content tables (both platforms can use)
   - Admin access based on user roles (works same in mobile + web)
   - No platform-specific rules needed

3. **Content management is centralized**
   - Single source for music releases
   - One social media content feed
   - Unified livestream schedule
   - One announcement system
   - Same artist settings

### What Changes: NOTHING in the database ❌ ➜ ✅

**For Web**:
- Query the same tables
- Use same RLS policies
- Consume identical API responses
- No schema modifications needed

**Example**: 
```typescript
// Mobile (React Native)
const releases = await supabase
  .from('music_releases')
  .select('*')
  .eq('is_featured', true)

// Web (Next.js)
const releases = await supabase
  .from('music_releases')
  .select('*')
  .eq('is_featured', true)

// ✅ Identical queries, identical data
```

### Database Enhancement Opportunities

Future additions won't break compatibility:

```sql
-- Add web-only features without touching mobile schema
ALTER TABLE app_sections ADD COLUMN web_config JSONB;
ALTER TABLE analytics_events ADD COLUMN platform VARCHAR(20); 
-- Mobile still works, web works, no conflicts
```

---

## 2. COMPONENT REUSE STRATEGY

### Reuse Matrix

| Category | Mobile (RN) | Web (React) | Strategy |
|----------|-----------|-----------|----------|
| **Logic** | ✅ | ✅ | 100% Shared via hooks |
| **State** | ✅ | ✅ | Shared via custom hooks |
| **Types** | ✅ | ✅ | 100% Shared TypeScript |
| **Styling** | ❌ | ❌ | Separate (native vs CSS) |
| **Components** | ❌ | ❌ | Rewrite for platform |
| **Data fetching** | ✅ | ✅ | Shared business logic |

### What Transfers (60% of code)

#### 1. TypeScript Types (~2,000 lines)
**File**: `mobile/types/index.ts`

```typescript
// ALL OF THIS TRANSFERS UNCHANGED
export interface Music {
  id: string;
  title: string;
  artist_name: string;
  release_date: Date;
  cover_art_url: string;
  is_featured: boolean;
}

export interface Release { ... }
export interface SocialContent { ... }
export interface Livestream { ... }
export interface Announcement { ... }
```

**Web Usage**:
```bash
# Create shared package
packages/types/
  └── index.ts  # Copy from mobile/types/index.ts
```

#### 2. Data Fetching Hooks (40% of logic)
**Source**: `mobile/hooks/*.ts`

Current hooks:
- `useHome.ts` - fetches featured content
- `useMusic.ts` - (to be built)
- `useSocial.ts` - (to be built)
- `useLive.ts` - (to be built)

**Reuse Strategy**:

```typescript
// packages/hooks/useHome.ts - SHARED
export function useHome() {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [featured, recent, announcements, social] = await Promise.all([
          supabase.from('music_releases').select('*').eq('is_featured', true),
          supabase.from('music_releases').select('*').order('release_date', { ascending: false }).limit(10),
          supabase.from('announcements').select('*').eq('is_published', true),
          supabase.from('social_content').select('*').eq('is_hidden', false).limit(6)
        ]);

        setData({ featured, recent, announcements, social });
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  return { data, loading, error };
}

// Mobile uses
import { useHome } from '@packages/hooks';
export default function HomeScreen() {
  const { data, loading } = useHome();
  return <MobileHomeUI data={data} />;
}

// Web uses
import { useHome } from '@packages/hooks';
export default function HomePage() {
  const { data, loading } = useHome();
  return <WebHomeUI data={data} />;
}
```

#### 3. Business Logic Utils (100% shared)
**Examples**:
```typescript
// utils/formatting.ts - FULLY SHARED
export const formatDate = (date: Date): string => { ... }
export const truncateDescription = (text: string, length: number): string => { ... }
export const formatStreamTime = (timestamp: string): string => { ... }
```

#### 4. Constants (~500 lines)
**File**: `mobile/constants/index.ts`
```typescript
// SHARED across platforms
export const BRAND_COLORS = { ... }
export const PLATFORM_LINKS = { ... }
export const APP_CONFIG = { ... }
```

### What Gets Rebuilt (40% of code)

#### 1. Components (40% code rewrite)

**Mobile Example** (React Native):
```typescript
// mobile/components/Home/HeroSection.tsx
import { View, Image, Text } from 'react-native';

export function HeroSection() {
  return (
    <View style={styles.container}>
      <Image source={require('@assets/logo.png')} />
      <Text style={styles.title}>Spaz SsG</Text>
    </View>
  );
}
```

**Web Equivalent** (Next.js React):
```typescript
// web/components/Home/HeroSection.tsx
import Image from 'next/image';
import styles from './HeroSection.module.css';

export function HeroSection() {
  return (
    <div className={styles.container}>
      <Image src={require('@assets/logo.png')} alt="Spaz SsG" />
      <h1 className={styles.title}>Spaz SsG</h1>
    </div>
  );
}
```

**Key Points**:
- Same logic flow
- Different rendering (native vs DOM)
- Both use shared types
- Styling is platform-specific

#### 2. Styling (100% rewrite)

**Mobile**: Uses React Native `StyleSheet.create()`
**Web**: Uses CSS/CSS Modules or Tailwind

Example rewrite:
```typescript
// Mobile
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: spacing.lg
  }
});

// Web (CSS Modules)
// HeroSection.module.css
.container {
  display: flex;
  flex-direction: column;
  background-color: #08090C;
  padding: 0 24px;
  min-height: 100vh;
}

// Or Web (Tailwind)
<div className="flex flex-col bg-midnight-black px-6 min-h-screen">
```

#### 3. Navigation (100% platform-specific)

**Mobile**: Expo Router with file-based routing
```typescript
// app/(tabs)/home.tsx - automatic routing
```

**Web**: Next.js App Router with file-based routing
```typescript
// app/page.tsx - automatically becomes /
// app/(tabs)/home/page.tsx - becomes /home
```

**Good News**: Both use modern file-based routing, so mental models transfer

---

## 3. OPTIMAL TECH STACK BRIDGE

### Monorepo Structure

```
spaz-ssg-platform/
├── packages/
│   ├── types/                    # Shared TypeScript types
│   │   ├── index.ts
│   │   ├── music.ts
│   │   ├── social.ts
│   │   └── auth.ts
│   │
│   ├── hooks/                    # Shared React hooks
│   │   ├── useHome.ts
│   │   ├── useMusic.ts
│   │   ├── useSocial.ts
│   │   ├── useLive.ts
│   │   └── index.ts
│   │
│   ├── utils/                    # Shared utilities
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   │
│   ├── services/                 # Shared API services
│   │   ├── supabase.ts           # Supabase client initialization
│   │   ├── analytics.ts
│   │   └── index.ts
│   │
│   └── config/                   # Shared configuration
│       ├── theme.ts              # Brand colors, tokens
│       ├── api.ts                # API endpoints
│       └── index.ts
│
├── apps/
│   ├── mobile/                   # React Native/Expo
│   │   ├── app/
│   │   ├── components/           # Mobile-specific components
│   │   ├── styles/               # React Native styles
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── web/                      # Next.js website
│   │   ├── app/
│   │   ├── components/           # Web-specific components
│   │   ├── styles/               # CSS/Tailwind
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── admin/                    # Admin dashboard (web)
│       ├── app/
│       ├── components/
│       └── package.json
│
├── docs/                         # Shared documentation
├── .env.example
├── pnpm-workspace.yaml           # Or yarn workspaces
└── package.json (root)
```

### Technology Decisions

| Layer | Mobile | Web | Sharing |
|-------|--------|-----|---------|
| **Language** | TypeScript | TypeScript | ✅ 100% |
| **Framework** | React Native | Next.js | 🟡 React paradigm |
| **State** | Zustand | TanStack Query + Zustand | 🟡 Hooks shared |
| **HTTP** | Axios | Fetch/SWR/Axios | ✅ Axios shared |
| **DB** | Supabase | Supabase | ✅ 100% same |
| **Auth** | Supabase Auth | Supabase Auth | ✅ 100% same |
| **Types** | Custom | Custom | ✅ 100% shared |
| **Styling** | React Native | CSS/Tailwind | ❌ Platform-specific |

### Package.json Structure

**Root package.json**:
```json
{
  "name": "spaz-ssg-platform",
  "private": true,
  "workspaces": [
    "packages/*",
    "apps/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "type-check": "turbo run type-check"
  }
}
```

**apps/web/package.json**:
```json
{
  "name": "@spaz/web",
  "dependencies": {
    "next": "^14.0.0",
    "@spaz/types": "workspace:*",
    "@spaz/hooks": "workspace:*",
    "@spaz/utils": "workspace:*"
  }
}
```

**apps/mobile/package.json**:
```json
{
  "name": "@spaz/mobile",
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "@spaz/types": "workspace:*",
    "@spaz/hooks": "workspace:*",
    "@spaz/utils": "workspace:*"
  }
}
```

---

## 4. ADMIN DASHBOARD ACROSS PLATFORMS

### Current State

**Original Plan** (Phase 6): Web-based admin dashboard separate from mobile

**New Reality**: Dashboard is a web app by nature, but must manage content for both platforms

### Unified Admin Architecture

```
ADMIN DASHBOARD (Next.js Web App)
  ├── Artist Profile Management
  ├── Music Releases (CRUD)
  ├── Social Content Moderation
  ├── Livestream Scheduling
  ├── Announcement Management
  ├── Integration Configuration
  ├── Push Notification Composer
  ├── Analytics View
  └── User/Permission Management

        ↓ (API calls to Supabase)

SUPABASE BACKEND (Single source of truth)
  ├── music_releases
  ├── social_content
  ├── livestreams
  ├── announcements
  ├── artist_settings
  ├── integrations
  └── analytics_events

        ↓ (Real-time sync via webhooks)

BOTH APPLICATIONS
  ├── Mobile App (shows latest content)
  ├── Web App (shows latest content)
  └── Both reflect changes immediately
```

### Implementation Pattern

**Admin creates music release**:
1. Admin fills form in dashboard
2. POST to `/api/admin/music` (Next.js API route)
3. Supabase inserts into `music_releases`
4. Row-level security allows due to admin role
5. Mobile app queries: sees new release instantly
6. Web app queries: sees new release instantly

**Code Example**:

```typescript
// admin-dashboard/app/api/admin/music/route.ts
import { supabase } from '@spaz/services';

export async function POST(request: Request) {
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('music_releases')
    .insert([body])
    .select();

  if (error) return Response.json({ error }, { status: 400 });
  return Response.json(data);
}
```

**Both apps see it**:
```typescript
// Mobile hook
export function useMusic() {
  const [releases, setReleases] = useState([]);
  
  useEffect(() => {
    const subscription = supabase
      .from('music_releases')
      .on('*', (payload) => {
        setReleases(prev => [...prev, payload.new]); // NEW!
      })
      .subscribe();
  }, []);
}

// Web hook (same pattern)
export function useMusic() {
  return useQuery(['music'], async () => {
    return supabase.from('music_releases').select();
  });
}
```

### Admin Dashboard Structure

```
apps/admin/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── setup/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx (Overview)
│   │   ├── music/
│   │   │   ├── page.tsx (List)
│   │   │   ├── [id]/edit/page.tsx
│   │   │   └── new/page.tsx
│   │   ├── social/
│   │   ├── livestreams/
│   │   ├── announcements/
│   │   ├── integrations/
│   │   └── analytics/
│   └── api/
│       ├── admin/
│       │   ├── music/route.ts
│       │   ├── social/route.ts
│       │   └── ...
│       └── webhooks/
│           └── supabase/route.ts
└── components/
    ├── admin/
    ├── forms/
    └── shared/
```

### Key: Role-Based Access

**Supabase RLS Policy** (already defined):
```sql
-- Only admin users can modify content
CREATE POLICY "admin_can_manage_releases" ON music_releases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.artist_name = 'Spaz SsG'
    )
  );
```

**This works across all interfaces**:
- Admin dashboard can modify
- Mobile app can only read
- Web app can only read
- All protected by the same RLS policies

---

## 5. PHASED APPROACH: DUAL-PLATFORM STRATEGY

### Timeline Overview

```
Phase A: Web Foundation (Weeks 1-8)
├── Week 1-2: Setup & infrastructure
├── Week 3-4: Home page + Music page
├── Week 5-6: Social, LIVE, Everything Spaz pages
├── Week 7-8: Admin dashboard v1

Phase B: Complete Mobile (Weeks 4-10, parallel)
├── Week 4-6: Music, Social, LIVE screens
├── Week 7-8: Everything Spaz, Dreamers Club
├── Week 9-10: Polish & optimization

Both complete by Week 10 ✅
```

### PHASE A: WEB FOUNDATION (Weeks 1-8)

#### Week 1-2: Setup & Shared Infrastructure

**Deliverables**:
- [ ] Create monorepo structure (pnpm workspaces)
- [ ] Migrate types to `packages/types`
- [ ] Create `packages/hooks` with shared data fetching
- [ ] Create `packages/utils` with shared utilities
- [ ] Setup `apps/web` Next.js project
- [ ] Configure TypeScript project references
- [ ] Setup authentication (Supabase Auth client)

**Effort**: 16 hours
**Blockers**: None
**Dependencies**: Current mobile codebase

**File Structure After**:
```
packages/types/index.ts (copied from mobile)
packages/hooks/useHome.ts (extracted from mobile)
apps/web/ (new Next.js project)
```

#### Week 3-4: Home & Music Pages

**Deliverables**:
- [ ] Home page layout (Hero + Featured + Recent)
- [ ] Music page with DSP directory
- [ ] Featured release detail page
- [ ] Mobile-responsive design (web-first, not mobile-first)
- [ ] Styling system (Tailwind + CSS Modules)
- [ ] SEO optimization (meta tags, Open Graph)

**Effort**: 32 hours
**Files Created**: 
```
apps/web/app/page.tsx (home)
apps/web/app/music/page.tsx
apps/web/app/music/[id]/page.tsx
apps/web/components/Home/
apps/web/components/Music/
apps/web/styles/
```

#### Week 5-6: Remaining Primary Pages

**Deliverables**:
- [ ] Social page with content feed
- [ ] LIVE page with stream status + schedule
- [ ] Everything Spaz page (link directory)
- [ ] Dreamers Club page (community info)
- [ ] Navigation system (responsive header + footer)
- [ ] Search functionality

**Effort**: 32 hours
**Files Created**:
```
apps/web/app/(main)/social/page.tsx
apps/web/app/(main)/live/page.tsx
apps/web/app/(main)/everything-spaz/page.tsx
apps/web/app/(main)/dreamers-club/page.tsx
```

#### Week 7-8: Admin Dashboard v1

**Deliverables**:
- [ ] Admin authentication
- [ ] Music management (CRUD)
- [ ] Announcement management
- [ ] Artist settings editor
- [ ] Real-time dashboard
- [ ] Protected routes

**Effort**: 24 hours
**Files Created**:
```
apps/admin/app/dashboard/
apps/admin/app/api/admin/
apps/admin/components/forms/
```

**Phase A Summary**:
- ✅ Complete website live
- ✅ All 6 main sections available
- ✅ Admin dashboard operational
- ✅ Both apps share same backend
- ✅ Ready for API integrations

---

### PHASE B: COMPLETE MOBILE (Weeks 4-10, parallel)

#### Week 4-6: Three Primary Screens

**Deliverables** (parallel with web):
- [ ] Music tab (DSP list, featured, recent)
- [ ] Social tab (content feed, platform filter)
- [ ] LIVE tab (stream status, schedule, VOD)

**Effort**: 24 hours (fewer than web due to patterns)
**Why Faster**: 
- Patterns already established in Phase 3
- Shared hooks from Phase A
- Design system already integrated

**Files Created**:
```
mobile/components/Music/
mobile/components/Social/
mobile/components/Live/
mobile/hooks/useMusic.ts (shared)
mobile/hooks/useSocial.ts (shared)
mobile/hooks/useLive.ts (shared)
```

#### Week 7-8: Final Two Screens

**Deliverables**:
- [ ] Everything Spaz tab (category-organized links)
- [ ] Dreamers Club tab (community info + Discord link)
- [ ] Polish all screens
- [ ] Comprehensive testing

**Effort**: 12 hours
**Files Created**:
```
mobile/components/EverythingSpaz/
mobile/components/DreamersClub/
```

#### Week 9-10: Mobile Polish

**Deliverables**:
- [ ] Performance optimization
- [ ] Edge case handling
- [ ] Offline support for critical content
- [ ] Push notification integration
- [ ] User testing
- [ ] Bug fixes

**Effort**: 16 hours

**Phase B Summary**:
- ✅ All 6 mobile screens complete
- ✅ Feature parity with web
- ✅ Ready for API integrations
- ✅ Performance optimized
- ✅ Ready for testing

---

### INTEGRATION PHASE (Week 9+)

**After Phase A and B complete**:

#### Week 9: API Integrations (Parallel, both platforms)

Weeks 9-10 happen after both Phase A (web done) and Phase B (mobile done).

**Deliverables**:
- [ ] Spotify integration (both apps)
- [ ] YouTube integration (both apps)
- [ ] Twitch integration (both apps)
- [ ] Push notifications setup
- [ ] Analytics implementation

**Effort**: 20 hours
**Shared Code**: `packages/services/spotify.ts` etc.

---

### Complete Timeline

```
WEEK 1    WEEK 2    WEEK 3    WEEK 4    WEEK 5    WEEK 6    WEEK 7    WEEK 8    WEEK 9    WEEK 10
[  Phase A: Web Foundation                                              ]
├─ Setup   ├─ Home/Music  ├─ Social/LIVE/ES  ├─ Admin Dashboard       
                                            [  Phase B: Mobile Screens (parallel)        ]
                                              ├─ Music/Social/LIVE  ├─ ES/DC  ├─ Polish

RESULT:
✅ Week 8:  Website fully live
✅ Week 8:  Mobile 4/6 screens done
✅ Week 10: Mobile fully complete
✅ Week 10: Ready for API integrations
```

---

## 6. SHARED SERVICES & APIs

### Backend remains singular: Supabase

**All queries go to same tables**:

```typescript
// packages/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Both apps import this
import { supabase } from '@spaz/services';
```

### Shared Hooks Pattern

**packages/hooks/index.ts**:

```typescript
export { useHome } from './useHome';
export { useMusic } from './useMusic';
export { useSocial } from './useSocial';
export { useLive } from './useLive';
export { useAuth } from './useAuth';
export { useAnnouncements } from './useAnnouncements';
```

**Each hook is platform-agnostic**:

```typescript
// packages/hooks/useMusic.ts
import { useState, useEffect } from 'react';
import { supabase } from '@spaz/services';
import type { Music } from '@spaz/types';

export function useMusic() {
  const [data, setData] = useState<Music[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const { data: releases, error: err } = await supabase
          .from('music_releases')
          .select('*')
          .order('release_date', { ascending: false });

        if (err) throw err;
        setData(releases || []);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return { data, loading, error };
}
```

**Mobile usage**:
```typescript
import { useMusic } from '@spaz/hooks';

export function MusicScreen() {
  const { data, loading } = useMusic();
  return <MobileReleaseList releases={data} />;
}
```

**Web usage**:
```typescript
import { useMusic } from '@spaz/hooks';

export function MusicPage() {
  const { data, loading } = useMusic();
  return <WebReleaseGrid releases={data} />;
}
```

### API Integration Services

**Spotify Example** (shared across platforms):

```typescript
// packages/services/spotify.ts
import axios from 'axios';

export const spotifyService = {
  async searchTrack(query: string, token: string) {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: { q: query, type: 'track' },
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async getArtistProfile(artistId: string, token: string) {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }
};
```

**Used by both**:
```typescript
// Mobile or Web
import { spotifyService } from '@spaz/services';

const result = await spotifyService.searchTrack('query', token);
```

---

## 7. TIMELINE PROJECTION

### Total Development Effort

```
Phase A (Web):               104 hours
├── Setup & Infrastructure    16 hours
├── Home & Music              32 hours
├── Social/LIVE/ES            32 hours
└── Admin Dashboard v1        24 hours

Phase B (Mobile):             52 hours
├── Three Primary Screens     24 hours
├── Final Two Screens         12 hours
└── Polish & Testing          16 hours

API Integrations:             20 hours
├── Spotify                    6 hours
├── YouTube                    6 hours
├── Twitch                     4 hours
└── Push Notifications         4 hours

TOTAL:                        176 hours (~4.4 weeks, 1 dev full-time)
```

### Calendar Timeline

```
Start: 2026-11-15 (Friday)
Work: Mon-Fri, 8 hours/day

PHASE A: Nov 18 - Dec 13
├── Week 1: Nov 18-22 (Setup)
├── Week 2: Nov 25-29 (Home/Music)
├── Week 3: Dec 2-6 (Social/LIVE)
└── Week 4: Dec 9-13 (Admin)

PHASE B: Dec 2-20 (Parallel with A, weeks 3-4)
├── Week 1: Dec 2-6 (Music/Social/LIVE)
├── Week 2: Dec 9-13 (ES/DC)
└── Week 3: Dec 16-20 (Polish)

API INTEGRATIONS: Dec 16-20 (Parallel with B week 3)

COMPLETE: December 20, 2026
├── ✅ Website fully operational
├── ✅ Mobile app complete
├── ✅ Admin dashboard live
├── ✅ Basic API integrations working
└── ✅ Ready for testing & deployment
```

### Resource Requirement

**Recommended Allocation**:
- **Weeks 1-2**: 1 developer (full-time) = Setup + Web foundation
- **Weeks 3-4**: 1 developer (full-time, both phases) = Web pages + Mobile screens
- **Weeks 5-6**: 1 developer (full-time, both phases) = Continue both
- **Weeks 7-8**: 1 developer (full-time) = Admin + Mobile polish

**Alternative (Parallel Teams)**:
- 1 dev on web (Phase A)
- 1 dev on mobile (Phase B, starting week 4)
- Reduces timeline to ~6 weeks, same end date

---

## 8. RISK FACTORS & MITIGATION

### Risk: Database Becomes Bottleneck

**Risk Level**: 🟢 LOW
**Probability**: 5%
**Impact**: API sluggishness, duplicate queries

**Mitigation**:
- ✅ Current schema has proper indexes (already defined)
- ✅ Implement query result caching in hooks
- ✅ Use Supabase's real-time subscriptions for updates
- ✅ Monitor query performance with Supabase metrics

**Code Example**:
```typescript
// Add caching to hooks
export function useMusic() {
  const queryKey = ['music', 'releases'];
  return useQuery(queryKey, fetchMusic, {
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}
```

### Risk: Component Duplication Gets Out of Hand

**Risk Level**: 🟡 MEDIUM
**Probability**: 30%
**Impact**: Maintenance burden increases

**Mitigation**:
- ✅ Extract all business logic to shared hooks immediately
- ✅ Use design tokens from `packages/config`
- ✅ Create component naming conventions
- ✅ Use Storybook for web components
- ✅ Document component boundaries

### Risk: Admin Dashboard Not Ready in Time

**Risk Level**: 🟢 LOW
**Probability**: 10%
**Impact**: Can't manage content easily during testing

**Mitigation**:
- ✅ Build admin LAST (weeks 7-8)
- ✅ Use Supabase Studio for emergency content edits (always available)
- ✅ Admin is nice-to-have, not blocking
- ✅ Can be built incrementally

### Risk: Styling Systems Conflict

**Risk Level**: 🟢 LOW
**Probability**: 5%
**Impact**: Inconsistent branding between platforms

**Mitigation**:
- ✅ Create centralized color tokens in `packages/config`
- ✅ Both mobile and web use same colors (values, different tech)
- ✅ Create component reference guide
- ✅ Use visual regression testing

**Implementation**:
```typescript
// packages/config/theme.ts
export const COLORS = {
  electricCyan: '#00DDF5',
  burntOrange: '#FF791D',
  midnightBlack: '#08090C',
  // ... etc
};

// Mobile uses (React Native)
const styles = StyleSheet.create({
  button: { backgroundColor: COLORS.electricCyan }
});

// Web uses (Tailwind config)
// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      'electric-cyan': COLORS.electricCyan,
      // ...
    }
  }
};
```

### Risk: API Integration Credentials Missing

**Risk Level**: 🟡 MEDIUM
**Probability**: 40%
**Impact**: Can't complete Phase 3 integrations

**Mitigation**:
- ✅ Don't block on this (Week 9 is late in project)
- ✅ Use mock/placeholder data until credentials arrive
- ✅ Design APIs so credentials can be swapped in later
- ✅ Create integration status dashboard

**Design Pattern**:
```typescript
// services/spotify.ts
const USE_MOCK = !process.env.SPOTIFY_API_KEY;

export async function getArtistData(id: string) {
  if (USE_MOCK) {
    return mockSpotifyData; // Returns fake data
  }
  // Real API call
  return realSpotifyAPI.get(id);
}
```

### Risk: Two Codebases Diverge Over Time

**Risk Level**: 🟡 MEDIUM
**Probability**: 50%
**Impact**: Maintenance nightmare, bugs in one app not fixed in other

**Mitigation**:
- ✅ Ruthlessly enforce shared code principles
- ✅ Weekly code reviews comparing patterns
- ✅ Shared ESLint/Prettier config
- ✅ Monorepo structure makes separation obvious
- ✅ TypeScript ensures types stay aligned

**Rules**:
- ❌ NO duplicated business logic
- ✅ YES duplicated UI components (necessary for platforms)
- ✅ YES shared hooks + types + utils
- ✅ YES shared Supabase queries

---

## SUMMARY TABLE: Risk vs Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| DB bottleneck | 5% | High | Indexing + caching |
| Component duplication | 30% | Medium | Strict monorepo rules |
| Admin delayed | 10% | Low | Build last, use Studio |
| Styling conflicts | 5% | Medium | Centralized tokens |
| Missing API credentials | 40% | Low | Use mock data first |
| Codebases diverge | 50% | High | Shared code enforcement |

---

## 9. ARCHITECTURE DECISION RECORDS (ADRs)

### ADR-001: Database Compatibility

**Decision**: Keep existing Supabase schema unchanged for web

**Rationale**:
- Schema is already designed for multi-platform use
- RLS policies are platform-agnostic
- Both apps benefit from same data consistency
- No architectural debt created

**Consequence**: Web app must adapt to existing schema (it can, easily)

---

### ADR-002: Monorepo Structure

**Decision**: Use pnpm workspaces with `packages/` and `apps/`

**Rationale**:
- Clear separation of shared vs app-specific code
- Each app has independent build process
- Easy to share types/hooks without coupling
- Allows different versions of dependencies per app if needed

**Consequence**: More setup upfront, but cleaner long-term

---

### ADR-003: Hook Sharing Strategy

**Decision**: Share data-fetching logic via custom hooks in packages/

**Rationale**:
- Hooks are platform-agnostic (just React)
- Ensures both apps use identical business logic
- Easy to test in isolation
- Simple to update one hook, fix both apps

**Consequence**: All apps must use React hooks (both already do)

---

### ADR-004: Styling Not Shared

**Decision**: Rebuild UI components per platform (React Native vs React DOM)

**Rationale**:
- React Native and web have fundamentally different rendering
- Attempting to share would create worse code than duplication
- Each platform has unique UX patterns
- CSS and StyleSheet have no overlap

**Consequence**: Component structure duplicated, but logic (hooks) shared

---

### ADR-005: Admin Dashboard as Separate App

**Decision**: Build admin as standalone Next.js app (apps/admin/)

**Rationale**:
- Admin is web-only, no mobile equivalent
- Different UX requirements than public site
- Different authentication flow (admin-only)
- Simpler to deploy independently

**Consequence**: Admin dashboard must use same Supabase backend (good thing)

---

## FINAL ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    SPAZ SSG PLATFORM                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PRESENTATION LAYER                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐ │
│  │  Mobile (RN)     │  │  Website (Next)  │  │ Admin      │ │
│  │  ├─ Home         │  │  ├─ Home         │  │ (Next)     │ │
│  │  ├─ Music        │  │  ├─ Music        │  │ ├─ Content │ │
│  │  ├─ Social       │  │  ├─ Social       │  │ ├─ Music   │ │
│  │  ├─ Live         │  │  ├─ Live         │  │ ├─ Social  │ │
│  │  ├─ Everything   │  │  ├─ Everything   │  │ └─ Admin   │ │
│  │  └─ Dreamers     │  │  └─ Dreamers     │  └────────────┘ │
│  └──────────────────┘  └──────────────────┘                 │
│          ↓                     ↓                  ↓          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │        SHARED LAYER (packages/)                      │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │  │
│  │  │ Types    │ │ Hooks    │ │ Utils    │           │  │
│  │  │ (60 KB)  │ │ (100 KB) │ │ (50 KB)  │           │  │
│  │  └──────────┘ └──────────┘ └──────────┘           │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │ Services (Supabase client, API calls)        │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│          ↓                     ↓              ↓             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           BACKEND LAYER                             │  │
│  │                                                      │  │
│  │  SUPABASE (PostgreSQL + Auth + Storage)            │  │
│  │  ├─ Tables:  profiles, artist_settings,            │  │
│  │  │            music_releases, social_content,      │  │
│  │  │            livestreams, announcements, ...      │  │
│  │  ├─ Auth:    Row-level security policies           │  │
│  │  ├─ Edges:   For API integrations (Spotify, etc)  │  │
│  │  └─ Storage: Images, artwork, documents           │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  EXTERNAL INTEGRATIONS (Phase 4+)                         │
│  ├─ Spotify API      ├─ YouTube API    ├─ Twitch API     │
│  ├─ Instagram API    ├─ TikTok API     ├─ Discord API    │
│  └─ Expo Push Notifications                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. NEXT STEPS & RECOMMENDATIONS

### Immediate Actions (This Week)

1. **Review & Approve Architecture**
   - ✅ Confirm monorepo approach is acceptable
   - ✅ Confirm web stack (Next.js + Tailwind)
   - ✅ Confirm shared hook strategy

2. **Prepare for Phase A**
   - Create `packages/types`, `packages/hooks`, `packages/utils` directories
   - Migrate types from `mobile/types/index.ts`
   - Extract `useHome` hook to shared location
   - Create `apps/web` Next.js project skeleton

3. **Identify Blockers**
   - What API credentials are available now?
   - Any design changes needed for web?
   - Any specific web feature requirements?

### Success Criteria (By Dec 20, 2026)

- ✅ **Website live** at custom domain
- ✅ **Mobile app complete** with all 6 screens
- ✅ **Admin dashboard** operational for content management
- ✅ **Database sharing** validated (both apps use same data)
- ✅ **Basic API integrations** working (Spotify, YouTube, Twitch)
- ✅ **Code quality** maintained (100% TypeScript, shared patterns)
- ✅ **Performance** acceptable on both platforms

### Documentation to Create

1. **Monorepo Setup Guide** (for future developers)
2. **Component Architecture** (how to split UI/logic)
3. **Hook Development Guide** (when to make shared vs app-specific)
4. **Deployment Guide** (both platforms, admin dashboard)
5. **Data Synchronization** (how changes propagate across apps)

---

## CONCLUSION

### The Path Forward

You have **two options**:

**Option 1: Sequential** (Current Plan)
- Build web first (8 weeks)
- Then complete mobile (10 weeks)
- Total: ~10 weeks, one developer

**Option 2: Parallel** (Aggressive)
- 1 developer on web (Phase A)
- 1 developer on mobile (Phase B)
- Start web week 1, mobile week 4
- Total: 8 weeks, two developers

**Recommendation**: Option 2 if resources available, otherwise Option 1 is fine.

### Key Advantages of This Approach

1. **No Code Duplication** where it matters (business logic)
2. **No Database Changes** required
3. **No Admin Dashboard Complexity** (one source of truth)
4. **No Platform Conflicts** (each handles its own UI)
5. **Scalable** (easy to add third platform later)
6. **Maintainable** (shared code keeps apps consistent)

### By End of Week 10

You'll have:

```
✅ spaz-ssg.com                    (Website - live and beautiful)
✅ iOS/Android apps                 (Complete mobile experience)
✅ Admin dashboard                  (Manage everything)
✅ Shared backend                   (Supabase - single source of truth)
✅ Integrated APIs                  (Spotify, YouTube, Twitch working)
✅ 100% TypeScript codebase         (Type-safe across all apps)
✅ Clear development patterns       (Easy to hand off to other devs)
```

**That's a complete platform supporting an independent artist with multiple first-class applications.**

---

**Next Action**: Schedule a review of this analysis and approve architecture decisions.

**Questions to Address**:
1. Does the monorepo structure work for your team?
2. Should we prioritize web or mobile first?
3. Which API integrations are highest priority?
4. Do you have resources for parallel development (Option 2)?
5. Any brand/design changes needed for web?

**Prepared by**: Kiro (AI Assistant)  
**Date**: 2026-11-15  
**Status**: Ready for Review & Approval
