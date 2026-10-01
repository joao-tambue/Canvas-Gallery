import { Platform } from 'react-native'

export const colors = {
  /** Canvas backdrop */
  stage: '#111111',
  accent: '#C4BAFF',
  surface: '#2c2d2d',
  text: '#ffffff',
  textMuted: 'rgba(255, 255, 255, 0.6)',
  textFaint: 'rgba(255, 255, 255, 0.3)',
  glass: 'rgba(255, 255, 255, 0.1)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  scrim: 'rgba(0, 0, 0, 0.8)',
  gridLine: '#ffffff',
} as const

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

export const absoluteFill = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
} as const
