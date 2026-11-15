-- Narrowly-scoped announcement operations with field validation.

create or replace function public.admin_upsert_announcement(
  p_announcement jsonb,
  p_announcement_id uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  saved_id uuid;
  schedule_time timestamptz;
begin
  if coalesce((select auth.jwt()) -> 'is_anonymous', 'false'::jsonb) = 'true'::jsonb
    or not (select public.is_site_admin()) then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  if jsonb_typeof(p_announcement) <> 'object' then
    raise exception 'Announcement must be a JSON object' using errcode = '22023';
  end if;
  if char_length(coalesce(p_announcement ->> 'title', '')) not between 1 and 160
    or char_length(coalesce(p_announcement ->> 'content', '')) not between 1 and 10000 then
    raise exception 'Invalid announcement fields' using errcode = '22023';
  end if;
  schedule_time := nullif(p_announcement ->> 'scheduled_for', '')::timestamptz;

  if p_announcement_id is null then
    insert into public.announcements (title, content, is_published, is_pinned, scheduled_for, published_at)
    values (
      p_announcement ->> 'title',
      p_announcement ->> 'content',
      coalesce((p_announcement ->> 'is_published')::boolean, false),
      coalesce((p_announcement ->> 'is_pinned')::boolean, false),
      schedule_time,
      case when coalesce((p_announcement ->> 'is_published')::boolean, false) and (schedule_time is null or schedule_time <= now()) then now() else null end
    ) returning id into saved_id;
  else
    update public.announcements set
      title = p_announcement ->> 'title',
      content = p_announcement ->> 'content',
      is_published = coalesce((p_announcement ->> 'is_published')::boolean, false),
      is_pinned = coalesce((p_announcement ->> 'is_pinned')::boolean, false),
      scheduled_for = schedule_time,
      published_at = case
        when coalesce((p_announcement ->> 'is_published')::boolean, false) and (schedule_time is null or schedule_time <= now()) then coalesce(published_at, now())
        else null
      end
    where id = p_announcement_id
    returning id into saved_id;
    if saved_id is null then
      raise exception 'Announcement not found or not authorized' using errcode = '42501';
    end if;
  end if;
  return saved_id;
end;
$$;

create or replace function public.admin_delete_announcement(p_announcement_id uuid)
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
  delete from public.announcements where id = p_announcement_id;
  if not found then
    raise exception 'Announcement not found or not authorized' using errcode = '42501';
  end if;
end;
$$;

revoke all on function public.admin_upsert_announcement(jsonb, uuid) from public, anon;
revoke all on function public.admin_delete_announcement(uuid) from public, anon;
revoke all on function public.admin_upsert_announcement(jsonb, uuid) from service_role;
revoke all on function public.admin_delete_announcement(uuid) from service_role;
grant execute on function public.admin_upsert_announcement(jsonb, uuid) to authenticated;
grant execute on function public.admin_delete_announcement(uuid) to authenticated;
