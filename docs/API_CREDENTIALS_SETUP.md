# API CREDENTIALS SETUP GUIDE

**Status**: Phase 1 Reference Document  
**Last Updated**: 2026-11-14  
**Purpose**: Detailed instructions for obtaining and configuring all required API credentials

---

## OVERVIEW

The Spaz SsG mobile application integrates with multiple external services to provide music streaming, social media content, livestream status, and notifications.

This document outlines:
1. Which credentials are needed
2. Where to obtain them
3. How to configure them
4. Which features require each credential
5. Timeline for implementation

**Important**: 
- No credentials are required to build the core application (Phase 3)
- Integrations are implemented in Phase 4
- Development can proceed with mock data and manual fallbacks
- Credentials should be added to Supabase during Phase 5 setup

---

## CREDENTIAL MATRIX

| Service | Credential Type | Required For | When Needed | Priority |
|---|---|---|---|---|
| Supabase | Project URL + Anon Key + Service Role Key | Backend, Authentication, Database | Phase 3 | CRITICAL |
| Spotify | Client ID + Client Secret | Music discovery, embedded player | Phase 4 | HIGH |
| YouTube Data API | API Key + OAuth Credentials | Video feed, livestream status | Phase 4 | HIGH |
| Twitch | Client ID + OAuth Token | Stream status, VOD retrieval | Phase 4 | HIGH |
| Instagram | App ID + App Secret (Graph API) | Social feed sync | Phase 4 | MEDIUM |
| TikTok | API Key + API Secret | Social feed sync | Phase 4 | MEDIUM |
| Discord | Bot Token (optional) | Community validation | Phase 4 | LOW |
| Stripe | Publishable Key + Secret Key | Payment infrastructure | Phase 5 | MEDIUM |
| Expo | EAS Token + Push Service Credentials | Notifications, App Building | Phase 5 | HIGH |

---

## 1. SUPABASE SETUP (CRITICAL - PHASE 3)

### What You Need

- Supabase account (free tier available)
- PostgreSQL database
- Authentication setup
- Storage bucket
- Edge Functions deployment

### How to Set Up

**Step 1**: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start Your Project"
3. Sign in or create account
4. Click "New Project"
5. Enter project details:
   - Project Name: `spaz-ssg-mobile`
   - Database Password: Create strong password (save it)
   - Region: Choose closest to your location
6. Wait for project initialization (2-5 minutes)

**Step 2**: Get Connection Credentials
1. In Supabase dashboard, click "Settings" → "API"
2. Copy these values to `.env`:
   ```
   SUPABASE_URL=https://[project-id].supabase.co
   SUPABASE_ANON_KEY=[long alphanumeric key starting with eyJ]
   SUPABASE_SERVICE_ROLE_KEY=[long alphanumeric key]
   ```
3. **Important**: Service role key is sensitive - never commit to Git

**Step 3**: Enable Authentication Methods
1. Go to "Authentication" → "Providers"
2. Enable "Email" (default)
3. Configure email templates if desired

**Step 4**: Create Storage Bucket
1. Go to "Storage"
2. Click "New bucket"
3. Name: `artist-assets`
4. Make public (for image serving)
5. Create another bucket: `user-uploads` (private)

**Step 5**: Set Up Row Level Security
- Will be configured via SQL migrations (Phase 3)
- See `DATABASE_SCHEMA.md` for RLS policies

### Features This Enables

✅ Database storage  
✅ User authentication  
✅ Administrative access control  
✅ Image hosting  
✅ Edge Functions for server-side logic  

---

## 2. SPOTIFY INTEGRATION (HIGH - PHASE 4)

### What You Need

Spotify Web API credentials to:
- Display featured releases
- Embed music player
- Link to Spotify artist page
- Retrieve album artwork

### How to Set Up

**Step 1**: Create Spotify Developer Account
1. Go to https://developer.spotify.com
2. Click "Log in" (or create Spotify account first)
3. Accept terms and create account
4. Verify email

**Step 2**: Create Application
1. Go to Dashboard
2. Click "Create an App"
3. Name: `Spaz SsG Mobile`
4. Agree to terms
5. Create app
6. Accept agreement again

**Step 3**: Get Credentials
1. Open your app
2. Click "Settings"
3. Copy these values:
   ```
   SPOTIFY_CLIENT_ID=[alphanumeric string]
   SPOTIFY_CLIENT_SECRET=[alphanumeric string]
   ```
