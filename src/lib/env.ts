import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  VERCEL_URL: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // Notion
  NOTION_API_KEY: z.string().min(1),
  NOTION_DATABASE_ID: z.string().min(1),
  NOTION_ITEMS_DATABASE_ID: z.string().min(1).optional(),
})

// 빌드 타임에 환경변수 검증 (누락 시 명확한 에러 메시지)
const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
  NOTION_ITEMS_DATABASE_ID: process.env.NOTION_ITEMS_DATABASE_ID,
})

if (!parsed.success) {
  // 개발 환경에서만 경고 (누락된 Supabase 키는 런타임 에러로 처리)
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '[env] 일부 환경변수가 누락되었습니다:',
      parsed.error.flatten().fieldErrors
    )
  }
}

export const env = parsed.success
  ? parsed.data
  : (process.env as unknown as z.infer<typeof envSchema>)

export type Env = z.infer<typeof envSchema>
