'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Loader2, ArrowRight, Search } from 'lucide-react'

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string
  publishedAt: string | null
}

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'family-systems', label: 'Family Systems & Dog Ownership' },
  { value: 'business-strategy', label: 'Business & Strategy' },
  { value: 'marketing-growth', label: 'Marketing & Growth' },
]

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`/api/articles?category=${category}`)
      .then(res => res.json())
      .then(data => { setArticles(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [category])

  const filtered = articles.filter(a =>
    !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="pt-24 pb-16 md:pt-32 md:pb-24 min-h-screen bg-[#F5F1E8]">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-[#1B3B36] mb-4">Insights</h1>
          <p className="text-lg text-[#6B5D4F] italic">Thinking at the intersection of strategy, execution, and real life.</p>
          <div className="w-16 h-1 bg-[#C9A86A] rounded-full mx-auto mt-6" />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  category === c.value
                    ? 'bg-[#1B3B36] text-white'
                    : 'bg-white text-[#6B5D4F] border border-[#EBE5D5] hover:bg-[#EBE5D5]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5D4F]" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-10 w-full sm:w-48 rounded-lg border border-[#EBE5D5] pl-9 pr-3 text-sm bg-white"
            />
          </div>
        </div>

        {/* Articles */}
        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-[#1B3B36]" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6B5D4F]">No articles found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filtered.map(article => (
              <Link key={article.id} href={`/insights/${article.slug}`} className="group">
                <div className="bg-white rounded-xl border border-[#EBE5D5] p-6 hover:shadow-lg hover:border-[#C9A86A]/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-[#C9A86A] uppercase tracking-wider">
                      {CATEGORIES.find(c => c.value === article.category)?.label || article.category}
                    </span>
                    {article.publishedAt && (
                      <span className="text-xs text-[#6B5D4F]">
                        · {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl font-bold text-[#1B3B36] mb-2 group-hover:text-[#C9A86A] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-[#6B5D4F] leading-relaxed mb-3">{article.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[#1B3B36] group-hover:text-[#C9A86A] transition-colors">
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
