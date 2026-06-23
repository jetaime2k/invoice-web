import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

/**
 * 견적서 공유 페이지 로딩 스켈레톤
 * - /share/[token] 페이지 로딩 중 자동 표시
 * - 클라이언트가 공유 링크 접속 시 토큰 검증 동안 표시
 */
export default function SharedQuoteLoading() {
  return (
    <div className="space-y-6">
      {/* 견적서 제목 영역 */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-32" />
      </div>

      {/* 견적서 발행 정보 카드 */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-28" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 견적 항목 테이블 */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-20" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 헤더 */}
            <div className="flex gap-4 border-b pb-3">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>
            {/* 행 */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-4 py-2">
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
            {/* 합계 */}
            <div className="flex justify-end gap-4 border-t pt-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PDF 다운로드 버튼 */}
      <Skeleton className="h-11 w-44" />
    </div>
  )
}
