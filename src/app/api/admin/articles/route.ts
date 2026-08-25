import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAdmin } from '@/lib/auth'

export const runtime = 'nodejs'

/**
 * Admin article endpoints.
 *
 * Every handler is wrapped in withAdmin. Previously these were completely
 * unauthenticated — anyone could POST articles or DELETE them with a bare curl,
 * because the only gate was React state in the admin page.
 *
 * GET is guarded too: it lists drafts, which aren't public.
 */

export const GET = withAdmin(async () => {
  const articles = await db.article.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(articles)
})

export const POST = withAdmin(async (req) => {
  const body = await req.json().catch(() => ({}))
  const { title, slug, excerpt, content, category, tags, status, featured, metaDescription } = body

  if (!title || !slug || !content) {
    return NextResponse.json({ error: 'Title, slug, and content are required' }, { status: 400 })
  }

  const existing = await db.article.findUnique({ where: { slug } })
  if (existing) {
    return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
  }

  const article = await db.article.create({
    data: {
      title,
      slug,
      excerpt: excerpt || '',
      content,
      category: category || 'family-systems',
      tags: tags || '',
      status: status || 'DRAFT',
      featured: featured || false,
      metaDescription: metaDescription || null,
      publishedAt: status === 'PUBLISHED' ? new Date() : null,
    },
  })

  return NextResponse.json(article, { status: 201 })
})
