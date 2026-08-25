'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Loader2, ArrowRight, AlertTriangle } from 'lucide-react'

/**
 * Marketing centre home.
 *
 * Deliberately answers the few questions worth asking daily — is publishing
 * running, is the queue about to run dry, is traffic moving — rather than
 * showing every metric available.
 */

type Publishing = {
  config: { enabled: boolean; postsPerDay: number }
  stats: { draftCount: number; publishedCount: number; publishedToday: number; daysOfRunway: number | null }
  integrations: { socialConfigured: boolean; emailConfigured: boolean; cronSecretSet: boolean }
}

type Analytics = {
  totals: { uniqueVisitors: number; pageviews: number }
  change: { pageviews: number }
}

export default function AdminHome() {
  const [publishing, setPublishing] = useState<Publishing | null>(null)
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/auto-publish').then((r) => (r.ok ? r.json() : null)),
      fetch('/api/admin/analytics?days=30').then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([p, a]) => { setPublishing(p); setAnalytics(a) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="h-5 w-5 animate-spin text-[#6B5D4F]" /></div>
  }

  const runway = publishing?.stats.daysOfRunway
  const lowRunway = typeof runway === 'number' && runway < 7 && publishing!.stats.draftCount > 0
  const setupIncomplete =
    publishing && (!publishing.integrations.cronSecretSet || !publishing.integrations.emailConfigured || !publishing.integrations.socialConfigured)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">Marketing Centre</h1>
        <p className="text-sm text-[#6B5D4F] mt-1">Publishing, content, SEO and traffic in one place.</p>
      </div>

      {(setupIncomplete || lowRunway) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-1">
          <div className="flex gap-2 text-amber-800 font-medium text-sm">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> Needs attention
          </div>
          <ul className="text-sm text-amber-800 list-disc pl-5">
            {setupIncomplete && (
              <li>
                Setup is incomplete — <Link href="/admin/publishing" className="underline">see auto-publishing</Link>.
              </li>
            )}
            {lowRunway && <li>Only {runway} day{runway === 1 ? '' : 's'} of articles left in the queue.</li>}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Tile label="Publishing" value={publishing?.config.enabled ? 'Active' : 'Paused'} />
        <Tile label="Drafts queued" value={publishing?.stats.draftCount ?? '—'} />
        <Tile label="Visitors (30d)" value={analytics?.totals.uniqueVisitors?.toLocaleString() ?? '—'} />
        <Tile label="Page views (30d)" value={analytics?.totals.pageviews?.toLocaleString() ?? '—'} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card href="/admin/publishing" title="Auto-publishing"
          body="Set the schedule, connect social posting and the newsletter, or publish the next article now." />
        <Card href="/admin/articles" title="Articles"
          body="Write and edit articles. Drafts form the queue the publisher works through." />
        <Card href="/admin/analytics" title="Website analytics"
          body="Visitors, page views, referrers and conversions, measured first-party." />
        <Card href="/admin/seo" title="Page metadata"
          body="Edit titles and descriptions per page without a redeploy." />
        <Card href="/admin/redirects" title="Redirects"
          body="Forward old URLs so changed links keep their search value." />
        <Card href="/admin/books" title="Books & more"
          body="Books, speaking, teaching, ventures, recognition, testimonials and FAQs." />
      </div>
    </div>
  )
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl border border-[#EBE5D5] p-4">
      <p className="text-xs uppercase tracking-wider text-[#6B5D4F]">{label}</p>
      <p className="font-serif text-2xl font-bold text-[#1B3B36] mt-1">{value}</p>
    </div>
  )
}

function Card({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group bg-white rounded-xl border border-[#EBE5D5] p-5 hover:border-[#C9A86A] transition-colors">
      <h2 className="font-serif text-lg font-bold text-[#1B3B36] flex items-center gap-1.5">
        {title}
        <ArrowRight className="h-4 w-4 text-[#C9A86A] opacity-0 group-hover:opacity-100 transition-opacity" />
      </h2>
      <p className="text-sm text-[#6B5D4F] mt-1 leading-relaxed">{body}</p>
    </Link>
  )
}
