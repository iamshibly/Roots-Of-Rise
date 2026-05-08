'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { BlogPost } from '@/lib/types'

interface Props {
  initialData?: Partial<BlogPost>
  mode: 'create' | 'edit'
  id?: string
}

const CATEGORIES = ['Education', 'Environment', 'Social Welfare', 'Volunteering', 'Stories', 'Announcements']

export default function BlogPostForm({ initialData, mode, id }: Props) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    cover_image: initialData?.cover_image || '',
    category: initialData?.category || 'Education',
    author: initialData?.author || '',
    status: initialData?.status || 'draft',
    featured: initialData?.featured ?? false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: string, value: string | boolean) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const url = mode === 'create' ? '/api/admin/blog' : `/api/admin/blog/${id}`
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setStatus('success')
      setTimeout(() => router.push('/admin/blog'), 800)
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
        <input required value={form.title} onChange={(e) => set('title', e.target.value)} className="input" placeholder="Post title..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Author *</label>
          <input required value={form.author} onChange={(e) => set('author', e.target.value)} className="input" placeholder="Araf Rahman" />
        </div>
        <div>
          <label className="label">Category</label>
          <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Excerpt</label>
        <textarea rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} className="input resize-none" placeholder="Short summary shown in post listings..." />
      </div>

      <div>
        <label className="label">Content *</label>
        <textarea required rows={10} value={form.content} onChange={(e) => set('content', e.target.value)} className="input resize-y font-mono text-sm" placeholder="Full post content..." />
      </div>

      <div>
        <label className="label">Cover Image URL</label>
        <input value={form.cover_image} onChange={(e) => set('cover_image', e.target.value)} className="input" placeholder="https://..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Status</label>
          <select value={form.status} onChange={(e) => set('status', e.target.value)} className="input">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input type="checkbox" id="featured" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} className="w-4 h-4 accent-brand-green" />
          <label htmlFor="featured" className="text-sm font-medium text-neutral-text cursor-pointer">Featured post</label>
        </div>
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
          {mode === 'create' ? 'Publish Post' : 'Save Changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/blog')} className="btn-outline text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
