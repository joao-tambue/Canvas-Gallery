import { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { JetBrainsMono_300Light } from '@expo-google-fonts/jetbrains-mono/300Light'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono/400Regular'
import { colors } from '@/constants/theme'

SplashScreen.preventAutoHideAsync().catch(() => {
  // Already hidden, or unavailable on this platform.
})

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    JetBrainsMono_300Light,
    JetBrainsMono_400Regular,
  })

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync().catch(() => {})
  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) return null

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.stage },
          }}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.stage },
})
