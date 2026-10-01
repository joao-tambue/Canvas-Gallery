# Canvas Gallery

A pannable gallery of 18th- and 19th-century landscape, botanical and
archaeological works. Drag to explore the canvas, tap a work to read its
catalogue entry.

Originally designed in Figma as a web app; this is the React Native / Expo
version.

## Running

```bash
npm install
npm start
```

Then press `a` for an Android emulator, `i` for an iOS simulator, or scan the
QR code with Expo Go.

```bash
npm run android   # Android emulator
npm run ios       # iOS simulator (macOS only)
npm run typecheck # tsc --noEmit
```

## Structure

The app uses [Expo Router](https://docs.expo.dev/router/introduction/): every
file in `app/` is a route. Imports use the `@/` alias for the project root.

```
app/
  _layout.tsx                root layout: fonts, providers, splash gate
  index.tsx                  the gallery: pannable canvas and screen chrome
components/
  canvas/
    ArtworkCard.tsx          one work on the canvas
    CanvasGrid.tsx           the construction grid, drawn across the whole screen
    Minimap.tsx              where-am-I indicator
    ZoomPill.tsx             current zoom, tap to reset
  overlays/
    DetailModal.tsx          catalogue entry
    SearchSheet.tsx          search + jump-to-work
    AboutSheet.tsx           collection info
  ui/
    BottomBar.tsx            frosted search / menu bar
    Wordmark.tsx             logo, as vector paths
    Icons.tsx                menu, close, search, chevron, dot
constants/theme.ts           colours, type, canvas geometry
data/artworks.ts             the collection (single source of truth)
lib/artwork.ts               card size and geometry / search helpers
types/artwork.ts             Artwork type
assets/artworks/             the 12 artwork images
```

## Gestures

- **One finger** — pan around the canvas
- **Pinch** — zoom from just past the point where the whole collection fits
  the screen up to 250%, anchored on the point between your fingers so the
  work you are zooming on stays under them
- **Two-finger drag** — pan while zoomed in
- **Tap the zoom pill** — snap back to 100% and the centred view

The grid is drawn in screen space, so it fills the whole background at any
zoom. The canvas can be dragged until one of its edges reaches the middle of
the screen, so every corner of the collection can be reached. The minimap
shows the whole 2400x1800 canvas and which part of it is on screen, with
`MIN` on the pill when you are as far out as you can go.

## Notes on the port

The design was desktop-first, so a few things were rethought rather than
translated literally:

- **Cursor.** A custom cursor and hover affordances have no meaning on touch,
  so the "Learn more" hover pill is gone. Cards compress on press and trigger
  a haptic instead.
- **Viewport.** The fixed 600x800 frame floating on a purple stage became a
  full-bleed canvas. The purple survives as the minimap accent.
- **Coordinate HUD.** The raw x/y readout only made sense with a mouse. It is
  now a minimap showing the visible region of the 2400x1800 canvas.
- **Search and menu.** Both were decorative on desktop; here they open a
  working search sheet and an about sheet.
- **Canvas coordinates** are unchanged, so the composition of the collection
  matches the original design.
- **Grid.** Rendered as one SVG path instead of 500 nested views.
- **Fonts.** The design asked for Geist Mono, which was never actually loaded
  in the web version. JetBrains Mono is the closest metric match available
  through Expo's Google Fonts, imported per-weight to keep the other 20 out
  of the bundle.
