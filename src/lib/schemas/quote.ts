import { z } from 'zod'

// QuoteStatus Zod enum (src/types/quote.ts의 QuoteStatus와 동기화 유지)
export const quoteStatusSchema = z.enum(['대기', '발행', '완료', '취소'])

// Notion API 응답 → Quote 파싱 스키마
export const quoteFromNotionSchema = z.object({
  invoiceNumber: z.string().min(1),
  title: z.string().min(1),
  clientName: z.string().min(1),
  status: quoteStatusSchema.default('대기'),
  totalAmount: z.number().nonnegative(),
  issuedAt: z.string(),
  expiresAt: z.string().nullable(),
})

// QuoteItem 검증 스키마
export const quoteItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  amount: z.number().nonnegative(),
  sortOrder: z.number().int().nonnegative().default(0),
})

// 공유 링크 토큰 검증 스키마
export const shareTokenSchema = z.string().uuid()

export type QuoteFromNotionInput = z.input<typeof quoteFromNotionSchema>
export type QuoteFromNotion = z.output<typeof quoteFromNotionSchema>
export type QuoteItemInput = z.input<typeof quoteItemSchema>
