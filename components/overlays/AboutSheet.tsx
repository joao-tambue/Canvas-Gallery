import { useEffect } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { artworks } from '@/data/artworks'
import { colors, radius, spacing, type } from '@/constants/theme'

interface Props {
  visible: boolean
  onClose: () => void
}

export function AboutSheet({ visible, onClose }: Props) {
  const insets = useSafeAreaInsets()
  const progress = useSharedValue(0)

  useEffect(() => {
    if (!visible) return
    progress.value = 0
    progress.value = withTiming(1, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    })
  }, [visible, progress])

  const backdrop = useAnimatedStyle(() => ({ opacity: progress.value }))
  const sheet = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 420 }],
  }))

  if (!visible) return null

  return (
    <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, backdrop]}>
          <Pressable
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close about"
          />
        </Animated.View>

        <View style={styles.wrapper} pointerEvents="box-none">
          <Animated.View
            style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.gutter) }, sheet]}
          >
            <View style={styles.handle} />

            <Text style={styles.title}>Canvas Gallery</Text>
            <Text style={styles.body}>
              A pannable wall of {artworks.length} works drawn from the landscape,
              botanical and archaeological archives of the 18th and 19th centuries.
              Drag to explore, tap any work to read its catalogue entry.
            </Text>

            <View style={styles.rule} />

            <Text style={styles.footnote}>
              Artwork photography courtesy of Unsplash. Original interface designed
              in Figma.
            </Text>
          </Animated.View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: colors.scrim },
  wrapper: { justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingTop: 10,
    paddingHorizontal: spacing.gutter,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: spacing.gutter,
  },
  title: { ...type.modalTitle, fontSize: 18 },
  body: { ...type.label, color: colors.textMuted, marginTop: 12, lineHeight: 19 },
  rule: { height: StyleSheet.hairlineWidth, backgroundColor: colors.glassBorder, marginVertical: 18 },
  footnote: { ...type.hud, color: colors.textFaint, lineHeight: 17 },
})
