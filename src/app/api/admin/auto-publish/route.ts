import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { withAdmin } from '@/lib/auth'
import { getConfig, runAutoPublish } from '@/lib/auto-publish'
import { emailConfigured } from '@/lib/email'

export const runtime = 'nodejs'

/**
 * Auto-publish control panel API.
 *
 * GET  — current settings, queue depth, recent runs, and which integrations are
 *        actually configured (so the UI can say "social posting is off because
 *        no webhook is set" rather than silently doing nothing).
 * PUT  — update settings.
 * POST — publish the next draft immediately.
 */

export const GET = withAdmin(async () => {
  const [config, draftCount, publishedCount, recentRuns] = await Promise.all([
    getConfig(),
    db.article.count({ where: { status: 'DRAFT' } }),
    db.article.count({ where: { status: 'PUBLISHED' } }),
    db.publishLog.findMany({ orderBy: { publishedAt: 'desc' }, take: 25 }),
  ])

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const publishedToday = await db.publishLog.count({
    where: { publishedAt: { gte: todayStart }, error: null },
  })

  // How long the queue lasts at the current rate — the number that tells you
  // whether you need to write more.
  const daysOfRunway = config.postsPerDay > 0 ? Math.floor(draftCount / config.postsPerDay) : null

  return NextResponse.json({
    config,
    stats: { draftCount, publishedCount, publishedToday, daysOfRunway },
    integrations: {
      socialConfigured: Boolean(config.makeWebhookUrl || process.env.MAKE_WEBHOOK_URL),
      emailConfigured: emailConfigured(),
      cronSecretSet: Boolean(process.env.CRON_SECRET),
    },
    recentRuns,
  })
})

export const PUT = withAdmin(async (req) => {
  const body = await req.json().catch(() => ({}))
  const config = await getConfig()

  const postsPerDay = Number(body.postsPerDay)

  const data = {
    enabled: typeof body.enabled === 'boolean' ? body.enabled : config.enabled,
    postsPerDay:
      Number.isFinite(postsPerDay) && postsPerDay >= 0 && postsPerDay <= 24
        ? Math.floor(postsPerDay)
        : config.postsPerDay,
    makeWebhookUrl: typeof body.makeWebhookUrl === 'string' ? body.makeWebhookUrl.trim() : config.makeWebhookUrl,
    siteBaseUrl: typeof body.siteBaseUrl === 'string' ? body.siteBaseUrl.trim().replace(/\/$/, '') : config.siteBaseUrl,
    hashtagSuffix: typeof body.hashtagSuffix === 'string' ? body.hashtagSuffix.trim() : config.hashtagSuffix,
    notifySubscribers:
      typeof body.notifySubscribers === 'boolean' ? body.notifySubscribers : config.notifySubscribers,
  }

  const updated = await db.autoPublishConfig.update({ where: { id: config.id }, data })
  return NextResponse.json({ config: updated })
})

/** POST — "Publish next now". Bypasses the pause flag and the daily quota. */
export const POST = withAdmin(async () => {
  try {
    const outcome = await runAutoPublish({ triggeredBy: 'manual' })
    return NextResponse.json(outcome)
  } catch (e) {
    console.error('Manual publish failed:', e)
    return NextResponse.json({ error: 'Publish failed.' }, { status: 500 })
  }
})
