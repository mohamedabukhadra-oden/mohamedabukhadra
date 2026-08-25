/**
 * Merges the article stock from both personal-site repos into one database.
 *
 *   npx tsx scripts/merge-articles.ts          # dry run — reports, writes nothing
 *   npx tsx scripts/merge-articles.ts --write  # upserts into the database
 *
 * Sources:
 *   scripts/legacy-mowebsite/  — ~163 articles from the Mowebsite build
 *   scripts/legacy-personal/   —   33 articles from this repo's own seeds
 *
 * The two repos used different Article shapes. Mowebsite had {topic, published};
 * this repo had {category, status, tags, metaDescription}. Everything is
 * normalised onto the merged schema here.
 *
 * Articles arrive as DRAFT by default. That is deliberate: the auto-publish cron
 * works through the draft queue, releasing a couple per day. Importing them all
 * as PUBLISHED would dump ~200 pages on Google at once, which reads as bulk
 * low-quality publishing and is a good way to earn a manual action.
 */
import { PrismaClient } from '@prisma/client'

import { articlesBatch1 } from './legacy-mowebsite/articles-batch1'
import { articlesBatch2 } from './legacy-mowebsite/articles-batch2'
import { articlesBatch3 } from './legacy-mowebsite/articles-batch3'
import { articles as remainingArticlesA } from './legacy-mowebsite/seed-remaining-articles'
import { articles as missingKeywordsA } from './legacy-mowebsite/seed-missing-keywords'
import { missingArticles as missingKeywordsB } from './legacy-mowebsite/seed-missing-keywords-v2'
import { articles as finalKeywords } from './legacy-mowebsite/seed-final-keywords'
import { remainingArticles as remainingKeywords } from './legacy-mowebsite/seed-remaining-keywords'
import { quoteArticles } from './legacy-mowebsite/quote-articles'

import { articles as personalArticles } from './legacy-personal/seed-articles'
import { articles as personalBusiness } from './legacy-personal/seed-business-articles'
import { articles as personalDrafts } from './legacy-personal/seed-draft-articles'

const db = new PrismaClient()

type Normalised = {
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string
  status: string
  featured: boolean
  readTime: number
  metaDescription: string | null
  source: string
}

/** Rough reading time — 200 wpm, floor of 1 minute. */
function readTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

/**
 * Mowebsite tagged articles with a free-text `topic`. The merged site uses three
 * fixed categories, so topics are bucketed by keyword. Anything unrecognised
 * falls to family-systems, which is where the dog/family book material belongs.
 */
function categoryFromTopic(topic: string | undefined): string {
  const t = (topic || '').toLowerCase()
  if (/(marketing|growth|brand|seo|audience|content)/.test(t)) return 'marketing-growth'
  if (/(business|strategy|leadership|management|venture|consult|ai)/.test(t)) return 'business-strategy'
  return 'family-systems'
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function fromMowebsite(a: any, source: string): Normalised {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || '',
    content: a.content,
    category: categoryFromTopic(a.topic),
    tags: a.topic ? String(a.topic) : '',
    // published:true in the source means it was live on the old site, so it
    // stays published. Everything else joins the draft queue.
    status: a.published ? 'PUBLISHED' : 'DRAFT',
    featured: Boolean(a.featured),
    readTime: readTime(a.content || ''),
    metaDescription: null,
    source,
  }
}

function fromPersonal(a: any, source: string): Normalised {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt || '',
    content: a.content,
    category: a.category || 'family-systems',
    tags: a.tags || '',
    status: a.status || 'DRAFT',
    featured: Boolean(a.featured),
    readTime: readTime(a.content || ''),
    metaDescription: a.metaDescription ?? null,
    source,
  }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

function collect(): Normalised[] {
  const out: Normalised[] = []

  const mowebsite: [string, any[]][] = [
    ['batch1', articlesBatch1],
    ['batch2', articlesBatch2],
    ['batch3', articlesBatch3],
    ['remaining-articles', remainingArticlesA],
    ['missing-keywords', missingKeywordsA],
    ['missing-keywords-v2', missingKeywordsB],
    ['final-keywords', finalKeywords],
    ['remaining-keywords', remainingKeywords],
    ['quote-articles', quoteArticles],
  ]
  for (const [name, list] of mowebsite) {
    for (const a of list) out.push(fromMowebsite(a, `mowebsite/${name}`))
  }

  const personal: [string, any[]][] = [
    ['articles', personalArticles],
    ['business', personalBusiness],
    ['drafts', personalDrafts],
  ]
  for (const [name, list] of personal) {
    for (const a of list) out.push(fromPersonal(a, `personal/${name}`))
  }

  return out
}

/**
 * Deduplicate by slug. This repo's own articles win over Mowebsite's, because
 * they carry the editorial fields (tags, metaDescription) that the merged schema
 * wants and Mowebsite's shape simply didn't have.
 */
function dedupe(all: Normalised[]): { kept: Normalised[]; dropped: Normalised[] } {
  const bySlug = new Map<string, Normalised>()
  const dropped: Normalised[] = []

  for (const a of all) {
    if (!a.slug || !a.title || !a.content) {
      dropped.push(a)
      continue
    }
    const existing = bySlug.get(a.slug)
    if (!existing) {
      bySlug.set(a.slug, a)
      continue
    }
    const incomingIsPersonal = a.source.startsWith('personal/')
    const existingIsPersonal = existing.source.startsWith('personal/')
    if (incomingIsPersonal && !existingIsPersonal) {
      bySlug.set(a.slug, a)
      dropped.push(existing)
    } else {
      dropped.push(a)
    }
  }

  return { kept: [...bySlug.values()], dropped }
}

async function main() {
  const write = process.argv.includes('--write')

  const all = collect()
  const { kept, dropped } = dedupe(all)

  console.log(`Collected  : ${all.length}`)
  console.log(`Unique     : ${kept.length}`)
  console.log(`Duplicates : ${dropped.length}`)
  console.log()

  const byCategory = kept.reduce<Record<string, number>>((acc, a) => {
    acc[a.category] = (acc[a.category] || 0) + 1
    return acc
  }, {})
  const byStatus = kept.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1
    return acc
  }, {})
  console.log('By category:', byCategory)
  console.log('By status  :', byStatus)

  if (dropped.length) {
    console.log('\nDropped (duplicate slug or missing required field):')
    for (const d of dropped.slice(0, 20)) console.log(`  ${d.source.padEnd(28)} ${d.slug || '(no slug)'}`)
    if (dropped.length > 20) console.log(`  … and ${dropped.length - 20} more`)
  }

  if (!write) {
    console.log('\nDry run — nothing written. Re-run with --write to apply.')
    return
  }

  let created = 0
  let updated = 0
  for (const a of kept) {
    const data = {
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      category: a.category,
      tags: a.tags,
      status: a.status,
      featured: a.featured,
      readTime: a.readTime,
      metaDescription: a.metaDescription,
      publishedAt: a.status === 'PUBLISHED' ? new Date() : null,
    }

    const existing = await db.article.findUnique({ where: { slug: a.slug } })
    if (existing) {
      await db.article.update({ where: { slug: a.slug }, data })
      updated++
    } else {
      await db.article.create({ data: { ...data, slug: a.slug } })
      created++
    }
  }

  console.log(`\nDone. Created ${created}, updated ${updated}.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => db.$disconnect())
