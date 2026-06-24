/**
 * 대시보드 헤더 컴포넌트
 * - 현재 페이지 제목, ThemeToggle, 사용자 이메일 표시
 * - Server Component: 사용자 정보는 서버에서 조회
 */
import { createClient } from '@/lib/supabase/server'
import { ThemeToggle } from '@/components/theme-toggle'

export async function DashboardHeader() {
  // 현재 로그인 사용자 정보 조회
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const userEmail = user?.email ?? ''

  return (
    <header className="bg-background/80 border-border sticky top-0 z-10 flex h-14 items-center justify-between border-b px-4 backdrop-blur-sm">
      {/* 사용자 이메일 */}
      <div className="flex items-center gap-2 overflow-hidden">
        <span
          className="text-muted-foreground truncate text-sm"
          title={userEmail}
        >
          {userEmail}
        </span>
      </div>

      {/* 오른쪽: 테마 토글 */}
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  )
}
