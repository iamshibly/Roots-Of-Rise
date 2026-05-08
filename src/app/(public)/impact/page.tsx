import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Users, Leaf, BookOpen, Heart, Globe, Trophy, TrendingUp } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'
import ImpactCounter from '@/components/shared/ImpactCounter'
import { parseImpactStats } from '@/lib/utils'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Our Impact — Roots of Rise',
  description: 'See the impact of Roots of Rise across education, environmental sustainability, and social welfare.',
}

const DEMO_STATS = {
  volunteers: 100,
  projects: 10,
  communities: 5,
  lives: 300,
}

const yearlyData = [
  { year: '2024', volunteers: 30, projects: 3, families: 60 },
  { year: '2025', volunteers: 70, projects: 7, families: 140 },
  { year: '2026', volunteers: 100, projects: 10, families: 200 },
]
const maxVolunteers = Math.max(...yearlyData.map((d) => d.volunteers))

export default async function ImpactPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('site_settings').select('key, value')
  const dbStats = parseImpactStats(settings || [])

  // Use DB values when available, fall back to demo stats
  const stats = {
    volunteers: dbStats.volunteers || DEMO_STATS.volunteers,
    projects: dbStats.projects || DEMO_STATS.projects,
    communities: dbStats.communities || DEMO_STATS.communities,
    lives: dbStats.lives || DEMO_STATS.lives,
  }

  const counters = [
    { value: stats.volunteers, label: 'Youth Volunteers', suffix: '+', icon: <Users className="w-6 h-6" /> },
    { value: stats.projects, label: 'Community Projects', suffix: '+', icon: <Trophy className="w-6 h-6" /> },
    { value: stats.communities, label: 'Communities Reached', suffix: '+', icon: <Globe className="w-6 h-6" /> },
    { value: stats.lives, label: 'Students Supported', suffix: '+', icon: <BookOpen className="w-6 h-6" /> },
    { value: 500, label: 'Trees Planted', suffix: '+', icon: <Leaf className="w-6 h-6" /> },
    { value: 200, label: 'Families Assisted', suffix: '+', icon: <Heart className="w-6 h-6" /> },
  ]

  return (
    <>
      <PageHero
        title="Our Impact"
        subtitle="Numbers tell part of the story. Behind each one is a community, a volunteer, and a life changed."
        breadcrumbs={[{ label: 'Impact' }]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=500&fit=crop&auto=format"
      />

      {/* Stats */}
      <section className="section bg-brand-gradient">
        <div className="container">
          <AnimatedSection>
            <SectionHeading eyebrow="The Numbers" title="Impact at a Glance" light />
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-12">
            {counters.map((c, i) => (
              <AnimatedSection key={c.label} delay={i * 0.1}>
                <ImpactCounter value={c.value} label={c.label} suffix={c.suffix} icon={c.icon} light />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading eyebrow="Impact by Pillar" title="Where We Create Change" />
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: 'Education',
                icon: <BookOpen className="w-6 h-6 text-blue-600" />,
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                items: [
                  '300+ students supported',
                  '20+ workshops delivered',
                  '500+ learning materials distributed',
                  '30+ youth facilitators trained',
                ],
              },
              {
                title: 'Environment',
                icon: <Leaf className="w-6 h-6 text-brand-green" />,
                bg: 'bg-brand-green-light',
                border: 'border-brand-green-muted',
                items: [
                  '500+ trees planted',
                  '15+ clean-up drives',
                  '2,000+ awareness sessions reached',
                  '3 community green partnerships',
                ],
              },
              {
                title: 'Social Welfare',
                icon: <Heart className="w-6 h-6 text-rose-600" />,
                bg: 'bg-rose-50',
                border: 'border-rose-200',
                items: [
                  '200+ families supported',
                  '300+ winter packages given',
                  '500+ meals distributed',
                  '5+ partner community orgs',
                ],
              },
            ].map((pillar, i) => (
              <AnimatedSection key={pillar.title} delay={i * 0.1}>
                <div className={`rounded-2xl p-6 border h-full ${pillar.bg} ${pillar.border}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {pillar.icon}
                    </div>
                    <h3 className="font-heading font-bold text-neutral-text text-lg">{pillar.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-neutral-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Yearly Growth Visual */}
      <section className="section bg-neutral-bg">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Growth Over Time"
              title="Our Journey Year by Year"
              subtitle="From a small team with big ideas to a growing force for community change."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.15} className="mt-12">
            <div className="bg-white rounded-3xl border border-neutral-border p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <TrendingUp className="w-5 h-5 text-brand-green" />
                <span className="font-heading font-semibold text-neutral-text">Volunteer Growth</span>
                <span className="ml-auto text-sm text-neutral-muted italic">* Demo data — updated regularly</span>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-8 justify-center h-48">
                {yearlyData.map((d) => (
                  <div key={d.year} className="flex flex-col items-center gap-3 flex-1 max-w-[120px]">
                    <span className="text-sm font-bold text-brand-green">{d.volunteers}+</span>
                    <div className="w-full flex items-end justify-center">
                      <div
                        className="w-full rounded-t-xl bg-gradient-to-t from-brand-green to-emerald-400 transition-all duration-700 min-h-[20px]"
                        style={{ height: `${(d.volunteers / maxVolunteers) * 160}px` }}
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-neutral-text text-sm">{d.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend row */}
              <div className="grid grid-cols-3 gap-4 mt-10 pt-6 border-t border-neutral-border">
                {yearlyData.map((d) => (
                  <div key={d.year} className="text-center">
                    <p className="text-xs text-neutral-muted mb-2 font-medium">{d.year}</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <Users className="w-3.5 h-3.5 text-brand-green" />
                        <span className="text-neutral-text">{d.volunteers}+ volunteers</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <Trophy className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-neutral-text">{d.projects} projects</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span className="text-neutral-text">{d.families}+ families</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-sm">
        <div className="container text-center">
          <AnimatedSection>
            <p className="text-sm text-neutral-muted">
              * All statistics represent cumulative demo impact since founding. Updated as real data becomes available.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
