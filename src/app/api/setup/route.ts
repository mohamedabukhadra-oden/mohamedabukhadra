/**
 * ONE-TIME database setup route.
 *
 * POST /api/setup → pushes schema, seeds ~440 articles, creates admin.
 * GET  /api/setup → returns current DB state.
 *
 * ⚠️  DELETE THIS FILE + src/data/articles-seed.json after first successful run.
 *
 * Why an API route? The Vercel token can't read stored secrets (DATABASE_URL lives
 * in an integration store). Running inside Vercel is the only way to get full env
 * access for prisma db push + seed operations.
 */
import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import seedArticles from '@/data/articles-seed.json'

type SeedArticle = {
  slug: string; title: string; excerpt: string; content: string
  category: string; tags: string; status: string; featured: boolean
  readTime: number; metaDescription: string | null; source: string
}

const articles: SeedArticle[] = seedArticles

// ──── SQL: CREATE TABLE IF NOT EXISTS for every model in schema.prisma ────

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "AdminSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AdminSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE IF NOT EXISTS "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'life-reflection',
    "tags" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "readTime" INTEGER NOT NULL DEFAULT 0,
    "coverImage" TEXT,
    "ogImage" TEXT,
    "metaDescription" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "proposition" TEXT NOT NULL DEFAULT '',
    "whyExists" TEXT NOT NULL DEFAULT '',
    "whoFor" TEXT NOT NULL DEFAULT '',
    "coreIdeas" TEXT NOT NULL DEFAULT '',
    "whatReaderLearns" TEXT NOT NULL DEFAULT '',
    "keyFrameworks" TEXT NOT NULL DEFAULT '',
    "excerpts" TEXT NOT NULL DEFAULT '',
    "coverImage" TEXT,
    "buyLink" TEXT,
    "themeColors" TEXT NOT NULL DEFAULT '{}',
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "SpeakingEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "audience" TEXT,
    "location" TEXT,
    "date" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "videoLink" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "TeachingEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "institution" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "level" TEXT,
    "description" TEXT NOT NULL,
    "period" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "ConsultingHighlight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "client" TEXT,
    "description" TEXT NOT NULL,
    "recognition" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Venture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "description" TEXT NOT NULL,
    "role" TEXT,
    "website" TEXT,
    "logoUrl" TEXT,
    "current" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Recognition" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "organization" TEXT,
    "year" TEXT,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "AutoPublishConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "postsPerDay" INTEGER NOT NULL DEFAULT 2,
    "makeWebhookUrl" TEXT NOT NULL DEFAULT '',
    "siteBaseUrl" TEXT NOT NULL DEFAULT 'https://mohamedabukhadra.com',
    "hashtagSuffix" TEXT NOT NULL DEFAULT '',
    "notifySubscribers" BOOLEAN NOT NULL DEFAULT true,
    "lastRunAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "PublishLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "articleId" TEXT NOT NULL,
    "articleTitle" TEXT NOT NULL,
    "articleSlug" TEXT NOT NULL,
    "articleCategory" TEXT NOT NULL DEFAULT '',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "webhookSent" BOOLEAN NOT NULL DEFAULT false,
    "webhookStatus" INTEGER,
    "webhookResponse" TEXT,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "error" TEXT,
    "triggeredBy" TEXT NOT NULL DEFAULT 'cron'
);
CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "source" TEXT NOT NULL DEFAULT 'site',
    "unsubToken" TEXT NOT NULL,
    "confirmedAt" TIMESTAMP(3),
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "type" TEXT NOT NULL DEFAULT 'contact',
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "attribution" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "SeoMeta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ogImage" TEXT,
    "keywords" TEXT,
    "jsonLd" TEXT,
    "noIndex" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Redirect" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fromPath" TEXT NOT NULL,
    "toPath" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 301,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Pageview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "country" TEXT,
    "device" TEXT,
    "browser" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "VisitorSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "visitorId" TEXT NOT NULL,
    "entryPath" TEXT NOT NULL,
    "exitPath" TEXT,
    "referrer" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "pageviewCount" INTEGER NOT NULL DEFAULT 1,
    "durationSec" INTEGER NOT NULL DEFAULT 0,
    "country" TEXT,
    "device" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "AnalyticsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT,
    "name" TEXT NOT NULL,
    "path" TEXT,
    "value" DOUBLE PRECISION,
    "meta" TEXT NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Testimonial" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "author" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "Faq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL DEFAULT 'General',
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "MediaFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "mime" TEXT NOT NULL DEFAULT '',
    "size" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Unique constraints (safe to run twice)
