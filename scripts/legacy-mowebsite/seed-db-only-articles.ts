// @ts-nocheck
/**
 * seed-db-only-articles.ts
 *
 * IMPORTANT: This file is intentionally empty.
 *
 * Analysis result: all 368 articles from the Mowebsite database export
 * (/tmp/mowebsite-all-articles.json) are ALREADY covered by existing seed
 * files in this directory.
 *
 * The original count of "86 missing" articles was produced by a flawed
 * comparison that used a naive regex (title: '([^']+)') which failed to
 * match:
 *   1. Double-quoted titles (e.g., title: "Why I Don't Want to Be a Thought Leader")
 *   2. Single-quoted titles containing escaped apostrophes
 *      (e.g., title: 'Why Protecting the Primary Caregiver\'s Comfort...')
 *   3. Single-quoted titles containing escaped double quotes
 *      (e.g., title: 'The Puppy Readiness Test: Why \"Not Yet\" Is...')
 *
 * A proper character-by-character string parser confirms 0 missing articles.
 * Breakdown by seed file:
 *   articles-batch1.ts       50 articles
 *   articles-batch2.ts       50 articles
 *   articles-batch3.ts        2 articles
 *   quote-articles.ts        10 articles
 *   seed-ai-future.ts        15 articles
 *   seed-author-batch3.ts    25 articles
 *   seed-author-batch4.ts    25 articles
 *   seed-author-library-batch1.ts  25 articles
 *   seed-author-library-batch2.ts  25 articles
 *   seed-backstage.ts        20 articles
 *   seed-book-launch.ts      15 articles
 *   seed-contrarian.ts       15 articles
 *   seed-culture.ts          15 articles
 *   seed-dog-facts.ts        30 articles
 *   seed-dogs-humans.ts      25 articles
 *   seed-final-keywords.ts    7 articles
 *   seed-human-nature.ts     25 articles
 *   seed-missing-keywords-v2.ts  6 articles
 *   seed-missing-keywords.ts   7 articles
 *   seed-remaining-articles.ts  20 articles
 *   seed-remaining-keywords.ts  3 articles
 *   TOTAL: 415 title entries, 368 unique DB matches, 42 SEO-rewrite titles
 *          (articles created for the new site that don't correspond to Mowebsite originals)
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// No articles needed — all 368 Mowebsite DB articles are already seeded.
export const articles: Array<{
  title: string;
  topic: string;
  excerpt: string;
  content: string;
  slug: string;
}> = [];
