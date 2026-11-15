-- Spaz SsG public website and admin CMS foundation.
-- Apply through Supabase CLI or SQL Editor. The first admin account must be
-- explicitly bootstrapped in admin_users from the Supabase SQL Editor.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users a
    where a.user_id = (select auth.uid())
      and a.is_active = true
      and (coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'false'::jsonb)
  );
$$;

revoke all on function public.is_site_admin() from public, anon;
grant execute on function public.is_site_admin() to authenticated, service_role;

create table if not exists public.music_releases (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  artist_name text not null default 'Spaz SsG',
  release_type text not null default 'single' check (release_type in ('single', 'ep', 'album', 'mixtape')),
  release_date date,
  cover_art_url text,
  description text,
  featured_artists text[] not null default '{}',
  producer_credits text[] not null default '{}',
  genre text,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  release_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.music_platform_links (
  id uuid primary key default gen_random_uuid(),
  release_id uuid not null references public.music_releases(id) on delete cascade,
  platform text not null check (platform in ('spotify', 'apple_music', 'youtube_music', 'unitedmasters', 'soundcloud', 'tidal', 'deezer', 'other')),
  url text not null check (url ~ '^https://'),
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (release_id, platform)
);

create table if not exists public.social_content (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('instagram', 'tiktok', 'youtube', 'twitch', 'facebook', 'other')),
  external_id text,
  title text,
  description text,
  thumbnail_url text,
  embed_url text,
  content_url text not null check (content_url ~ '^https://'),
  posted_at timestamptz,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists social_content_external_id_unique
  on public.social_content (platform, external_id)
  where external_id is not null;

create table if not exists public.livestreams (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('twitch', 'youtube', 'tiktok', 'facebook')),
  title text not null check (char_length(title) between 1 and 160),
  description text,
  scheduled_at timestamptz,
  started_at timestamptz,
  ended_at timestamptz,
  live_verified_at timestamptz,
  live_verified_by uuid references auth.users(id) on delete set null,
  stream_url text check (stream_url is null or stream_url ~ '^https://'),
  embed_url text check (embed_url is null or embed_url ~ '^https://'),
  thumbnail_url text,
  vod_url text check (vod_url is null or vod_url ~ '^https://'),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ended_at is null or started_at is null or ended_at >= started_at)
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 160),
  content text not null check (char_length(content) between 1 and 10000),
  is_published boolean not null default false,
  published_at timestamptz,
  scheduled_for timestamptz,
  is_pinned boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.website_links (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  url text not null check (url ~ '^https://'),
  platform text,
  description text,
  icon_url text,
  category text not null default 'other',
  is_featured boolean not null default false,
  is_published boolean not null default false,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key check (key ~ '^[a-z0-9_.-]+$'),
  value jsonb not null default '{}'::jsonb,
  is_public boolean not null default true,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id) on delete set null
);

create index if not exists music_releases_public_order_idx
  on public.music_releases (is_published, is_featured desc, release_order, release_date desc);
create index if not exists music_releases_slug_idx on public.music_releases (slug);
create index if not exists music_platform_links_release_order_idx
  on public.music_platform_links (release_id, display_order);
create index if not exists social_content_public_order_idx
  on public.social_content (is_published, is_featured desc, display_order, posted_at desc);
create index if not exists livestreams_public_schedule_idx
  on public.livestreams (is_published, scheduled_at desc);
create index if not exists announcements_public_order_idx
  on public.announcements (is_published, is_pinned desc, published_at desc);
create index if not exists website_links_public_order_idx
  on public.website_links (is_published, category, display_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'music_releases', 'music_platform_links', 'social_content',
    'livestreams', 'announcements', 'website_links', 'site_settings'
  ] LOOP
    EXECUTE format('drop trigger if exists set_updated_at on public.%I', table_name);
    EXECUTE format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      table_name
    );
  END LOOP;
END;
$$;

alter table public.admin_users enable row level security;
alter table public.music_releases enable row level security;
alter table public.music_platform_links enable row level security;
alter table public.social_content enable row level security;
alter table public.livestreams enable row level security;
alter table public.announcements enable row level security;
alter table public.website_links enable row level security;
alter table public.site_settings enable row level security;

-- Users may inspect only their own admin membership. Client-side roles cannot
-- be self-assigned: no authenticated INSERT/UPDATE/DELETE policy is provided.
drop policy if exists admin_users_read_self on public.admin_users;
create policy admin_users_read_self on public.admin_users
  for select to authenticated using (
    user_id = (select auth.uid())
    and (coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'false'::jsonb)
  );

drop policy if exists music_releases_public_read on public.music_releases;
create policy music_releases_public_read on public.music_releases
  for select to anon, authenticated using (is_published = true);
drop policy if exists music_releases_admin_manage on public.music_releases;
create policy music_releases_admin_manage on public.music_releases
  for all to authenticated using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

drop policy if exists music_platform_links_public_read on public.music_platform_links;
create policy music_platform_links_public_read on public.music_platform_links
  for select to anon, authenticated using (
    exists (
      select 1 from public.music_releases r
      where r.id = release_id and r.is_published = true
    )
  );
