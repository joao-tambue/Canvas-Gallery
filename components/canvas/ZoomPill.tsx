import { memo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { absoluteFill, colors, radius, type } from '@/constants/theme'

interface Props {
  value: number
  atMin: boolean
  onReset: () => void
}

export const ZoomPill = memo(function ZoomPill({ value, atMin, onReset }: Props) {
  const isDefault = value === 100

  return (
    <Pressable
      onPress={onReset}
      disabled={isDefault}
      accessibilityRole="button"
      accessibilityLabel={
        isDefault
          ? 'Zoom 100%'
          : atMin
            ? 'Zoomed out to the full collection, tap to reset'
            : `Zoom ${value}%, tap to reset`
      }
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      <BlurView intensity={30} tint="light" style={absoluteFill} />
      <View style={styles.fill} pointerEvents="none" />
      <Text style={[styles.label, !isDefault && styles.labelActive]}>
        {value}%
        {atMin && <Text style={styles.minTag}> MIN</Text>}
      </Text>
    </Pressable>
  )
})

const styles = StyleSheet.create({
  root: {
    height: 28,
    minWidth: 52,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  pressed: { opacity: 0.6 },
  fill: { ...absoluteFill, backgroundColor: colors.glass },
  label: { ...type.hud, color: colors.textFaint },
  labelActive: { color: colors.accent },
  minTag: { color: colors.textFaint, fontSize: 8, letterSpacing: 0.5 },
})
