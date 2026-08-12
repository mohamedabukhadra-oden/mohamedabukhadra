import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const articles = await db.article.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
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
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
