# Spaz SsG Mobile App - Getting Started

## Installation

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS: Xcode (for iOS simulator)
- Android: Android Studio (for Android emulator)

### Setup

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start development server
npm run start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Or use Expo Go app on physical device
npm run start
```

## Project Structure

```
mobile/
├── app/                    # Expo Router screens (file-based routing)
│   ├── (tabs)/            # Tab navigation group
│   │   ├── _layout.tsx    # Tab navigator setup
│   │   ├── home.tsx       # Home screen (complete)
│   │   ├── music.tsx      # Music screen (placeholder)
│   │   ├── social.tsx     # Social screen (placeholder)
│   │   ├── live.tsx       # LIVE screen (placeholder)
│   │   ├── everything-spaz.tsx
│   │   └── dreamers-club.tsx
│   └── _layout.tsx        # Root layout
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── state/                 # Zustand state management
├── styles/                # Design tokens
├── types/                 # TypeScript definitions
├── constants/             # App constants and mock data
└── package.json
```

## Key Features

✅ **6 Tab Navigation** - Bottom tab bar with all primary screens  
✅ **Home Screen Complete** - Hero, featured music, social feed, announcements  
✅ **Design System** - All tokens, colors, spacing defined  
✅ **TypeScript** - Full type safety throughout  
✅ **State Management** - Zustand stores for all data  
✅ **Mock Data** - Ready for development without API  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Accessible** - WCAG AA compliance built-in  

## Development Commands

```bash
# Start dev server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint

# Formatting
npm run format

# Run tests
npm run test

# Build for production
npm run build:ios
npm run build:android
```

## Next Steps

### To Complete Other Screens (Patterns Established)

Each remaining screen follows the same pattern as Home:

1. Create screen component in `app/(tabs)/screenname.tsx`
2. Create components in `components/ScreenName/` folder
3. Create hook in `hooks/useScreenName.ts`
4. Import mock data from `constants/mockData.ts`
5. Use Zustand stores for state

### To Add Real API Integration

1. Create service in `services/apiname.service.ts`
2. Create hook that calls service
3. Update store with real data
4. Update screen to use real data instead of mock

## Screens Status

| Screen | Status | Next Steps |
|--------|--------|-----------|
| Home | ✅ Complete | Connect to real APIs |
| Music | 🟡 Placeholder | Build DSP cards, release list |
| Social | 🟡 Placeholder | Build feed, platform filters |
| LIVE | 🟡 Placeholder | Build stream status, schedule |
| Everything Spaz | 🟡 Placeholder | Build link directory |
| Dreamers Club | 🟡 Placeholder | Build community info, Discord link |

## Architecture Highlights

### Navigation
- **Expo Router** for file-based routing
- **Tab Navigator** with bottom tab bar
- **Type-safe** route definitions

### State Management
- **Zustand** stores for each feature
- **DevTools** integration for debugging
- **Simple, predictable** data flow

### Components
- **Base components**: Button, Card, Badge, Input, etc.
- **Composite components**: Built from base components
- **Reusable** across screens

### Styling
- **Design tokens** from `styles/tokens.ts`
- **Theme-aware** (light/dark support ready)
- **Responsive** using Flexbox

## Device Testing

### iOS Simulator
```bash
npm run ios
```

### Android Emulator
```bash
npm run android
```

### Physical Device (Expo Go)
1. Install Expo Go from App Store/Play Store
2. Run `npm run start`
3. Scan QR code with phone

## Troubleshooting

**Port already in use:**
```bash
expo start -c  # Clear cache
```

**TypeScript errors:**
```bash
npm run type-check
```

**Module not found:**
```bash
npm install
```

## Documentation

See `docs/` folder for complete documentation:
- `PHASE_1_SUMMARY.md` - Architecture
- `PHASE_2_SUMMARY.md` - Design System
- `PHASE_3_STRUCTURE.md` - Development structure
- `API_CREDENTIALS_SETUP.md` - API integration guide

## Next Development Session

Priority order for completing Phase 3:
1. Build Music screen (follow Home pattern)
2. Build Social screen (more complex feed)
3. Build LIVE screen
4. Complete remaining screens
5. Connect to real Supabase backend
6. Implement API integrations

## Support

For questions about architecture or development:
- Check `PHASE_3_STRUCTURE.md` for detailed architecture
- Review Home screen implementation as template
- Check types in `types/index.ts` for data structures
