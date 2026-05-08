import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'

export default function FinalCTA() {
  return (
    <section className="section bg-brand-gradient relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container relative z-10 text-center text-white">
        <AnimatedSection>
          <p className="section-eyebrow text-brand-green-light mb-4">Join the Movement</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Be Part of the Rise
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your time, skills, and passion can help create lasting change. Join Roots of Rise and become
            part of a youth-led movement for education, sustainability, and social welfare.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/join" className="btn-outline-white px-8 py-4 text-base rounded-2xl font-bold">
              Join as Volunteer <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="flex items-center gap-2 px-8 py-4 text-base text-white/80 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
