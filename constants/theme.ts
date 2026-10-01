import { Platform } from 'react-native'

/**
 * Single source of truth for the Canvas Gallery design tokens.
 * Values are lifted from the original Figma Make export (Tailwind classes).
 */

export const colors = {
  /** Canvas backdrop */
  stage: '#111111',
  /** Accent, inherited from the frame that used to surround the viewport */
  accent: '#C4BAFF',
  /** Card and modal surface */
  surface: '#2c2d2d',
  text: '#ffffff',
  textMuted: 'rgba(255, 255, 255, 0.6)',
  textFaint: 'rgba(255, 255, 255, 0.3)',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  scrim: 'rgba(0, 0, 0, 0.8)',
  gridLine: '#ffffff',
} as const

/**
 * The original design asked for Geist Mono, which is not bundled. JetBrains
 * Mono is the closest metric match available through Expo's Google Fonts.
 */
export const fontFamily = {
  light: 'JetBrainsMono_300Light',
  regular: 'JetBrainsMono_400Regular',
} as const

export const mono = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
})

export const radius = {
  sm: 8,
  md: 12,
  pill: 50,
  sheet: 28,
} as const

export const spacing = {
  cardPadding: 8,
  gutter: 20,
} as const

/**
 * Canvas geometry is preserved verbatim from the Figma frame so the spatial
 * composition of the collection is identical to the desktop design.
 */
export const canvas = {
  width: 2400,
  height: 1800,
  gridSize: 97.069,
} as const

export const type = {
  cardTitle: {
    fontFamily: fontFamily.light,
    fontSize: 12,
    letterSpacing: 0.36,
    color: colors.text,
  },
  label: {
    fontFamily: fontFamily.light,
    fontSize: 11,
    letterSpacing: 0.33,
    color: colors.text,
  },
  searchPlaceholder: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    letterSpacing: 0,
    color: colors.textFaint,
  },
  modalTitle: {
    fontFamily: fontFamily.light,
    fontSize: 20,
    letterSpacing: 0.6,
    color: colors.text,
  },
  hud: {
    fontFamily: fontFamily.light,
    fontSize: 11,
    letterSpacing: 0.36,
    color: colors.text,
  },
} as const

/** `StyleSheet.absoluteFillObject`, spreadable inside a StyleSheet.create block. */
export const absoluteFill = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const
