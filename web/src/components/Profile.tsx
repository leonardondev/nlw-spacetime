import { getUser } from '@/lib/auth'
import Image from 'next/image'

export function Profile() {
  const { avatarUrl, name } = getUser()

  return (
    <div className="flex items-center gap-3 text-left">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image
          className="h-10 w-10 rounded-full"
          src={avatarUrl}
          alt="Avatar do usuário"
          width={40}
          height={40}
        />
      </div>

      <p className="max-w-[240px] text-sm leading-snug">
        {name}
        <a href="" className="block text-red-400 hover:text-red-300">
          Quero sair
        </a>
      </p>
    </div>
  )
}
