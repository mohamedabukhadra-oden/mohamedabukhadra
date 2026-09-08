import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { emailConfigured, sendBatch } from '@/lib/email'
import { sequenceEmailHtml } from '@/lib/newsletter-template'
import { SITE_URL } from '@/lib/seo'
import { LEAD_MAGNETS } from '@/lib/lead-magnets'
import { BOOK_ONE_BUY_URL } from '@/lib/buy-url'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * GET /api/newsletter/sequence — the Day-3 and Day-7 steps of the Reset
 * signup sequence. Called daily by Vercel Cron (see vercel.json), same
 * CRON_SECRET auth as /api/auto-publish.
 *
 * Immediately: the Reset PDF (sent from /api/newsletter on signup itself).
 * Day 3: the Puppy Starter Pack.
 * Day 7: a short note about Book One. Then stop — no more scheduled mail.
 *
 * Deliberately schema-free: rather than a "sentAt" column (which would need a
 * migration run against production — out of scope for this change), each
 * subscriber is matched by the UTC calendar day their createdAt falls on,
 * exactly 3 or 7 days before today. Since this runs once a day, each
 * subscriber falls into a given bucket on exactly one day. The tradeoff: if a
 * day's run is ever missed (a Vercel Cron outage, a failed deploy), that
 * day's cohort simply never gets that step — it is not retried or backfilled.
 * Given the site's own promise ("no daily emails, no constant promotions"),
 * an occasional missed send is the right side to fail on, not a double-send.
 */

function utcDayRange(daysAgo: number): { gte: Date; lt: Date } {
  const start = new Date()
  start.setUTCDate(start.getUTCDate() - daysAgo)
  start.setUTCHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setUTCDate(end.getUTCDate() + 1)
  return { gte: start, lt: end }
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET || ''
  const auth = req.headers.get('authorization') || ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET is not configured.' }, { status: 500 })
  }
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!emailConfigured()) {
    return NextResponse.json({ ok: true, skipped: 'email not configured' })
  }

  try {
    const [day3Subs, day7Subs] = await Promise.all([
      db.newsletterSubscriber.findMany({
        where: { source: 'reset-chapter', active: true, createdAt: utcDayRange(3) },
      }),
      db.newsletterSubscriber.findMany({
        where: { source: 'reset-chapter', active: true, createdAt: utcDayRange(7) },
      }),
    ])

    const day3Result = await sendBatch(
      day3Subs.map((s) => ({
        email: s.email,
        subject: 'Your Puppy Starter Pack',
        html: sequenceEmailHtml({
          recipientName: s.name,
          heading: 'Your Puppy Starter Pack',
          body: 'A short, practical guide for the first weeks with a new puppy — the decisions that actually matter before the ones everyone argues about online.',
          ctaLabel: 'Download the Starter Pack →',
          ctaUrl: `${SITE_URL}${LEAD_MAGNETS.starterPack.path}`,
          unsubscribeUrl: `${SITE_URL}/unsubscribe?token=${s.unsubToken}`,
        }),
      }))
    )

    const day7Result = await sendBatch(
      day7Subs.map((s) => ({
        email: s.email,
        subject: 'One more thing',
        html: sequenceEmailHtml({
          recipientName: s.name,
          heading: 'One more thing',
          body: "If the Reset chapter was useful, the full book is Before You Say Yes to the Dog — the decision framework and family operating system it's part of. No more scheduled emails after this one.",
          ctaLabel: 'Get the book →',
          ctaUrl: BOOK_ONE_BUY_URL,
          unsubscribeUrl: `${SITE_URL}/unsubscribe?token=${s.unsubToken}`,
        }),
      }))
    )

    return NextResponse.json({
      ok: true,
      day3: { cohort: day3Subs.length, ...day3Result },
      day7: { cohort: day7Subs.length, ...day7Result },
    })
  } catch (e) {
    console.error('Newsletter sequence failed:', e)
    return NextResponse.json({ error: 'Sequence run failed.' }, { status: 500 })
  }
}
