# PHASE 2: SCREEN DESIGN SPECIFICATIONS

**Status**: Screen Mockups & Navigation Flows  
**Date**: 2026-11-14  
**For**: React Native/Expo Mobile Application  
**Next Phase**: Phase 3 — Core Application Development

---

## SCREEN OVERVIEW

The Spaz SsG application consists of 6 primary tab-based screens, each with sub-screens for detailed content. This document specifies the layout, components, and interactions for each screen.

---

## 1. HOME SCREEN

**Purpose**: Central landing page showcasing featured music, recent content, livestream status, and community.

### Layout Structure

```
┌─────────────────────────┐
│  Status Bar             │ (Safe area top)
├─────────────────────────┤
│  Logo Hero Section      │ (280px height)
│  [Spaz SsG Logo]        │
│  "East Coast Hip-Hop"   │
├─────────────────────────┤
│  LIVE Badge (if active) │ (Conditional)
│  [🔴 LIVE NOW on Twitch]│
│  [Join Stream Button]   │
├─────────────────────────┤
│  Featured Release       │ (Content card)
│  [Album Art] 4:3        │
│  Release Title          │
│  "Listen on Spotify"    │
├─────────────────────────┤
│  Recent Releases        │ (Carousel)
│  [Scroll horizontal]    │
│  3 items visible        │
├─────────────────────────┤
│  Latest Social          │ (Feed items)
│  [Instagram post]       │
│  [TikTok video]         │
│  [YouTube video]        │
├─────────────────────────┤
│  Announcements          │ (If any)
│  [Announcement banner]  │
├─────────────────────────┤
│  Join Dreamers Club     │ (CTA banner)
│  [Discord invite]       │
│  "Join the Community"   │
├─────────────────────────┤
│  Bottom Nav             │ (48px fixed)
│  [Home] [Music] [Social]│
│  [LIVE] [Spaz] [Club]   │
└─────────────────────────┘
```

### Component Details

**Hero Section**:
- Height: 280px
- Background: Gradient (primary to secondary)
- Logo: 200px width, centered
- Subtitle: "East Coast Hip-Hop Artist", white, centered
- Margin-bottom: 24px

**LIVE Badge** (Conditional):
- Shows only when artist is streaming
- Badge: "🔴 LIVE NOW" with platform
- Button: "Join Stream" (primary, full width)
- Padding: 16px
- Border-radius: 12px
- Margin-bottom: 16px

**Featured Release Card**:
- Image: 4:3 aspect ratio, full width - 32px gutter
- Border-radius: 12px, image 12px top corners
- Title: 18px, weight 600
- Artist: 14px, weight 400, secondary color
- Button: "Listen on Spotify" (primary)
- Padding: 12px (card padding)
- Margin-bottom: 24px

**Recent Releases Carousel**:
- Title: "Recent Releases" (18px, weight 600, margin 16px sides)
- Card width: 160px
- Card height: 200px
- Gap: 12px
- Horizontal scroll, snap enabled
- Shows 1.5 cards visible
- Padding: 0 16px
- Margin-bottom: 24px

**Latest Social Feed**:
- Title: "Latest from Social" (18px, weight 600)
- Feed items: Full width
- Item height: Dynamic (content + media)
- Platform badge: Top-left
- Media: Full width
- Caption: Truncated to 2 lines
- Platform link: Visible
- Margin-bottom: 8px between items
- Padding: 16px sides

**Announcements Banner** (If exists):
- Background: Secondary color
- Text color: White
- Icon: Left side, 24px
- Text: 14px, weight 500
- Close button: Right side, X icon
- Padding: 12px 16px
- Border-radius: 8px
- Margin-bottom: 16px

**Join Dreamers Club CTA**:
- Background: Dark overlay with semi-transparent image or solid secondary
- Title: "Join The Dreamers Club", white, 20px, weight 700
- Subtitle: "Connect with the community", white, 14px
- Button: "Join Discord" (primary)
- Min-height: 160px
- Padding: 20px
- Border-radius: 12px
- Margin: 24px 16px
- Margin-bottom: 56px (above bottom nav)

### Interactions

