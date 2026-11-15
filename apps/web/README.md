# Spaz SsG Official Website

Responsive artist website for Spaz SsG, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Local development

From the repository root:

```powershell
pnpm install
pnpm --filter @spaz/web run dev
```

Open <http://localhost:3000>. Stop the server with `Ctrl+C`.

The public website and its local media assets can be previewed without Supabase credentials. The admin area is intentionally preview-only until the Supabase project, authentication, database policies, and protected server-side operations are configured.

## Website routes

- `/` — Artist homepage and official artist links
- `/music` — Streaming platform directory
- `/social` — Social platform directory and Instagram embed
- `/live` — Stream destination links; never claims a stream is active without verification
- `/dreamers-club` — Community introduction and Discord link
- `/everything-spaz` — Central official link directory
- `/about` — Artist introduction
- `/admin` — Redirects to the preview dashboard
- `/admin/dashboard`, `/admin/music`, `/admin/social`, `/admin/livestreams`, `/admin/announcements` — Admin UI preview; no sign-in or edits are enabled
- `/api/health` — Basic service health response

## Local media

Files in `public/` are served by the website itself:

- `spaz-ssg-logo.png` — supplied official logo; preserve its proportions and artwork
- `animated-header.mp4` — supplied animated hero video; muted, looping, inline playback, with the logo as its poster/fallback

The supplied asset directory currently contains these files only. The Socials page also loads the requested SociableKIT Instagram widget from their host using embed ID `25729880`; this third-party widget requires an Internet connection and may be blocked by browser privacy settings.

## Supabase setup (not yet connected)

Copy `.env.example` to `.env.local` when ready and configure the public Supabase URL and anon key. Never put a Supabase service-role key or third-party API secret in `NEXT_PUBLIC_*` variables. Before enabling admin editing, implement Supabase Auth, server-side session verification, an explicit admin-role check, and RLS policies for every write operation.

## Verification

```powershell
pnpm --filter @spaz/web run type-check
pnpm --filter @spaz/web run build
pnpm --filter @spaz/web run start
```

The generated production build statically renders the public routes. Verify a local production server with `Invoke-WebRequest http://localhost:3000` or your preferred HTTP client.
