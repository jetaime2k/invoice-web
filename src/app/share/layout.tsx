import Link from 'next/link'
import { FileText } from 'lucide-react'

/**
 * 견적서 공유 페이지 레이아웃
 * - /share/[token] 경로에서 사용
 * - 클라이언트(비로그인 사용자) 전용 레이아웃
 * - 발행자 메뉴 없이 브랜드 헤더만 표시
 */
export default function ShareLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 미니멀 헤더: 로고만 표시, 로그인 유도 없음 */}
      <header className="bg-background/80 sticky top-0 z-10 border-b px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="flex w-fit items-center gap-2">
            <div className="bg-primary/10 text-primary flex h-7 w-7 items-center justify-center rounded-md">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">
              노션 견적서 뷰어
            </span>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      {/* 푸터 */}
      <footer className="border-t py-5 text-center">
        <p className="text-muted-foreground text-xs">
          이 견적서는 노션 견적서 뷰어를 통해 공유되었습니다.
        </p>
      </footer>
    </div>
  )
}
