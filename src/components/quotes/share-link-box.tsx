'use client'

/**
 * 공유 링크 관리 컴포넌트
 * 세 가지 상태를 처리합니다:
 * 1. shareLink가 null → '공유 링크 생성' 버튼만 표시
 * 2. shareLink.isActive가 true → 링크 입력 + 복사/재발급 버튼
 * 3. shareLink.isActive가 false → '비활성화된 링크' 안내
 */
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Copy, Link, RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createShareLink } from '@/actions/share-links'
import type { ShareLink } from '@/types/share-link'

// Props 타입 정의
interface ShareLinkBoxProps {
  /** 현재 공유 링크 정보 (null이면 미발급 상태) */
  shareLink: ShareLink | null
  /** 연관된 견적서 ID */
  quoteId: string
}

export function ShareLinkBox({ shareLink, quoteId }: ShareLinkBoxProps) {
  // 재발급 다이얼로그 열림 상태
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const getShareUrl = (token: string): string => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/share/${token}`
    }
    return `/share/${token}`
  }

  /**
   * 클립보드에 링크 복사 핸들러
   */
  const handleCopy = async () => {
    if (!shareLink) return
    const url = getShareUrl(shareLink.token)
    try {
      await navigator.clipboard.writeText(url)
      toast.success('링크가 복사되었습니다', {
        description:
          '클라이언트에게 공유할 수 있는 링크가 클립보드에 복사되었습니다.',
      })
    } catch {
      toast.error('복사에 실패했습니다', {
        description: '브라우저 설정을 확인해주세요.',
      })
    }
  }

  /**
   * 공유 링크 생성/재발급 공통 핸들러
   */
  const handleCreateOrReissue = (isReissue = false) => {
    startTransition(async () => {
      try {
        await createShareLink(quoteId)
        if (isReissue) {
          setIsDialogOpen(false)
          toast.success('링크가 재발급되었습니다', {
            description: '이전 링크는 더 이상 유효하지 않습니다.',
          })
        } else {
          toast.success('공유 링크가 생성되었습니다')
        }
        router.refresh()
      } catch {
        toast.error(
          isReissue ? '재발급에 실패했습니다' : '생성에 실패했습니다',
          {
            description: '잠시 후 다시 시도해주세요.',
          }
        )
      }
    })
  }

  const handleCreate = () => handleCreateOrReissue(false)
  const handleReissue = () => handleCreateOrReissue(true)

  return (
    <Card>
      {/* 카드 헤더 */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Link className="h-4 w-4" aria-hidden="true" />
          공유 링크
        </CardTitle>
        <CardDescription>
          클라이언트가 견적서를 열람할 수 있는 공유 링크를 관리합니다.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* 상태 1: 공유 링크 미발급 */}
        {!shareLink && (
          <div className="flex flex-col items-start gap-3">
            <p className="text-muted-foreground text-sm">
              아직 공유 링크가 발급되지 않았습니다.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreate}
              disabled={isPending}
              aria-label="공유 링크 생성"
            >
              <Link className="mr-2 h-4 w-4" aria-hidden="true" />
              {isPending ? '생성 중...' : '공유 링크 생성'}
            </Button>
          </div>
        )}

        {/* 상태 2: 공유 링크 활성 */}
        {shareLink && shareLink.isActive && (
          <div className="space-y-3">
            {/* 링크 입력창 및 복사 버튼 */}
            <div className="space-y-1.5">
              <Label htmlFor={`share-link-${quoteId}`} className="text-sm">
                공유 링크
              </Label>
              <div className="flex gap-2">
                <Input
                  id={`share-link-${quoteId}`}
                  readOnly
                  value={getShareUrl(shareLink.token)}
                  className="font-mono text-sm"
                  aria-label="공유 링크 URL"
                />
                {/* 복사 버튼 */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  aria-label="링크 복사"
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>

            {/* 발급일 표시 */}
            <p className="text-muted-foreground text-xs">
              발급일:{' '}
              {new Date(shareLink.createdAt).toLocaleDateString('ko-KR')}
            </p>

            {/* 재발급 다이얼로그 */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  aria-label="공유 링크 재발급"
                >
                  <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
                  링크 재발급
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>공유 링크 재발급</DialogTitle>
                  <DialogDescription>
                    링크를 재발급하면 기존 링크는 즉시 비활성화됩니다. 이전
                    링크로 접근한 클라이언트는 더 이상 견적서를 열람할 수
                    없습니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                  <DialogClose asChild>
                    <Button variant="outline" disabled={isPending}>
                      취소
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={handleReissue}
                    disabled={isPending}
                  >
                    {isPending ? '처리 중...' : '재발급 확인'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* 상태 3: 공유 링크 비활성화 */}
        {shareLink && !shareLink.isActive && (
          <div className="space-y-3">
            {/* 비활성화 안내 */}
            <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-950">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
                aria-hidden="true"
              />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                비활성화된 링크입니다. 이 링크는 더 이상 유효하지 않습니다.
              </p>
            </div>
            {/* 새 링크 발급 버튼 */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCreate}
              disabled={isPending}
              aria-label="새 공유 링크 생성"
            >
              <Link className="mr-2 h-4 w-4" aria-hidden="true" />
              {isPending ? '생성 중...' : '새 링크 발급'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
