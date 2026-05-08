import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { parseImpactStats } from '@/lib/utils'
import HeroSection from '@/components/home/HeroSection'
import TrustStrip from '@/components/home/TrustStrip'
import AboutPreview from '@/components/home/AboutPreview'
import CorePillars from '@/components/home/CorePillars'
import ImpactStats from '@/components/home/ImpactStats'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import HowWeWork from '@/components/home/HowWeWork'
import Testimonials from '@/components/home/Testimonials'
import GalleryPreview from '@/components/home/GalleryPreview'
import SocialSection from '@/components/home/SocialSection'
import FinalCTA from '@/components/home/FinalCTA'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Roots of Rise — Educate. Empower. Elevate.',
  description:
    'Roots of Rise is a youth-led nonprofit working to create meaningful impact through education, social welfare, and environmental sustainability. Join the movement.',
}

export default async function HomePage() {
  const supabase = await createClient()

  const [
    { data: projects },
    { data: testimonials },
    { data: galleryImages },
    { data: settings },
  ] = await Promise.all([
    supabase.from('projects').select('*').eq('featured', true).order('created_at', { ascending: false }).limit(3),
    supabase.from('testimonials').select('*').eq('approved', true).order('created_at', { ascending: false }).limit(6),
    supabase.from('gallery_images').select('*').order('created_at', { ascending: false }).limit(6),
    supabase.from('site_settings').select('key, value'),
  ])

  const impactStats = parseImpactStats(settings || [])

  return (
    <>
      <HeroSection />
      <TrustStrip />
      <AboutPreview />
      <CorePillars />
      <ImpactStats stats={impactStats} />
      <FeaturedProjects projects={projects} />
      <HowWeWork />
      <Testimonials testimonials={testimonials} />
      <GalleryPreview images={galleryImages} />
      <SocialSection />
      <FinalCTA />
    </>
  )
}
