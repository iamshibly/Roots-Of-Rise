import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'
import type { Metadata } from 'next'
import type { UserRole } from '@/lib/types'

export const metadata: Metadata = {
  title: { default: 'Admin — Roots of Rise', template: '%s — Admin' },
}

const ALLOWED_ROLES: UserRole[] = ['super_admin', 'admin', 'editor', 'volunteer_coordinator']

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/admin/login')

  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!userData || !ALLOWED_ROLES.includes(userData.role as UserRole)) {
    redirect('/dashboard')
  }

  return (
    <div className="flex min-h-screen bg-neutral-bg">
      <AdminSidebar role={userData.role as UserRole} email={user.email!} />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-neutral-text sticky top-0 z-30">
          <span className="font-heading font-bold text-white text-sm">Admin Panel</span>
          <span className="text-xs text-white/60 capitalize">{userData.role.replace('_', ' ')}</span>
        </div>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
