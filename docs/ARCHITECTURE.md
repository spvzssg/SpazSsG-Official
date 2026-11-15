# PHASE 1: ARCHITECTURE AND PROJECT PLANNING

**Status**: Complete — Ready for Review  
**Date**: 2026-11-13  
**Next Phase**: Phase 2 — UI/UX Design

---

## 1. PROJECT OVERVIEW

**Application Name**: Spaz SsG Official Mobile Application

**Purpose**: Centralized digital home for independent recording artist Spaz SsG, connecting music, content, livestreams, social platforms, and community.

**Target Platforms**: iOS (14+) and Android (API 28+)

**Primary Objective**: Convert casual listeners into engaged fans and active members of The Dreamers Club.

---

## 2. TECHNICAL ARCHITECTURE

### 2.1 Frontend Stack

**Framework**: React Native with Expo  
**Language**: TypeScript (strict mode)  
**Navigation**: Expo Router  
**State Management**: React Context + Hooks  
**Component Library**: Custom component system based on Spaz SsG brand design  
**HTTP Client**: Axios  
**Authentication**: Supabase Auth (optional user accounts)  
**Local Storage**: AsyncStorage (device-side preferences)  
**Notifications**: Expo Notifications SDK  

**Why This Stack**:
- Single codebase for iOS and Android
- Expo managed cloud builds (EAS)
- TypeScript for type safety and developer experience
- Modern, maintainable ecosystem
- Strong community support

### 2.2 Backend Stack

**Database**: Supabase (PostgreSQL)  
**Authentication**: Supabase Auth with optional email/password registration  
**Storage**: Supabase Storage (images, artwork, documents)  
**APIs**: Supabase Edge Functions (Node.js runtime) for server-side logic  
**Secrets Management**: Environment variables + Supabase vault  

**Why Supabase**:
- Open-source PostgreSQL with modern interface
- Built-in authentication and authorization
- Row Level Security for fine-grained access control
- Real-time capabilities (future enhancement)
- Cost-effective for indie artist use
- Easy to understand and maintain

### 2.3 External Integrations

**Music Platforms**:
- Spotify Web API
- Apple Music API (if available)
- YouTube Data API v3
- Additional DSPs: YouTube Music, Amazon Music, SoundCloud, Tidal, Deezer

**Social Media**:
- Instagram Graph API (requires Facebook App)
- TikTok API
- YouTube Data API v3
- Twitch API
- Discord API

**Notifications**: Expo Push Notifications

**Payments**: Stripe (infrastructure only, not activated)

### 2.4 Development & Deployment

**Version Control**: Git + GitHub  
**Build Tools**: Expo Application Services (EAS)  
**CI/CD**: EAS Build (automated iOS/Android builds)  
**Deployment**: App Store Connect (iOS) + Google Play (Android)  
**Staging**: Expo Go for local testing  

---

## 3. APPLICATION STRUCTURE

### 3.1 Navigation Architecture

**Primary Navigation**: Bottom Tab Navigator (6 tabs)

```
Bottom Tabs:
├── Home
├── Music
├── Social
├── LIVE
├── Everything Spaz
└── Dreamers Club
```

**Secondary Navigation**: Stack navigators within each tab for sub-screens

**Navigation Type**: Tab-based for flat information architecture, perfect for music discovery and content browsing

### 3.2 Screen Hierarchy

#### Home Tab
- Home (featured content, recent music, announcements)
  - Music Detail (from featured)
  - Video Detail (from featured YouTube)
  - Stream Information

#### Music Tab
- Music (DSP directory + featured releases)
  - Spotify (external link/embedded player)
  - Apple Music (external link/embedded player)
  - UnitedMasters (external link)
  - Additional DSPs (external links)
  - Release Detail (with track listing and links)

#### Social Tab
- Social Feed (unified content from multiple platforms)
  - Instagram Posts/Reels
  - TikTok Videos
  - YouTube Videos/Shorts
  - Twitch Clips/VODs
  - Individual Post Detail (with platform-specific actions)

