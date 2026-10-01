import { memo, useState } from 'react'
import { StyleSheet } from 'react-native'
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg'
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated'
import { canvas, colors } from '@/constants/theme'

interface Props {
  translateX: SharedValue<number>
  translateY: SharedValue<number>
  zoom: SharedValue<number>
  minZoom: number
  viewport: { width: number; height: number }
}

function zoomBucket(zoom: number) {
  'worklet'
  return Math.pow(2, Math.round(Math.log2(zoom)))
}

export const CanvasGrid = memo(function CanvasGrid({
  translateX,
  translateY,
  zoom,
  minZoom,
  viewport,
}: Props) {
  const [base, setBase] = useState(1)

  useAnimatedReaction(
    () => zoomBucket(zoom.value),
    (bucket, prev) => {
      if (bucket !== prev) runOnJS(setBase)(bucket)
    }
  )

  const cell = canvas.gridSize * base
  const layerW = Math.ceil(viewport.width * 2 + cell * 2)
  const layerH = Math.ceil(viewport.height * 2 + cell * 2)

  const animated = useAnimatedStyle(() => {
    const s = zoom.value
    const step = canvas.gridSize * s
    const wrap = (t: number) => (((t % step) + step) % step) - step
    return {
      opacity: interpolate(s, [minZoom, 1], [0.3, 1], Extrapolation.CLAMP),
      transform: [
        { translateX: wrap(translateX.value) },
        { translateY: wrap(translateY.value) },
        { scale: s / base },
      ],
    }
  })

  return (
    <Animated.View
      style={[styles.wrap, { width: layerW, height: layerH }, animated]}
      pointerEvents="none"
    >
      <Svg width={layerW} height={layerH} fill="none" pointerEvents="none">
        <Defs>
          <Pattern
            id="grid"
            x={0}
            y={0}
            width={cell}
            height={cell}
            patternUnits="userSpaceOnUse"
          >
            <Line
              x1={0.5}
              y1={0}
              x2={0.5}
              y2={cell}
              stroke={colors.gridLine}
              strokeWidth={1}
            />
            <Line
              x1={0}
              y1={0.5}
              x2={cell}
              y2={0.5}
              stroke={colors.gridLine}
              strokeWidth={1}
            />
          </Pattern>
        </Defs>
        <Rect x={0} y={0} width={layerW} height={layerH} fill="url(#grid)" />
      </Svg>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    top: 0,
    transformOrigin: 'left top',
  },
})
