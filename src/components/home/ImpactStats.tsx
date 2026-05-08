import { Users, Folders, MapPin, Globe, Heart } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import ImpactCounter from '@/components/shared/ImpactCounter'

interface Props {
  stats: {
    volunteers: number
    projects: number
    communities: number
    lives: number
  }
}

export default function ImpactStats({ stats }: Props) {
  const counters = [
    { value: stats.volunteers, label: 'Active Volunteers', suffix: '+', icon: <Users className="w-6 h-6" /> },
    { value: stats.projects, label: 'Projects Completed', suffix: '+', icon: <Folders className="w-6 h-6" /> },
    { value: stats.communities, label: 'Communities Reached', suffix: '+', icon: <MapPin className="w-6 h-6" /> },
    { value: stats.lives, label: 'Lives Impacted', suffix: '+', icon: <Heart className="w-6 h-6" /> },
    { value: 3, label: 'Core Pillars', suffix: '', icon: <Globe className="w-6 h-6" /> },
  ]

  return (
    <section className="section bg-brand-gradient">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Our Impact"
            title="Our Growing Impact"
            subtitle="Every number represents a real person, a real community, a real change."
            light
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
          {counters.map((counter, i) => (
            <AnimatedSection key={counter.label} delay={i * 0.1}>
              <ImpactCounter
                value={counter.value}
                label={counter.label}
                suffix={counter.suffix}
                icon={counter.icon}
                light
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <p className="text-center text-sm text-white/60 mt-10">
            * Numbers are updated regularly. Real-time data available in our annual reports.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
