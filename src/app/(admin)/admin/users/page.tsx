import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import UserRoleSelect from '@/components/admin/UserRoleSelect'
import type { User } from '@/lib/types'

export const metadata: Metadata = { title: 'Users' }

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const { page = '1' } = await searchParams
  const supabase = await createClient()

  const { data: currentUser } = await supabase.auth.getUser()
  const { data: me } = await supabase.from('users').select('role').eq('id', currentUser.user!.id).single()

  const pageNum = parseInt(page)
  const limit = 25
  const offset = (pageNum - 1) * limit

  const { data: users, count } = await supabase
    .from('users')
    .select('*, profiles(full_name)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const roleBadge: Record<string, string> = {
    member: 'bg-gray-100 text-gray-700',
    volunteer_coordinator: 'bg-blue-100 text-blue-700',
    editor: 'bg-purple-100 text-purple-700',
    admin: 'bg-amber-100 text-amber-700',
    super_admin: 'bg-brand-green-light text-brand-green',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Users</h1>
        <p className="text-neutral-muted mt-1 text-sm">{count ?? 0} registered users</p>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-neutral-bg">
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">User</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Joined</th>
                {me?.role === 'super_admin' && (
                  <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Change Role</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users?.map((user: User & { profiles?: { full_name: string | null } | null }) => (
                <tr key={user.id} className="border-b border-neutral-border last:border-0 hover:bg-neutral-bg/50">
                  <td className="px-5 py-4">
                    <p className="font-medium text-neutral-text">
                      {user.profiles?.full_name || user.email.split('@')[0]}
                    </p>
                    <p className="text-xs text-neutral-muted">{user.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${roleBadge[user.role] || 'bg-gray-100 text-gray-700'}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-neutral-muted text-xs">{formatDate(user.created_at)}</td>
                  {me?.role === 'super_admin' && (
                    <td className="px-5 py-4">
                      <UserRoleSelect userId={user.id} currentRole={user.role} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
