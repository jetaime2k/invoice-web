'use client'

/**
 * 대시보드 사이드바 컴포넌트
 * - 로고, 네비게이션 링크(견적서 목록, 설정), 로그아웃 버튼 포함
 * - 현재 활성 경로를 usePathname으로 감지하여 시각적으로 구분
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutList, LogOut, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { signOut } from '@/actions/auth'

/** 사이드바 네비게이션 항목 타입 */
interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

/** 네비게이션 메뉴 정의 */
const navItems: NavItem[] = [
  {
    href: '/quotes',
    label: '견적서 목록',
    icon: LayoutList,
  },
  {
    href: '/settings',
    label: '설정',
    icon: Settings,
  },
]

interface SidebarProps {
  /** 모바일 드로어 오버레이 닫기 콜백 (선택적) */
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  /**
   * 현재 경로가 해당 네비게이션 항목과 일치하는지 확인
   * /quotes/[id] 처럼 하위 경로도 활성 처리
   */
  const isActive = (href: string) => {
    if (href === '/quotes') {
      return pathname === '/quotes' || pathname.startsWith('/quotes/')
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <aside className="bg-sidebar text-sidebar-foreground flex h-full flex-col">
      {/* 로고 영역 */}
      <div className="border-sidebar-border border-b px-4 py-4">
        <Link
          href="/quotes"
          className="flex items-center gap-2"
          onClick={onClose}
        >
          <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-lg">
            <FileText className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            노션 견적서 뷰어
          </span>
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="주요 메뉴">
        <ul className="space-y-1">
          {navItems.map(item => {
            const active = isActive(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 로그아웃 버튼 */}
      <div className="border-sidebar-border border-t px-3 py-4">
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground w-full justify-start gap-3"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            로그아웃
          </Button>
        </form>
      </div>
    </aside>
  )
}
