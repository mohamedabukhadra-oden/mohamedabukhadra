'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { hasConsent } from '@/lib/consent'

/**
 * Sends page views to our own /api/track endpoint.
 *
 * Runs alongside the third-party pixels rather than replacing them: this one is
 * same-origin, so it still reports for visitors whose ad blockers drop GA4 —
 * typically a meaningful share of a technical audience. It stores no IP and no
 * fingerprint; the visitor id is a random value generated in the browser.
 */

const VISITOR_KEY = 'mak_vid'
const SESSION_KEY = 'mak_sid'

function randomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = randomId()
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    // Private mode or storage disabled — still count the visit, just as a new
    // visitor each time rather than failing outright.
    return randomId()
  }
}

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = randomId()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return randomId()
  }
}

/** Fire a named conversion event, e.g. trackEvent('lead_submitted'). */
export function trackEvent(name: string, meta?: Record<string, unknown>, value?: number) {
  if (typeof window === 'undefined') return
  if (!hasConsent('analytics_storage')) return

  const payload = JSON.stringify({
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    path: window.location.pathname,
    event: name,
    meta,
    value,
  })

  // sendBeacon survives the page unloading, which a plain fetch may not.
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
  } else {
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {})
  }
}

export function FirstPartyAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lastPath = useRef<string | null>(null)

  useEffect(() => {
    if (!pathname) return
    // The App Router re-runs this on every navigation; skip repeats of the same
    // path so a re-render doesn't inflate the counts.
    if (lastPath.current === pathname) return
    if (!hasConsent('analytics_storage')) return

    lastPath.current = pathname

    const payload = {
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      path: pathname,
      referrer: document.referrer || null,
      utmSource: searchParams?.get('utm_source') || null,
      utmMedium: searchParams?.get('utm_medium') || null,
      utmCampaign: searchParams?.get('utm_campaign') || null,
    }

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Analytics must never surface an error to the visitor.
    })
  }, [pathname, searchParams])

  return null
}