#### LIVE Tab
- LIVE Status (current stream or offline state)
  - Twitch Stream (embedded or linked)
  - TikTok LIVE (linked)
  - YouTube LIVE (linked)
  - Stream Schedule
  - Previous Streams/VODs
  - Featured Clips

#### Everything Spaz Tab
- Directory (organized link cards by category)
  - Music Platforms
  - Social Media
  - Streaming
  - Community
  - Services & Submissions
  - Business & Contact

#### Dreamers Club Tab
- Community Hub (Discord-focused)
  - Dreamers Club Introduction
  - Join Discord Button
  - Community Guidelines
  - Announcements
  - Events & Activities

### 3.3 Administrative Interface

**Type**: Web-based admin dashboard (separate React application or web view)  
**Location**: Accessible via authenticated link or mobile web portal  
**Authentication**: Supabase Auth with admin role verification  

**Admin Sections**:
1. Artist Profile (bio, images, branding)
2. Music Management (releases, DSP links, featured content)
3. Social Management (connected accounts, content moderation)
4. LIVE Management (stream links, schedules, featured clips)
5. Content Management (homepage customization, link directory)
6. Notification Management (compose, schedule, send)
7. Integration Management (API credentials, connection status)
8. Analytics Dashboard (usage metrics, engagement tracking)
9. Account Settings (admin users, permissions)

---

## 4. DATABASE SCHEMA

### 4.1 Core Tables

#### profiles
```sql
id (uuid, primary key)
user_id (uuid, foreign key to auth.users) - nullable for public profile
artist_name (text)
artist_bio (text)
profile_image_url (text)
created_at (timestamp)
updated_at (timestamp)
```

#### artist_settings
```sql
id (uuid, primary key)
is_live (boolean) - current livestream status
live_platform (text) - 'twitch', 'tiktok', 'youtube'
live_url (text)
next_stream_time (timestamp) - nullable
offline_message (text)
featured_announcement (text)
created_at (timestamp)
updated_at (timestamp)
```

#### music_releases
```sql
id (uuid, primary key)
title (text)
artist_name (text)
release_date (date)
cover_art_url (text)
description (text)
is_featured (boolean)
release_order (integer) - for custom ordering
created_at (timestamp)
updated_at (timestamp)
```

#### music_platform_links
```sql
id (uuid, primary key)
release_id (uuid, foreign key to music_releases) - nullable for general links
platform (text) - 'spotify', 'apple_music', 'youtube_music', etc.
url (text)
platform_order (integer) - for custom ordering
created_at (timestamp)
updated_at (timestamp)
```

#### social_accounts
```sql
id (uuid, primary key)
platform (text) - 'instagram', 'tiktok', 'youtube', 'twitch', 'facebook'
account_url (text)
is_connected (boolean) - API connected or manual
last_sync (timestamp)
sync_error (text)
created_at (timestamp)
updated_at (timestamp)
```

#### social_content
```sql
id (uuid, primary key)
platform (text)
external_id (text) - platform's content ID
title (text)
description (text)
thumbnail_url (text)
content_url (text)
posted_at (timestamp)
is_featured (boolean)
is_hidden (boolean)
content_order (integer)
synced_at (timestamp)
created_at (timestamp)
updated_at (timestamp)
```

#### livestreams
```sql
id (uuid, primary key)
platform (text) - 'twitch', 'tiktok', 'youtube'
title (text)
scheduled_at (timestamp)
started_at (timestamp)
ended_at (timestamp)
thumbnail_url (text)
vod_url (text)
vod_id (text)
created_at (timestamp)
updated_at (timestamp)
```

#### announcements
```sql
id (uuid, primary key)
title (text)
content (text)
is_published (boolean)
published_at (timestamp)
scheduled_for (timestamp) - nullable
is_pinned (boolean)
created_at (timestamp)
updated_at (timestamp)
```

