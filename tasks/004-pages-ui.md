# Task 004: 페이지 UI 완성

## 개요

견적서 목록, 상세, 공유 페이지 UI를 목업 데이터로 완성하고,
인증 폼에 서버 에러 표시 기능을 추가합니다.

## 관련 파일

- `src/app/(dashboard)/quotes/page.tsx` — 견적서 목록 페이지 (수정)
- `src/app/(dashboard)/quotes/loading.tsx` — 견적서 목록 스켈레톤 (기존 유지)
- `src/app/(dashboard)/quotes/[id]/page.tsx` — 견적서 상세 페이지 (수정)
- `src/app/share/[token]/page.tsx` — 공유 견적서 페이지 (수정)
- `src/components/login-form.tsx` — serverError prop 추가 (수정)
- `src/components/register-form.tsx` — serverError prop 추가 (수정)

## 수락 기준

- [ ] 견적서 목록 페이지: getMockQuotes() 데이터 표시, SyncButton 존재
- [ ] 견적서 목록: QuoteStatus별 Badge variant 올바르게 표시
- [ ] 견적서 목록: 빈 목록 Empty State 구현
- [ ] 견적서 상세 페이지: getMockQuoteById() 데이터 표시, notFound() 처리
- [ ] 견적서 상세: QuoteTable 항목 테이블 표시
- [ ] 견적서 상세: ShareLinkBox 공유 링크 관리 표시
- [ ] 견적서 상세: PDF 다운로드 버튼 (UI만)
- [ ] 공유 페이지: 유효하지 않은 토큰 → 인라인 안내 UI
- [ ] 공유 페이지: 비활성 링크 → 비활성화 안내 UI
- [ ] 공유 페이지: 유효한 토큰 → 견적서 정보 + QuoteTable + PDF 버튼
- [ ] LoginForm: serverError prop 조건부 Alert 렌더링
- [ ] RegisterForm: serverError prop 조건부 Alert 렌더링
- [ ] `npm run check-all` 통과
- [ ] `npm run build` 성공

## 구현 단계

- [x] tasks/004-pages-ui.md 작업 파일 생성
- [x] src/app/(dashboard)/quotes/page.tsx 수정 (목업 데이터 + 테이블 UI)
- [x] src/app/(dashboard)/quotes/[id]/page.tsx 수정 (상세 카드 + QuoteTable + ShareLinkBox)
- [x] src/app/share/[token]/page.tsx 수정 (토큰 검증 + 견적서 표시)
- [x] src/components/login-form.tsx serverError prop 추가
- [x] src/components/register-form.tsx serverError prop 추가
- [ ] npm run check-all 실행 및 오류 수정
- [ ] npm run build 성공 확인
