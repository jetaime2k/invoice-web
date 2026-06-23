import Link from 'next/link'
import {
  FileText,
  Share2,
  Download,
  RefreshCw,
  Link2,
  LogIn,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const features = [
  {
    icon: FileText,
    title: '견적서 목록 조회',
    description:
      'Notion 데이터베이스에서 발행한 견적서 목록을 한눈에 확인합니다.',
    badge: 'F001',
  },
  {
    icon: RefreshCw,
    title: 'Notion 동기화',
    description: '버튼 한 번으로 Notion 최신 데이터를 즉시 반영합니다.',
    badge: 'F011',
  },
  {
    icon: Link2,
    title: '공유 링크 생성',
    description:
      '견적서별 고유 링크를 생성해 클라이언트에게 전달합니다. 재발급도 가능합니다.',
    badge: 'F012',
  },
  {
    icon: Share2,
    title: '비회원 열람',
    description:
      '클라이언트는 회원가입 없이 고유 링크만으로 견적서를 조회합니다.',
    badge: 'F003',
  },
  {
    icon: Download,
    title: 'PDF 다운로드',
    description: '견적서를 브라우저에서 바로 PDF로 저장할 수 있습니다.',
    badge: 'F004',
  },
]

const steps = [
  {
    role: '발행자',
    step: '1',
    label: '로그인',
    desc: '발행자 계정으로 로그인',
  },
  {
    role: '발행자',
    step: '2',
    label: 'Notion 동기화',
    desc: '연결된 Notion DB에서 견적서 목록 불러오기',
  },
  {
    role: '발행자',
    step: '3',
    label: '공유 링크 생성',
    desc: '견적서 선택 후 클라이언트 공유 링크 생성 및 복사',
  },
  {
    role: '클라이언트',
    step: '4',
    label: '고유 링크 접속',
    desc: '로그인 없이 링크로 바로 견적서 확인',
  },
  {
    role: '클라이언트',
    step: '5',
    label: 'PDF 저장',
    desc: '필요 시 PDF로 다운로드하여 보관',
  },
]

export default function HomePage() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="font-semibold">노션 견적서 뷰어</span>
          <Link href="/login">
            <Button size="sm" variant="outline" className="gap-2">
              <LogIn className="h-4 w-4" />
              발행자 로그인
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* 히어로 */}
        <section className="py-20 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <Badge variant="secondary" className="mb-6">
              Notion 연동 견적서 서비스
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              노션 견적서를
              <span className="text-primary mt-2 block">
                웹에서 바로 공유하세요
              </span>
            </h1>
            <p className="text-muted-foreground mt-6 text-lg">
              Notion에 작성한 견적서를 클라이언트가 별도 프로그램 없이 웹에서
              확인하고, PDF로 저장할 수 있습니다. 발행자는 로그인 후 공유 링크만
              복사해서 전달하면 됩니다.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button size="lg" className="gap-2 px-8">
                  <LogIn className="h-4 w-4" />
                  발행자 시작하기
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="px-8">
                  계정 만들기
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 사용 흐름 */}
        <section className="bg-muted/40 py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-center text-2xl font-bold">사용 방법</h2>
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-start">
              {steps.map(s => (
                <div
                  key={s.step}
                  className="flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:gap-0 sm:text-center"
                >
                  {/* 모바일: 가로 배치, 데스크탑: 세로 중앙 정렬 */}
                  <div className="shrink-0">
                    <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                      {s.step}
                    </div>
                  </div>
                  <div className="sm:mt-3 sm:flex sm:flex-col sm:items-center">
                    <Badge
                      variant={s.role === '발행자' ? 'default' : 'secondary'}
                      className="mb-2"
                    >
                      {s.role}
                    </Badge>
                    <p className="text-sm font-semibold">{s.label}</p>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 핵심 기능 */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-center text-2xl font-bold">핵심 기능</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {features.map((f, i) => (
                <Card
                  key={f.badge}
                  className={`gap-3 py-5 ${
                    i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
                  }`}
                >
                  <CardHeader className="pb-0">
                    <div className="flex items-center gap-3">
                      <f.icon className="text-primary h-6 w-6 shrink-0" />
                      <CardTitle className="text-base">{f.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{f.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t py-6 text-center">
        <p className="text-muted-foreground text-sm">
          © 2025 노션 견적서 뷰어. 상세 요구사항은{' '}
          <a
            href="/docs/PRD.md"
            className="text-primary underline-offset-4 hover:underline"
          >
            PRD 문서
          </a>
          를 참고하세요.
        </p>
      </footer>
    </div>
  )
}
