'use server'

import { createClient } from '@/lib/supabase/server'
import type { ShareLink } from '@/types/share-link'
import type { Tables } from '@/types/database.types'

type ShareLinkRow = Tables<'share_links'>

function toShareLink(row: ShareLinkRow): ShareLink {
  return {
    id: row.id,
    quoteId: row.quote_id,
    token: row.token,
    isActive: row.is_active,
    createdAt: row.created_at,
  }
}

/**
 * 견적서 ID로 최신 공유 링크 조회
 */
export async function getShareLinkByQuoteId(
  quoteId: string
): Promise<ShareLink | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('share_links')
    .select('*')
    .eq('quote_id', quoteId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw new Error(`공유 링크 조회 실패: ${error.message}`)
  if (!data) return null

  return toShareLink(data as ShareLinkRow)
}

/**
 * 토큰으로 공유 링크 조회 (비로그인 클라이언트용)
 */
export async function getShareLinkByToken(
  token: string
): Promise<ShareLink | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('share_links')
    .select('*')
    .eq('token', token)
    .maybeSingle()

  if (error) throw new Error(`공유 링크 조회 실패: ${error.message}`)
  if (!data) return null

  return toShareLink(data as ShareLinkRow)
}

/**
 * 공유 링크 생성 (기존 링크 비활성화 후 신규 생성)
 */
export async function createShareLink(quoteId: string): Promise<ShareLink> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createClient()) as any

  // 기존 링크 전체 비활성화
  await supabase
    .from('share_links')
    .update({ is_active: false })
    .eq('quote_id', quoteId)

  const token = crypto.randomUUID().replace(/-/g, '')

  const { data, error } = await supabase
    .from('share_links')
    .insert({ quote_id: quoteId, token, is_active: true })
    .select()
    .single()

  if (error) throw new Error(`공유 링크 생성 실패: ${error.message}`)

  return toShareLink(data as ShareLinkRow)
}
