import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { db } from '@/lib/db'

/**
 * Article page.
 *
 * This was previously a client component: it rendered a spinner and fetched the
 * article from /api/articles/[slug] in a useEffect. That meant crawlers received
 * an empty shell with no title, no description, no canonical, and no body text —
 * and a client component cannot export generateMetadata at all, so every article
 * inherited the site-wide title. Server-rendered here so the article exists in
 * the initial HTML.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mohamedabukhadra.com'

// Rebuild published articles every 5 minutes. Never set this to 0 — a fresh
// render on every request means a transient DB error during a crawl becomes a
// 404 with no cached page behind it.
export const revalidate = 300

/** Pre-render every published article so each is static from the moment it deploys. */
export async function generateStaticParams() {
  try {
    const articles = await db.article.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true },
    })
    return articles.map((a) => ({ slug: a.slug }))
  } catch {
    // A build-time DB outage shouldn't fail the deploy; these still render via ISR.
    return []
  }
}

async function getArticle(slug: string) {
  // Deliberately no .catch() swallowing errors into null: a DB failure must
  // surface as a 500 (which Google retries) rather than a 404 (which drops the
  // page from the index).
  const article = await db.article.findUnique({ where: { slug } })
  if (!article || article.status !== 'PUBLISHED') return null
  return article
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return { title: 'Article Not Found', robots: { index: false, follow: false } }
  }

  const url = `${SITE_URL}/insights/${article.slug}`
  const description = article.metaDescription || article.excerpt || undefined

  return {
    title: `${article.title} — Mohamed Abu Khadra`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: article.title,
      description,
      url,
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: article.ogImage || article.coverImage || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
    },
  }
}

// Kept identical to the previous client-side renderer so the styling is unchanged.
function renderMarkdown(md: string) {
  return md
    .split('\n')
    .map((line: string) => {
      if (line.startsWith('### ')) return `<h3 class="font-serif text-xl font-bold text-[#1B3B36] mt-6 mb-2">${line.slice(4)}</h3>`
      if (line.startsWith('## ')) return `<h2 class="font-serif text-2xl font-bold text-[#1B3B36] mt-8 mb-3">${line.slice(3)}</h2>`
      if (line.startsWith('# ')) return `<h1 class="font-serif text-3xl font-bold text-[#1B3B36] mt-8 mb-4">${line.slice(2)}</h1>`
      if (line.startsWith('> ')) return `<blockquote class="border-l-4 border-[#C9A86A] pl-4 italic text-[#6B5D4F] my-4">${line.slice(2)}</blockquote>`
      if (line.startsWith('- ')) return `<li class="ml-4 text-[#2A2520]">${line.slice(2)}</li>`
      if (line.trim() === '') return '<br/>'
      return `<p class="text-[#2A2520] leading-relaxed mb-4">${line}</p>`
    })
    .join('')
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  const url = `${SITE_URL}/insights/${article.slug}`

  // Article structured data — lets Google show the headline, author and date
  // rather than guessing them from the markup.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt || undefined,
    datePublished: article.publishedAt?.toISOString(),
    dateModified: article.updatedAt.toISOString(),
    author: { '@type': 'Person', name: 'Mohamed Abu Khadra', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Mohamed Abu Khadra', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(article.ogImage || article.coverImage ? { image: article.ogImage || article.coverImage } : {}),
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="flex-1 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <Link href="/insights" className="inline-flex items-center gap-1 text-sm text-[#6B5D4F] hover:text-[#1B3B36] mb-6">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-[#C9A86A] uppercase tracking-wider">{article.category}</span>
            {article.publishedAt && (
              <time
                dateTime={article.publishedAt.toISOString()}
                className="text-xs text-[#6B5D4F]"
              >
                · {article.publishedAt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            )}
            {article.readTime > 0 && (
              <span className="text-xs text-[#6B5D4F]">· {article.readTime} min read</span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1B3B36] mb-4">{article.title}</h1>
          {article.excerpt && <p className="text-lg text-[#6B5D4F] italic mb-8">{article.excerpt}</p>}
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mb-8" />

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl bg-[#1B3B36] text-white text-center">
            <h3 className="font-serif text-xl font-bold mb-2">Is Your Family Ready for a Dog?</h3>
            <p className="text-sm text-white/70 mb-4">Take the free Family Dog Readiness Quick Check.</p>
            <Link href="/quick-check" className="inline-flex items-center gap-2 bg-[#C9A86A] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#DDB87A]">
              Take the Quick Check <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
