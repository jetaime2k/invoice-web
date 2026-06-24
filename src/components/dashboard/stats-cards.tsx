/**
 * 대시보드 통계 카드 컴포넌트
 * - 총 견적서 수, 이번 달 발행 건수, 마지막 동기화 시간 표시
 * - Server Component: 데이터를 서버에서 직접 조회
 */
import { CalendarDays, FileText, RefreshCw } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getQuotes } from '@/actions/quotes'
import { getLastSyncedAt } from '@/actions/settings'

export async function StatsCards() {
  // 견적서 목록과 마지막 동기화 시간 병렬 조회
  const [quotes, lastSyncedAt] = await Promise.all([
    getQuotes(),
    getLastSyncedAt(),
  ])

  // 이번 달 발행 건수 계산
  const now = new Date()
  const thisMonthCount = quotes.filter(quote => {
    const issuedDate = new Date(quote.issuedAt)
    return (
      issuedDate.getFullYear() === now.getFullYear() &&
      issuedDate.getMonth() === now.getMonth()
    )
  }).length

  // 마지막 동기화 시간 포맷
  const lastSyncText = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleString('ko-KR', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '동기화 이력 없음'

  const stats = [
    {
      title: '총 견적서',
      value: `${quotes.length}건`,
      description: '전체 등록된 견적서 수',
      icon: FileText,
    },
    {
      title: '이번 달 발행',
      value: `${thisMonthCount}건`,
      description: `${now.getMonth() + 1}월 발행 건수`,
      icon: CalendarDays,
    },
    {
      title: '마지막 동기화',
      value: lastSyncText,
      description: 'Notion 마지막 동기화 시각',
      icon: RefreshCw,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map(stat => (
        <Card key={stat.title} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon
              className="text-muted-foreground h-4 w-4"
              aria-hidden="true"
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{stat.value}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
