'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { downloadAsPdf } from '@/lib/pdf'

interface PdfDownloadButtonProps {
  /** PDF로 캡처할 요소의 id */
  targetId: string
  /** 저장될 파일명 */
  fileName?: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm'
}

export function PdfDownloadButton({
  targetId,
  fileName = '견적서.pdf',
  variant = 'default',
  size = 'default',
}: PdfDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      await downloadAsPdf(targetId, fileName)
      toast.success('PDF가 다운로드되었습니다')
    } catch (err) {
      console.error('PDF 생성 오류:', err)
      toast.error('PDF 생성에 실패했습니다', {
        description:
          err instanceof Error ? err.message : '잠시 후 다시 시도해주세요.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleDownload}
      disabled={isLoading}
      aria-label="PDF로 다운로드"
    >
      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
      {isLoading ? 'PDF 생성 중...' : 'PDF 다운로드'}
    </Button>
  )
}
