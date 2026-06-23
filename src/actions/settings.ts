'use server'

import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesUpdate } from '@/types/database.types'

/**
 * 현재 로그인 사용자의 Notion Database ID 조회
 */
export async function getNotionDatabaseId(): Promise<string | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = (await (supabase as any)
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()) as { data: Tables<'users'> | null; error: unknown }

  return data?.notion_database_id ?? null
}

/**
 * 현재 로그인 사용자의 Notion Database ID 저장
 */
export async function updateNotionDatabaseId(
  databaseId: string
): Promise<{ success: boolean; message: string }> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: '로그인이 필요합니다.' }
  }

  const updatePayload: TablesUpdate<'users'> = {
    notion_database_id: databaseId,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = (await (supabase as any)
    .from('users')
    .update(updatePayload)
    .eq('id', user.id)) as { error: { message: string } | null }

  if (error) {
    return { success: false, message: `저장 실패: ${error.message}` }
  }

  return { success: true, message: 'Notion Database ID가 저장되었습니다.' }
}

/**
 * 마지막 동기화 시간 조회 (현재 사용자의 quotes 중 최신 synced_at)
 */
export async function getLastSyncedAt(): Promise<string | null> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data } = (await (supabase as any)
    .from('quotes')
    .select('*')
    .eq('user_id', user.id)
    .order('synced_at', { ascending: false })
    .limit(1)
    .maybeSingle()) as { data: Tables<'quotes'> | null; error: unknown }

  return data?.synced_at ?? null
}
