import type { ImageSourcePropType } from 'react-native'

export interface Artwork {
  id: string
  title: string
  description: string
  period: string
  location: string
  /** Static `require` reference so the bundler can inline the asset. */
  image: ImageSourcePropType
  /** Canvas-space position, in points, from the original Figma layout. */
  x: number
  y: number
  /** Intrinsic artwork size, excluding card padding. */
  width: number
  height: number
}