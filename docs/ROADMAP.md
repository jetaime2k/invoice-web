# 노션 견적서 뷰어 개발 로드맵

노션 데이터베이스의 견적서를 클라이언트가 웹에서 확인하고 PDF로 저장할 수 있는 노션 견적서 뷰어 MVP 개발 로드맵

## 개요

노션 견적서 뷰어는 **노션으로 견적서를 작성·관리하는 프리랜서·소규모 사업자(발행자)**를 위한 서비스로, 별도 프로그램 없이 웹 링크 하나로 클라이언트에게 견적서를 전달하고 PDF로 저장할 수 있는 핵심 가치를 제공합니다:

- **견적서 조회 및 동기화**: Notion 데이터베이스와 연동하여 최신 견적서 목록을 실시간으로 불러오기
- **고유 링크 공유**: 견적서별 고유 링크를 생성하여 클라이언트가 로그인 없이 견적서 열람 가능
- **PDF 다운로드**: 클라이언트 사이드에서 견적서 화면을 PDF로 변환하여 즉시 다운로드

## 개발 워크플로우

1. **작업 계획**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**
   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-skeleton.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조

3. **작업 구현**
   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**
   - 로드맵에서 완료된 작업을 ✅로 표시

---

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- **Task 001: 프로젝트 구조 및 라우팅 설정** ✅ - 완료
  - ✅ Next.js 15 App Router 기반 전체 라우트 구조 생성
    - ✅ `/app/(auth)/login` — 로그인 페이지 (비로그인 전용)
    - ✅ `/app/(auth)/register` — 회원가입 페이지 (비로그인 전용)
    - ✅ `/app/(dashboard)/quotes` — 견적서 목록 페이지 (발행자 로그인 필요)
    - ✅ `/app/(dashboard)/quotes/[id]` — 견적서 상세 페이지 (발행자 로그인 필요)
    - ✅ `/app/share/[token]` — 견적서 공유 페이지 (로그인 불필요, 클라이언트 전용)
  - ✅ 모든 주요 페이지의 빈 껍데기 `page.tsx` 파일 생성
  - ✅ 공통 레이아웃 컴포넌트 골격 구현 (`(auth)/layout.tsx`, `(dashboard)/layout.tsx`)
  - ✅ Next.js `middleware.ts` 인증 라우트 가드 구조 작성

- **Task 002: 타입 정의 및 인터페이스 설계** ✅ - 완료
  - ✅ `src/types/` 디렉토리 생성 및 도메인별 TypeScript 타입 파일 작성
    - ✅ `user.ts` — User 도메인 타입 (PRD 데이터 모델 기반)
    - ✅ `quote.ts` — Quote 도메인 타입 (notionPageId, clientName, totalAmount 등)
    - ✅ `share-link.ts` — ShareLink 도메인 타입 (token, isActive 등)
    - ✅ `notion.ts` — Notion API 응답 타입 정의
  - ✅ Supabase Database 타입 정의 (`src/types/database.types.ts`)
  - ✅ 공통 API 응답 타입 정의 (성공/에러 Response 구조)
  - ✅ Zod 스키마 기반 유효성 검사 타입 (폼 입력 스키마)

---

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

- **Task 003: 공통 컴포넌트 라이브러리 구현** ✅ - 완료
  - ✅ shadcn/ui 기반 필요 컴포넌트 설치 및 커스터마이징
    - ✅ `Button`, `Input`, `Label`, `Form` — 폼 구성 요소
    - ✅ `Table` — 견적서 목록 및 항목 내역 테이블
    - ✅ `Badge` — 견적서 상태 표시
    - ✅ `Card` — 견적서 카드 레이아웃
    - ✅ `Dialog` / `Alert` — 공유 링크 생성·복사, 재발급 확인 모달
    - ✅ `Skeleton` — 로딩 상태 UI
  - ✅ 더미 데이터 생성 유틸리티 작성 (`src/lib/mock-data.ts`)
    - ✅ 샘플 견적서 목록, 항목 내역, 공유 링크 더미 데이터 포함
  - ✅ 견적서 전용 공통 컴포넌트 구현
    - ✅ `QuoteTable` — 항목별 내역/수량/단가/합계 테이블
    - ✅ `ShareLinkBox` — 공유 링크 표시·복사 UI
    - ✅ `SyncButton` — Notion 동기화 버튼 (로딩 상태 포함)

