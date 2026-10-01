import type { Artwork } from '@/types/artwork'

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
