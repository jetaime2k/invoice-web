import Link from 'next/link'
import { FileText, LogOut, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { signOut } from '@/actions/auth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="bg-background/80 sticky top-0 z-10 border-b px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/quotes" className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-md">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">
              노션 견적서 뷰어
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {/* 설정 페이지 링크 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground gap-2"
              asChild
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                설정
              </Link>
            </Button>

            {/* 로그아웃 버튼 */}
            <form action={signOut}>
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground gap-2"
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
    </div>
  )
}
