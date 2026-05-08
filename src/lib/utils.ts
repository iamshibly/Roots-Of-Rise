import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow } from 'date-fns'
import type { ApplicationStatus, ProjectStatus, PostStatus } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, fmt = 'MMM d, yyyy') {
  return format(new Date(date), fmt)
}

export function timeAgo(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

export function getSupabaseImageUrl(path: string, bucket: string) {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${base}/storage/v1/object/public/${bucket}/${path}`
}

export function getUnsplashUrl(keyword: string, width = 800, height = 600) {
  return `https://images.unsplash.com/photo-${getUnsplashPhoto(keyword)}?w=${width}&h=${height}&fit=crop&auto=format&q=75`
}

function getUnsplashPhoto(keyword: string) {
  const photos: Record<string, string> = {
    education: '1580582932707-520aed937b7b',
    environment: '1542601906-fd8e7ad8b065',
    welfare: '1469571486292-0ba58a3f068b',
    volunteers: '1488521787991-ed7bbaae773c',
    youth: '1529156069898-49953e39b3ac',
    community: '1582213782179-e0d53f98f2ca',
    team: '1522071820081-009f0129c71c',
    hero: '1488521787991-ed7bbaae773c',
    nature: '1441974231531-c6227db76b6e',
    children: '1488521787991-ed7bbaae773c',
    garden: '1416879595882-3373a0480b5b',
    charity: '1469571486292-0ba58a3f068b',
    default: '1488521787991-ed7bbaae773c',
  }
  return photos[keyword] || photos.default
}

export function getApplicationStatusColor(status: ApplicationStatus) {
  const colors: Record<ApplicationStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    under_review: 'bg-blue-100 text-blue-800',
    accepted: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    waitlisted: 'bg-purple-100 text-purple-800',
  }
  return colors[status]
}

export function getProjectStatusColor(status: ProjectStatus) {
  const colors: Record<ProjectStatus, string> = {
    planning: 'bg-purple-100 text-purple-800',
    active: 'bg-green-100 text-green-800',
    completed: 'bg-blue-100 text-blue-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
  }
  return colors[status]
}

export function getPostStatusColor(status: PostStatus) {
  const colors: Record<PostStatus, string> = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    archived: 'bg-yellow-100 text-yellow-800',
  }
  return colors[status]
}

export function getApplicationStatusLabel(status: ApplicationStatus) {
  const labels: Record<ApplicationStatus, string> = {
    pending: 'Submitted',
    under_review: 'Under Review',
    accepted: 'Accepted',
    rejected: 'Rejected',
    waitlisted: 'Waitlisted',
  }
  return labels[status]
}

export function getProjectCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    education: 'Education',
    environment: 'Environmental Sustainability',
    social_welfare: 'Social Welfare',
  }
  return labels[category] || category
}

export function getProfileCompletion(profile: Record<string, unknown>) {
  const fields = [
    'full_name', 'phone', 'city', 'age', 'occupation',
    'education_level', 'bio', 'availability',
  ]
  const arrayFields = ['skills', 'interests']

  let filled = 0
  const total = fields.length + arrayFields.length

  fields.forEach((f) => { if (profile[f]) filled++ })
  arrayFields.forEach((f) => {
    const val = profile[f] as unknown[]
    if (val && val.length > 0) filled++
  })

  return Math.round((filled / total) * 100)
}

export function parseImpactStats(settings: { key: string; value: string }[]) {
  const map = Object.fromEntries(settings.map((s) => [s.key, s.value]))
  return {
    volunteers: parseInt(map.impact_volunteers || '100'),
    projects: parseInt(map.impact_projects || '10'),
    communities: parseInt(map.impact_communities || '5'),
    lives: parseInt(map.impact_lives || '500'),
  }
}
