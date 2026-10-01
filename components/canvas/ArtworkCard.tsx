import { memo } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated'
import {
  CARD_IMAGE_HEIGHT,
  CARD_IMAGE_WIDTH,
  CARD_PADDING,
} from '@/lib/artwork'
import type { Artwork } from '@/types/artwork'
import { colors, spacing, type } from '@/constants/theme'
import { DotIcon } from '@/components/ui/Icons'

interface Props {
  artwork: Artwork
  onPress: (artwork: Artwork) => void
  blink: SharedValue<number>
}

export const ArtworkCard = memo(function ArtworkCard({
  artwork,
  onPress,
  blink,
}: Props) {
  const pressed = useSharedValue(0)

  const animated = useAnimatedStyle(() => ({
    // Touch has no hover, so the press compresses instead of lifting.
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.965]) }],
  }))

  const dotStyle = useAnimatedStyle(() => ({ opacity: blink.value }))

  return (
    <Animated.View
      style={[
        styles.card,
        { left: artwork.x, top: artwork.y },
        animated,
      ]}
    >
      <Pressable
        onPressIn={() => {
          pressed.value = withTiming(1, { duration: 90 })
        }}
        onPressOut={() => {
          pressed.value = withSpring(0, { damping: 18, stiffness: 320 })
        }}
        onPress={() => onPress(artwork)}
        accessibilityRole="button"
        accessibilityLabel={`${artwork.title}, ${artwork.period}`}
        accessibilityHint="Opens the artwork details"
      >
        <Image
          source={artwork.image}
          style={styles.image}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        <View style={styles.footer}>
          <Animated.View style={dotStyle}>
            <DotIcon />
          </Animated.View>
          <Text style={type.cardTitle} numberOfLines={1}>
            {artwork.title}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    backgroundColor: colors.surface,
    width: CARD_IMAGE_WIDTH + CARD_PADDING * 2,
    padding: spacing.cardPadding,
    borderRadius: 2,
    overflow: 'hidden',
  },
  image: {
    width: CARD_IMAGE_WIDTH,
    height: CARD_IMAGE_HEIGHT,
    backgroundColor: '#1f2020',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
})
