import { Search, Lightbulb, Users, BarChart3 } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    number: '01',
    title: 'Identify Real Community Needs',
    desc: 'We listen to communities, study gaps, and map out where youth action can create the most meaningful impact.',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    number: '02',
    title: 'Design Practical Solutions',
    desc: 'We build structured programs and projects — not one-day events — that address root causes with real solutions.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    number: '03',
    title: 'Mobilize Youth Volunteers',
    desc: 'We train and deploy passionate young volunteers who are committed to responsible, organized community action.',
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    number: '04',
    title: 'Execute, Measure & Improve',
    desc: 'We track outcomes, measure impact, gather feedback, and continuously refine our approach to maximize results.',
  },
]

export default function HowWeWork() {
  return (
    <section className="section bg-neutral-bg">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Our Process"
            title="How We Turn Ideas Into Impact"
            subtitle="Behind every project is a disciplined process that ensures real, lasting change."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, i) => (
            <AnimatedSection key={step.number} delay={i * 0.1} direction="up">
              <div className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brand-green to-transparent z-0" />
                )}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-card border-2 border-brand-green-light flex items-center justify-center text-brand-green mb-5 relative z-10">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-green text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-neutral-text mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-muted leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
