import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * First-party analytics collection.
 *
 * Same-origin, so it keeps working for the sizeable share of visitors whose ad
 * blockers drop GA4 entirely. Deliberately stores no IP address and no
 * fingerprint: the visitor id is a random value the browser generates and keeps
 * in its own storage, which is enough to count unique visitors without
 * identifying anyone.
 */

function deviceFromUA(ua: string): string {
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobile|android|iphone/i.test(ua)) return 'mobile'
  return 'desktop'
}

function browserFromUA(ua: string): string {
  if (/edg\//i.test(ua)) return 'Edge'
  if (/chrome|crios/i.test(ua)) return 'Chrome'
  if (/firefox|fxios/i.test(ua)) return 'Firefox'
  if (/safari/i.test(ua)) return 'Safari'
  return 'Other'
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))

    const visitorId = typeof body.visitorId === 'string' ? body.visitorId.slice(0, 64) : ''
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.slice(0, 64) : ''
    const path = typeof body.path === 'string' ? body.path.slice(0, 500) : ''

    if (!visitorId || !sessionId || !path) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const ua = req.headers.get('user-agent') || ''
    // Vercel resolves the country at the edge, so we never handle the IP.
    const country = req.headers.get('x-vercel-ip-country') || null
    const device = deviceFromUA(ua)
    const browser = browserFromUA(ua)
    const referrer = typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : null

    // A named event (form submit, CTA click) rather than a page view.
    if (typeof body.event === 'string' && body.event) {
      await db.analyticsEvent.create({
        data: {
          sessionId,
          name: body.event.slice(0, 80),
          path,
          value: typeof body.value === 'number' ? body.value : null,
          meta: typeof body.meta === 'object' ? JSON.stringify(body.meta).slice(0, 2000) : '{}',
        },
      })
      return NextResponse.json({ ok: true })
    }

    await db.pageview.create({
      data: { sessionId, path, referrer, country, device, browser },
    })

    const existing = await db.visitorSession.findUnique({ where: { id: sessionId } })

    if (existing) {
      await db.visitorSession.update({
        where: { id: sessionId },
        data: {
          exitPath: path,
          pageviewCount: { increment: 1 },
          durationSec: Math.max(
            0,
            Math.round((Date.now() - existing.startedAt.getTime()) / 1000)
          ),
          lastSeenAt: new Date(),
        },
      })
    } else {
      await db.visitorSession.create({
        data: {
          id: sessionId,
          visitorId,
          entryPath: path,
          exitPath: path,
          referrer,
          utmSource: typeof body.utmSource === 'string' ? body.utmSource.slice(0, 120) : null,
          utmMedium: typeof body.utmMedium === 'string' ? body.utmMedium.slice(0, 120) : null,
          utmCampaign: typeof body.utmCampaign === 'string' ? body.utmCampaign.slice(0, 120) : null,
          country,
          device,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    // Never let analytics break a page. Swallow and move on.
    console.error('Track failed:', e)
    return NextResponse.json({ ok: false })
  }
}
