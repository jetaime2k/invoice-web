'use client'

/**
 * 인증 영역 에러 바운더리
 * - (auth) 라우트 그룹에서 발생하는 에러를 처리
 * - 반드시 'use client' 선언 필요 (React Error Boundary 제약)
 */

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface AuthErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function AuthError({ error, reset }: AuthErrorProps) {
  useEffect(() => {
    // 에러 로깅 (TODO: Task 006 인증 구현 시 에러 모니터링 서비스 연동)
    console.error('인증 영역 에러:', error)
  }, [error])

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <AlertCircle className="text-destructive h-5 w-5" />
          <CardTitle className="text-xl">오류가 발생했습니다</CardTitle>
        </div>
        <CardDescription>
          {error.message ||
            '예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={reset} variant="outline" className="w-full gap-2">
          <RefreshCw className="h-4 w-4" />
          다시 시도
        </Button>
      </CardContent>
    </Card>
  )
}