#### push_subscriptions
```sql
id (uuid, primary key)
user_id (uuid, foreign key to auth.users) - nullable for guest subscriptions
expo_push_token (text)
subscribed_to_new_music (boolean)
subscribed_to_new_videos (boolean)
subscribed_to_new_social (boolean)
subscribed_to_live_notifications (boolean)
subscribed_to_announcements (boolean)
created_at (timestamp)
updated_at (timestamp)
```

#### integrations
```sql
id (uuid, primary key)
service_name (text) - 'spotify', 'youtube', 'twitch', etc.
is_connected (boolean)
connection_status (text) - 'connected', 'failed', 'pending_approval', 'expired'
last_sync (timestamp)
last_error (text)
connection_expires_at (timestamp)
created_at (timestamp)
updated_at (timestamp)
```

#### app_sections
```sql
id (uuid, primary key)
section_name (text) - 'home', 'music', 'social', 'live'
is_enabled (boolean)
display_order (integer)
section_config (jsonb) - flexible config per section
created_at (timestamp)
updated_at (timestamp)
```

#### analytics_events
```sql
id (uuid, primary key)
event_type (text) - 'screen_view', 'link_click', 'button_tap'
screen_name (text)
element_name (text)
platform (text) - 'spotify', 'instagram', etc.
user_id (uuid, foreign key to auth.users) - nullable
created_at (timestamp)
```

### 4.2 Row Level Security Policies

**Public Content** (Anyone):
- View: music_releases, music_platform_links, social_accounts, social_content, livestreams, announcements, app_sections

**Authenticated Users**:
- View: push_subscriptions (own only), app_sections
- Insert/Update: push_subscriptions (own only)

**Admin Users** (role = 'admin'):
- Full access to all tables for management

**Service Role** (server-side only):
- All operations for API integrations and scheduled tasks

---

## 5. API INTEGRATION PLAN

### 5.1 Integration Overview

| Platform | API | Purpose | Status |
|---|---|---|---|
| Spotify | Web API | Music discovery, embed player | Ready to implement |
| Apple Music | MusicKit | Music discovery, link attribution | Pending API access |
| YouTube | Data API v3 | Video search, embed player, livestream info | Ready to implement |
| Twitch | Helix API | Stream status, VOD retrieval | Ready to implement |
| Instagram | Graph API | Feed synchronization (requires FB App) | Pending credentials |
| TikTok | TikTok API | Video feed synchronization | Pending credentials |
| Discord | REST API | Community link validation | Ready to implement |
| Expo Notifications | Push API | Notification delivery | Ready to implement |
| Stripe | Payments API | Subscription infrastructure | Ready (not activated) |

### 5.2 Implementation Strategy

**Phase 4 Deliverables**:
1. Spotify integration (featured releases, player embed, artist link)
2. YouTube integration (video feed, Shorts, livestream status)
3. Twitch integration (stream status, VOD retrieval)
4. Social media placeholders with manual fallback (Instagram, TikTok, Facebook)
5. Discord community link integration
6. Notification system with Expo

**Approach**:
- Server-side API calls (Edge Functions) for sensitive integrations
- Client-side calls for public endpoints with appropriate CORS handling
- Scheduled synchronization for periodic content updates (e.g., new releases, stream status)
- Graceful degradation when API unavailable (show cached data, manual fallback)
- Clear error messages and logging

### 5.3 Credential Management

See `API_CREDENTIALS_SETUP.md` for detailed credential requirements and setup instructions.

**Storage Locations**:
- Environment variables: `.env` file (not committed)
- Supabase Vault: For sensitive tokens requiring rotation
- Admin Dashboard: For user-facing API credential inputs (securely stored server-side)

---

## 6. AUTHENTICATION & AUTHORIZATION

### 6.1 User Roles

