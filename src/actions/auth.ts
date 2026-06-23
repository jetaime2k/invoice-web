'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * 이메일/비밀번호 로그인
 * 성공 시 /quotes 리다이렉트
 */
export async function signIn(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return '이메일 또는 비밀번호가 올바르지 않습니다.'
    }
    if (error.message.includes('Email not confirmed')) {
      return '이메일 인증이 완료되지 않았습니다. 받은 편지함을 확인하거나, Supabase Dashboard에서 이메일 인증을 비활성화하세요.'
    }
    return error.message
  }

  redirect('/quotes')
}

/**
 * 이메일/비밀번호 회원가입
 * 성공 시 /login 리다이렉트
 */
export async function signUp(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({ email, password })

  if (error) {
    if (error.message.includes('already registered')) {
      return '이미 사용 중인 이메일입니다.'
    }
    return error.message
  }

  redirect('/login?registered=true')
}

/**
 * 로그아웃
 * 성공 시 /login 리다이렉트
 */
export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
