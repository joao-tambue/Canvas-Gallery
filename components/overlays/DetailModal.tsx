import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import type { Artwork } from '@/types/artwork'
import { colors, radius, spacing, type } from '@/constants/theme'
import { CloseIcon } from '@/components/ui/Icons'

interface Props {
  artwork: Artwork | null
  onClose: () => void
}

const spring = {
  duration: 340,
  easing: Easing.out(Easing.cubic),
}

export function DetailModal({ artwork, onClose }: Props) {
  const { width } = useWindowDimensions()
  const progress = useSharedValue(0)

  /**
   * The card being displayed is held separately from `artwork` so the exit
   * transition still has something to render after the parent clears selection.
   */
  const [content, setContent] = useState<Artwork | null>(artwork)
  const hasContent = useRef(content !== null)

  const clear = useCallback(() => {
    setContent(null)
    hasContent.current = false
  }, [])

  useEffect(() => {
    if (artwork) {
      hasContent.current = true
      setContent(artwork)
      progress.value = 0
      progress.value = withTiming(1, spring)
    } else if (hasContent.current) {
      progress.value = withTiming(
        0,
        { duration: 200, easing: Easing.in(Easing.quad) },
        (finished) => {
          if (finished) runOnJS(clear)()
        }
      )
    }
  }, [artwork, clear, progress])

  const backdrop = useAnimatedStyle(() => ({ opacity: progress.value }))

  const card = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { scale: 0.88 + progress.value * 0.12 },
      { translateY: (1 - progress.value) * 48 },
    ],
  }))

  if (!content) return null

  return (
    <Modal
      visible
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.root}>
        <Animated.View style={[StyleSheet.absoluteFill, backdrop]}>
          <Pressable
            style={[StyleSheet.absoluteFill, styles.backdrop]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close details"
          />
        </Animated.View>

        <View style={styles.center} pointerEvents="box-none">
          <Animated.View style={[styles.card, { width: Math.min(width - 48, 360) }, card]}>
            <ScrollView
              bounces={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.content}
            >
              <Text style={styles.title}>{content.title}</Text>

              <Image
                source={content.image}
                style={[styles.image, { aspectRatio: content.width / content.height }]}
                resizeMode="cover"
                accessibilityIgnoresInvertColors
              />

              <View style={styles.meta}>
                <MetaRow label="Period" value={content.period} />
                <MetaRow label="Location" value={content.location} />
              </View>

              <Text style={styles.description}>{content.description}</Text>
            </ScrollView>

            <Pressable
              onPress={onClose}
              hitSlop={12}
              style={styles.close}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <CloseIcon size={11} />
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </Modal>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}:</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: colors.scrim },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    maxHeight: '86%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  content: {
    paddingTop: 30,
    paddingBottom: spacing.gutter,
    paddingHorizontal: spacing.gutter,
  },
  title: {
    ...type.modalTitle,
    marginBottom: 14,
  },
  image: {
    width: '100%',
    backgroundColor: '#1f2020',
  },
  meta: {
    marginTop: 16,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 9,
    ...type.label,
  },
  metaLabel: { ...type.label },
  metaValue: { ...type.label, color: colors.textMuted },
  description: {
    ...type.label,
    marginTop: 12,
    lineHeight: 18,
  },
  close: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
    ...Platform.select({ web: { cursor: 'pointer' } }),
  },
})