- **Task 004: 모든 페이지 UI 완성** ✅ - 완료
  - ✅ **로그인 페이지** (`/login`)
    - ✅ 이메일/비밀번호 입력 폼, 로그인 버튼, 회원가입 링크
    - ✅ 에러 메시지 표시 영역
  - ✅ **회원가입 페이지** (`/register`)
    - ✅ 이메일/비밀번호/비밀번호 확인 입력 폼, 회원가입 버튼, 로그인 링크
  - ✅ **견적서 목록 페이지** (`/quotes`)
    - ✅ Notion 동기화 버튼, 동기화 진행 상태 표시
    - ✅ 견적서 목록 테이블 (견적서명, 클라이언트명, 발행일, 금액)
    - ✅ 더미 데이터로 목록 렌더링, 클릭 시 상세 페이지 이동 링크
  - ✅ **견적서 상세 페이지** (`/quotes/[id]`)
    - ✅ 견적서 항목별 내역/수량/단가/합계 테이블 (더미 데이터)
    - ✅ 공유 링크 생성·복사·재발급 UI (`ShareLinkBox`)
    - ✅ PDF 다운로드 버튼 (기능 연결 전 UI만)
  - ✅ **견적서 공유 페이지** (`/share/[token]`)
    - ✅ 로그인 없이 접근 가능한 열람 전용 레이아웃
    - ✅ 견적서 항목 상세 표시 (더미 데이터)
    - ✅ PDF 다운로드 버튼 (기능 연결 전 UI만)
    - ✅ 잘못된/만료된 링크 접근 시 안내 메시지 UI
  - ✅ 반응형 디자인 및 모바일 최적화 적용
  - ✅ 전체 사용자 플로우 및 네비게이션 동선 검증

---

### Phase 3: 핵심 기능 구현 ✅

- **Task 005: Supabase 데이터베이스 설정 및 API 개발** ✅ - 완료
  - ✅ Supabase 프로젝트 생성 및 환경 변수 설정 (`.env.local`)
  - ✅ PostgreSQL 테이블 생성 (PRD 데이터 모델 기반)
    - ✅ `users` 테이블 (Supabase Auth와 연동)
    - ✅ `quotes` 테이블 (notionPageId, title, clientName, totalAmount, issuedAt, syncedAt)
    - ✅ `share_links` 테이블 (quoteId, token, isActive)
  - ✅ Row Level Security(RLS) 정책 설정 (발행자별 데이터 격리)
  - ✅ Next.js Server Actions 기반 API 구현
    - ✅ `src/actions/quotes.ts` — 견적서 목록 조회, 상세 조회
    - ✅ `src/actions/share-links.ts` — 공유 링크 생성, 재발급, 토큰 기반 조회
  - ✅ Playwright MCP를 활용한 API 엔드포인트 통합 테스트

- **Task 006: 인증 시스템 구현 (Supabase Auth)** ✅ - 완료
  - ✅ Supabase Auth 이메일/비밀번호 회원가입·로그인·로그아웃 연동
  - ✅ `src/actions/auth.ts` Server Action 구현
    - ✅ `signUp(email, password)` — 회원가입
    - ✅ `signIn(email, password)` — 로그인
    - ✅ `signOut()` — 로그아웃
  - ✅ React Hook Form + Zod 스키마 폼 유효성 검사 적용
    - ✅ 로그인 폼: 이메일 형식, 비밀번호 최소 길이
    - ✅ 회원가입 폼: 비밀번호 확인 일치 검증
  - ✅ `middleware.ts`에서 Supabase Session 기반 라우트 보호 구현
    - ✅ 비로그인 시 `/login`으로 리다이렉트
    - ✅ 로그인 상태에서 `/login` 접근 시 `/quotes`로 리다이렉트
  - ✅ Playwright MCP로 회원가입 → 로그인 → 로그아웃 E2E 테스트 수행

- **Task 007: Notion API 연동 및 데이터 동기화 구현** ✅ - 완료
  - ✅ `@notionhq/client` SDK 설치 및 Notion Integration 설정
  - ✅ Notion 데이터베이스 읽기 전용 연동 로직 구현 (`src/lib/notion.ts`)
    - ✅ 발행자의 `notionDatabaseId`로 견적서 데이터베이스 조회
    - ✅ Notion 페이지 속성 → Quote 모델 변환 매핑 함수
  - ✅ `src/actions/sync.ts` 동기화 Server Action 구현
    - ✅ Notion 데이터 조회 후 Supabase `quotes` 테이블에 Upsert
    - ✅ 동기화 일시(`syncedAt`) 업데이트
  - ✅ 견적서 목록 페이지의 동기화 버튼에 실제 동기화 로직 연결
  - ✅ 더미 데이터 → 실제 Supabase 데이터로 교체
  - ✅ Playwright MCP로 Notion 동기화 플로우 통합 테스트

