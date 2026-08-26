import type { Metadata } from 'next'
import Link from 'next/link'
import { RevealObserver } from '@/components/reveal-observer'

export const metadata: Metadata = {
  title: 'About | Mohamed Abu Khadra',
  description:
    'The real story behind three failed dogs and the system that made the fourth one stay. Mohamed Abu Khadra is a father who found that love was not enough.',
  alternates: {
    canonical: 'https://mohamedabukhadra.com/about',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://mohamedabukhadra.com/#person',
  name: 'Mohamed Abu Khadra',
  url: 'https://mohamedabukhadra.com',
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

export default function AboutPage() {
  return (
    <>
      <RevealObserver />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-bone section-gap">
        <div className="section-container">
          <div style={{ maxWidth: '68ch' }} className="mx-auto">

            {/* ─── H1 ─── */}
            <h1 className="text-h2 text-ink mb-12 md:mb-16 reveal">
              I had raised dogs before I had children. Then I failed three times.
            </h1>

            {/* ─── 1. The setup ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <p className="text-longform text-ink mb-6">
                I grew up with dogs. Not the way some people grow up with dogs —
                not a family pet that sat in the kitchen and got walked on
                weekends. Dogs were part of the household. They were fed on
                schedule, they had their place, and the house had rules that
                everyone followed, including the children. I didn't think of it
                as a system at the time. It was just how things were done.
              </p>
              <p className="text-longform text-ink mb-6">
                By the time I was an adult, I had raised two dogs on my own. One
                after the other. Both lived their full lives in my house. I knew
                what I was doing — or I believed I did. When my own children
                started asking for a dog, I didn't hesitate. I said yes the way
                someone who has done something a dozen times says yes: quickly,
                easily, with the confidence of experience.
              </p>
              <p className="text-longform text-ink">
                That confidence lasted about ten days. Each time.
              </p>
            </section>

            {/* ─── 2. The failures ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <p className="text-longform text-ink mb-6">
                The first was Koudy. A White Swiss Shepherd. Beautiful,
                intelligent, the kind of dog that makes people stop on the
                street. The children were ecstatic. I was at work most of the
                day. My wife — who I will be honest about, because the honesty
                matters — was afraid of dogs. Not in a way that she could hide.
                In a way that made every interaction with a sixty-pound animal in
                her kitchen a negotiation between fear and the commitment she had
                made to the family.
              </p>
              <p className="text-longform text-ink mb-6">
                The children loved him. That was the problem. They loved him the
                way children love anything they are not responsible for:
                completely and without rules. One would grab the leash while the
                other was already giving commands. Both would run through the
                house with him, no zones, no boundaries, the whole house a
                racetrack. I would come home and find my wife retreating to
                another room, the children arguing over whose turn it was to feed
                him, and the dog — the dog was doing what any puppy does when
                nobody in the house agrees on anything. He was confused.
              </p>
              <p className="text-longform text-ink mb-6">
                By week eight, the house was exhausted. The children had stopped
                following the rules we had discussed before he arrived — not
                because they were defiant, but because no one had enforced them.
                My wife's fear had not diminished; it had hardened into
                resentment. I was the one who had wanted this. I was the one who
                was rarely home. And when I was home, I was trying to fix in
                thirty minutes what had been breaking for twelve hours.
              </p>
              <p className="text-longform text-ink">
                Koudy went to a friend's family. Then we tried again. Milo. Same
                breed. Same collapse. Two and a half months. Then Snoopy. Same
                breed again. Same collapse. Slightly faster the third time, as if
                the house had learned to fail more efficiently. The pattern was
                identical: the father rarely home, the wife whose fear made her
                involvement harder, children who followed no rules, commands
                from every direction, fights over the leash, chasing games with
                no zones, and by month three — everyone tired, including the
                dog. Three White Swiss Shepherds. Three identical endings.
              </p>
            </section>

            {/* ─── 3. The phobia, named ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <p className="text-longform text-ink mb-6">
                My wife is afraid of dogs. I need to name that directly because
                most families in this situation don't. They work around it. They
                pretend it will get better. They tell the afraid person to "just
                give it time," as if time alone resolves a fear that no one has
                actually addressed. In our house, the fear was real, it was
                persistent, and it affected every interaction between my wife and
                the dog — which meant it affected the entire family's
                experience of living with one.
              </p>
              <p className="text-longform text-ink">
                I decided to treat her fear not as an obstacle to work around,
                but as a constraint the system had to account for. Not to
                "protect" her, as if she were fragile, but to give the
                least-ready person in the house a genuine say in whether and how
                this could work. If the system could hold under her fear — if
                it could make the dog's presence survivable, then manageable,
                then eventually normal for the person who wanted it least —
                then it could hold for anyone. She is the reason the system had
                to work in the hardest case.
              </p>
            </section>

            {/* ─── 4. Where the dogs went — pull-quote ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <blockquote
                className="border-l-2 border-rule pl-8 font-text italic text-text-2 text-longform"
              >
                Koudy, Milo, and Snoopy all went to families who could give them
                what we couldn&rsquo;t. All three went to friends. My kids still
                see them — at their homes, at gatherings. That is not a story I
                hide. It is the reason I believe what I believe about resetting:
                the honest answer is sometimes &ldquo;not us, not now,&rdquo; and
                choosing it well is not failure. It is the last responsible thing
                a family can do for a dog.
              </blockquote>
            </section>

            {/* ─── 5. The turn ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <p className="text-longform text-ink mb-6">
                After the third time, I stopped. Not because I gave up on the
                idea of a dog in the family, but because I stopped blaming myself
                long enough to look at what had actually happened. I had been
                approaching it the way most people do: with love, with
                enthusiasm, with the assumption that if everyone wanted it badly
                enough, it would work. It hadn't worked. Three times, it hadn't
                worked. The variable wasn't the breed, the dog, or the desire. It
                was the structure around the desire.
              </p>
              <p className="text-longform text-ink mb-6">
                So I did what I do at work. I researched. I read everything I
                could find — not about dog training, which is about the dog, but
                about family systems, decision-making under pressure, household
                operations, and why groups of people who agree on a goal still
                fail to coordinate around it. I found that the failure pattern
                in my house was not unusual. It was standard. The only thing
                unusual about it was that I had been willing to fail three times
                before I stopped and examined the cause.
              </p>
              <p className="text-longform text-ink">
                I built a family operating system. Not a training programme — the
                dog doesn't need training when he arrives. The family needs a
                system. Who holds the leash. Who feeds. Where the dog sleeps.
                What the rules are for the children. What happens when someone
                breaks them. What the afraid person's actual boundaries are —
                not aspirational ones, but real ones, written down before the
                puppy walks through the door. I tested it on my own family.
              </p>
            </section>

            {/* ─── 6. The line ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <p className="font-text text-text-2 text-h3 text-center">
                Three White Swiss Shepherds. The breed was never the problem.
              </p>
            </section>

            {/* ─── 7. Oden ─── */}
            <section className="mb-12 md:mb-20 reveal">
              <p className="text-longform text-ink mb-6">
                The fourth dog was Oden. Same breed. White Swiss Shepherd. He
                arrived into a house that was, for the first time, prepared —
                not with better intentions, but with an actual system. My wife
                knew her boundaries and they were respected. The children knew
                their rules and they were enforced. I was still at work, but the
                schedule didn't depend on me being home. The system held when I
                wasn't there. That was the difference.
              </p>
              <p className="text-longform text-ink">
                Oden stayed. He is still here. And the system that made it
                possible — the decision framework, the family operating model,
                the readiness assessment — is now what canine behaviourists and
                dog trainers use when they work with families. Not because I am
                an expert in animal behaviour. I am not. But because someone
                needed to solve the problem on the family side, and the family
                side is where almost every failure actually lives. His name is
                now on an operating system for canine behaviourists and dog
                trainers. That system is called Oden.
              </p>
            </section>

            {/* ─── 8. Close ─── */}
            <section className="mb-8 reveal">
              <p className="text-longform text-ink mb-4">
                Mohamed Abu Khadra is the founder of Oden Pet and The KnowHow
                Company. He lives in Cairo with his family and with Oden.
              </p>
              <p className="text-caption text-text-3">
                the professional record is{' '}
                <Link href="/press" className="text-accent hover:text-accent-hover transition-colors">
                  here
                </Link>
              </p>
            </section>

          </div>
        </div>
      </article>
    </>
  )
}