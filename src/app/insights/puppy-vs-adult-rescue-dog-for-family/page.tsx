import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { StaticArticle, getMoreArticles } from '@/components/static-article'

const ARTICLE = {
  slug: 'puppy-vs-adult-rescue-dog-for-family',
  title: 'Puppy or Rescue Adult Dog: Which One Actually Fits Your Family?',
  excerpt:
    "This is the decision that comes before almost every other decision on this site — and most families never actually stop to make it on purpose.",
  metaDescription:
    "Puppy or adult rescue dog — which actually fits your family? An honest comparison for families deciding before they fall in love with a specific animal.",
  category: 'dogs-family',
  publishedAt: '2026-09-08T00:00:00.000Z',
  content: `## The Decision Before the Decision

Everything else on this site assumes you've already decided on a puppy. Most families never actually made that decision — they just pictured a puppy first, the way most of us do, and never seriously weighed the alternative.

That's worth pausing on, because a rescue adult dog is not a consolation prize. For a lot of families, it's the better fit — and for some, a puppy genuinely is. The honest version of this question isn't "which is cuter." It's "which one matches what our house can actually give right now."

## What a Puppy Actually Requires

- 3-5 hours of active daily work in the first months
- House training, from zero, on your schedule
- A blank behavioural slate — which means real chewing, real accidents, real unpredictability
- 10-15 years ahead of you, starting from the hardest phase

A puppy rewards a family with time, patience, and tolerance for chaos in the short term, in exchange for shaping the dog from the very beginning.

## What an Adult Rescue Dog Actually Offers

- A known size, energy level, and often a known temperament
- House training frequently already in place
- A shorter, calmer settling-in period for most dogs (though not all — some rescues carry real adjustment needs)
- Fewer years of the highest-workload phase, more years of the dog he already is

A rescue adult rewards a family with a clearer picture upfront, at the cost of not shaping those early years yourself — and sometimes at the cost of working through a history you don't fully know.

## The Honest Trade-Off Table

### Choose a Puppy If
Someone in the household has the daily hours for the first six months, the family wants to shape training and habits from scratch, and everyone has accepted that the first year is the hardest, not the most photogenic part.

### Choose a Rescue Adult If
The household has less daily bandwidth for the intensive early months, a more predictable size and temperament matters for younger children or other pets, or the family values knowing more of what they're getting before they commit.

Neither answer is more virtuous than the other. Rescues need families exactly as much as puppies do, and a family that carefully chooses the right adult dog is not settling — they're matching, which is the entire point of this framework.

## Why We Say This to Shelters and Rescues Directly

The free chapter on this site is shared openly with shelters and rescue organisations, because the readiness questions underneath this decision are identical either way: who owns the responsibility, what does the daily workload actually look like, is the house prepared, is everyone — including the most reluctant person in the family — genuinely on board.

The animal's age doesn't change those questions. It only changes which answers matter most.

## The Question to Ask First

Before you fall in love with a specific puppy or a specific rescue dog at the shelter, ask your family: "Given our actual schedule this year, not the one we wish we had, which of these two would we set up to succeed?"

Answer that first. Fall in love second.

System first. Dog second. Family always.`,
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
  const moreArticles = await getMoreArticles(ARTICLE.slug, ARTICLE.category)
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
