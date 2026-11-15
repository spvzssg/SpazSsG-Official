-- Transactional release editor operations. Both functions use the caller's
-- authenticated JWT (security invoker) so the table's RLS remains in force.

create or replace function public.admin_upsert_music_release(
  p_release jsonb,
  p_links jsonb default '[]'::jsonb,
  p_release_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  saved_id uuid;
  link_item jsonb;
  link_order integer := 0;
  link_platform text;
  link_url text;
  credit_item jsonb;
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;

  if jsonb_typeof(p_release) <> 'object' then
    raise exception 'Release must be a JSON object' using errcode = '22023';
  end if;
  if jsonb_typeof(coalesce(p_links, '[]'::jsonb)) <> 'array' then
    raise exception 'Platform links must be a JSON array' using errcode = '22023';
  end if;
  if char_length(coalesce(p_release ->> 'title', '')) not between 1 and 160
    or coalesce(p_release ->> 'slug', '') !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'
    or coalesce(p_release ->> 'release_type', 'single') not in ('single', 'ep', 'album', 'mixtape')
    or char_length(coalesce(p_release ->> 'description', '')) > 5000 then
    raise exception 'Invalid release fields' using errcode = '22023';
  end if;
  if char_length(coalesce(p_release ->> 'cover_art_url', '')) > 0
    and (p_release ->> 'cover_art_url' !~ '^https://' or char_length(p_release ->> 'cover_art_url') > 2048) then
    raise exception 'Cover art must use an HTTPS URL' using errcode = '22023';
  end if;
  if jsonb_typeof(coalesce(p_release -> 'featured_artists', '[]'::jsonb)) <> 'array'
    or jsonb_typeof(coalesce(p_release -> 'producer_credits', '[]'::jsonb)) <> 'array' then
    raise exception 'Credits must be arrays' using errcode = '22023';
  end if;
  if jsonb_array_length(coalesce(p_release -> 'featured_artists', '[]'::jsonb)) > 20
    or jsonb_array_length(coalesce(p_release -> 'producer_credits', '[]'::jsonb)) > 20 then
    raise exception 'Too many credit entries' using errcode = '22023';
  end if;
  for credit_item in select value from jsonb_array_elements(coalesce(p_release -> 'featured_artists', '[]'::jsonb)) loop
    if jsonb_typeof(credit_item) <> 'string' or char_length(credit_item #>> '{}') > 100 then
      raise exception 'Featured artist credits must be strings no longer than 100 characters' using errcode = '22023';
    end if;
  end loop;
  for credit_item in select value from jsonb_array_elements(coalesce(p_release -> 'producer_credits', '[]'::jsonb)) loop
    if jsonb_typeof(credit_item) <> 'string' or char_length(credit_item #>> '{}') > 100 then
      raise exception 'Producer credits must be strings no longer than 100 characters' using errcode = '22023';
    end if;
  end loop;

  if p_release_id is null then
    insert into public.music_releases (
      title, slug, artist_name, release_type, release_date,
      cover_art_url, description, featured_artists, producer_credits,
      genre, is_featured, is_published
    ) values (
      p_release ->> 'title',
      p_release ->> 'slug',
      coalesce(nullif(p_release ->> 'artist_name', ''), 'Spaz SsG'),
      coalesce(nullif(p_release ->> 'release_type', ''), 'single'),
      nullif(p_release ->> 'release_date', '')::date,
      nullif(p_release ->> 'cover_art_url', ''),
      nullif(p_release ->> 'description', ''),
      coalesce(array(select jsonb_array_elements_text(coalesce(p_release -> 'featured_artists', '[]'::jsonb))), '{}'),
      coalesce(array(select jsonb_array_elements_text(coalesce(p_release -> 'producer_credits', '[]'::jsonb))), '{}'),
      nullif(p_release ->> 'genre', ''),
      coalesce((p_release ->> 'is_featured')::boolean, false),
      coalesce((p_release ->> 'is_published')::boolean, false)
    ) returning id into saved_id;
  else
    update public.music_releases set
      title = p_release ->> 'title',
      slug = p_release ->> 'slug',
      artist_name = coalesce(nullif(p_release ->> 'artist_name', ''), 'Spaz SsG'),
      release_type = coalesce(nullif(p_release ->> 'release_type', ''), 'single'),
      release_date = nullif(p_release ->> 'release_date', '')::date,
      cover_art_url = nullif(p_release ->> 'cover_art_url', ''),
      description = nullif(p_release ->> 'description', ''),
      featured_artists = coalesce(array(select jsonb_array_elements_text(coalesce(p_release -> 'featured_artists', '[]'::jsonb))), '{}'),
      producer_credits = coalesce(array(select jsonb_array_elements_text(coalesce(p_release -> 'producer_credits', '[]'::jsonb))), '{}'),
      genre = nullif(p_release ->> 'genre', ''),
      is_featured = coalesce((p_release ->> 'is_featured')::boolean, false),
      is_published = coalesce((p_release ->> 'is_published')::boolean, false)
    where id = p_release_id
    returning id into saved_id;

    if saved_id is null then
      raise exception 'Release not found or not authorized' using errcode = '42501';
    end if;
  end if;

  for link_item in select value from jsonb_array_elements(coalesce(p_links, '[]'::jsonb)) loop
    link_platform := link_item ->> 'platform';
    link_url := link_item ->> 'url';
    if link_platform not in ('spotify', 'apple_music', 'youtube_music', 'unitedmasters', 'soundcloud', 'tidal', 'deezer', 'other') then
      raise exception 'Unsupported streaming platform' using errcode = '22023';
    end if;
    if link_url is null or link_url !~ '^https://' or char_length(link_url) > 2048 then
      raise exception 'Platform links must be valid HTTPS URLs' using errcode = '22023';
    end if;
    link_order := link_order + 1;
    if link_order > 20 then
      raise exception 'A release can have at most 20 platform links' using errcode = '22023';
    end if;
  end loop;

  -- All input is validated before deleting or replacing any existing links.
  delete from public.music_platform_links where release_id = saved_id;
  link_order := 0;
  for link_item in select value from jsonb_array_elements(coalesce(p_links, '[]'::jsonb)) loop
    insert into public.music_platform_links (release_id, platform, url, display_order)
    values (
      saved_id,
      link_item ->> 'platform',
      link_item ->> 'url',
      coalesce((link_item ->> 'display_order')::integer, link_order)
    );
    link_order := link_order + 1;
  end loop;

  return saved_id;
end;
$$;

create or replace function public.admin_delete_music_release(p_release_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;

  delete from public.music_releases where id = p_release_id;
  if not found then
    raise exception 'Release not found or not authorized' using errcode = '42501';
  end if;
end;
$$;

revoke all on function public.admin_upsert_music_release(jsonb, jsonb, uuid) from public, anon;
revoke all on function public.admin_delete_music_release(uuid) from public, anon;
revoke all on function public.admin_upsert_music_release(jsonb, jsonb, uuid) from service_role;
revoke all on function public.admin_delete_music_release(uuid) from service_role;
grant execute on function public.admin_upsert_music_release(jsonb, jsonb, uuid) to authenticated;
grant execute on function public.admin_delete_music_release(uuid) to authenticated;
