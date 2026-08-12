'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string

  const [article, setArticle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/articles/${slug}`)
      .then(res => {
        if (!res.ok) { setNotFound(true); return null }
        return res.json()
      })
      .then(data => { if (data) setArticle(data); setLoading(false) })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
        <Nav />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#1B3B36]" />
        </main>
        <Footer />
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
        <Nav />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-[#1B3B36] mb-4">Article Not Found</h1>
            <Link href="/insights" className="text-[#C9A86A] hover:text-[#1B3B36]">← Back to Insights</Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Simple markdown-to-HTML rendering
  const renderMarkdown = (md: string) => {
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

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <Nav />
      <main className="flex-1 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-2xl mx-auto px-5 md:px-8">
          <Link href="/insights" className="inline-flex items-center gap-1 text-sm text-[#6B5D4F] hover:text-[#1B3B36] mb-6">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
          </Link>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-[#C9A86A] uppercase tracking-wider">{article.category}</span>
            {article.publishedAt && (
              <span className="text-xs text-[#6B5D4F]">
                · {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1B3B36] mb-4">{article.title}</h1>
          <p className="text-lg text-[#6B5D4F] italic mb-8">{article.excerpt}</p>
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
