import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
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
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.article.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