4. Set Redirect URI: `https://[supabase-url]/auth/v1/callback`

**Step 4**: Store in Supabase
1. In Supabase, go to "SQL Editor"
2. Create integration record in `integrations` table with Spotify credentials
3. Or store in Edge Function environment variables

### API Rate Limits

- 429 requests per minute for Web API
- Implement caching and rate limit handling

### Useful Endpoints

```
Artist Profile: GET /v1/artists/{artist_id}
Artist Releases: GET /v1/artists/{artist_id}/albums
Embedded Player: Web Playback SDK or iframe embed
```

### Features This Enables

✅ Spotify artist profile display  
✅ Album/release discovery  
✅ Embedded music player  
✅ Direct Spotify links  

### Timeline

- Can be implemented any time in Phase 4
- Does not block other integrations

---

## 3. YOUTUBE DATA API (HIGH - PHASE 4)

### What You Need

YouTube API credentials to:
- Retrieve channel videos
- Display YouTube Shorts
- Show livestream status
- Embed video player

### How to Set Up

**Step 1**: Enable YouTube Data API
1. Go to https://console.cloud.google.com
2. Create new project: `Spaz SsG Mobile`
3. In search bar, search for "YouTube Data API v3"
4. Click "Enable"
5. Wait for activation

**Step 2**: Create API Key
1. Go to "Credentials" in sidebar
2. Click "Create Credentials" → "API Key"
3. Copy the key:
   ```
   YOUTUBE_API_KEY=[alphanumeric with dashes]
   ```
4. Click "Restrict Key":
   - Application restrictions: "Android apps" + "iOS apps"
   - API restrictions: "YouTube Data API v3"
5. Save restrictions

**Step 3**: (Optional) Set Up OAuth for Advanced Features
1. Click "Create Credentials" → "OAuth 2.0 Client ID"
2. Choose "Android" or "iOS"
3. Configure package name and certificate fingerprint
4. Download JSON (save securely)

### API Rate Limits

- 10,000 quota units per day (default)
- Search: 100 units per request
- Videos.list: 1 unit per request
- Implement caching to minimize quota usage

### Useful Endpoints

```
Channel Info: GET youtube.channels.list
Channel Videos: GET youtube.search.list (type: video)
Video Details: GET youtube.videos.list
Livestream Details: GET youtube.liveStreams.list
```

### Features This Enables

✅ YouTube channel video feed  
✅ Video thumbnails and metadata  
✅ Livestream status detection  
✅ Embedded video player  
✅ YouTube Shorts display  

### Timeline

- Essential for Phase 4 LIVE section
- YouTube channel has active content

---

## 4. TWITCH INTEGRATION (HIGH - PHASE 4)

### What You Need

Twitch API credentials to:
- Detect current livestream status
- Retrieve previous stream VODs
- Display stream information

### How to Set Up

**Step 1**: Create Twitch Developer Account
1. Go to https://dev.twitch.tv/console/apps
2. Log in with Twitch account (create if needed)
3. Accept Developer Agreement

**Step 2**: Create Application
1. Click "+ Create Application"
2. Name: `Spaz SsG Mobile`
3. Category: "Application"
4. Create application
5. Accept terms

**Step 3**: Get Credentials
1. Click "Manage" on your app
2. Copy values:
   ```
   TWITCH_CLIENT_ID=[alphanumeric]
   TWITCH_CLIENT_SECRET=[alphanumeric]
   ```
3. Set OAuth Redirect URL: `https://[supabase-url]/auth/v1/callback`

**Step 4**: Create OAuth Token
1. For server-side use, generate token via:
   ```
   POST https://id.twitch.tv/oauth2/token
   ?client_id=YOUR_CLIENT_ID
   &client_secret=YOUR_CLIENT_SECRET
   &grant_type=client_credentials
   ```
2. Store token in Supabase vault (sensitive)

### API Rate Limits

- 120 requests per minute
- Implement request batching and caching

### Useful Endpoints

```
Stream Info: GET /helix/streams?user_login=spazssg
User Info: GET /helix/users?login=spazssg
Videos (VODs): GET /helix/videos?user_id={user_id}
Clips: GET /helix/clips?broadcaster_id={user_id}
```

### Features This Enables

✅ Twitch stream status detection  
✅ VOD retrieval and display  
✅ Clips display  
✅ Stream information (title, viewers, category)  

### Timeline

