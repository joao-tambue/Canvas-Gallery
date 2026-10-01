import { memo, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { canvas, colors } from '@/constants/theme'

/**
 * The 10%-opacity construction grid from the original design.
 *
 * The web version rendered 25x20 nested <div>s per cell, i.e. 500 nodes. Here
 * every line is emitted as one <Path>, so the whole grid is a single node.
 */
export const CanvasGrid = memo(function CanvasGrid() {
  const d = useMemo(() => {
    const parts: string[] = []
    for (let col = 0; col <= canvas.gridColumns; col++) {
      const x = (col * canvas.gridSize).toFixed(2)
      parts.push(`M${x} 0V${canvas.height}`)
    }
    for (let row = 0; row <= canvas.gridRows; row++) {
      const y = (row * canvas.gridSize).toFixed(2)
      parts.push(`M0 ${y}H${canvas.width}`)
    }
    return parts.join('')
  }, [])

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width={canvas.width}
        height={canvas.height}
        style={StyleSheet.absoluteFill}
        fill="none"
      >
        <Path d={d} stroke={colors.gridLine} strokeWidth={1} />
      </Svg>
    </View>
  )
})
