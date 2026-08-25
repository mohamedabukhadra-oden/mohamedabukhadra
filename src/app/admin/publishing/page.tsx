'use client'

import { useEffect, useState, useCallback } from 'react'
import { Loader2, Send, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react'

type Config = {
  id: string
  enabled: boolean
  postsPerDay: number
  makeWebhookUrl: string
  siteBaseUrl: string
  hashtagSuffix: string
  notifySubscribers: boolean
  lastRunAt: string | null
}

type Run = {
  id: string
  articleTitle: string
  articleSlug: string
  publishedAt: string
  webhookSent: boolean
  emailsSent: number
  error: string | null
  triggeredBy: string
}

type Payload = {
  config: Config
  stats: { draftCount: number; publishedCount: number; publishedToday: number; daysOfRunway: number | null }
  integrations: { socialConfigured: boolean; emailConfigured: boolean; cronSecretSet: boolean }
  recentRuns: Run[]
}

export default function PublishingPage() {
  const [data, setData] = useState<Payload | null>(null)
  const [form, setForm] = useState<Config | null>(null)
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [message, setMessage] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/auto-publish')
    if (!res.ok) return
    const payload: Payload = await res.json()
    setData(payload)
    setForm(payload.config)
  }, [])

  useEffect(() => { load() }, [load])

  const save = async () => {
    if (!form) return
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/auto-publish', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) { setMessage({ kind: 'ok', text: 'Settings saved.' }); await load() }
      else setMessage({ kind: 'err', text: 'Could not save settings.' })
    } finally {
      setSaving(false)
    }
  }

  const publishNow = async () => {
    if (!confirm('Publish the next queued article now? It will go live, post to social and email subscribers.')) return
    setPublishing(true)
    setMessage(null)
    try {
      const res = await fetch('/api/admin/auto-publish', { method: 'POST' })
      const result = await res.json().catch(() => ({}))
      setMessage(
        res.ok && result.status === 'published'
          ? { kind: 'ok', text: result.message + (result.error ? ` (${result.error})` : '') }
          : { kind: 'err', text: result.message || result.error || 'Nothing was published.' }
      )
      await load()
    } finally {
      setPublishing(false)
    }
  }

  if (!data || !form) {
    return <div className="flex justify-center py-20"><Loader2 className="h-5 w-5 animate-spin text-[#6B5D4F]" /></div>
  }

  const { stats, integrations } = data
  const warnings = [
    !integrations.cronSecretSet && 'CRON_SECRET is not set — scheduled publishing cannot run. Add it in Vercel.',
    !integrations.socialConfigured && 'No Make.com webhook — articles publish but are not posted to social.',
    !integrations.emailConfigured && 'Resend is not configured — articles publish but subscribers are not emailed.',
    stats.draftCount === 0 && 'The queue is empty. Nothing will publish until you add drafts.',
  ].filter(Boolean) as string[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">Auto-publishing</h1>
        <p className="text-sm text-[#6B5D4F] mt-1">
          Publishes queued drafts on a schedule, posts them to social, and emails your subscribers.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Drafts queued', value: stats.draftCount },
          { label: 'Published today', value: `${stats.publishedToday} / ${form.postsPerDay}` },
          { label: 'Published total', value: stats.publishedCount },
          { label: 'Days of runway', value: stats.daysOfRunway ?? '—' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#EBE5D5] p-4">
            <p className="text-xs uppercase tracking-wider text-[#6B5D4F]">{s.label}</p>
            <p className="font-serif text-2xl font-bold text-[#1B3B36] mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex gap-2 text-amber-800 font-medium text-sm mb-2">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" /> Needs attention
          </div>
          <ul className="space-y-1 text-sm text-amber-800 list-disc pl-5">
            {warnings.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      )}

      {message && (
        <div className={`rounded-lg px-4 py-3 text-sm ${
          message.kind === 'ok' ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-red-50 border border-red-200 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {/* Settings */}
      <div className="bg-white rounded-xl border border-[#EBE5D5] p-5 space-y-5">
        <h2 className="font-serif text-lg font-bold text-[#1B3B36]">Settings</h2>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
            className="mt-1 h-4 w-4 accent-[#1B3B36]" />
          <span>
            <span className="block text-sm font-medium text-[#2A2520]">Scheduled publishing active</span>
            <span className="block text-xs text-[#6B5D4F]">Turn off to pause without losing the queue.</span>
          </span>
        </label>

        <div>
          <label className="block text-sm font-medium text-[#2A2520] mb-1">Articles per day</label>
          <input type="number" min={0} max={24} value={form.postsPerDay}
            onChange={(e) => setForm({ ...form, postsPerDay: Number(e.target.value) })}
            className="w-28 h-10 rounded-lg border border-[#EBE5D5] px-3 text-sm" />
          <p className="text-xs text-[#6B5D4F] mt-1">
            The cron runs twice daily. Note that Vercel Hobby plans allow only one cron run per day.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2A2520] mb-1">Make.com webhook URL</label>
          <input type="url" value={form.makeWebhookUrl} placeholder="https://hook.eu2.make.com/…"
            onChange={(e) => setForm({ ...form, makeWebhookUrl: e.target.value })}
            className="w-full h-10 rounded-lg border border-[#EBE5D5] px-3 text-sm" />
          <p className="text-xs text-[#6B5D4F] mt-1">Where published articles are sent for posting to LinkedIn, X and Facebook.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2A2520] mb-1">Site address</label>
          <input type="url" value={form.siteBaseUrl}
            onChange={(e) => setForm({ ...form, siteBaseUrl: e.target.value })}
            className="w-full h-10 rounded-lg border border-[#EBE5D5] px-3 text-sm" />
          <p className="text-xs text-[#6B5D4F] mt-1">Used to build article links. Must match your live domain exactly, including www if you use it.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#2A2520] mb-1">Hashtags</label>
          <input type="text" value={form.hashtagSuffix} placeholder="#Leadership #Strategy"
            onChange={(e) => setForm({ ...form, hashtagSuffix: e.target.value })}
            className="w-full h-10 rounded-lg border border-[#EBE5D5] px-3 text-sm" />
          <p className="text-xs text-[#6B5D4F] mt-1">Appended to every social post.</p>
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={form.notifySubscribers}
            onChange={(e) => setForm({ ...form, notifySubscribers: e.target.checked })}
            className="mt-1 h-4 w-4 accent-[#1B3B36]" />
          <span>
            <span className="block text-sm font-medium text-[#2A2520]">Email subscribers on publish</span>
            <span className="block text-xs text-[#6B5D4F]">Sends the new article to your newsletter list.</span>
          </span>
        </label>

        <div className="flex flex-wrap gap-2 pt-1">
          <button onClick={save} disabled={saving}
            className="inline-flex items-center gap-2 bg-[#1B3B36] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#2D5249] disabled:opacity-50">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save settings
          </button>
          <button onClick={publishNow} disabled={publishing || stats.draftCount === 0}
            className="inline-flex items-center gap-2 border border-[#1B3B36] text-[#1B3B36] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#F5F1E8] disabled:opacity-40">
            {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Publish next now
          </button>
        </div>
      </div>

      {/* Log */}
      <div className="bg-white rounded-xl border border-[#EBE5D5] overflow-hidden">
        <h2 className="font-serif text-lg font-bold text-[#1B3B36] p-5 pb-3">Recent runs</h2>
        {data.recentRuns.length === 0 ? (
          <p className="px-5 pb-5 text-sm text-[#6B5D4F]">Nothing published yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F5F1E8] text-[#6B5D4F] text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left font-medium px-5 py-2">Article</th>
                  <th className="text-left font-medium px-3 py-2">When</th>
                  <th className="text-left font-medium px-3 py-2">Social</th>
                  <th className="text-left font-medium px-3 py-2">Emails</th>
                  <th className="text-left font-medium px-5 py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {data.recentRuns.map((run) => (
                  <tr key={run.id} className="border-t border-[#EBE5D5]">
                    <td className="px-5 py-2.5 text-[#2A2520]">{run.articleTitle}</td>
                    <td className="px-3 py-2.5 text-[#6B5D4F] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(run.publishedAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      {run.webhookSent
                        ? <CheckCircle2 className="h-4 w-4 text-green-600" />
                        : <XCircle className="h-4 w-4 text-[#C4BCA8]" />}
                    </td>
                    <td className="px-3 py-2.5 text-[#6B5D4F]">{run.emailsSent}</td>
                    <td className="px-5 py-2.5">
                      {run.error
                        ? <span className="text-red-700 text-xs">{run.error}</span>
                        : <span className="text-green-700 text-xs">OK</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
