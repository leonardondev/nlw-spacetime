import { GITHUB_APP_CLIENT_ID } from '@dotenv'
import { BaiJamjuree_700Bold, useFonts } from '@expo-google-fonts/bai-jamjuree'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { useRouter } from 'expo-router'
import { setItemAsync } from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { useCallback, useEffect } from 'react'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { api } from '../src/lib/api'

import blurBgImg from '../src/assets/bg-blur.png'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import Stripes from '../src/assets/stripes.svg'

const StyledStripes = styled(Stripes)
const clientId = GITHUB_APP_CLIENT_ID

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
}

export default function App() {
  const router = useRouter()

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({ scheme: 'nlw-spacetime' }),
    },
    discovery,
  )

  const handleGithubOAuthCode = useCallback(
    async (code: string) => {
      try {
        const registerResponse = await api.post('/register', { code })
        const { token } = registerResponse.data
        await setItemAsync('token', token)

        router.push('/memories')
      } catch (error) {
        console.log(error)
      }
    },
    [router],
  )

  useEffect(() => {
    // console.log(makeRedirectUri({ scheme: 'nlw-spacetime' }))

    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
    }
  }, [response, handleGithubOAuthCode])

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={blurBgImg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
      className="relative flex-1 items-center bg-gray-900 px-8 py-10"
    >
      <StyledStripes className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            COMEÇAR A CADASTRAR
          </Text>
        </TouchableOpacity>
        {/* a */}
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 no NLW da Rocketseat
      </Text>
      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
