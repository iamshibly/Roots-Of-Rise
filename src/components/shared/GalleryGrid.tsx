'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface GalleryImage {
  id: string
  image_url: string
  caption?: string
  category?: string
}

interface Props {
  images: GalleryImage[]
}

const CATEGORIES = ['All', 'Education', 'Environment', 'Social Welfare', 'Volunteers', 'Events']

export default function GalleryGrid({ images }: Props) {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              activeCategory === cat
                ? 'bg-brand-green text-white border-brand-green shadow-sm'
                : 'bg-white text-neutral-muted border-neutral-border hover:border-brand-green hover:text-brand-green'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {filtered.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.3 }}
              className="break-inside-avoid"
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-sm hover:shadow-card-hover transition-shadow duration-300">
                <Image
                  src={img.image_url}
                  alt={img.caption || 'Roots of Rise gallery'}
                  width={400}
                  height={i % 3 === 1 ? 500 : 300}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  {img.caption && (
                    <p className="text-white text-sm font-medium leading-tight">{img.caption}</p>
                  )}
                  {img.category && (
                    <span className="mt-1 text-xs text-white/70">{img.category}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-neutral-muted">
          <p>No photos in this category yet.</p>
        </div>
      )}
    </div>
  )
}
