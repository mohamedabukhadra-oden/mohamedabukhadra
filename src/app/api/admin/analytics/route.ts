import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAdmin } from '@/lib/auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Traffic dashboard data.
 *
 * GET /api/admin/analytics?days=30
 *
 * Built from the first-party Pageview / VisitorSession / AnalyticsEvent tables,
 * so the numbers are complete rather than whatever survived ad blockers.
 */

export const GET = withAdmin(async (req) => {
  const { searchParams } = new URL(req.url)
  const days = Math.min(Math.max(Number(searchParams.get('days')) || 30, 1), 365)

  const since = new Date()
  since.setDate(since.getDate() - days)
  since.setHours(0, 0, 0, 0)

  // Previous window of equal length, to show whether things are moving.
  const prevSince = new Date(since)
  prevSince.setDate(prevSince.getDate() - days)

  try {
    const [
      pageviews,
      prevPageviews,
      sessions,
      prevSessions,
      topPages,
      topReferrers,
      devices,
      countries,
      events,
      recentSessions,
    ] = await Promise.all([
      db.pageview.count({ where: { createdAt: { gte: since } } }),
      db.pageview.count({ where: { createdAt: { gte: prevSince, lt: since } } }),
      db.visitorSession.findMany({
        where: { startedAt: { gte: since } },
        select: { visitorId: true, pageviewCount: true, durationSec: true },
      }),
      db.visitorSession.count({ where: { startedAt: { gte: prevSince, lt: since } } }),
      db.pageview.groupBy({
        by: ['path'],
        where: { createdAt: { gte: since } },
        _count: { path: true },
        orderBy: { _count: { path: 'desc' } },
        take: 15,
      }),
      db.visitorSession.groupBy({
        by: ['referrer'],
        where: { startedAt: { gte: since }, referrer: { not: null } },
        _count: { referrer: true },
        orderBy: { _count: { referrer: 'desc' } },
        take: 10,
      }),
      db.visitorSession.groupBy({
        by: ['device'],
        where: { startedAt: { gte: since } },
        _count: { device: true },
      }),
      db.visitorSession.groupBy({
        by: ['country'],
        where: { startedAt: { gte: since }, country: { not: null } },
        _count: { country: true },
        orderBy: { _count: { country: 'desc' } },
        take: 10,
      }),
      db.analyticsEvent.groupBy({
        by: ['name'],
        where: { createdAt: { gte: since } },
        _count: { name: true },
        orderBy: { _count: { name: 'desc' } },
        take: 10,
      }),
      db.visitorSession.findMany({
        where: { startedAt: { gte: since } },
        select: { startedAt: true },
        orderBy: { startedAt: 'asc' },
      }),
    ])

    const uniqueVisitors = new Set(sessions.map((s) => s.visitorId)).size
    // A bounce is a session that never got past its entry page.
    const bounced = sessions.filter((s) => s.pageviewCount <= 1).length
    const bounceRate = sessions.length ? Math.round((bounced / sessions.length) * 100) : 0
    const avgDuration = sessions.length
      ? Math.round(sessions.reduce((sum, s) => sum + s.durationSec, 0) / sessions.length)
      : 0

    // Daily series for the chart, zero-filled so gaps render as gaps.
    const byDay = new Map<string, number>()
    for (let i = 0; i < days; i++) {
      const d = new Date(since)
      d.setDate(d.getDate() + i)
      byDay.set(d.toISOString().slice(0, 10), 0)
    }
    for (const s of recentSessions) {
      const key = s.startedAt.toISOString().slice(0, 10)
      if (byDay.has(key)) byDay.set(key, (byDay.get(key) || 0) + 1)
    }

    const pct = (now: number, before: number) =>
      before === 0 ? (now > 0 ? 100 : 0) : Math.round(((now - before) / before) * 100)

    return NextResponse.json({
      range: { days, since: since.toISOString() },
      totals: {
        pageviews,
        uniqueVisitors,
        sessions: sessions.length,
        bounceRate,
        avgDurationSec: avgDuration,
      },
      change: {
        pageviews: pct(pageviews, prevPageviews),
        sessions: pct(sessions.length, prevSessions),
      },
      series: [...byDay.entries()].map(([date, count]) => ({ date, sessions: count })),
      topPages: topPages.map((p) => ({ path: p.path, views: p._count.path })),
      topReferrers: topReferrers.map((r) => ({ referrer: r.referrer, sessions: r._count.referrer })),
      devices: devices.map((d) => ({ device: d.device || 'unknown', sessions: d._count.device })),
      countries: countries.map((c) => ({ country: c.country, sessions: c._count.country })),
      events: events.map((e) => ({ name: e.name, count: e._count.name })),
    })
  } catch (e) {
    console.error('Analytics query failed:', e)
    return NextResponse.json({ error: 'Failed to load analytics.' }, { status: 500 })
  }
})
