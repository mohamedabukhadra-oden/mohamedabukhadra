'use client'

import { useEffect, useState } from 'react'
import { Loader2, TrendingUp, TrendingDown, Minus } from 'lucide-react'

type Analytics = {
  totals: { pageviews: number; uniqueVisitors: number; sessions: number; bounceRate: number; avgDurationSec: number }
  change: { pageviews: number; sessions: number }
  series: { date: string; sessions: number }[]
  topPages: { path: string; views: number }[]
  topReferrers: { referrer: string | null; sessions: number }[]
  devices: { device: string; sessions: number }[]
  countries: { country: string | null; sessions: number }[]
  events: { name: string; count: number }[]
}

const RANGES = [
  { days: 7, label: '7 days' },
  { days: 30, label: '30 days' },
  { days: 90, label: '90 days' },
]

function duration(sec: number): string {
  if (sec < 60) return `${sec}s`
  return `${Math.floor(sec / 60)}m ${sec % 60}s`
}

export default function AnalyticsPage() {
  const [days, setDays] = useState(30)
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/admin/analytics?days=${days}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .finally(() => setLoading(false))
  }, [days])

  if (loading && !data) {
    return <div className="flex justify-center py-20"><Loader2 className="h-5 w-5 animate-spin text-[#6B5D4F]" /></div>
  }
  if (!data) return <p className="text-sm text-[#6B5D4F]">Could not load analytics.</p>

  const peak = Math.max(1, ...data.series.map((d) => d.sessions))
  const hasData = data.totals.pageviews > 0

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">Website analytics</h1>
          <p className="text-sm text-[#6B5D4F] mt-1">
            Measured on your own server, so ad blockers don’t hide visitors the way they do with Google Analytics.
          </p>
        </div>
        <div className="flex rounded-lg border border-[#EBE5D5] bg-white overflow-hidden">
          {RANGES.map((r) => (
            <button key={r.days} onClick={() => setDays(r.days)}
              className={`px-3 py-2 text-sm ${days === r.days ? 'bg-[#1B3B36] text-white font-medium' : 'text-[#6B5D4F] hover:bg-[#F5F1E8]'}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {!hasData && (
        <div className="rounded-xl border border-[#EBE5D5] bg-white p-8 text-center">
          <p className="text-sm text-[#6B5D4F]">
            No traffic recorded yet. Data appears once the site is live and visitors accept analytics cookies.
          </p>
        </div>
      )}

      {/* Totals */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Stat label="Visitors" value={data.totals.uniqueVisitors.toLocaleString()} change={data.change.sessions} />
        <Stat label="Sessions" value={data.totals.sessions.toLocaleString()} change={data.change.sessions} />
        <Stat label="Page views" value={data.totals.pageviews.toLocaleString()} change={data.change.pageviews} />
        <Stat label="Bounce rate" value={`${data.totals.bounceRate}%`} />
        <Stat label="Avg. visit" value={duration(data.totals.avgDurationSec)} />
      </div>

      {/* Sessions over time */}
      <div className="bg-white rounded-xl border border-[#EBE5D5] p-5">
        <h2 className="font-serif text-lg font-bold text-[#1B3B36] mb-4">Sessions over time</h2>
        <div className="flex items-end gap-[2px] h-40" role="img" aria-label="Daily sessions">
          {data.series.map((d) => (
            <div key={d.date} className="flex-1 group relative min-w-0">
              <div className="bg-[#1B3B36] hover:bg-[#C9A86A] rounded-t transition-colors"
                style={{ height: `${Math.max(2, (d.sessions / peak) * 160)}px` }} />
              <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block whitespace-nowrap rounded bg-[#1B3B36] px-2 py-1 text-[11px] text-white z-10">
                {new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}: {d.sessions}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ListCard title="Top pages" rows={data.topPages.map((p) => ({ label: p.path, value: p.views }))} empty="No page views yet." />
        <ListCard title="Where visitors come from"
          rows={data.topReferrers.map((r) => ({ label: hostOf(r.referrer), value: r.sessions }))}
          empty="No referrers recorded — visitors arrived directly." />
        <ListCard title="Devices" rows={data.devices.map((d) => ({ label: d.device, value: d.sessions }))} empty="No device data yet." />
        <ListCard title="Countries" rows={data.countries.map((c) => ({ label: c.country || 'Unknown', value: c.sessions }))} empty="No country data yet." />
      </div>

      <ListCard title="Conversions" rows={data.events.map((e) => ({ label: e.name, value: e.count }))}
        empty="No conversion events recorded yet — these appear when visitors submit forms or subscribe." />
    </div>
  )
}

function hostOf(referrer: string | null): string {
  if (!referrer) return 'Direct'
  try { return new URL(referrer).hostname.replace(/^www\./, '') } catch { return referrer }
}

function Stat({ label, value, change }: { label: string; value: string; change?: number }) {
  const Icon = change === undefined ? null : change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus
  const tone = change === undefined ? '' : change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-[#6B5D4F]'

  return (
    <div className="bg-white rounded-xl border border-[#EBE5D5] p-4">
      <p className="text-xs uppercase tracking-wider text-[#6B5D4F]">{label}</p>
      <p className="font-serif text-2xl font-bold text-[#1B3B36] mt-1">{value}</p>
      {Icon && (
        <p className={`text-xs mt-1 inline-flex items-center gap-1 ${tone}`}>
          <Icon className="h-3 w-3" />{change! > 0 ? '+' : ''}{change}% vs previous
        </p>
      )}
    </div>
  )
}

function ListCard({ title, rows, empty }: { title: string; rows: { label: string; value: number }[]; empty: string }) {
  const max = Math.max(1, ...rows.map((r) => r.value))
  return (
    <div className="bg-white rounded-xl border border-[#EBE5D5] p-5">
      <h2 className="font-serif text-lg font-bold text-[#1B3B36] mb-3">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-[#6B5D4F]">{empty}</p>
      ) : (
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.label}>
              <div className="flex justify-between text-sm mb-0.5 gap-3">
                <span className="text-[#2A2520] truncate">{r.label}</span>
                <span className="text-[#6B5D4F] shrink-0">{r.value.toLocaleString()}</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#F5F1E8] overflow-hidden">
                <div className="h-full bg-[#C9A86A] rounded-full" style={{ width: `${(r.value / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
