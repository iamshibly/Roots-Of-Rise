import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/shared/AnimatedSection'
import SectionHeading from '@/components/shared/SectionHeading'
import type { GalleryImage } from '@/lib/types'

interface Props {
  images: GalleryImage[] | null
}

const placeholderImages = [
  { id: '1', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop', caption: 'Volunteers at work', category: null, project_id: null, created_at: '', updated_at: '' },
  { id: '2', image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=400&fit=crop', caption: 'Education sessions', category: null, project_id: null, created_at: '', updated_at: '' },
  { id: '3', image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', caption: 'Tree plantation', category: null, project_id: null, created_at: '', updated_at: '' },
  { id: '4', image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=300&fit=crop', caption: 'Community support', category: null, project_id: null, created_at: '', updated_at: '' },
  { id: '5', image_url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=400&fit=crop', caption: 'Team collaboration', category: null, project_id: null, created_at: '', updated_at: '' },
  { id: '6', image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', caption: 'Leadership program', category: null, project_id: null, created_at: '', updated_at: '' },
]

export default function GalleryPreview({ images }: Props) {
  const items = images?.length ? images.slice(0, 6) : placeholderImages

  return (
    <section className="section bg-neutral-bg">
      <div className="container">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Gallery"
            title="Moments From Our Work"
            subtitle="A glimpse into the activities, events, and people behind our impact."
          />
        </AnimatedSection>

        <div className="columns-2 md:columns-3 gap-4 mt-12 space-y-4">
          {items.map((img, i) => (
            <AnimatedSection key={img.id} delay={i * 0.05} className="break-inside-avoid">
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
                <Image
                  src={img.image_url}
                  alt={img.caption || 'Roots of Rise activity'}
                  width={400}
                  height={i % 3 === 1 ? 400 : 300}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {img.caption && (
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-white text-sm font-medium">{img.caption}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link href="/gallery" className="btn-outline inline-flex">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
