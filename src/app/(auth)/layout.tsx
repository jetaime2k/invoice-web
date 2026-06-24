/**
 * 인증 레이아웃 (로그인 / 회원가입)
 * - bg-background, text-foreground 등 CSS 변수 전용 사용으로 다크 모드 대응
 * - 헤더 우측에 ThemeToggle 배치
 */
import Link from 'next/link'
import { FileText } from 'lucide-react'

import { ThemeToggle } from '@/components/theme-toggle'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex w-fit items-center gap-2">
            <FileText className="h-5 w-5" />
            <span className="font-semibold">노션 견적서 뷰어</span>
          </Link>
          {/* 다크 모드 토글 */}
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
