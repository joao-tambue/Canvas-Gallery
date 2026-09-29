import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'
import { artworks } from '../data/artworks'
import { cardCenter, type Artwork } from '../types'
import { absoluteFill, canvas, colors } from '../theme'
import { ArtworkCard } from '../components/ArtworkCard'
import { AboutSheet } from '../components/AboutSheet'
import { BottomBar } from '../components/BottomBar'
import { CanvasGrid } from '../components/CanvasGrid'
import { DetailModal } from '../components/DetailModal'
import { Minimap } from '../components/Minimap'
import { SearchSheet } from '../components/SearchSheet'
import { Wordmark } from '../components/Wordmark'

const SPRING = { damping: 26, stiffness: 180, mass: 0.7 }

export function GalleryScreen() {
  const { width, height } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  const [selected, setSelected] = useState<Artwork | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  // Panning bounds: the canvas can never be dragged further than its own size.
  const bounds = useMemo(
    () => ({
      minX: Math.min(0, width - canvas.width),
      maxX: 0,
      minY: Math.min(0, height - canvas.height),
      maxY: 0,
    }),
    [width, height]
  )

  // Start with the centre of the collection in view rather than the top-left.
  const tx = useSharedValue((width - canvas.width) / 2)
  const ty = useSharedValue((height - canvas.height) / 2)

  const clampX = useCallback(
    (value: number) => Math.min(bounds.maxX, Math.max(bounds.minX, value)),
    [bounds]
  )
  const clampY = useCallback(
    (value: number) => Math.min(bounds.maxY, Math.max(bounds.minY, value)),
    [bounds]
  )

  const pan = useMemo(
    () =>
      Gesture.Pan()
        // Require real movement, so taps fall through to the cards underneath.
        .minDistance(6)
        .averageTouches(true)
        .onChange((event) => {
          'worklet'
          tx.value = Math.min(bounds.maxX, Math.max(bounds.minX, tx.value + event.changeX))
          ty.value = Math.min(bounds.maxY, Math.max(bounds.minY, ty.value + event.changeY))
        })
        .onEnd(() => {
          'worklet'
          tx.value = withSpring(tx.value, SPRING)
          ty.value = withSpring(ty.value, SPRING)
        }),
    [bounds, tx, ty]
  )

  const canvasStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }))

  const canvasMotion = useMemo(() => ({ tx, ty }), [tx, ty])

  const handleOpen = useCallback((artwork: Artwork) => {
    Haptics.selectionAsync().catch(() => {})
    setSelected(artwork)
  }, [])

  const focusArtwork = useCallback(
    (artwork: Artwork) => {
      const centre = cardCenter(artwork)
      setSearchOpen(false)
      tx.value = withSpring(clampX(width / 2 - centre.x), SPRING)
      ty.value = withSpring(clampY(height / 2 - centre.y), SPRING)
    },
    [clampX, clampY, height, tx, ty, width]
  )

  /**
   * Both sheets and the detail modal render inside a React Native `Modal`,
   * which is a separate native window, so they already take over touch input
   * without the canvas needing an explicit disabled state.
   */
  return (
    <View style={styles.root}>
      <GestureDetector gesture={pan}>
        <View style={styles.viewport}>
          <Animated.View style={[styles.canvas, canvasStyle]}>
            <CanvasGrid />
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} onPress={handleOpen} />
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
            viewport={{ width, height }}
          />
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
  },
  chrome: { ...absoluteFill },
  header: { alignItems: 'center' },
  footer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start', padding: 16 },
  barSlot: { paddingHorizontal: 0 },
})
