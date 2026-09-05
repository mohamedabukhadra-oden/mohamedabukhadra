import { SITE_URL } from './seo'

/**
 * The Person entity, shared between /about and the homepage.
 *
 * The homepage's WebSite JSON-LD (src/app/page.tsx) references this node's
 * @id as its `publisher` without redeclaring it — that's the correct schema.org
 * pattern for consolidating one entity across a document, *but only within the
 * same page load*. Structured-data parsers resolve @id references against the
 * JSON-LD graph on the page they're reading, not across separate page fetches,
 * so a Person defined only on /about left every other page's reference to
 * `${SITE_URL}/#person` dangling — Google saw a WebSite whose publisher it
 * could not resolve on any page except /about.
 *
 * Fix: export the node once here (no @context — that's added by whichever page
 * embeds it) and have both /about and the homepage include it directly, so the
 * @id resolves locally wherever it's referenced.
 */
export const personNode = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Mohamed Abu Khadra',
  url: SITE_URL,
  jobTitle: 'Author and Founder',
  knowsAbout: [
    'family dog ownership',
    'puppy readiness',
    'dog owner education',
    'pet business operations',
  ],
  sameAs: [
    'https://eg.linkedin.com/in/abu-khadra',
    'https://www.oden.pet/founder',
    'https://theknowhow.uk/about',
  ],
  founder: [
    { '@type': 'Organization', name: 'Oden Pet', url: 'https://www.oden.pet' },
    { '@type': 'Organization', name: 'The KnowHow Company', url: 'https://theknowhow.uk' },
  ],
}
