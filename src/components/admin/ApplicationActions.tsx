'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import type { ApplicationStatus } from '@/lib/types'

interface Props {
  applicationId: string
  currentStatus: ApplicationStatus
  currentNotes: string
}

const STATUSES: { value: ApplicationStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Submitted', color: 'text-yellow-700' },
  { value: 'under_review', label: 'Under Review', color: 'text-blue-700' },
  { value: 'accepted', label: 'Accept', color: 'text-green-700' },
  { value: 'waitlisted', label: 'Waitlist', color: 'text-purple-700' },
  { value: 'rejected', label: 'Reject', color: 'text-red-700' },
]

export default function ApplicationActions({ applicationId, currentStatus, currentNotes }: Props) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(currentNotes)
  const [loading, setLoading] = useState(false)

  const updateStatus = async (status: ApplicationStatus) => {
    setLoading(true)
    setOpen(false)
    await fetch(`/api/admin/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, admin_notes: notes }),
    })
    setLoading(false)
    router.refresh()
  }

  const saveNotes = async () => {
    setLoading(true)
    await fetch(`/api/admin/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: currentStatus, admin_notes: notes }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <div className="flex items-center gap-2">
      {/* Status dropdown */}
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          disabled={loading}
          className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border border-neutral-border hover:border-brand-green transition-colors disabled:opacity-50"
        >
          Status <ChevronDown className="w-3 h-3" />
        </button>
        {open && (
          <div className="absolute left-0 top-full mt-1 w-36 bg-white rounded-xl border border-neutral-border shadow-lg z-20">
            {STATUSES.map(s => (
              <button
                key={s.value}
                onClick={() => updateStatus(s.value)}
                className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-neutral-bg transition-colors first:rounded-t-xl last:rounded-b-xl ${s.color} ${s.value === currentStatus ? 'bg-neutral-bg' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Notes popover trigger */}
      <div className="relative group">
        <button className="text-xs text-neutral-muted hover:text-brand-green px-2 py-1.5 rounded-lg hover:bg-brand-green-light transition-colors">
          Notes
        </button>
        <div className="hidden group-hover:block absolute right-0 top-full mt-1 w-64 bg-white rounded-xl border border-neutral-border shadow-lg z-20 p-3">
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="w-full text-xs border border-neutral-border rounded-lg p-2 resize-none focus:outline-none focus:border-brand-green"
            placeholder="Admin notes..."
          />
          <button
            onClick={saveNotes}
            disabled={loading}
            className="mt-2 w-full text-xs bg-brand-green text-white py-1.5 rounded-lg hover:bg-brand-green-dark transition-colors disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
