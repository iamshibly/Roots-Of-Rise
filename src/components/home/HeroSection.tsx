'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { staggerContainerVariants, fadeUpVariants } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop&auto=format&q=80"
        alt="Volunteers working together for change"
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-hero-overlay" />
      {/* Green gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/40 via-transparent to-brand-blue/20" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl" />

      {/* Content */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container text-center text-white pt-20"
      >
        {/* Badge */}
        <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-brand-green-light animate-pulse" />
          Youth-Led Impact for a Better Future
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUpVariants}
          className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] text-balance mb-6"
        >
          <span className="block">Educate.</span>
          <span className="block text-brand-green-light">Empower.</span>
          <span className="block">Elevate.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUpVariants}
          className="text-xl md:text-2xl font-medium text-white/80 mb-4"
        >
          Growing Change From the Ground Up
        </motion.p>

        {/* Description */}
        <motion.p
          variants={fadeUpVariants}
          className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Roots of Rise is a youth-led nonprofit working to create meaningful impact through
          education, social welfare, and environmental sustainability.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/join"
            className="btn-gradient px-8 py-4 text-base rounded-2xl shadow-brand-lg hover:shadow-brand"
          >
            Join the Movement
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/projects"
            className="btn-outline-white px-8 py-4 text-base rounded-2xl"
          >
            Explore Our Work
          </Link>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          variants={fadeUpVariants}
          className="flex items-center justify-center gap-8 md:gap-16 mt-14 pt-8 border-t border-white/20"
        >
          {[
            { value: '100+', label: 'Volunteers' },
            { value: '10+', label: 'Projects' },
            { value: '3', label: 'Core Pillars' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-brand-green-light">{stat.value}</p>
              <p className="text-sm text-white/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
      >
        <span className="text-xs">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
