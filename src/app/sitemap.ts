import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedabukhadra.com'

/**
 * Every URL here is a real, indexable route.
 *
 * The previous personal-site build listed fragment URLs (/#thinking, /#<slug>).
 * Search engines discard everything after "#", so those all collapsed to the
 * homepage and the articles had no indexable URL at all.
 */
const STATIC_ROUTES: {
  path: string
  priority: number
  changeFreq: MetadataRoute.Sitemap[number]['changeFrequency']
}[] = [
  { path: '/', priority: 1.0, changeFreq: 'weekly' },
  { path: '/about', priority: 0.8, changeFreq: 'monthly' },
  { path: '/books', priority: 0.9, changeFreq: 'monthly' },
  { path: '/books/before-you-say-yes-to-the-dog', priority: 0.9, changeFreq: 'monthly' },
  { path: '/books/after-you-say-yes-to-the-dog', priority: 0.9, changeFreq: 'monthly' },
  { path: '/insights', priority: 0.9, changeFreq: 'daily' },
  { path: '/speaking', priority: 0.7, changeFreq: 'monthly' },
  { path: '/quick-check', priority: 0.8, changeFreq: 'monthly' },
  { path: '/read-inside', priority: 0.7, changeFreq: 'monthly' },
  { path: '/faq', priority: 0.6, changeFreq: 'monthly' },
  { path: '/contact', priority: 0.6, changeFreq: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let articles: { slug: string; updatedAt: Date; publishedAt: Date | null }[] = []
  try {
    articles = await db.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true, publishedAt: true },
    })
  } catch {
    // Never fail the sitemap on a DB hiccup — serving the static routes is far
    // better than serving a 500 to Googlebot.
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
