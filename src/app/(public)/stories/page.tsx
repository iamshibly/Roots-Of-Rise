import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'
import BlogCard from '@/components/shared/BlogCard'
import { STORIES_DATA } from '@/data/stories'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Stories — Roots of Rise',
  description: 'Read stories, updates, and insights from Roots of Rise — our volunteers, programs, and communities.',
}

export default async function StoriesPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  // Fall back to static demo data if DB is empty
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayPosts: any[] = (posts && posts.length > 0) ? posts : STORIES_DATA

  const featured = displayPosts.find((p) => p.featured)
  const rest = displayPosts.filter((p) => !p.featured)

  return (
    <>
      <PageHero
        title="Stories & Updates"
        subtitle="Read about our work, our volunteers, and the communities we serve."
        breadcrumbs={[{ label: 'Stories' }]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=500&fit=crop&auto=format"
      />

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading eyebrow="Blog" title="Latest Stories" />
          </AnimatedSection>

          {featured && (
            <AnimatedSection className="mt-12">
              <div className="card overflow-hidden lg:flex">
                <div className="relative lg:w-1/2 h-64 lg:h-auto min-h-[280px]">
                  <Image
                    src={featured.cover_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop'}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                  <span className="badge bg-brand-green text-white mb-3 w-fit">{featured.category}</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-neutral-text mb-3">{featured.title}</h2>
                  {featured.excerpt && <p className="text-neutral-muted mb-6 leading-relaxed">{featured.excerpt}</p>}
                  <Link href={`/stories/${featured.slug}`} className="btn-gradient inline-flex self-start">
                    Read Story
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          )}

          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {rest.map((post, i) => (
                <AnimatedSection key={post.id} delay={(i % 3) * 0.1}>
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
