import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

/**
 * 인증 영역 로딩 스켈레톤
 * - (auth) 라우트 그룹의 로딩 상태 UI
 * - React Suspense 기반으로 페이지 로딩 중 자동 표시
 */
export default function AuthLoading() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-2">
        {/* 제목 스켈레톤 */}
        <Skeleton className="mx-auto h-7 w-24" />
        {/* 설명 스켈레톤 */}
        <Skeleton className="mx-auto h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 이메일 필드 스켈레톤 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        {/* 비밀번호 필드 스켈레톤 */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
        {/* 버튼 스켈레톤 */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}
