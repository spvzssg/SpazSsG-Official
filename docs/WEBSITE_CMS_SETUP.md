# Website CMS setup and security checklist

The Next.js website includes Supabase Auth session handling, a private admin allow-list, PostgreSQL content models/RLS, validated admin RPCs, and a private-write/public-read artwork bucket. The migrations are in `backend/supabase/migrations/` and must be applied in numeric order.

## Setup

1. Create a Supabase project under the project owner's control.
2. Copy `apps/web/.env.example` to `apps/web/.env.local`.
3. Fill in only `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and, before deployment, `NEXT_PUBLIC_SITE_URL`. The anon/publishable key is intentionally public; never place a service-role key in browser code, source control, or a `NEXT_PUBLIC_*` variable.
4. Apply migrations 001 through 006 with the Supabase CLI or SQL Editor. Back up any existing database before applying schema changes.
5. Create the administrator privately in Supabase Auth. In the trusted SQL Editor, insert that account's Auth UUID into `public.admin_users`. No public signup route is provided.
6. Start the site and sign in at `/admin/login`.
7. Test admin release create/update/delete, announcements, social posts, stream schedule/verification, website links, profile settings and artwork uploads.

## Permission model

- Anonymous visitors read published music, social content, streams, announcements, links, public settings and the public media bucket.
- Authenticated accounts cannot self-assign admin membership; the `admin_users` table has self-read only and no client write grant.
- Admin membership is checked server-side in the Next.js admin layout and again by the database security functions.
- Anonymous Auth users are rejected by the admin database functions.
- CMS writes use narrowly scoped, validated `SECURITY DEFINER` RPCs with an empty `search_path`, explicit auth checks, restricted execution grants, and no service-role execution grants.
- Livestream schedules do not set active state. A separate admin verification RPC records the author/time; public pages show LIVE only while the verification is less than five minutes old. Admins can end the stream separately.
- Artwork uploads are limited by client validation and Supabase Storage bucket MIME/size policy. Storage RLS limits writes to administrators.

## Before production

- Confirm the migrations apply cleanly in a fresh Supabase project.
- Verify unauthenticated inserts/updates/deletes fail for every CMS table and storage object.
- Verify authenticated non-admin access is denied, including calls to all admin RPCs.
- Verify anonymous/expired sessions are denied even if an account row is present.
- Verify public content queries return only published rows and scheduled announcements only after their scheduled time.
- Verify every public page degrades gracefully if Supabase is unavailable.
- Configure Supabase Auth allowed redirect URLs for the deployed HTTPS origin.
- Rotate credentials if they were exposed; do not commit `.env.local`.

Supabase credentials and a connected project were not present during development here. The website code builds locally, but database migrations and authenticated CRUD must still be exercised against the owner's project before production use.
