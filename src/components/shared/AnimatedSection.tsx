'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeUpVariants, fadeInVariants, fadeLeftVariants, fadeRightVariants, scaleUpVariants } from '@/lib/constants'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'
  once?: boolean
}

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: Props) {
  const variantMap = {
    up: fadeUpVariants,
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } },
    left: fadeLeftVariants,
    right: fadeRightVariants,
    fade: fadeInVariants,
    scale: scaleUpVariants,
  }

  const variant = variantMap[direction]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={{
        hidden: variant.hidden,
        visible: {
          ...variant.visible,
          transition: { ...(variant.visible as { transition?: object }).transition, delay },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
