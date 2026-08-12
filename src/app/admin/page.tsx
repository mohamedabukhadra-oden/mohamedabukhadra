'use client'

import { useState, useEffect, useCallback } from 'react'
import { Loader2, Plus, Pencil, Trash2, Eye, LogOut, BookOpen, CheckCircle2, FileText } from 'lucide-react'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  status: string
  featured: boolean
  publishedAt: string | null
  createdAt: string
}

const CATEGORIES = [
  { value: 'family-systems', label: 'Family Systems & Dog Ownership' },
  { value: 'business-strategy', label: 'Business & Strategy' },
  { value: 'marketing-growth', label: 'Marketing & Growth' },
]

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Article | null>(null)
  const [showEditor, setShowEditor] = useState(false)

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/articles')
      const data = await res.json()
      setArticles(data)
    } catch {
      console.error('Failed to fetch articles')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (loggedIn) fetchArticles()
  }, [loggedIn, fetchArticles])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok) {
        setLoggedIn(true)
      } else {
        setLoginError(data.error || 'Login failed')
      }
    } catch {
      setLoginError('Network error')
    } finally {
      setLoginLoading(false)
    }
  }

  const handleSave = async (article: Partial<Article>) => {
    const method = article.id ? 'PUT' : 'POST'
    const url = article.id ? `/api/admin/articles/${article.id}` : '/api/admin/articles'
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      })
      if (res.ok) {
        setShowEditor(false)
        setEditing(null)
        fetchArticles()
      }
    } catch {
      console.error('Save failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return
    try {
      await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
      fetchArticles()
    } catch {
      console.error('Delete failed')
    }
  }

  const handleTogglePublish = async (article: Article) => {
    const newStatus = article.status === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED'
    await fetch(`/api/admin/articles/${article.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...article, status: newStatus }),
    })
    fetchArticles()
  }

  // Login screen
  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F1E8] p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <BookOpen className="h-10 w-10 text-[#1B3B36] mx-auto mb-3" />
            <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">Admin Panel</h1>
            <p className="text-sm text-[#6B5D4F] mt-1">Mohamed Abu Khadra — Article Management</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-xl border border-[#EBE5D5] p-6 space-y-4">
            {loginError && <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">{loginError}</div>}
            <div>
              <label className="text-sm font-medium text-[#1B3B36] block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm" placeholder="admin@example.com" />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1B3B36] block mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm" placeholder="••••••••" />
            </div>
            <button type="submit" disabled={loginLoading} className="w-full h-11 rounded-lg bg-[#1B3B36] text-white font-semibold hover:bg-[#2D5249] disabled:opacity-50 flex items-center justify-center gap-2">
              {loginLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sign In'}
            </button>
            <p className="text-xs text-[#6B5D4F] text-center">First login creates the admin account.</p>
          </form>
        </div>
      </div>
    )
  }

  // Editor modal
  if (showEditor) {
    return <ArticleEditor article={editing} onSave={handleSave} onCancel={() => { setShowEditor(false); setEditing(null) }} />
  }

  // Article list
  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">Articles</h1>
            <p className="text-sm text-[#6B5D4F]">{articles.length} total · {articles.filter(a => a.status === 'PUBLISHED').length} published</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setEditing(null); setShowEditor(true) }} className="inline-flex items-center gap-1.5 bg-[#1B3B36] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#2D5249]">
              <Plus className="h-4 w-4" /> New Article
            </button>
            <button onClick={() => setLoggedIn(false)} className="inline-flex items-center gap-1.5 text-sm text-[#6B5D4F] hover:text-[#1B3B36] px-3 py-2">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-[#1B3B36]" /></div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-10 w-10 text-[#EBE5D5] mx-auto mb-3" />
            <p className="text-[#6B5D4F]">No articles yet. Click "New Article" to create one.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map(article => (
              <div key={article.id} className="bg-white rounded-lg border border-[#EBE5D5] p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      article.status === 'PUBLISHED' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {article.status === 'PUBLISHED' && <CheckCircle2 className="h-3 w-3" />}
                      {article.status}
                    </span>
                    <span className="text-xs text-[#C9A86A]">{CATEGORIES.find(c => c.value === article.category)?.label || article.category}</span>
                    {article.featured && <span className="text-xs text-[#722F37]">★ Featured</span>}
                  </div>
                  <h3 className="font-medium text-[#1B3B36] truncate">{article.title}</h3>
                  <p className="text-xs text-[#6B5D4F] truncate">/{article.slug}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => handleTogglePublish(article)} className="p-2 rounded-lg hover:bg-[#EBE5D5] text-[#6B5D4F]" title={article.status === 'PUBLISHED' ? 'Unpublish' : 'Publish'}>
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => { setEditing(article); setShowEditor(true) }} className="p-2 rounded-lg hover:bg-[#EBE5D5] text-[#6B5D4F]" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Article Editor ──────────────────────────────────────────

function ArticleEditor({ article, onSave, onCancel }: {
  article: Article | null
  onSave: (article: Partial<Article>) => void
  onCancel: () => void
}) {
  const [title, setTitle] = useState(article?.title || '')
  const [slug, setSlug] = useState(article?.slug || '')
  const [excerpt, setExcerpt] = useState(article?.excerpt || '')
  const [content, setContent] = useState(article?.content || '')
  const [category, setCategory] = useState(article?.category || 'family-systems')
  const [tags, setTags] = useState(article?.tags || '')
  const [status, setStatus] = useState(article?.status || 'DRAFT')
  const [featured, setFeatured] = useState(article?.featured || false)
  const [metaDescription, setMetaDescription] = useState(article?.metaDescription || '')

  const handleSlugFromTitle = (t: string) => {
    setTitle(t)
    if (!article) {
      setSlug(t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-serif text-2xl font-bold text-[#1B3B36]">{article ? 'Edit Article' : 'New Article'}</h1>
          <button onClick={onCancel} className="text-sm text-[#6B5D4F] hover:text-[#1B3B36]">← Cancel</button>
        </div>

        <div className="bg-white rounded-xl border border-[#EBE5D5] p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-[#1B3B36] block mb-1">Title</label>
            <input type="text" value={title} onChange={e => handleSlugFromTitle(e.target.value)} className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm" placeholder="Are We Ready for a Dog?" />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1B3B36] block mb-1">Slug</label>
            <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm font-mono" placeholder="are-we-ready-for-a-dog" />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1B3B36] block mb-1">Excerpt</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full rounded-lg border border-[#EBE5D5] px-3 py-2 text-sm" placeholder="Short summary shown in article listings..." />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1B3B36] block mb-1">Content (Markdown)</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={20} className="w-full rounded-lg border border-[#EBE5D5] px-3 py-2 text-sm font-mono" placeholder="# Heading&#10;&#10;Write your article in Markdown..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#1B3B36] block mb-1">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value)} className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm">
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#1B3B36] block mb-1">Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="UNPUBLISHED">Unpublished</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-[#1B3B36] block mb-1">Tags (comma-separated)</label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm" placeholder="puppy, family, readiness" />
          </div>
          <div>
            <label className="text-sm font-medium text-[#1B3B36] block mb-1">Meta Description (SEO)</label>
            <input type="text" value={metaDescription} onChange={e => setMetaDescription(e.target.value)} className="w-full h-11 rounded-lg border border-[#EBE5D5] px-3 text-sm" placeholder="Short SEO description (150-160 chars)" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)} className="h-4 w-4" />
            <label htmlFor="featured" className="text-sm text-[#1B3B36]">Featured article</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-[#EBE5D5]">
            <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-[#6B5D4F] hover:text-[#1B3B36]">Cancel</button>
            <button onClick={() => onSave({ id: article?.id, title, slug, excerpt, content, category, tags, status, featured, metaDescription })} className="px-6 py-2 bg-[#1B3B36] text-white text-sm font-semibold rounded-lg hover:bg-[#2D5249]">
              {article ? 'Update' : 'Create'} Article
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
