'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Project } from '@/lib/types'

interface Props {
  initialData?: Partial<Project>
  mode: 'create' | 'edit'
  id?: string
}

export default function ProjectForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'education',
    short_description: initialData?.short_description || '',
    full_description: initialData?.full_description || '',
    problem: initialData?.problem || '',
    solution: initialData?.solution || '',
    impact: initialData?.impact || '',
    cover_image: initialData?.cover_image || '',
    location: initialData?.location || '',
    date: initialData?.date ? initialData.date.slice(0, 10) : '',
    status: initialData?.status || 'planning',
    featured: initialData?.featured ?? false,
    sdg_tags: (initialData?.sdg_tags || []).join('\n'),
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
      sdg_tags: form.sdg_tags.split('\n').map((t) => t.trim()).filter(Boolean),
      date: form.date || null,
    }
    const url = mode === 'create' ? '/api/admin/projects' : `/api/admin/projects/${id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      setSubmitStatus('success')
      setTimeout(() => router.push('/admin/projects'), 800)
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
        <input required value={form.title} onChange={(e) => set('title', e.target.value)} className="input" placeholder="Community Learning Support Program" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input">
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="social_welfare">Social Welfare</option>
          </select>
        </div>
        <div>
          <label className="label">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input">
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">Short Description *</label>
        <textarea required rows={2} value={form.short_description} onChange={(e) => set('short_description', e.target.value)} className="input resize-none" placeholder="One-line project summary..." />
      </div>

      <div>
        <label className="label">Full Description</label>
        <textarea rows={4} value={form.full_description} onChange={(e) => set('full_description', e.target.value)} className="input resize-none" placeholder="Full project description..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Problem</label>
          <textarea rows={3} value={form.problem} onChange={(e) => set('problem', e.target.value)} className="input resize-none" placeholder="Problem this project addresses..." />
        </div>
        <div>
          <label className="label">Solution</label>
          <textarea rows={3} value={form.solution} onChange={(e) => set('solution', e.target.value)} className="input resize-none" placeholder="How we address it..." />
        </div>
      </div>

      <div>
        <label className="label">Impact</label>
        <textarea rows={2} value={form.impact} onChange={(e) => set('impact', e.target.value)} className="input resize-none" placeholder="Results achieved or expected..." />
      </div>

      <div>
        <label className="label">Cover Image URL</label>
        <input value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} className="input" placeholder="https://..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Location</label>
          <input value={form.location} onChange={(e) => set('location', e.target.value)} className="input" placeholder="Dhaka, Bangladesh" />
        </div>
        <div>
          <label className="label">Date</label>
          <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} className="input" />
        </div>
      </div>

      <div>
        <label className="label">SDG Tags <span className="text-neutral-muted font-normal text-xs">(one per line)</span></label>
        <textarea rows={3} value={form.sdg_tags} onChange={(e) => set('sdg_tags', e.target.value)} className="input resize-none" placeholder="SDG 4: Quality Education&#10;SDG 10: Reduced Inequalities" />
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-brand-green" />
        <label htmlFor="featured" className="text-sm font-medium text-neutral-text cursor-pointer">Featured project (shown on homepage)</label>
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
          {mode === 'create' ? 'Create Project' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/projects')} className="btn-outline text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
