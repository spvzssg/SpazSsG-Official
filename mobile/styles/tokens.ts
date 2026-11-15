/**
 * Design Tokens - Central source of truth for all design values
 * Used throughout the application for consistent theming
 */

export const tokens = {
  // Colors - Light Theme (default)
  colors: {
    // Primary Brand Colors
    primary: '#00DDF5', // Electric Cyan
    secondary: '#FF791D', // Burnt Orange
    tertiary: '#D9DDE2', // Metallic Silver

    // Backgrounds
    background: '#FFFFFF',
    surface: '#F5F5F5',
    surfaceSecondary: '#EFEFEF',

    // Text
    text: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',

    // Borders & Dividers
    border: '#E5E5E5',

    // Semantic Colors
    error: '#E53E3E',
    success: '#38A169',
    warning: '#DD6B20',
    info: '#3182CE',

    // Disabled & Inactive
    disabled: '#CCCCCC',
    inactive: '#999999',
  },

  // Dark Theme
  colorsDark: {
    primary: '#00E5FF',
    secondary: '#FFA840',
    tertiary: '#E8EDF5',

    background: '#0F0F0F',
    surface: '#1A1A1A',
    surfaceSecondary: '#242424',

    text: '#F5F5F5',
    textSecondary: '#B0B0B0',
    textTertiary: '#757575',

    border: '#333333',

    error: '#FC8181',
    success: '#68D391',
    warning: '#FED7AA',
    info: '#63B3ED',

    disabled: '#555555',
    inactive: '#757575',
  },

  // Typography
  typography: {
    fontFamilies: {
      display: 'SpaceGrotesk', // Space Grotesk
      body: 'Inter', // Inter
      mono: 'IBMPlexMono', // IBM Plex Mono
    },
    sizes: {
      xxs: 10,
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 32,
      '4xl': 40,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.5,
      loose: 1.6,
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      wider: 1,
    },
  },

  // Spacing
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 32,
    8: 40,
    9: 48,
    10: 64,
  },

  // Border Radius
  border: {
    radius: {
      none: 0,
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      '2xl': 20,
      full: 9999,
    },
  },

  // Shadows
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 8,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 32,
      elevation: 12,
    },
  },

  // Animations & Transitions
  animations: {
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 400,
  },

  // Z-Index
  zIndex: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
} as const;

// Export type for theme
export type Theme = typeof tokens;
export type TokenColors = typeof tokens.colors;
export type TokenSpacing = typeof tokens.spacing;
