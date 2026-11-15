# PHASE 2: UI/UX DESIGN SYSTEM

**Status**: Design System & Component Library  
**Date**: 2026-11-14  
**For**: React Native/Expo Mobile Application  
**Next Phase**: Phase 3 — Core Application Development

---

## DESIGN SYSTEM OVERVIEW

This design system establishes the complete visual and interactive foundation for the Spaz SsG mobile application. It connects the official brand identity to functional, accessible, and beautiful UI components.

---

## 1. COLOR SYSTEM

### Color Tokens

The application uses a carefully curated color palette based on the official Spaz SsG brand identity.

#### Light Theme (Default)

```
--color-primary: #00DDF5 (Electric Cyan)
  Primary interactive elements, focus states, energy accents
  RGB: rgb(0, 221, 245)
  Usage: Buttons, links, highlights, active states, glow effects

--color-secondary: #FF791D (Burnt Orange)
  Secondary interactions, warnings, heat effects, secondary accents
  RGB: rgb(255, 121, 29)
  Usage: Secondary buttons, badges, alerts, emphasis

--color-tertiary: #D9DDE2 (Metallic Silver)
  Premium typography, borders, dividers, high-contrast text
  RGB: rgb(217, 221, 226)
  Usage: Headings, important labels, premium elements, light text on dark

--color-background: #FFFFFF (White)
  Primary page background
  RGB: rgb(255, 255, 255)

--color-surface: #F5F5F5 (Off-white)
  Card backgrounds, input backgrounds, panels
  RGB: rgb(245, 245, 245)

--color-surface-secondary: #EFEFEF (Light gray)
  Secondary surface, hover states
  RGB: rgb(239, 239, 239)

--color-text: #1A1A1A (Near-black)
  Primary text, body copy
  RGB: rgb(26, 26, 26)

--color-text-secondary: #666666 (Medium gray)
  Secondary text, captions, metadata
  RGB: rgb(102, 102, 102)

--color-text-tertiary: #999999 (Light gray)
  Tertiary text, disabled text, very secondary info
  RGB: rgb(153, 153, 153)

--color-border: #E5E5E5 (Divider gray)
  Borders, dividers, separators
  RGB: rgb(229, 229, 229)

--color-error: #E53E3E (Red)
  Error states, destructive actions
  RGB: rgb(229, 62, 62)

--color-success: #38A169 (Green)
  Success states, confirmations
  RGB: rgb(56, 161, 105)

--color-warning: #DD6B20 (Amber)
  Warning states, cautions
  RGB: rgb(221, 107, 32)

--color-info: #3182CE (Blue)
  Informational content, notifications
  RGB: rgb(49, 130, 206)
```

#### Dark Theme

```
--color-primary: #00E5FF (Bright Cyan - adjusted for dark)
  Increased brightness for visibility on dark backgrounds
  RGB: rgb(0, 229, 255)

--color-secondary: #FFA840 (Bright Orange - adjusted for dark)
  Increased brightness and saturation
  RGB: rgb(255, 168, 64)

--color-tertiary: #E8EDF5 (Light silver)
  Adjusted for contrast on dark backgrounds
  RGB: rgb(232, 237, 245)

--color-background: #0F0F0F (Almost black)
  Primary dark background
  RGB: rgb(15, 15, 15)

--color-surface: #1A1A1A (Dark charcoal)
  Card backgrounds, panels
  RGB: rgb(26, 26, 26)

--color-surface-secondary: #242424 (Charcoal secondary)
  Secondary surface, hover states
  RGB: rgb(36, 36, 36)

--color-text: #F5F5F5 (Off-white)
  Primary text, body copy
  RGB: rgb(245, 245, 245)

--color-text-secondary: #B0B0B0 (Medium light gray)
  Secondary text, captions
  RGB: rgb(176, 176, 176)

--color-text-tertiary: #757575 (Light gray)
  Tertiary text, disabled text
  RGB: rgb(117, 117, 117)

--color-border: #333333 (Dark border)
  Borders, dividers
  RGB: rgb(51, 51, 51)

--color-error: #FC8181 (Light red)
  Error states on dark backgrounds
  RGB: rgb(252, 129, 129)

--color-success: #68D391 (Light green)
  Success states on dark backgrounds
  RGB: rgb(104, 211, 145)

--color-warning: #FED7AA (Light amber)
  Warning states on dark backgrounds
  RGB: rgb(254, 215, 170)

--color-info: #63B3ED (Light blue)
  Informational content on dark backgrounds
  RGB: rgb(99, 179, 237)
```