**Public Visitor**: No authentication required
- Read-only access to all public content
- Can browse music, social, livestreams, community

**Registered User** (optional): Email + password via Supabase Auth
- Notification preferences
- Saved content (future)
- Profile customization (future)

**Admin User**: Email + password via Supabase Auth (with admin role)
- Full administrative dashboard access
- Content management
- Integration management
- Analytics

### 6.2 Implementation

**Frontend Auth**:
- Supabase Auth Client library
- Session management via AuthContext
- Protected routes for admin dashboard
- Secure token storage

**Backend Auth**:
- Supabase Auth tokens validated server-side
- Row Level Security enforces data access rules
- Service role key used only for server-side operations (never exposed to client)

---

## 7. NOTIFICATIONS SYSTEM

### 7.1 Notification Types

1. **New Music Release**: Triggered when new release added to music_releases
2. **New YouTube Video**: When video synced from YouTube channel
3. **New Social Content**: When new post synced from any social platform
4. **Going LIVE**: When artist_settings.is_live set to true
5. **Upcoming Stream**: Scheduled notification before upcoming stream
6. **Announcements**: Admin-sent announcements to subscribers
7. **Community Updates**: Discord-related community news

### 7.2 Architecture

**Client**:
- Expo Notifications for local/push notifications
- Users opt-in to notification types
- Device tokens sent to push_subscriptions table

**Server**:
- Edge Functions trigger notifications based on events
- Supabase functions called via webhooks or scheduled tasks
- Notification service queries push_subscriptions and sends via Expo

**Admin**:
- Dashboard to compose, schedule, and send notifications
- Analytics to track notification engagement

---

## 8. PREMIUM MEMBERSHIP INFRASTRUCTURE

### 8.1 Architecture (Not Activated)

**Database Support**:
- subscriptions table (user_id, tier, status, renewal_date)
- premium_features table (feature_name, tier_required, is_enabled)

**Stripe Integration** (Readiness):
- Stripe API credentials (when approved)
- Server-side payment processing
- Webhook handling for subscription events
- Safe, compliant implementation

**Frontend Support**:
- Membership status display
- Upgrade/manage subscription flows
- Premium feature gates (hidden until activated)

**Important**: 
- No subscription will be activated without explicit approval
- No users will be charged
- Infrastructure built but feature flags off

---

## 9. PERFORMANCE & OPTIMIZATION

### 9.1 Mobile Performance

- **Image Optimization**: Compressed assets for various screen sizes
- **Code Splitting**: Lazy loading of tab-specific code
- **Caching Strategy**: 
  - Music releases: 24-hour cache
  - Social content: 1-hour cache
  - Livestream status: 5-minute cache
- **Network**: Optimize API calls, batching requests where possible
- **Memory**: Monitor bundle size, lazy-load heavy components

### 9.2 Backend Optimization

- **Database Indexes**: On frequently queried fields (platform, posted_at, is_featured)
- **Query Optimization**: Efficient joins, limit results appropriately
- **Connection Pooling**: Via Supabase connection pooler
- **CDN**: Supabase Storage with built-in CDN for images
- **Rate Limiting**: Implement rate limiting on API endpoints

---

## 10. SECURITY CONSIDERATIONS

### 10.1 Data Protection

- **In Transit**: All API calls over HTTPS
- **At Rest**: Supabase encryption for sensitive data
- **User Data**: Minimal collection, no unnecessary PII storage
- **API Keys**: Never in client code, server-side only

### 10.2 Authentication Security

- **Token Storage**: Secure storage via Supabase Auth (platform-specific)
- **Session Management**: Automatic token refresh
- **Admin Access**: Email + password + optional 2FA (future)
- **CORS**: Restricted to app domain

### 10.3 API Integration Security

- **OAuth Where Available**: For social integrations
- **Credential Rotation**: Support token refresh mechanisms
- **Error Handling**: No sensitive info in error messages
- **Logging**: Secure logging, no credential exposure

