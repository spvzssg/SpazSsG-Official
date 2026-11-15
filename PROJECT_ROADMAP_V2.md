# SPAZ SSG: PROJECT ROADMAP V2
## Website-Primary Strategy with Integrated Mobile

**Version**: 2.0 (Website-first approach)  
**Date**: 2026-11-15  
**Status**: Ready for Phase 1 execution

---

## EXECUTIVE SUMMARY

The Spaz SsG project is transitioning from mobile-first to **website-primary strategy** while maintaining the complete mobile application as a secondary-but-equal platform.

**Primary Launch**: Website + Admin Dashboard (central digital home)  
**Secondary Launch**: Complete mobile app (ongoing)  
**Backend**: Shared Supabase infrastructure (both platforms)

---

## REVISED ROADMAP

### PHASE 1: WEBSITE FOUNDATION + ADMIN DASHBOARD (Weeks 1-4)
**Status**: STARTING NOW  
**Effort**: 80 hours (combined)

#### Week 1: Infrastructure & Setup
- Monorepo structure (pnpm workspaces)
- Migrate types to `packages/types/`
- Create `packages/hooks/` (shared data fetching)
- Create `packages/utils/` (shared utilities)
- Setup `apps/web` Next.js project
- TypeScript configuration
- Design tokens system

**Deliverable**: Shared infrastructure ready, web app skeleton

#### Week 2: Admin Dashboard MVP + Home Page
- Admin authentication (Supabase Auth)
- Music management (CRUD) in admin
- Artist settings editor in admin
- Homepage for website (hero + featured)
- Begin Tailwind styling system

**Deliverable**: Functional admin dashboard + live homepage

#### Week 3: Admin Expansion + Website Pages
- Social content management in admin
- Livestream scheduling in admin
- Announcement management in admin
- Music page (website)
- Social page (website)

**Deliverable**: Full admin dashboard + 3 website pages

#### Week 4: Remaining Pages + Launch Prep
- LIVE page (website)
- Everything Spaz page (website)
- Dreamers Club page (website)
- About page (website)
- SEO optimization
- Performance tuning

**Deliverable**: Complete website + fully functional admin dashboard

**LAUNCH**: Website + Admin Dashboard ready for testing/deployment

---

### PHASE 2: MOBILE COMPLETION (Weeks 5-8, overlapping with Phase 1 Weeks 3-4)
**Status**: QUEUED (starts Week 5)  
**Effort**: 52 hours

#### Week 5-6: Primary Mobile Screens
- Music tab (follows established Home pattern)
- Social tab (content feed)
- LIVE tab (stream status + schedule)

#### Week 7: Final Mobile Screens
- Everything Spaz tab (link directory)
- Dreamers Club tab (community)

#### Week 8: Mobile Polish
- Performance optimization
- Edge case handling
- Comprehensive testing
- Push notification setup

**LAUNCH**: Mobile app complete and ready for app store submission

---

### PHASE 3: API INTEGRATIONS (Weeks 7-9, parallel)
**Status**: QUEUED (starts Week 7)  
**Effort**: 20 hours (shared across both platforms)

Both website and mobile automatically receive integrations:

- Spotify API
- YouTube Data API
- Twitch API
- Push Notifications (mobile)
- Analytics system

**Services Layer** (`packages/services/`) ensures both apps use identical logic

---

### PHASE 4: TESTING & DEPLOYMENT (Weeks 9-10)
**Status**: QUEUED

**Website**:
- Security audit
- Performance testing
- SEO verification
- Cross-browser testing
- Deploy to production

**Mobile**:
- iOS/Android testing
- App Store submission
- Google Play submission

---

### PHASE 5: POST-LAUNCH (Ongoing)
**Status**: PLANNING

- Premium features
- Advanced admin features
- Community tools
- Enhanced integrations

---

## TIMELINE VISUALIZATION