### Contrast Requirements

All color combinations must meet WCAG AA standards:
- Text on backgrounds: 4.5:1 minimum
- Large text on backgrounds: 3:1 minimum
- Interactive elements: Clear visual distinction
- Focus states: Minimum 3:1 contrast

### Color Usage by Component

**Buttons**:
- Primary button: `--color-primary` background, white text
- Secondary button: `--color-secondary` background, white text
- Tertiary button: `--color-border` background, `--color-text` text
- Disabled button: `--color-text-tertiary` text, `--color-surface-secondary` background

**Text**:
- Headings: `--color-text` (primary) or `--color-tertiary` (metallic premium feel)
- Body text: `--color-text`
- Secondary text: `--color-text-secondary`
- Captions: `--color-text-tertiary`

**Interactive Elements**:
- Links: `--color-primary`
- Focus outline: `--color-primary`, 2px
- Hover state: Lighten primary by 10%
- Active state: Lighten primary by 20%

**Status Indicators**:
- Error: `--color-error`
- Success: `--color-success`
- Warning: `--color-warning`
- Info: `--color-info`

**Surfaces**:
- Cards: `--color-surface`
- Modal backgrounds: `--color-background` with 90% opacity overlay
- Input fields: `--color-surface`
- Disabled inputs: `--color-surface-secondary`

---

## 2. TYPOGRAPHY SYSTEM

### Font Stack

**Display Typeface** (Headings, Hero Text):
- Font: Space Grotesk
- Import: `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap`
- Usage: Page titles, section headings, promotional text
- Weights: 500 (medium emphasis), 700 (high emphasis)
- Characteristics: Modern, geometric, high-energy

