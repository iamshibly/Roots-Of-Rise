import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import PageHero from '@/components/shared/PageHero'
import SectionHeading from '@/components/shared/SectionHeading'
import AnimatedSection from '@/components/shared/AnimatedSection'
import GalleryGrid from '@/components/shared/GalleryGrid'
import { GALLERY_DATA } from '@/data/gallery'

export const revalidate = 3600
export const metadata: Metadata = {
  title: 'Gallery — Roots of Rise',
  description: 'Photo gallery of Roots of Rise activities, events, and community moments.',
}

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('created_at', { ascending: false })

  // Fall back to static demo data if DB is empty
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayImages: any[] = (images && images.length > 0) ? images : GALLERY_DATA

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Moments from our programs, projects, and community activities."
        breadcrumbs={[{ label: 'Gallery' }]}
        backgroundImage="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=500&fit=crop&auto=format"
      />

      <section className="section">
        <div className="container">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Photo Gallery"
              title="Our Moments"
              subtitle="A visual journey through our programs, volunteer activities, and community impact."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="mt-12">
            <GalleryGrid images={displayImages} />
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
