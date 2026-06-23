# Task 001: 프로젝트 구조 및 라우팅 설정

## 개요

Next.js 15 App Router 기반 전체 라우트 구조를 ROADMAP 명세에 맞게 재구성합니다.

## 관련 파일

- `src/app/(auth)/layout.tsx` — 인증 전용 레이아웃 (신규)
- `src/app/(auth)/login/page.tsx` — 로그인 페이지 (이동)
- `src/app/(auth)/register/page.tsx` — 회원가입 페이지 (신규, /signup 대체)
- `src/app/(dashboard)/layout.tsx` — 대시보드 레이아웃 (신규)
- `src/app/(dashboard)/quotes/page.tsx` — 견적서 목록 (이동)
- `src/app/(dashboard)/quotes/[id]/page.tsx` — 견적서 상세 (이동)
- `src/app/share/[token]/page.tsx` — 공유 페이지 (유지)
- `src/components/register-form.tsx` — 회원가입 폼 (signup-form.tsx 리네임)
- `src/lib/schemas/auth.ts` — signupSchema → registerSchema 리네임
- `src/middleware.ts` — 인증 라우트 가드 골격 (신규)

## 수락 기준

- [ ] /login 접근 시 로그인 폼 표시
- [ ] /register 접근 시 회원가입 폼 표시
- [ ] /signup 접근 시 404
- [ ] /quotes 접근 시 견적서 목록 골격 표시
- [ ] /quotes/[id] 접근 시 상세 페이지 골격 표시
- [ ] /share/[token] 접근 시 공유 페이지 골격 표시
- [ ] `npm run check-all` 통과
- [ ] `npm run build` 성공

## 구현 단계

- [x] tasks/001-routing-structure.md 작업 파일 생성
- [x] src/lib/schemas/auth.ts 수정 (signupSchema → registerSchema)
- [x] src/components/register-form.tsx 생성 (signup-form.tsx 내용 이관)
- [x] src/app/(auth)/layout.tsx 생성
- [x] src/app/(auth)/login/page.tsx 생성
- [x] src/app/(auth)/register/page.tsx 생성
- [x] src/app/(dashboard)/layout.tsx 생성
- [x] src/app/(dashboard)/quotes/page.tsx 생성
- [x] src/app/(dashboard)/quotes/[id]/page.tsx 생성
- [x] src/middleware.ts 생성
- [x] 기존 파일 삭제 (login/, signup/, quotes/ 평면 구조)
- [x] 빌드 및 검증
