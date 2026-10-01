import { memo, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { absoluteFill, canvas, colors } from '@/constants/theme'

const BOX_W = 84
const BOX_H = 63

interface Props {
  translateX: SharedValue<number>
  translateY: SharedValue<number>
  zoom: SharedValue<number>
  viewport: { width: number; height: number }
}

/**
 * Replaces the desktop x/y HUD.
 *
 * The old readout only made sense with a mouse; on a 2400x1800 canvas it is
 * far more useful to see *where you are* than a pair of raw numbers, so the
 * same corner slot now holds a miniature of the canvas with the visible
 * region highlighted.
 */
export const Minimap = memo(function Minimap({
  translateX,
  translateY,
  zoom,
  viewport,
}: Props) {
  const scale = useMemo(
    () => Math.min(BOX_W / canvas.width, BOX_H / canvas.height),
    []
  )

  const innerW = canvas.width * scale
  const innerH = canvas.height * scale

  const style = useAnimatedStyle(() => {
    // Viewport box travels opposite to the canvas.
    const z = zoom.value || 1
    return {
      left: (-translateX.value * scale) / z,
      top: (-translateY.value * scale) / z,
      width: Math.min((viewport.width * scale) / z, innerW),
      height: Math.min((viewport.height * scale) / z, innerH),
    }
  })

  return (
    <View style={styles.root} pointerEvents="none">
      <BlurView intensity={30} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.fill} />

      <View style={styles.clip}>
        <View style={{ width: innerW, height: innerH }}>
          <View style={styles.viewportBox} />
          <Animated.View style={[styles.window, style]} />
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  root: {
    width: BOX_W,
    height: BOX_H,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  fill: { ...absoluteFill, backgroundColor: colors.glass },
  clip: {
    ...absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewportBox: {
    ...absoluteFill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  window: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: colors.accent,
    backgroundColor: 'rgba(196, 186, 255, 0.18)',
  },
})
