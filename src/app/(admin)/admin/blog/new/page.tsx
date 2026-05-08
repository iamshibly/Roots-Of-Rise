import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BlogPostForm from '@/components/admin/BlogPostForm'

export const metadata: Metadata = { title: 'New Blog Post' }

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">New Blog Post</h1>
        <p className="text-neutral-muted mt-1 text-sm">Write and publish a new story or article.</p>
      </div>
      <BlogPostForm mode="create" />
    </div>
  )
}
