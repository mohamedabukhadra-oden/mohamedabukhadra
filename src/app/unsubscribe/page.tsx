import Link from 'next/link'
import type { Metadata } from 'next'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Unsubscribe — Mohamed Abu Khadra',
  // Never index an unsubscribe page: it's per-recipient and has no search value.
  robots: { index: false, follow: false },
}

/**
 * Unsubscribe landing page, linked from every newsletter.
 *
 * The token is a random per-subscriber value, so no login is required and one
 * subscriber's link can't unsubscribe anyone else.
 */
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams

  let state: 'done' | 'already' | 'invalid' = 'invalid'

  if (token) {
    const subscriber = await db.newsletterSubscriber
      .findUnique({ where: { unsubToken: token } })
      .catch(() => null)

    if (subscriber) {
      if (subscriber.active) {
        await db.newsletterSubscriber.update({
          where: { id: subscriber.id },
          data: { active: false, unsubscribedAt: new Date() },
        })
        state = 'done'
      } else {
        state = 'already'
      }
    }
  }

  const copy = {
    done: {
      heading: 'You’ve been unsubscribed',
      body: 'You won’t receive any more emails from me. No hard feelings — the writing stays on the site if you ever want it.',
    },
    already: {
      heading: 'You’re already unsubscribed',
      body: 'There’s nothing more to do — you’re not on the list.',
    },
    invalid: {
      heading: 'That link didn’t work',
      body: 'The unsubscribe link looks incomplete or has already been replaced. Reply to any email from me and I’ll remove you by hand.',
    },
  }[state]

  return (
    <div className="flex items-center justify-center px-5 py-24 min-h-[60vh] bg-bone">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl font-bold text-ink mb-3">{copy.heading}</h1>
        <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-6" />
        <p className="text-text-2 leading-relaxed mb-8">{copy.body}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-teal text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-teal/90"
        >
          Back to the site
        </Link>
      </div>
    </div>
  )
}
