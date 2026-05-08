import { cn, getApplicationStatusColor, getProjectStatusColor, getPostStatusColor, getApplicationStatusLabel } from '@/lib/utils'
import type { ApplicationStatus, ProjectStatus, PostStatus } from '@/lib/types'

interface Props {
  status: ApplicationStatus | ProjectStatus | PostStatus
  type?: 'application' | 'project' | 'post'
}

export default function StatusBadge({ status, type = 'application' }: Props) {
  let colorClass = ''
  let label = status.replace(/_/g, ' ')

  if (type === 'application') {
    colorClass = getApplicationStatusColor(status as ApplicationStatus)
    label = getApplicationStatusLabel(status as ApplicationStatus)
  } else if (type === 'project') {
    colorClass = getProjectStatusColor(status as ProjectStatus)
  } else {
    colorClass = getPostStatusColor(status as PostStatus)
  }

  return (
    <span className={cn('badge capitalize', colorClass)}>
      {label}
    </span>
  )
}
