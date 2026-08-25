import type { Metadata } from 'next'
import { db } from '@/lib/db'

/**
 * Merges the SEO overrides managed at /admin/seo into a page's metadata.
 *
 * Pages pass their own defaults; anything set in the admin for that exact path
 * wins. This is what makes titles and descriptions editable without a redeploy.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedabukhadra.com').replace(/\/$/, '')

export async function buildMetadata(opts: {
  path: string
  title?: string
  description?: string
  ogImage?: string | null
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noIndex?: boolean
}): Promise<Metadata> {
  // A missing SeoMeta row is the normal case, not an error — most pages just
  // use their own defaults.
  const override = await db.seoMeta.findUnique({ where: { path: opts.path } }).catch(() => null)

  const title = override?.title || opts.title
  const description = override?.description || opts.description
  const image = override?.ogImage || opts.ogImage || undefined
  const noIndex = override?.noIndex ?? opts.noIndex ?? false
  const url = `${SITE_URL}${opts.path}`

  return {
    title,
    description,
    ...(override?.keywords ? { keywords: override.keywords.split(',').map((k) => k.trim()) } : {}),
    alternates: { canonical: url },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: opts.type || 'website',
      title,
      description,
      url,
      ...(image ? { images: image } : {}),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      ...(opts.modifiedTime ? { modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/** Any JSON-LD override configured for a path, ready to inject. */
export async function jsonLdFor(path: string): Promise<string | null> {
  const override = await db.seoMeta.findUnique({ where: { path } }).catch(() => null)
  return override?.jsonLd || null
}
