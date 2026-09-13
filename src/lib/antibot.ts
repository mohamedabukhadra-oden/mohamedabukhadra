/**
 * Two zero-dependency, zero-friction bot signals for public lead/newsletter
 * forms — no CAPTCHA, no external service, nothing a real visitor ever sees
 * or has to solve.
 *
 * 1. Honeypot: a field real users never see or fill in (kept out of the tab
 *    order and hidden off-screen, not display:none — some bots skip fields
 *    that are display:none but still fill ones that are merely positioned
 *    off-screen). Bots that auto-fill every input on the page fill it anyway.
 * 2. Timing: a bot that requests the page and submits in one shot arrives far
 *    faster than a human reading and typing into a form ever could.
 *
 * A submission that fails either check gets a normal-looking success response
 * — never an error — so a bot never learns which check it tripped or that it
 * was caught at all, and never adjusts to get past it.
 */

export const HONEYPOT_FIELD = 'website'
export const MIN_SUBMIT_MS = 2500

export function isBotSubmission(body: { [HONEYPOT_FIELD]?: unknown; renderedAt?: unknown }): boolean {
  const honeypot = body[HONEYPOT_FIELD]
  if (typeof honeypot === 'string' && honeypot.trim() !== '') return true

  const renderedAt = body.renderedAt
  if (typeof renderedAt !== 'number' || !Number.isFinite(renderedAt)) return true
  if (Date.now() - renderedAt < MIN_SUBMIT_MS) return true

  return false
}
