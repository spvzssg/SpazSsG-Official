# Deploying Spaz SsG Website to InfinityFree

Because InfinityFree hosts static HTML/CSS/JS and PHP websites (not Node.js servers), the website is configured to generate a **pure static export** in `apps/web/out`.

## 📦 What is in the Static Export

When you build the project, Next.js compiles all pages (`/`, `/music`, `/social`, `/live`, `/dreamers-club`, `/everything-spaz`, `/about`) into static HTML files along with the official logo (`spaz-ssg-logo.png`), animated header video (`animated-header.mp4`), and CSS/JS assets.

## 🚀 How to Export and Upload

### Step 1: Build the Static Site Locally
From the repository root in PowerShell:

```powershell
pnpm install
pnpm --filter @spaz/web run build
```

This creates the static export folder at:
`apps/web/out/`

### Step 2: Upload to InfinityFree
1. Log in to your InfinityFree control panel (Client Area) and open the File Manager for `spazssgofficial.xo.je`.
2. Navigate to your domain's document root folder (typically `htdocs` or `/home/vol13_8/infinityfree.com/if0_43448977/htdocs`).
3. Upload **all contents** from the local `apps/web/out/` directory directly into `htdocs`.
   - *Tip*: Make sure `index.html` is in the root of `htdocs`.
4. Ensure `spaz-ssg-logo.png`, `animated-header.mp4`, and the `_next/` folder are correctly uploaded so images, videos, and styling load properly.

### Step 3: Verify Your Live Site
Visit `http://spazssgofficial.xo.je` (or your configured custom domain) to verify the responsive homepage, embedded animated video, official logo, and SociableKIT Instagram widget.

---

## 💡 Important Notes for Static Hosting

- **Public Pages**: All public discovery pages (`/`, `/music`, `/social`, `/live`, `/dreamers-club`, `/everything-spaz`, `/about`) work perfectly as static files.
- **Instagram Feed**: The SociableKIT widget on the Socials page loads client-side via JavaScript (`widgets.sociablekit.com`) and functions normally on static hosting.
- **Admin Dashboard**: Database-backed admin CMS features require a Node.js server (such as Vercel or Supabase) and are not included in the static export. Use Supabase Studio or host the admin app separately if full CMS editing is needed.
- **GitHub Sync**: All static export configuration and build scripts are fully committed and pushed to your GitHub repository (`feature/website-media-social`).
