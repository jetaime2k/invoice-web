import { LinkIcon } from 'lucide-react'

/**
 * 견적서 공유 페이지 404 UI
 * - /share/[token] 에서 notFound()를 호출할 때 표시
 * - 잘못된 토큰이거나 비활성화된 공유 링크 접근 시 사용
 * - PRD F003: 잘못된/만료된 링크 접근 시 안내 메시지 표시
 */
export default function SharedQuoteNotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <LinkIcon className="text-muted-foreground h-12 w-12" />
      <div className="space-y-2">
        <h1 className="text-xl font-semibold">
          유효하지 않은 견적서 링크입니다
        </h1>
        <p className="text-muted-foreground max-w-sm">
          링크가 만료되었거나 존재하지 않는 견적서입니다. 발행자에게 새로운 공유
          링크를 요청해 주세요.
        </p>
      </div>
    </div>
  )
}