- Essential for Phase 4 LIVE section
- Twitch is primary streaming platform

---

## 5. INSTAGRAM INTEGRATION (MEDIUM - PHASE 4)

### What You Need

Instagram Graph API credentials to:
- Sync Instagram feed posts
- Display Reels
- Show engagement metrics

### Prerequisites

- Facebook Developer Account
- Facebook App with Instagram Graph API enabled
- Instagram Business Account (not personal)

### How to Set Up

**Step 1**: Create Facebook Developer Account
1. Go to https://developers.facebook.com
2. Click "Get Started"
3. Sign in or create Facebook account
4. Complete developer registration

**Step 2**: Create Facebook App
1. Go to "My Apps"
2. Click "Create App"
3. Choose "Business" as app type
4. Fill in app details:
   - App Name: `Spaz SsG Mobile`
   - Contact Email: Your email
   - Purpose: "Integrate Social Media"
5. Create app

**Step 3**: Add Instagram Graph API
1. In app dashboard, click "Add Product"
2. Search for "Instagram Graph API"
3. Click "Set Up"
4. Choose "Instagram Graph API"

**Step 4**: Create Access Token
1. Go to "Settings" → "Basic"
2. Copy:
   ```
   FACEBOOK_APP_ID=[numeric]
   FACEBOOK_APP_SECRET=[alphanumeric]
   ```
3. Generate access token (see Instagram Graph API docs)
4. Store in Supabase vault

**Step 5**: Configure Instagram Business Account
1. Convert Instagram account to Business Account
2. Connect to Facebook Page
3. Get Instagram Business Account ID
4. Store in Supabase

### API Rate Limits

- 200 calls per hour (depends on app approval level)
- Request tier upgrade if needed for higher limits

### Useful Endpoints

```
Media List: GET /ig_user/{user_id}/media
Media Details: GET /{media_id}?fields=id,caption,media_type,media_url,timestamp
Business Account Info: GET /ig_user/{user_id}
```

### Important Notes

- Requires Instagram Business Account (not personal)
- May require app review from Meta for full functionality
- Access token requires regular refresh

### Features This Enables

✅ Instagram posts display  
✅ Reels integration  
✅ Engagement metrics  
✅ Automated feed sync  

### Timeline

- Useful but not blocking
- Can use manual fallback initially
- Phase 4 implementation

---

## 6. TIKTOK INTEGRATION (MEDIUM - PHASE 4)

### What You Need

TikTok API credentials to:
- Sync TikTok videos
- Display creator profile
- Show video engagement metrics

### Prerequisites

- TikTok account (@spvzssg)
- TikTok Creator Fund eligibility (recommended)
- Developer account approval

### How to Set Up

**Step 1**: Access TikTok Developer Portal
1. Go to https://developer.tiktok.com
2. Log in or sign up
3. Accept terms

**Step 2**: Create Developer Project
1. Go to "Applications"
2. Click "Create"
3. Fill in project details:
   - App Name: `Spaz SsG Mobile`
   - Category: "Music Content"
4. Create

**Step 3**: Request API Access
1. Click on your app
2. Request access for:
   - Video.list (to retrieve videos)
   - User.info (to get profile)
   - Video.query (to search)
3. Submit request for review

**Step 4**: Get Credentials (After Approval)
```
TIKTOK_CLIENT_KEY=[alphanumeric]
TIKTOK_CLIENT_SECRET=[alphanumeric]
TIKTOK_ACCESS_TOKEN=[generated token]
```

### Important Notes

- TikTok API access is restrictive and requires approval
- May take weeks for API review
- Some endpoints require individual Creator accounts
- Consider using manual sync initially

### Features This Enables

✅ TikTok video feed  
✅ Creator profile display  
✅ Video engagement metrics  
✅ Automated content sync  

### Timeline

- Lower priority than other integrations
- Can use manual links initially
- API approval may delay implementation

---

## 7. DISCORD INTEGRATION (LOW - PHASE 4)

### What You Need

Discord Bot token to:
- Validate Discord community link
- (Optional) Display community announcements
- (Optional) Community verification

### How to Set Up

**Step 1**: Create Discord Application
1. Go to https://discord.com/developers/applications
2. Log in with Discord account
3. Click "New Application"
4. Name: `Spaz SsG Bot`
5. Create

**Step 2**: Create Bot User
1. Go to "Bot" section
2. Click "Add Bot"
3. Copy token:
   ```
   DISCORD_BOT_TOKEN=[alphanumeric with underscores]
   ```

