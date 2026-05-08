import { MetadataRoute } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'

const BASE_URL = 'https://rootsofrise.org'

const staticRoutes = [
  '/',
  '/about',
  '/programs',
  '/programs/education',
  '/programs/environment',
  '/programs/social-welfare',
  '/projects',
  '/impact',
  '/team',
  '/stories',
  '/gallery',
  '/join',
  '/contact',
  '/privacy-policy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: projects }, { data: posts }] = await Promise.all([
    supabaseAdmin.from('projects').select('slug, updated_at').eq('status', 'active'),
    supabaseAdmin.from('blog_posts').select('slug, updated_at').eq('status', 'published'),
  ])

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))

  const projectEntries: MetadataRoute.Sitemap = (projects || []).map(p => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const postEntries: MetadataRoute.Sitemap = (posts || []).map(p => ({
    url: `${BASE_URL}/stories/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticEntries, ...projectEntries, ...postEntries]
}
