'use client'

/**
 * 대시보드 영역 에러 바운더리
 * - (dashboard) 라우트 그룹에서 발생하는 에러를 처리
 * - 반드시 'use client' 선언 필요 (React Error Boundary 제약)
 */

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface DashboardErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    // 에러 로깅 (TODO: 에러 모니터링 서비스 연동)
    console.error('대시보드 에러:', error)
  }, [error])

  return (
    <div className="flex flex-col gap-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>오류가 발생했습니다</AlertTitle>
        <AlertDescription>
          {error.message || '데이터를 불러오는 중 오류가 발생했습니다.'}
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        <Button onClick={reset} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
        <Link href="/quotes">
          <Button variant="ghost" className="gap-2">
            <Home className="h-4 w-4" />
            목록으로
          </Button>
        </Link>
      </div>
    </div>
  )
}
