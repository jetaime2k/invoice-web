import { Metadata } from 'next'

import { RegisterForm } from '@/components/register-form'

export const metadata: Metadata = {
  title: '회원가입',
  description: '새 계정을 만들어 서비스를 시작하세요',
}

export default function RegisterPage() {
  return <RegisterForm />
}
