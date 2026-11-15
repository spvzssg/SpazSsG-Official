# DATABASE SCHEMA

**Status**: Phase 1 Design Document  
**Last Updated**: 2026-11-14  
**Implementation**: Phase 3

---

## TABLE DEFINITIONS

### profiles
User profile information.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  artist_name TEXT NOT NULL DEFAULT 'Spaz SsG',
  artist_bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_profiles_user_id ON profiles(user_id);
```

### artist_settings
Current artist state and announcements.

```sql
CREATE TABLE artist_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_live BOOLEAN DEFAULT FALSE,
  live_platform TEXT CHECK (live_platform IN ('twitch', 'tiktok', 'youtube')),
  live_url TEXT,
  next_stream_time TIMESTAMP,
  offline_message TEXT DEFAULT 'Stream offline. Check back soon!',
  featured_announcement TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Only one row should exist (enforce via app logic)
```

### music_releases
Music releases across all platforms.

```sql
CREATE TABLE music_releases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  artist_name TEXT DEFAULT 'Spaz SsG',
  release_date DATE,
  cover_art_url TEXT,
  description TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  release_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_releases_featured ON music_releases(is_featured);
CREATE INDEX idx_releases_date ON music_releases(release_date DESC);
CREATE INDEX idx_releases_order ON music_releases(release_order);
```

### music_platform_links
Streaming platform links for releases.

```sql
CREATE TABLE music_platform_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  release_id UUID REFERENCES music_releases(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  platform_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(release_id, platform)
);

CREATE INDEX idx_platform_links_release ON music_platform_links(release_id);
CREATE INDEX idx_platform_links_platform ON music_platform_links(platform);
```

### social_accounts
Connected social media accounts.

```sql
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL UNIQUE,
  account_url TEXT NOT NULL,
  is_connected BOOLEAN DEFAULT FALSE,
  last_sync TIMESTAMP,
  sync_error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_social_accounts_platform ON social_accounts(platform);
```

### social_content
Social media content from all platforms.

```sql
CREATE TABLE social_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  external_id TEXT NOT NULL,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  content_url TEXT NOT NULL,
  posted_at TIMESTAMP,
  is_featured BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,
  content_order INTEGER,
  synced_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(platform, external_id)
);

CREATE INDEX idx_social_content_platform ON social_content(platform);
CREATE INDEX idx_social_content_featured ON social_content(is_featured);
CREATE INDEX idx_social_content_hidden ON social_content(is_hidden);
CREATE INDEX idx_social_content_posted ON social_content(posted_at DESC);
CREATE INDEX idx_social_content_order ON social_content(content_order);
```

### livestreams
Livestream recordings and information.

```sql
CREATE TABLE livestreams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  title TEXT,
  scheduled_at TIMESTAMP,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  thumbnail_url TEXT,
  vod_url TEXT,
  vod_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_livestreams_platform ON livestreams(platform);
CREATE INDEX idx_livestreams_scheduled ON livestreams(scheduled_at DESC);
CREATE INDEX idx_livestreams_started ON livestreams(started_at DESC);
```

### announcements
Artist announcements and notifications.

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP,
  scheduled_for TIMESTAMP,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_announcements_published ON announcements(is_published);
CREATE INDEX idx_announcements_pinned ON announcements(is_pinned);
CREATE INDEX idx_announcements_scheduled ON announcements(scheduled_for);
```

### push_subscriptions
Push notification device tokens.

```sql
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  expo_push_token TEXT NOT NULL UNIQUE,
  subscribed_to_new_music BOOLEAN DEFAULT TRUE,
  subscribed_to_new_videos BOOLEAN DEFAULT TRUE,
  subscribed_to_new_social BOOLEAN DEFAULT TRUE,
  subscribed_to_live_notifications BOOLEAN DEFAULT TRUE,
  subscribed_to_announcements BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_push_subscriptions_user ON push_subscriptions(user_id);
CREATE INDEX idx_push_subscriptions_token ON push_subscriptions(expo_push_token);
```

### integrations
API integration status and credentials storage.

