# Website testing guide

## Start the website

From the repository root in PowerShell:

```powershell
pnpm install
pnpm --filter @spaz/web run dev
```

Open <http://localhost:3000>. Keep the terminal open while testing; stop with `Ctrl+C`.

## Routes to verify

- `/` — Homepage, responsive layout, official logo and supplied animated header video
- `/music` — Official DSP links
- `/social` — Social platform links and the SociableKIT Instagram widget
- `/live` — Stream destinations; offline/unverified status must not imply LIVE
- `/dreamers-club` — Community page and Discord link
- `/everything-spaz` — Central link directory
- `/about` — Artist introduction
- `/admin` — Redirects to admin preview
- `/admin/dashboard`, `/admin/music`, `/admin/social`, `/admin/livestreams`, `/admin/announcements` — Preview-only management screens
- `/api/health` — Returns `{"status":"ok"}`

## Media checks

Confirm the local assets load at `/spaz-ssg-logo.png` and `/animated-header.mp4`. The video is muted, looping, inline, and suppressed for reduced-motion preference; the official logo remains as its poster/fallback. The Instagram embed is third-party hosted and needs Internet access; if it is blocked, use the official Instagram link on the Socials page.

## Important backend status

The admin interface is **not yet connected to Supabase**. It has no authentication, authorization, database writes, uploads, or publishing enabled. The admin routes are previews only. Do not enter credentials or treat any preview content as connected or saved data.

## Build checks

```powershell
pnpm --filter @spaz/web run type-check
pnpm --filter @spaz/web run build
```

For a production-server smoke test:

```powershell
pnpm --filter @spaz/web run start
```

Then visit the public routes and check the terminal/browser console for errors.
