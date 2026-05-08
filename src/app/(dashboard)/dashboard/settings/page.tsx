import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import { Mail, Shield, Clock, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('role, created_at, last_login_at, is_email_verified')
    .eq('id', user.id)
    .single()

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Settings</h1>
        <p className="text-neutral-muted mt-1 text-sm">Manage your account information and preferences.</p>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-2xl border border-neutral-border divide-y divide-neutral-border">
        <div className="px-6 py-4">
          <p className="text-xs font-semibold text-neutral-muted uppercase tracking-wider mb-4">Account Details</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <p className="text-xs text-neutral-muted">Email address</p>
                <p className="text-sm font-medium text-neutral-text">{user.email}</p>
              </div>
              {userData?.is_email_verified && (
                <span className="ml-auto text-xs bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full font-medium">Verified</span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-brand-green" />
              </div>
              <div>
                <p className="text-xs text-neutral-muted">Role</p>
                <p className="text-sm font-medium text-neutral-text capitalize">{userData?.role?.replace('_', ' ')}</p>
              </div>
            </div>
            {userData?.created_at && (
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-brand-green-light flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-brand-green" />
                </div>
                <div>
                  <p className="text-xs text-neutral-muted">Member since</p>
                  <p className="text-sm font-medium text-neutral-text">{formatDate(userData.created_at)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="bg-white rounded-2xl border border-neutral-border p-6">
        <p className="text-xs font-semibold text-neutral-muted uppercase tracking-wider mb-4">Authentication</p>
        <p className="text-sm text-neutral-muted leading-relaxed">
          Your account uses <strong className="text-neutral-text">email magic links</strong> — no password required.
          Each time you sign in, a secure one-time link is sent to your email address.
        </p>
        {userData?.last_login_at && (
          <p className="text-xs text-neutral-muted mt-3">
            Last login: {formatDate(userData.last_login_at, 'MMM d, yyyy \'at\' h:mm a')}
          </p>
        )}
      </div>

      {/* Sign out */}
      <div className="bg-white rounded-2xl border border-neutral-border p-6">
        <p className="text-xs font-semibold text-neutral-muted uppercase tracking-wider mb-3">Session</p>
        <p className="text-sm text-neutral-muted mb-4">Sign out of your account on this device.</p>
        <form action="/api/auth/logout" method="post">
          <button className="btn-outline text-sm text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300">
            Sign Out
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <p className="text-sm font-semibold text-red-700">Danger Zone</p>
        </div>
        <p className="text-sm text-red-600 mb-4">
          To request account deletion or data export, please contact us at{' '}
          <a href="mailto:info@rootsofrise.org" className="underline font-medium">info@rootsofrise.org</a>.
          We&apos;ll process your request within 30 days.
        </p>
      </div>
    </div>
  )
}
