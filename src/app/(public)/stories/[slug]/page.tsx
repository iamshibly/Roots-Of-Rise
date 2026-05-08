import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { formatDate } from '@/lib/utils'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { STORIES_DATA } from '@/data/stories'

export const revalidate = 3600

export async function generateStaticParams() {
  const staticSlugs = STORIES_DATA.map((p) => ({ slug: p.slug }))
  try {
    const { data } = await supabaseAdmin.from('blog_posts').select('slug').eq('status', 'published')
    const dbSlugs = (data || []).map((p: { slug: string }) => ({ slug: p.slug }))
    const merged = [...staticSlugs]
    for (const s of dbSlugs) {
      if (!merged.find((m) => m.slug === s.slug)) merged.push(s)
    }
    return merged
  } catch {
    return staticSlugs
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('blog_posts').select('title, excerpt').eq('slug', slug).single()
  if (data) return { title: `${data.title} — Roots of Rise`, description: data.excerpt || undefined }
  const staticPost = STORIES_DATA.find((p) => p.slug === slug)
  if (!staticPost) return { title: 'Story Not Found' }
  return { title: `${staticPost.title} — Roots of Rise`, description: staticPost.excerpt }
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: dbPost } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  const staticPost = STORIES_DATA.find((p) => p.slug === slug)
  if (!dbPost && !staticPost) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const post: any = dbPost || staticPost

  return (
    <>
      <div className="relative h-[350px] md:h-[450px]">
        <Image
          src={post.cover_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=450&fit=crop'}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/40 via-transparent to-brand-blue/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-10 text-white">
            <Link href="/stories" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Stories
            </Link>
            <span className="badge bg-brand-green text-white mb-3 block w-fit">{post.category}</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold max-w-3xl">{post.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(post.created_at)}</span>
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{post.author}</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container max-w-3xl">
          {post.excerpt && (
            <AnimatedSection>
              <p className="text-xl text-neutral-muted leading-relaxed border-l-4 border-brand-green pl-5 mb-8">
                {post.excerpt}
              </p>
            </AnimatedSection>
          )}
          <AnimatedSection>
            <div className="prose prose-lg max-w-none text-neutral-muted leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </AnimatedSection>

          <AnimatedSection className="mt-12 pt-8 border-t border-neutral-border">
            <div className="flex items-center justify-between">
              <Link href="/stories" className="btn-outline inline-flex">
                <ArrowLeft className="w-4 h-4" /> All Stories
              </Link>
              <Link href="/join" className="btn-gradient inline-flex">
                Join Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
