'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import type { Testimonial } from '@/lib/types'

interface Props {
  testimonials: Testimonial[] | null
}

const placeholder = [
  { id: '1', name: 'Arif Hossain', role: 'Volunteer', quote: 'Joining Roots of Rise changed my perspective completely. I realized that youth can make a real difference when we are organized and committed.', photo: null, approved: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Fatema Khanam', role: 'Community Member', quote: 'The Learning Support Campaign helped my daughter so much. She is now one of the top students in her class. I am so grateful to these young volunteers.', photo: null, approved: true, created_at: '', updated_at: '' },
  { id: '3', name: 'Tanvir Rahman', role: 'Environmental Volunteer', quote: 'Being part of the Green Drive showed me that small actions done together create real environmental impact. Roots of Rise is doing something truly special.', photo: null, approved: true, created_at: '', updated_at: '' },
]

export default function Testimonials({ testimonials }: Props) {
  const items = testimonials?.length ? testimonials : placeholder
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [items.length])

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)

  return (
    <section className="section">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Testimonials"
            title="Voices of Change"
            subtitle="Hear from the volunteers and community members who are living the mission."
          />
        </AnimatedSection>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="relative">
            {/* Quote icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-brand-gradient rounded-full flex items-center justify-center">
              <Quote className="w-5 h-5 text-white" />
            </div>

            <div className="bg-neutral-bg rounded-3xl p-8 md:p-12 min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-lg md:text-xl text-neutral-text leading-relaxed italic mb-8">
                    &ldquo;{items[current].quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-brand-green-light flex items-center justify-center">
                      {items[current].photo ? (
                        <Image
                          src={items[current].photo!}
                          alt={items[current].name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-bold text-brand-green text-lg">
                          {items[current].name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-neutral-text">{items[current].name}</p>
                      {items[current].role && (
                        <p className="text-sm text-neutral-muted">{items[current].role}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all rounded-full ${
                      i === current ? 'w-6 h-2.5 bg-brand-green' : 'w-2.5 h-2.5 bg-neutral-border hover:bg-brand-green-muted'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-xl border border-neutral-border hover:border-brand-green hover:text-brand-green flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-xl bg-brand-green text-white hover:bg-brand-green-dark flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
