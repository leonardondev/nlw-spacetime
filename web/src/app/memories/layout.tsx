import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, Suspense } from 'react'
import MemoryLoading from './loading'

export default function MemoriesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <Suspense fallback={<MemoryLoading />}>{children}</Suspense>
    </div>
  )
}
