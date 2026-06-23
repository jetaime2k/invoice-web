import { Skeleton } from '@/components/ui/skeleton'

/**
 * 대시보드 영역 로딩 스켈레톤
 * - (dashboard) 라우트 그룹의 기본 로딩 상태 UI
 * - 하위 페이지에 별도 loading.tsx 없을 때 폴백으로 사용
 */
export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 스켈레톤 */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>

      {/* 테이블 스켈레톤 */}
      <div className="space-y-3">
        {/* 테이블 헤더 */}
        <div className="flex gap-4 border-b pb-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* 테이블 행 스켈레톤 (5개) */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex gap-4 py-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>
    </div>
  )
}
