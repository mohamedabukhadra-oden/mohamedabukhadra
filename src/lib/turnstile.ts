/**
 * Server-side verification for the Cloudflare Turnstile widget
 * (src/components/forms/turnstile.tsx).
 *
 * No-ops (returns true) when TURNSTILE_SECRET_KEY isn't configured, so forms
 * keep working before Turnstile is set up — the honeypot/timing checks in
 * src/lib/antibot.ts already cover that gap in the meantime.
 */
export async function verifyTurnstile(token: unknown): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (typeof token !== 'string' || !token) return false

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return data.success === true
  } catch {
    // A Cloudflare outage should not itself block real submissions.
    return true
  }
}
