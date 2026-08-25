import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'

const SIGNUP_RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 10 }

// Deliberately permissive — the goal is to reject obvious junk, not to police
// valid-but-unusual addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** POST /api/newsletter — subscribe to the list. */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, SIGNUP_RATE_LIMIT)
  if (limited) return limited

  try {
    const body = await req.json().catch(() => ({}))
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : null
    const source = typeof body.source === 'string' ? body.source.slice(0, 60) : 'site'

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const existing = await db.newsletterSubscriber.findUnique({ where: { email } })

    if (existing) {
      // Resubscribe silently if they'd previously opted out. Returning the same
      // response either way avoids confirming who is already on the list.
      if (!existing.active) {
        await db.newsletterSubscriber.update({
          where: { email },
          data: { active: true, unsubscribedAt: null },
        })
      }
      return NextResponse.json({ ok: true })
    }

    await db.newsletterSubscriber.create({
      data: {
        email,
        name,
        source,
        unsubToken: randomBytes(24).toString('hex'),
      },
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Newsletter signup failed:', e)
    return NextResponse.json({ error: 'Could not subscribe right now.' }, { status: 500 })
  }
}
