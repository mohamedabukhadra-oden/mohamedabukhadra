import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { SITE_URL } from '@/lib/seo'

const STATIC_ROUTES: {
  path: string
  priority: number
  changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']
}[] = [
  { path: '/', priority: 1.0, changeFreq: 'weekly' },
  { path: '/book-one', priority: 0.9, changeFreq: 'monthly' },
  { path: '/book-two', priority: 0.9, changeFreq: 'monthly' },
  { path: '/about', priority: 0.8, changeFreq: 'monthly' },
  { path: '/insights', priority: 0.8, changeFreq: 'weekly' },
  { path: '/free', priority: 0.8, changeFreq: 'monthly' },
  { path: '/press', priority: 0.7, changeFreq: 'monthly' },
  { path: '/contact', priority: 0.6, changeFreq: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFreq: 'yearly' },
  { path: '/terms', priority: 0.3, changeFreq: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; updatedAt: Date; publishedAt: Date | null }[] = []
  try {
    articles = await db.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
    })
  } catch {
    // Never fail the sitemap on a DB hiccup.
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }))

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: a.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...articleEntries]
}
