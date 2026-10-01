import type { Artwork } from '@/types/artwork'

export const CARD_PADDING = 8
export const CARD_IMAGE_WIDTH = 320
export const CARD_IMAGE_HEIGHT = 260

export function cardBox(artwork: Artwork) {
  return {
    left: artwork.x,
    top: artwork.y,
    width: CARD_IMAGE_WIDTH + CARD_PADDING * 2,
    height: CARD_IMAGE_HEIGHT + CARD_PADDING * 2 + 8 + 12 + 10,
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
