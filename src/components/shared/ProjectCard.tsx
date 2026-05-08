'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Calendar, ArrowRight } from 'lucide-react'
import { cn, formatDate, truncate, getProjectCategoryLabel, getProjectStatusColor } from '@/lib/utils'
import type { Project } from '@/lib/types'

interface Props {
  project: Project
  variant?: 'grid' | 'featured'
}

const categoryColors = {
  education: 'bg-blue-50 text-blue-700 border-blue-200',
  environment: 'bg-brand-green-light text-brand-green border-brand-green-muted',
  social_welfare: 'bg-rose-50 text-rose-700 border-rose-200',
}

export default function ProjectCard({ project, variant = 'grid' }: Props) {
  const categoryColor = categoryColors[project.category] || 'bg-gray-100 text-gray-700'

  if (variant === 'featured') {
    return (
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="card group overflow-hidden"
      >
        <Link href={`/projects/${project.slug}`}>
          <div className="relative h-56 overflow-hidden">
            <Image
              src={project.cover_image || `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop`}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={cn('badge border', categoryColor)}>
                {getProjectCategoryLabel(project.category)}
              </span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-heading text-xl font-bold text-neutral-text mb-2 group-hover:text-brand-green transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-neutral-muted mb-4 leading-relaxed">
              {truncate(project.short_description, 120)}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-neutral-muted">
                {project.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </span>
                )}
                {project.date && (
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {formatDate(project.date, 'MMM yyyy')}
                  </span>
                )}
              </div>
              <span className="flex items-center gap-1 text-sm font-medium text-brand-green">
                View <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="card group"
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.cover_image || `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop`}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className={cn('badge border', categoryColor)}>
              {getProjectCategoryLabel(project.category)}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className={cn('badge', getProjectStatusColor(project.status))}>
              {project.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-heading font-bold text-neutral-text mb-1.5 group-hover:text-brand-green transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-sm text-neutral-muted line-clamp-2 mb-3">
            {project.short_description}
          </p>
          {project.location && (
            <p className="flex items-center gap-1 text-xs text-neutral-muted">
              <MapPin className="w-3 h-3" /> {project.location}
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