---

## 11. ACCESSIBILITY & COMPLIANCE

### 11.1 WCAG 2.1 AA Compliance

- **Text**: Minimum 16px, sufficient contrast (4.5:1 for normal text)
- **Touch Targets**: Minimum 44x44pt
- **Navigation**: Clear, logical tab order
- **Forms**: Labels associated with inputs
- **Images**: Descriptive alt text for all images
- **Videos**: Captions and transcripts

### 11.2 Platform-Specific

**iOS**:
- VoiceOver support
- Dynamic Type scaling
- Accessibility inspector testing
- Privacy manifest

**Android**:
- TalkBack support
- Text scaling
- High contrast mode
- Accessibility testing with Android Accessibility Suite

---

## 12. PROJECT STRUCTURE

```
spaz-ssg-mobile/
├── mobile/                              # React Native/Expo app
│   ├── app/                             # Expo Router pages
│   │   ├── _layout.tsx                  # Root layout
│   │   ├── (tabs)/                      # Tab navigation
│   │   │   ├── _layout.tsx              # Tab navigator
│   │   │   ├── home.tsx
│   │   │   ├── music.tsx
│   │   │   ├── social.tsx
│   │   │   ├── live.tsx
│   │   │   ├── everything-spaz.tsx
│   │   │   └── dreamers-club.tsx
│   │   ├── (auth)/                      # Auth screens
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── reset-password.tsx
│   │   └── admin/                       # Admin dashboard
│   │       ├── _layout.tsx
│   │       ├── dashboard.tsx
│   │       ├── artist-profile.tsx
│   │       ├── music-management.tsx
│   │       ├── social-management.tsx
│   │       ├── live-management.tsx
│   │       ├── content-management.tsx
│   │       ├── notifications.tsx
│   │       ├── integrations.tsx
│   │       └── analytics.tsx
│   ├── components/                      # Reusable components
│   │   ├── Navigation/
│   │   ├── Cards/
│   │   ├── Buttons/
│   │   ├── Forms/
│   │   ├── Loading/
│   │   ├── Empty/
│   │   └── Shared/
│   ├── hooks/                           # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useMusic.ts
│   │   ├── useSocial.ts
│   │   ├── useLive.ts
│   │   └── useNotifications.ts
│   ├── services/                        # API & external services
│   │   ├── supabase.ts
│   │   ├── spotify.ts
│   │   ├── youtube.ts
│   │   ├── twitch.ts
│   │   ├── social.ts
│   │   ├── notifications.ts
│   │   └── analytics.ts
│   ├── types/                           # TypeScript types
│   │   ├── auth.ts
│   │   ├── music.ts
│   │   ├── social.ts
│   │   ├── livestream.ts
│   │   └── api.ts
│   ├── styles/                          # Theme & styling
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   └── spacing.ts
│   ├── utils/                           # Utility functions
│   │   ├── formatting.ts
│   │   ├── validation.ts
│   │   ├── storage.ts
│   │   └── constants.ts
│   ├── assets/                          # Images, fonts, media
│   │   ├── branding/
│   │   │   ├── logo/
│   │   │   │   ├── spaz-ssg-logo.png   # Original
│   │   │   │   ├── logo-sm.png         # Optimized small
│   │   │   │   ├── logo-md.png         # Optimized medium
│   │   │   │   └── logo-lg.png         # Optimized large
│   │   ├── icons/
│   │   ├── platform-logos/
│   │   └── backgrounds/
│   ├── app.json                         # Expo config
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── backend/                             # Supabase config
│   ├── supabase/
│   │   ├── migrations/                  # SQL migrations
│   │   │   ├── 001_initial_schema.sql
│   │   │   ├── 002_rls_policies.sql
│   │   │   └── 003_indexes.sql
│   │   ├── functions/                   # Edge Functions
│   │   │   ├── sync-spotify/
│   │   │   ├── sync-youtube/
│   │   │   ├── send-notification/
│   │   │   ├── update-livestream-status/
│   │   │   └── analytics-event/
│   │   ├── seeds/                       # Sample data
│   │   └── config.toml
│   └── .env.example
├── admin-dashboard/                     # Admin web interface (future)
│   ├── src/
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── README.md
│   ├── ARCHITECTURE.md                  # This file
│   ├── DATABASE_SCHEMA.md
│   ├── API_CREDENTIALS_SETUP.md
│   ├── API_INTEGRATION_STATUS.md
│   ├── ADMIN_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── BACKUP_AND_RESTORE.md
│   ├── SECURITY.md
│   ├── ACCESSIBILITY.md
│   └── CHANGELOG.md
├── CLAUDE.md                            # Claude development guide
├── .gitignore
├── .env.example
├── package.json                         # Root workspaces config
└── SPAZ_SSG_LOGO_ASSET.txt              # Logo documentation
```