```sql
CREATE TABLE integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL UNIQUE,
  is_connected BOOLEAN DEFAULT FALSE,
  connection_status TEXT DEFAULT 'pending',
  last_sync TIMESTAMP,
  last_error TEXT,
  connection_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_integrations_service ON integrations(service_name);
```

### app_sections
Configurable app sections and content.

```sql
CREATE TABLE app_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT NOT NULL UNIQUE,
  is_enabled BOOLEAN DEFAULT TRUE,
  display_order INTEGER,
  section_config JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_app_sections_enabled ON app_sections(is_enabled);
```

### analytics_events
User interaction analytics.

```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  screen_name TEXT,
  element_name TEXT,
  platform TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_screen ON analytics_events(screen_name);
CREATE INDEX idx_analytics_events_date ON analytics_events(created_at DESC);
```

---

## ROW LEVEL SECURITY POLICIES

### Public Access (Unauthenticated)
```sql
-- Anyone can read public content
ALTER TABLE music_releases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_can_read_releases" ON music_releases
  FOR SELECT USING (true);

ALTER TABLE social_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_can_read_social" ON social_content
  FOR SELECT USING (is_hidden = FALSE);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_can_read_announcements" ON announcements
  FOR SELECT USING (is_published = TRUE);

ALTER TABLE livestreams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_can_read_livestreams" ON livestreams
  FOR SELECT USING (true);
```

### User Push Subscriptions
```sql
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_read_own_subscriptions" ON push_subscriptions
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "users_can_insert_subscriptions" ON push_subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "users_can_update_own_subscriptions" ON push_subscriptions
  FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);
```

### Admin Write Access
```sql
-- Admin can manage all content
CREATE POLICY "admin_can_manage_releases" ON music_releases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.artist_name = 'Spaz SsG'
    )
  );

CREATE POLICY "admin_can_manage_social" ON social_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.artist_name = 'Spaz SsG'
    )
  );
```

---

## MIGRATIONS

### Migration 001: Initial Schema

File: `backend/supabase/migrations/001_initial_schema.sql`

Contains all table definitions above.

### Migration 002: Row Level Security

File: `backend/supabase/migrations/002_rls_policies.sql`

Contains all RLS policies above.

### Migration 003: Indexes & Performance

File: `backend/supabase/migrations/003_indexes.sql`

All indexes defined in table sections.

---

## RELATIONSHIPS DIAGRAM

```
profiles
  └─ (references) auth.users

music_releases
  └─ (1-to-many) music_platform_links

music_platform_links
  └─ (references) music_releases

social_content
  └─ (no direct FK, indexed on platform + external_id)

push_subscriptions
  └─ (references) auth.users

analytics_events
  └─ (references) auth.users (optional)
```

---

## DATA RETENTION POLICIES

- **Analytics Events**: 90 days (auto-delete via scheduled function)
- **Social Content**: Indefinite (manually managed)
- **Livestreams**: Indefinite (VOD records)
- **Announcements**: Indefinite (archive)
- **Push Subscriptions**: Until user deletes app
- **Artist Settings**: Current only (single row)

---

## Seed Data

Initial seed data for development:

```sql
-- Insert artist profile
INSERT INTO profiles (artist_name, artist_bio) VALUES (
  'Spaz SsG',
  'East Coast Hip-Hop Artist. Dark melodic trap. Atmospheric R&B. Cinematic music driven by ambition, sacrifice, loyalty, and dreams.'
);

-- Insert app sections
INSERT INTO app_sections (section_name, is_enabled, display_order) VALUES
  ('home', true, 1),
  ('music', true, 2),
  ('social', true, 3),
  ('live', true, 4),
  ('everything_spaz', true, 5),
  ('dreamers_club', true, 6);

-- Insert social accounts
INSERT INTO social_accounts (platform, account_url, is_connected) VALUES
  ('instagram', 'https://www.instagram.com/spvzssg', false),
  ('tiktok', 'https://www.tiktok.com/@spvzssg', false),
  ('youtube', 'https://youtube.com/@spazssglive', false),
  ('twitch', 'https://www.twitch.tv/spazssg', false);
```

---

**Version**: 1.0  
**Status**: Ready for Implementation in Phase 3  
**Last Updated**: 2026-11-14
