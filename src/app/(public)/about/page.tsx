import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Target, Eye, ArrowRight } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'

export const metadata: Metadata = {
  title: 'About — Roots of Rise',
  description: 'Learn about the story, mission, vision, and values of Roots of Rise — a youth-led nonprofit driving change through education, social welfare, and environmental sustainability.',
}

const coreValues = [
  { icon: '🤝', title: 'Service', desc: 'We serve communities with dedication and genuine care.' },
  { icon: '✨', title: 'Integrity', desc: 'We operate transparently, honestly, and responsibly.' },
  { icon: '⚡', title: 'Responsibility', desc: 'We own our actions and honor our commitments.' },
  { icon: '❤️', title: 'Compassion', desc: 'We lead with empathy and care for every person we serve.' },
  { icon: '🌱', title: 'Sustainability', desc: 'We build for the long term, not just for today.' },
  { icon: '🏆', title: 'Youth Leadership', desc: 'We believe young people are agents of change, not just beneficiaries.' },
  { icon: '📊', title: 'Accountability', desc: 'We measure our impact and answer for our results.' },
  { icon: '💡', title: 'Impact', desc: 'We prioritize real-world results over optics or appearances.' },
  { icon: '👥', title: 'Teamwork', desc: 'We achieve more together than any of us can alone.' },
]

const timeline = [
  { year: '2022', event: 'Roots of Rise was founded by a group of passionate young changemakers in Dhaka.' },
  { year: '2023', event: 'Launched our first three programs: Education, Environmental Sustainability, and Social Welfare.' },
  { year: '2023', event: 'Completed 5 community projects, reaching over 200 individuals directly.' },
  { year: '2024', event: 'Grew to 50+ active volunteers and expanded operations to multiple districts.' },
  { year: '2024', event: 'Launched the Clean & Green Community Drive, planting 200+ trees.' },
  { year: '2025', event: 'Reached 100+ volunteers and 10+ completed or ongoing projects across all three pillars.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Roots of Rise"
        subtitle="A youth-led nonprofit committed to education, social welfare, and environmental sustainability."
        breadcrumbs={[{ label: 'About' }]}
        backgroundImage="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&h=600&fit=crop"
      />

      {/* Story Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop"
                  alt="Roots of Rise team in action"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <SectionHeading eyebrow="Our Story" title="How It All Started" align="left" />
              <div className="mt-6 space-y-4 text-neutral-muted leading-relaxed">
                <p>
                  Roots of Rise was born from a simple but powerful belief: young people have the energy,
                  creativity, and passion to create real change — they just need the right structure and
                  support to do it responsibly.
                </p>
                <p>
                  Founded in 2022 by a group of young Bangladeshis, we started small — a handful of
                  volunteers, a handful of ideas, and a commitment to show up consistently for our
                  communities. We organized our first education support session, our first clean-up drive,
                  and our first food distribution in the same year.
                </p>
                <p>
                  Since then, Roots of Rise has grown into a structured youth nonprofit with over 100
                  volunteers, 10+ completed projects, and programs that directly serve communities in
                  education, environmental sustainability, and social welfare.
                </p>
                <p>
                  We are not here for one-day activities. We are here to build organized, responsible, and
                  lasting impact — rooted in the communities we serve.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section bg-neutral-bg">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left">
              <div className="bg-white rounded-3xl p-8 h-full border-l-4 border-brand-green">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-brand-green" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-text">Our Mission</h3>
                </div>
                <p className="text-neutral-muted leading-relaxed">
                  To empower communities through education, social welfare, and environmental sustainability
                  by mobilizing youth, building awareness, and implementing practical community projects.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
              <div className="bg-brand-gradient rounded-3xl p-8 h-full text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-bold">Our Vision</h3>
                </div>
                <p className="text-white/85 leading-relaxed">
                  To build a sustainable and just future where youth leadership, education, compassion, and
                  environmental responsibility create lasting social impact for generations to come.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading eyebrow="What We Stand For" title="Our Core Values" />
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {coreValues.map((val, i) => (
              <AnimatedSection key={val.title} delay={i * 0.05}>
                <div className="card p-6 hover:border-brand-green border-2 border-transparent transition-all">
                  <span className="text-3xl mb-3 block">{val.icon}</span>
                  <h4 className="font-heading font-bold text-neutral-text mb-1">{val.title}</h4>
                  <p className="text-sm text-neutral-muted">{val.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-neutral-bg">
        <div className="container">
          <AnimatedSection>
            <SectionHeading eyebrow="Our Journey" title="Timeline" />
          </AnimatedSection>
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-green-muted" />
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className={`relative flex items-start gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 pl-10 md:pl-0">
                    <div className="card p-5">
                      <span className="text-xs font-bold text-brand-green uppercase tracking-wider">{item.year}</span>
                      <p className="mt-1 text-neutral-text text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 w-5 h-5 bg-brand-green rounded-full border-4 border-white shadow-sm mt-4 flex-shrink-0" />
                  <div className="hidden md:block flex-1" />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-gradient text-white text-center">
        <div className="container max-w-2xl">
          <AnimatedSection>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Be Part of the Rise?</h2>
            <p className="text-white/80 mb-8">Join hundreds of youth volunteers already making a difference.</p>
            <Link href="/join" className="btn-outline-white inline-flex">
              Join as Volunteer <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