- **Tap featured release**: Navigate to music detail screen
- **Swipe carousel**: Horizontal scroll
- **Tap social item**: Open platform in external link
- **Tap LIVE badge**: Scroll to livestream section or navigate to LIVE tab
- **Tap Join Discord**: Open Discord invite link
- **Pull to refresh**: Update all content

---

## 2. MUSIC SCREEN

**Purpose**: Connect fans to music across streaming platforms and display releases.

### Layout Structure

```
┌─────────────────────────┐
│  Status Bar             │
├─────────────────────────┤
│  Tab/Header             │
│  "Music"                │
│  [Streaming Platforms]  │
├─────────────────────────┤
│  DSP Cards              │
│  [Spotify Card]         │
│  [Apple Music Card]     │
│  [UnitedMasters Card]   │
│  [More DSPs]            │
├─────────────────────────┤
│  Releases Section       │
│  "All Releases"         │
├─────────────────────────┤
│  Release List           │
│  [Album art] Title      │
│  [Album art] Title      │
│  [Album art] Title      │
│  [Scroll to load more]  │
├─────────────────────────┤
│  Bottom Nav             │
│  [6 tabs]               │
└─────────────────────────┘
```

### Component Details

**Screen Header**:
- Title: "Music" (32px, weight 700, Space Grotesk)
- Padding: 16px
- Margin-top: 16px

**DSP Cards** (Grid):
- Layout: 2 columns on mobile
- Card width: (100% - 24px gutter) / 2 - 4px gap
- Card height: Auto
- Icon: 48x48px, platform logo
- Title: 14px, weight 600
- Subtitle: "Open" button (secondary)
- Padding: 12px
- Border: 1px border
- Border-radius: 8px
- Gap: 8px
- Margin: 0 16px 24px

**Releases Section**:
- Title: "All Releases" (18px, weight 600)
- Padding: 0 16px
- Margin-bottom: 12px

**Release List Item**:
- Image: 64x64px, border-radius 8px, left side
- Title: 16px, weight 600, right of image
- Artist: 14px, weight 400, secondary, right of image
- Release Date: 12px, tertiary, right of image
- Padding: 12px
- Border-bottom: 1px divider (except last)
- Min-height: 88px
- Touch target: Full item
- Tap: Navigate to release detail

**Release Detail Screen**:
- Image: Full width, 16:9 aspect ratio
- Title: 24px, weight 700
- Artist: 16px, weight 400, secondary
- Release date: 14px, tertiary
- Description: 14px, weight 400
- Track listing:
  - Track number: 12px, tertiary
  - Track name: 14px, weight 500
  - Duration: 12px, tertiary, right-aligned
  - Padding: 12px 16px
  - Tap: Open track on DSP
- DSP links:
  - Button grid: 2 columns
  - Buttons: Secondary variant
  - "Listen on [Platform]"
- Margin-bottom: 56px (above nav)

---

## 3. SOCIAL SCREEN

**Purpose**: Unified feed of social media content from all platforms.

### Layout Structure

```
┌─────────────────────────┐
│  Status Bar             │
├─────────────────────────┤
│  Screen Header          │
│  "Social"               │
├─────────────────────────┤
│  Platform Filter Tabs   │
│  [All] [Instagram]      │
│  [TikTok] [YouTube]     │
│  [Twitch]               │
├─────────────────────────┤
│  Social Feed            │
│  [Instagram post]       │
│  [TikTok video]         │
│  [YouTube video]        │
│  [Twitch clip]          │
│  [Load more...]         │
├─────────────────────────┤
│  Bottom Nav             │
│  [6 tabs]               │
└─────────────────────────┘
```

### Component Details

**Screen Header**:
- Title: "Social" (32px, weight 700, Space Grotesk)
- Padding: 16px
- Margin-top: 16px

**Platform Filter Tabs**:
- Horizontal scroll
- Tab labels: All, Instagram, TikTok, YouTube, Twitch
- Font: 14px, weight 500
- Active: Primary color, 2px bottom border
- Inactive: Tertiary text color
- Padding: 12px 16px
- Scroll snap: On each tab
- Background: White/surface
- Sticky: Yes (stays at top during scroll)

