import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'

const values = ['Organized youth action', 'Lasting community impact', 'Transparent operations', 'Responsible leadership']

export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <AnimatedSection direction="left" className="relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-brand-lg">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop"
                alt="Youth volunteers from Roots of Rise working together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center text-white font-heading font-bold text-lg">
                3+
              </div>
              <div>
                <p className="font-semibold text-neutral-text text-sm">Years of</p>
                <p className="text-brand-green font-bold">Impact</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Text side */}
          <AnimatedSection direction="right">
            <SectionHeading
              eyebrow="About Us"
              title="About Roots of Rise"
              subtitle="A youth-led movement built on education, compassion, and sustainability."
              align="left"
            />

            <p className="prose-brand mt-6 leading-relaxed">
              Roots of Rise exists to organize young people into meaningful community action. We believe
              that real change requires more than good intentions — it requires structure, responsibility,
              teamwork, and long-term commitment.
            </p>
            <p className="prose-brand mt-4 leading-relaxed">
              We work across three pillars — Education, Environmental Sustainability, and Social Welfare —
              creating programs and projects that directly serve communities and empower youth to lead.
            </p>

            <ul className="mt-6 space-y-3">
              {values.map((v) => (
                <li key={v} className="flex items-center gap-3 text-sm text-neutral-text">
                  <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>

            <Link href="/about" className="btn-primary mt-8 inline-flex">
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
