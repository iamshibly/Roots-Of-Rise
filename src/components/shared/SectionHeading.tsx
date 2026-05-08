import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center' | 'right'
  light?: boolean
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: Props) {
  return (
    <div className={cn(
      'max-w-3xl',
      align === 'center' && 'mx-auto text-center',
      align === 'right' && 'ml-auto text-right',
      className
    )}>
      {eyebrow && (
        <span className={cn(
          'section-eyebrow mb-3 block',
          light ? 'text-brand-green-light' : 'text-brand-green'
        )}>
          <span className={cn(
            'inline-block w-6 h-0.5 mr-2 align-middle',
            light ? 'bg-brand-green-light' : 'bg-brand-green'
          )} />
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        'font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance',
        light ? 'text-white' : 'text-neutral-text'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-base md:text-lg leading-relaxed',
          light ? 'text-white/75' : 'text-neutral-muted'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
