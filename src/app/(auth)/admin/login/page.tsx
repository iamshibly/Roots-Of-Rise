import { Metadata } from 'next'
import LoginForm from '@/components/forms/LoginForm'

export const metadata: Metadata = {
  title: 'Admin Login — Roots of Rise',
  description: 'Sign in to the Roots of Rise admin dashboard.',
}

export default function AdminLoginPage() {
  return <LoginForm />
}
