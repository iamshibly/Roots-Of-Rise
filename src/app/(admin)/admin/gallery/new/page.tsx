import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import GalleryImageForm from '@/components/admin/GalleryImageForm'

export const metadata: Metadata = { title: 'Add Gallery Image' }

export default function NewGalleryImagePage() {
  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin/gallery" className="inline-flex items-center gap-1.5 text-sm text-neutral-muted hover:text-brand-green transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Gallery
        </Link>
        <h1 className="font-heading text-2xl font-bold text-neutral-text">Add Gallery Image</h1>
        <p className="text-neutral-muted mt-1 text-sm">Add a new image to the gallery.</p>
      </div>
      <GalleryImageForm mode="create" />
    </div>
  )
}