**Step 3**: Set Bot Permissions
1. Go to "OAuth2" → "URL Generator"
2. Select scopes: `bot`
3. Select permissions: `read:messages`, `send:messages`
4. Copy generated URL
5. Visit URL to invite bot to Discord server

### Features This Enables

✅ Community link validation  
✅ (Optional) Auto-announcements  
✅ (Optional) Bot commands in Discord  

### Timeline

- Optional, low priority
- Can defer to later phases
- Discord link can be simple invite without bot

---

## 8. STRIPE INTEGRATION (MEDIUM - PHASE 5)

### What You Need

Stripe account for:
- Premium membership payment infrastructure
- Subscription management
- Payment processing

**Important**: This is infrastructure only. No payments will be activated without approval.

### How to Set Up

**Step 1**: Create Stripe Account
1. Go to https://stripe.com
2. Click "Start now"
3. Create account with email
4. Verify email
5. Complete onboarding

**Step 2**: Get API Keys
1. Go to "Developers" → "API Keys"
2. Copy keys (Restricted to test mode initially):
   ```
   STRIPE_PUBLISHABLE_KEY=[pk_test_...]
   STRIPE_SECRET_KEY=[sk_test_...]
   ```

**Step 3**: Test Mode Setup
- Development always uses test keys
- Test cards: `4242 4242 4242 4242`, any future expiry, any CVC

**Step 4**: Create Products
1. Go to "Products"
2. Create product: "Spaz SsG Premium Membership"
3. Create pricing plans (when approved)

**Step 5**: Webhook Configuration
1. Go to "Developers" → "Webhooks"
2. Add endpoint for subscription events
3. Configure in Supabase Edge Function

### Important Notes

- Test mode for development (never charges)
- Live mode only activated with explicit approval
- Payments require HTTPS and PCI compliance
- Stripe handles all sensitive card data

### Features This Enables

✅ Payment infrastructure  
✅ Subscription management  
✅ Payment method storage  
✅ Webhook notifications  

### Timeline

- Phase 5 setup
- Infrastructure only initially
- Activation deferred until approved

---

## 9. EXPO SETUP (HIGH - PHASE 5)

### What You Need

Expo account and credentials for:
- Push notifications delivery
- Building iOS/Android binaries
- Over-the-air updates

### How to Set Up

**Step 1**: Create Expo Account
1. Go to https://expo.dev
2. Click "Sign up"
3. Create account with email
4. Verify email
5. Create organization if desired

**Step 2**: Install Expo CLI
```bash
npm install -g eas-cli expo-cli
```

**Step 3**: Get Credentials
1. Run: `eas login`
2. Enter email and password
3. Get EAS token from account settings
4. Store in environment:
   ```
   EXPO_TOKEN=[alphanumeric token]
   ```

**Step 4**: Configure Push Notifications
1. Go to Expo dashboard
2. Create new Expo Push Token
3. Store in `push_subscriptions` table
4. Configure Supabase function to use Expo Push API

### Important Notes

- Expo free tier includes up to 10 builds per month
- Push notifications require Expo token
- iOS builds require Apple Developer account
- Android builds require Google Play Developer account

### Features This Enables

✅ Push notifications  
✅ Over-the-air updates  
✅ iOS/Android building  
✅ Development server  

### Timeline

- Phase 5 for full setup
- Core dev can start with Expo Go (local testing)

---

## 10. ENVIRONMENT CONFIGURATION

### .env File Template

Create `.env` file in project root (never commit):

```env
# Supabase
SUPABASE_URL=https://[project-id].supabase.co
SUPABASE_ANON_KEY=[anon key]
SUPABASE_SERVICE_ROLE_KEY=[service role key - SERVER ONLY]

# Spotify
SPOTIFY_CLIENT_ID=[id]
SPOTIFY_CLIENT_SECRET=[secret]

# YouTube
YOUTUBE_API_KEY=[key]
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxx

# Twitch
TWITCH_CLIENT_ID=[id]
TWITCH_CLIENT_SECRET=[secret]
TWITCH_USERNAME=spazssg

# Instagram (Optional)
FACEBOOK_APP_ID=[id]
FACEBOOK_APP_SECRET=[secret]
INSTAGRAM_BUSINESS_ACCOUNT_ID=[id]

# TikTok (Optional)
TIKTOK_CLIENT_KEY=[key]
TIKTOK_CLIENT_SECRET=[secret]

# Discord (Optional)
DISCORD_BOT_TOKEN=[token]
DISCORD_SERVER_ID=[id]

# Stripe
STRIPE_PUBLISHABLE_KEY=[pk_test_...]
STRIPE_SECRET_KEY=[sk_test_...]

# Expo
EXPO_TOKEN=[token]
```

