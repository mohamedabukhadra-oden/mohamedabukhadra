import type { MetadataRoute } from 'next'

const SITE_URL = 'https://www.mohamedabukhadra.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /admin is gated, but an ungated crawl still surfaces the login page in
        // search results. /unsubscribe is per-recipient and has no search value.
        disallow: ['/api/', '/admin', '/unsubscribe'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
