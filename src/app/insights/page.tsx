import Link from 'next/link'
import type { Metadata } from 'next'
import { db } from '@/lib/db'
import { SITE_URL } from '@/lib/seo'

/**
 * The writing index.
 *
 * Two things were wrong here and both are fixed:
 *
 *  1. It was a client component that fetched articles in a useEffect, so a
 *     crawler received a spinner and no list. Server-rendered now.
 *
 *  2. It was styled with tokens from the pre-v2 design system — warm-white,
 *     plum, plum-50, prose-editorial — none of which still exist, so the page
 *     rendered unstyled. That is almost certainly why it was redirected to the
 *     homepage rather than fixed. Rebuilt on the current tokens.
 *
 * The redirect is removed alongside this, because with it in place the 22
 * published articles sit in the sitemap linked from nowhere on the site.
 */

export const revalidate = 300

const CATEGORIES = [
  { value: 'dogs-family', label: 'Dogs & Family' },
  { value: 'life-reflection', label: 'Life & Reflection' },
  { value: 'business-strategy', label: 'Business & Strategy' },
  { value: 'contrarian-thinking', label: 'Contrarian Thinking' },
  { value: 'writing-publishing', label: 'Writing & Publishing' },
  { value: 'behind-the-scenes', label: 'Behind the Scenes' },
  { value: 'marketing-growth', label: 'Marketing & Growth' },
]

export const metadata: Metadata = {
  title: 'Writing — Mohamed Abu Khadra',
  description:
    'What I’ve noticed, what I’ve changed my mind about, and what I’m still figuring out. On dogs and families, business, and the questions most people don’t stop to ask.',
  alternates: { canonical: `${SITE_URL}/insights` },
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const active = CATEGORIES.find((c) => c.value === category)?.value

  // Filtering happens server-side so each category is its own crawlable URL
  // rather than a client-side state change Google never sees.
  const articles = await db.article.findMany({
    where: { status: 'PUBLISHED', ...(active ? { category: active } : {}) },
    orderBy: [{ featured: 'desc' }, { publishedAt: 'desc' }],
    select: {
      id: true, slug: true, title: true, excerpt: true,
      category: true, readTime: true, publishedAt: true, featured: true,
    },
  })

  const label = (v: string) => CATEGORIES.find((c) => c.value === v)?.label || v

  return (
    <div className="section-gap">
      <div className="section-container">
        <p className="section-label">Writing</p>
        <h1 className="text-h2 text-ink mt-3 max-w-3xl">
          What I&rsquo;ve noticed. What I&rsquo;ve changed my mind about. What I&rsquo;m still
          figuring out.
        </h1>

        {/* Real links, not buttons — each category is a URL a crawler can follow. */}
        <nav className="mt-8 flex flex-wrap gap-2" aria-label="Filter by category">
          <Link
            href="/insights"
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition-colors ${
              !active ? 'border-ink bg-ink text-bone' : 'border-rule text-text-2 hover:border-ink hover:text-ink'
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.value}
              href={`/insights?category=${c.value}`}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider transition-colors ${
                active === c.value
                  ? 'border-ink bg-ink text-bone'
                  : 'border-rule text-text-2 hover:border-ink hover:text-ink'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </nav>

        {articles.length === 0 ? (
          <p className="mt-16 text-text-2">Nothing published in this category yet.</p>
        ) : (
          <div className="mt-12 border-t border-rule">
            {articles.map((a) => (
              <article key={a.id} className="border-b border-rule py-7">
                <Link href={`/insights/${a.slug}`} className="group block">
                  <p className="text-xs uppercase tracking-wider text-accent">{label(a.category)}</p>
                  <h2 className="font-display mt-2 text-xl font-medium leading-snug text-ink transition-colors group-hover:text-accent md:text-2xl">
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p className="mt-2 max-w-2xl leading-relaxed text-text-2">{a.excerpt}</p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-3">
                    {a.publishedAt && (
                      <time dateTime={a.publishedAt.toISOString()}>
                        {a.publishedAt.toLocaleDateString('en-GB', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                      </time>
                    )}
                    {a.readTime > 0 && <span>· {a.readTime} min read</span>}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
