# 노션 견적서 뷰어

노션 데이터베이스에 작성한 견적서를 클라이언트가 별도 프로그램 없이 웹에서 바로 확인하고 PDF로 저장할 수 있는 서비스입니다.

## 🎯 프로젝트 개요

**목적**: 발행자가 노션에 작성한 견적서를 클라이언트가 웹에서 확인하고 PDF로 저장할 수 있게 합니다.

**사용자**:

- **발행자**: 노션으로 견적서를 작성/관리하는 프리랜서·소규모 사업자
- **클라이언트**: 발행자에게 받은 링크로 견적서를 확인하는 고객

## 📱 주요 페이지

1. **로그인 / 회원가입** - 발행자(관리자) 인증
2. **견적서 목록** - Notion 데이터베이스 동기화 및 견적서 목록 조회
3. **견적서 상세** - 견적서 내용 확인, PDF 다운로드, 공유 링크 관리
4. **견적서 공유 페이지** - 고유 링크로 비회원 접속, 견적서 조회 및 PDF 다운로드

## ⚡ 핵심 기능

- **[F001]** 견적서 목록 조회
- **[F002]** 견적서 상세 조회
- **[F003]** 고유 링크 기반 견적서 열람 (비회원)
- **[F004]** 견적서 PDF 다운로드
- **[F010]** 발행자 기본 인증 (회원가입/로그인/로그아웃)
- **[F011]** Notion 데이터베이스 동기화
- **[F012]** 공유 링크 생성 및 관리

## 🛠️ 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0 + TypeScript 5
- **Styling**: TailwindCSS v4 + shadcn/ui (new-york style)
- **Forms**: React Hook Form + Zod
- **UI Components**: Radix UI + Lucide Icons
- **Notion 연동**: @notionhq/client
- **PDF 변환**: html2canvas + jsPDF
- **백엔드**: Supabase (인증, PostgreSQL)

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 모든 검사 통합 실행
npm run check-all
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인하세요.

## 📋 개발 상태

- ✅ 기본 프로젝트 구조 설정
- ✅ 로그인 / 회원가입 폼 (Zod + React Hook Form)
- ✅ 견적서 목록 / 상세 / 공유 페이지 골격
- ⏳ Supabase 인증 연동
- ⏳ Notion API 연동 및 데이터 동기화
- ⏳ 공유 링크 생성/관리
- ⏳ PDF 다운로드 기능

## 📖 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 가이드](./CLAUDE.md) - 개발 지침
