# TESTING GUIDE - Spaz SsG Platform

**Date**: 2026-11-15  
**Status**: Ready for Local Testing  
**Environment**: Development (localhost:3000)

---

## 🚀 QUICK START

### Prerequisites Installed ✅
- pnpm (package manager)
- Node.js 18+
- All dependencies installed
- Monorepo configured

### Start Development Server

```bash
# From repository root
cd C:\Users\spazs\spaz-ssg-mobile

# Start Next.js dev server on port 3000
pnpm --filter @spaz/web run dev
```

The server will start at: **http://localhost:3000**

---

## 📋 TESTING CHECKLIST

### Homepage (`/`)
- [ ] Hero section displays correctly (Electric Cyan "SPAZ" + Silver "SSG")
- [ ] Artist bio shows in hero
- [ ] "Listen on Spotify" button works (redirects to Spotify)
- [ ] "Join Discord" button works (redirects to Discord)
- [ ] Featured release section appears
- [ ] Recent releases grid shows (3 columns on desktop)
- [ ] Announcements section displays
- [ ] Dreamers Club CTA visible
- [ ] Footer with all links appears
- [ ] Responsive on mobile (1 column), tablet (2 columns), desktop (3+ columns)

### Navigation
- [ ] Fixed navbar at top (Electric Cyan background)
- [ ] "SPAZ SSG" logo/title in navbar
- [ ] Navigation links work: Home, Music, Social, Live, Links, Community
- [ ] Admin link appears in navbar
- [ ] Responsive mobile menu (on mobile devices)

### Music Page (`/music`)
- [ ] Page loads correctly
- [ ] Shows 4 music platform cards:
  - [ ] Spotify card with link
  - [ ] Apple Music card with link
  - [ ] UnitedMasters card with link
  - [ ] YouTube Music card with link
- [ ] All buttons styled correctly
- [ ] Responsive layout

### Social Page (`/social`)
- [ ] Page loads
- [ ] Basic content displays
- [ ] Responsive layout

### Dreamers Club Page (`/dreamers-club`)
- [ ] Community title and description appear
- [ ] "Join on Discord" button works
- [ ] Responsive design

### Admin Dashboard (`/admin`)
- [ ] Admin page loads
- [ ] Sidebar navigation visible
- [ ] Dashboard overview shows statistics:
  - [ ] Total Releases count
  - [ ] Featured Releases count
  - [ ] Last Updated status
  - [ ] Live status
- [ ] Quick action buttons visible:
  - [ ] Add Music Release
  - [ ] Post Announcement
  - [ ] Add Social Content
  - [ ] Schedule Livestream

### Admin Music Management (`/admin/music`)
- [ ] Page loads with sidebar
- [ ] Left panel shows form:
  - [ ] Title input field
  - [ ] Release Date date picker
  - [ ] Description textarea
  - [ ] Feature release checkbox
  - [ ] Create Release button
- [ ] Right panel shows recent releases list
- [ ] Form validation works
- [ ] Submit button responds (shows alert)
- [ ] Responsive layout on mobile

### Admin Livestreams (`/admin/livestreams`)
- [ ] Page loads
- [ ] Content displays

### Admin Announcements (`/admin/announcements`)
- [ ] Page loads
- [ ] Content displays

### Admin Social (`/admin/social`)
- [ ] Page loads
- [ ] Content displays

