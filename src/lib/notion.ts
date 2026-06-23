import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { QuoteItem } from '@/types/quote'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

// ─── 프로퍼티 추출 헬퍼 ────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>

function getTitle(props: Props, key: string): string {
  const p = props[key]
  if (!p || p.type !== 'title') return ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return p.title.map((t: any) => t.plain_text as string).join('')
}

function getRichText(props: Props, key: string): string {
  const p = props[key]
  if (!p || p.type !== 'rich_text') return ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return p.rich_text.map((t: any) => t.plain_text as string).join('')
}

function getNumber(props: Props, key: string): number {
  const p = props[key]
  if (!p || p.type !== 'number') return 0
  return (p.number as number) ?? 0
}

function getDate(props: Props, key: string): string | null {
  const p = props[key]
  if (!p || p.type !== 'date' || !p.date) return null
  return p.date.start as string
}

function getSelect(props: Props, key: string): string | null {
  const p = props[key]
  if (!p || p.type !== 'select') return null
  return (p.select?.name as string) ?? null
}

function getRelationIds(props: Props, key: string): string[] {
  const p = props[key]
  if (!p || p.type !== 'relation') return []
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return p.relation.map((r: any) => r.id as string)
}

// ─── 도메인 타입 ───────────────────────────────────────────────────────────────

export type NotionInvoiceRow = {
  notionPageId: string
  invoiceNumber: string
  title: string
  clientName: string
  status: '대기' | '발행' | '완료' | '취소'
  totalAmount: number
  issuedAt: string
  expiresAt: string | null
  itemPageIds: string[]
}

// ─── 상태 매핑 ────────────────────────────────────────────────────────────────

function toStatusValue(raw: string | null): '대기' | '발행' | '완료' | '취소' {
  const map: Record<string, '대기' | '발행' | '완료' | '취소'> = {
    대기: '대기',
    발행: '발행',
    완료: '완료',
    취소: '취소',
  }
  return map[raw ?? ''] ?? '대기'
}

// ─── 페이지 변환 ──────────────────────────────────────────────────────────────

function mapInvoicePage(page: PageObjectResponse): NotionInvoiceRow {
  const props = page.properties as Props
  const invoiceNumber = getTitle(props, 'Name')
  const title = getRichText(props, '제목') || invoiceNumber

  return {
    notionPageId: page.id,
    invoiceNumber,
    title,
    clientName: getRichText(props, '클라이언트명'),
    status: toStatusValue(getSelect(props, '상태')),
    totalAmount: getNumber(props, '합계금액'),
    issuedAt:
      getDate(props, '발행일') ?? new Date().toISOString().split('T')[0],
    expiresAt: getDate(props, '유효기간'),
    itemPageIds: getRelationIds(props, 'Items'),
  }
}

function mapItemPage(page: PageObjectResponse): {
  notionPageId: string
  name: string
  quantity: number
  unitPrice: number
  amount: number
  invoicePageIds: string[]
} {
  const props = page.properties as Props
  return {
    notionPageId: page.id,
    name: getTitle(props, 'Name'),
    quantity: getNumber(props, '수량') || 1,
    unitPrice: getNumber(props, '단가'),
    amount: getNumber(props, '금액'),
    invoicePageIds: getRelationIds(props, '견적서'),
  }
}

// ─── Notion 페이지네이션 헬퍼 ────────────────────────────────────────────────

async function queryAllPages(
  databaseId: string
): Promise<PageObjectResponse[]> {
  const results: PageObjectResponse[] = []
  let cursor: string | undefined

  do {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
    })

    const fullPages = response.results.filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (r: any) => r.object === 'page' && 'properties' in r
    ) as PageObjectResponse[]

    results.push(...fullPages)
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined
  } while (cursor)

  return results
}

// ─── 공개 API ─────────────────────────────────────────────────────────────────

/**
 * Invoices 데이터베이스 전체 조회
 */
export async function getInvoicesFromNotion(
  databaseId: string = process.env.NOTION_DATABASE_ID!
): Promise<NotionInvoiceRow[]> {
  const pages = await queryAllPages(databaseId)
  return pages.map(mapInvoicePage).filter(row => row.invoiceNumber)
}

/**
 * Items DB 전체를 Notion Invoice Page ID 기준으로 그룹화하여 반환
 */
export async function getAllItemsGrouped(): Promise<
  Map<string, Omit<QuoteItem, 'quoteId'>[]>
> {
  const pages = await queryAllPages(process.env.NOTION_ITEMS_DATABASE_ID!)
  const grouped = new Map<string, Omit<QuoteItem, 'quoteId'>[]>()

  pages.forEach((page, index) => {
    const row = mapItemPage(page)
    row.invoicePageIds.forEach(invoicePageId => {
      if (!grouped.has(invoicePageId)) grouped.set(invoicePageId, [])
      grouped.get(invoicePageId)!.push({
        id: page.id,
        name: row.name,
        quantity: row.quantity,
        unitPrice: row.unitPrice,
        amount: row.amount,
        sortOrder: index + 1,
      })
    })
  })

  return grouped
}