```
WEEK 1   WEEK 2   WEEK 3   WEEK 4   WEEK 5   WEEK 6   WEEK 7   WEEK 8   WEEK 9   WEEK 10

PHASE 1: WEBSITE FOUNDATION + ADMIN
[Setup  ][Admin+Home][Admin Exp][Website Complete]
                                    ↓
                        WEBSITE + ADMIN LAUNCH

                                        PHASE 2: MOBILE
                                        [Music/Social/Live][ES/DC][Polish]
                                                                     ↓
                                                          MOBILE APP LAUNCH

                                   PHASE 3: API INTEGRATIONS (parallel)
                                   [Spotify, YouTube, Twitch - both platforms]
```

---

## SUCCESS CRITERIA

### By End of Phase 1 (Week 4)
- ✅ Website live at production domain
- ✅ Admin dashboard fully functional
- ✅ All 6 website pages complete
- ✅ Database syncing validated
- ✅ SEO optimized

### By End of Phase 2 (Week 8)
- ✅ Mobile app: all 6 screens complete
- ✅ Feature parity with website
- ✅ Ready for app store submission

### By End of Phase 3 (Week 9)
- ✅ API integrations working on both platforms
- ✅ Content automatically syncing where applicable

### By End of Phase 4 (Week 10)
- ✅ Website in production
- ✅ Mobile apps approved/available
- ✅ System fully tested

---

## ARCHITECTURE DECISIONS

### Database: NO CHANGES
The existing Supabase schema works perfectly for both platforms. Zero modifications needed.

### Code Sharing: Monorepo
```
packages/
  ├── types/       (100% shared TypeScript)
  ├── hooks/       (100% shared data fetching)
  ├── utils/       (100% shared business logic)
  ├── services/    (100% shared API clients)
  └── config/      (100% shared constants & tokens)

apps/
  ├── mobile/      (React Native/Expo - existing)
  ├── web/         (Next.js - new)
  └── admin/       (Next.js - new)
```

### Admin Dashboard: Priority One
Admin dashboard is built **in parallel with website pages** (not after). This ensures content management works from week 2 onward.

### Styling: Platform-Specific
- Mobile: React Native StyleSheet
- Web: Tailwind CSS + CSS Modules
- Admin: Tailwind CSS

**BUT**: Colors, typography, spacing defined in `packages/config/` for consistency.

---

## RESOURCE ALLOCATION

**Recommended**: 1 full-time developer (Kiro)

**Timeline**:
- Weeks 1-4: Website + Admin (80 hours)
- Weeks 5-8: Mobile screens (52 hours)
- Weeks 7-9: API integrations (20 hours, overlapping)
- Weeks 9-10: Testing & deployment

**Alternative (if 2 developers available)**:
- Developer A: Website + Admin (Phase 1)
- Developer B: Mobile screens (Phase 2)
- Both on integrations (Phase 3)

---

## PHASE 1 DETAILED EXECUTION PLAN

### Week 1: Infrastructure (16 hours)

**Task 1.1**: Create monorepo structure
```
spaz-ssg-platform/
├── packages/
│   ├── types/
│   ├── hooks/
│   ├── utils/
│   ├── services/
│   └── config/
├── apps/
│   ├── mobile/ (existing)
│   ├── web/ (new)
│   └── admin/ (new)
└── pnpm-workspace.yaml
```

**Task 1.2**: Migrate shared code
- Extract `mobile/types/index.ts` → `packages/types/`
- Create `packages/hooks/useHome.ts` (from mobile)
- Create `packages/utils/` with formatting, validation
- Create `packages/config/theme.ts` (brand colors)

**Task 1.3**: Setup Next.js project
- Initialize `apps/web` with Next.js 14
- Configure TypeScript strict mode
- Setup Tailwind CSS
- Configure environment variables

**Task 1.4**: Configure monorepo
- Setup pnpm workspaces
- TypeScript project references
- ESLint/Prettier shared config
- Build scripts (turbo)

**Deliverable**: Fully functional monorepo with shared infrastructure ready

---

### Week 2: Admin Dashboard MVP + Website Home (32 hours)

**Admin Dashboard (16 hours)**:
- [ ] Supabase Auth setup (admin-only login)
- [ ] Protected admin routes
- [ ] Music management UI (CRUD form)
- [ ] Artist settings editor
- [ ] Dashboard overview page
- [ ] Real-time data updates

