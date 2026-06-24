export const QuoteStatus = {
  PENDING: '대기',
  ISSUED: '발행',
  COMPLETED: '완료',
  CANCELLED: '취소',
} as const

export type QuoteStatusValue = (typeof QuoteStatus)[keyof typeof QuoteStatus]

export type Quote = {
  id: string
  userId: string
  notionPageId: string
  invoiceNumber: string
  title: string
  clientName: string
  status: QuoteStatusValue
  totalAmount: number
  issuedAt: string
  expiresAt: string | null
  syncedAt: string
  /** 활성 공유 링크 토큰 (없으면 null) */
  shareToken: string | null
}

export type QuoteItem = {
  id: string
  quoteId: string
  name: string
  quantity: number
  unitPrice: number
  amount: number
  sortOrder: number
}

export type QuoteWithItems = Quote & { items: QuoteItem[] }
