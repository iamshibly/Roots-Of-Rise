'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
  light?: boolean
}

export default function ImpactCounter({ value, label, prefix = '', suffix = '+', icon, light = false }: Props) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!inView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(Math.round(increment * step), value)
      setCount(current)
      if (step >= steps) clearInterval(timer)
    }, duration / steps)

    return () => clearInterval(timer)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center">
      {icon && (
        <div className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4',
          light ? 'bg-white/15' : 'bg-brand-green-light'
        )}>
          <span className={light ? 'text-white' : 'text-brand-green'}>{icon}</span>
        </div>
      )}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <p className={cn(
          'font-heading text-4xl md:text-5xl font-bold',
          light ? 'text-white' : 'text-brand-green'
        )}>
          {prefix}{count.toLocaleString()}{suffix}
        </p>
      </motion.div>
      <p className={cn('mt-2 font-medium text-sm md:text-base', light ? 'text-white/80' : 'text-neutral-muted')}>
        {label}
      </p>
    </div>
  )
}
