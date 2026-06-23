import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <header className="border-b px-4 py-3">
        <Link href="/" className="flex w-fit items-center gap-2">
          <FileText className="h-5 w-5" />
          <span className="font-semibold">노션 견적서 뷰어</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  )
}
