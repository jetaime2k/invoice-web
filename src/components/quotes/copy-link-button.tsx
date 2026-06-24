'use client'

/**
 * 공유 링크 복사 버튼 컴포넌트
 * - 토큰이 없으면 createShareLink() 호출로 신규 생성 후 클립보드 복사
 * - 토큰이 있으면 즉시 클립보드에 복사
 * - sonner toast로 성공/실패 피드백 표시
 */
import { useState } from 'react'
import { Copy, Link, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { createShareLink } from '@/actions/share-links'

interface CopyLinkButtonProps {
  /** 견적서 ID */
  quoteId: string
  /** 초기 활성 공유 토큰 (없으면 null) */
  shareToken: string | null
}

export function CopyLinkButton({ quoteId, shareToken }: CopyLinkButtonProps) {
  // 생성된 토큰을 state에 저장 (한 번 생성 후 재사용)
  const [currentToken, setCurrentToken] = useState<string | null>(shareToken)
  const [isLoading, setIsLoading] = useState(false)

  /**
   * 클립보드에 공유 링크 복사
   * - 토큰 없음: Server Action으로 신규 생성 후 복사
   * - 토큰 있음: 즉시 복사
   */
  const handleCopy = async (e: React.MouseEvent) => {
    // 부모 TableRow의 Link 클릭 이벤트 전파 차단
    e.preventDefault()
    e.stopPropagation()

    if (isLoading) return

    setIsLoading(true)

    try {
      let token = currentToken

      // 토큰이 없으면 새로 생성
      if (!token) {
        const shareLink = await createShareLink(quoteId)
        token = shareLink.token
        setCurrentToken(token)
      }

      // 공유 URL 생성 (현재 origin 기준)
      const shareUrl = `${window.location.origin}/share/${token}`

      // 클립보드 복사 시도
      await navigator.clipboard.writeText(shareUrl)
      toast.success('링크 복사됨', {
        description: '공유 링크가 클립보드에 복사되었습니다.',
      })
    } catch (err) {
      console.error('클립보드 복사 실패:', err)
      toast.error('복사 실패', {
        description: '브라우저 권한을 확인하세요.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={handleCopy}
      disabled={isLoading}
      aria-label="공유 링크 복사"
      title={currentToken ? '공유 링크 복사' : '공유 링크 생성 후 복사'}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : currentToken ? (
        <Copy className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Link className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  )
}
