'use server'

import { createClient } from '@/lib/supabase/server'
import type { Quote, QuoteWithItems } from '@/types/quote'
import type { Tables } from '@/types/database.types'

type QuoteRow = Tables<'quotes'>
type QuoteItemRow = Tables<'quote_items'>

/** 견적서 행에 활성 공유 링크 토큰이 포함된 타입 */
type QuoteRowWithShareToken = QuoteRow & {
  share_links: { token: string }[] | null
}

function toQuote(row: QuoteRow, shareToken: string | null = null): Quote {
  return {
    id: row.id,
    userId: row.user_id,
    notionPageId: row.notion_page_id,
    invoiceNumber: row.invoice_number,
    title: row.title,
    clientName: row.client_name,
    status: row.status,
    totalAmount: row.total_amount,
    issuedAt: row.issued_at,
    expiresAt: row.expires_at,
    syncedAt: row.synced_at,
    shareToken,
  }
}

/**
 * 로그인한 발행자의 견적서 목록 조회
 * - 활성 공유 링크 토큰을 LEFT JOIN하여 함께 반환
 */
export async function getQuotes(): Promise<Quote[]> {
  const supabase = await createClient()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('quotes')
    .select('*, share_links!left(token, is_active)')
    .order('issued_at', { ascending: false })

  if (error) {
    console.error('견적서 목록 조회 실패:', error.message)
    return []
  }

  return (data as QuoteRowWithShareToken[]).map(row => {
    // is_active = true 인 링크만 필터링하여 첫 번째 토큰 추출
    const activeLinks = Array.isArray(row.share_links)
      ? (
          row.share_links as Array<{ token: string; is_active: boolean }>
        ).filter(link => link.is_active)
      : []
    const shareToken = activeLinks.length > 0 ? activeLinks[0].token : null
    return toQuote(row, shareToken)
  })
}

/**
 * 견적서 ID로 단건 조회 (항목 포함)
 */
export async function getQuoteById(id: string): Promise<QuoteWithItems | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('quotes')
    .select('*, quote_items(*)')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    console.error('견적서 조회 실패:', error.message)
    return null
  }

  const row = data as QuoteRow & { quote_items: QuoteItemRow[] }

  return {
    ...toQuote(row),
    items: row.quote_items.map((item: QuoteItemRow, index: number) => ({
      id: item.id,
      quoteId: item.quote_id,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unit_price,
      amount: item.amount,
      sortOrder: item.sort_order ?? index,
    })),
  }
}
