import { memo } from 'react'
import Svg, { Path } from 'react-native-svg'
import { colors } from '@/constants/theme'
import { OUTLINES, WORDMARK_ASPECT } from '@/constants/wordmark'

export const Wordmark = memo(function Wordmark({
  width,
  color = colors.text,
}: {
  width: number
  color?: string
}) {
  return (
    <Svg
      width={width}
      height={width / WORDMARK_ASPECT}
      viewBox="0 0 133 46"
      fill="none"
    >
      {OUTLINES.map((d) => (
        <Path key={d} d={d} fill={color} />
      ))}
    </Svg>
  )
})