**Social Feed Item**:
- Layout: Vertical stack
- Platform badge: Top-left corner
  - Icon: 16x16px
  - Label: 10px, weight 600
  - Background: Semi-transparent dark
  - Padding: 2px 8px
  - Border-radius: 4px
- Media container:
  - Full width - 32px gutter
  - Aspect ratio: Maintained (image or video)
  - Border-radius: 8px
  - Max height: 400px
  - Tap: Open in external app
- Caption:
  - Max 2 lines
  - Text-overflow: ellipsis
  - Font: 14px, weight 400
  - Padding: 12px 16px
- Metadata row:
  - Platform link: 12px, primary color
  - Timestamp: 12px, tertiary
  - Padding: 0 16px 12px
- Margin-bottom: 12px
- Background: Surface
- Border-radius: 8px

**Empty State** (No content):
- Icon: 64x64px, tertiary color
- Title: "No content yet", 18px, weight 600
- Message: "Check back soon!", 14px, secondary
- Button: "Follow on [Platform]" (primary)
- Vertical center, 40px sides padding

---

## 4. LIVE SCREEN

**Purpose**: Real-time livestream status and scheduling information.

### Layout Structure

```
┌─────────────────────────┐
│  Status Bar             │
├─────────────────────────┤
│  Screen Header          │
│  "LIVE"                 │
├─────────────────────────┤
│  Stream Status Section  │
│  [LIVE Badge if active] │
│  OR [Offline state]     │
├─────────────────────────┤
│  Stream Schedule        │
│  "Upcoming Streams"     │
│  [Schedule items]       │
├─────────────────────────┤
│  Previous Streams       │
│  "VODs & Clips"         │
│  [VOD items]            │
│  [Clip items]           │
├─────────────────────────┤
│  Bottom Nav             │
│  [6 tabs]               │
└─────────────────────────┘
```

### Component Details

**Screen Header**:
- Title: "LIVE" (32px, weight 700, Space Grotesk)
- Padding: 16px
- Margin-top: 16px

**Stream Status Section** (When LIVE):
- Badge: "🔴 LIVE NOW", red background
- Title: Stream title (20px, weight 600)
- Platform icon: 24x24px, right side
- Viewer count: "X watching", 14px, secondary
- Description: Stream topic/category (14px)
- Button: "Join Stream" (primary, full width)
- Padding: 20px
- Border-radius: 12px
- Background: Gradient (error-based)
- Margin: 16px

**Stream Status Section** (When Offline):
- Icon: 64x64px, camera off icon, tertiary
- Title: "Offline", 20px, weight 600
- Subtitle: "Next stream: [date/time]", 14px, secondary
- Button: "Notify me when live" (primary)
- Next stream card:
  - Date: 12px, tertiary eyebrow
  - Time: 16px, weight 600
  - Title: 14px, weight 400
  - "Add to Calendar" button: Tertiary
  - Border-left: 4px primary
  - Padding: 12px
- Vertical center, 40px sides

**Stream Schedule Section**:
- Title: "Upcoming Streams" (18px, weight 600)
- Padding: 0 16px
- Margin-bottom: 12px

**Schedule Item**:
- Date: 12px eyebrow, tertiary
- Time: 16px, weight 600
- Title: 14px, weight 400
- Platform: Icon, 14px label
- "Add to Calendar" button: Tertiary
- Layout: Time on left (60px), info right, button far right
- Padding: 12px
- Border-left: 4px primary
- Border-bottom: 1px divider
- Min-height: 60px
- Tap: Add to calendar

**Previous Streams Section**:
- Title: "VODs & Clips" (18px, weight 600)
- Padding: 0 16px
- Margin-bottom: 12px

**VOD/Clip Item**:
- Thumbnail: 120x90px (16:9), left side
- Title: 14px, weight 600, right
- Duration: 12px, tertiary, right
- Platform: Icon, right
- "Watch" button: Secondary, small
- Padding: 12px
- Border-bottom: 1px divider
- Tap: Open video on platform

---

## 5. EVERYTHING SPAZ SCREEN

**Purpose**: Central directory of all official Spaz SsG links and resources.

