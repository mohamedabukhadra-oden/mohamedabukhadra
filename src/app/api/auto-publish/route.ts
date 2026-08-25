import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendBatch, emailConfigured } from '@/lib/email'
import { newsletterHtml } from '@/lib/newsletter-template'

export const runtime = 'nodejs'
// Never cache a cron endpoint.
export const dynamic = 'force-dynamic'

/**
 * GET /api/auto-publish — the daily publishing run.
 *
 * Triggered by Vercel Cron (see vercel.json). Publishes the next queued draft,
 * pushes it to social via the Make.com webhook, and emails it to the newsletter
 * list. Every run is recorded in PublishLog.
 *
 * The article URL is the important detail. The previous implementation built it
 * as `${siteBaseUrl}/#${slug}` — a fragment. Search engines discard everything
 * after "#", so every social post and every sitemap entry collapsed onto the
 * homepage: the automation ran daily and compounded nothing. It now points at
 * the real route, /insights/<slug>.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET || ''
  const auth = req.headers.get('authorization') || ''
  const provided = auth.startsWith('Bearer ') ? auth.slice(7) : ''

  // Vercel Cron sends the CRON_SECRET as a Bearer token. Refuse to run
  // unprotected: this endpoint mutates content and sends mail.
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET is not configured.' }, { status: 500 })
  }
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let config = await db.autoPublishConfig.findFirst()
    if (!config) config = await db.autoPublishConfig.create({ data: {} })

    if (!config.enabled) {
      return NextResponse.json({ status: 'paused', message: 'Auto-publish is paused.' })
    }

    // Daily quota — count only successful runs today.
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const publishedToday = await db.publishLog.count({
      where: { publishedAt: { gte: todayStart }, error: null },
    })

    if (publishedToday >= config.postsPerDay) {
      return NextResponse.json({
        status: 'quota_reached',
        message: `Already published ${publishedToday}/${config.postsPerDay} today.`,
      })
    }

    // Oldest draft first, so the queue drains in the order it was written.
    const article = await db.article.findFirst({
      where: { status: 'DRAFT' },
      orderBy: { createdAt: 'asc' },
    })

    if (!article) {
      return NextResponse.json({ status: 'no_articles', message: 'No drafts remaining.' })
    }

    const siteUrl = (config.siteBaseUrl || process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
    const articleUrl = `${siteUrl}/insights/${article.slug}`

    // ─── Publish ───────────────────────────────────────────────
    await db.article.update({
      where: { id: article.id },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    })

    const excerpt =
      article.excerpt?.trim() ||
      article.content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').slice(0, 160) + '…'

    let error: string | null = null

    // ─── Social distribution via Make.com ──────────────────────
    let webhookSent = false
    let webhookStatus: number | null = null
    let webhookResponse: string | null = null

    if (config.makeWebhookUrl) {
      const socialPost = `${article.title}\n\n${excerpt.slice(0, 200)}\n\nRead more: ${articleUrl}${
        config.hashtagSuffix ? ` ${config.hashtagSuffix}` : ''
      }`

      try {
        const res = await fetch(config.makeWebhookUrl, {
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
        if (!res.ok) error = `Webhook returned ${res.status}`
      } catch (e) {
        error = e instanceof Error ? e.message : 'Webhook failed'
      }
    }

    // ─── Newsletter ────────────────────────────────────────────
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

    // ─── Record the run ────────────────────────────────────────
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
        triggeredBy: 'cron',
      },
    })

    await db.autoPublishConfig.update({
      where: { id: config.id },
      data: { lastRunAt: new Date() },
    })

    return NextResponse.json({
      status: 'published',
      article: { title: article.title, slug: article.slug, url: articleUrl },
      webhookSent,
      emailsSent,
      error,
    })
  } catch (e) {
    console.error('Auto-publish failed:', e)
    return NextResponse.json({ error: 'Auto-publish failed.' }, { status: 500 })
  }
}
