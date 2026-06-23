// 노션 CSV 데이터 파싱 및 앱 전역 상수

// KRW 통화 포맷터 (서버/클라이언트 모두 사용)
export const CURRENCY_FORMAT_KRW = new Intl.NumberFormat('ko-KR', {
  style: 'currency',
  currency: 'KRW',
})

/**
 * 노션 CSV 한국어 날짜 → ISO 날짜 문자열 변환
 * "2026년 6월 18일" → "2026-06-18"
 */
export function parseKoreanDate(korDate: string): string {
  const match = korDate.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/)
  if (!match) throw new Error(`파싱 불가능한 날짜 형식: ${korDate}`)
  const [, year, month, day] = match
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

/**
 * 노션 CSV 통화 문자열 → 숫자 변환
 * "₩3,000,000" → 3000000
 */
export function parseCurrencyString(value: string): number {
  const cleaned = value.replace(/[₩,\s]/g, '')
  const parsed = Number(cleaned)
  if (isNaN(parsed)) throw new Error(`파싱 불가능한 금액 형식: ${value}`)
  return parsed
}

/**
 * 인보이스 번호 생성
 * (year=2026, seq=1) → "INV-2026-001"
 */
export function generateInvoiceNumber(year: number, seq: number): string {
  return `INV-${year}-${String(seq).padStart(3, '0')}`
}
