'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { TeamMember } from '@/lib/types'

interface Props {
  initialData?: Partial<TeamMember>
  mode: 'create' | 'edit'
  id?: string
}

export default function TeamMemberForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    name: initialData?.name || '',
    role: initialData?.role || '',
    bio: initialData?.bio || '',
    photo: initialData?.photo || '',
    linkedin: initialData?.linkedin || '',
    facebook: initialData?.facebook || '',
    email: initialData?.email || '',
    display_order: initialData?.display_order ?? 0,
    status: initialData?.status || 'active',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const url = mode === 'create' ? '/api/admin/team' : `/api/admin/team/${id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setStatus('success')
      setTimeout(() => router.push('/admin/team'), 800)
    } else {
      const data = await res.json().catch(() => ({}))
      setStatus('error')
      setErrorMsg(data.error || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Full Name *</label>
          <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="input" placeholder="Araf Rahman" />
        </div>
        <div>
          <label className="label">Role / Title *</label>
          <input required value={form.role} onChange={(e) => set('role', e.target.value)} className="input" placeholder="Founder & President" />
        </div>
      </div>

      <div>
        <label className="label">Bio</label>
        <textarea rows={3} value={form.bio} onChange={(e) => set('bio', e.target.value)} className="input resize-none" placeholder="Short biography..." />
      </div>

      <div>
        <label className="label">Photo URL</label>
        <input value={form.photo} onChange={(e) => set('photo', e.target.value)} className="input" placeholder="https://..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Email</label>
          <input type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className="input" placeholder="member@rootsofrise.org" />
        </div>
        <div>
          <label className="label">LinkedIn URL</label>
          <input value={form.linkedin} onChange={(e) => set('linkedin', e.target.value)} className="input" placeholder="https://linkedin.com/in/..." />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Facebook URL</label>
          <input value={form.facebook} onChange={(e) => set('facebook', e.target.value)} className="input" placeholder="https://facebook.com/..." />
        </div>
        <div>
          <label className="label">Display Order</label>
          <input type="number" value={form.display_order} onChange={(e) => set('display_order', parseInt(e.target.value) || 0)} className="input" min={0} />
        </div>
      </div>

      <div>
        <label className="label">Status</label>
        <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={status === 'loading' || status === 'success'} className="btn-primary disabled:opacity-60 flex items-center gap-2">
          {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === 'success' && <CheckCircle2 className="w-4 h-4" />}
          {mode === 'create' ? 'Add Member' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/team')} className="btn-outline text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
