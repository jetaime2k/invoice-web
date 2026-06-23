'use client'

/**
 * Notion 데이터베이스 설정 폼 컴포넌트
 * - React Hook Form + Zod 유효성 검사
 * - updateNotionDatabaseId Server Action 호출
 * - 성공/실패 시 sonner toast 알림
 */
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateNotionDatabaseId } from '@/actions/settings'

/**
 * Notion Database ID 유효성 검사 스키마
 * 하이픈 포함 UUID 형식 또는 하이픈 없는 32자 16진수 문자열 허용
 */
const notionSettingsSchema = z.object({
  databaseId: z
    .string()
    .min(1, 'Database ID를 입력해 주세요.')
    .regex(
      /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i,
      '올바른 Notion Database ID를 입력해 주세요. (UUID 형식: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)'
    ),
})

type NotionSettingsFormData = z.infer<typeof notionSettingsSchema>

interface NotionSettingsFormProps {
  /** 현재 저장된 Notion Database ID (없으면 null) */
  defaultValue: string | null
}

export function NotionSettingsForm({ defaultValue }: NotionSettingsFormProps) {
  const [isPending, startTransition] = useTransition()

  const form = useForm<NotionSettingsFormData>({
    resolver: zodResolver(notionSettingsSchema),
    defaultValues: {
      databaseId: defaultValue ?? '',
    },
  })

  /**
   * 폼 제출 핸들러
   * Server Action을 호출하여 Database ID 저장
   */
  function onSubmit(data: NotionSettingsFormData) {
    startTransition(async () => {
      const result = await updateNotionDatabaseId(data.databaseId)

      if (result.success) {
        toast.success('설정 저장 완료', {
          description: result.message,
        })
      } else {
        toast.error('설정 저장 실패', {
          description: result.message,
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="databaseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notion Database ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Notion 데이터베이스 URL에서 확인할 수 있는 ID 값입니다.
                <br />
                예: notion.so/workspace/
                <strong>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</strong>?v=...
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? '저장 중...' : '저장'}
        </Button>
      </form>
    </Form>
  )
}
