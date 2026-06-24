/**
 * 견적서 목록 페이지
 * - 상단 통계 카드(총 견적서 수, 이번 달 발행, 마지막 동기화) 표시
 * - 견적서 테이블 또는 빈 상태 표시
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
import { StatsCards } from '@/components/dashboard/stats-cards'
import { CopyLinkButton } from '@/components/quotes/copy-link-button'
import { getQuotes } from '@/actions/quotes'
import { formatCurrency } from '@/lib/utils'
import { getStatusBadgeVariant } from '@/lib/quote-utils'

export const metadata: Metadata = {
  title: '견적서 목록',
  description: 'Notion 데이터베이스에 등록된 견적서 목록을 확인하세요',
}

export default async function QuotesPage() {
  // 공유 토큰 포함 견적서 목록 조회
  const quotes = await getQuotes()

  return (
    <div className="space-y-6">
      {/* 통계 카드 3개 */}
      <StatsCards />

      {/* 페이지 헤더 영역: 제목 + 동기화 버튼 */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">견적서 목록</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Notion 데이터베이스에서 동기화된 견적서를 확인합니다.
          </p>
        </div>
        {/* Notion 동기화 버튼 */}
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
                <TableHead className="text-center">링크</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map(quote => (
                /* 각 행: 제목·고객사·날짜·금액·상태는 상세 페이지 링크, 링크 컬럼은 클립보드 복사 버튼 */
                <TableRow key={quote.id} className="cursor-pointer">
                  {/* 견적서 제목 셀 */}
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
                  {/* 링크 복사 버튼: CopyLinkButton 내부에서 이벤트 전파 차단 처리 */}
                  <TableCell className="text-center">
                    <CopyLinkButton
                      quoteId={quote.id}
                      shareToken={quote.shareToken ?? null}
                    />
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
