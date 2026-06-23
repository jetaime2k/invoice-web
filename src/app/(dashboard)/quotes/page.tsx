/**
 * 견적서 목록 페이지
 * 목업 데이터를 로드하여 견적서 목록을 테이블로 표시합니다.
 * 각 행 클릭 시 상세 페이지로 이동합니다.
 */
import { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { SyncButton } from '@/components/quotes/sync-button'
import { getQuotes } from '@/actions/quotes'
import { getLastSyncedAt } from '@/actions/settings'
import { formatCurrency } from '@/lib/utils'
import { getStatusBadgeVariant } from '@/lib/quote-utils'

export const metadata: Metadata = {
  title: '견적서 목록',
  description: 'Notion 데이터베이스에 등록된 견적서 목록을 확인하세요',
}

export default async function QuotesPage() {
  // 견적서 목록과 마지막 동기화 시간을 병렬로 조회
  const [quotes, lastSyncedAt] = await Promise.all([
    getQuotes(),
    getLastSyncedAt(),
  ])

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 영역: 제목 + 동기화 버튼 */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">견적서 목록</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Notion 데이터베이스에서 동기화된 견적서를 확인합니다.
          </p>
          {/* 마지막 동기화 시간 표시 */}
          <p className="text-muted-foreground mt-1 text-xs">
            {lastSyncedAt
              ? `마지막 동기화: ${new Date(lastSyncedAt).toLocaleString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`
              : '동기화 이력 없음'}
          </p>
        </div>
        {/* Notion 동기화 버튼 (onSync 미제공 시 2초 시뮬레이션) */}
        <SyncButton />
      </div>

      {/* 견적서 테이블 또는 빈 상태 */}
      {quotes.length === 0 ? (
        /* 빈 목록 Empty State */
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-20 text-center">
          <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-full">
            <FileText
              className="text-muted-foreground h-7 w-7"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-lg font-semibold">견적서가 없습니다</h2>
          <p className="text-muted-foreground mt-1 max-w-xs text-sm">
            Notion 데이터베이스와 동기화하면 견적서가 표시됩니다.
          </p>
        </div>
      ) : (
        /* 견적서 목록 테이블 */
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>견적서 제목</TableHead>
                <TableHead>고객사</TableHead>
                <TableHead>발행일</TableHead>
                <TableHead className="text-right">금액</TableHead>
                <TableHead className="text-center">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map(quote => (
                /* 행 전체를 Link로 감싸기 위해 TableRow에 asChild 패턴 적용 */
                <TableRow key={quote.id} className="cursor-pointer">
                  {/* 견적서 제목 셀: 전체 행 클릭 링크 역할 */}
                  <TableCell className="font-medium">
                    <Link
                      href={`/quotes/${quote.id}`}
                      className="block"
                      aria-label={`${quote.title} 상세 보기`}
                    >
                      <span className="block">{quote.title}</span>
                      <span className="text-muted-foreground text-xs font-normal">
                        {quote.invoiceNumber}
                      </span>
                    </Link>
                  </TableCell>
                  {/* 고객사명 */}
                  <TableCell>
                    <Link href={`/quotes/${quote.id}`} className="block">
                      {quote.clientName}
                    </Link>
                  </TableCell>
                  {/* 발행일 */}
                  <TableCell className="text-muted-foreground">
                    <Link href={`/quotes/${quote.id}`} className="block">
                      {new Date(quote.issuedAt).toLocaleDateString('ko-KR')}
                    </Link>
                  </TableCell>
                  {/* 금액 */}
                  <TableCell className="text-right font-medium tabular-nums">
                    <Link href={`/quotes/${quote.id}`} className="block">
                      {formatCurrency(quote.totalAmount)}
                    </Link>
                  </TableCell>
                  {/* 상태 Badge */}
                  <TableCell className="text-center">
                    <Link
                      href={`/quotes/${quote.id}`}
                      className="flex justify-center"
                    >
                      <Badge variant={getStatusBadgeVariant(quote.status)}>
                        {quote.status}
                      </Badge>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