### .env.example (Committed to Repo)

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Spotify
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret

# YouTube
YOUTUBE_API_KEY=your_api_key
YOUTUBE_CHANNEL_ID=your_channel_id

# Twitch
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
TWITCH_USERNAME=spazssg

# Instagram (Optional)
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id

# TikTok (Optional)
TIKTOK_CLIENT_KEY=your_client_key
TIKTOK_CLIENT_SECRET=your_client_secret

# Discord (Optional)
DISCORD_BOT_TOKEN=your_bot_token
DISCORD_SERVER_ID=your_server_id

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Expo
EXPO_TOKEN=your_expo_token
```

---

## 11. PRIORITY TIMELINE

### Phase 3 (Immediate)
- ✅ Supabase setup (CRITICAL)
- ✅ GitHub repository setup
- ✅ Expo project initialization

### Phase 4 (Integration Phase)
- ⚠️ Spotify (HIGH - obtain credentials)
- ⚠️ YouTube API (HIGH - obtain credentials)
- ⚠️ Twitch (HIGH - obtain credentials)
- ⏳ Instagram (MEDIUM - optional)
- ⏳ TikTok (MEDIUM - optional, approval pending)
- ⏳ Discord (LOW - optional)

### Phase 5 (Advanced Features)
- ⏳ Stripe (MEDIUM - infrastructure setup)
- ⏳ Expo Push (HIGH - notification setup)

---

## 12. TESTING CREDENTIALS

For initial development, use test/demo credentials:

### Spotify
- Use Spotify Preview API (limited but no authentication needed initially)
- Or create test app with your personal account

### YouTube
- Use API key in development mode (quota available)
- Test with public videos first

### Twitch
- Use public endpoints that don't require authentication
- Test with read-only scopes

### Development Approach
1. Start with mock data in Phase 3
2. Add real API integration in Phase 4 when credentials available
3. Never represent mock data as real
4. Use feature flags to switch between mock and real

---

## 13. SECURITY BEST PRACTICES

### Credential Storage

✅ **DO**:
- Store in `.env` file (not committed)
- Use environment variables in production
- Store sensitive keys in Supabase vault
- Rotate tokens regularly
- Use scoped API keys with minimal permissions

❌ **DON'T**:
- Commit `.env` to Git
- Expose credentials in client code
- Use credentials in public repositories
- Log sensitive information
- Hardcode tokens

### Credential Rotation

- Spotify: Rotate every 6 months
- YouTube: Rotate API keys if compromised
- Twitch: Refresh tokens before expiration
- Database: Use Supabase password rotation feature
- Stripe: Use API key rotation in dashboard

### Access Control

- Admin dashboard: Email + password only
- API keys: Restrict to necessary endpoints
- IP whitelist: For backend services (if using static IP)
- OAuth scopes: Request only necessary permissions

---

## 14. TROUBLESHOOTING

### Common Issues

**"Invalid API Key"**
- Verify key is correct and not truncated
- Check key is for correct environment (test vs live)
- Confirm API is enabled/active

**"Quota Exceeded"**
- Implement caching to reduce API calls
- Request quota increase if needed
- Batch requests where possible

**"CORS Error"**
- Call APIs from server-side (Edge Functions)
- Never call sensitive APIs from client
- Set appropriate CORS headers

**"Token Expired"**
- Implement token refresh logic
- Store refresh tokens securely
- Auto-refresh before expiration

---

## 15. NEXT STEPS

1. **Phase 3**: Set up Supabase project immediately
2. **Before Phase 4**: Gather Spotify, YouTube, Twitch credentials
3. **Phase 4**: Implement integrations as credentials become available
4. **Ongoing**: Follow security best practices for credential management

---

**Questions or Issues?**

Refer to specific service documentation:
- Supabase: https://supabase.com/docs
- Spotify: https://developer.spotify.com/documentation
- YouTube: https://developers.google.com/youtube/v3
- Twitch: https://dev.twitch.tv/docs
- Others: See respective developer portals

**Document Version**: 1.0  
**Last Updated**: 2026-11-14
