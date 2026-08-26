import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Press & Recognition | Mohamed Abu Khadra',
}

const pressItems = [
  {
    title: 'Most Innovative CEO 2023 (Egypt)',
    source: 'MEA Markets',
    href: '#',
  },
  {
    title: "First Egyptian case study in Philip Kotler's Marketing Management",
    source: 'Think Marketing',
    href: '#',
  },
  {
    title: 'CowPay CEO appointment',
    source: 'Zawya / Adgully / Economic Times',
    href: '#',
  },
  {
    title: 'CowPay–Visa partnership',
    source: 'Youm7',
    href: '#',
  },
  {
    title: 'Bee Egypt EGP 70M',
    source: 'Daily News Egypt',
    href: '#',
  },
  {
    title: 'Speaker, AUC Venture Lab Startup Launchpad',
    source: null,
    href: null,
  },
  {
    title: 'Two recorded talks (YouTube)',
    source: null,
    href: '#',
  },
]

export default function PressPage() {
  return (
    <section className="bg-bone section-gap">
      <div className="section-container max-w-2xl">
        <p className="section-label mb-4">VERIFIED RECORD</p>
        <h1 className="text-h2 text-ink mb-4">Press &amp; Recognition</h1>
        <p className="text-body text-text-2 mb-12">
          A selected list of independently verifiable appearances and mentions.
        </p>

        <ul className="divide-y divide-rule">
          {pressItems.map((item, i) => {
            const content = (
              <>
                <span className="font-text text-ink">{item.title}</span>
                {item.source && (
                  <>
                    {' — '}
                    <span className="text-text-2">{item.source}</span>
                  </>
                )}
              </>
            )

            return (
              <li key={i} className="py-4 first:pt-0 last:pb-0">
                {item.href ? (
                  <a
                    href={item.href}
                    className="block text-body hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <span className="block text-body">{content}</span>
                )}
              </li>
            )
          })}
        </ul>

        <p className="text-caption text-text-3 mt-12">
          Not on this site: DBA, CIM Fellow, RB College. Those are handled on
          LinkedIn only.
        </p>
      </div>
    </section>
  )
}
