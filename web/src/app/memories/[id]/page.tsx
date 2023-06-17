import Image from 'next/image'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import { ShareButton } from '@/components/ShareButton'

interface Memory {
  id: string
  userId: string
  coverUrl: string
  content: string
  isPublic: boolean
  createdAt: string
}

export default async function MemoryDetails({ params }: any) {
  const token = cookies().get('token')?.value

  const response = await api.get<Memory>(`/memories/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memory = response.data

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        {memory.isPublic ? (
          <>
            <span className="rounded-md bg-purple-500 px-2 py-0.5 text-sm text-gray-50">
              Memória Pública
            </span>
            <ShareButton />
          </>
        ) : (
          <span className="rounded-md bg-green-500 px-2 py-0.5 text-sm text-gray-700">
            Memória Privada
          </span>
        )}
      </div>

      <Image
        src={memory.coverUrl ?? ''}
        alt=""
        className="aspect-video w-full rounded-lg object-cover"
        width={592}
        height={280}
      />

      <p className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0">
        {memory.content}
      </p>
    </div>
  )
}
