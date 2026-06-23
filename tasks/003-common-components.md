# Task 003: 공통 컴포넌트 구현

## 개요

견적서 UI에 필요한 공통 컴포넌트들을 구현합니다.
Table 컴포넌트 설치, 목업 데이터 생성, QuoteTable / SyncButton / ShareLinkBox 컴포넌트 구현을 포함합니다.

## 관련 파일

- `src/components/ui/table.tsx` — shadcn Table 컴포넌트 (신규 설치)
- `src/lib/mock-data.ts` — 개발용 목업 데이터 및 비동기 헬퍼 함수 (신규)
- `src/lib/utils.ts` — formatCurrency 유틸 추가
- `src/components/quotes/quote-table.tsx` — 견적서 항목 테이블 컴포넌트 (신규)
- `src/components/quotes/sync-button.tsx` — Notion 동기화 버튼 컴포넌트 (신규)
- `src/components/quotes/share-link-box.tsx` — 공유 링크 관리 컴포넌트 (신규)

## 수락 기준

- [ ] Table 컴포넌트 설치 완료 (`src/components/ui/table.tsx`)
- [ ] MOCK_QUOTES 3건, 각 3~5개 QuoteItem 포함
- [ ] MOCK_SHARE_LINKS 데이터 존재
- [ ] getMockQuotes / getMockQuoteById / getMockShareLinkByToken / getMockShareLinkByQuoteId 함수 동작
- [ ] formatCurrency(1500000) → "₩1,500,000" 형식 반환
- [ ] QuoteTable: shadcn Table 사용, sortOrder 정렬, TableFooter 합계
- [ ] QuoteTable: 빈 items 처리
- [ ] SyncButton: isPending 상태, RefreshCw 아이콘 animate-spin
- [ ] ShareLinkBox: null / 활성 / 비활성 세 가지 상태 처리
- [ ] `npm run check-all` 통과

## 구현 단계

- [x] tasks/003-common-components.md 작업 파일 생성
- [x] npx shadcn@latest add table 실행
- [x] src/lib/mock-data.ts 생성 (MOCK_QUOTES, MOCK_SHARE_LINKS, 헬퍼 함수)
- [x] src/lib/utils.ts에 formatCurrency 추가
- [ ] src/components/quotes/quote-table.tsx 생성
- [ ] src/components/quotes/sync-button.tsx 생성
- [ ] src/components/quotes/share-link-box.tsx 생성
