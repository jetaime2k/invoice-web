# Vercel 배포 가이드

노션 견적서 뷰어를 Vercel에 배포하는 절차를 안내합니다.

---

## 1. 환경 변수 목록

Vercel 프로젝트 설정 → **Environment Variables** 탭에서 아래 변수를 모두 등록합니다.

| 변수명                          | 설명                                                       | 필수 여부                                  |
| ------------------------------- | ---------------------------------------------------------- | ------------------------------------------ |
| `NEXT_PUBLIC_APP_URL`           | 배포된 앱의 퍼블릭 URL (예: `https://your-app.vercel.app`) | 선택 (미설정 시 Vercel 자동 제공 URL 사용) |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase 프로젝트 URL                                      | **필수**                                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon(public) API 키                               | **필수**                                   |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service role 키 (서버 전용)                       | 선택                                       |
| `NOTION_API_KEY`                | Notion Integration 시크릿 키                               | **필수**                                   |
| `NOTION_DATABASE_ID`            | Notion 견적서 데이터베이스 ID                              | **필수**                                   |
| `NOTION_ITEMS_DATABASE_ID`      | Notion 견적 항목 데이터베이스 ID                           | 선택 (항목 동기화 시 필수)                 |

> **주의:** `NEXT_PUBLIC_` 접두사가 붙은 변수는 브라우저에 노출됩니다. 민감한 값은 절대 `NEXT_PUBLIC_` 접두사를 사용하지 마세요.

---

## 2. Vercel 배포 절차

### 2-1. GitHub 저장소 연동

1. [vercel.com](https://vercel.com) 로그인 후 **Add New Project** 클릭
2. GitHub 저장소(`invoice-web`) 선택 후 **Import**
3. Framework Preset이 **Next.js**로 자동 감지되는지 확인

### 2-2. 환경 변수 등록

1. **Environment Variables** 섹션에서 위 표의 변수를 하나씩 입력
2. 환경(Production / Preview / Development) 선택 — Production은 필수, 나머지는 선택

### 2-3. 배포 실행

1. **Deploy** 버튼 클릭
2. 빌드 로그에서 오류 없이 완료되는지 확인
3. 배포 완료 후 제공된 URL로 접근하여 동작 확인

---

## 3. Supabase 인덱스 적용

배포 후 Supabase 대시보드에서 성능 최적화 인덱스를 적용합니다.

1. [supabase.com](https://supabase.com) → 프로젝트 선택
2. 좌측 메뉴 **SQL Editor** 클릭
3. `supabase/migrations/20260624000000_add_indexes.sql` 파일의 내용을 붙여넣기
4. **Run** 실행

```sql
CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_issued_at ON quotes(issued_at DESC);
CREATE INDEX IF NOT EXISTS idx_share_links_token ON share_links(token);
CREATE INDEX IF NOT EXISTS idx_share_links_quote_id ON share_links(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_items_quote_id ON quote_items(quote_id);
```

---

## 4. 배포 후 스모크 테스트 체크리스트

배포 완료 후 아래 항목을 순서대로 확인합니다.

### 공통

- [ ] `https://your-app.vercel.app` 접속 시 `/login`으로 리다이렉트 확인
- [ ] `/login` 페이지 정상 렌더링 확인
- [ ] `/register` 페이지 정상 렌더링 확인

### 발행자 플로우

- [ ] 이메일/비밀번호로 로그인 성공
- [ ] `/quotes` 견적서 목록 페이지 정상 로드
- [ ] **Notion 동기화** 버튼 클릭 → 성공 메시지 확인
- [ ] 견적서 클릭 → 상세 페이지(`/quotes/[id]`) 정상 로드
- [ ] 공유 링크 생성 버튼 클릭 → 링크 생성 확인
- [ ] PDF 다운로드 버튼 클릭 → PDF 파일 다운로드 확인
- [ ] 로그아웃 버튼 → `/login`으로 리다이렉트 확인

### 클라이언트 플로우

- [ ] 생성된 공유 링크(`/share/[token]`) 접속 → 견적서 열람 확인
- [ ] 공유 페이지에서 PDF 다운로드 확인
- [ ] 잘못된 토큰(`/share/invalid`) 접속 → 오류 안내 UI 확인

### 에러 케이스

- [ ] 잘못된 로그인 정보 → 에러 메시지 표시 확인
- [ ] 존재하지 않는 견적서 ID(`/quotes/nonexistent`) → 404 페이지 확인

---

## 5. 도메인 연결 (선택)

커스텀 도메인 연결 시 Vercel 프로젝트 설정 → **Domains** 탭에서 추가합니다.  
도메인 연결 후 `NEXT_PUBLIC_APP_URL` 환경 변수를 커스텀 도메인으로 업데이트하세요.
