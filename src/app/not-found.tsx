import Link from 'next/link'
import { FileSearch } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * 루트 404 페이지
 * - 존재하지 않는 경로에 접근 시 표시
 * - Next.js App Router의 not-found.tsx 특수 파일
 */
export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center">
        <FileSearch className="text-muted-foreground h-16 w-16" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">404</h1>
          <h2 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h2>
          <p className="text-muted-foreground max-w-md">
            요청하신 페이지가 존재하지 않거나, 이동되었거나, 삭제되었습니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline">로그인</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