**Body Typeface** (Running Text, UI):
- Font: Inter
- Import: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap`
- Usage: Body text, labels, form fields, navigation
- Weights: 400 (regular), 500 (medium), 600 (semi-bold)
- Characteristics: Clear, highly legible, excellent on screens

**Monospace Typeface** (Code, Data):
- Font: IBM Plex Mono
- Import: `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap`
- Usage: Code snippets, monospaced data, technical content
- Weights: 400 (regular), 500 (medium)
- Characteristics: Professional, technical appearance

### Type Scale

A consistent modular type scale ensures visual hierarchy and harmony.

```
--type-xxs: 10px / 1.2 (Tiny labels, badges)
--type-xs: 12px / 1.4 (Captions, small text)
--type-sm: 14px / 1.5 (Secondary text, UI labels)
--type-base: 16px / 1.6 (Body text, default)
--type-lg: 18px / 1.6 (Larger body, card titles)
--type-xl: 20px / 1.5 (Section headings)
--type-2xl: 24px / 1.4 (Major headings)
--type-3xl: 32px / 1.3 (Page titles)
--type-4xl: 40px / 1.2 (Hero headings)
```

### Heading Styles

**H1 (Page Title)**:
- Font: Space Grotesk
- Size: 32px / 1.3
- Weight: 700
- Letter-spacing: -0.5px
- Margin-bottom: 24px
- Usage: Main page titles, hero sections

**H2 (Section Heading)**:
- Font: Space Grotesk
- Size: 24px / 1.4
- Weight: 700
- Letter-spacing: -0.25px
- Margin-bottom: 16px
- Usage: Section titles, content groupings

**H3 (Subsection Heading)**:
- Font: Space Grotesk
- Size: 20px / 1.5
- Weight: 600
- Letter-spacing: 0px
- Margin-bottom: 12px
- Usage: Subsection titles, card headings

**H4 (Minor Heading)**:
- Font: Inter
- Size: 16px / 1.5
- Weight: 600
- Letter-spacing: 0px
- Margin-bottom: 8px
- Usage: Small section titles, labels

### Body Text

**Paragraph**:
- Font: Inter
- Size: 16px / 1.6
- Weight: 400
- Max-width: 65 characters for optimal readability
- Margin-bottom: 16px
- Color: `--color-text`

**Emphasis**:
- Font: Inter
- Weight: 600
- Usage: Important points within body text
- Color: Same as context, increased weight for emphasis

**Code Block** (Within text):
- Font: IBM Plex Mono
- Size: 14px
- Background: `--color-surface-secondary`
- Padding: 2px 6px
- Border-radius: 4px
- Color: `--color-secondary`

### Labels & Captions

**Form Labels**:
- Font: Inter
- Size: 14px
- Weight: 500
- Letter-spacing: 0.5px (slight)
- Color: `--color-text`
- Margin-bottom: 4px
- Required indicator: `*` in `--color-error`

**Captions & Metadata**:
- Font: Inter
- Size: 12px
- Weight: 400
- Color: `--color-text-secondary`
- Letter-spacing: 0px

**Small Caps & Eyebrows**:
- Font: Inter
- Size: 12px
- Weight: 600
- Text-transform: uppercase
- Letter-spacing: 1px
- Color: `--color-text-tertiary`
- Usage: Category labels, section eyebrows

### Text Wrapping

- Headings: `text-wrap: balance` (ensures balanced line breaks)
- Body text: Normal word wrapping
- Very long words: `word-break: break-word` (in captions, labels)
- Monospace: No wrap, allow horizontal scroll in container

---

## 3. SPACING SYSTEM

A consistent spacing scale based on 4px increments ensures visual harmony.

```
--space-0: 0px
--space-1: 4px (Tiny)
--space-2: 8px (Small)
--space-3: 12px (Medium-small)
--space-4: 16px (Medium)
--space-5: 20px (Medium-large)
--space-6: 24px (Large)
--space-7: 32px (Extra large)
--space-8: 40px (2XL)
--space-9: 48px (3XL)
--space-10: 64px (4XL)
```

### Component Spacing

**Buttons**:
- Horizontal padding: `--space-4` (16px)
- Vertical padding: `--space-2` to `--space-3` (8-12px)
- Button-to-button gap: `--space-2` (8px)

**Cards**:
- Padding: `--space-4` (16px)
- Margin-bottom: `--space-4` (16px)
- Gap between card items: `--space-3` (12px)

**Forms**:
- Input padding: `--space-2` horizontal, `--space-2` vertical
- Label-to-input gap: `--space-2` (8px)
- Field-to-field gap: `--space-4` (16px)

**Navigation**:
- Tab padding: `--space-3` horizontal, `--space-2` vertical
- Tab-to-tab gap: `--space-1` (4px)
- Tab height: 48px (minimum touch target)

**Lists**:
- Item padding: `--space-3` (12px)
- Item gap: `--space-2` (8px)
- Nested item indent: `--space-4` (16px)

**Screens**:
- Top padding: `--space-4` (16px)
- Side padding: `max(16px, env(safe-area-inset-left/right))`
- Bottom padding: `--space-4` (16px)
- Section-to-section gap: `--space-6` (24px)

---

## 4. COMPONENT LIBRARY

### Button Component

#### Variants

**Primary Button**:
```
Background: --color-primary
Text color: White
Padding: 12px 24px
Font size: 16px, weight 600
Border radius: 8px
Box shadow: 0 2px 8px rgba(0, 221, 245, 0.2)
Hover: Lighten background 10%, increase shadow
Active: Lighten background 20%
Disabled: 50% opacity, cursor disabled
Focus: 2px solid --color-primary outline, 2px offset
Transition: all 200ms ease
Min width: 44px (touch target)
```

**Secondary Button**:
```
Background: --color-secondary
Text color: White
Otherwise same as Primary
Box shadow: 0 2px 8px rgba(255, 121, 29, 0.2)
```

**Tertiary Button** (Outline):
```
Background: Transparent
Text color: --color-primary
Border: 2px solid --color-primary
Padding: 10px 22px (adjusted for border)
Hover: Background --color-primary with 10% opacity
```

**Disabled Button**:
```
Background: --color-surface-secondary
Text color: --color-text-tertiary
Cursor: not-allowed
Opacity: 0.6
No box shadow
No hover state
```

### Input Component

**Text Input**:
```
Background: --color-surface
Border: 1px solid --color-border
Padding: 12px 16px
Font: Inter, 16px, weight 400
Border radius: 8px
Min height: 44px (touch target)
Transition: border-color 200ms ease

