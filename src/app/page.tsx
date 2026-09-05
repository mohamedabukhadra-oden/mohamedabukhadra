import Link from 'next/link'
import Image from 'next/image'
import { RevealObserver } from '@/components/reveal-observer'
import { SITE_URL } from '@/lib/seo'
import { personNode } from '@/lib/json-ld'

/* ─── 7.1 Hero — the one dark band ─── */
function HeroSection() {
  return (
    <section className="bg-ink-dark pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32">
      <div className="section-container hero-grid">
        {/* Left column (7/12) */}
        <div className="flex flex-col gap-5 md:gap-6">
          <p
            className="text-eyebrow text-on-dark-2 animate-fade-in-up stagger-1"
          >
            BEFORE YOU SAY YES TO THE DOG
          </p>

          <h1 className="text-hero text-on-dark animate-fade-in-up stagger-2">
            Most dog books sell the dream.
          </h1>

          <h2 className="text-h2 text-on-dark animate-fade-in-up stagger-3">
            This one prepares the family for reality.
          </h2>

          <p className="text-body text-on-dark animate-fade-in-up stagger-4">
            Three times I brought a puppy home. Three times it ended the same
            way — everyone exhausted by month three, including the dog.
          </p>

          <p className="text-body text-on-dark animate-fade-in-up stagger-4">
            It was never the dog. It was the system we didn&rsquo;t have.
          </p>

          <div className="flex flex-wrap gap-3 mt-2 animate-fade-in-up stagger-5">
            <Link href="/book-one" className="btn-primary">
              Get the book
            </Link>
            <Link
              href="/free"
              className="btn-secondary border-on-dark-2 text-on-dark hover:bg-on-dark hover:text-ink-dark transition-all"
            >
              Read the free chapter
            </Link>
          </div>

          <p className="text-caption text-on-dark-2 mt-1 animate-fade-in-up stagger-6">
            System first. Puppy second. Family always.
          </p>
        </div>

        {/*
          Right column (5/12) — the actual cover artwork.

          This was a CSS approximation of the cover. However closely it matched,
          it was still a placeholder: no og:image for shares, nothing for alt
          text, nothing for crawlers to see, and it would drift the moment a
          token changed. public/book-cover-1.png is the real front cover
          (853×1280; book-cover-0 is the back, -2 is the spine).

          No rotation. A tilted cover is the signature of a stock 3D mockup and
          reads infomercial — the one cue that would undercut an otherwise
          restrained page. The depth comes from the shadow and the page edges
          instead, and straight-on is the more confident position.

          The negative bottom margin lets it hang past the dark band into the
          bone section below — §7.1's "the reader crosses from dark into light
          exactly where the book appears".
        */}
        <div className="flex justify-center md:justify-end animate-fade-in-up stagger-3">
          <div className="relative z-10 lg:-mb-24">
            {/* Page edges — a thin stack behind the right edge, so it reads as a
                physical object rather than a flat image pasted on the band. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-3 -right-[3px] w-[6px] rounded-r-[2px]"
              style={{
                background:
                  'repeating-linear-gradient(to right, #FBF9F3 0 1px, #DAD3C2 1px 2px)',
              }}
            />
            <Image
              src="/book-cover-1.png"
              alt="Before You Say Yes to the Dog — A Family Guide Before Bringing Home a Puppy, by Mohamed Abu Khadra. A family sits together in a hallway with a golden puppy on the doormat."
              width={853}
              height={1280}
              priority
              sizes="(min-width: 1024px) 288px, (min-width: 768px) 256px, 224px"
              className="relative w-56 sm:w-60 md:w-64 lg:w-72 h-auto rounded-[2px]"
              style={{
                boxShadow:
                  '0 18px 40px -12px rgba(0,0,0,0.55), 0 4px 10px rgba(0,0,0,0.25)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 7.2 The pattern — 'We've had the same week.' ─── */
const patternItems = [
  {
    title: 'Nobody actually owns the dog',
    description:
      'One adult is busy. One is unsure. The dog belongs to everyone, which means no one.',
  },
  {
    title: 'Someone in the house is afraid',
    description:
      'Fear doesn\'t disappear because a puppy is cute. Unaddressed, it makes every interaction worse.',
  },
  {
    title: 'Fifty commands at once',
    description:
      'Everyone gives orders. The dog hears noise. Nobody learns anything — including the dog.',
  },
  {
    title: 'The kids are fighting over the dog',
    description:
      'Who holds the leash. Whose turn it was. Who gave the order. The dog watches the argument.',
  },
  {
    title: 'Chasing games never stop',
    description:
      'The house has no zones, so the whole house is a racetrack.',
  },
  {
    title: 'By month three, everyone is tired',
    description:
      'Including the puppy. This is where most families quietly give up.',
  },
]

function PatternSection() {
  return (
    <section className="bg-bone section-gap">
      <div className="section-container">
        <p className="section-label mb-4 reveal">IF ANY OF THIS SOUNDS LIKE YOUR HOUSE</p>
        <h2 className="text-h2 text-ink mb-12 md:mb-16 reveal">
          We&rsquo;ve had the same week.
        </h2>

        {/*
          An editorial list, not a card grid. Six identically sized boxes read as
          a table — the eye finds no entry point and the page feels machined.
          Hairline rows with an asymmetric split give the same content a reading
          order: claim, then explanation.

          Deliberately unnumbered. These six are not a sequence — "someone in the
          house is afraid" pre-dates the puppy entirely, and the commands and
          chasing games are concurrent; only the last item is temporal. Numbering
          them would also fight the eyebrow above, which says "IF ANY OF THIS
          SOUNDS LIKE YOUR HOUSE": a reader who recognises two of six should feel
          seen, not measured against a progression she is failing to match.
          Recognition is the job here, not diagnosis.
        */}
        <div className="border-t border-rule">
          {patternItems.map((item, i) => (
            <div
              key={i}
              className="reveal grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-rule py-7 md:py-9"
            >
              <h3 className="md:col-span-5 font-display text-lg md:text-xl font-medium text-ink leading-snug">
                {item.title}
              </h3>
              <p className="md:col-span-7 text-body text-text-2 leading-relaxed md:pt-[0.15em]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="font-text text-text-2 italic text-body mt-12 md:mt-16 reveal">
          That list is not a guess. It&rsquo;s my house, three times over. Each
          one has a chapter.
        </p>
      </div>
    </section>
  )
}

/* ─── 7.3 Signature — the four names ─── */
/*
  Deliberately more air than any other section. Uniform 128px everywhere is what
  makes a page feel machined — rhythm is contrast, not consistency. This is the
  signature element, so it gets the held breath.
*/
function SignatureSection() {
  return (
    <section className="bg-bone py-24 md:py-36 lg:py-52">
      <div className="section-container reveal">
        {/*
          On large screens the four names span the full measure rather than
          sitting in a left-aligned clump — at 96px they total ~1040px in an
          1180px container, so justify-between spreads them edge to edge and
          keeps them on one line instead of wrapping "Oden" onto its own row.
        */}
        <div className="flex flex-wrap lg:flex-nowrap lg:justify-between items-baseline gap-x-8 gap-y-2 md:gap-x-12 lg:gap-x-4">
          <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-text-3">
            Koudy
          </span>
          <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-text-3">
            Milo
          </span>
          <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-text-3">
            Snoopy
          </span>
          <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-ink">
            Oden
          </span>
        </div>

        <p className="font-text text-text-2 italic text-body mt-8 md:mt-12 max-w-68ch">
          Three went to new families. The fourth stayed.
        </p>

        <Link
          href="/about"
          className="inline-block font-ui text-sm text-accent hover:text-accent-hover transition-colors mt-6"
        >
          The whole story &rarr;
        </Link>
      </div>
    </section>
  )
}

/* ─── 7.4 Free chapter CTA ─── */
function FreeChapterCTA() {
  return (
    <section className="bg-bone-alt section-gap">
      <div className="section-container max-w-2xl reveal">
        <p className="section-label mb-4">ALREADY HAVE THE PUPPY?</p>
        <h2 className="text-h2 text-ink mb-6">Start here.</h2>
        <p className="text-body text-text-2 mb-4">
          The Reset chapter is the one people need most and the one nobody
          writes. What to do when it&rsquo;s already going badly — why a bad
          week is not a bad dog, and why &ldquo;try harder&rdquo; is the wrong
          instruction.
        </p>
        <p className="text-body text-text-2 mb-8">
          Free, in full. No purchase.
        </p>
        <Link href="/free" className="btn-primary">
          Send me the Reset chapter
        </Link>
      </div>
    </section>
  )
}

/* ─── Home page (server component) ─── */
/**
 * WebSite schema, with the Person node it publishes bundled in via @graph.
 *
 * The WebSite's `publisher` points at the Person by @id rather than repeating
 * its fields inline — that's the right way to consolidate one entity across a
 * JSON-LD document. But structured-data parsers only resolve @id references
 * within the page they're reading: the Person used to be declared solely on
 * /about, so that reference was dangling everywhere else, including here on
 * the homepage where the WebSite schema actually lives. Putting both nodes in
 * one @graph makes the reference resolve on this page too.
 */
const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Mohamed Abu Khadra',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    personNode,
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <RevealObserver />
      <HeroSection />
      <PatternSection />
      <SignatureSection />
      <FreeChapterCTA />
    </>
  )
}
