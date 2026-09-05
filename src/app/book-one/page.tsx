import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { RevealObserver } from '@/components/reveal-observer'
import { SITE_URL } from '@/lib/seo'

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
            <Link
              href="#"
              className="b1-btn"
            >
              Get the book
            </Link>
          </div>

          <p
            className="text-caption animate-fade-in-up stagger-5"
            style={{ color: 'var(--ink-navy)', opacity: 0.5 }}
          >
            Kindle $9.99 &middot; Paperback $21.99 &middot; 7&times;10 &middot; 17
            chapters
          </p>
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
  { title: 'Part One', subtitle: 'The Decision Before the Dog' },
  { title: 'Part Two', subtitle: 'The First Week' },
  { title: 'Part Three', subtitle: 'The System' },
  { title: 'Part Four', subtitle: 'When It Goes Wrong' },
  { title: 'Part Five', subtitle: 'The Reset' },
]

const chapters = [
  'Why Families Fail with Dogs, Not Dogs with Families',
  'The Dog You Imagine vs. the Dog You Get',
  'The Unasked Questions',
  'Who Really Wants This Dog?',
  'The Fear in the Room',
  'Day One: What Actually Happens',
  'The First Night',
  'The Leash Problem',
  'Zones, Rules, and the Words You Use',
  'The Reset: When the First Week Has Gone Wrong',
  'Children and Dogs: The Permission Structure',
  'The Adult Who Is Rarely Home',
  'Commands from Every Direction',
  'When the Kids Fight Over the Dog',
  'Chasing Games and the House That Has No Edges',
  'Month Three: The Tired Family',
  'The Family Readiness Test',
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
          Five parts. Seventeen chapters.
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
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 reveal">
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
            CHAPTER 17
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
            There is a moment, usually in the afternoon, when the house goes
            quiet and you look at the puppy sleeping on the floor and you think:
            we made a mistake. Not a dramatic mistake. Not the kind you scream
            about. The quiet kind. The kind that sits in your chest while the
            children are at school and your spouse is at work and it is just you
            and this animal who has been in your house for eleven days and has
            already changed the shape of every room.
          </p>
          <p
            className="font-text text-lg md:text-xl leading-relaxed md:leading-loose mb-6"
            style={{ color: 'var(--ink-navy)' }}
          >
            You don&rsquo;t say it out loud. You don&rsquo;t say it because the
            kids love him, and because you promised, and because everyone told
            you it would be hard at first and you said you understood. But
            &ldquo;hard at first&rdquo; is what people say when they don&rsquo;t
            want to tell you the truth. The truth is that &ldquo;hard at
            first&rdquo; means something specific for a family: it means the
            adults are exhausted, the children have stopped following the rules
            they agreed to, someone in the house is afraid, and the dog — the
            dog is fine. The dog is a puppy. He is doing what puppies do.
          </p>
          <p
            className="font-text text-lg md:text-xl leading-relaxed md:leading-loose mb-6"
            style={{ color: 'var(--ink-navy)' }}
          >
            This book is not about the dog. I need to say that clearly because
            most dog books are about the dog, and you may have picked this one up
            expecting the same. This one is about the family. It is about the
            conversations that didn&rsquo;t happen before the puppy arrived, the
            agreements that were never written down, the person who was afraid
            and was never asked, the schedule that was never built. It is about
            the fact that families don&rsquo;t fail with dogs because they
            don&rsquo;t love them. They fail because love is not a system.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Section 6: Format ─── */
function FormatSection() {
  return (
    <section
      className="section-gap"
      style={{ backgroundColor: 'var(--paper)' }}
    >
      <div className="section-container reveal">
        <p
          className="section-label mb-4"
          style={{ color: 'var(--teal)' }}
        >
          FORMAT
        </p>
        <h2
          className="text-h3 mb-6"
          style={{ color: 'var(--ink-navy)' }}
        >
          Available now
        </h2>
        <div
          className="p-6 md:p-8 rounded-[4px] space-y-2"
          style={{
            backgroundColor: 'rgba(15, 35, 54, 0.05)',
            border: '1px solid rgba(15, 35, 54, 0.1)',
          }}
        >
          <p className="font-text text-base" style={{ color: 'var(--ink-navy)' }}>
            <span style={{ color: 'var(--gold)' }}>Kindle</span> &mdash; $9.99
          </p>
          <p className="font-text text-base" style={{ color: 'var(--ink-navy)' }}>
            <span style={{ color: 'var(--gold)' }}>Paperback</span> &mdash; $21.99
          </p>
          <p className="font-text text-base" style={{ color: 'var(--ink-navy)' }}>
            <span style={{ color: 'var(--gold)' }}>Size</span> &mdash; 7&times;10 inches
          </p>
          <p className="font-text text-base" style={{ color: 'var(--ink-navy)' }}>
            <span style={{ color: 'var(--gold)' }}>Chapters</span> &mdash; 17
          </p>
        </div>
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
        <Link href="#" className="b1-btn">
          Get the book
        </Link>
        <p
          className="text-caption mt-4"
          style={{ color: 'var(--ink-navy)', opacity: 0.5 }}
        >
          Kindle $9.99 &middot; Paperback $21.99
        </p>
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
      <FormatSection />
      {/* Reviews section omitted until real reviews exist */}
      <BuyCTASection />
    </>
  )
}
