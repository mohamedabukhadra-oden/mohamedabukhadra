import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedabukhadra.com'

/**
 * Generated at /robots.txt.
 *
 * Do not also add a static public/robots.txt — when both exist the static file
 * wins and this becomes dead code, which is exactly the situation on
 * theknowhow.uk today.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
