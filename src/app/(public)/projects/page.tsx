import { Metadata } from 'next'
import { Calendar, Rocket } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ProjectCard from '@/components/shared/ProjectCard'
import { PROJECTS_DATA } from '@/data/projects'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Projects — Roots of Rise',
  description: 'Explore the projects and activities of Roots of Rise across education, environmental sustainability, and social welfare.',
}

const CATEGORY_LABELS: Record<string, string> = {
  education: 'Education',
  environment: 'Environment',
  social_welfare: 'Social Welfare',
}

const CATEGORY_COLORS: Record<string, string> = {
  education: 'bg-blue-100 text-blue-700',
  environment: 'bg-emerald-100 text-emerald-700',
  social_welfare: 'bg-rose-100 text-rose-700',
}

const STATUS_COLORS: Record<string, string> = {
  planning: 'bg-amber-100 text-amber-700',
  active: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-neutral-100 text-neutral-600',
  on_hold: 'bg-red-100 text-red-700',
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  // Fall back to static demo data if DB is empty
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allProjects: any[] = (projects && projects.length > 0) ? projects : PROJECTS_DATA

  const currentProjects = allProjects.filter(
    (p) => p.status === 'active' || p.status === 'completed'
  )
  const upcomingProjects = allProjects.filter((p) => p.status === 'planning' || p.status === 'on_hold')

  return (
    <>
      <PageHero
        title="Projects & Activities"
        subtitle="Practical, community-driven initiatives across our three pillars of impact."
        breadcrumbs={[{ label: 'Projects' }]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=500&fit=crop&auto=format"
      />

      {/* Current & Completed Projects */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Work"
              title="Current & Completed Projects"
              subtitle="Ongoing initiatives making a real difference, and completed projects that have already created lasting impact."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {currentProjects.map((project, i) => (
              <AnimatedSection key={project.id} delay={(i % 3) * 0.1}>
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming / Future Projects */}
      {upcomingProjects.length > 0 && (
        <section className="section bg-neutral-bg">
          <div className="container">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                  Coming Soon
                </span>
              </div>
              <SectionHeading
                eyebrow=""
                title="Upcoming & Future Projects"
                subtitle="Projects in planning — initiatives we're building toward as we grow our impact and our community."
              />
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {upcomingProjects.map((project, i) => (
                <AnimatedSection key={project.id} delay={(i % 3) * 0.08}>
                  <div className="bg-white rounded-2xl border border-dashed border-neutral-border overflow-hidden hover:shadow-md transition-shadow group">
                    {/* Top accent bar */}
                    <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-400" />
                    <div className="p-6">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[project.category] || 'bg-neutral-100 text-neutral-600'}`}>
                          {CATEGORY_LABELS[project.category] || project.category}
                        </span>
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[project.status] || 'bg-neutral-100 text-neutral-600'}`}>
                          Planning
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-neutral-text text-lg leading-snug mb-2 group-hover:text-brand-green transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-muted leading-relaxed mb-5">
                        {project.short_description}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-neutral-muted border-t border-neutral-border pt-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {project.location}
                        </span>
                        {project.impact_metrics?.['Launch'] && (
                          <span className="flex items-center gap-1.5">
                            <Rocket className="w-3.5 h-3.5 text-amber-500" />
                            {project.impact_metrics['Launch']}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
