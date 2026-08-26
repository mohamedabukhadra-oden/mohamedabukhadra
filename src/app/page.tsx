import Link from 'next/link'
import { RevealObserver } from '@/components/reveal-observer'

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

        {/* Right column (5/12) — book cover placeholder */}
        <div className="flex justify-center md:justify-end animate-fade-in-up stagger-3">
          <div
            className="relative w-56 sm:w-60 md:w-64 lg:w-72 rounded-[4px] flex-shrink-0"
            style={{
              backgroundColor: 'var(--paper)',
              color: 'var(--ink-navy)',
              padding: '2.5rem 1.75rem',
              boxShadow:
                '8px 8px 24px rgba(0,0,0,0.35), 2px 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            {/* Spine accent */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[6px] rounded-l-[4px]"
              style={{ backgroundColor: 'var(--teal)' }}
            />

            {/* Top decorative line */}
            <div
              className="w-12 h-[2px] mb-6"
              style={{ backgroundColor: 'var(--gold)' }}
            />

            {/* Title */}
            <p
              className="font-display text-[0.65rem] font-medium tracking-[0.1em] uppercase mb-3"
              style={{ color: 'var(--teal)' }}
            >
              Before You Say Yes
            </p>
            <h3
              className="font-display text-2xl sm:text-[1.65rem] leading-tight font-bold tracking-tight"
              style={{ color: 'var(--ink-navy)' }}
            >
              to the Dog
            </h3>

            {/* Subtitle / accent line */}
            <div
              className="w-full h-[1px] mt-5 mb-4"
              style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }}
            />

            <p
              className="font-text text-xs italic leading-relaxed"
              style={{ color: 'var(--ink-navy)', opacity: 0.7 }}
            >
              What every family needs to decide before the puppy arrives.
            </p>

            {/* Bottom decorative line */}
            <div
              className="w-8 h-[2px] mt-auto pt-6"
              style={{ backgroundColor: 'var(--gold)' }}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {patternItems.map((item, i) => (
            <div
              key={i}
              className="bg-bone-alt border border-rule rounded-[4px] p-5 md:p-6 flex flex-col gap-2 reveal"
            >
              <h3 className="font-display text-base font-medium text-ink leading-snug">
                {item.title}
              </h3>
              <p className="text-body text-text-2 text-[0.9375rem] leading-relaxed">
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
function SignatureSection() {
  return (
    <section className="bg-bone section-gap">
      <div className="section-container reveal">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 md:gap-x-12 lg:gap-x-16">
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
export default function Home() {
  return (
    <>
      <RevealObserver />
      <HeroSection />
      <PatternSection />
      <SignatureSection />
      <FreeChapterCTA />
    </>
  )
}