### Layout Structure

```
┌─────────────────────────┐
│  Status Bar             │
├─────────────────────────┤
│  Screen Header          │
│  "Everything Spaz"      │
├─────────────────────────┤
│  Music Category         │
│  [Spotify Card]         │
│  [Apple Music Card]     │
│  [UnitedMasters Card]   │
│  [YouTube Music Card]   │
│  [More...]              │
├─────────────────────────┤
│  Social Category        │
│  [Instagram Card]       │
│  [TikTok Card]          │
│  [YouTube Card]         │
│  [Twitch Card]          │
│  [Facebook Card]        │
├─────────────────────────┤
│  Streaming              │
│  [Platform Cards]       │
├─────────────────────────┤
│  Community              │
│  [Discord Card]         │
├─────────────────────────┤
│  Services               │
│  [Music Submissions]    │
│  [Production Services]  │
│  [Contact]              │
├─────────────────────────┤
│  Bottom Nav             │
│  [6 tabs]               │
└─────────────────────────┘
```

### Component Details

**Screen Header**:
- Title: "Everything Spaz" (32px, weight 700, Space Grotesk)
- Padding: 16px
- Margin-top: 16px
- Subtitle: Optional tagline

**Category Header**:
- Title: "Music" (14px, weight 600, uppercase)
- Letter-spacing: 1px
- Color: Tertiary
- Padding-top: 24px (first), 32px (others)
- Padding-bottom: 12px
- Border-top: 1px divider (except first)

**Link Card**:
- Layout: Icon left, info center, button right
- Icon: 48x48px platform logo, border-radius 8px
- Title: 14px, weight 600, left side
- Description: 12px, weight 400, secondary, left side
- Button: "Open" (tertiary, small)
- Padding: 12px 16px
- Border: 1px border
- Border-radius: 8px
- Margin-bottom: 8px
- Tap: Open link

**Margin between categories**: 16px

**Bottom margin**: 56px (above nav)

---

## 6. DREAMERS CLUB SCREEN

**Purpose**: Community hub connecting to Discord and providing community information.

### Layout Structure

```
┌─────────────────────────┐
│  Status Bar             │
├─────────────────────────┤
│  Screen Header          │
│  "Dreamers Club"        │
├─────────────────────────┤
│  Hero Banner            │
│  "Join The Dreamers"    │
│  [Join Discord Button]  │
├─────────────────────────┤
│  Community Info         │
│  Community description  │
├─────────────────────────┤
│  Highlights Section     │
│  [Info Card 1]          │
│  [Info Card 2]          │
│  [Info Card 3]          │
├─────────────────────────┤
│  Guidelines Section     │
│  "Community Guidelines" │
│  Bullet points          │
├─────────────────────────┤
│  Events/Activities      │
│  "What's Happening"     │
│  [Event items]          │
├─────────────────────────┤
│  Bottom Nav             │
│  [6 tabs]               │
└─────────────────────────┘
```

### Component Details

**Screen Header**:
- Title: "Dreamers Club" (32px, weight 700, Space Grotesk)
- Tagline: "Calling All Dreamers" (14px, weight 400, secondary)
- Padding: 16px
- Margin-top: 16px

**Hero Banner**:
- Background: Image or gradient
- Title: "Join The Dreamers Club", white, 24px, weight 700
- Subtitle: "Connect, share, grow together", white, 14px
- Button: "Join Discord" (primary, full width)
- Min-height: 240px
- Padding: 20px
- Border-radius: 12px
- Overlay opacity: 40%
- Margin: 16px

**Community Description**:
- Text: "Welcome to The Dreamers Club...", 14px, weight 400
- Padding: 16px
- Background: Surface
- Border-radius: 8px
- Margin: 16px
- Margin-bottom: 24px

**Highlights Section**:
- 3 info cards in vertical stack
- Each card:
  - Icon: 32x32px, top
  - Title: 14px, weight 600
  - Description: 12px, weight 400, secondary
  - Text alignment: Center
  - Padding: 16px
  - Border-radius: 8px
  - Border: 1px divider
- Margin-bottom: 8px between cards
- Padding: 16px sides
- Margin-bottom: 24px

