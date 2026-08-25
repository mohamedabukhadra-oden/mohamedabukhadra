import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAdmin } from '@/lib/auth'
import { findResource, pickAllowedFields } from '@/lib/admin/resources'

export const runtime = 'nodejs'

type Ctx = { params: Promise<{ slug: string; id: string }> }

/* eslint-disable @typescript-eslint/no-explicit-any */
const model = (name: string) => (db as any)[name]

/** GET a single record. */
export const GET = withAdmin<Ctx>(async (_req, { params }) => {
  const { slug, id } = await params
  const resource = findResource(slug)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 })

  const item = await model(resource.model).findUnique({ where: { id } })
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ item })
})

/** PUT — update. */
export const PUT = withAdmin<Ctx>(async (req, { params }) => {
  const { slug, id } = await params
  const resource = findResource(slug)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 })

  const existing = await model(resource.model).findUnique({ where: { id } })
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json().catch(() => ({}))
  const data = pickAllowedFields(resource, body)

  // Stamp publishedAt the first time an article goes live, and leave it alone
  // afterwards so re-editing a published piece doesn't reset its date.
  if (resource.model === 'article') {
    const goingLive = data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED'
    if (goingLive && !existing.publishedAt) data.publishedAt = new Date()
  }

  try {
    const item = await model(resource.model).update({ where: { id }, data })
    return NextResponse.json({ item })
  } catch (e) {
    const message = e instanceof Error && e.message.includes('Unique constraint')
      ? 'That slug or path is already in use.'
      : 'Failed to update.'
    console.error(`Update ${slug} failed:`, e)
    return NextResponse.json({ error: message }, { status: 400 })
  }
})

/** DELETE — remove. */
export const DELETE = withAdmin<Ctx>(async (_req, { params }) => {
  const { slug, id } = await params
  const resource = findResource(slug)
  if (!resource) return NextResponse.json({ error: 'Unknown resource' }, { status: 404 })

  try {
    await model(resource.model).delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
})
