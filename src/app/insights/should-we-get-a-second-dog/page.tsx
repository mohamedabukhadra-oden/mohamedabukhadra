import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { StaticArticle, getMoreArticles } from '@/components/static-article'

const ARTICLE = {
  slug: 'should-we-get-a-second-dog',
  title: 'Should You Get a Second Dog? What Actually Changes',
  excerpt:
    "A second dog isn't twice the dog. It's a different household, with a different set of rules, introduced to a system that was built for one.",
  metaDescription:
    "Should you get a second dog? What actually changes for the family and the resident dog, and the questions to answer before you bring one home.",
  category: 'dogs-family',
  publishedAt: '2026-09-08T00:00:00.000Z',
  content: `## The Assumption Behind the Question

Most families who ask "should we get a second dog" are really asking "will our current dog like having a friend?" That's a fair question, but it's not the first one.

The first one is: does the system we built for one dog still work with two, or did it only ever work because there was exactly one?

## Why This Isn't "The Same, Twice"

A second dog doesn't double the existing routine — it multiplies the number of relationships in the house. Your resident dog now has a relationship with the new dog, not just with you. Your children now split attention two ways. Walks, feeding, vet visits, and floor space all need a plan that accounts for two personalities, not one, at the same time.

Families who do well with a second dog treat it as building a new system, informed by the old one. Families who struggle usually assumed the existing routine would simply stretch to cover it.

## What to Actually Assess Before Bringing One Home

### 1. How Is Your Current Dog Around Other Dogs?
Not just "friendly at the park" — specifically around another dog in his own home, his own bed, his own food bowl. Resource guarding and territorial behaviour show up at home in ways they never do on neutral ground.

### 2. Does the Workload Math Still Hold?
If a puppy needs 3-5 hours of daily active care, and your household already has a full routine around one adult dog, where do those hours come from? "We'll figure it out" is not a plan.

### 3. Who Owns the Introduction?
Someone needs to manage the first meetings deliberately — separate feeding stations, supervised time together, a plan for who gets attention first so the resident dog doesn't read the newcomer as a threat to his place in the family.

### 4. Is This About the Dog, or About the Kids?
"He needs a friend" is sometimes true and sometimes a story families tell themselves to justify wanting a second dog for their own reasons. Both are valid — but be honest about which one it is, because the plan differs.

### 5. Does Everyone Still Have a Role?
The same operator system that worked for one dog needs to be reassigned, not assumed to double automatically. Two dogs often means more supervision per walk, not less, at least at first.

## The Timeline That Actually Works

Most successful two-dog households didn't rush the introduction. They took weeks, not days, to move from supervised meetings to full integration — separate spaces at first, shared spaces once both dogs were calm, and a resident dog whose routine was protected rather than upended overnight.

## The Real Question

Not "would our dog like a friend."

Ask instead: "Do we currently have the time, the space, and the plan to run two relationships at once — with the dog we already have, and with the one we're about to bring in?"

If the honest answer is that the current system is already stretched, that's useful information now, not a regret in month two.

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
