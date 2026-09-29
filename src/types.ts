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

export const CARD_PADDING = 8

/** Outer footprint of a card on the canvas. */
export function cardBox(artwork: Artwork) {
  return {
    left: artwork.x,
    top: artwork.y,
    width: artwork.width + CARD_PADDING * 2,
    height:
      artwork.height + CARD_PADDING * 2 + 8 + 12 + 10,
  }
}

export function cardCenter(artwork: Artwork) {
  const box = cardBox(artwork)
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
}

export function matches(artwork: Artwork, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [artwork.title, artwork.period, artwork.location]
    .join(' ')
    .toLowerCase()
    .includes(q)
}
