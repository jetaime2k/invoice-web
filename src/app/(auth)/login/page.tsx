import { Metadata } from 'next'

import { LoginForm } from '@/components/login-form'

export const metadata: Metadata = {
  title: '로그인',
  description: '계정에 로그인하여 서비스를 이용하세요',
}

interface LoginPageProps {
  searchParams: Promise<{ registered?: string; from?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const showRegisteredMessage = params.registered === 'true'

  return <LoginForm showRegisteredMessage={showRegisteredMessage} />
}
