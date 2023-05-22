import { BaiJamjuree_700Bold, useFonts } from '@expo-google-fonts/bai-jamjuree'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import React, { useEffect, useState } from 'react'
import { ImageBackground } from 'react-native'

import { SplashScreen, Stack } from 'expo-router'
import blurBgImg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'

const StyledStripes = styled(Stripes)

export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    null | boolean
  >(null)

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBgImg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
      className="relative flex-1  bg-gray-900"
    >
      <StyledStripes className="absolute left-2" />

      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
