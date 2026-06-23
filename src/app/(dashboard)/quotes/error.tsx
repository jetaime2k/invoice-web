'use client'

/**
 * 견적서 목록 페이지 에러 바운더리
 * - /quotes 에서 발생하는 에러를 처리 (Notion 동기화 실패 등)
 * - 반드시 'use client' 선언 필요 (React Error Boundary 제약)
 */

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface QuotesErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function QuotesError({ error, reset }: QuotesErrorProps) {
  useEffect(() => {
    // 에러 로깅 (TODO: 에러 모니터링 서비스 연동)
    console.error('견적서 목록 에러:', error)
  }, [error])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">견적서 목록</h1>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>견적서 목록을 불러올 수 없습니다</AlertTitle>
        <AlertDescription>
          {error.message ||
            'Notion 데이터 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
        </AlertDescription>
      </Alert>

      <Button onClick={reset} variant="outline" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        다시 시도
      </Button>
    </div>
  )
}
