import { db } from '@/lib/db'
import { sendBatch, emailConfigured } from '@/lib/email'
import { newsletterHtml } from '@/lib/newsletter-template'
import { SITE_URL } from '@/lib/seo'

/**
 * The publishing run, shared by the cron route and the admin's "Publish next now"
 * button so both behave identically.
 */

export type PublishOutcome =
  | { status: 'paused' | 'quota_reached' | 'no_articles'; message: string }
  | {
      status: 'published'
      message: string
      article: { id: string; title: string; slug: string; url: string }
      webhookSent: boolean
      emailsSent: number
      error: string | null
    }

export async function getConfig() {
  const existing = await db.autoPublishConfig.findFirst()
  return existing ?? (await db.autoPublishConfig.create({ data: {} }))
}

export async function runAutoPublish(
  opts: { triggeredBy: 'cron' | 'manual'; ignoreQuota?: boolean } = { triggeredBy: 'cron' }
): Promise<PublishOutcome> {
  const config = await getConfig()

  // A manual run from the admin is an explicit instruction, so it bypasses the
  // paused flag and the daily quota. The cron respects both.
  const manual = opts.triggeredBy === 'manual'

  if (!config.enabled && !manual) {
    return { status: 'paused', message: 'Auto-publish is paused.' }
  }

  if (!manual && !opts.ignoreQuota) {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const publishedToday = await db.publishLog.count({
      where: { publishedAt: { gte: todayStart }, error: null },
    })
    if (publishedToday >= config.postsPerDay) {
      return {
        status: 'quota_reached',
        message: `Already published ${publishedToday} of ${config.postsPerDay} today.`,
      }
    }
  }

  const article = await db.article.findFirst({
    where: { status: 'DRAFT' },
    orderBy: { createdAt: 'asc' },
  })

  if (!article) {
    return { status: 'no_articles', message: 'No drafts left in the queue.' }
  }

  // config.siteBaseUrl (set from /admin/publishing) wins when configured; it
  // falls back to the same SITE_URL every other page uses rather than the raw
  // env var, which production had set to the apex domain — the same domain
  // split that broke canonical tags across /insights is possible here too if
  // the admin's Site Base URL field is ever left blank.
  const siteUrl = (config.siteBaseUrl || SITE_URL).replace(/\/$/, '')
  // A real route, not a "/#slug" fragment — fragments are discarded by search
  // engines, so the old form sent every post to the same homepage anchor.
  const articleUrl = `${siteUrl}/insights/${article.slug}`

  await db.article.update({
    where: { id: article.id },
    data: { status: 'PUBLISHED', publishedAt: new Date() },
  })

  const excerpt =
    article.excerpt?.trim() ||
    article.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').slice(0, 160) + '…'

  let error: string | null = null

  // ─── Social ───────────────────────────────────────────────
  let webhookSent = false
  let webhookStatus: number | null = null
  let webhookResponse: string | null = null

  const webhookUrl = config.makeWebhookUrl || process.env.MAKE_WEBHOOK_URL || ''

  if (webhookUrl) {
    const socialPost = `${article.title}\n\n${excerpt.slice(0, 200)}\n\nRead more: ${articleUrl}${
      config.hashtagSuffix ? ` ${config.hashtagSuffix}` : ''
    }`
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          articleId: article.id,
          title: article.title,
          slug: article.slug,
          category: article.category,
          excerpt: excerpt.slice(0, 300),
          url: articleUrl,
          socialPost,
          hashtags: config.hashtagSuffix,
          publishedAt: new Date().toISOString(),
        }),
      })
      webhookStatus = res.status
      webhookResponse = res.statusText
      webhookSent = res.ok
      if (!res.ok) error = `Social webhook returned ${res.status}`
    } catch (e) {
      error = e instanceof Error ? e.message : 'Social webhook failed'
    }
  }

  // ─── Newsletter ───────────────────────────────────────────
  let emailsSent = 0

  if (config.notifySubscribers && emailConfigured()) {
    const subscribers = await db.newsletterSubscriber.findMany({
      where: { active: true },
      select: { email: true, name: true, unsubToken: true },
    })

    if (subscribers.length > 0) {
      const result = await sendBatch(
        subscribers.map((s) => ({
          email: s.email,
          subject: article.title,
          html: newsletterHtml({
            title: article.title,
            excerpt,
            url: articleUrl,
            recipientName: s.name,
            unsubscribeUrl: `${siteUrl}/unsubscribe?token=${s.unsubToken}`,
          }),
        }))
      )
      emailsSent = result.sent
      if (result.failed > 0 && !error) {
        error = `${result.failed} newsletter send(s) failed: ${result.errors[0] ?? 'unknown'}`
      }
    }
  }

  await db.publishLog.create({
    data: {
      articleId: article.id,
      articleTitle: article.title,
      articleSlug: article.slug,
      articleCategory: article.category,
      webhookSent,
      webhookStatus,
      webhookResponse,
      emailsSent,
      error,
      triggeredBy: opts.triggeredBy,
    },
  })

  await db.autoPublishConfig.update({
    where: { id: config.id },
    data: { lastRunAt: new Date() },
  })

  return {
    status: 'published',
    message: `Published "${article.title}".`,
    article: { id: article.id, title: article.title, slug: article.slug, url: articleUrl },
    webhookSent,
    emailsSent,
    error,
  }
}
