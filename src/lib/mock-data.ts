/**
 * 개발 및 UI 마크업 테스트용 목업 데이터
 * Phase 3에서 실제 Supabase + Notion 연동으로 교체될 예정
 * async 래핑: Phase 3 Server Action 교체 시 호출부 수정 최소화
 */
import type { Quote, QuoteItem, QuoteWithItems } from '@/types/quote'
import type { ShareLink } from '@/types/share-link'

// ─── 목업 QuoteItem 데이터 ───────────────────────────────────────────────────

const MOCK_ITEMS_001: QuoteItem[] = [
  {
    id: 'item-001-1',
    quoteId: 'quote-001',
    name: '웹사이트 기획 및 설계',
    quantity: 1,
    unitPrice: 1500000,
    amount: 1500000,
    sortOrder: 1,
  },
  {
    id: 'item-001-2',
    quoteId: 'quote-001',
    name: 'UI/UX 디자인',
    quantity: 1,
    unitPrice: 2000000,
    amount: 2000000,
    sortOrder: 2,
  },
  {
    id: 'item-001-3',
    quoteId: 'quote-001',
    name: '프론트엔드 개발 (Next.js)',
    quantity: 1,
    unitPrice: 3500000,
    amount: 3500000,
    sortOrder: 3,
  },
  {
    id: 'item-001-4',
    quoteId: 'quote-001',
    name: '백엔드 API 개발',
    quantity: 1,
    unitPrice: 2500000,
    amount: 2500000,
    sortOrder: 4,
  },
  {
    id: 'item-001-5',
    quoteId: 'quote-001',
    name: '배포 및 인프라 설정',
    quantity: 1,
    unitPrice: 500000,
    amount: 500000,
    sortOrder: 5,
  },
]

const MOCK_ITEMS_002: QuoteItem[] = [
  {
    id: 'item-002-1',
    quoteId: 'quote-002',
    name: '모바일 앱 기획',
    quantity: 1,
    unitPrice: 1200000,
    amount: 1200000,
    sortOrder: 1,
  },
  {
    id: 'item-002-2',
    quoteId: 'quote-002',
    name: 'React Native 개발 (iOS/Android)',
    quantity: 1,
    unitPrice: 5000000,
    amount: 5000000,
    sortOrder: 2,
  },
  {
    id: 'item-002-3',
    quoteId: 'quote-002',
    name: 'API 연동 및 테스트',
    quantity: 1,
    unitPrice: 1800000,
    amount: 1800000,
    sortOrder: 3,
  },
]

const MOCK_ITEMS_003: QuoteItem[] = [
  {
    id: 'item-003-1',
    quoteId: 'quote-003',
    name: '브랜드 아이덴티티 디자인',
    quantity: 1,
    unitPrice: 800000,
    amount: 800000,
    sortOrder: 1,
  },
  {
    id: 'item-003-2',
    quoteId: 'quote-003',
    name: '로고 디자인 (3안 제시)',
    quantity: 3,
    unitPrice: 300000,
    amount: 900000,
    sortOrder: 2,
  },
  {
    id: 'item-003-3',
    quoteId: 'quote-003',
    name: '명함 및 레터헤드 디자인',
    quantity: 1,
    unitPrice: 400000,
    amount: 400000,
    sortOrder: 3,
  },
  {
    id: 'item-003-4',
    quoteId: 'quote-003',
    name: '브랜드 가이드라인 문서 제작',
    quantity: 1,
    unitPrice: 600000,
    amount: 600000,
    sortOrder: 4,
  },
]

// ─── 목업 Quote 데이터 ────────────────────────────────────────────────────────

export const MOCK_QUOTES: QuoteWithItems[] = [
  {
    id: 'quote-001',
    userId: 'user-001',
    notionPageId: 'notion-page-001',
    invoiceNumber: 'INV-2024-001',
    title: '기업 웹사이트 구축 프로젝트',
    clientName: '(주)테크스타트업',
    status: '발행',
    totalAmount: 10000000,
    issuedAt: '2024-11-01',
    expiresAt: '2024-12-01',
    syncedAt: '2024-11-01T09:00:00Z',
    items: MOCK_ITEMS_001,
  },
  {
    id: 'quote-002',
    userId: 'user-001',
    notionPageId: 'notion-page-002',
    invoiceNumber: 'INV-2024-002',
    title: '모바일 앱 개발 (iOS/Android)',
    clientName: '(주)커머스플러스',
    status: '대기',
    totalAmount: 8000000,
    issuedAt: '2024-11-15',
    expiresAt: '2024-12-15',
    syncedAt: '2024-11-15T14:30:00Z',
    items: MOCK_ITEMS_002,
  },
  {
    id: 'quote-003',
    userId: 'user-001',
    notionPageId: 'notion-page-003',
    invoiceNumber: 'INV-2024-003',
    title: '브랜드 아이덴티티 디자인 패키지',
    clientName: '스타트업 브랜딩',
    status: '완료',
    totalAmount: 2700000,
    issuedAt: '2024-10-01',
    expiresAt: null,
    syncedAt: '2024-10-01T10:00:00Z',
    items: MOCK_ITEMS_003,
  },
]

// ─── 목업 ShareLink 데이터 ────────────────────────────────────────────────────

export const MOCK_SHARE_LINKS: ShareLink[] = [
  {
    id: 'share-001',
    quoteId: 'quote-001',
    token: 'abc123def456',
    isActive: true,
    createdAt: '2024-11-02T10:00:00Z',
  },
  {
    id: 'share-002',
    quoteId: 'quote-003',
    token: 'xyz789ghi012',
    isActive: false,
    createdAt: '2024-10-05T09:00:00Z',
  },
]

// ─── 비동기 조회 헬퍼 함수 ────────────────────────────────────────────────────

/**
 * 모든 견적서 목록 반환
 * Phase 3에서 Supabase 쿼리로 교체 예정
 */
export async function getMockQuotes(): Promise<Quote[]> {
  // items 필드를 제외하고 Quote 타입만 반환 (구조 분해 후 나머지 반환)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return MOCK_QUOTES.map(({ items: _, ...quote }) => quote)
}

/**
 * ID로 견적서 단건 조회 (항목 포함)
 * Phase 3에서 Supabase 쿼리로 교체 예정
 */
export async function getMockQuoteById(
  id: string
): Promise<QuoteWithItems | null> {
  return MOCK_QUOTES.find(q => q.id === id) ?? null
}

/**
 * 토큰으로 공유 링크 조회
 * Phase 3에서 Supabase 쿼리로 교체 예정
 */
export async function getMockShareLinkByToken(
  token: string
): Promise<ShareLink | null> {
  return MOCK_SHARE_LINKS.find(sl => sl.token === token) ?? null
}

/**
 * 견적서 ID로 공유 링크 조회
 * Phase 3에서 Supabase 쿼리로 교체 예정
 */
export async function getMockShareLinkByQuoteId(
  quoteId: string
): Promise<ShareLink | null> {
  return MOCK_SHARE_LINKS.find(sl => sl.quoteId === quoteId) ?? null
}
