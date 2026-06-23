'use server'

import { createClient } from '@/lib/supabase/server'
import type { Quote, QuoteWithItems } from '@/types/quote'
import type { Tables } from '@/types/database.types'

type QuoteRow = Tables<'quotes'>
type QuoteItemRow = Tables<'quote_items'>

function toQuote(row: QuoteRow): Quote {
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
  }
}

/**
 * 로그인한 발행자의 견적서 목록 조회
 */
export async function getQuotes(): Promise<Quote[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('issued_at', { ascending: false })

  if (error) throw new Error(`견적서 목록 조회 실패: ${error.message}`)

  return (data as QuoteRow[]).map(toQuote)
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
    throw new Error(`견적서 조회 실패: ${error.message}`)
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
