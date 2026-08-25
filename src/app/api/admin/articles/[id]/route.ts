import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAdmin } from '@/lib/auth'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ id: string }> }

export const PUT = withAdmin<Ctx>(async (req, { params }) => {
  const { id } = await params
  const body = await req.json().catch(() => ({}))
  const { title, slug, excerpt, content, category, tags, status, featured, metaDescription } = body

  const existing = await db.article.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  // Check slug uniqueness if changed
  if (slug !== existing.slug) {
    const slugExists = await db.article.findUnique({ where: { slug } })
    if (slugExists) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }
  }

  const wasPublished = existing.status === 'PUBLISHED'
  const isNowPublished = status === 'PUBLISHED'

  const article = await db.article.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      status,
      featured,
      metaDescription,
      publishedAt: !wasPublished && isNowPublished ? new Date() : existing.publishedAt,
    },
  })

  return NextResponse.json(article)
})

export const DELETE = withAdmin<Ctx>(async (_req, { params }) => {
  const { id } = await params
  try {
    await db.article.delete({ where: { id } })
  } catch {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }
  return NextResponse.json({ ok: true })
})
