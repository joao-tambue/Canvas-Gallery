import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { Artwork } from '@/types/artwork'
import { matches } from '@/lib/artwork'
import { colors, radius, spacing, type } from '@/constants/theme'
import { ChevronRightIcon, SearchIcon } from '@/components/ui/Icons'

interface Props {
  visible: boolean
  artworks: Artwork[]
  onClose: () => void
  onSelect: (artwork: Artwork) => void
}

/**
 * The search pill was non-functional on desktop. Search is a core affordance
 * on mobile, so it became a real sheet that filters the collection and can
 * pan the canvas to a result.
 */
export function SearchSheet({ visible, artworks, onClose, onSelect }: Props) {
  const [query, setQuery] = useState('')
  const insets = useSafeAreaInsets()
  const inputRef = useRef<TextInput>(null)
  const progress = useSharedValue(0)

  useEffect(() => {
    if (!visible) return
    setQuery('')
    progress.value = 0
    progress.value = withTiming(1, {
      duration: 260,
      easing: Easing.out(Easing.cubic),
    })
    const id = setTimeout(() => inputRef.current?.focus(), 260)
    return () => clearTimeout(id)
  }, [visible, progress])

  const results = useMemo(
    () => artworks.filter((a) => matches(a, query)),
    [artworks, query]
  )

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
            accessibilityLabel="Close search"
          />
        </Animated.View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.sheetWrapper}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.gutter) }, sheet]}
          >
            <View style={styles.handle} />

            <View style={styles.field}>
              <SearchIcon color={colors.textMuted} />
              <TextInput
                ref={inputRef}
                value={query}
                onChangeText={setQuery}
                placeholder="Search by title, period or archive"
                placeholderTextColor={colors.textFaint}
                style={styles.input}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                accessibilityLabel="Search the collection"
              />
            </View>

            <View style={styles.count}>
              <Text style={styles.countText}>
                {results.length} {results.length === 1 ? 'work' : 'works'}
              </Text>
            </View>

            <View style={styles.results}>
              {results.map((artwork) => (
                <Pressable
                  key={artwork.id}
                  onPress={() => onSelect(artwork)}
                  accessibilityRole="button"
                  accessibilityLabel={artwork.title}
                  style={({ pressed }) => [styles.result, pressed && styles.resultPressed]}
                >
                  <Image
                    source={artwork.image}
                    style={styles.thumb}
                    resizeMode="cover"
                    accessibilityIgnoresInvertColors
                  />
                  <View style={styles.resultText}>
                    <Text style={styles.resultTitle} numberOfLines={1}>
                      {artwork.title}
                    </Text>
                    <Text style={styles.resultMeta} numberOfLines={1}>
                      {artwork.period} · {artwork.location}
                    </Text>
                  </View>
                  <ChevronRightIcon color={colors.textFaint} />
                </Pressable>
              ))}
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { backgroundColor: colors.scrim },
  sheetWrapper: { justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingTop: 10,
    paddingHorizontal: spacing.gutter,
    maxHeight: '80%',
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: spacing.gutter,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 52,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  input: {
    flex: 1,
    ...type.searchPlaceholder,
    color: colors.text,
  },
  count: { paddingTop: 16, paddingBottom: 8 },
  countText: { ...type.hud, color: colors.textFaint },
  results: { paddingBottom: spacing.gutter },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10,
  },
  resultPressed: { opacity: 0.6 },
  thumb: { width: 44, height: 44, borderRadius: 6, backgroundColor: '#1f2020' },
  resultText: { flex: 1, gap: 3 },
  resultTitle: { ...type.cardTitle },
  resultMeta: { ...type.hud, color: colors.textFaint, fontSize: 10 },
})
