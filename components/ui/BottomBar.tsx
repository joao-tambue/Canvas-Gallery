import { memo } from 'react'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { absoluteFill, colors, radius, spacing, type } from '@/constants/theme'
import { MenuIcon, SearchIcon } from '@/components/ui/Icons'

interface Props {
  onSearchPress: () => void
  onMenuPress: () => void
}

export const BottomBar = memo(function BottomBar({
  onSearchPress,
  onMenuPress,
}: Props) {
  return (
    <View style={styles.root} pointerEvents="box-none">
      <Pressable onPress={onMenuPress} accessibilityRole="button" accessibilityLabel="About">
        <Glass align="center">
          <View style={styles.menuInner}>
            <MenuIcon size={16} />
          </View>
        </Glass>
      </Pressable>

      <Pressable
        onPress={onSearchPress}
        accessibilityRole="search"
        accessibilityLabel="Search the collection"
        style={styles.searchHit}
      >
        <Glass align="flex-start">
          <View style={styles.searchInner}>
            <SearchIcon />
            <Text style={type.searchPlaceholder} numberOfLines={1}>
              Search
            </Text>
          </View>
        </Glass>
      </Pressable>
    </View>
  )
})

function Glass({ children, align }: { children: ReactNode; align: 'center' | 'flex-start' }) {
  return (
    <View style={styles.glass}>
      <BlurView intensity={35} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.glassFill} pointerEvents="none" />
      <View
        style={[
          styles.glassContent,
          align === 'flex-start' && styles.glassContentStart,
          align === 'center' && styles.menuInner,
        ]}
      >
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.gutter - 4,
    paddingHorizontal: spacing.gutter,
  },
  searchHit: { flex: 1 },
  glass: {
    overflow: 'hidden',
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.glassBorder,
  },
  glassFill: { ...absoluteFill, backgroundColor: colors.glass },
  glassContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
  },
  glassContentStart: { justifyContent: 'flex-start', paddingHorizontal: 20 },
  menuInner: { width: 48 },
  searchInner: { flexDirection: 'row', alignItems: 'center', gap: 10 },
})
