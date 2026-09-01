import type { Metadata } from 'next'
import Link from 'next/link'
import { RevealObserver } from '@/components/reveal-observer'

export const metadata: Metadata = {
  title: 'Before You Say Yes to the Dog | Mohamed Abu Khadra',
  description:
    'A decision framework and a family operating system — so the puppy arrives into a house that\'s ready for him.',
  alternates: {
    canonical: 'https://www.mohamedabukhadra.com/book-one',
  },
}

/* ─── Book cover placeholder (larger than home hero) ─── */
function BookCover() {
  return (
    <div
      className="relative w-64 sm:w-72 md:w-80 lg:w-96 rounded-[4px] flex-shrink-0"
      style={{
        backgroundColor: 'var(--paper)',
        color: 'var(--ink-navy)',
        padding: '3rem 2rem',
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
        className="w-12 h-[2px] mb-8"
        style={{ backgroundColor: 'var(--gold)' }}
      />
      {/* Title */}
      <p
        className="font-display text-[0.7rem] font-medium tracking-[0.1em] uppercase mb-4"
        style={{ color: 'var(--teal)' }}
      >
        Before You Say Yes
      </p>
      <h3
        className="font-display text-3xl sm:text-4xl leading-tight font-bold tracking-tight"
        style={{ color: 'var(--ink-navy)' }}
      >
        to the Dog
      </h3>
      {/* Subtitle / accent line */}
      <div
        className="w-full h-[1px] mt-6 mb-5"
        style={{ backgroundColor: 'var(--gold)', opacity: 0.5 }}
      />
      <p
        className="font-text text-sm italic leading-relaxed"
        style={{ color: 'var(--ink-navy)', opacity: 0.7 }}
      >
        What every family needs to decide before the puppy arrives.
      </p>
      {/* Bottom decorative line */}
      <div
        className="w-8 h-[2px] mt-auto pt-8"
        style={{ backgroundColor: 'var(--gold)' }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 reveal">
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
          </div>

          {/* This is not for */}
          <div>
            <h2
              className="text-h3 font-text mb-6"
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
      <div className="section-container reveal">
        <div
          className="p-8 md:p-12 rounded-[4px]"
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
