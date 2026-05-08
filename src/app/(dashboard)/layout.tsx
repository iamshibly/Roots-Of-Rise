import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import UserSidebar from '@/components/dashboard/UserSidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Dashboard — Roots of Rise', template: '%s — Roots of Rise' },
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('*, profiles(*)')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-neutral-bg">
      <UserSidebar user={userData} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-neutral-border sticky top-0 z-30">
          <span className="font-heading font-bold text-brand-green text-sm">Roots of Rise</span>
          <span className="text-xs text-neutral-muted capitalize">{userData?.role?.replace('_', ' ')}</span>
        </div>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
