import { useCallback, useEffect, useMemo, useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { ArtworkCard } from '@/components/canvas/ArtworkCard'
import { CanvasGrid } from '@/components/canvas/CanvasGrid'
import { Minimap } from '@/components/canvas/Minimap'
import { ZoomPill } from '@/components/canvas/ZoomPill'
import { AboutSheet } from '@/components/overlays/AboutSheet'
import { DetailModal } from '@/components/overlays/DetailModal'
import { SearchSheet } from '@/components/overlays/SearchSheet'
import { BottomBar } from '@/components/ui/BottomBar'
import { Wordmark } from '@/components/ui/Wordmark'
import { absoluteFill, canvas, colors } from '@/constants/theme'
import { artworks } from '@/data/artworks'
import { cardCenter } from '@/lib/artwork'
import type { Artwork } from '@/types/artwork'

const SPRING = { damping: 26, stiffness: 180, mass: 0.7 }

const MAX_ZOOM = 2.5
const OVERSCROLL = 0.5

const FIT_MARGIN = 0.85

function clampAxis(value: number, size: number, extent: number) {
  'worklet'
  const slack = extent * OVERSCROLL
  return Math.min(slack, Math.max(extent - size - slack, value))
}

export default function GalleryScreen() {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [selected, setSelected] = useState<Artwork | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  const minZoom = useMemo(
    () =>
      Math.min(
        1,
        Math.min(width / canvas.width, height / canvas.height) * FIT_MARGIN
      ),
    [width, height]
  )

  const tx = useSharedValue((width - canvas.width) / 2)
  const ty = useSharedValue((height - canvas.height) / 2)
  const zoom = useSharedValue(1)

  const blink = useSharedValue(1)
  useEffect(() => {
    blink.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    )
  }, [blink])

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .minDistance(6)
        .averageTouches(true)
        .maxPointers(1)
        .onChange((event) => {
          'worklet'
          const s = zoom.value
          tx.value = clampAxis(
            tx.value + event.changeX,
            canvas.width * s,
            width
          )
          ty.value = clampAxis(
            ty.value + event.changeY,
            canvas.height * s,
            height
          )
        }),
    [height, tx, ty, width, zoom]
  )

  const startZoom = useSharedValue(1)
  const startTx = useSharedValue(0)
  const startTy = useSharedValue(0)
  const startFocalX = useSharedValue(0)
  const startFocalY = useSharedValue(0)

  const pinch = useMemo(
    () =>
      Gesture.Pinch()
        .onBegin((event) => {
          'worklet'
          startZoom.value = zoom.value
          startTx.value = tx.value
          startTy.value = ty.value
          startFocalX.value = event.focalX
          startFocalY.value = event.focalY
        })
        .onUpdate((event) => {
          'worklet'
          const next = Math.min(
            MAX_ZOOM,
            Math.max(minZoom, startZoom.value * event.scale)
          )
          const ratio = next / startZoom.value

          tx.value = clampAxis(
            startTx.value +
              (startFocalX.value - startTx.value) * (1 - ratio) +
              (event.focalX - startFocalX.value),
            canvas.width * next,
            width
          )
          ty.value = clampAxis(
            startTy.value +
              (startFocalY.value - startTy.value) * (1 - ratio) +
              (event.focalY - startFocalY.value),
            canvas.height * next,
            height
          )
          zoom.value = next
        })
        .onEnd(() => {
          'worklet'
          const s = zoom.value
          tx.value = withSpring(
            clampAxis(tx.value, canvas.width * s, width),
            SPRING
          )
          ty.value = withSpring(
            clampAxis(ty.value, canvas.height * s, height),
            SPRING
          )
        }),
    [height, minZoom, startFocalX, startFocalY, startTx, startTy, startZoom, tx, ty, width, zoom]
  )

  const gesture = useMemo(
    () => Gesture.Simultaneous(pan, pinch),
    [pan, pinch]
  )

  const canvasStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: zoom.value },
    ],
  }))

  const zoomLabel = useDerivedValue(() => Math.round(zoom.value * 100))
  const [zoomPct, setZoomPct] = useState(100)
  useAnimatedReaction(
    () => zoomLabel.value,
    (pct, prev) => {
      if (pct !== prev) runOnJS(setZoomPct)(pct)
    }
  )

  /** Back to the opening view: 100% with the collection centred. */
  const resetZoom = useCallback(() => {
    zoom.value = withSpring(1, SPRING)
    tx.value = withSpring((width - canvas.width) / 2, SPRING)
    ty.value = withSpring((height - canvas.height) / 2, SPRING)
  }, [height, tx, ty, width, zoom])

  /** True when zoomed all the way out to the full collection. */
  const atMinZoom = zoomPct === Math.round(minZoom * 100)

  const canvasMotion = useMemo(() => ({ tx, ty, zoom }), [tx, ty, zoom])

  const handleOpen = useCallback((artwork: Artwork) => {
    Haptics.selectionAsync().catch(() => {})
    setSelected(artwork)
  }, [])

  const focusArtwork = useCallback(
    (artwork: Artwork) => {
      const centre = cardCenter(artwork)
      const s = zoom.value
      setSearchOpen(false)
      tx.value = withSpring(
        clampAxis(width / 2 - centre.x * s, canvas.width * s, width),
        SPRING
      )
      ty.value = withSpring(
        clampAxis(height / 2 - centre.y * s, canvas.height * s, height),
        SPRING
      )
    },
    [height, tx, ty, width, zoom]
  )

  return (
    <View style={styles.root}>
      <GestureDetector gesture={gesture}>
        <View style={styles.viewport}>
          <CanvasGrid
            translateX={tx}
            translateY={ty}
            zoom={zoom}
            minZoom={minZoom}
            viewport={{ width, height }}
          />
          <Animated.View style={[styles.canvas, canvasStyle]}>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onPress={handleOpen}
                blink={blink}
              />
            ))}
          </Animated.View>
        </View>
      </GestureDetector>

      <View style={styles.chrome} pointerEvents="box-none">
        <View style={[styles.header, { paddingTop: insets.top + 12 }]} pointerEvents="none">
          <Wordmark width={133} />
        </View>

        <View style={styles.footer} pointerEvents="box-none">
          <Minimap
            translateX={canvasMotion.tx}
            translateY={canvasMotion.ty}
            zoom={canvasMotion.zoom}
            viewport={{ width, height }}
          />
          <ZoomPill value={zoomPct} atMin={atMinZoom} onReset={resetZoom} />
        </View>

        <View style={[styles.barSlot, { paddingBottom: insets.bottom + 16 }]} pointerEvents="box-none">
          <BottomBar
            onSearchPress={() => setSearchOpen(true)}
            onMenuPress={() => setAboutOpen(true)}
          />
        </View>
      </View>

      <DetailModal artwork={selected} onClose={() => setSelected(null)} />
      <SearchSheet
        visible={searchOpen}
        artworks={artworks}
        onClose={() => setSearchOpen(false)}
        onSelect={focusArtwork}
      />
      <AboutSheet visible={aboutOpen} onClose={() => setAboutOpen(false)} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.stage },
  viewport: { flex: 1, overflow: 'hidden' },
  canvas: {
    position: 'absolute',
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    transformOrigin: 'left top',
  },
  chrome: { ...absoluteFill },
  header: { alignItems: 'center' },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  barSlot: { paddingHorizontal: 0 },
})
