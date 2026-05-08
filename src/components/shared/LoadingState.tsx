import { cn } from '@/lib/utils'

interface Props {
  className?: string
  count?: number
  variant?: 'card' | 'list' | 'table'
}

function SkeletonCard() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-48 bg-neutral-light" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-neutral-light rounded w-3/4" />
        <div className="h-3 bg-neutral-light rounded w-full" />
        <div className="h-3 bg-neutral-light rounded w-5/6" />
        <div className="h-3 bg-neutral-light rounded w-1/2" />
      </div>
    </div>
  )
}

export default function LoadingState({ className, count = 3, variant = 'card' }: Props) {
  if (variant === 'card') {
    return (
      <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 bg-neutral-light rounded-xl animate-pulse" />
      ))}
    </div>
  )
}
