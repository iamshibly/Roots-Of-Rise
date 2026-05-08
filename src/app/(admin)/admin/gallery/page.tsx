import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { PlusCircle } from 'lucide-react'
import type { GalleryImage } from '@/lib/types'
import DeleteButton from '@/components/admin/DeleteButton'

export const metadata: Metadata = { title: 'Gallery' }

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-neutral-text">Gallery</h1>
          <p className="text-neutral-muted mt-1 text-sm">{images?.length ?? 0} images</p>
        </div>
        <Link href="/admin/gallery/new" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> Add Image
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((img: GalleryImage) => (
          <div key={img.id} className="group relative rounded-2xl overflow-hidden border border-neutral-border aspect-square bg-neutral-bg">
            <Image
              src={img.image_url}
              alt={img.caption || 'Gallery image'}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end opacity-0 group-hover:opacity-100">
              <div className="w-full p-3 flex items-center justify-between">
                <p className="text-white text-xs truncate">{img.caption || img.category}</p>
                <DeleteButton id={img.id} endpoint="/api/admin/gallery" label="image" />
              </div>
            </div>
          </div>
        ))}
        {!images?.length && (
          <div className="col-span-full text-center text-neutral-muted py-12">No images yet.</div>
        )}
      </div>
    </div>
  )
}