### Styling & Branding
- [ ] Colors match brand spec:
  - [ ] Electric Cyan (#00DDF5) for accents
  - [ ] Burnt Orange (#FF791D) for secondary accents
  - [ ] Metallic Silver (#D9DDE2) for text
  - [ ] Midnight Black (#08090C) for backgrounds
  - [ ] Charcoal (#151515) for secondary backgrounds
- [ ] Fonts render correctly
- [ ] Spacing is consistent
- [ ] Buttons have hover effects
- [ ] Cards have visual hierarchy
- [ ] No layout breaks or overflow issues

### Responsive Design
**Test on mobile (375px width)**:
- [ ] Single column layout
- [ ] Navigation collapses properly
- [ ] Text is readable
- [ ] Buttons are tap-friendly (44px+)
- [ ] No horizontal scroll

**Test on tablet (768px width)**:
- [ ] 2-column layouts where appropriate
- [ ] Navigation works
- [ ] All content visible

**Test on desktop (1200px+ width)**:
- [ ] Full multi-column layouts
- [ ] Navigation works
- [ ] Proper spacing

### Performance
- [ ] Page loads in under 3 seconds
- [ ] No console errors
- [ ] No console warnings (except deprecation notes)
- [ ] Images load correctly
- [ ] Smooth scrolling
- [ ] No layout shifts

### Links & Navigation
- [ ] All navigation links work
- [ ] External links open in new tab (Spotify, Discord, etc.)
- [ ] No broken links
- [ ] Admin link accessible

---

## 🎨 VISUAL VERIFICATION

### Brand Colors Present
```
✅ Electric Cyan (#00DDF5) - Primary buttons, accents
✅ Burnt Orange (#FF791D) - Hover states, secondary accents
✅ Metallic Silver (#D9DDE2) - Body text, secondary elements
✅ Midnight Black (#08090C) - Page background
✅ Charcoal (#151515) - Card backgrounds
```

### Component Styles
- [ ] Buttons have correct styling (primary, secondary variants)
- [ ] Cards have border and shadow effects
- [ ] Hover effects work on interactive elements
- [ ] Active states visible in navigation
- [ ] Form inputs styled correctly
- [ ] Badges and labels visible

---

## 🧪 FUNCTIONAL TESTING

### Form Interaction
- [ ] Music release form accepts input
- [ ] Form submission shows confirmation (alert)
- [ ] Form clears after submission
- [ ] Date picker works
- [ ] Checkbox toggles

### Navigation Flow
- [ ] Can navigate between all pages
- [ ] Back navigation works
- [ ] URLs update correctly in address bar

### External Links
- [ ] Spotify link opens Spotify
- [ ] Discord link opens Discord
- [ ] Instagram link opens Instagram
- [ ] All official links in footer work

---

## 🐛 BUG REPORTING

If you find issues, note:
1. **Page/URL** where issue occurs
2. **What you expected** to see
3. **What actually happened**
4. **Browser/Device** used
5. **Screenshot** if applicable
6. **Console errors** (F12 → Console tab)

---

## 📊 PERFORMANCE METRICS

Check performance using Chrome DevTools (F12):

- [ ] Lighthouse score
- [ ] First Contentful Paint (FCP)
- [ ] Largest Contentful Paint (LCP)
- [ ] Cumulative Layout Shift (CLS)
- [ ] Network requests (should be < 50)
- [ ] Bundle size reasonable

---

## 🔍 CONSOLE CHECK

Open Developer Tools (F12) and check:
- [ ] No red errors
- [ ] No critical warnings
- [ ] No undefined references
- [ ] All TypeScript types correct

---

## ✅ SIGN-OFF CHECKLIST

When testing is complete, verify:

- [ ] All pages load without errors
- [ ] All links work correctly
- [ ] Responsive design works on all screen sizes
- [ ] Brand colors and styling applied correctly
- [ ] Navigation functions properly
- [ ] Admin dashboard interface is usable
- [ ] No console errors
- [ ] Performance acceptable
- [ ] No layout shifts or overflow

---

## 📝 TESTING NOTES

Use this space to document findings:

```
Date: 2026-11-15
Tester: [Your Name]
Duration: [Time Spent]

PASSED:
- [Item]
- [Item]

ISSUES FOUND:
- [Issue 1] - [Severity: High/Medium/Low]
- [Issue 2] - [Severity: High/Medium/Low]

NOTES:
- [Any additional observations]
```

---

## 🚀 NEXT STEPS

After testing, provide feedback on:
1. **Visual Design** - Does it match your vision?
2. **Functionality** - Do forms and navigation work as expected?
3. **User Experience** - Is it intuitive and easy to use?
4. **Performance** - Is it fast and responsive?
5. **Brand Identity** - Does it feel like Spaz SsG?
6. **Any Changes** - What would you like adjusted before Week 3?

---

## 📞 SUPPORT

If you encounter issues:
1. Check console for error messages (F12)
2. Try hard refresh (Ctrl+Shift+R)
3. Check that Supabase credentials aren't required (they aren't for testing)
4. Let me know the error and I'll fix it

---

**Ready to Test?** Start the dev server with:
```bash
pnpm --filter @spaz/web run dev
```

Then open: **http://localhost:3000**

---

Generated: 2026-11-15  
Status: Ready for Testing ✅
