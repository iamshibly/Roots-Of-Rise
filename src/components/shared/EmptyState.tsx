import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Props {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; href: string }
  className?: string
}

export default function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div className={cn('text-center py-16 px-6', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-brand-green-light flex items-center justify-center mx-auto mb-4 text-brand-green">
          {icon}
        </div>
      )}
      <h3 className="font-heading font-bold text-xl text-neutral-text mb-2">{title}</h3>
      {description && (
        <p className="text-neutral-muted max-w-sm mx-auto mb-6">{description}</p>
      )}
      {action && (
        <Link href={action.href} className="btn-primary inline-flex">
          {action.label}
        </Link>
      )}
    </div>
  )
}
