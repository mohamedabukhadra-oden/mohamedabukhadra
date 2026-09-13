import type { Metadata } from 'next'
import Image from 'next/image'
import { RevealObserver } from '@/components/reveal-observer'
import { SITE_URL } from '@/lib/seo'
import { BOOK_ONE_BUY_URL as BUY_URL } from '@/lib/buy-url'

export const metadata: Metadata = {
  title: 'Before You Say Yes to the Dog | Mohamed Abu Khadra',
  description:
    'A decision framework and a family operating system — so the puppy arrives into a house that\'s ready for him.',
  alternates: {
    canonical: `${SITE_URL}/book-one`,
  },
  openGraph: {
    images: [{ url: '/book-one-cover.jpg', width: 1600, height: 2560, alt: 'Before You Say Yes to the Dog — book cover' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/book-one-cover.jpg'],
  },
}

/* ─── Real final cover (replaces the earlier CSS mockup) ─── */
function BookCover() {
  return (
    <div className="relative w-64 sm:w-72 md:w-80 lg:w-96 flex-shrink-0">
      <Image
        src="/book-one-cover.jpg"
        alt="Before You Say Yes to the Dog — A Family Guide Before Bringing Home a Puppy, by Mohamed Abu Khadra"
        width={1600}
        height={2560}
        priority
        sizes="(min-width: 1024px) 384px, (min-width: 768px) 320px, 288px"
        className="w-full h-auto rounded-[2px]"
        style={{ boxShadow: '8px 8px 24px rgba(0,0,0,0.35), 2px 2px 6px rgba(0,0,0,0.2)' }}
      />
    </div>
  )
}

/* ─── Section 1: Cover + Title + Buy ─── */
function CoverSection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container hero-grid">
        <div className="flex flex-col gap-5 md:gap-6">
          <p
            className="text-eyebrow animate-fade-in-up stagger-1"
            style={{ color: 'var(--teal)' }}
          >
            BEFORE YOU SAY YES TO THE DOG
          </p>

          <h1
            className="text-hero animate-fade-in-up stagger-2"
            style={{ color: 'var(--ink-navy)' }}
          >
            A decision framework and a family operating system.
          </h1>

          <p
            className="text-body animate-fade-in-up stagger-3"
            style={{ color: 'var(--ink-navy)', opacity: 0.8 }}
          >
            So the puppy arrives into a house that&rsquo;s ready for him.
          </p>

          <div className="flex flex-wrap gap-3 mt-2 animate-fade-in-up stagger-4">
            <a
              href={BUY_URL}
              target={BUY_URL.startsWith('mailto:') ? undefined : '_blank'}
              rel={BUY_URL.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              className="b1-btn"
            >
              Get the book
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end animate-fade-in-up stagger-3">
          <BookCover />
        </div>
      </div>
    </section>
  )
}

/* ─── Section 2: Who this is for / not for ─── */
function AudienceSection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 reveal items-center">
          {/* This is for */}
          <div>
            <h2
              className="text-h3 font-text mb-6"
              style={{ color: 'var(--teal)' }}
            >
              This is for
            </h2>
            <div className="space-y-4">
              <p
                className="text-body"
                style={{ color: 'var(--ink-navy)' }}
              >
                Families still deciding whether to get a dog — who want to make
                the choice with their eyes open, not their hearts only.
              </p>
              <p
                className="text-body"
                style={{ color: 'var(--ink-navy)' }}
              >
                Families who already have the puppy and want a fresh start — who
                suspect the problem isn&rsquo;t the dog, but haven&rsquo;t been
                able to name what is.
              </p>
            </div>

            <h2
              className="text-h3 font-text mt-10 mb-6"
              style={{ color: 'var(--warn)' }}
            >
              This is not for
            </h2>
            <div className="space-y-4">
              <p
                className="text-body"
                style={{ color: 'var(--ink-navy)' }}
              >
                People looking for obedience commands — sit, stay, recall. This
                book doesn&rsquo;t teach the dog anything. It prepares the family
                for the dog.
              </p>
              <p
                className="text-body"
                style={{ color: 'var(--ink-navy)' }}
              >
                People wanting a breed guide. This book is about your family, not
                about choosing between a Labrador and a Malinois.
              </p>
            </div>
          </div>

          <Image
            src="/book-one/family-reading.jpg"
            alt="A family gathered around the dog with books open"
            width={1037}
            height={694}
            sizes="(min-width: 768px) 45vw, 90vw"
            className="w-full h-auto rounded-[4px] shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

/* ─── Section 3: What's inside ─── */
const parts = [
  { title: 'Part One', subtitle: 'Before the Decision' },
  { title: 'Part Two', subtitle: 'The Family System Before Yes' },
  { title: 'Part Three', subtitle: 'The First-Year Reality' },
  { title: 'Part Four', subtitle: 'Pressure, Safety, and Daily Life' },
  { title: 'Part Five', subtitle: 'The Final Decision' },
]

const chapters = [
  'Before the Puppy Enters the House',
  'House Zones and Puppy-Free Spaces',
  'The Six Family Systems',
  'The Leading Adult Control Centre',
  'Kids Operator System',
  'Choosing the Right Puppy',
  'The First 48 Hours',
  'The First Week',
  'Potty Training',
  'The First Month',
  'The First 3 Months',
  'The First Year',
  'The Reset',
  'Dog Logic and Body Language',
  'The SAFE System: Giving the Least-Ready Person a Real Say',
  'Socialization System',
  'Outdoor Freedom and Play',
  'Mental Games and Brain Work',
  'Grooming, Hygiene, and Health Watch',
  'Emergencies and Vet Readiness',
]

function ContentsSection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container">
        <p
          className="section-label mb-4 reveal"
          style={{ color: 'var(--teal)' }}
        >
          WHAT&rsquo;S INSIDE
        </p>
        <h2
          className="text-h2 mb-12 md:mb-16 reveal"
          style={{ color: 'var(--ink-navy)' }}
        >
          Five parts. Twenty chapters.
        </h2>

        {/* Parts list */}
        <div className="space-y-4 mb-12 md:mb-16 reveal">
          {parts.map((part) => (
            <div key={part.title} className="flex items-baseline gap-4">
              <span
                className="font-display text-sm font-medium tracking-wide shrink-0"
                style={{ color: 'var(--teal)' }}
              >
                {part.title}
              </span>
              <span
                className="font-text text-lg"
                style={{ color: 'var(--ink-navy)' }}
              >
                {part.subtitle}
              </span>
            </div>
          ))}
        </div>

        {/* Chapter list */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 reveal">
            {chapters.map((ch, i) => (
              <li
                key={i}
                className="font-text text-base leading-relaxed flex gap-3"
                style={{ color: 'var(--ink-navy)', opacity: 0.85 }}
              >
                <span
                  className="font-display text-sm shrink-0"
                  style={{ color: 'var(--gold)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{ch}</span>
              </li>
            ))}
          </ol>
          <Image
            src="/book-one/setting-up-the-house.jpg"
            alt="A family laying out zone mats for the puppy"
            width={1068}
            height={545}
            sizes="(min-width: 1024px) 35vw, 90vw"
            className="reveal w-full h-auto rounded-[4px] shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}

/* ─── Section 4: The Family Readiness Test ─── */
function ReadinessTestSection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container reveal grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-stretch">
        <div
          className="md:col-span-3 p-8 md:p-12 rounded-[4px]"
          style={{
            backgroundColor: 'var(--teal)',
            color: 'var(--paper)',
          }}
        >
          <p className="text-eyebrow mb-4" style={{ color: 'var(--paper)', opacity: 0.7 }}>
            PART FIVE &middot; THE FINAL DECISION
          </p>
          <h2 className="text-h2 mb-6" style={{ color: 'var(--paper)' }}>
            The Family Readiness Test
          </h2>
          <p className="text-longform" style={{ color: 'var(--paper)' }}>
            The book ends in a real decision, and PAUSE is a respected outcome.
            The test doesn&rsquo;t tell you to get a dog. It tells you whether
            your family is ready — and if the honest answer is &ldquo;not
            yet,&rdquo; it gives you the specific things to change before the
            puppy comes home.
          </p>
          <p
            className="text-longform mt-4"
            style={{ color: 'var(--gold)' }}
          >
            The honesty is the differentiator.
          </p>
        </div>
        <Image
          src="/book-one/family-readiness-check.jpg"
          alt="A family around the table going through a readiness checklist"
          width={1024}
          height={650}
          sizes="(min-width: 768px) 35vw, 90vw"
          className="md:col-span-2 w-full h-full object-cover rounded-[4px] shadow-lg"
        />
      </div>
    </section>
  )
}

/* ─── Section 5: Sample — Opening of Chapter 1 ─── */
function SampleSection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container">
        <p
          className="section-label mb-4 reveal"
          style={{ color: 'var(--teal)' }}
        >
          READ INSIDE
        </p>
        <h2
          className="text-h2 mb-12 md:mb-16 reveal"
          style={{ color: 'var(--ink-navy)' }}
        >
          From Chapter 1
        </h2>

        <Image
          src="/book-one/dog-resting-calm-room.jpg"
          alt="A dog settled calmly beside its crate"
          width={1024}
          height={649}
          sizes="(min-width: 768px) 68ch, 90vw"
          className="reveal w-full max-w-[68ch] h-auto rounded-[4px] shadow-lg mb-10"
        />

        <div className="reveal" style={{ maxWidth: '68ch' }}>
          <p
            className="font-text text-lg md:text-xl leading-relaxed md:leading-loose mb-6"
            style={{ color: 'var(--ink-navy)' }}
          >
            Here is the thing nobody warns you about. The dog that breaks a
            family is almost never an unloved one. It is the dog everyone
            wanted. The kids begged for him, the parents said yes, the whole
            house celebrated the day he arrived — and a few months later that
            same house is tense, tired, and quietly wondering what went wrong.
            Nobody saw it coming, because the family prepared for the wrong
            thing entirely. They prepared to love a puppy. They did not
            prepare to live with one. Sometimes the dog was trained, but the
            house was not.
          </p>
          <p
            className="font-text text-lg md:text-xl leading-relaxed md:leading-loose mb-6"
            style={{ color: 'var(--ink-navy)' }}
          >
            I know how that ends, because it happened to me. Three times. And
            the hardest part was never the mess or the noise. It was watching
            my children fall in love with an animal we then could not keep,
            and feeling the whole thing fail not for lack of love, but for
            lack of a plan.
          </p>
          <p
            className="font-text text-lg md:text-xl leading-relaxed md:leading-loose mb-6"
            style={{ color: 'var(--ink-navy)' }}
          >
            A puppy will not live inside your dream of him. He will live
            inside your actual house, with its school mornings, work calls,
            tired parents, excited kids, open doors, visitors, food on the
            floor, accidents, and days when nobody has enough energy left to
            give. Love decides that you want him. It does not decide who
            cleans the accident at eleven at night, who controls the door
            when a delivery arrives, who ends the rough play before someone
            cries, or how the least-ready person keeps their peace. Those
            things are not solved by loving harder. They are solved by a
            system — and a system is the one thing the dream never includes.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 7: Closing image ─── */
function ClosingImageSection() {
  return (
    <section className="section-gap" style={{ backgroundColor: 'var(--paper)' }}>
      <div className="section-container">
        <Image
          src="/book-one/walking-the-dog.jpg"
          alt="A calm walk — the family and dog out together"
          width={1075}
          height={782}
          sizes="(min-width: 768px) 68ch, 90vw"
          className="reveal w-full max-w-[68ch] mx-auto h-auto rounded-[4px] shadow-lg"
        />
      </div>
    </section>
  )
}

/* ─── Section 8: Buy CTA repeat ─── */
function BuyCTASection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container text-center reveal">
        <p
          className="section-label mb-4"
          style={{ color: 'var(--teal)' }}
        >
          READY?
        </p>
        <h2
          className="text-h2 mb-8"
          style={{ color: 'var(--ink-navy)' }}
        >
          System first. Puppy second.
        </h2>
        <a
          href={BUY_URL}
          target={BUY_URL.startsWith('mailto:') ? undefined : '_blank'}
          rel={BUY_URL.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          className="b1-btn"
        >
          Get the book
        </a>
      </div>
    </section>
  )
}

/* ─── Page (Server Component) ─── */
export default function BookOnePage() {
  return (
    <>
      <RevealObserver />
      <style>{`
        .b1-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          font-family: var(--font-ui);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          border-radius: 4px;
          background-color: var(--ink-navy);
          color: var(--paper);
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
          text-decoration: none;
        }
        .b1-btn:hover {
          background-color: var(--teal);
        }
      `}</style>
      <CoverSection />
      <AudienceSection />
      <ContentsSection />
      <ReadinessTestSection />
      <SampleSection />
      <ClosingImageSection />
      {/* Reviews section omitted until real reviews exist */}
      <BuyCTASection />
    </>
  )
}
