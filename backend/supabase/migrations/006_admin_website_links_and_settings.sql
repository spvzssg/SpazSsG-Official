-- Admin-only website link and artist-profile operations.

create or replace function public.admin_upsert_website_link(
  p_link jsonb,
  p_link_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  saved_id uuid;
  link_url text;
  icon_url text;
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if jsonb_typeof(p_link) <> 'object' then
    raise exception 'Website link must be a JSON object' using errcode = '22023';
  end if;
  link_url := p_link ->> 'url';
  icon_url := nullif(p_link ->> 'icon_url', '');
  if char_length(coalesce(p_link ->> 'title', '')) not between 1 and 100
    or char_length(coalesce(p_link ->> 'description', '')) > 500
    or char_length(coalesce(p_link ->> 'platform', '')) > 60
    or char_length(coalesce(p_link ->> 'category', '')) not between 1 and 60
    or coalesce((p_link ->> 'display_order')::integer, 0) not between 0 and 100000
    or link_url is null or link_url !~ '^https://' or char_length(link_url) > 2048
    or (icon_url is not null and (icon_url !~ '^https://' or char_length(icon_url) > 2048)) then
    raise exception 'Invalid website link fields' using errcode = '22023';
  end if;

  if p_link_id is null then
    insert into public.website_links (title, url, platform, description, icon_url, category, is_featured, is_published, display_order)
    values (
      p_link ->> 'title', link_url, nullif(p_link ->> 'platform', ''), nullif(p_link ->> 'description', ''), icon_url,
      p_link ->> 'category', coalesce((p_link ->> 'is_featured')::boolean, false),
      coalesce((p_link ->> 'is_published')::boolean, false), coalesce((p_link ->> 'display_order')::integer, 0)
    ) returning id into saved_id;
  else
    update public.website_links set
      title = p_link ->> 'title', url = link_url, platform = nullif(p_link ->> 'platform', ''),
      description = nullif(p_link ->> 'description', ''), icon_url = icon_url, category = p_link ->> 'category',
      is_featured = coalesce((p_link ->> 'is_featured')::boolean, false),
      is_published = coalesce((p_link ->> 'is_published')::boolean, false),
      display_order = coalesce((p_link ->> 'display_order')::integer, 0)
    where id = p_link_id returning id into saved_id;
    if saved_id is null then
      raise exception 'Website link not found or not authorized' using errcode = '42501';
    end if;
  end if;
  return saved_id;
end;
$$;

create or replace function public.admin_delete_website_link(p_link_id uuid)
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
  delete from public.website_links where id = p_link_id;
  if not found then
    raise exception 'Website link not found or not authorized' using errcode = '42501';
  end if;
end;
$$;

create or replace function public.admin_update_artist_profile(p_value jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  bio_text text;
  mission_text text;
  display_name text;
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if jsonb_typeof(p_value) <> 'object' then
    raise exception 'Artist profile must be a JSON object' using errcode = '22023';
  end if;
  bio_text := coalesce(p_value ->> 'bio', '');
  mission_text := coalesce(p_value ->> 'mission', '');
  display_name := coalesce(p_value ->> 'display_name', 'Spaz SsG');
  if char_length(bio_text) > 5000 or char_length(mission_text) > 2000
    or display_name !~ '^Spaz SsG$' then
    raise exception 'Invalid artist profile fields' using errcode = '22023';
  end if;
  insert into public.site_settings (key, value, is_public, updated_by)
  values ('artist_profile', jsonb_build_object('bio', bio_text, 'mission', mission_text, 'display_name', display_name), true, (select auth.uid()))
  on conflict (key) do update set value = excluded.value, is_public = true, updated_by = excluded.updated_by;
end;
$$;

revoke all on function public.admin_upsert_website_link(jsonb, uuid) from public, anon, service_role;
revoke all on function public.admin_delete_website_link(uuid) from public, anon, service_role;
revoke all on function public.admin_update_artist_profile(jsonb) from public, anon, service_role;
grant execute on function public.admin_upsert_website_link(jsonb, uuid) to authenticated;
grant execute on function public.admin_delete_website_link(uuid) to authenticated;
grant execute on function public.admin_update_artist_profile(jsonb) to authenticated;

-- No anonymous/authenticated direct table writes: the website uses validated
-- security-definer RPCs. RLS remains defense in depth for reads and storage.
revoke insert, update, delete, truncate, references, trigger on public.admin_users,
  public.music_releases, public.music_platform_links, public.social_content,
  public.livestreams, public.announcements, public.website_links, public.site_settings
  from anon, authenticated;
grant select on public.music_releases, public.music_platform_links, public.social_content,
  public.livestreams, public.announcements, public.website_links, public.site_settings
  to anon, authenticated;
grant select on public.admin_users to authenticated;
