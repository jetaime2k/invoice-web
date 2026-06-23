// TODO: Task 007 Notion API 연동 시 @notionhq/client 실제 타입으로 교체

export type NotionPropertyType =
  | 'title'
  | 'rich_text'
  | 'number'
  | 'date'
  | 'select'
  | 'multi_select'
  | 'checkbox'
  | 'url'
  | 'relation'
  | 'formula'
  | 'rollup'

// 공통 서브타입

export type NotionRichText = {
  plain_text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

export type NotionSelectOption = {
  id: string
  name: string
  color: string
}

export type NotionRelationItem = {
  id: string
}

// 기본 페이지/프로퍼티 타입

export type NotionPage = {
  id: string
  created_time: string
  last_edited_time: string
  properties: Record<string, NotionProperty>
}

export type NotionProperty = {
  id: string
  type: NotionPropertyType
  [key: string]: unknown
}

export type NotionDatabase = {
  id: string
  title: Array<{ plain_text: string }>
  properties: Record<string, NotionProperty>
}

// 노션 Invoices 데이터베이스 프로퍼티 타입 (CSV 실제 컬럼 기반)

export type InvoiceNotionProperties = {
  Name: { type: 'title'; title: NotionRichText[] }
  제목: { type: 'rich_text'; rich_text: NotionRichText[] }
  클라이언트명: { type: 'rich_text'; rich_text: NotionRichText[] }
  발행일: { type: 'date'; date: { start: string; end: string | null } | null }
  상태: { type: 'select'; select: NotionSelectOption | null }
  유효기간: { type: 'date'; date: { start: string; end: string | null } | null }
  합계금액: { type: 'number'; number: number | null }
  Items: { type: 'relation'; relation: NotionRelationItem[] }
}

// 노션 Items 데이터베이스 프로퍼티 타입 (CSV 실제 컬럼 기반)

export type ItemNotionProperties = {
  Name: { type: 'title'; title: NotionRichText[] }
  견적서: { type: 'relation'; relation: NotionRelationItem[] }
  금액: { type: 'number'; number: number | null }
  단가: { type: 'number'; number: number | null }
  수량: { type: 'number'; number: number | null }
}

// 구체화된 페이지 타입

export type InvoiceNotionPage = Omit<NotionPage, 'properties'> & {
  properties: InvoiceNotionProperties
}

export type ItemNotionPage = Omit<NotionPage, 'properties'> & {
  properties: ItemNotionProperties
}
