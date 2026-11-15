# Spaz SsG Web Application

Official website for Spaz SsG featuring music, livestreams, social content, and The Dreamers Club community.

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open browser
open http://localhost:3000
```

## Project Structure

```
app/
├── page.tsx                 # Homepage
├── admin/                   # Admin dashboard
│   ├── dashboard/page.tsx   # Admin overview
│   ├── music/page.tsx       # Music management
│   ├── social/page.tsx      # Social content management
│   ├── livestreams/page.tsx # Livestream scheduling
│   ├── announcements/page.tsx # Announcements
│   └── layout.tsx           # Admin sidebar layout
├── music/page.tsx           # Music page
├── social/page.tsx          # Social page
├── dreamers-club/page.tsx    # Community page
├── layout.tsx               # Root layout
└── globals.css              # Global styles
```

## Pages

- **/** - Homepage with featured content
- **/music** - Music platform directory
- **/social** - Social media hub
- **/dreamers-club** - Community information
- **/admin** - Admin dashboard (content management)

## Admin Dashboard Features

- **Dashboard**: Overview of all content
- **Music Management**: Create, edit, delete music releases
- **Social Management**: Manage social media content
- **Livestreams**: Schedule and manage livestreams
- **Announcements**: Post announcements to website and mobile

## Shared Packages

This project uses shared code from the monorepo:

- `@spaz/types` - TypeScript interfaces
- `@spaz/hooks` - React data fetching hooks
- `@spaz/utils` - Utility functions
- `@spaz/services` - API service classes
- `@spaz/config` - Design tokens and configuration

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **State Management**: React Hooks

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## Development

```bash
# Run development server
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Deployment

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```
