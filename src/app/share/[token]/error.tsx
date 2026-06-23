'use client'

/**
 * 견적서 공유 페이지 에러 바운더리
 * - /share/[token] 에서 발생하는 에러를 처리
 * - 잘못된 토큰, 만료된 링크, 서버 에러 등을 처리
 * - 반드시 'use client' 선언 필요 (React Error Boundary 제약)
 */

import { useEffect } from 'react'
import { AlertCircle, LinkIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface SharedQuoteErrorProps {
  error: Error & { digest?: string }
  // reset: 에러 바운더리 재시도 함수 (공유 페이지는 재시도 버튼 미제공)
  reset: () => void
}

export default function SharedQuoteError({ error }: SharedQuoteErrorProps) {
  useEffect(() => {
    // 에러 로깅 (TODO: 에러 모니터링 서비스 연동)
    console.error('견적서 공유 페이지 에러:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <LinkIcon className="text-muted-foreground h-12 w-12" />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">견적서를 불러올 수 없습니다</h1>
        <p className="text-muted-foreground">
          링크가 만료되었거나 존재하지 않는 견적서입니다.
        </p>
      </div>

      <Alert variant="destructive" className="max-w-md text-left">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>오류 발생</AlertTitle>
        <AlertDescription>
          {error.message || '공유 링크 검증 중 오류가 발생했습니다.'}
        </AlertDescription>
      </Alert>
    </div>
  )
}
