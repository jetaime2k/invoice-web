/**
 * 견적서 상세 페이지
 * 견적서 기본 정보, 항목 테이블, 공유 링크 관리, PDF 다운로드 버튼을 표시합니다.
 */
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { QuoteTable } from '@/components/quotes/quote-table'
import { ShareLinkBox } from '@/components/quotes/share-link-box'
import { PdfDownloadButton } from '@/components/quotes/pdf-download-button'
import { getQuoteById } from '@/actions/quotes'
import { getShareLinkByQuoteId } from '@/actions/share-links'
import { formatCurrency } from '@/lib/utils'
import { getStatusBadgeVariant } from '@/lib/quote-utils'

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: QuoteDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const quote = await getQuoteById(id)

  return {
    title: quote ? `${quote.title} - 견적서 상세` : '견적서 상세',
    description: '견적서 상세 내용을 확인하고 공유 링크를 관리하세요',
  }
}

interface QuoteDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function QuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params

  const [quote, shareLink] = await Promise.all([
    getQuoteById(id),
    getShareLinkByQuoteId(id),
  ])

  // 견적서가 없으면 404 처리
  if (!quote) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* 상단 내비게이션: 목록으로 돌아가기 */}
      <div id="pdf-exclude-nav">
        <Link
          href="/quotes"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors"
          aria-label="견적서 목록으로 돌아가기"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          목록으로 돌아가기
        </Link>
      </div>

      {/* PDF 캡처 영역 시작 */}
      <div id="quote-pdf-content">
        {/* 견적서 기본 정보 카드 */}
        <Card className="shadow-sm">
          <CardHeader className="border-b pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-xl">{quote.title}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {quote.invoiceNumber}
                </CardDescription>
              </div>
              {/* 상태 Badge */}
              <Badge
                variant={getStatusBadgeVariant(quote.status)}
                className="mt-0.5"
              >
                {quote.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
              {/* 고객사 */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  고객사
                </p>
                <p className="font-medium">{quote.clientName}</p>
              </div>
              {/* 발행일 */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  발행일
                </p>
                <p className="font-medium">
                  {new Date(quote.issuedAt).toLocaleDateString('ko-KR')}
                </p>
              </div>
              {/* 만료일 */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  만료일
                </p>
                <p className="font-medium">
                  {quote.expiresAt
                    ? new Date(quote.expiresAt).toLocaleDateString('ko-KR')
                    : '없음'}
                </p>
              </div>
              {/* 총 금액 */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  총 금액
                </p>
                <p className="text-xl font-bold tabular-nums">
                  {formatCurrency(quote.totalAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 견적 항목 테이블 */}
        <section aria-labelledby="quote-items-heading">
          <h2
            id="quote-items-heading"
            className="mb-3 text-base font-semibold tracking-tight"
          >
            견적 항목
          </h2>
          <QuoteTable items={quote.items} />
        </section>

        <Separator />
      </div>
      {/* PDF 캡처 영역 끝 */}

      {/* 하단 2열 그리드: 공유 링크 | PDF 다운로드 */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 공유 링크 관리 */}
        <ShareLinkBox shareLink={shareLink} quoteId={quote.id} />

        {/* PDF 다운로드 카드 */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              PDF 다운로드
            </CardTitle>
            <CardDescription>
              견적서를 PDF 파일로 다운로드합니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-muted-foreground text-sm">
                현재 화면의 견적서를 PDF 형식으로 저장할 수 있습니다.
              </p>
              <PdfDownloadButton
                targetId="quote-pdf-content"
                fileName={`${quote.title}_${quote.invoiceNumber}.pdf`}
                variant="outline"
                size="sm"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
