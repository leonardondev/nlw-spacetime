import Icon from '@expo/vector-icons/Feather'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { Link } from 'expo-router'
import { getItemAsync } from 'expo-secure-store'
import { Image, ScrollView, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useEffect, useState } from 'react'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

dayjs.locale(ptBr)

export default function Memories() {
  const { bottom, top } = useSafeAreaInsets()

  const [memories, setMemories] = useState<Memory[]>([])

  async function loadMemories() {
    const token = await getItemAsync('token')

    const response = await api.get<Memory[]>('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <Link href="/new" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
            <Icon name="plus" size={16} color="#000" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View key={memory.id}>
            {/* date */}
            <View className="mb-4 flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
              </Text>
            </View>

            {/* memory */}
            <View className="space-y-4 px-8">
              <Image
                className="aspect-video w-full rounded-lg"
                source={{
                  uri: memory.coverUrl,
                }}
                alt=""
              />
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <View className="flex-row self-start">
                <Link href={`/memories/id`} asChild>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    className="flex-row items-center space-x-2"
                  >
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-right" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}
