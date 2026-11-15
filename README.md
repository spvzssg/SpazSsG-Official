# README

**Spaz SsG Official Mobile Application**

A production-grade iOS and Android mobile application connecting music, content, livestreams, social platforms, and community for independent recording artist Spaz SsG.

---

## 🎤 Project Overview

This is the official digital home for **Spaz SsG**, designed to:

- 🎵 **Connect fans to music** across all major streaming platforms
- 📱 **Centralize content** from social media, YouTube, Twitch, and TikTok
- 🔴 **Highlight livestreams** across multiple platforms
- 👥 **Build community** through The Dreamers Club
- 📲 **Engage fans** with notifications and announcements
- 📊 **Enable management** through secure administrative dashboard

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli eas-cli`
- Git
- Supabase account (free tier works)

### Installation

```bash
# Clone repository
git clone https://github.com/[your-org]/spaz-ssg-mobile.git
cd spaz-ssg-mobile

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm run dev

# Or use Expo Go
expo start
```

### Environment Setup

See `docs/API_CREDENTIALS_SETUP.md` for detailed instructions on:
- Creating Supabase project
- Obtaining API credentials
- Configuring environment variables

---

## 📁 Project Structure

```
spaz-ssg-mobile/
├── mobile/                           # React Native/Expo app
│   ├── app/                          # Expo Router pages
│   ├── components/                   # Reusable UI components
│   ├── hooks/                        # Custom React hooks
│   ├── services/                     # API & external services
│   ├── types/                        # TypeScript types
│   ├── styles/                       # Theme & styling
│   ├── utils/                        # Helper functions
│   ├── assets/                       # Images, fonts, branding
│   └── app.json                      # Expo configuration
│
├── backend/                          # Supabase configuration
│   ├── supabase/migrations/          # Database SQL migrations
│   ├── supabase/functions/           # Edge Functions
│   └── config.toml                   # Supabase config
│
├── docs/                             # Documentation
│   ├── ARCHITECTURE.md               # Technical architecture
│   ├── DATABASE_SCHEMA.md            # Database design
│   ├── API_CREDENTIALS_SETUP.md      # Credential guide
│   ├── API_INTEGRATION_STATUS.md     # Integration tracker
│   ├── DEPLOYMENT_GUIDE.md           # Build & deployment
│   └── [other docs]
│
├── CLAUDE.md                         # Claude development guide
├── SPAZ_SSG_LOGO_ASSET.txt          # Logo documentation
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
└── package.json                      # Root dependencies

```

---

## 📚 Documentation

### Getting Started

1. **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** — Technical architecture, database design, and development roadmap
2. **[API_CREDENTIALS_SETUP.md](docs/API_CREDENTIALS_SETUP.md)** — Step-by-step credential setup for all integrations
3. **[CLAUDE.md](CLAUDE.md)** — Development guidelines and brand asset information

### Development

4. **[DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md)** — Complete database schema with migrations
5. **[API_INTEGRATION_STATUS.md](docs/API_INTEGRATION_STATUS.md)** — Integration readiness and status tracking
6. **[ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)** — How to use the admin dashboard

### Deployment

7. **[DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** — iOS and Android build and deployment
8. **[BACKUP_AND_RESTORE.md](docs/BACKUP_AND_RESTORE.md)** — Database backup and recovery procedures

---

## 🎨 Brand Identity

The application uses the official Spaz SsG visual identity:

### Brand Colors
- **Electric Cyan**: #00DDF5 (Primary accent)
- **Burnt Orange**: #FF791D (Secondary accent)
- **Metallic Silver**: #D9DDE2 (Typography)
- **Midnight Black**: #08090C (Primary background)
- **Charcoal**: #151515 (Secondary background)
- **White**: #FFFFFF (High contrast)

### Official Logo
See [SPAZ_SSG_LOGO_ASSET.txt](SPAZ_SSG_LOGO_ASSET.txt) for complete logo documentation and asset management.

---

## 🔐 Security & Privacy

- **No password storage**: Uses Supabase Auth
- **Row Level Security**: Fine-grained database access control
- **API credentials**: Never exposed in client code
- **Data privacy**: Minimal data collection, transparent storage
- **Compliance**: WCAG 2.1 AA accessibility standards

See [docs/SECURITY.md](docs/SECURITY.md) for complete security documentation.

---

## 📱 Application Sections

### 1. **Home**
Featured content, recent releases, latest social media, livestream status, and announcements.

### 2. **Music**
Connect to Spotify, Apple Music, UnitedMasters, and other DSPs. Browse releases, albums, singles, and EPs.

### 3. **Social**
Unified feed of Instagram posts, TikTok videos, YouTube content, and Twitch clips with automatic synchronization.

### 4. **LIVE**
Real-time livestream status across Twitch, TikTok LIVE, and YouTube LIVE. VOD access and stream schedules.

### 5. **Everything Spaz**
Central directory of all official links organized by category (music, social, streaming, community, services).

### 6. **Dreamers Club**
Community hub connecting to The Dreamers Club Discord server with community guidelines and events.

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Run on specific platform
npm run web        # Web (testing)
npm run ios        # iOS simulator
npm run android    # Android emulator

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Type check
npm run type-check

# Format code
npm run format
```