**Website Homepage (16 hours)**:
- [ ] Hero section with logo
- [ ] Featured release display
- [ ] Recent music listings
- [ ] Announcements section
- [ ] Dreamers Club CTA
- [ ] Navigation header
- [ ] Footer with links
- [ ] Responsive design (mobile, tablet, desktop)

**Deliverable**: Admin can create/edit music releases; website homepage displays them live

---

### Week 3: Admin Expansion + Website Content Pages (32 hours)

**Admin Expansion (16 hours)**:
- [ ] Social content management
- [ ] Livestream scheduling & management
- [ ] Announcement composer
- [ ] Integration configuration UI
- [ ] Media library management

**Website Pages (16 hours)**:
- [ ] Music page (DSP directory, featured releases)
- [ ] Social page (unified content feed)
- [ ] Continued design system implementation

**Deliverable**: Admin dashboard fully functional; 3 website pages live

---

### Week 4: Remaining Pages + Optimization (24 hours)

**Website Pages (16 hours)**:
- [ ] LIVE page (stream status, schedule, VODs)
- [ ] Everything Spaz page (centralized link directory)
- [ ] Dreamers Club page (community info, Discord link)
- [ ] About page (artist bio, mission, story)

**Launch Preparation (8 hours)**:
- [ ] SEO optimization (meta tags, Open Graph, sitemaps)
- [ ] Performance tuning (image optimization, code splitting)
- [ ] Security review (RLS policies, auth flows)
- [ ] Cross-browser testing

**Deliverable**: Complete website + fully functional admin dashboard ready for production

---

## DEPENDENCIES & BLOCKERS

### No Blockers for Phase 1
- ✅ Supabase already configured
- ✅ Database schema ready
- ✅ Mobile foundation provides patterns
- ✅ No API credentials required (can use mock data)

### Optional (Accelerators)
- If Spotify/YouTube credentials available: Integrate earlier
- If brand imagery available: Enhance hero sections
- If Discord webhook available: Add community features

---

## LAUNCH CHECKLIST

### Phase 1 Launch (Website + Admin)
- [ ] All 6 website pages complete and styled
- [ ] Admin dashboard CRUD operations working
- [ ] Admin can publish content to website (live updates)
- [ ] Database synchronization validated
- [ ] SEO basics implemented
- [ ] Security review passed
- [ ] Performance benchmarks met
- [ ] Mobile-responsive design verified
- [ ] Cross-browser testing complete
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Monitoring/logging setup

### Phase 2 Launch (Mobile App)
- [ ] All 6 mobile screens complete
- [ ] Feature parity with website content
- [ ] Testing on iOS/Android devices
- [ ] App Store setup complete
- [ ] Google Play setup complete
- [ ] Build certificates generated
- [ ] Privacy policy & terms of service ready

---

## MIGRATION PATH

### For Developer Handoff
All code will be structured for easy handoff:
- Clear file organization
- TypeScript for type safety
- Comprehensive documentation
- Monorepo enforces patterns
- Shared services prevent duplication
- Architecture decision records (ADRs) documented

---

## KEY PRINCIPLES

1. **Database-First**: Supabase is single source of truth
2. **Shared Logic**: All business logic in `packages/`
3. **Platform-Specific UI**: React Native vs React DOM necessary duplication
4. **Admin First**: Content management operational from week 2
5. **No Mock Data**: Real Supabase immediately (with seed data)
6. **Progressive Enhancement**: APIs integrated incrementally

---

## NEXT IMMEDIATE STEPS

**Today (2026-11-15)**:
1. Approve this roadmap ✅
2. Start Phase 1 Week 1

**Week 1 Actions** (Mon 2026-11-18):
1. Create monorepo structure
2. Migrate types and hooks
3. Initialize Next.js project
4. Setup TypeScript configuration

---

**Status**: Ready to execute  
**Start Date**: Monday, 2026-11-18  
**Expected Phase 1 Completion**: Friday, 2026-12-13  
**Expected Full Completion**: Friday, 2026-12-20

---

**Document Owner**: Kiro (AI Assistant)  
**Last Updated**: 2026-11-15  
**Next Review**: After Week 1 completion
