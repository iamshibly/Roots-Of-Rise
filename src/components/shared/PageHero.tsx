import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Breadcrumb } from '@/lib/types'

interface Props {
  title: string
  subtitle?: string
  backgroundImage?: string
  breadcrumbs?: Breadcrumb[]
  eyebrow?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  breadcrumbs,
  eyebrow,
  size = 'md',
}: Props) {
  return (
    <section
      className={cn(
        'relative flex items-center justify-center text-white overflow-hidden',
        size === 'sm' && 'min-h-[280px] md:min-h-[360px]',
        size === 'md' && 'min-h-[360px] md:min-h-[460px]',
        size === 'lg' && 'min-h-[460px] md:min-h-[580px]',
      )}
    >
      {/* Background */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-brand-gradient" />
      )}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/40 via-transparent to-brand-blue/20" />

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative z-10 container text-center py-16">
        {breadcrumbs && (
          <nav className="flex items-center justify-center gap-2 text-sm text-white/70 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="text-sm font-semibold text-brand-green-light uppercase tracking-widest mb-3">
            {eyebrow}
          </p>
        )}

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