**Guidelines Section**:
- Title: "Community Guidelines" (18px, weight 600)
- List items: Bullet points
  - Bullet: "•", 14px
  - Text: 14px, weight 400
  - Padding: 8px 0
  - Padding-left: 24px
- Card background: Surface
- Padding: 16px
- Border-radius: 8px
- Margin: 16px
- Margin-bottom: 24px

**Events/Activities Section**:
- Title: "What's Happening" (18px, weight 600)
- Padding: 0 16px
- Margin-bottom: 12px

**Event Item**:
- Icon: 24x24px, left
- Title: 14px, weight 600, left
- Date/time: 12px, secondary, right
- Description: 12px, weight 400, line below
- Padding: 12px
- Border-left: 4px primary
- Border-bottom: 1px divider
- Min-height: 60px
- Tap: Show event details

**Bottom margin**: 56px (above nav)

---

## NAVIGATION BAR

### Bottom Tab Navigation

**Position**: Fixed bottom of screen  
**Height**: 56px  
**Background**: Surface color  
**Border-top**: 1px divider  
**Safe area**: Includes bottom safe area inset  

**Tab Layout**:
- 6 tabs, equal width
- Each tab: Icon (24px) + Label (10px)
- Gap between icon and label: 4px
- Vertical alignment: Centered

**Tab Items**:
1. **Home** - House icon
2. **Music** - Music note icon
3. **Social** - Share/network icon
4. **LIVE** - Video camera icon
5. **Everything Spaz** - Grid/menu icon
6. **Dreamers Club** - People/community icon

**Tab States**:
- **Inactive**: Icon gray, label tertiary color
- **Active**: Icon primary, label primary color
- **Transition**: 200ms ease-in-out

**Touch Target**: Each tab 56px x 56px (48px minimum)

---

## MODAL SCREENS

### Modals appear on top of screens for:

1. **Notification Preferences**
   - Title: "Notification Settings"
   - Toggles: New music, Videos, Social, LIVE, Announcements
   - Save button: Primary
   - Cancel: Tertiary

2. **Share Content**
   - Title: "Share"
   - Platform buttons: Copy Link, Instagram, TikTok, etc.
   - Close: X button

3. **Error/Alert**
   - Icon: Error or alert
   - Title: Error message
   - Message: Details
   - Button: "OK" (primary)

---

## RESPONSIVE CONSIDERATIONS

### Tested Screen Sizes
- iPhone SE: 375px
- iPhone 12/13: 390px
- iPhone 14 Pro Max: 430px
- Android small: 360px
- Android large: 412px

### Adjustments by Size
- 360px-375px: Reduce card padding by 2px
- 390px-430px: Standard spacing
- Safe area insets: Always respected

---

## ACCESSIBILITY DETAILS

### All Screens Include
- Descriptive heading hierarchy (H1, H2, H3)
- Alt text on all images/icons
- ARIA labels on icon-only buttons
- Focus visible on all interactive elements
- Tab order logical and documented

### Color Contrast
- All text: 4.5:1 minimum (AA)
- Interactive elements: Distinct visual states
- No color-only information

### Touch Targets
- All buttons: 44px minimum (44-56px preferred)
- Spacing: 8px between targets
- No overlapping touch areas

---

## ANIMATIONS & TRANSITIONS

### Page Transitions
- Fade in: 200ms
- Slide in (from right): 250ms ease-in-out
- Respects prefers-reduced-motion

### Component Interactions
- Button tap: 100ms scale feedback
- Input focus: 150ms color transition
- Loading: Pulse/shimmer animation
- Error: Subtle shake (100ms)

---

## NEXT STEPS (PHASE 3)

1. **Create Figma mockups** (optional, but recommended)
2. **Implement React Native screens** using design system
3. **Build component library** from specifications
4. **Test responsive design** on actual devices
5. **Verify accessibility** with screen readers
6. **Implement navigation** between screens

---

**Screen Specifications Version**: 1.0  
**Last Updated**: 2026-11-14  
**Status**: Ready for Phase 3 Development  
**Designer Notes**: All screens follow design system tokens. Implement with token system for consistency.
