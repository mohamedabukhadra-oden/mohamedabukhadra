import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { db } from '@/lib/db'

/**
 * Shared renderer for articles that live as static files rather than DB rows —
 * used for content that needs to publish without a database write (see the
 * insights/<slug>/page.tsx files that use this). Same markup as the DB-backed
 * insights/[slug] route, so a reader can't tell which kind of page they're on.
 */

/** Inline markdown within a line — bold only, the one form actually used in content. */
function renderInline(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

export function renderMarkdown(md: string) {
  return md
    .split('\n')
    .map((line: string) => {
      if (line.startsWith('### ')) return `<h3 class="font-serif text-xl font-bold text-ink mt-6 mb-2">${renderInline(line.slice(4))}</h3>`
      if (line.startsWith('## ')) return `<h2 class="font-serif text-2xl font-bold text-ink mt-8 mb-3">${renderInline(line.slice(3))}</h2>`
      if (line.startsWith('# ')) return `<h1 class="font-serif text-3xl font-bold text-ink mt-8 mb-4">${renderInline(line.slice(2))}</h1>`
      if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-gold pl-4 italic text-text-2 my-4">${renderInline(line.slice(2))}</blockquote>`
      if (line.startsWith('- ')) return `<li class="ml-4 text-ink">${renderInline(line.slice(2))}</li>`
      if (line.trim() === '') return '<br/>'
      return `<p class="text-ink leading-relaxed mb-4">${renderInline(line)}</p>`
    })
    .join('')
}

/**
 * Listing metadata for every static article, so /insights can show them
 * alongside the DB-backed ones instead of leaving them reachable only by
 * direct URL. Keep in sync with each insights/<slug>/page.tsx — title,
 * excerpt, category, readTime and publishedAt should match exactly.
 */
export const STATIC_ARTICLES = [
  {
    slug: 'real-cost-of-a-puppys-first-year',
    title: "The Real Cost of a Puppy's First Year (It's Not Just Time)",
    excerpt:
      "Everyone warns you about the sleepless nights. Almost nobody hands you a number. Here's what the first year actually costs, and why the number itself is part of the readiness test.",
    category: 'dogs-family',
    readTime: 4,
    publishedAt: '2026-09-08T00:00:00.000Z',
    featured: false,
  },
  {
    slug: 'puppy-while-working-full-time',
    title: 'Can You Get a Puppy If You Work Full-Time? The Honest Answer',
    excerpt:
      "The internet says it's impossible. It isn't — but it does require a system most families skip, and being honest about what a puppy alone in the house for eight hours actually needs.",
    category: 'dogs-family',
    readTime: 4,
    publishedAt: '2026-09-08T00:00:00.000Z',
    featured: false,
  },
  {
    slug: 'puppy-vs-adult-rescue-dog-for-family',
    title: 'Puppy or Rescue Adult Dog: Which One Actually Fits Your Family?',
    excerpt:
      "This is the decision that comes before almost every other decision on this site — and most families never actually stop to make it on purpose.",
    category: 'dogs-family',
    readTime: 4,
    publishedAt: '2026-09-08T00:00:00.000Z',
    featured: false,
  },
  {
    slug: 'should-we-get-a-second-dog',
    title: 'Should You Get a Second Dog? What Actually Changes',
    excerpt:
      "A second dog isn't twice the dog. It's a different household, with a different set of rules, introduced to a system that was built for one.",
    category: 'dogs-family',
    readTime: 4,
    publishedAt: '2026-09-08T00:00:00.000Z',
    featured: false,
  },
] as const

export async function getMoreArticles(excludeSlug: string, category: string) {
  try {
    // Prefer other articles in the same category, most recent first, so the
    // list is actually relevant to what the reader is currently reading.
    const sameCategory = await db.article.findMany({
      where: { status: 'PUBLISHED', slug: { not: excludeSlug }, category },
      orderBy: { publishedAt: 'desc' },
      take: 3,
      select: { slug: true, title: true, category: true },
    })

    if (sameCategory.length >= 3) return sameCategory

    // Not enough in-category articles yet — fill the rest with the most
    // recent articles overall, excluding the current one and any already picked.
    const alreadyPicked = [excludeSlug, ...sameCategory.map((a) => a.slug)]
    const fallback = await db.article.findMany({
      where: { status: 'PUBLISHED', slug: { notIn: alreadyPicked } },
      orderBy: { publishedAt: 'desc' },
      take: 3 - sameCategory.length,
      select: { slug: true, title: true, category: true },
    })

    return [...sameCategory, ...fallback]
  } catch {
    return []
  }
}

export function StaticArticle({
  title,
  category,
  publishedAt,
  readTime,
  excerpt,
  content,
  moreArticles,
}: {
  title: string
  category: string
  publishedAt: string
  readTime: number
  excerpt: string
  content: string
  moreArticles: { slug: string; title: string; category: string }[]
}) {
  return (
    <div className="bg-bone pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <Link href="/insights" className="inline-flex items-center gap-1 text-sm text-text-2 hover:text-ink mb-6">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-gold uppercase tracking-wider">{category}</span>
          <time dateTime={publishedAt} className="text-xs text-text-2">
            · {new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          {readTime > 0 && <span className="text-xs text-text-2">· {readTime} min read</span>}
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-4">{title}</h1>
        {excerpt && <p className="text-lg text-text-2 italic mb-8">{excerpt}</p>}
        <div className="w-16 h-1 bg-gold rounded-full mb-8" />

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />

        <div className="mt-12 p-6 rounded-xl bg-teal text-white text-center">
          <h3 className="font-serif text-xl font-bold mb-2">Is Your Family Ready for a Dog?</h3>
          <p className="text-sm text-white/70 mb-4">Get the free Reset chapter from Before You Say Yes to the Dog.</p>
          <Link href="/free" className="inline-flex items-center gap-2 bg-gold text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-gold/90">
            Get the free chapter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {moreArticles.length > 0 && (
          <div className="mt-12 border-t border-rule pt-8">
            <h2 className="font-serif text-lg font-bold text-ink mb-4">More from Insights</h2>
            <ul className="space-y-3">
              {moreArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group flex items-center justify-between gap-3 text-ink hover:text-accent"
                  >
                    <span>
                      <span className="text-xs font-medium text-gold uppercase tracking-wider block mb-0.5">{a.category}</span>
                      {a.title}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 opacity-0 translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
