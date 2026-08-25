'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, Loader2 } from 'lucide-react'

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string
  featured: boolean
  publishedAt: string | null
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'family-systems', label: 'Family Systems' },
  { value: 'business-strategy', label: 'Business & Strategy' },
  { value: 'marketing-growth', label: 'Marketing & Growth' },
]

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    setLoading(true)
    fetch(`/api/articles?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [activeCategory])

  const featured = articles.filter((a) => a.featured)
  const regular = articles.filter((a) => !a.featured)

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-warm-white">
      <div className="section-container">
        {/* Header */}
        <div className="mb-10">
          <p className="section-label">Thinking</p>
          <h2 className="font-serif text-3xl md:text-4xl font-light tracking-tight mt-3 mb-4">
            What I&apos;ve noticed. What I&apos;ve changed my mind about. What I&apos;m still figuring out.
          </h2>
          <p className="prose-editorial max-w-2xl text-muted-foreground">
            Strategy, marketing, growth, and the questions most people don&apos;t stop to ask.
          </p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-10 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`font-sans text-xs tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-plum text-warm-white border-plum'
                  : 'bg-transparent text-muted-foreground border-border hover:border-plum hover:text-plum'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-plum" />
          </div>
        ) : articles.length === 0 ? (
          <p className="font-sans text-muted-foreground text-center py-16">
            No articles found for this category.
          </p>
        ) : (
          <div className="space-y-12">
            {/* Featured articles */}
            {featured.length > 0 && (
              <div className="grid md:grid-cols-2 gap-8">
                {featured.map((article) => (
                  <Link
                    key={article.id}
                    href={`/insights/${article.slug}`}
                    className="group p-8 rounded-lg bg-card border border-border hover:-translate-y-1 hover:shadow-md transition-all duration-500"
                  >
                    {article.category && (
                      <span className="font-sans text-xs tracking-wider uppercase bg-plum-50 text-plum px-3 py-1 rounded-full">
                        {CATEGORIES.find((c) => c.value === article.category)?.label || article.category}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight mt-4 mb-3 group-hover:text-plum transition-colors">
                      {article.title}
                    </h3>
                    <p className="prose-editorial text-base">
                      {(article.excerpt || '').slice(0, 200)}
                      {(article.excerpt || '').length > 200 ? '...' : ''}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="inline-flex items-center gap-1.5 font-sans text-sm text-plum group-hover:gap-2.5 transition-all duration-300">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                      {article.publishedAt && (
                        <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Regular articles */}
            {regular.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regular.map((article) => (
                  <Link
                    key={article.id}
                    href={`/insights/${article.slug}`}
                    className="group p-6 rounded-lg border border-border hover:-translate-y-1 hover:shadow-md transition-all duration-500"
                  >
                    {article.category && (
                      <span className="font-sans text-xs tracking-wider uppercase bg-plum-50 text-plum px-3 py-1 rounded-full">
                        {CATEGORIES.find((c) => c.value === article.category)?.label || article.category}
                      </span>
                    )}
                    <h3 className="font-serif text-xl font-light tracking-tight mt-3 mb-2 group-hover:text-plum transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                      {(article.excerpt || '').slice(0, 120)}
                      {(article.excerpt || '').length > 120 ? '...' : ''}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="inline-flex items-center gap-1.5 font-sans text-sm text-plum group-hover:gap-2.5 transition-all duration-300">
                        Read <ArrowRight className="w-4 h-4" />
                      </span>
                      {article.publishedAt && (
                        <span className="font-sans text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
