'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'

interface Props {
  id: string
  approved: boolean
}

export default function TestimonialActions({ id, approved }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const toggle = async () => {
    setLoading(true)
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved: !approved }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all disabled:opacity-50 ${
        approved
          ? 'border-red-200 text-red-600 hover:bg-red-50'
          : 'border-green-200 text-green-700 hover:bg-green-50'
      }`}
    >
      {approved ? (
        <><XCircle className="w-3.5 h-3.5" /> Unapprove</>
      ) : (
        <><CheckCircle2 className="w-3.5 h-3.5" /> Approve</>
      )}
    </button>
  )
}
