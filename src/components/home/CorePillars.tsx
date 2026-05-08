'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Leaf, Heart, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/constants'
import { PROGRAM_PILLARS } from '@/lib/constants'

const icons = { GraduationCap, Leaf, Heart }

export default function CorePillars() {
  return (
    <section className="section bg-neutral-bg">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Our Focus"
            title="Three Pillars of Impact"
            subtitle="Every program, project, and initiative traces back to one of our three core focus areas."
          />
        </AnimatedSection>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12"
        >
          {PROGRAM_PILLARS.map((pillar) => {
            const Icon = icons[pillar.icon as keyof typeof icons]
            return (
              <motion.div
                key={pillar.slug}
                variants={fadeUpVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className="card p-8 group cursor-pointer border-2 border-transparent hover:border-brand-green transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-text mb-3 group-hover:text-brand-green transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-neutral-muted text-sm leading-relaxed mb-6">
                  {pillar.description}
                </p>
                <Link
                  href={`/programs/${pillar.slug}`}
                  className="flex items-center gap-2 text-sm font-semibold text-brand-green hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
