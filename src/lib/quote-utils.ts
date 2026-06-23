import type { QuoteStatusValue } from '@/types/quote'

export function getStatusBadgeVariant(
  status: QuoteStatusValue
): 'default' | 'secondary' | 'outline' | 'destructive' {
  switch (status) {
    case '발행':
      return 'default'
    case '대기':
      return 'secondary'
    case '완료':
      return 'outline'
    case '취소':
      return 'destructive'
    default:
      return 'secondary'
  }
}
