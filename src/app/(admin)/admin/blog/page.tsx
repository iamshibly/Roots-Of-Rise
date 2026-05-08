import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate, getPostStatusColor } from '@/lib/utils'
import { PlusCircle, Pencil } from 'lucide-react'
import type { BlogPost } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Blog' }

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">Blog Posts</h1>
          <p className="text-neutral-muted mt-1 text-sm">{posts?.length ?? 0} posts</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-neutral-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-border bg-neutral-bg">
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Title</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Category</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Date</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-neutral-muted">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post: BlogPost) => (
              <tr key={post.id} className="border-b border-neutral-border last:border-0 hover:bg-neutral-bg/50">
                <td className="px-5 py-4">
                  <p className="font-medium text-neutral-text">{post.title}</p>
                  <p className="text-xs text-neutral-muted">By {post.author}</p>
                </td>
                <td className="px-5 py-4 text-neutral-muted capitalize">{post.category}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getPostStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-neutral-muted text-xs">{formatDate(post.created_at)}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/blog/${post.id}/edit`} className="text-neutral-muted hover:text-brand-green transition-colors">
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <DeleteButton id={post.id} endpoint="/api/admin/blog" label="post" />
                  </div>
                </td>
              </tr>
            ))}
            {!posts?.length && (
              <tr><td colSpan={5} className="px-5 py-12 text-center text-neutral-muted">No posts yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
