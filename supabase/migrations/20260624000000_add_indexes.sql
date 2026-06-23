-- 성능 최적화 인덱스 마이그레이션
-- Supabase SQL Editor 또는 Supabase CLI로 실행

-- quotes 테이블 인덱스
-- notion_page_id unique constraint는 Task 005에서 생성되었으므로 별도 추가 불필요
CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
CREATE INDEX IF NOT EXISTS idx_quotes_issued_at ON quotes(issued_at DESC);

-- share_links 테이블 인덱스
-- token unique constraint가 있더라도 명시적 인덱스로 조회 성능 보장
CREATE INDEX IF NOT EXISTS idx_share_links_token ON share_links(token);
CREATE INDEX IF NOT EXISTS idx_share_links_quote_id ON share_links(quote_id);

-- quote_items 테이블 인덱스
CREATE INDEX IF NOT EXISTS idx_quote_items_quote_id ON quote_items(quote_id);