---

## 13. DEVELOPMENT ROADMAP

### Phase 1 (Complete)
- ✅ Technical architecture
- ✅ Application structure
- ✅ Database schema
- ✅ API integration plan
- ✅ Security & auth design
- ✅ Performance strategy

### Phase 2 (Next)
- Design system development
- UI component library
- Brand color & typography implementation
- Navigation UI design
- Screen mockups for all 6 tabs

### Phase 3
- React Native project setup
- Core navigation
- Reusable component library
- Home, Music, Social, LIVE, Everything Spaz, Dreamers Club screens
- Backend connection foundation

### Phase 4
- Spotify integration
- YouTube integration
- Twitch integration
- Social media placeholders
- Notification system
- Analytics foundation

### Phase 5
- User authentication (optional accounts)
- Notification preferences
- Premium membership infrastructure
- User profiles

### Phase 6
- Admin dashboard development
- Content management
- Integration management
- Notification management
- Analytics dashboard

### Phase 7
- Comprehensive testing
- Security audit
- Performance optimization
- iOS & Android testing
- Accessibility verification

### Phase 8
- Build preparation
- App Store submission (iOS)
- Google Play submission (Android)
- Release documentation

---

## 14. DEPENDENCIES & BLOCKERS

### 14.1 API Credentials Needed (Phase 4)

- Spotify Client ID & Secret
- YouTube Data API Key
- Twitch Client ID & Secret (if VOD integration)
- Instagram App ID (for Graph API)
- TikTok API access (pending approval)
- Discord Bot Token (optional, for community features)
- Stripe Account (for payment infrastructure)

### 14.2 Workarounds (When Credentials Not Available)

1. **Mock Data**: Development screens with sample data
2. **Manual Links**: Direct links to external platforms (no embed/sync)
3. **Placeholder State**: Clear indication that integration pending
4. **Documentation**: Instructions for adding credentials later

### 14.3 No Blockers for Phase 3

Core application structure, navigation, and UI can be built without external API credentials.

---

## 15. SUCCESS CRITERIA (PHASE 1)

✅ **Architecture Document**: Complete technical blueprint  
✅ **Database Schema**: Production-ready with RLS policies  
✅ **Project Structure**: Clear, organized file hierarchy  
✅ **API Integration Plan**: Detailed credential requirements and implementation strategy  
✅ **Security & Auth Design**: Comprehensive access control and data protection  
✅ **Documentation Outline**: Framework for all project documentation  
✅ **Roadmap**: Clear phases with dependencies and blockers  
✅ **Development Standards**: Guidelines for code quality and maintainability  

---

## 16. NEXT STEPS (PHASE 2)

1. Review and approve architecture plan
2. Identify any design changes or clarifications needed
3. Begin Phase 2: UI/UX Design System
4. Create design system in Figma or similar tool
5. Define component library visuals

---

**Prepared by**: Kiro (AI Assistant)  
**Date**: 2026-11-13  
**Status**: Ready for Review
