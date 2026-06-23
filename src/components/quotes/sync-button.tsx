'use client'

import { useTransition } from 'react'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { syncNotionData } from '@/actions/sync'

export function SyncButton() {
  const [isPending, startTransition] = useTransition()

  const handleSync = () => {
    startTransition(async () => {
      const result = await syncNotionData()
      if (result.success) {
        toast.success('동기화 완료', { description: result.message })
      } else {
        toast.error('동기화 실패', { description: result.message })
      }
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSync}
      disabled={isPending}
      aria-label={isPending ? 'Notion 동기화 중...' : 'Notion 동기화'}
    >
      <RefreshCw
        className={`mr-2 h-4 w-4 ${isPending ? 'animate-spin' : ''}`}
        aria-hidden="true"
      />
      {isPending ? '동기화 중...' : 'Notion 동기화'}
    </Button>
  )
}
