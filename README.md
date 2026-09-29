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

```
App.tsx                      font loading, providers, splash gate
index.ts                     Expo entry point
src/
  screens/GalleryScreen.tsx  the pannable canvas and all screen chrome
  components/
    ArtworkCard.tsx          one work on the canvas
    CanvasGrid.tsx           the construction grid, as a single SVG path
    DetailModal.tsx          catalogue entry
    SearchSheet.tsx          search + jump-to-work
    AboutSheet.tsx           collection info
    BottomBar.tsx            frosted search / menu bar
    Minimap.tsx              where-am-I indicator
    Wordmark.tsx             logo, as vector paths
    Icons.tsx                menu, close, search, chevron, dot
  data/artworks.ts           the collection (single source of truth)
  theme.ts                   colours, type, canvas geometry
  types.ts                   Artwork type and geometry helpers
assets/artworks/             the 12 artwork images
```

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
