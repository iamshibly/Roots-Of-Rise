'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { MessageStatus } from '@/lib/types'

const STATUSES: MessageStatus[] = ['new', 'read', 'replied', 'archived']

interface Props {
  id: string
  currentStatus: MessageStatus
}

export default function MessageStatusSelect({ id, currentStatus }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleChange = async (status: MessageStatus) => {
    setLoading(true)
    await fetch(`/api/admin/contact-messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={e => handleChange(e.target.value as MessageStatus)}
      disabled={loading}
      className="text-xs border border-neutral-border rounded-lg px-2 py-1.5 focus:outline-none focus:border-brand-green disabled:opacity-50 capitalize"
    >
      {STATUSES.map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  )
}
