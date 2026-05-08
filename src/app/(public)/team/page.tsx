import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'
import TeamCard from '@/components/shared/TeamCard'
import { TEAM_DATA } from '@/data/team'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Our Team — Roots of Rise',
  description: 'Meet the passionate youth leaders and volunteers behind Roots of Rise.',
}

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from('team_members')
    .select('*')
    .eq('status', 'active')
    .order('display_order')

  // Fall back to static demo data if DB is empty
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayMembers: any[] = (members && members.length > 0) ? members : TEAM_DATA

  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="The passionate young leaders driving change at Roots of Rise."
        breadcrumbs={[{ label: 'Team' }]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=500&fit=crop&auto=format"
      />

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="The People"
              title="Meet the Team"
              subtitle="Roots of Rise is led by a diverse group of dedicated youth volunteers and leaders committed to building lasting impact."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {displayMembers.map((member, i) => (
              <AnimatedSection key={member.id} delay={i * 0.05}>
                <TeamCard member={member} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Join the team CTA */}
      <section className="section-sm bg-brand-green-light">
        <div className="container text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-neutral-text mb-3">Want to Join Our Team?</h2>
            <p className="text-neutral-muted mb-6 max-w-lg mx-auto">
              We are always looking for passionate, committed young people to join us as volunteers and leaders.
            </p>
            <a href="/join" className="btn-gradient inline-flex">
              Join the Movement
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