Focused state:
  Border color: --color-primary
  Box shadow: 0 0 0 3px rgba(0, 221, 245, 0.1)

Error state:
  Border color: --color-error
  Icon (error): --color-error
  Helper text: --color-error

Disabled state:
  Background: --color-surface-secondary
  Text color: --color-text-tertiary
  Cursor: not-allowed
```

**Textarea**:
```
Same as Text Input
Min height: 100px
Allow vertical resize only
Font-family: Inter
Line height: 1.6
```

**Checkbox**:
```
Size: 20x20px
Border: 2px solid --color-primary
Border radius: 4px
Checked:
  Background: --color-primary
  Checkmark: White
Focus:
  Outline: 2px solid --color-primary, 2px offset
```

**Radio Button**:
```
Size: 20x20px
Border: 2px solid --color-primary
Border radius: 50%
Checked:
  Inner circle: --color-primary, 8px diameter
  Outer circle: 2px border
Focus:
  Outline: 2px solid --color-primary, 2px offset
```

**Toggle/Switch**:
```
Size: 48px (width) x 28px (height)
Background: --color-border (off), --color-primary (on)
Border radius: 14px
Knob: 24px circle, white
Animation: slide 200ms ease
Focus:
  Outline: 2px solid --color-primary, 1px offset
```

### Card Component

**Standard Card**:
```
Background: --color-surface
Border: 1px solid --color-border
Border radius: 12px
Padding: 16px
Box shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
Hover (interactive):
  Border color: --color-primary
  Box shadow: 0 4px 12px rgba(0, 0, 0, 0.15)
  Transition: all 200ms ease
Margin-bottom: 16px
```

**Elevated Card**:
```
Background: --color-surface
Border: None
Border radius: 12px
Padding: 16px
Box shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
Hover:
  Box shadow: 0 8px 20px rgba(0, 0, 0, 0.15)
  Transform: translateY(-2px)
  Transition: all 200ms ease
```

**Featured Card** (For music releases, featured content):
```
Background: Linear gradient (--color-primary 0%, --color-secondary 100%)
Border: None
Border radius: 16px
Padding: 20px
Box shadow: 0 8px 24px rgba(0, 221, 245, 0.2)
Text color: White
Overlay: 15% dark overlay for text readability
Min height: 240px
```

### Badge Component

**Status Badge**:
```
Font size: 12px
Font weight: 600
Padding: 4px 12px
Border radius: 16px (pill)
Letter spacing: 0.5px
Text transform: Uppercase

Variants:
  Primary: --color-primary background, white text
  Secondary: --color-secondary background, white text
  Success: --color-success background, white text
  Warning: --color-warning background, --color-text
  Error: --color-error background, white text
  Neutral: --color-surface-secondary background, --color-text
