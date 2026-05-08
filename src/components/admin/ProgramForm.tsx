'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Program } from '@/lib/types'

interface Props {
  initialData?: Partial<Program>
  mode: 'create' | 'edit'
  id?: string
}

export default function ProgramForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    tagline: initialData?.tagline || '',
    description: initialData?.description || '',
    activities: (initialData?.activities || []).join('\n'),
    impact_goals: (initialData?.impact_goals || []).join('\n'),
    cover_image: initialData?.cover_image || '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const payload = {
      ...form,
      activities: form.activities.split('\n').map((a) => a.trim()).filter(Boolean),
      impact_goals: form.impact_goals.split('\n').map((g) => g.trim()).filter(Boolean),
    }
    const url = mode === 'create' ? '/api/admin/programs' : `/api/admin/programs/${id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setStatus('success')
      setTimeout(() => router.push('/admin/programs'), 800)
    } else {
      const data = await res.json().catch(() => ({}))
      setStatus('error')
      setErrorMsg(data.error || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div>
        <label className="label">Title *</label>
        <input required value={form.title} onChange={(e) => set('title', e.target.value)} className="input" placeholder="Education Program" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Slug</label>
          <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className="input" placeholder="education (auto-generated if blank)" />
          <p className="text-xs text-neutral-muted mt-1">Use existing slugs: education, environmental-sustainability, social-welfare</p>
        </div>
        <div>
          <label className="label">Tagline</label>
          <input value={form.tagline} onChange={(e) => set('tagline', e.target.value)} className="input" placeholder="Empowering Minds, Building Futures" />
        </div>
      </div>

      <div>
        <label className="label">Description *</label>
        <textarea required rows={4} value={form.description} onChange={(e) => set('description', e.target.value)} className="input resize-none" placeholder="Program description..." />
      </div>

      <div>
        <label className="label">Activities <span className="text-neutral-muted font-normal text-xs">(one per line)</span></label>
        <textarea rows={5} value={form.activities} onChange={(e) => set('activities', e.target.value)} className="input resize-none" placeholder="Weekly learning support sessions&#10;One-on-one mentorship&#10;Skills workshops" />
      </div>

      <div>
        <label className="label">Impact Goals <span className="text-neutral-muted font-normal text-xs">(one per line)</span></label>
        <textarea rows={4} value={form.impact_goals} onChange={(e) => set('impact_goals', e.target.value)} className="input resize-none" placeholder="Support 500+ students annually&#10;Train 50 volunteer mentors" />
      </div>

      <div>
        <label className="label">Cover Image URL</label>
        <input value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} className="input" placeholder="https://..." />
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
          {mode === 'create' ? 'Create Program' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/programs')} className="btn-outline text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
