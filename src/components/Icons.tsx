import { memo } from 'react'
import Svg, { Circle, Line, Path, Polyline } from 'react-native-svg'
import { colors } from '../theme'

interface IconProps {
  size?: number
  color?: string
  strokeWidth?: number
}

/** The 3-line hamburger from Frame2147241457. */
export const MenuIcon = memo(function MenuIcon({
  size = 16,
  color = '#000000',
  strokeWidth = 1.2,
}: IconProps) {
  return (
    <Svg width={size * 1.6} height={size} viewBox="0 0 16 10" fill="none">
      <Line x1={0} y1={1} x2={16} y2={1} stroke={color} strokeWidth={strokeWidth} />
      <Line x1={0} y1={5} x2={16} y2={5} stroke={color} strokeWidth={strokeWidth} />
      <Line x1={0} y1={9} x2={12} y2={9} stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  )
})

/** The diagonal cross from Group2147221304. */
export const CloseIcon = memo(function CloseIcon({
  size = 10,
  color = colors.text,
  strokeWidth = 1.2,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <Line x1={1} y1={1} x2={9} y2={9} stroke={color} strokeWidth={strokeWidth} />
      <Line x1={9} y1={1} x2={1} y2={9} stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  )
})

export const SearchIcon = memo(function SearchIcon({
  size = 15,
  color = colors.textFaint,
  strokeWidth = 1.2,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Circle cx={7} cy={7} r={5} stroke={color} strokeWidth={strokeWidth} />
      <Line x1={10.8} y1={10.8} x2={15} y2={15} stroke={color} strokeWidth={strokeWidth} />
    </Svg>
  )
})

export const ChevronRightIcon = memo(function ChevronRightIcon({
  size = 12,
  color = colors.text,
  strokeWidth = 1.2,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Polyline
        points="4.5,3 7.5,6 4.5,9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
})

/**
 * The blinking status dot beside each card title. Its opacity is animated by
 * the caller, so this stays a plain filled circle.
 */
export const DotIcon = memo(function DotIcon({
  size = 6,
  color = colors.text,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 6 6" fill="none">
      <Circle cx={3} cy={3} r={3} fill={color} />
    </Svg>
  )
})