```

### Navigation Tab Component

**Tab Bar** (Bottom Navigation):
```
Position: Fixed bottom
Height: 56px
Background: --color-surface
Border-top: 1px solid --color-border
Safe area inset bottom included
Display: Flex, justify-content space-around
Padding: 8px 0
```

**Tab Item**:
```
Width: Equal space (6 tabs = ~14% each)
Height: 48px
Display: Flex, flex-direction column, align-items center, justify-content center
Icon size: 24px
Label font: Inter, 10px, weight 500
Icon-to-label gap: 4px
Color: --color-text-secondary (inactive), --color-primary (active)
Transition: color 200ms ease
Tap target: Full tab area (48px minimum)
```

### Modal/Overlay Component

**Modal Background**:
```
Background: rgba(0, 0, 0, 0.4)
Position: Fixed, full screen
Backdrop filter: blur(4px) (optional, performance dependent)
Z-index: 100
```

**Modal Container**:
```
Background: --color-background
Border radius: 16px (top corners for bottom sheet)
Padding: 20px
Max width: 100% on phone, 500px on tablet
Min height: Auto (content-driven)
Position: Relative, centered
Box shadow: 0 -4px 24px rgba(0, 0, 0, 0.15)
Animation: slide-up 200ms ease-out
```

**Modal Header**:
```
Display: Flex, justify-content space-between
Margin-bottom: 16px
Font: Space Grotesk, 20px, weight 700
Close button: 32x32px, icon centered
```

**Modal Content**:
```
Max-height: 80vh
Overflow-y: auto
```

### Loading State Component

**Skeleton Loader**:
```
Background: Linear gradient(90deg, --color-surface 0%, --color-surface-secondary 50%, --color-surface 100%)
Background-size: 200% 100%
Animation: shimmer 1.5s infinite
Border radius: Match target component
Opacity: 0.7
```

**Spinner**:
```
Size: 32x32px
Border: 3px solid --color-border
Border-top-color: --color-primary
Border-radius: 50%
Animation: spin 1s linear infinite
```

### Empty State Component

```
Icon: 64x64px, --color-text-secondary
Title: 18px, weight 600, --color-text
Message: 14px, weight 400, --color-text-secondary
Action button: Primary button variant
Vertical alignment: Center screen
Padding: 40px sides
Text alignment: Center
```

### Error State Component

```
Icon: Error symbol, 48x48px, --color-error
Title: "Something went wrong", 18px, weight 600, --color-text
Message: Specific error text, 14px, --color-text-secondary
Action button: "Try again" or "Go back"
Styling: Same layout as empty state
```

---

## 5. RESPONSIVE DESIGN

### Breakpoints

```
Mobile: 320px - 767px (primary target)
Tablet: 768px - 1024px (landscape, future)
Desktop: 1025px+ (future web)
```

### Mobile-First Approach

- Design for 375px-411px screen width (common phone sizes)
- Test on: iPhone SE (375px), iPhone 12/13 (390px), iPhone 14 Pro Max (430px), Android (various)
- Minimum safe area consideration:
  - Top: Status bar + notch (variable, 24px - 47px)
  - Bottom: Home indicator + keyboard (variable, 34px - 51px)
  - Sides: System bars on certain devices (0px - 44px)

### Responsive Typography

```
--type-base: 16px (all sizes)
--type-2xl: 24px (heading, all sizes)
--type-3xl: 28px on mobile, 32px on tablet+
--type-4xl: 32px on mobile, 40px on tablet+
```

### Responsive Spacing

```
Screen padding:
  Mobile: 16px sides
  Tablet: 24px sides
  Desktop: 32px sides

Component spacing scales with content area:
  Mobile: Use full scale
  Tablet: Slightly increased spacing
  Desktop: Increased spacing for breathing room
```

### Responsive Images

```
Image size: 100% width of container
Aspect ratio: Explicit (use CSS aspect-ratio)
Load: Responsive sizes for different screens
Format: WebP where supported, JPEG fallback
Max width: 100% always

Hero images: 16:9 aspect ratio on mobile, wider on desktop
Card images: 4:3 or 1:1 aspect ratio
Profile images: 1:1 always
```

---

## 6. MICRO-INTERACTIONS & ANIMATIONS

### Principles

- Animations serve a purpose (feedback, direction, hierarchy)
- Duration: 150ms - 400ms range
- Easing: ease-in-out for natural motion
- Respect `prefers-reduced-motion`: No animations for users with motion sensitivity

### Standard Transitions

```
Fast (150ms): 
  - Button hover/active
  - Input focus
  - Icon state changes

Normal (200ms):
  - Tab changes
  - View transitions
  - Modal appear/disappear
  - Focus outlines

Slow (300ms):
  - Page transitions
  - Major state changes
  - Loading animations

