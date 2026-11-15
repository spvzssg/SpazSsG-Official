# Claude.md — Spaz SsG Mobile Application Development Guide

## Project Overview

**Project**: Official Spaz SsG Mobile Application  
**Developer**: Kiro (AI Assistant)  
**Status**: Phase 1 — Architecture and Planning  
**Start Date**: 2026-11-13  
**Target Completion**: Multi-phase development project

## Official Brand Assets

### Logo

**File Location**: `D:\Downloads\Spaz_AI\SpazSsGLogo.png`

**Logo Description**:
- Bold metallic silver/white text reading "SPAZ" / "SSG"
- Stylized crown above the text with electric cyan and orange energy effects
- Neon glow outlines in Electric Cyan (#00DDF5) and Burnt Orange (#FF791D)
- Atmospheric teal/cyan smoke effects on the left
- Orange/red fire-like energy effects on the right
- Dynamic, cinematic lighting with 3D depth
- Landscape orientation, high contrast against black background
- Transparent background ready for overlay use

**Logo Usage Requirements**:
1. **Preserve Original**: Never stretch, distort, recolor, or recreate the logo
2. **Source of Truth**: Use the original PNG file as the definitive brand asset
3. **Application Placement**: Include in:
   - App loading screens
   - Home screen header
   - Navigation elements
   - Promotional sections
   - About/profile areas
4. **Asset Management**: Store in `assets/branding/logo/`
5. **Optimization**: Create optimized versions for different screen sizes without altering proportions
6. **Transparency**: Preserve transparency; can be overlaid on brand color backgrounds

### Brand Colors

| Color Name | Hex Value | Primary Use |
|---|---|---|
| Electric Cyan | #00DDF5 | Accent glow, energy effects, interactive elements |
| Burnt Orange | #FF791D | Secondary accent, energy effects, highlights |
| Metallic Silver | #D9DDE2 | Typography, logo, premium elements |
| Midnight Black | #08090C | Primary background, dark theme base |
| Charcoal | #151515 | Secondary background, cards, depth |
| White | #FFFFFF | Text contrast, bright highlights |

### Visual Design Direction

- Dark cinematic atmosphere
- Sophisticated and modern aesthetic
- Electric cyan and orange lighting accents
- Metallic silver typography
- Clean, uncluttered layouts
- Subtle gradients and smooth transitions
- Minimal visual effects (quality over quantity)
- Professional music-industry presentation

## Official Artist Links

### Music Platforms

- **Spotify**: https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92?si=qOhXAWBXTzydQ8kupDamSA
- **Apple Music**: https://music.apple.com/us/artist/spaz-ssg/1482065224
- **UnitedMasters**: https://unitedmasters.com/a/spaz-ssg

### Social Media

- **Instagram**: https://www.instagram.com/spvzssg
- **TikTok**: https://www.tiktok.com/@spvzssg
- **YouTube (Spaz SsG LIVE)**: https://youtube.com/@spazssglive?si=Q2W5bWtYsfmAIA9p
- **Twitch**: https://www.twitch.tv/spazssg
- **Facebook**: To be provided

### Community & Services

- **Discord (The Dreamers Club)**: https://discord.gg/pk3r75EgD
- **Music Review Submissions (Nero.fan)**: https://www.nero.fan/spazssglive

## Development Standards

### Code Organization

- Follow TypeScript strict mode
- Use functional components with hooks
- Implement reusable component architecture
- Separate concerns: components, hooks, services, types
- Use centralized configuration for editable content
- Database-driven content management

### Content Management

Content that should NOT be hardcoded:
- Artist biography and descriptions
- Music release information
- Social media links and content
- Livestream schedules
- Announcements and notifications
- Homepage featured content
- Navigation structure

All editable content should be managed through:
1. Administrative dashboard
2. Database (Supabase)
3. Environment configuration

### Key Requirements for Future Developers

1. **Modularity**: Add/remove sections without touching core navigation
2. **Content Editability**: No code changes for content updates
3. **API Integration Framework**: Support new platforms without major refactoring
4. **Database Design**: Extensible schema for future features
5. **Documentation**: Keep architecture and API integration docs current
6. **Environment Configuration**: Use `.env` for all environment-specific values

## API Integrations (To Be Configured)

The following integrations require credentials to be added during setup:

- Spotify Web API
- Apple Music API (if available)
- YouTube Data API v3
- Twitch API
- Instagram Graph API
- TikTok API
- Discord API
- Supabase (Backend)
- Stripe (Payment infrastructure, when approved)
- Expo Push Notifications

See `API_CREDENTIALS_SETUP.md` for detailed credential requirements.

## Project Structure Overview

```
spaz-ssg-mobile/
├── mobile/                 # React Native/Expo application
├── backend/                # Supabase configuration & Edge Functions
├── assets/                 # Brand assets, images, media
├── docs/                   # Project documentation
├── .env.example            # Environment variable template
└── CHANGELOG.md            # Version history
```

## Development Workflow

### Phases

1. **Phase 1** (Current): Architecture and planning
2. **Phase 2**: UI/UX design system
3. **Phase 3**: Core application development
4. **Phase 4**: API integrations
5. **Phase 5**: Accounts and premium infrastructure
6. **Phase 6**: Administrative dashboard
7. **Phase 7**: Testing and security
8. **Phase 8**: Deployment and release

### Approval Workflow

Automatic (no approval needed):
- Routine technical decisions consistent with requirements
- Code refactoring
- Bug fixes
- Documentation updates

Approval Required:
- Removing requested functionality
- Changing application direction
- Introducing paid services
- Activating payments
- Publishing to app stores
- Major architectural changes
- Brand identity modifications

### Progress Reporting

Each phase includes:
- Completed tasks checklist
- Remaining tasks
- Current blockers
- Required user input
- Next steps

## Important Notes

- **No Mock Data Misrepresentation**: Mock data clearly labeled; never presented as real connected data
- **Credential Management**: Never commit real API keys or credentials
- **Ownership**: All code, databases, and assets remain owned by the artist
- **Portability**: Application designed for easy handoff to other developers
- **No Stop Without Reason**: Continue building features even when credentials are pending; use placeholders

## Contact & Support

When additional information is needed:
1. Clearly identify what is needed
2. Explain why it's required
3. Suggest workarounds or placeholders
4. Continue development on unblocked features

---

**Last Updated**: 2026-11-13  
**Next Phase**: Phase 1 Complete → Present Architecture Plan
