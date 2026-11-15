# Spaz SsG Official Website

Responsive artist website for Spaz SsG, built with Next.js 14 App Router, TypeScript, and Tailwind CSS.

## Local development

From the repository root:

```powershell
pnpm install
pnpm --filter @spaz/web run dev
```

Open <http://localhost:3000>. Without Supabase credentials, public pages and local media remain available, while admin routes show clear setup notices.

## Website routes

- `/` — Artist homepage, recent published releases, announcements, and community CTA
- `/music` — DSP directory, published release catalog and per-release detail pages
- `/social` — Social channels, published content, and the supplied Instagram widget
- `/live` — Published schedule, verified-live status, official stream links and archives
- `/dreamers-club` — Community introduction and published updates
- `/everything-spaz` — Official link directory, with database-managed additions
- `/about` — Artist introduction
- `/admin/login` — Private Supabase sign-in (public registration is disabled)
- `/admin/dashboard` — Website content overview
- `/admin/music`, `/admin/social`, `/admin/livestreams`, `/admin/announcements`, `/admin/links`, `/admin/settings` — Authenticated content management
- `/api/health` — Basic service health response

## Local media

Files in `public/` are served by the website itself:

- `spaz-ssg-logo.png` — supplied original logo, used without distortion
- `animated-header.mp4` — supplied hero video, muted/looping/inline, disabled for reduced-motion preference

The Socials page loads the provided SociableKIT Instagram widget (embed ID `25729880`). It needs Internet access and may be blocked by privacy extensions.

## Supabase setup

1. Create a Supabase project you own.
2. Copy `.env.example` to `apps/web/.env.local` and set the project URL and **public anon/publishable key only**. Never use a service-role key in the Next.js browser app or any `NEXT_PUBLIC_*` value.
3. From the repository root, apply migrations **in order** using Supabase CLI linked to your project or Supabase SQL Editor:
   - `backend/supabase/migrations/001_website_cms.sql`
   - `backend/supabase/migrations/002_admin_release_transactions.sql`
   - `backend/supabase/migrations/003_stream_status_verification.sql`
   - `backend/supabase/migrations/004_admin_announcements.sql`
   - `backend/supabase/migrations/005_admin_social_content.sql`
   - `backend/supabase/migrations/006_admin_website_links_and_settings.sql`
4. In Supabase Auth, create the administrator account privately. There is no public registration form.
5. In the trusted Supabase SQL Editor, add the new Auth user's UUID to `public.admin_users`, then confirm that account can sign in at `/admin/login`.
6. Keep RLS enabled. Verify anonymous reads show published records only and cannot write, and that an authenticated account not listed in `admin_users` cannot edit or upload.
7. Configure `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before production deployment.
8. Complete the security verification checklist in `docs/WEBSITE_CMS_SETUP.md` before relying on production CMS access.

The schema stores content, publication state, and admin membership in PostgreSQL. Client-side code receives only the public anon key; RLS, admin allow-list checks, validated RPCs, and Storage policies protect writes. Do not add real credentials to Git.

## Verification

```powershell
pnpm --filter @spaz/web run type-check
pnpm --filter @spaz/web run build
pnpm --filter @spaz/web run start
```

Supabase migration SQL has not been applied to a live project in this workspace. Database operations are ready for configured Supabase, but must be verified against the actual project before enabling production CMS writes.
