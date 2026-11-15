-- Admin-only social content editor operations. Validate all fields before write.

create or replace function public.admin_upsert_social_content(
  p_content jsonb,
  p_content_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  saved_id uuid;
  content_url text;
  thumbnail_url text;
  embed_url text;
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if jsonb_typeof(p_content) <> 'object' then
    raise exception 'Social content must be a JSON object' using errcode = '22023';
  end if;
  if p_content ->> 'platform' not in ('instagram', 'tiktok', 'youtube', 'twitch', 'facebook', 'other')
    or char_length(coalesce(p_content ->> 'title', '')) > 160
    or char_length(coalesce(p_content ->> 'description', '')) > 5000 then
    raise exception 'Invalid social content fields' using errcode = '22023';
  end if;

  content_url := p_content ->> 'content_url';
  thumbnail_url := nullif(p_content ->> 'thumbnail_url', '');
  embed_url := nullif(p_content ->> 'embed_url', '');
  if content_url is null or content_url !~ '^https://' or char_length(content_url) > 2048
    or (thumbnail_url is not null and (thumbnail_url !~ '^https://' or char_length(thumbnail_url) > 2048))
    or (embed_url is not null and (embed_url !~ '^https://' or char_length(embed_url) > 2048)) then
    raise exception 'Content, thumbnail, and embed URLs must use HTTPS' using errcode = '22023';
  end if;

  if p_content_id is null then
    insert into public.social_content (platform, external_id, title, description, thumbnail_url, embed_url, content_url, posted_at, is_featured, is_published)
    values (
      p_content ->> 'platform', nullif(p_content ->> 'external_id', ''), nullif(p_content ->> 'title', ''),
      nullif(p_content ->> 'description', ''), thumbnail_url, embed_url, content_url,
      nullif(p_content ->> 'posted_at', '')::timestamptz,
      coalesce((p_content ->> 'is_featured')::boolean, false),
      coalesce((p_content ->> 'is_published')::boolean, false)
    ) returning id into saved_id;
  else
    update public.social_content set
      platform = p_content ->> 'platform',
      external_id = nullif(p_content ->> 'external_id', ''),
      title = nullif(p_content ->> 'title', ''),
      description = nullif(p_content ->> 'description', ''),
      thumbnail_url = thumbnail_url,
      embed_url = embed_url,
      content_url = content_url,
      posted_at = nullif(p_content ->> 'posted_at', '')::timestamptz,
      is_featured = coalesce((p_content ->> 'is_featured')::boolean, false),
      is_published = coalesce((p_content ->> 'is_published')::boolean, false)
    where id = p_content_id
    returning id into saved_id;
    if saved_id is null then
      raise exception 'Social content not found or not authorized' using errcode = '42501';
    end if;
  end if;
  return saved_id;
end;
$$;

create or replace function public.admin_delete_social_content(p_content_id uuid)
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
  delete from public.social_content where id = p_content_id;
  if not found then
    raise exception 'Social content not found or not authorized' using errcode = '42501';
  end if;
end;
$$;

revoke all on function public.admin_upsert_social_content(jsonb, uuid) from public, anon;
revoke all on function public.admin_delete_social_content(uuid) from public, anon;
revoke all on function public.admin_upsert_social_content(jsonb, uuid) from service_role;
revoke all on function public.admin_delete_social_content(uuid) from service_role;
grant execute on function public.admin_upsert_social_content(jsonb, uuid) to authenticated;
grant execute on function public.admin_delete_social_content(uuid) to authenticated;
