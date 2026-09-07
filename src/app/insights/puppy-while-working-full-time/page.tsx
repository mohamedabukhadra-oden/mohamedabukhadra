import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { StaticArticle, getMoreArticles } from '@/components/static-article'

const ARTICLE = {
  slug: 'puppy-while-working-full-time',
  title: 'Can You Get a Puppy If You Work Full-Time? The Honest Answer',
  excerpt:
    "The internet says it's impossible. It isn't — but it does require a system most families skip, and being honest about what a puppy alone in the house for eight hours actually needs.",
  metaDescription:
    "Can you get a puppy while working full-time? The honest breakdown of what it actually takes to make it work.",
  category: 'dogs-family',
  publishedAt: '2026-09-08T00:00:00.000Z',
  content: `## The Question Behind the Question

Most families searching "can you get a puppy if you work full-time" aren't really asking a yes-or-no question. They're asking whether they're about to make a mistake.

The honest answer is: yes, you can — but not with the schedule you have today. You need a system for the hours nobody is home, and most families haven't built one before the puppy arrives. That's the actual gap, not the job.

## What a Puppy Cannot Do

A puppy under six months old cannot hold his bladder for eight hours. He is not being difficult — he is physically incapable of it. Left alone for a full workday, he will have an accident, and depending on the age, he may also develop real anxiety about being left at all.

This is the part that gets skipped in the excitement of picking a puppy: the math of "we're out from 8 to 6" against "he needs a break every 2-4 hours" simply does not work without a plan.

## The System That Actually Closes the Gap

### 1. Someone Home for the First Weeks
Whether that's parental leave, a flexible schedule, or a family member, the first two to four weeks need a person physically present for most of the day. This is when house training and separation tolerance are built — or aren't.

### 2. A Midday Break, Every Day
This is non-negotiable, not a nice-to-have:
- A dog walker
- A doggy daycare
- A neighbour, relative, or friend on a fixed schedule
- A partner or family member who works from home part of the week

### 3. A Real Morning and Evening Routine
The hours before and after work matter more with a full-time job, not less. A tired, exercised puppy handles a quiet house better than one who's been saving up energy all day.

### 4. Crate or Safe-Zone Training, Done Properly
Not as a way to "store" him — as a way to give him a space where being alone doesn't mean being unsafe or unsupervised near hazards.

### 5. A Backup Plan
What happens when the walker cancels, or work runs late? Families that haven't answered this find out on the worst possible day.

## What Doesn't Work

Adopting the puppy on a Friday and hoping the weekend is enough preparation. Assuming the kids will "check on him" after school. Believing that love and good intentions will cover a structural gap in the day. None of these are systems — they're hopes, and puppies don't respond well to hopes.

## The Question to Actually Ask

Not "do we work full-time" — most families do, and most families with dogs work full-time too.

Ask instead: "Have we actually built the midday coverage, or are we assuming it'll sort itself out?"

If the honest answer is that nothing is arranged yet, that's not a reason to give up on the idea. It's the one thing to solve before the puppy comes home, not after.

System first. Puppy second. Family always.`,
  readTime: 4,
}

export const metadata: Metadata = {
  title: `${ARTICLE.title} — Mohamed Abu Khadra`,
  description: ARTICLE.metaDescription,
  alternates: { canonical: `${SITE_URL}/insights/${ARTICLE.slug}` },
  openGraph: {
    type: 'article',
    title: ARTICLE.title,
    description: ARTICLE.metaDescription,
    url: `${SITE_URL}/insights/${ARTICLE.slug}`,
    publishedTime: ARTICLE.publishedAt,
    images: `${SITE_URL}/book-one-cover.jpg`,
  },
  twitter: {
    card: 'summary_large_image',
    title: ARTICLE.title,
    description: ARTICLE.metaDescription,
    images: [`${SITE_URL}/book-one-cover.jpg`],
  },
}

export default async function Page() {
  const moreArticles = await getMoreArticles(ARTICLE.slug)
  const url = `${SITE_URL}/insights/${ARTICLE.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: ARTICLE.title,
    description: ARTICLE.metaDescription,
    datePublished: ARTICLE.publishedAt,
    dateModified: ARTICLE.publishedAt,
    author: { '@type': 'Person', name: 'Mohamed Abu Khadra', url: SITE_URL },
    publisher: { '@type': 'Person', name: 'Mohamed Abu Khadra', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: `${SITE_URL}/book-one-cover.jpg`,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StaticArticle
        title={ARTICLE.title}
        category={ARTICLE.category}
        publishedAt={ARTICLE.publishedAt}
        readTime={ARTICLE.readTime}
        excerpt={ARTICLE.excerpt}
        content={ARTICLE.content}
        moreArticles={moreArticles}
      />
    </>
  )
}
