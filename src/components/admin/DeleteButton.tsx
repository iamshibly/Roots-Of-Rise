'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface Props {
  id: string
  endpoint: string
  label: string
}

export default function DeleteButton({ id, endpoint, label }: Props) {
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    await fetch(`${endpoint}/${id}`, { method: 'DELETE' })
    setLoading(false)
    setConfirming(false)
    router.refresh()
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-1.5">
        <button onClick={handleDelete} disabled={loading} className="text-xs text-red-600 font-medium hover:underline disabled:opacity-50">
          {loading ? 'Deleting…' : 'Confirm'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-neutral-muted hover:underline">Cancel</button>
      </span>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      title={`Delete ${label}`}
      className="text-neutral-muted hover:text-red-600 transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  )
}