DO $$ BEGIN ALTER TABLE "AdminUser" ADD CONSTRAINT "AdminUser_email_key" UNIQUE ("email"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "AdminSession" ADD CONSTRAINT "AdminSession_token_key" UNIQUE ("token"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Article" ADD CONSTRAINT "Article_slug_key" UNIQUE ("slug"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Book" ADD CONSTRAINT "Book_slug_key" UNIQUE ("slug"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "SiteSetting" ADD CONSTRAINT "SiteSetting_key_key" UNIQUE ("key"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "NewsletterSubscriber" ADD CONSTRAINT "NewsletterSubscriber_email_key" UNIQUE ("email"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "NewsletterSubscriber" ADD CONSTRAINT "NewsletterSubscriber_unsubToken_key" UNIQUE ("unsubToken"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "SeoMeta" ADD CONSTRAINT "SeoMeta_path_key" UNIQUE ("path"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "Redirect" ADD CONSTRAINT "Redirect_fromPath_key" UNIQUE ("fromPath"); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS "AdminSession_userId_idx" ON "AdminSession"("userId");
CREATE INDEX IF NOT EXISTS "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");
CREATE INDEX IF NOT EXISTS "Article_status_publishedAt_idx" ON "Article"("status", "publishedAt");
CREATE INDEX IF NOT EXISTS "Article_category_idx" ON "Article"("category");
CREATE INDEX IF NOT EXISTS "PublishLog_publishedAt_idx" ON "PublishLog"("publishedAt");
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_active_idx" ON "NewsletterSubscriber"("active");
CREATE INDEX IF NOT EXISTS "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
CREATE INDEX IF NOT EXISTS "Pageview_createdAt_idx" ON "Pageview"("createdAt");
CREATE INDEX IF NOT EXISTS "Pageview_path_idx" ON "Pageview"("path");
CREATE INDEX IF NOT EXISTS "Pageview_sessionId_idx" ON "Pageview"("sessionId");
CREATE INDEX IF NOT EXISTS "VisitorSession_startedAt_idx" ON "VisitorSession"("startedAt");
CREATE INDEX IF NOT EXISTS "VisitorSession_visitorId_idx" ON "VisitorSession"("visitorId");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_name_createdAt_idx" ON "AnalyticsEvent"("name", "createdAt");
CREATE INDEX IF NOT EXISTS "Redirect_enabled_idx" ON "Redirect"("enabled");
`

export async function GET() {
  const prisma = new PrismaClient()
  try {
    const [articleCount, publishedCount, adminCount] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: 'PUBLISHED' } }),
      prisma.adminUser.count(),
    ])
    return NextResponse.json({
      database: 'connected',
      articles: { total: articleCount, published: publishedCount, draft: articleCount - publishedCount },
      admin: adminCount > 0 ? 'exists' : 'not seeded',
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    return NextResponse.json({ database: 'error', message: msg }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

export async function POST() {
  const prisma = new PrismaClient()
  const log: string[] = []
  const t0 = Date.now()

  try {
    // ── Step 1: Push schema ──
    log.push('Step 1: Pushing schema...')
    const statements = SCHEMA_SQL.split(';').map(s => s.trim()).filter(Boolean)
    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql)
    }
    log.push(`  Tables created (${statements.length} SQL statements)`)

    // ── Step 2: Seed articles ──
    log.push(`Step 2: Seeding ${articles.length} articles...`)
    let created = 0
    let updated = 0
    const BATCH = 20
    for (let i = 0; i < articles.length; i += BATCH) {
      const batch = articles.slice(i, i + BATCH)
      for (const a of batch) {
        const data = {
          title: a.title, excerpt: a.excerpt, content: a.content,
          category: a.category, tags: a.tags, status: a.status,
          featured: a.featured, readTime: a.readTime,
          metaDescription: a.metaDescription,
          publishedAt: a.status === 'PUBLISHED' ? new Date() : null,
        }
        try {
          const exists = await prisma.article.findUnique({ where: { slug: a.slug } })
          if (exists) {
            await prisma.article.update({ where: { slug: a.slug }, data })
            updated++
          } else {
            await prisma.article.create({ data: { ...data, slug: a.slug } })
            created++
          }
        } catch (_e: unknown) {
          updated++ // skip duplicates
        }
      }
    }
    log.push(`  Articles: created ${created}, updated ${updated}`)

    // ── Step 3: Seed admin ──
    log.push('Step 3: Creating admin...')
    const adminEmail = process.env.ADMIN_EMAIL || 'mohamed@abukhadra.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'ChangeMe-On-First-Login-2024!'
    const adminName = process.env.ADMIN_NAME || 'Mohamed Abu Khadra'
    const hash = await bcrypt.hash(adminPassword, 12)
    const admin = await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash: hash, name: adminName },
      create: { email: adminEmail, passwordHash: hash, name: adminName, role: 'admin' },
    })
    await prisma.adminSession.deleteMany({ where: { userId: admin.id } })
    log.push(`  Admin: ${admin.email}`)

    // ── Summary ──
    const total = await prisma.article.count()
    const published = await prisma.article.count({ where: { status: 'PUBLISHED' } })
    const sec = ((Date.now() - t0) / 1000).toFixed(1)
    log.push(`Done in ${sec}s — ${total} articles (${published} published, ${total - published} draft)`)
    log.push('NEXT: Delete src/app/api/setup/route.ts and redeploy!')

    return NextResponse.json({
      success: true,
      articles: { total, published, draft: total - published },
      admin: { email: admin.email },
      elapsed: `${sec}s`,
      log,
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e)
    log.push(`FATAL: ${msg}`)
    return NextResponse.json({ success: false, log, error: msg }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