drop policy if exists music_platform_links_admin_manage on public.music_platform_links;
create policy music_platform_links_admin_manage on public.music_platform_links
  for all to authenticated using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

drop policy if exists social_content_public_read on public.social_content;
create policy social_content_public_read on public.social_content
  for select to anon, authenticated using (is_published = true);
drop policy if exists social_content_admin_manage on public.social_content;
drop policy if exists social_content_admin_read on public.social_content;
create policy social_content_admin_read on public.social_content
  for select to authenticated using ((select public.is_site_admin()));
drop policy if exists social_content_admin_insert on public.social_content;
create policy social_content_admin_insert on public.social_content
  for insert to authenticated with check ((select public.is_site_admin()) and is_published = false);
drop policy if exists social_content_admin_update on public.social_content;
create policy social_content_admin_update on public.social_content
  for update to authenticated using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));
drop policy if exists social_content_admin_delete on public.social_content;
create policy social_content_admin_delete on public.social_content
  for delete to authenticated using ((select public.is_site_admin()));
-- Publishing and edits use the validation RPCs in migration 005.

drop policy if exists livestreams_public_read on public.livestreams;
create policy livestreams_public_read on public.livestreams
  for select to anon, authenticated using (is_published = true);
drop policy if exists livestreams_admin_manage on public.livestreams;
drop policy if exists livestreams_admin_update on public.livestreams;
drop policy if exists livestreams_admin_read on public.livestreams;
create policy livestreams_admin_read on public.livestreams
  for select to authenticated using ((select public.is_site_admin()));
drop policy if exists livestreams_admin_insert on public.livestreams;
create policy livestreams_admin_insert on public.livestreams
  for insert to authenticated with check (
    (select public.is_site_admin()) and live_verified_at is null and live_verified_by is null
    and started_at is null and ended_at is null
  );
drop policy if exists livestreams_admin_delete on public.livestreams;
create policy livestreams_admin_delete on public.livestreams
  for delete to authenticated using ((select public.is_site_admin()));
-- Schedule updates and live-status changes use narrowly-scoped admin RPCs. No
-- direct UPDATE policy is granted, preventing clients from setting LIVE fields.

drop policy if exists announcements_public_read on public.announcements;
create policy announcements_public_read on public.announcements
  for select to anon, authenticated using (
    is_published = true and (scheduled_for is null or scheduled_for <= now())
  );
drop policy if exists announcements_admin_manage on public.announcements;
create policy announcements_admin_manage on public.announcements
  for all to authenticated using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

-- Add explicit grants because RLS alone does not grant table access.
grant select on public.music_releases, public.music_platform_links, public.social_content,
  public.livestreams, public.announcements, public.website_links, public.site_settings
  to anon, authenticated;
grant select on public.admin_users to authenticated;
grant insert, update, delete on public.music_releases, public.music_platform_links,
  public.announcements, public.website_links, public.site_settings
  to authenticated;
grant insert, update, delete on public.social_content to authenticated;
grant select, insert, delete on public.livestreams to authenticated;

drop policy if exists website_links_public_read on public.website_links;
create policy website_links_public_read on public.website_links
  for select to anon, authenticated using (is_published = true);
drop policy if exists website_links_admin_manage on public.website_links;
create policy website_links_admin_manage on public.website_links
  for all to authenticated using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()) and url ~ '^https://' and char_length(url) <= 2048 and char_length(title) between 1 and 100 and char_length(description) <= 500);

drop policy if exists site_settings_public_read on public.site_settings;
create policy site_settings_public_read on public.site_settings
  for select to anon, authenticated using (is_public = true);
drop policy if exists site_settings_admin_manage on public.site_settings;
create policy site_settings_admin_manage on public.site_settings
  for all to authenticated using ((select public.is_site_admin()))
  with check ((select public.is_site_admin()));

-- Create a public-read media bucket for website artwork. Writes remain admin-only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'website-media',
  'website-media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists website_media_public_read on storage.objects;
create policy website_media_public_read on storage.objects
  for select to anon, authenticated using (bucket_id = 'website-media');
drop policy if exists website_media_admin_insert on storage.objects;
create policy website_media_admin_insert on storage.objects
  for insert to authenticated with check (
    bucket_id = 'website-media' and (select public.is_site_admin())
  );
drop policy if exists website_media_admin_update on storage.objects;
create policy website_media_admin_update on storage.objects
  for update to authenticated using (
    bucket_id = 'website-media' and (select public.is_site_admin())
  ) with check (
    bucket_id = 'website-media' and (select public.is_site_admin())
  );
drop policy if exists website_media_admin_delete on storage.objects;
create policy website_media_admin_delete on storage.objects
  for delete to authenticated using (
    bucket_id = 'website-media' and (select public.is_site_admin())
  );

-- BOOTSTRAP: after creating an account in Supabase Auth, add its UUID once
-- from the Supabase SQL Editor using the trusted project owner role:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID_HERE');
-- Never expose a service-role key to this website or browser.
