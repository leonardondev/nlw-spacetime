import Image from 'next/image'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'

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
        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            readOnly
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            checked={memory.isPublic}
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
          />
          Memória pública
        </label>
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
