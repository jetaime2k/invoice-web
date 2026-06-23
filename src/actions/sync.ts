'use server'

import { createClient } from '@/lib/supabase/server'
import { getInvoicesFromNotion, getAllItemsGrouped } from '@/lib/notion'
import type { Tables, TablesInsert } from '@/types/database.types'

export type SyncResult = {
  success: boolean
  synced: number
  message: string
}

/**
 * Notion → Supabase 데이터 동기화
 * - Invoices DB 전체 조회 후 quotes 테이블 Upsert
 * - Items DB 전체 조회 후 quote_items 테이블 Upsert
 */
export async function syncNotionData(): Promise<SyncResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, synced: 0, message: '로그인이 필요합니다.' }
  }

  try {
    // users 테이블에서 notion_database_id 조회 후 ENV 폴백
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: userData } = (await (supabase as any)
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()) as { data: Tables<'users'> | null; error: unknown }

    const databaseId =
      userData?.notion_database_id ?? process.env.NOTION_DATABASE_ID!

    const [invoices, itemsGrouped] = await Promise.all([
      getInvoicesFromNotion(databaseId),
      getAllItemsGrouped(),
    ])

    if (invoices.length === 0) {
      return {
        success: true,
        synced: 0,
        message: 'Notion 데이터베이스에 견적서가 없습니다.',
      }
    }

    const now = new Date().toISOString()

    // quotes Upsert — notion_page_id 기준 충돌 처리
    const quotesPayload: TablesInsert<'quotes'>[] = invoices.map(inv => ({
      user_id: user.id,
      notion_page_id: inv.notionPageId,
      invoice_number: inv.invoiceNumber,
      title: inv.title,
      client_name: inv.clientName,
      status: inv.status,
      total_amount: inv.totalAmount,
      issued_at: inv.issuedAt,
      expires_at: inv.expiresAt,
      synced_at: now,
    }))

    // Supabase JS v2: onConflict는 문자열만 지원 — 타입 단언 사용
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabaseAny = supabase as any
    const { data: upsertedQuotes, error: quotesError } = (await supabaseAny
      .from('quotes')
      .upsert(quotesPayload, { onConflict: 'notion_page_id' })
      .select('id, notion_page_id')) as {
      data: { id: string; notion_page_id: string }[] | null
      error: { message: string } | null
    }

    if (quotesError) {
      return {
        success: false,
        synced: 0,
        message: `견적서 동기화 실패: ${quotesError.message}`,
      }
    }

    // quote_items 재삽입
    const itemsPayload: TablesInsert<'quote_items'>[] = []

    upsertedQuotes?.forEach(q => {
      const items = itemsGrouped.get(q.notion_page_id) ?? []
      items.forEach((item, idx) => {
        itemsPayload.push({
          quote_id: q.id,
          name: item.name,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          amount: item.amount,
          sort_order: idx + 1,
        })
      })
    })

    if (itemsPayload.length > 0) {
      const quoteIds = upsertedQuotes?.map(q => q.id) ?? []
      await supabase.from('quote_items').delete().in('quote_id', quoteIds)
      await supabaseAny.from('quote_items').insert(itemsPayload)
    }

    return {
      success: true,
      synced: invoices.length,
      message: `${invoices.length}개 견적서가 동기화되었습니다.`,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : '알 수 없는 오류'
    return { success: false, synced: 0, message: `동기화 실패: ${message}` }
  }
}
