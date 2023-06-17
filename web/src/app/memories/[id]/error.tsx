'use client' // Error components must be Client Components

import { useEffect } from 'react'

interface ErrorProps {
  error: Error
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
    console.log(error.message)
  }, [error])

  if (error.message.includes('401')) {
    return (
      <div className="flex flex-1 items-center justify-center p-16">
        <p className="w-[360px] text-center text-2xl leading-relaxed">
          Você não tem autorização para visualizar esta lembrança!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center p-16">
      <p className="w-[360px] text-center text-2xl leading-relaxed">
        Ocorreu um erro
      </p>
    </div>
  )
}
