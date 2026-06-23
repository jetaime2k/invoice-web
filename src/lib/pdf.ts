'use client'

import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

/**
 * 지정된 HTML 요소를 A4 PDF로 변환하여 다운로드
 * html-to-image 사용 (html2canvas는 TailwindCSS v4의 oklch/lab 색상 미지원)
 */
export async function downloadAsPdf(
  elementId: string,
  fileName: string = '견적서.pdf'
): Promise<void> {
  const element = document.getElementById(elementId)
  if (!element) throw new Error(`요소를 찾을 수 없습니다: #${elementId}`)

  const imgData = await toPng(element, {
    quality: 1,
    pixelRatio: 2,
    backgroundColor: '#ffffff',
  })

  // 이미지 실제 크기 계산
  const imgNative = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imgData
  })

  // A4 크기 (mm): 210 x 297
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const imgWidth = pageWidth
  const imgHeight = (imgNative.height * imgWidth) / imgNative.width

  // 이미지가 한 페이지를 초과하면 여러 페이지로 분할
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight

  while (heightLeft > 0) {
    position -= pageHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }

  pdf.save(fileName)
}
