import type { ImageSourcePropType } from 'react-native'

export interface Artwork {
  id: string
  title: string
  description: string
  period: string
  location: string
  image: ImageSourcePropType
  x: number
  y: number
  width: number
  height: number
}
