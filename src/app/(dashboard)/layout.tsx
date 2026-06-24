/**
 * 대시보드 레이아웃
 * - 데스크탑: 사이드바(고정) + 메인 콘텐츠 영역 2-컬럼 구조
 * - 모바일: 사이드바 숨김, 상단 헤더에서 햄버거 메뉴로 드로어 접근
 */
import { Sidebar } from '@/components/dashboard/sidebar'
import { DashboardHeader } from '@/components/dashboard/header'
import { MobileSidebarTrigger } from '@/components/dashboard/mobile-sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen">
      {/* 데스크탑 사이드바: lg 이상에서만 표시 */}
      <div className="border-sidebar-border hidden w-64 shrink-0 border-r lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <Sidebar />
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 상단 헤더: 모바일 햄버거 + 사용자 정보 + 테마 토글 */}
        <div className="flex items-center gap-2">
          {/* 모바일에서만 표시되는 햄버거 버튼 */}
          <div className="px-4 pt-4 lg:hidden">
            <MobileSidebarTrigger />
          </div>
          <div className="flex-1">
            <DashboardHeader />
          </div>
        </div>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
