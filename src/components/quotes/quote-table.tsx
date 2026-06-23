/**
 * 견적서 항목 테이블 컴포넌트
 * QuoteItem 배열을 받아 항목명, 수량, 단가, 금액을 표시하고
 * TableFooter에 합계를 표시합니다.
 * Server Component (use client 없음)
 */
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { QuoteItem } from '@/types/quote'
import { formatCurrency } from '@/lib/utils'

// Props 타입 정의
interface QuoteTableProps {
  items: QuoteItem[]
}

export function QuoteTable({ items }: QuoteTableProps) {
  // sortOrder 기준 오름차순 정렬 (원본 배열 변경 방지)
  const sortedItems = [...items].sort((a, b) => a.sortOrder - b.sortOrder)

  // 합계 금액 계산
  const totalAmount = sortedItems.reduce((sum, item) => sum + item.amount, 0)

  // 빈 항목 처리
  if (sortedItems.length === 0) {
    return (
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {/* 테이블 헤더 행 */}
              <TableHead>항목명</TableHead>
              <TableHead className="w-24 text-right">수량</TableHead>
              <TableHead className="w-32 text-right">단가</TableHead>
              <TableHead className="w-32 text-right">금액</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground h-24 text-center"
              >
                항목이 없습니다
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        {/* 테이블 헤더 */}
        <TableHeader>
          <TableRow>
            <TableHead>항목명</TableHead>
            <TableHead className="w-24 text-right">수량</TableHead>
            <TableHead className="w-32 text-right">단가</TableHead>
            <TableHead className="w-32 text-right">금액</TableHead>
          </TableRow>
        </TableHeader>

        {/* 테이블 본문 */}
        <TableBody>
          {sortedItems.map(item => (
            <TableRow key={item.id}>
              {/* 항목명 */}
              <TableCell className="font-medium">{item.name}</TableCell>
              {/* 수량 */}
              <TableCell className="text-right">
                {item.quantity.toLocaleString('ko-KR')}
              </TableCell>
              {/* 단가 */}
              <TableCell className="text-right">
                {formatCurrency(item.unitPrice)}
              </TableCell>
              {/* 금액 */}
              <TableCell className="text-right">
                {formatCurrency(item.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* 합계 행 */}
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold">
              합계
            </TableCell>
            <TableCell className="text-right font-semibold">
              {formatCurrency(totalAmount)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