Easing: cubic-bezier(0.4, 0, 0.2, 1) [ease-in-out]
```

### Button Interactions

**Tap Feedback**:
- On tap: Scale down 98%, highlight color shift
- Duration: 100ms
- Easing: ease-out

**Hover Feedback** (Desktop/Tablet):
- On hover: Lighten color 10%, increase shadow
- Duration: 200ms
- Easing: ease-in-out

### Loading Animations

**Spinner**:
- Rotation: 360° in 1s, infinite linear
- Color: --color-primary
- Size: 32px

**Skeleton**:
- Gradient animation: Left to right, 1.5s loop
- Opacity pulse: Optional, 0.7 - 1.0

### Page Transitions

**Fade In**:
- Opacity: 0 → 1
- Duration: 200ms
- Timing: ease-in-out

**Slide Up** (Modal):
- Transform: translateY(40px) → translateY(0)
- Opacity: 0 → 1
- Duration: 300ms
- Timing: ease-out

**Slide Left** (Screen Change):
- Transform: translateX(100%) → translateX(0)
- Duration: 250ms
- Timing: ease-in-out

### Focus States

All interactive elements must have clear focus states for keyboard navigation:
- Outline: 2px solid --color-primary
- Outline-offset: 2px
- Transition: outline 150ms ease
- Visible without hover (for accessibility)

---

## 7. ACCESSIBLE DESIGN

### WCAG 2.1 Level AA Compliance

#### Color & Contrast
- Text: 4.5:1 minimum (normal text)
- Large text (18px+ or 14px+ bold): 3:1 minimum
- Interactive components: Clear visual distinction
- Color not sole information carrier (use icons, patterns)

#### Typography
- Minimum font size: 14px (preferably 16px)
- Line height: 1.5 minimum for body text
- Letter spacing: Avoid extreme values
- Max line width: 80 characters for readability

#### Touch Targets
- Minimum: 44px x 44px
- Preferred: 48px x 48px
- Spacing: Minimum 8px between targets
- All interactive elements must meet this requirement

#### Keyboard Navigation
- Focus visible: 2px outline, clear color
- Tab order: Logical, left-to-right, top-to-bottom
- Escape key: Close modals, cancel actions
- Enter/Space: Activate buttons
- Arrow keys: Navigate lists, tabs

#### Screen Reader Support
- All images: Descriptive alt text (or `aria-label` for icons)
- Links: Clear link text (not "click here")
- Form fields: Associated labels (`for` attribute)
- Form validation: Error messages associated with fields
- ARIA roles: Use semantic HTML first, ARIA to supplement
- Live regions: `aria-live="polite"` for updates

#### Reduced Motion
Respect user preference:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

#### Text Scaling
- Support system font size scaling (100% - 200%)
- Use relative units (em, rem) not fixed pixels
- Test with large text: Settings → Accessibility → Text Size

#### Color Blindness
- Don't rely on color alone
- Use icons + color for status
- High contrast borders for input states
- Test designs with color blindness simulator

---

## 8. COMPONENT SPECIFICATIONS

### Home Screen Components

**Hero Section**:
- Background: Gradient (--color-primary to --color-secondary)
- Logo: Spaz SsG logo, centered, 200px width
- Text overlay: Artist introduction, white text
- Min height: 280px
- Padding: 40px 16px
- Touch target: Tap to navigate to artist profile

**Featured Release Card**:
- Image: Album artwork, 4:3 aspect ratio
- Title: 18px, weight 600
- Artist: 14px, weight 400, --color-text-secondary
- Button: "Listen on Spotify" (primary)
- Layout: Image on top, text below
- Padding: 12px
- Border radius: 12px

**Recent Content Carousel**:
- Horizontal scroll
- Card width: 160px
- Card height: 200px
- Spacing: 12px between cards
- Showing 1.5 cards visible
- Snap on scroll

**Announcement Banner**:
- Background: --color-secondary
- Text color: White
- Padding: 16px
- Border radius: 8px
- Icon: 24px, centered left
- Close button: Optional X, right aligned
- Margin-bottom: 16px

### Music Screen Components

**DSP Card**:
- Icon: Platform logo, 48x48px
- Title: 16px, weight 600
- Button: "Open in Spotify" (secondary)
- Layout: Icon left, title + button stacked right
- Padding: 16px
- Border: 1px --color-border
- Border radius: 8px

**Release List Item**:
- Image: Album art, 64x64px, border-radius 8px
- Title: 16px, weight 600
- Artist: 14px, weight 400, --color-text-secondary
- Release date: 12px, weight 400, --color-text-tertiary
- Layout: Image left, text stacked right
- Padding: 12px
- Border-bottom: 1px --color-border
- Touch target: Full item, 60px min height

### Social Screen Components

**Social Feed Item**:
- Platform badge: Top-left corner
- Media: Full width, max-height 400px, aspect-ratio maintained
- Title/Caption: 14px, weight 400
- Platform link: 12px link, --color-primary
- Timestamp: 12px, --color-text-tertiary
- Margin-bottom: 12px
- Padding: 12px
- Background: --color-surface

**Platform Filter Tabs**:
- Tab names: Instagram, TikTok, YouTube, Twitch
- Active indicator: 2px bottom border, --color-primary
- Inactive: --color-text-secondary
- Padding: 12px 16px
- Font: 14px, weight 500

### LIVE Screen Components

**Stream Status Card**:
- Large: "🔴 LIVE NOW" badge, --color-error
- Title: Stream title, 20px, weight 600
- Platform icon: 24x24px
- Viewer count: 14px, --color-text-secondary
- "Join" button: Primary, full width
- Padding: 20px
- Border radius: 12px
- Background: Gradient (error accent)

**Offline State**:
- Icon: 64x64px, --color-text-tertiary
- Title: "Offline"
- Next stream: Time or "Check back soon"
- Button: "Subscribe for notifications"
- Layout: Centered, vertical stack
- Min height: 300px to fill screen

**Stream Schedule Card**:
- Date: 12px eyebrow, --color-text-tertiary
- Time: 16px, weight 600
- Title: 14px, weight 400
- "Add to Calendar" button: Tertiary
- Layout: Time left, info right
- Padding: 12px
- Border-left: 4px --color-primary

### Everything Spaz Screen Components

**Link Card**:
- Platform icon: 48x48px
- Title: 16px, weight 600
- Description: 12px, weight 400, --color-text-secondary
- Button: "Open" (tertiary)
- Layout: Icon left, info stacked right, button right
- Padding: 16px
- Border: 1px --color-border
- Border radius: 8px

**Category Header**:
- Title: 14px, weight 600, uppercase
- Letter spacing: 1px
- Color: --color-text-tertiary
- Padding-top: 24px
- Padding-bottom: 12px
- Border-top: 1px --color-border (except first)

### Dreamers Club Screen Components

**Discord Banner**:
- Background: Image or solid --color-secondary
- Title: "Join The Dreamers Club"
- Description: "Connect with the community"
- Button: "Join Discord" (primary)
- Min height: 240px
- Overlay opacity: 40%
- Text color: White
- Padding: 20px

**Community Info Card**:
- Icon: 32x32px
- Title: 16px, weight 600
- Description: 14px, weight 400, --color-text-secondary
- Layout: Icon top, text stacked
- Text alignment: Center
- Padding: 16px

---

## 9. STATE MANAGEMENT & FLOWS

### Application States

**Loading State**:
- Skeleton loaders for content sections
- Spinner for page transitions
- Duration: Show skeleton min 300ms (even if fast load)

**Empty State**:
- Icon: Contextual (music note, inbox, etc.)
- Title: "No music yet" or similar
- Message: Explain what's needed
- Action: "Add music" or equivalent

**Error State**:
- Icon: Error symbol
- Title: "Something went wrong"
- Message: Specific error text
- Action: "Try again" button
- Dismiss: Optional close button

**Offline State**:
- Banner: Top of screen
- Icon: WiFi off
- Message: "No internet connection"
- Background: --color-warning
- Persistent until reconnect

### Form States

**Default**:
- Empty inputs
- No error messages
- Focus state available

**Filled**:
- Input has value
- Clear button available (optional)
- Normal styling

**Focused**:
- 2px primary outline
- Shadow highlight
- Placeholder fades

**Error**:
- Red border (--color-error)
- Error message below input
- Error icon right-aligned
- Cannot submit form

**Success**:
- Checkmark or green outline
- Success message (optional)
- Form can be submitted

**Disabled**:
- Grayed out appearance
- No interaction
- Cursor: not-allowed

---

## 10. DESIGN TOKENS FOR DEVELOPERS

All design tokens should be defined as CSS custom properties and imported into React Native/Expo components.

### Export Format

```typescript
// tokens.ts
export const tokens = {
  colors: {
    primary: '#00DDF5',
    secondary: '#FF791D',
    // ... rest of colors
  },
  typography: {
    display: 'Space Grotesk',
    body: 'Inter',
    mono: 'IBM Plex Mono',
    // ... rest of typography
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    // ... rest of spacing
  },
  // ... other tokens
};
```

### Usage in React Native

```typescript
import { tokens } from './tokens';
import { View, Text } from 'react-native';