- **Task 008: 공유 링크 및 견적서 공유 페이지 구현** ✅ - 완료
  - ✅ 공유 링크 생성·재발급 로직 구현
    - ✅ `crypto.randomUUID()` 기반 고유 토큰 생성
    - ✅ 기존 링크 비활성화(`isActive: false`) 후 신규 링크 생성
  - ✅ 견적서 상세 페이지 `ShareLinkBox`에 실제 공유 링크 생성·복사 연동
  - ✅ 견적서 공유 페이지(`/share/[token]`) 실제 데이터 연동
    - ✅ 토큰 기반 `share_links` 조회 → 연결된 `quotes` 상세 표시
    - ✅ 비활성화된 토큰 / 존재하지 않는 토큰 접근 시 안내 UI 처리
  - ✅ Playwright MCP로 공유 링크 생성 → 클라이언트 접근 → 열람 E2E 테스트

- **Task 009: PDF 다운로드 기능 구현** ✅ - 완료
  - ✅ `html-to-image` + `jsPDF` 패키지 설치 및 설정 (html2canvas는 TailwindCSS v4 oklch 색상 미지원으로 대체)
  - ✅ PDF 생성 유틸리티 구현 (`src/lib/pdf.ts`)
    - ✅ 견적서 HTML 영역을 PNG 이미지로 변환
    - ✅ PNG 이미지를 A4 크기 PDF로 생성 및 다운로드 (멀티 페이지 지원)
  - ✅ `PdfDownloadButton` 클라이언트 컴포넌트 구현 (`src/components/quotes/pdf-download-button.tsx`)
  - ✅ 견적서 상세 페이지 및 공유 페이지의 PDF 다운로드 버튼에 연동
  - ✅ Playwright MCP로 PDF 다운로드 플로우 테스트 (상세 페이지 + 공유 페이지 모두 확인)

- **Task 009-1: 핵심 기능 통합 테스트** ✅ - 완료
  - ✅ Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
    - ✅ **발행자 플로우**: 로그인 → Notion 동기화 → 견적서 목록 확인 → 상세 조회 → PDF 다운로드
    - ✅ **클라이언트 플로우**: 공유 링크 접속 → 견적서 열람 → PDF 다운로드
  - ✅ 에러 핸들링 및 엣지 케이스 검증
    - ✅ 잘못된 로그인 정보 → 에러 메시지 표시
    - ✅ 존재하지 않는/만료된 공유 링크 → 안내 UI 표시
  - ✅ 모바일 환경 반응형 UI 검증 (375px — 목록/상세/공유 페이지 모두 확인)

---

### Phase 4: 고급 기능 및 최적화 ✅

- **Task 010: 사용자 경험 향상 및 Notion 설정 관리** ✅ - 완료
  - ✅ 발행자 Notion Database ID 설정 페이지 구현 (`/settings`)
    - ✅ 최초 로그인 후 Notion Database ID 입력 및 저장 기능
    - ✅ Database ID 유효성 검사 (Notion API 연결 테스트)
  - ✅ 동기화 상태 실시간 피드백 개선 (진행률 표시, 성공/실패 Toast 알림)
  - ✅ 견적서 목록 페이지 UX 개선
    - ✅ 마지막 동기화 시간 표시
    - ✅ 빈 목록 상태(Empty State) UI

- **Task 011: 성능 최적화 및 배포** ✅ - 완료
  - ✅ Next.js 이미지 최적화 및 코드 스플리팅 적용
  - ✅ Supabase 쿼리 최적화 및 인덱스 설정
  - ✅ `npm run build` 최종 빌드 오류 수정 및 성능 점검
  - ✅ Vercel 배포 설정 (환경 변수 등록, 빌드 파이프라인 확인)
  - ✅ 배포 후 프로덕션 환경 스모크 테스트

---

## 진행 현황

| Phase                   | 상태    | 완료 Task |
| ----------------------- | ------- | --------- |
| Phase 1: 골격 구축      | ✅ 완료 | 2 / 2     |
| Phase 2: UI/UX 완성     | ✅ 완료 | 2 / 2     |
| Phase 3: 핵심 기능 구현 | ✅ 완료 | 6 / 6     |
| Phase 4: 최적화 및 배포 | ✅ 완료 | 2 / 2     |

**📅 최종 업데이트**: 2026-06-24
**📊 진행 상황**: 전체 완료 (12/12 Tasks 완료, 100%)
