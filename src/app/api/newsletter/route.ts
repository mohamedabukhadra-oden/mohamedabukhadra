import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { db } from '@/lib/db'
import { rateLimit } from '@/lib/rate-limit'
import { sendEmail, emailConfigured } from '@/lib/email'
import { welcomeEmailHtml } from '@/lib/newsletter-template'
import { SITE_URL } from '@/lib/seo'

export const runtime = 'nodejs'

const SIGNUP_RATE_LIMIT = { windowMs: 60 * 60 * 1000, max: 10 }

// Deliberately permissive — the goal is to reject obvious junk, not to police
// valid-but-unusual addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Fires the one welcome/confirmation email a subscriber should get immediately
 * on signup. Previously nothing was ever sent here — the row was created and
 * the API returned {ok:true} — which is what broke the /free page's promise
 * ("Check your inbox. The chapter is on its way.") and left plain newsletter
 * signups with no confirmation at all.
 *
 * Best-effort: a Resend outage must not fail the signup itself, since the
 * subscriber row (the thing that actually matters) is already committed.
 *
 * FREE_CHAPTER_URL is not set anywhere in this repo — there's no Chapter 10
 * file or hosted page to point at. Until it's configured, a /free signup gets
 * the honest generic welcome instead of a chapter link that would 404.
 */
async function sendWelcomeEmail(subscriber: { email: string; name: string | null; unsubToken: string }, source: string) {
  if (!emailConfigured()) return

  const chapterUrl = source === 'reset-chapter' ? process.env.FREE_CHAPTER_URL || null : null

  try {
    await sendEmail({
      to: subscriber.email,
      subject: chapterUrl ? 'Your Reset chapter is here' : "You're on the list",
      html: welcomeEmailHtml({
        recipientName: subscriber.name,
        unsubscribeUrl: `${SITE_URL}/unsubscribe?token=${subscriber.unsubToken}`,
        chapterUrl,
      }),
    })
  } catch (e) {
    console.error('Welcome email failed:', e)
  }
}

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
        // Re-send the welcome/chapter email on reactivation too — historically
        // this never fired at all, so a previously-active subscriber may never
        // have received it the first time either.
        await sendWelcomeEmail(existing, source)
      }
      return NextResponse.json({ ok: true })
    }

    const created = await db.newsletterSubscriber.create({
      data: {
        email,
        name,
        source,
        unsubToken: randomBytes(24).toString('hex'),
      },
    })

    await sendWelcomeEmail(created, source)

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Newsletter signup failed:', e)
    return NextResponse.json({ error: 'Could not subscribe right now.' }, { status: 500 })
  }
}
