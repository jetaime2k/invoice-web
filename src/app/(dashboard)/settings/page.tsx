/**
 * Notion 설정 페이지 (Server Component)
 * - 현재 저장된 Notion Database ID 조회
 * - NotionSettingsForm 컴포넌트를 카드 레이아웃으로 감싸서 렌더링
 */
import type { Metadata } from 'next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NotionSettingsForm } from '@/components/settings/notion-settings-form'
import { getNotionDatabaseId } from '@/actions/settings'

export const metadata: Metadata = {
  title: '설정',
  description: 'Notion 데이터베이스 연동 설정을 관리합니다.',
}

export default async function SettingsPage() {
  // 현재 저장된 Notion Database ID 조회
  const notionDatabaseId = await getNotionDatabaseId()

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Notion 데이터베이스 연동 정보를 관리합니다.
        </p>
      </div>

      {/* Notion 데이터베이스 설정 카드 */}
      <Card>
        <CardHeader>
          <CardTitle>Notion 데이터베이스</CardTitle>
          <CardDescription>
            견적서 데이터를 가져올 Notion 데이터베이스 ID를 설정합니다. Notion
            데이터베이스 페이지 URL에서 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NotionSettingsForm defaultValue={notionDatabaseId} />
        </CardContent>
      </Card>
    </div>
  )
}
