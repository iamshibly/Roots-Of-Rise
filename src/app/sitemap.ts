import { MetadataRoute } from 'next'

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
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))

  return staticEntries
}
