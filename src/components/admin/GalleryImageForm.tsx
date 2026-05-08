'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'

interface Props {
  initialData?: Partial<GalleryImage>
  mode: 'create' | 'edit'
  id?: string
}

const CATEGORIES = ['Education', 'Environment', 'Social Welfare', 'Volunteers', 'Events', 'Other']

export default function GalleryImageForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    image_url: initialData?.image_url || '',
    caption: initialData?.caption || '',
    category: initialData?.category || 'Education',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const url = mode === 'create' ? '/api/admin/gallery' : `/api/admin/gallery/${id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setStatus('success')
      setTimeout(() => router.push('/admin/gallery'), 800)
    } else {
      const data = await res.json().catch(() => ({}))
      setStatus('error')
      setErrorMsg(data.error || 'Something went wrong.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
      <div>
        <label className="label">Image URL *</label>
        <input required value={form.image_url} onChange={(e) => set('image_url', e.target.value)} className="input" placeholder="https://images.unsplash.com/..." />
        {form.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image_url} alt="preview" className="mt-3 w-full max-h-48 object-cover rounded-xl border border-neutral-border" />
        )}
      </div>

      <div>
        <label className="label">Caption</label>
        <input value={form.caption} onChange={(e) => set('caption', e.target.value)} className="input" placeholder="Volunteers at the tree plantation drive" />
      </div>

      <div>
        <label className="label">Category</label>
        <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input">
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
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
          {mode === 'create' ? 'Add Image' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/gallery')} className="btn-outline text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
