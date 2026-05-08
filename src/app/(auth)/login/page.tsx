import { Metadata } from 'next'
import LoginForm from '@/components/forms/LoginForm'

export const metadata: Metadata = {
  title: 'Login — Roots of Rise',
  description: 'Sign in to your Roots of Rise account using your email address.',
}

export default function LoginPage() {
  return <LoginForm />
}
