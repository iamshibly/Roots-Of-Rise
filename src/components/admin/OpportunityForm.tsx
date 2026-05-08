'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Opportunity } from '@/lib/types'

interface Props {
  initialData?: Partial<Opportunity>
  mode: 'create' | 'edit'
  id?: string
}

const INTEREST_AREAS = ['Education', 'Environmental Sustainability', 'Social Welfare', 'Media & Content', 'Event Management', 'Fundraising', 'Research & Documentation', 'Leadership & Coordination', 'IT & Technology', 'Other']

export default function OpportunityForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initialData?.title || '',
    type: initialData?.type || 'volunteer',
    description: initialData?.description || '',
    category: initialData?.category || '',
    interest_area: initialData?.interest_area || 'Education',
    location: initialData?.location || '',
    requirements: (initialData?.requirements || []).join('\n'),
    responsibilities: initialData?.responsibilities || '',
    commitment: initialData?.commitment || '',
    status: initialData?.status || 'open',
    is_active: initialData?.is_active ?? true,
    deadline: initialData?.deadline ? initialData.deadline.slice(0, 10) : '',
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string, value: string | boolean) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')
    setErrorMsg('')
    const payload = {
      ...form,
      requirements: form.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
      deadline: form.deadline || null,
    }
    const url = mode === 'create' ? '/api/admin/opportunities' : `/api/admin/opportunities/${id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setSubmitStatus('success')
      setTimeout(() => router.push('/admin/opportunities'), 800)
    } else {
      const data = await res.json().catch(() => ({}))
      setSubmitStatus('error')
      setErrorMsg(data.error || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="label">Title *</label>
        <input required value={form.title} onChange={(e) => set('title', e.target.value)} className="input" placeholder="Volunteer Coordinator" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Type</label>
          <select value={form.type} onChange={(e) => set('type', e.target.value)} className="input">
            <option value="volunteer">Volunteer</option>
            <option value="internship">Internship</option>
            <option value="fellowship">Fellowship</option>
            <option value="event">Event</option>
          </select>
        </div>
        <div>
          <label className="label">Interest Area *</label>
          <select value={form.interest_area} onChange={(e) => set('interest_area', e.target.value)} className="input">
            {INTEREST_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Description</label>
        <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} className="input resize-none" placeholder="Role description..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Location</label>
          <input value={form.location} onChange={(e) => set('location', e.target.value)} className="input" placeholder="Dhaka, Bangladesh / Remote" />
        </div>
        <div>
          <label className="label">Commitment</label>
          <input value={form.commitment} onChange={(e) => set('commitment', e.target.value)} className="input" placeholder="5 hours/week" />
        </div>
      </div>

      <div>
        <label className="label">Requirements <span className="text-neutral-muted font-normal text-xs">(one per line)</span></label>
        <textarea rows={4} value={form.requirements} onChange={(e) => set('requirements', e.target.value)} className="input resize-none" placeholder="Must be a university student&#10;Available on weekends&#10;Strong communication skills" />
      </div>

      <div>
        <label className="label">Responsibilities</label>
        <textarea rows={3} value={form.responsibilities} onChange={(e) => set('responsibilities', e.target.value)} className="input resize-none" placeholder="Day-to-day responsibilities..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input">
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <div>
          <label className="label">Application Deadline</label>
          <input type="date" value={form.deadline} onChange={(e) => set('deadline', e.target.value)} className="input" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} className="w-4 h-4 accent-brand-green" />
        <label htmlFor="is_active" className="text-sm font-medium text-neutral-text cursor-pointer">Visible to volunteers</label>
      </div>

      {submitStatus === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-sm text-red-600">
          <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button type="submit" disabled={submitStatus === 'loading' || submitStatus === 'success'} className="btn-primary disabled:opacity-60 flex items-center gap-2">
          {submitStatus === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
          {submitStatus === 'success' && <CheckCircle2 className="w-4 h-4" />}
          {mode === 'create' ? 'Create Opportunity' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/opportunities')} className="btn-outline text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
