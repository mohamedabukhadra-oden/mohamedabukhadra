import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/seo'
import { StaticArticle, getMoreArticles } from '@/components/static-article'

const ARTICLE = {
  slug: 'real-cost-of-a-puppys-first-year',
  title: "The Real Cost of a Puppy's First Year (It's Not Just Time)",
  excerpt:
    "Everyone warns you about the sleepless nights. Almost nobody hands you a number. Here's what the first year actually costs, and why the number itself is part of the readiness test.",
  metaDescription:
    "How much does a puppy really cost in the first year? A full, honest breakdown of the money nobody mentions before you say yes.",
  category: 'dogs-family',
  publishedAt: '2026-09-08T00:00:00.000Z',
  content: `## The Question Everyone Skips

Families spend weeks discussing whether they're ready for a puppy in every sense except one: money.

We talk about time, about who walks him, about whether the kids will really help. We rarely sit down and add up what the first year actually costs. That's strange, because the money question is easier to answer honestly than the emotional ones — and getting it wrong is one of the most common reasons a dog gets returned or rehomed within the first twelve months.

This isn't a scare number designed to talk you out of a dog. It's the number your family deserves to see before you commit, not after.

## The Setup Costs (Before He Even Settles In)

These arrive in the first few weeks, mostly at once:

- Crate, bed, and puppy-proofing barriers
- Food and water bowls
- Collar, leash, harness, ID tag
- An initial vet visit, plus core vaccinations
- Microchipping, where it isn't already done
- Basic toys and chew items — more than you think, because they don't last
- Spaying or neutering, usually a few months in

None of these are optional, and none of them are the ongoing cost. They're simply the price of the door opening.

## The Monthly Costs (What Keeps Going)

- Food — quality and portion size change this more than breed does
- Routine vet care and preventatives (flea, tick, worming)
- Pet insurance, if you choose to carry it — and there's a real argument that you should
- Training, whether that's a class or one-to-one sessions
- Daycare or a dog walker, if the household is out during the day
- Grooming, for breeds that need it
- Replacement toys, beds, and the odd chewed shoe

Add these up over twelve months and most families are surprised — not because any single line is large, but because none of them stop.

## The Cost Nobody Puts on a List

Then there's the unplanned cost: the emergency vet visit for the thing he swallowed, the course of medication for the infection nobody saw coming, the damaged furniture. You cannot predict which of these will happen. You can predict that something will.

This is the real argument for insurance or a dedicated savings buffer — not because every family will need it, but because the families who don't have it and do need it are the ones who end up making a heartbreaking decision for financial reasons alone.

## Why This Belongs in the Readiness Conversation

We built the family readiness framework around workload and roles because that's where most families fail first. But money is the same kind of question: not "can we technically afford a bag of food," but "does our current budget have room for a new, non-negotiable monthly line item for the next ten to fifteen years?"

A family that can answer that honestly — with numbers, not optimism — is in a stronger position than a family that has only asked whether they love dogs.

## The Honest Version of the Question

Don't ask "can we afford a puppy?" Almost anyone can afford the food.

Ask: "If the vet bill were $800 next month, unplanned, would that break something else in our finances?"

If the answer is yes, that's not a reason to say no forever. It's a reason to build the buffer first, and let the puppy come home into a family that isn't one bad month away from a decision nobody wants to make.

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
