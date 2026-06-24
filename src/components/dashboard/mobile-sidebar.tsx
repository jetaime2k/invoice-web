'use client'

/**
 * 모바일 사이드바 드로어 컴포넌트
 * - 모바일 뷰포트(lg 미만)에서 햄버거 버튼으로 사이드바 오버레이 표시
 * - 오버레이 클릭 또는 링크 클릭 시 드로어 닫힘
 */
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sidebar } from './sidebar'

export function MobileSidebarTrigger() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 햄버거 토글 버튼 (lg 이상에서는 숨김) */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="메뉴 열기"
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* 모바일 드로어 오버레이 */}
      {isOpen && (
        <>
          {/* 반투명 배경 오버레이 */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* 사이드바 패널 */}
          <div
            id="mobile-sidebar"
            role="dialog"
            aria-modal="true"
            aria-label="네비게이션 메뉴"
            className="fixed top-0 left-0 z-50 h-full w-64 shadow-xl"
          >
            {/* 닫기 버튼 */}
            <div className="bg-sidebar absolute top-3 right-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="메뉴 닫기"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Sidebar onClose={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}
