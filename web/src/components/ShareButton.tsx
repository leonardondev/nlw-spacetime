'use client'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Share2 } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import alerts from '@/lib/alerts'

export function ShareButton() {
  const [, copyToClipboard] = useCopyToClipboard(null)

  async function handleCopyToClipboard() {
    await copyToClipboard(window.location.href)
    alerts.alertInfo('link copiado para a área de transferência')
  }

  return (
    <>
      <button
        onClick={handleCopyToClipboard}
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <Share2 className="h-4 w-4" />
        compartilhar
        <ToastContainer />
      </button>
    </>
  )
}
