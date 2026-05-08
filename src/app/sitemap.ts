import { MetadataRoute } from 'next'

const BASE_URL = 'https://rootsofrise.org'

const staticRoutes = [
  '/',
  '/about',
  '/programs',
  '/programs/education',
  '/programs/environmental-sustainability',
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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))

  return staticEntries
}
