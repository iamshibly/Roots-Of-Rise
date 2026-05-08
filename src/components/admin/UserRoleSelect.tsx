'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/lib/types'

const ROLES: UserRole[] = ['member', 'volunteer_coordinator', 'editor', 'admin', 'super_admin']

interface Props {
  userId: string
  currentRole: UserRole
}

export default function UserRoleSelect({ userId, currentRole }: Props) {
  const router = useRouter()
  const [role, setRole] = useState(currentRole)
  const [loading, setLoading] = useState(false)

  const handleChange = async (newRole: UserRole) => {
    if (newRole === role) return
    setLoading(true)
    setRole(newRole)
    await fetch(`/api/admin/users/${userId}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <select
      value={role}
      onChange={e => handleChange(e.target.value as UserRole)}
      disabled={loading}
      className="text-xs border border-neutral-border rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-green disabled:opacity-50 capitalize"
    >
      {ROLES.map(r => (
        <option key={r} value={r} className="capitalize">{r.replace('_', ' ')}</option>
      ))}
    </select>
  )
}
