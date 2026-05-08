import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, Target, ArrowRight, Users, Leaf, BookOpen, Heart } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import EducationDiagram from '@/components/shared/EducationDiagram'
import { PROGRAMS_DATA } from '@/data/programs'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const staticSlugs = PROGRAMS_DATA.map((p) => ({ slug: p.slug }))
  try {
    const { data } = await supabaseAdmin.from('programs').select('slug')
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('programs').select('title, tagline').eq('slug', slug).single()
  if (data) return { title: `${data.title} — Roots of Rise`, description: data.tagline || undefined }
  const staticProgram = PROGRAMS_DATA.find((p) => p.slug === slug)
  if (!staticProgram) return { title: 'Not Found' }
  return { title: `${staticProgram.title} — Roots of Rise`, description: staticProgram.tagline }
}

const pillarIcons: Record<string, React.ReactNode> = {
  education: <BookOpen className="w-6 h-6 text-blue-600" />,
  'environmental-sustainability': <Leaf className="w-6 h-6 text-brand-green" />,
  'social-welfare': <Heart className="w-6 h-6 text-rose-600" />,
}

const pillarAccent: Record<string, { badge: string; border: string; bg: string; text: string }> = {
  education: { badge: 'bg-blue-100 text-blue-700', border: 'border-blue-200', bg: 'bg-blue-50', text: 'text-blue-700' },
  'environmental-sustainability': { badge: 'bg-brand-green-light text-brand-green', border: 'border-brand-green-muted', bg: 'bg-brand-green-light', text: 'text-brand-green' },
  'social-welfare': { badge: 'bg-rose-50 text-rose-700', border: 'border-rose-200', bg: 'bg-rose-50', text: 'text-rose-700' },
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: dbProgram } = await supabase.from('programs').select('*').eq('slug', slug).single()
  const staticProgram = PROGRAMS_DATA.find((p) => p.slug === slug)

  if (!dbProgram && !staticProgram) notFound()

  // Prefer DB data, fall back to static
  const program = dbProgram || staticProgram!
  const accent = pillarAccent[slug] || pillarAccent['education']

  // For enhanced display, merge static extras if available
  const extras = staticProgram || null

  return (
    <>
      {/* Hero */}
      <div className="relative h-[480px] md:h-[580px] overflow-hidden">
        <Image
          src={
            (dbProgram as { cover_image?: string } | null)?.cover_image ||
            extras?.coverImage ||
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop'
          }
          alt={program.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/40 via-transparent to-brand-blue/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-14 text-white">
            <AnimatedSection>
              <div className="flex items-center gap-2 mb-4">
                <Link
                  href="/programs"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  Programs
                </Link>
                <span className="text-white/40">/</span>
                <span className="text-white/90 text-sm">{program.title}</span>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium mb-4 ${accent.badge}`}>
                {pillarIcons[slug]}
                {program.title}
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                {extras?.heroTitle || program.title}
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl">
                {(program as { tagline?: string }).tagline || extras?.tagline}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      {extras?.stats && (
        <section className={`py-10 ${accent.bg} border-b ${accent.border}`}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {extras.stats.map((stat, i) => (
                <AnimatedSection key={stat.label} delay={i * 0.08}>
                  <div className="text-center">
                    <p className={`font-heading text-4xl font-bold ${accent.text}`}>{stat.value}</p>
                    <p className="text-sm text-neutral-muted mt-1 font-medium">{stat.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <AnimatedSection>
                <SectionHeading
                  eyebrow="About This Program"
                  title={extras?.heroTitle || program.title}
                />
                <p className="text-neutral-muted leading-relaxed text-lg mt-6">
                  {(program as { description?: string }).description || extras?.description}
                </p>
              </AnimatedSection>

              {/* Why it matters */}
              {extras?.whyItMatters && (
                <AnimatedSection delay={0.1}>
                  <div className={`rounded-2xl p-7 border ${accent.bg} ${accent.border}`}>
                    <h3 className="font-heading text-xl font-bold text-neutral-text mb-3">
                      Why This Matters in Bangladesh
                    </h3>
                    <p className="text-neutral-muted leading-relaxed">{extras.whyItMatters}</p>
                  </div>
                </AnimatedSection>
              )}

              {/* Activities */}
              {(((program as { activities?: string[] }).activities) || extras?.activities || []).length > 0 && (
                <AnimatedSection delay={0.15}>
                  <h3 className="font-heading text-xl font-bold text-neutral-text mb-5">Key Activities</h3>
                  <ul className="space-y-3">
                    {(((program as { activities?: string[] }).activities) || extras?.activities || []).map(
                      (activity: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${accent.text}`} />
                          <span className="text-neutral-muted">{activity}</span>
                        </li>
                      )
                    )}
                  </ul>
                </AnimatedSection>
              )}

              {/* Education Diagram */}
              {slug === 'education' && (
                <AnimatedSection delay={0.18}>
                  <EducationDiagram />
                </AnimatedSection>
              )}

              {/* Gallery */}
              {extras?.gallery && extras.gallery.length > 0 && (
                <AnimatedSection delay={0.2}>
                  <h3 className="font-heading text-xl font-bold text-neutral-text mb-5">From Our Work</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {extras.gallery.map((img, i) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden group">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 33vw, 200px"
                        />
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Impact Goals */}
              {(((program as { impact_goals?: string[] }).impact_goals) || extras?.impactGoals || []).length > 0 && (
                <AnimatedSection direction="right">
                  <div className={`rounded-2xl p-6 border ${accent.bg} ${accent.border}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <Target className={`w-5 h-5 ${accent.text}`} />
                      <h3 className={`font-heading font-bold ${accent.text}`}>Impact Goals</h3>
                    </div>
                    <ul className="space-y-2">
                      {(((program as { impact_goals?: string[] }).impact_goals) || extras?.impactGoals || []).map(
                        (goal: string, i: number) => (
                          <li key={i} className="text-sm text-neutral-text flex items-start gap-2">
                            <span className={`font-bold shrink-0 ${accent.text}`}>{i + 1}.</span>
                            {goal}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </AnimatedSection>
              )}

              {/* Other Programs */}
              <AnimatedSection direction="right" delay={0.1}>
                <div className="card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-neutral-muted" />
                    <h3 className="font-heading font-bold text-neutral-text">Other Programs</h3>
                  </div>
                  <ul className="space-y-2">
                    {PROGRAMS_DATA.filter((p) => p.slug !== slug).map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={`/programs/${p.slug}`}
                          className="text-sm text-neutral-muted hover:text-brand-green transition-colors flex items-center gap-1"
                        >
                          <ArrowRight className="w-3 h-3" /> {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* CTA */}
              <AnimatedSection direction="right" delay={0.15}>
                <div className="bg-brand-gradient rounded-2xl p-6 text-center text-white">
                  <p className="font-heading font-bold text-lg mb-2">Ready to Get Involved?</p>
                  <p className="text-sm text-white/80 mb-5">
                    Join our team and make a real difference in this program.
                  </p>
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 bg-white text-brand-green font-semibold px-6 py-3 rounded-xl hover:bg-brand-green-light transition-colors text-sm"
                  >
                    Join Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-sm bg-neutral-bg">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-neutral-text mb-3">
              Explore All Programs
            </h2>
            <p className="text-neutral-muted mb-6 max-w-lg mx-auto">
              Roots of Rise works across three core pillars — see how they connect.
            </p>
            <Link href="/programs" className="btn-primary inline-flex">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
