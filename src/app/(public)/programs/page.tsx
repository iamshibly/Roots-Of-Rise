import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, GraduationCap, Leaf, Heart } from 'lucide-react'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'
import { PROGRAM_PILLARS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Programs — Roots of Rise',
  description: 'Explore the three core programs of Roots of Rise: Education, Environmental Sustainability, and Social Welfare.',
}

const icons = { GraduationCap, Leaf, Heart }
const programImages: Record<string, string> = {
  education: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=500&fit=crop&auto=format',
  'environmental-sustainability': 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop&auto=format',
  'social-welfare': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop&auto=format',
}

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Our Programs"
        subtitle="Three focused areas of impact. One shared mission to create lasting change."
        breadcrumbs={[{ label: 'Programs' }]}
      />

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="What We Do"
              title="Focused Impact, Three Pillars"
              subtitle="Each program is designed to address a specific community need with organized, measurable, and sustainable action."
            />
          </AnimatedSection>

          <div className="space-y-16 mt-16">
            {PROGRAM_PILLARS.map((pillar, i) => {
              const Icon = icons[pillar.icon as keyof typeof icons]
              const isEven = i % 2 === 0
              return (
                <AnimatedSection key={pillar.slug} direction={isEven ? 'left' : 'right'}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={!isEven ? 'lg:order-2' : ''}>
                      <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-brand-lg">
                        <Image
                          src={programImages[pillar.slug]}
                          alt={pillar.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-30`} />
                      </div>
                    </div>
                    <div className={!isEven ? 'lg:order-1' : ''}>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white mb-5`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <p className={`text-sm font-bold uppercase tracking-wider mb-2 ${pillar.textColor}`}>{pillar.tagline}</p>
                      <h2 className="font-heading text-3xl font-bold text-neutral-text mb-4">{pillar.title}</h2>
                      <p className="text-neutral-muted leading-relaxed mb-6">{pillar.description}</p>
                      <Link href={`/programs/${pillar.slug}`} className="btn-primary inline-flex">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
