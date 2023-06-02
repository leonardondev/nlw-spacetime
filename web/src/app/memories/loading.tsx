'use client'

export default function MemoryLoading() {
  return (
    <div>
      <div className="flex flex-1 flex-col gap-4">
        <div className="shimmer-effect block h-5 w-80 rounded-lg" />
        <div className="shimmer-effect aspect-video w-full rounded-lg" />
        <div className="shimmer-effect h-72 w-full rounded-lg" />
      </div>
    </div>
  )
}
