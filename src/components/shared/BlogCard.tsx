'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { formatDate, truncate } from '@/lib/utils'
import type { BlogPost } from '@/lib/types'

interface Props {
  post: BlogPost
}

export default function BlogCard({ post }: Props) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group overflow-hidden"
    >
      <Link href={`/stories/${post.slug}`}>
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.cover_image || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=300&fit=crop'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="badge bg-brand-green text-white">
              {post.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-neutral-muted mb-2">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(post.created_at)}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h3 className="font-heading font-bold text-neutral-text mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-sm text-neutral-muted line-clamp-3 mb-3">
              {truncate(post.excerpt, 140)}
            </p>
          )}
          <span className="flex items-center gap-1 text-sm font-medium text-brand-green">
            Read More <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
