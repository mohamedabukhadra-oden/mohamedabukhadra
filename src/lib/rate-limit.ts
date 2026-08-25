import { NextRequest, NextResponse } from 'next/server'

/**
 * Minimal in-memory rate limiter for the login route.
 *
 * Per-instance, so it is not a hard guarantee across a serverless fleet — but it
 * raises the cost of credential stuffing enough to matter, and it costs nothing.
 * Move to a shared store (Redis/Upstash) if login abuse ever becomes real.
 */

type Bucket = { count: number; resetAt: number }
const buckets = new Map<string, Bucket>()

function clientKey(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  return (fwd ? fwd.split(',')[0].trim() : null) ?? req.headers.get('x-real-ip') ?? 'unknown'
}

export function rateLimit(
  req: NextRequest,
  { windowMs, max }: { windowMs: number; max: number }
): NextResponse | null {
  const key = clientKey(req)
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return null
  }

  bucket.count += 1
  if (bucket.count > max) {
    const retryAfter = Math.ceil((bucket.resetAt - now) / 1000)
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } }
    )
  }

  return null
}
