/**
 * 견적서 공유 페이지
 * 공유 토큰으로 견적서를 열람하는 클라이언트 전용 페이지입니다.
 * - 토큰 미존재 또는 비활성화 시 인라인 안내 UI 표시
 * - 유효한 토큰 시 견적서 정보 + 항목 테이블 + PDF 다운로드 버튼 표시
 */
import { Metadata } from 'next'
import { AlertCircle, FileX } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { PdfDownloadButton } from '@/components/quotes/pdf-download-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { QuoteTable } from '@/components/quotes/quote-table'
import { getShareLinkByToken } from '@/actions/share-links'
import { getQuoteById } from '@/actions/quotes'
import { formatCurrency } from '@/lib/utils'
import { getStatusBadgeVariant } from '@/lib/quote-utils'

export const metadata: Metadata = {
  title: '견적서 공유',
  description: '공유받은 견적서를 확인하고 PDF로 다운로드하세요',
}

interface SharedQuotePageProps {
  params: Promise<{ token: string }>
}

export default async function SharedQuotePage({
  params,
}: SharedQuotePageProps) {
  const { token } = await params

  const shareLink = await getShareLinkByToken(token)

  // 토큰이 유효하지 않을 때
  if (!shareLink) {
    return (
      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md text-center shadow-sm">
          <CardContent className="pt-8 pb-8">
            <div className="bg-destructive/10 mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <FileX className="text-destructive h-7 w-7" aria-hidden="true" />
            </div>
            <h1 className="text-destructive text-xl font-semibold">
              유효하지 않은 링크입니다
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              요청하신 견적서 링크가 존재하지 않거나 만료되었습니다. 링크를 다시
              확인하거나 견적서 발행자에게 문의하세요.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // 링크가 비활성화된 경우
  if (!shareLink.isActive) {
    return (
      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md text-center shadow-sm">
          <CardContent className="pt-8 pb-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
              <AlertCircle
                className="h-7 w-7 text-amber-500"
                aria-hidden="true"
              />
            </div>
            <h1 className="text-xl font-semibold">비활성화된 링크입니다</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              이 공유 링크는 더 이상 유효하지 않습니다. 견적서 발행자에게 새로운
              공유 링크를 요청하세요.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const quote = await getQuoteById(shareLink.quoteId)

  // 견적서가 없는 경우 (데이터 정합성 오류)
  if (!quote) {
    return (
      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md text-center shadow-sm">
          <CardContent className="pt-8 pb-8">
            <div className="bg-muted mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full">
              <AlertCircle
                className="text-muted-foreground h-7 w-7"
                aria-hidden="true"
              />
            </div>
            <h1 className="text-xl font-semibold">유효하지 않은 링크입니다</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              견적서 정보를 찾을 수 없습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* PDF 캡처 영역 */}
      <div id="shared-quote-pdf-content">
        {/* 페이지 제목 */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{quote.title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {quote.invoiceNumber}
          </p>
        </div>

        {/* 견적서 기본 정보 카드 */}
        <Card className="shadow-sm">
          <CardHeader className="border-b pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-base">견적서 정보</CardTitle>
                <CardDescription>
                  발행일: {new Date(quote.issuedAt).toLocaleDateString('ko-KR')}
                </CardDescription>
              </div>
              {/* 상태 Badge */}
              <Badge variant={getStatusBadgeVariant(quote.status)}>
                {quote.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
              {/* 고객사 */}
              <div className="space-y-1">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  고객사
                </p>
                <p className="font-medium">{quote.clientName}</p>
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
        <section aria-labelledby="shared-quote-items-heading">
          <h2
            id="shared-quote-items-heading"
            className="mb-3 text-base font-semibold tracking-tight"
          >
            견적 항목
          </h2>
          <QuoteTable items={quote.items} />
        </section>

        <Separator />
      </div>
      {/* PDF 캡처 영역 끝 */}

      {/* PDF 다운로드 버튼 영역 */}
      <div className="flex justify-end">
        <PdfDownloadButton
          targetId="shared-quote-pdf-content"
          fileName={`${quote.title}_${quote.invoiceNumber}.pdf`}
        />
      </div>
    </div>
  )
}
