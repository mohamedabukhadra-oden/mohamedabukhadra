/**
 * Collects all articles from both legacy sources and writes a single JSON file
 * to src/data/articles-seed.json. The setup API route imports this file.
 *
 * Run: npx tsx scripts/generate-seed-json.ts
 */
import { writeFileSync } from 'fs'
import { join } from 'path'

import { articlesBatch1 } from './legacy-mowebsite/articles-batch1'
import { articlesBatch2 } from './legacy-mowebsite/articles-batch2'
import { articlesBatch3 } from './legacy-mowebsite/articles-batch3'
import { articles as remainingArticlesA } from './legacy-mowebsite/seed-remaining-articles'
import { articles as missingKeywordsA } from './legacy-mowebsite/seed-missing-keywords'
import { missingArticles as missingKeywordsB } from './legacy-mowebsite/seed-missing-keywords-v2'
import { articles as finalKeywords } from './legacy-mowebsite/seed-final-keywords'
import { remainingArticles as remainingKeywords } from './legacy-mowebsite/seed-remaining-keywords'
import { quoteArticles } from './legacy-mowebsite/quote-articles'
import { articles as aiFuture } from './legacy-mowebsite/seed-ai-future'
import { articles as authorBatch3 } from './legacy-mowebsite/seed-author-batch3'
import { articles as authorBatch4 } from './legacy-mowebsite/seed-author-batch4'
import { articles as authorLibrary1 } from './legacy-mowebsite/seed-author-library-batch1'
import { articles as authorLibrary2 } from './legacy-mowebsite/seed-author-library-batch2'
import { articles as backstage } from './legacy-mowebsite/seed-backstage'
import { articles as bookLaunch } from './legacy-mowebsite/seed-book-launch'
import { articles as contrarian } from './legacy-mowebsite/seed-contrarian'
import { articles as culture } from './legacy-mowebsite/seed-culture'
import { articles as dogFacts } from './legacy-mowebsite/seed-dog-facts'
import { articles as dogsHumans } from './legacy-mowebsite/seed-dogs-humans'
import { articles as humanNature } from './legacy-mowebsite/seed-human-nature'

import { articles as personalArticles } from './legacy-personal/seed-articles'
import { articles as personalBusiness } from './legacy-personal/seed-business-articles'
import { articles as personalDrafts } from './legacy-personal/seed-draft-articles'

/* eslint-disable @typescript-eslint/no-explicit-any */

type Normalised = {
  slug: string; title: string; excerpt: string; content: string
  category: string; tags: string; status: string; featured: boolean
  readTime: number; metaDescription: string | null; source: string
}

function slugify(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function readTime(content: string): number {
  return Math.max(1, Math.round(content.trim().split(/\s+/).length / 200))
}

const TOPIC_CATEGORY: Record<string, string> = {
  'dog ownership': 'dogs-family', 'dog behaviour': 'dogs-family', 'puppy care': 'dogs-family',
  'family dogs': 'dogs-family', 'german shepherd': 'dogs-family',
  'business strategy': 'business-strategy', 'ai & technology': 'business-strategy',
  'marketing': 'marketing-growth',
  'writing & publishing': 'writing-publishing', 'book launch': 'writing-publishing',
  'contrarian thinking': 'contrarian-thinking', 'behavioural science': 'contrarian-thinking',
  'life & reflection': 'life-reflection',
  'education': 'behind-the-scenes', 'behind the scenes': 'behind-the-scenes',
}

function categoryFromTopic(topic: string | undefined): string {
  if (!topic) return 'life-reflection'
  return TOPIC_CATEGORY[topic.toLowerCase()] || 'life-reflection'
}

function fromMowebsite(a: any, source: string): Normalised {
  return {
    slug: a.slug || slugify(a.title || ''), title: a.title,
    excerpt: a.excerpt || '', content: a.content,
    category: categoryFromTopic(a.topic),
    tags: a.topic ? String(a.topic) : '',
    status: a.published ? 'PUBLISHED' : 'DRAFT',
    featured: Boolean(a.featured), readTime: readTime(a.content || ''),
    metaDescription: null, source,
  }
}

function fromPersonal(a: any, source: string): Normalised {
  return {
    slug: a.slug, title: a.title, excerpt: a.excerpt || '', content: a.content,
    category: a.category || 'life-reflection', tags: a.tags || '',
    status: a.status || 'DRAFT', featured: Boolean(a.featured),
    readTime: readTime(a.content || ''), metaDescription: a.metaDescription ?? null, source,
  }
}

function collect(): Normalised[] {
  const out: Normalised[] = []
  const mo: [string, any[]][] = [
    ['batch1', articlesBatch1], ['batch2', articlesBatch2], ['batch3', articlesBatch3],
    ['remaining-articles', remainingArticlesA], ['missing-keywords', missingKeywordsA],
    ['missing-keywords-v2', missingKeywordsB], ['final-keywords', finalKeywords],
    ['remaining-keywords', remainingKeywords], ['quote-articles', quoteArticles],
    ['ai-future', aiFuture], ['author-batch3', authorBatch3], ['author-batch4', authorBatch4],
    ['author-library1', authorLibrary1], ['author-library2', authorLibrary2],
    ['backstage', backstage], ['book-launch', bookLaunch], ['contrarian', contrarian],
    ['culture', culture], ['dog-facts', dogFacts], ['dogs-humans', dogsHumans],
    ['human-nature', humanNature],
  ]
  for (const [name, list] of mo) for (const a of list) out.push(fromMowebsite(a, `mowebsite/${name}`))
  const pe: [string, any[]][] = [['articles', personalArticles], ['business', personalBusiness], ['drafts', personalDrafts]]
  for (const [name, list] of pe) for (const a of list) out.push(fromPersonal(a, `personal/${name}`))
  return out
}

function dedupe(all: Normalised[]): Normalised[] {
  const bySlug = new Map<string, Normalised>()
  for (const a of all) {
    if (!a.slug || !a.title || !a.content) continue
    const existing = bySlug.get(a.slug)
    if (!existing) { bySlug.set(a.slug, a); continue }
    if (a.source.startsWith('personal/') && !existing.source.startsWith('personal/')) {
      bySlug.set(a.slug, a)
    }
  }
  return [...bySlug.values()]
}

// Run
const all = collect()
const kept = dedupe(all)
const outPath = join(__dirname, '..', 'src', 'data', 'articles-seed.json')
writeFileSync(outPath, JSON.stringify(kept, null, 2), 'utf-8')
console.log(`Wrote ${kept.length} articles to ${outPath} (${(JSON.stringify(kept).length / 1024 / 1024).toFixed(1)} MB)`)