---

## 📋 Phases Overview

### ✅ Phase 1: Architecture & Planning (Complete)
- Technical architecture designed
- Database schema created
- API integration planned
- Documentation framework established

### 🟡 Phase 2: UI/UX Design (Next)
- Design system development
- Component library creation
- Screen mockups
- Brand implementation

### 🟡 Phase 3: Core Development
- React Native project setup
- Navigation implementation
- Component development
- Backend integration

### 🟡 Phase 4: API Integrations
- Spotify, YouTube, Twitch integration
- Social media synchronization
- Notifications system
- Content management

### 🟡 Phase 5: Advanced Features
- User accounts & preferences
- Premium membership infrastructure
- Admin dashboard

### 🟡 Phase 6: Testing & Optimization
- Security audit
- Performance optimization
- iOS & Android testing
- Accessibility verification

### 🟡 Phase 7: Deployment
- App Store submission
- Google Play submission
- Release documentation

---

## 🎯 Current Status

**Phase**: 1 — Architecture & Planning  
**Status**: ✅ Complete

**Deliverables**:
- ✅ Technical architecture document
- ✅ Database schema with RLS policies
- ✅ Project structure and organization
- ✅ API integration framework
- ✅ Credential management system
- ✅ Development documentation
- ✅ Brand asset documentation

**Next Steps**:
1. Review Phase 1 architecture
2. Approve design direction
3. Proceed to Phase 2 (UI/UX Design)

---

## 🔗 Official Links

### Music
- **Spotify**: https://open.spotify.com/artist/00IHJtvQJqIXnKhhvS3u92
- **Apple Music**: https://music.apple.com/us/artist/spaz-ssg/1482065224
- **UnitedMasters**: https://unitedmasters.com/a/spaz-ssg

### Social
- **Instagram**: https://www.instagram.com/spvzssg
- **TikTok**: https://www.tiktok.com/@spvzssg
- **YouTube**: https://youtube.com/@spazssglive
- **Twitch**: https://www.twitch.tv/spazssg

### Community
- **Discord**: https://discord.gg/pk3r75EgD
- **Music Submissions**: https://www.nero.fan/spazssglive

---

## 📞 Support & Development

### For Development Questions
Refer to [CLAUDE.md](CLAUDE.md) and relevant documentation files.

### For Content Updates
Use the admin dashboard (implemented in Phase 6).

### For Technical Issues
Check relevant documentation:
- Architecture questions: See [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- API issues: See [API_INTEGRATION_STATUS.md](docs/API_INTEGRATION_STATUS.md)
- Credentials: See [API_CREDENTIALS_SETUP.md](docs/API_CREDENTIALS_SETUP.md)

---

## 📄 License

This project is the official Spaz SsG mobile application. All code, branding, and assets are the property of Spaz SsG.

---

## 🙌 Contributors

**Development Lead**: Kiro (AI Assistant)  
**Artist & Project Owner**: Spaz SsG  
**Community**: The Dreamers Club

---

## 📊 Key Technologies

**Frontend**:
- React Native 0.73+
- Expo 50+
- TypeScript 5+
- Expo Router for navigation

**Backend**:
- Supabase (PostgreSQL)
- Edge Functions (Node.js)
- Supabase Auth

**APIs**:
- Spotify Web API
- YouTube Data API v3
- Twitch Helix API
- Instagram Graph API
- TikTok API
- Discord API

**Build & Deployment**:
- Expo Application Services (EAS)
- GitHub for version control

---

## 🎬 Getting Started Next

1. **Review Architecture**: Read [ARCHITECTURE.md](docs/ARCHITECTURE.md)
2. **Set Up Supabase**: Follow [API_CREDENTIALS_SETUP.md](docs/API_CREDENTIALS_SETUP.md)
3. **Understand Brand**: Check [CLAUDE.md](CLAUDE.md) and [SPAZ_SSG_LOGO_ASSET.txt](SPAZ_SSG_LOGO_ASSET.txt)
4. **Begin Phase 2**: Approve design direction and start UI/UX design system

---

**Last Updated**: 2026-11-14  
**Status**: Phase 1 Complete — Ready for Phase 2 Review

---

## Quick Links

| Document | Purpose |
|----------|---------|
| [CLAUDE.md](CLAUDE.md) | Development guidelines & brand info |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Technical blueprint |
| [API_CREDENTIALS_SETUP.md](docs/API_CREDENTIALS_SETUP.md) | Credential guide |
| [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) | Database design |
| [API_INTEGRATION_STATUS.md](docs/API_INTEGRATION_STATUS.md) | Integration tracker |
| [SPAZ_SSG_LOGO_ASSET.txt](SPAZ_SSG_LOGO_ASSET.txt) | Logo documentation |

**Welcome to the official Spaz SsG mobile application. Let's build something amazing.**
