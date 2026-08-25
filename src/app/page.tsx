import Link from 'next/link'
import { BookOpen, Lightbulb, MessageCircle, Brain, ChevronDown } from 'lucide-react'
import { SubscribeCTA } from '@/components/subscribe-cta'
import { StayBackstageSection } from '@/components/stay-backstage-section'

/* ─── Hero Section (server component — no state) ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-warm-white overflow-hidden">
      {/* Subtle plum gradient at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-plum/5 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Label — author first */}
        <p className="section-label mb-6 md:mb-8">Author</p>

        {/* Name */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-[1.05]">
          MOHAMED
          <br />
          ABU KHADRA
        </h1>

        {/* Tagline — the repositioning anchor */}
        <p className="font-serif text-xl md:text-2xl lg:text-3xl text-plum/80 mt-6 md:mt-8 max-w-2xl leading-relaxed">
          Everyone sells you the dream.
          <br className="hidden sm:block" />
          <span className="text-foreground">I ask the questions behind it.</span>
        </p>

        {/* Gold divider */}
        <div className="w-24 h-px bg-antique-gold mt-10 md:mt-14" />

        {/* Book CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-12">
          <Link
            href="/books/before-you-say-yes-to-the-dog"
            className="font-sans text-sm tracking-wide uppercase bg-plum text-warm-white px-8 py-3 rounded-full hover:bg-plum-dark transition-colors duration-300"
          >
            Before You Say Yes
          </Link>
          <Link
            href="/books/after-you-say-yes-to-the-dog"
            className="font-sans text-sm tracking-wide uppercase border border-plum/30 text-plum px-8 py-3 rounded-full hover:bg-plum/5 transition-colors duration-300"
          >
            After You Say Yes
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 md:mt-14">
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}

/* ─── Front Stage & Backstage Section (server component) ─── */
const frontStageItems = [
  {
    icon: BookOpen,
    title: 'The Books',
    description: 'Two books. One question: are you actually ready for this? Neither book sugarcoats the answer.',
    href: '/books',
  },
  {
    icon: Lightbulb,
    title: 'The Ideas',
    description: 'What I write about when I am not writing books. Things I have noticed after 25 years of watching people and businesses.',
    href: '/insights',
  },
  {
    icon: MessageCircle,
    title: 'The Thinking',
    description: 'From marketing departments, university classrooms, startup offices, and the moments in between.',
    href: '/insights',
  },
]

const backstageItems = [
  {
    title: 'Strategist',
    description: 'Advises leaders and organisations through The KnowHow.',
  },
  {
    title: 'Educator',
    description: 'Visiting professor of marketing.',
  },
  {
    title: 'Founder',
    description: 'Built Oden and helped scale CowPay from concept to 10x GMV.',
  },
  {
    title: 'Speaker',
    description: 'Keynotes and workshops at international conferences and institutions.',
  },
]

function FrontStageSection() {
  return (
    <section className="py-24 md:py-32 bg-warm-white">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="section-label mb-4">What You See</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
            Front Stage{' '}
            <span className="text-plum">&</span>{' '}
            Backstage
          </h2>
          <p className="prose-editorial mt-6 max-w-2xl mx-auto">
            Some things are written for the audience. Others live behind the curtain.
            Both matter.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* FRONT STAGE */}
          <div>
            <div className="border-l-2 border-plum pl-8 md:pl-10">
              <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-plum mb-8">
                Front Stage
              </h3>
              <p className="prose-editorial text-muted-foreground mb-10">
                What gets published. What you can read, share, or use.
                This is the visible part.
              </p>
            </div>

            <div className="space-y-8">
              {frontStageItems.map((item) => (
                <Link key={item.title} href={item.href} className="group block">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-plum/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <item.icon className="w-5 h-5 text-plum" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium tracking-tight mb-1 group-hover:text-plum transition-colors">
                        {item.title}
                      </h4>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* BACKSTAGE */}
          <div>
            <div className="border-l-2 border-turquoise pl-8 md:pl-10">
              <h3 className="font-serif text-2xl md:text-3xl font-light tracking-tight text-turquoise mb-8">
                Backstage
              </h3>
              <p className="prose-editorial text-muted-foreground mb-10">
                What happens before any of it gets published.
                The advising, teaching, building, and leading.
              </p>
            </div>

            <div className="space-y-8">
              {backstageItems.map((item) => (
                <div key={item.title}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-turquoise/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Brain className="w-5 h-5 text-turquoise" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-medium tracking-tight mb-1">
                        {item.title}
                      </h4>
                      <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Homepage (server component) ─── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <FrontStageSection />

      {/* Subscribe CTA */}
      <section className="section-padding bg-warm-white">
        <div className="section-container max-w-4xl">
          <SubscribeCTA />
        </div>
      </section>

      {/* Stay Backstage */}
      <StayBackstageSection />
    </>
  )
}
