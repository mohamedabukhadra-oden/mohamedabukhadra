/**
 * Email sending via Resend.
 *
 * Uses Resend's REST API through fetch rather than the `resend` SDK — one less
 * dependency, and it works unchanged on any runtime. Swap the transport in
 * sendEmail() if you ever move providers; nothing above this file knows which
 * service is behind it.
 *
 * Required env:
 *   RESEND_API_KEY   e.g. re_xxxxxxxx
 *   EMAIL_FROM       e.g. Mohamed Abu Khadra <hello@mohamedabukhadra.com>
 *                    The sending domain must be verified in Resend first.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

export type SendResult = { ok: true; id: string } | { ok: false; error: string }

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM)
}

export async function sendEmail(opts: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
  headers?: Record<string, string>
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  if (!apiKey || !from) {
    return { ok: false, error: 'RESEND_API_KEY or EMAIL_FROM is not set' }
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(opts.to) ? opts.to : [opts.to],
        subject: opts.subject,
        html: opts.html,
        ...(opts.text ? { text: opts.text } : {}),
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
        ...(opts.headers ? { headers: opts.headers } : {}),
      }),
    })

    const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string }

    if (!res.ok) {
      return { ok: false, error: body.message || `Resend returned ${res.status}` }
    }

    return { ok: true, id: body.id || '' }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Unknown email error' }
  }
}

/**
 * Sends to a list in batches with a small pause between them.
 *
 * Resend rate-limits per second; firing 200 concurrent requests gets throttled
 * and drops mail silently. Sequential batches trade a little wall-clock for
 * delivery you can actually rely on.
 */
export async function sendBatch(
  recipients: { email: string; html: string; subject: string }[],
  { batchSize = 20, pauseMs = 1100 }: { batchSize?: number; pauseMs?: number } = {}
): Promise<{ sent: number; failed: number; errors: string[] }> {
  let sent = 0
  let failed = 0
  const errors: string[] = []

  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)

    const results = await Promise.all(
      batch.map((r) => sendEmail({ to: r.email, subject: r.subject, html: r.html }))
    )

    for (const result of results) {
      if (result.ok) {
        sent++
      } else {
        failed++
        if (errors.length < 10) errors.push(result.error)
      }
    }

    if (i + batchSize < recipients.length) {
      await new Promise((resolve) => setTimeout(resolve, pauseMs))
    }
  }

  return { sent, failed, errors }
}
