'use client'

/**
 * 견적서 상세 페이지 에러 바운더리
 * - /quotes/[id] 에서 발생하는 에러를 처리
 * - 반드시 'use client' 선언 필요 (React Error Boundary 제약)
 */

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface QuoteDetailErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function QuoteDetailError({
  error,
  reset,
}: QuoteDetailErrorProps) {
  useEffect(() => {
    // 에러 로깅 (TODO: 에러 모니터링 서비스 연동)
    console.error('견적서 상세 에러:', error)
  }, [error])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">견적서 상세</h1>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>견적서를 불러올 수 없습니다</AlertTitle>
        <AlertDescription>
          {error.message ||
            '견적서 데이터 조회 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'}
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
        <Link href="/quotes">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            목록으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  )
}
