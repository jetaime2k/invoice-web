import { Skeleton } from '@/components/ui/skeleton'

/**
 * 견적서 목록 페이지 로딩 스켈레톤
 * - /quotes 페이지 로딩 중 자동 표시
 * - Notion 동기화 및 데이터 페칭 중 UX 유지
 */
export default function QuotesLoading() {
  return (
    <div className="space-y-6">
      {/* 페이지 제목 + 동기화 버튼 영역 */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* 견적서 테이블 스켈레톤 */}
      <div className="rounded-md border">
        {/* 테이블 헤더 */}
        <div className="bg-muted/50 flex gap-4 border-b px-4 py-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="ml-auto h-4 w-16" />
        </div>

        {/* 테이블 행 스켈레톤 (7개) */}
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border-b px-4 py-4 last:border-0"
          >
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-8 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
