import { memo, useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { CARD_PADDING } from '@/lib/artwork'
import type { Artwork } from '@/types/artwork'
import { colors, spacing, type } from '@/constants/theme'
import { DotIcon } from '@/components/ui/Icons'

interface Props {
  artwork: Artwork
  onPress: (artwork: Artwork) => void
}

export const ArtworkCard = memo(function ArtworkCard({ artwork, onPress }: Props) {
  const pressed = useSharedValue(0)
  const dotOpacity = useSharedValue(1)

  useEffect(() => {
    dotOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.quad) })
      ),
      -1,
      false
    )
  }, [dotOpacity])

  const animated = useAnimatedStyle(() => ({
    // Touch has no hover, so the press compresses instead of lifting.
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.965]) }],
  }))

  const dotStyle = useAnimatedStyle(() => ({ opacity: dotOpacity.value }))

  return (
    <Animated.View
      style={[
        styles.card,
        { left: artwork.x, top: artwork.y, width: artwork.width + CARD_PADDING * 2 },
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
          style={[
            styles.image,
            { aspectRatio: artwork.width / artwork.height },
          ]}
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
    padding: spacing.cardPadding,
    borderRadius: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    backgroundColor: '#1f2020',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
  },
})
