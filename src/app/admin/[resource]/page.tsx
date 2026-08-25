'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, notFound } from 'next/navigation'
import { Loader2, Plus, Pencil, Trash2, Search, ArrowLeft } from 'lucide-react'
import { findResource, type FieldDef, type ResourceDef } from '@/lib/admin/resources'

/**
 * One screen for every content type.
 *
 * The list, the form and the validation all come from the resource registry, so
 * a new content type needs a config entry rather than another admin page.
 */

type Row = Record<string, unknown> & { id: string }

export default function ResourcePage() {
  const params = useParams()
  const slug = String(params.resource)
  const resource = findResource(slug)

  // /admin/publishing and /admin/analytics are static routes and match first;
  // anything else that isn't a registered resource is genuinely a 404.
  if (!resource) notFound()

  return <ResourceScreen resource={resource} />
}

function ResourceScreen({ resource }: { resource: ResourceDef }) {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Row | null>(null)
  const [creating, setCreating] = useState(false)

  const load = useCallback(async (q = '') => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/resources/${resource.slug}?q=${encodeURIComponent(q)}`)
      if (res.ok) {
        const data = await res.json()
        setRows(data.items || [])
      }
    } finally {
      setLoading(false)
    }
  }, [resource.slug])

  useEffect(() => { load() }, [load])

  // Debounce so typing doesn't fire a request per keystroke.
  useEffect(() => {
    const t = setTimeout(() => load(query), 300)
    return () => clearTimeout(t)
  }, [query, load])

  const remove = async (row: Row) => {
    const label = String(row[resource.titleField] ?? 'this item')
    if (!confirm(`Delete “${label}”? This cannot be undone.`)) return
    await fetch(`/api/admin/resources/${resource.slug}/${row.id}`, { method: 'DELETE' })
    load(query)
  }

  if (editing || creating) {
    return (
      <ResourceForm
        resource={resource}
        row={editing}
        onCancel={() => { setEditing(null); setCreating(false) }}
        onSaved={() => { setEditing(null); setCreating(false); load(query) }}
      />
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">{resource.label}</h1>
          <p className="text-sm text-[#6B5D4F] mt-1">{rows.length} item{rows.length === 1 ? '' : 's'}</p>
        </div>
        <button onClick={() => setCreating(true)}
          className="inline-flex items-center gap-1.5 bg-[#1B3B36] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#2D5249]">
          <Plus className="h-4 w-4" /> New {resource.labelSingular.toLowerCase()}
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B5D4F]" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${resource.label.toLowerCase()}…`}
          className="w-full h-10 rounded-lg border border-[#EBE5D5] bg-white pl-9 pr-3 text-sm" />
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-5 w-5 animate-spin text-[#6B5D4F]" /></div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EBE5D5] p-10 text-center">
          <p className="text-[#6B5D4F] text-sm">
            {query ? 'Nothing matched that search.' : `No ${resource.label.toLowerCase()} yet.`}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#EBE5D5] divide-y divide-[#EBE5D5]">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center gap-3 p-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#1B3B36] truncate">
                  {String(row[resource.titleField] ?? '(untitled)')}
                </p>
                <p className="text-xs text-[#6B5D4F] mt-0.5 flex flex-wrap gap-x-3">
                  {'status' in row && typeof row.status === 'string' && <span>{row.status}</span>}
                  {'published' in row && <span>{row.published ? 'Published' : 'Draft'}</span>}
                  {'category' in row && typeof row.category === 'string' && <span>{row.category}</span>}
                  {'toPath' in row && <span>→ {String(row.toPath)}</span>}
                </p>
              </div>
              <button onClick={() => setEditing(row)} className="p-2 text-[#6B5D4F] hover:text-[#1B3B36]" aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(row)} className="p-2 text-[#6B5D4F] hover:text-red-600" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ResourceForm({
  resource, row, onCancel, onSaved,
}: {
  resource: ResourceDef
  row: Row | null
  onCancel: () => void
  onSaved: () => void
}) {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {}
    for (const f of resource.fields) {
      const existing = row?.[f.name]
      if (f.type === 'boolean') initial[f.name] = existing ?? false
      else if (f.type === 'date') initial[f.name] = existing ? String(existing).slice(0, 10) : ''
      else initial[f.name] = existing ?? (f.type === 'select' && f.options ? f.options[0] : '')
    }
    return initial
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const url = row
        ? `/api/admin/resources/${resource.slug}/${row.id}`
        : `/api/admin/resources/${resource.slug}`
      const res = await fetch(url, {
        method: row ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (res.ok) onSaved()
      else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Could not save.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <button type="button" onClick={onCancel}
        className="inline-flex items-center gap-1 text-sm text-[#6B5D4F] hover:text-[#1B3B36]">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to {resource.label.toLowerCase()}
      </button>

      <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">
        {row ? `Edit ${resource.labelSingular.toLowerCase()}` : `New ${resource.labelSingular.toLowerCase()}`}
      </h1>

      {error && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">{error}</div>}

      <div className="bg-white rounded-xl border border-[#EBE5D5] p-5 space-y-4">
        {resource.fields.map((field) => (
          <Field key={field.name} field={field} value={values[field.name]}
            onChange={(v) => setValues((prev) => ({ ...prev, [field.name]: v }))} />
        ))}
      </div>

      <div className="flex gap-2">
        <button type="submit" disabled={saving}
          className="inline-flex items-center gap-2 bg-[#1B3B36] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#2D5249] disabled:opacity-50">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
        </button>
        <button type="button" onClick={onCancel}
          className="text-sm text-[#6B5D4F] px-4 py-2 rounded-lg hover:bg-white">Cancel</button>
      </div>
    </form>
  )
}

function Field({ field, value, onChange }: { field: FieldDef; value: unknown; onChange: (v: unknown) => void }) {
  const base = 'w-full rounded-lg border border-[#EBE5D5] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A86A]'

  if (field.type === 'boolean') {
    return (
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#1B3B36]" />
        <span>
          <span className="block text-sm font-medium text-[#2A2520]">{field.label}</span>
          {field.help && <span className="block text-xs text-[#6B5D4F]">{field.help}</span>}
        </span>
      </label>
    )
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[#2A2520] mb-1">
        {field.label}{field.required && <span className="text-[#C9A86A]"> *</span>}
      </label>

      {field.type === 'select' ? (
        <select value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={`${base} h-10`}>
          {field.options?.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : field.type === 'textarea' ? (
        <textarea value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} rows={3} className={`${base} py-2`} />
      ) : field.type === 'markdown' ? (
        <textarea value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} rows={16}
          className={`${base} py-2 font-mono text-xs leading-relaxed`} />
      ) : (
        <input
          type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : field.type === 'url' ? 'url' : 'text'}
          value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} className={`${base} h-10`} />
      )}

      {field.help && <p className="text-xs text-[#6B5D4F] mt-1">{field.help}</p>}
    </div>
  )
}
