import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAdmin } from '@/lib/auth'
import { findResource, pickAllowedFields } from '@/lib/admin/resources'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ slug: string }> }

/* eslint-disable @typescript-eslint/no-explicit-any */
const model = (name: string) => (db as any)[name]

/** GET /api/admin/resources/[slug] — list, with optional ?q= search and paging. */
export const GET = withAdmin<Ctx>(async (req, { params }) => {
  const { slug } = await params
  const resource = findResource(slug)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 })

  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()
  const take = Math.min(Number(searchParams.get('take')) || 100, 500)
  const skip = Number(searchParams.get('skip')) || 0

  const where =
    q && resource.searchFields.length
      ? { OR: resource.searchFields.map((f) => ({ [f]: { contains: q, mode: 'insensitive' } })) }
      : {}

  try {
    const [items, total] = await Promise.all([
      model(resource.model).findMany({ where, orderBy: resource.defaultOrderBy, take, skip }),
      model(resource.model).count({ where }),
    ])
    return NextResponse.json({ items, total })
  } catch (e) {
    console.error(`List ${slug} failed:`, e)
    return NextResponse.json({ error: 'Failed to load' }, { status: 500 })
  }
})

/** POST /api/admin/resources/[slug] — create. */
export const POST = withAdmin<Ctx>(async (req, { params }) => {
  const { slug } = await params
  const resource = findResource(slug)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 })

  const body = await req.json().catch(() => ({}))
  const data = pickAllowedFields(resource, body)

  for (const field of resource.fields) {
    if (field.required && !data[field.name]) {
      return NextResponse.json({ error: `${field.label} is required.` }, { status: 400 })
    }
  }

  // Publishing an article for the first time stamps publishedAt, which drives
  // the sitemap and the article's displayed date.
  if (resource.model === 'article' && data.status === 'PUBLISHED' && !data.publishedAt) {
    data.publishedAt = new Date()
  }

  try {
    const item = await model(resource.model).create({ data })
    return NextResponse.json({ item }, { status: 201 })
  } catch (e) {
    const message = e instanceof Error && e.message.includes('Unique constraint')
      ? 'That slug or path is already in use.'
      : 'Failed to create.'
    console.error(`Create ${slug} failed:`, e)
    return NextResponse.json({ error: message }, { status: 400 })
  }
})
