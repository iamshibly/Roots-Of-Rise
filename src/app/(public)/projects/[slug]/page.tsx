import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Calendar, ArrowLeft, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { formatDate, getProjectCategoryLabel } from '@/lib/utils'
import AnimatedSection from '@/components/shared/AnimatedSection'
import StatusBadge from '@/components/shared/StatusBadge'
import { PROJECTS_DATA } from '@/data/projects'

export const revalidate = 3600

export async function generateStaticParams() {
  const staticSlugs = PROJECTS_DATA.map((p) => ({ slug: p.slug }))
  try {
    const { data } = await supabaseAdmin.from('projects').select('slug')
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
  const { data } = await supabase.from('projects').select('title, short_description').eq('slug', slug).single()
  if (data) return { title: `${data.title} — Roots of Rise`, description: data.short_description }
  const staticProject = PROJECTS_DATA.find((p) => p.slug === slug)
  if (!staticProject) return { title: 'Project Not Found' }
  return { title: `${staticProject.title} — Roots of Rise`, description: staticProject.short_description }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: dbProject } = await supabase.from('projects').select('*').eq('slug', slug).single()

  const staticProject = PROJECTS_DATA.find((p) => p.slug === slug)
  if (!dbProject && !staticProject) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const project: any = dbProject || staticProject

  return (
    <>
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src={project.cover_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=500&fit=crop'}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/40 via-transparent to-brand-blue/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-10 text-white">
            <Link href="/projects" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="badge bg-white/20 text-white">
                {getProjectCategoryLabel(project.category)}
              </span>
              <StatusBadge status={project.status} type="project" />
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-4 mt-3 text-white/70 text-sm">
              {project.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.location}</span>}
              {project.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(project.date)}</span>}
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {project.short_description && (
                <AnimatedSection>
                  <p className="text-lg text-neutral-muted leading-relaxed border-l-4 border-brand-green pl-5">
                    {project.short_description}
                  </p>
                </AnimatedSection>
              )}

              {project.full_description && (
                <AnimatedSection>
                  <h2 className="font-heading text-2xl font-bold text-neutral-text mb-4">About This Project</h2>
                  <div className="prose-brand">{project.full_description}</div>
                </AnimatedSection>
              )}

              {project.problem && (
                <AnimatedSection>
                  <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h2 className="font-heading font-bold text-lg text-neutral-text mb-2">The Problem</h2>
                    <p className="text-neutral-muted leading-relaxed">{project.problem}</p>
                  </div>
                </AnimatedSection>
              )}

              {project.solution && (
                <AnimatedSection>
                  <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                    <h2 className="font-heading font-bold text-lg text-neutral-text mb-2">Our Solution</h2>
                    <p className="text-neutral-muted leading-relaxed">{project.solution}</p>
                  </div>
                </AnimatedSection>
              )}

              {project.impact && (
                <AnimatedSection>
                  <div className="bg-brand-green-light rounded-2xl p-6 border border-brand-green-muted">
                    <h2 className="font-heading font-bold text-lg text-brand-green mb-2">Our Impact</h2>
                    <p className="text-neutral-muted leading-relaxed">{project.impact}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <AnimatedSection>
                  <h2 className="font-heading text-2xl font-bold text-neutral-text mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {project.gallery_images.map((img: string, i: number) => (
                      <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                        <Image src={img} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover" sizes="200px" />
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* SDG Tags */}
              {project.sdg_tags && project.sdg_tags.length > 0 && (
                <AnimatedSection>
                  <div className="card p-5">
                    <h3 className="font-heading font-bold text-neutral-text mb-3">SDG Alignment</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.sdg_tags.map((tag: string) => (
                        <span key={tag} className="badge bg-brand-green-light text-brand-green border border-brand-green-muted text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Impact Metrics */}
              {project.impact_metrics && Object.keys(project.impact_metrics).length > 0 && (
                <AnimatedSection>
                  <div className="card p-5">
                    <h3 className="font-heading font-bold text-neutral-text mb-3">Impact Metrics</h3>
                    <div className="space-y-3">
                      {Object.entries(project.impact_metrics).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-neutral-muted">{key}</span>
                          <span className="font-bold text-brand-green">{val as string}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* CTA */}
              <AnimatedSection>
                <div className="bg-brand-gradient rounded-2xl p-6 text-white text-center">
                  <h3 className="font-heading font-bold text-lg mb-2">Want to Help?</h3>
                  <p className="text-white/80 text-sm mb-4">Join as a volunteer and contribute to projects like this.</p>
                  <Link href="/join" className="btn-outline-white text-sm py-2.5 inline-flex">
                    Join as Volunteer <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
