import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BlogPostForm from '@/components/admin/BlogPostForm'

export const metadata: Metadata = { title: 'Edit Blog Post' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase.from('blog_posts').select('*').eq('id', id).single()
  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Edit Post</h1>
        <p className="text-neutral-muted mt-1 text-sm truncate max-w-lg">{post.title}</p>
      </div>
      <BlogPostForm mode="edit" id={id} initialData={post} />
    </div>
  )
}
