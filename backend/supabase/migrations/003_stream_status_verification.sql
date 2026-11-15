-- Schedule updates and verification are separate operations. This prevents a
-- browser client from marking a schedule LIVE by directly changing timestamps.

create or replace function public.admin_upsert_livestream(
  p_stream jsonb,
  p_stream_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  saved_id uuid;
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if jsonb_typeof(p_stream) <> 'object' then
    raise exception 'Stream must be a JSON object' using errcode = '22023';
  end if;

  if p_stream_id is null then
    insert into public.livestreams (
      platform, title, description, scheduled_at, stream_url, embed_url,
      thumbnail_url, vod_url, is_published, started_at, ended_at,
      live_verified_at, live_verified_by
    ) values (
      p_stream ->> 'platform',
      p_stream ->> 'title',
      nullif(p_stream ->> 'description', ''),
      nullif(p_stream ->> 'scheduled_at', '')::timestamptz,
      nullif(p_stream ->> 'stream_url', ''),
      nullif(p_stream ->> 'embed_url', ''),
      nullif(p_stream ->> 'thumbnail_url', ''),
      nullif(p_stream ->> 'vod_url', ''),
      coalesce((p_stream ->> 'is_published')::boolean, false),
      null, null, null, null
    ) returning id into saved_id;
  else
    update public.livestreams set
      platform = p_stream ->> 'platform',
      title = p_stream ->> 'title',
      description = nullif(p_stream ->> 'description', ''),
      scheduled_at = nullif(p_stream ->> 'scheduled_at', '')::timestamptz,
      stream_url = nullif(p_stream ->> 'stream_url', ''),
      embed_url = nullif(p_stream ->> 'embed_url', ''),
      thumbnail_url = nullif(p_stream ->> 'thumbnail_url', ''),
      vod_url = nullif(p_stream ->> 'vod_url', ''),
      is_published = coalesce((p_stream ->> 'is_published')::boolean, false)
    where id = p_stream_id
    returning id into saved_id;
    if saved_id is null then
      raise exception 'Stream not found or not authorized' using errcode = '42501';
    end if;
  end if;

  return saved_id;
end;
$$;

create or replace function public.admin_verify_livestream(p_stream_id uuid)
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
  update public.livestreams
  set started_at = coalesce(started_at, now()),
      ended_at = null,
      live_verified_at = now(),
      live_verified_by = (select auth.uid())
  where id = p_stream_id and is_published = true;
  if not found then
    raise exception 'Published stream not found or not authorized' using errcode = '42501';
  end if;
end;
$$;

create or replace function public.admin_end_livestream(p_stream_id uuid)
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
  update public.livestreams
  set ended_at = now(), live_verified_at = null, live_verified_by = null
  where id = p_stream_id and ended_at is null;
  if not found then
    raise exception 'Active stream not found or not authorized' using errcode = '42501';
  end if;
end;
$$;

revoke all on function public.admin_upsert_livestream(jsonb, uuid) from public, anon;
revoke all on function public.admin_verify_livestream(uuid) from public, anon;
revoke all on function public.admin_end_livestream(uuid) from public, anon;
revoke all on function public.admin_upsert_livestream(jsonb, uuid) from service_role;
revoke all on function public.admin_verify_livestream(uuid) from service_role;
revoke all on function public.admin_end_livestream(uuid) from service_role;
grant execute on function public.admin_upsert_livestream(jsonb, uuid) to authenticated;
grant execute on function public.admin_verify_livestream(uuid) to authenticated;
grant execute on function public.admin_end_livestream(uuid) to authenticated;
