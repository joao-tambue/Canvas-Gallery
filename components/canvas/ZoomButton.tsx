import { memo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { MinusIcon, PlusIcon } from '@/components/ui/Icons'
import { absoluteFill, colors, radius } from '@/constants/theme'

interface Props {
  direction: 'in' | 'out'
  disabled: boolean
  onPress: () => void
}

export const ZoomButton = memo(function ZoomButton({ direction, disabled, onPress }: Props) {
  const Icon = direction === 'in' ? PlusIcon : MinusIcon

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={direction === 'in' ? 'Zoom in' : 'Zoom out'}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [styles.root, pressed && styles.pressed]}
    >
      <BlurView intensity={30} tint="light" style={absoluteFill} />
      <View style={styles.fill} pointerEvents="none" />
      <Icon color={disabled ? colors.textFaint : colors.text} />
    </Pressable>
  )
})

const styles = StyleSheet.create({
  root: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  pressed: { opacity: 0.6 },
  fill: { ...absoluteFill, backgroundColor: colors.glass },
})