export function Button() {
  return (
    <View style={{
      backgroundColor: tokens.colors.primary,
      padding: tokens.spacing.md,
      borderRadius: tokens.border.radius.md,
    }}>
      <Text style={{
        color: '#FFF',
        fontFamily: tokens.typography.body,
        fontSize: 16,
        fontWeight: '600',
      }}>
        Press Me
      </Text>
    </View>
  );
}
```

---

## 11. IMPLEMENTATION CHECKLIST FOR PHASE 3

Before code begins, verify:

- [ ] All color tokens defined and tested
- [ ] Typography loaded from Google Fonts
- [ ] Spacing scale implemented consistently
- [ ] Component library created with all variants
- [ ] Responsive breakpoints tested
- [ ] Accessibility features implemented
- [ ] Motion preferences respected
- [ ] Both light and dark themes working
- [ ] Component documentation completed
- [ ] Design QA passed (colors, spacing, fonts accurate)

---

## 12. COMPONENT LIBRARY FILE STRUCTURE

For Phase 3 implementation:

```
mobile/components/
├── Button/
│   ├── Button.tsx
│   ├── Button.styles.ts
│   └── Button.test.tsx
├── Input/
│   ├── Input.tsx
│   ├── Input.styles.ts
│   └── Input.test.tsx
├── Card/
│   ├── Card.tsx
│   ├── Card.styles.ts
│   └── Card.test.tsx
├── Badge/
├── Modal/
├── Tab/
├── Loader/
└── shared/
    ├── tokens.ts (all design tokens)
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    └── animations.ts
```

---

## 13. DESIGN REVIEW CHECKLIST

Before any screen is considered "done":

**Visual Design**:
- [ ] Colors match brand specification
- [ ] Typography hierarchy is clear
- [ ] Spacing is consistent and balanced
- [ ] Component states are obvious (hover, focus, disabled)
- [ ] No horizontal scroll on any screen width
- [ ] Images are properly sized and aspect-ratio correct

**Usability**:
- [ ] All buttons are 44px+ touch targets
- [ ] Text is readable (16px minimum, good contrast)
- [ ] Touch areas don't overlap (8px+ spacing)
- [ ] Navigation is clear and logical
- [ ] Loading and error states present

**Accessibility**:
- [ ] Color contrast meets WCAG AA (4.5:1 text)
- [ ] Keyboard navigation works
- [ ] Screen reader friendly (alt text, labels)
- [ ] Focus visible on all interactive elements
- [ ] Respects prefers-reduced-motion

**Responsiveness**:
- [ ] Works at 375px width
- [ ] Works at 430px width
- [ ] Safe area insets respected
- [ ] No horizontal overflow
- [ ] Text scales with system settings

**Performance**:
- [ ] Images optimized (<200KB per image)
- [ ] No janky animations
- [ ] FPS smooth on low-end devices
- [ ] Load times reasonable (skeleton to content)

---

## NEXT STEPS (PHASE 3)

1. **Create component library** in React Native/Expo
2. **Implement tokens** as TypeScript types
3. **Build screen layouts** using components
4. **Test responsive design** across devices
5. **Verify accessibility** with screen readers
6. **Performance optimize** images and animations

---

**Design System Version**: 1.0  
**Last Updated**: 2026-11-14  
**Status**: Ready for Phase 3 Implementation  
**Next Review**: After Phase 3 component library complete
