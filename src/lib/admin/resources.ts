/**
 * Resource registry for the marketing centre admin.
 *
 * One entry per manageable content type. The admin API and the admin UI are both
 * generated from this — adding a new content type means adding a row here, not
 * writing another CRUD route.
 *
 * `fields` is an allowlist. Only these columns can be written through the API,
 * which is what stops a crafted request from setting columns the UI never
 * exposes (ids, timestamps, or anything added to the schema later).
 */

export type FieldType = 'text' | 'textarea' | 'markdown' | 'number' | 'boolean' | 'select' | 'date' | 'url' | 'image'

export type FieldDef = {
  name: string
  label: string
  type: FieldType
  required?: boolean
  options?: string[] // for select
  help?: string
}

export type ResourceDef = {
  /** Prisma model accessor, e.g. db.book -> 'book' */
  model: string
  /** URL segment: /admin/<slug>, /api/admin/<slug> */
  slug: string
  label: string
  labelSingular: string
  group: 'Content' | 'SEO' | 'Marketing'
  /** Column shown as the row title in list views. */
  titleField: string
  /** Columns searched by the ?q= parameter. */
  searchFields: string[]
  defaultOrderBy: Record<string, 'asc' | 'desc'>
  fields: FieldDef[]
}

const PUBLISHED: FieldDef = { name: 'published', label: 'Published', type: 'boolean' }
const ORDER: FieldDef = { name: 'order', label: 'Sort order', type: 'number', help: 'Lower numbers appear first.' }

export const RESOURCES: ResourceDef[] = [
  {
    model: 'article',
    slug: 'articles',
    label: 'Articles',
    labelSingular: 'Article',
    group: 'Content',
    titleField: 'title',
    searchFields: ['title', 'excerpt', 'category', 'tags'],
    defaultOrderBy: { createdAt: 'desc' },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true, help: 'The URL: /insights/<slug>. Changing this breaks existing links.' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', help: 'Shown in listings, social previews and the newsletter.' },
      { name: 'content', label: 'Content', type: 'markdown', required: true },
      { name: 'category', label: 'Category', type: 'select', options: ['dogs-family', 'business-strategy', 'marketing-growth', 'writing-publishing', 'contrarian-thinking', 'life-reflection', 'behind-the-scenes'] },
      { name: 'tags', label: 'Tags', type: 'text', help: 'Comma-separated.' },
      { name: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED', 'UNPUBLISHED'], help: 'Drafts are the queue the auto-publisher works through.' },
      { name: 'featured', label: 'Featured', type: 'boolean' },
      { name: 'coverImage', label: 'Cover image', type: 'image' },
      { name: 'ogImage', label: 'Social share image', type: 'image' },
      { name: 'metaDescription', label: 'Meta description', type: 'textarea', help: 'Falls back to the excerpt when empty.' },
    ],
  },
  {
    model: 'book',
    slug: 'books',
    label: 'Books',
    labelSingular: 'Book',
    group: 'Content',
    titleField: 'title',
    searchFields: ['title', 'subtitle', 'description'],
    defaultOrderBy: { order: 'asc' },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'slug', label: 'Slug', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'proposition', label: 'Proposition', type: 'textarea' },
      { name: 'whyExists', label: 'Why it exists', type: 'textarea' },
      { name: 'whoFor', label: 'Who it is for', type: 'textarea' },
      { name: 'coreIdeas', label: 'Core ideas', type: 'textarea' },
      { name: 'whatReaderLearns', label: 'What the reader learns', type: 'textarea' },
      { name: 'keyFrameworks', label: 'Key frameworks', type: 'textarea' },
      { name: 'excerpts', label: 'Excerpts', type: 'textarea' },
      { name: 'coverImage', label: 'Cover image', type: 'image' },
      { name: 'buyLink', label: 'Buy link', type: 'url' },
      { name: 'themeColors', label: 'Theme colours (JSON)', type: 'textarea', help: '{"primary":"#1B3B36","accent":"#C9A86A"}' },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    model: 'speakingEvent',
    slug: 'speaking',
    label: 'Speaking',
    labelSingular: 'Speaking event',
    group: 'Content',
    titleField: 'title',
    searchFields: ['title', 'audience', 'location', 'description'],
    defaultOrderBy: { date: 'desc' },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'eventType', label: 'Type', type: 'select', options: ['keynote', 'workshop', 'panel', 'lecture', 'podcast'], required: true },
      { name: 'audience', label: 'Audience', type: 'text' },
      { name: 'location', label: 'Location', type: 'text' },
      { name: 'date', label: 'Date', type: 'date' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'videoLink', label: 'Video link', type: 'url' },
      PUBLISHED,
    ],
  },
  {
    model: 'teachingEntry',
    slug: 'teaching',
    label: 'Teaching',
    labelSingular: 'Teaching entry',
    group: 'Content',
    titleField: 'subject',
    searchFields: ['institution', 'subject', 'description'],
    defaultOrderBy: { createdAt: 'desc' },
    fields: [
      { name: 'institution', label: 'Institution', type: 'text', required: true },
      { name: 'subject', label: 'Subject', type: 'text', required: true },
      { name: 'level', label: 'Level', type: 'text' },
      { name: 'period', label: 'Period', type: 'text', help: 'e.g. 2021–2024' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      PUBLISHED,
    ],
  },
  {
    model: 'consultingHighlight',
    slug: 'consulting',
    label: 'Consulting',
    labelSingular: 'Consulting highlight',
    group: 'Content',
    titleField: 'title',
    searchFields: ['title', 'client', 'description'],
    defaultOrderBy: { order: 'asc' },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'client', label: 'Client', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'recognition', label: 'Recognition', type: 'text' },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    model: 'venture',
    slug: 'ventures',
    label: 'Ventures',
    labelSingular: 'Venture',
    group: 'Content',
    titleField: 'name',
    searchFields: ['name', 'tagline', 'description'],
    defaultOrderBy: { order: 'asc' },
    fields: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'role', label: 'Your role', type: 'text' },
      { name: 'website', label: 'Website', type: 'url' },
      { name: 'logoUrl', label: 'Logo', type: 'image' },
      { name: 'current', label: 'Current', type: 'boolean' },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    model: 'recognition',
    slug: 'recognition',
    label: 'Recognition',
    labelSingular: 'Recognition',
    group: 'Content',
    titleField: 'title',
    searchFields: ['title', 'organization', 'description'],
    defaultOrderBy: { order: 'asc' },
    fields: [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'organization', label: 'Organisation', type: 'text' },
      { name: 'year', label: 'Year', type: 'text' },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    model: 'testimonial',
    slug: 'testimonials',
    label: 'Testimonials',
    labelSingular: 'Testimonial',
    group: 'Content',
    titleField: 'author',
    searchFields: ['author', 'company', 'content'],
    defaultOrderBy: { order: 'asc' },
    fields: [
      { name: 'author', label: 'Author', type: 'text', required: true },
      { name: 'role', label: 'Role', type: 'text' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'content', label: 'Quote', type: 'textarea', required: true },
      { name: 'rating', label: 'Rating', type: 'number' },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    model: 'faq',
    slug: 'faqs',
    label: 'FAQs',
    labelSingular: 'FAQ',
    group: 'Content',
    titleField: 'question',
    searchFields: ['question', 'answer', 'category'],
    defaultOrderBy: { order: 'asc' },
    fields: [
      { name: 'category', label: 'Category', type: 'text' },
      { name: 'question', label: 'Question', type: 'text', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    model: 'seoMeta',
    slug: 'seo',
    label: 'SEO metadata',
    labelSingular: 'SEO entry',
    group: 'SEO',
    titleField: 'path',
    searchFields: ['path', 'title', 'description'],
    defaultOrderBy: { path: 'asc' },
    fields: [
      { name: 'path', label: 'Path', type: 'text', required: true, help: 'Exactly as it appears in the URL, e.g. /books' },
      { name: 'title', label: 'Title tag', type: 'text', help: 'Aim for under 60 characters.' },
      { name: 'description', label: 'Meta description', type: 'textarea', help: 'Aim for 140–160 characters.' },
      { name: 'ogImage', label: 'Social share image', type: 'image' },
      { name: 'keywords', label: 'Keywords', type: 'text', help: 'Comma-separated. Ignored by Google; kept for other engines.' },
      { name: 'jsonLd', label: 'JSON-LD override', type: 'textarea' },
      { name: 'noIndex', label: 'Hide from search engines', type: 'boolean', help: 'Adds noindex. Use for thin or duplicate pages.' },
    ],
  },
  {
    model: 'redirect',
    slug: 'redirects',
    label: 'Redirects',
    labelSingular: 'Redirect',
    group: 'SEO',
    titleField: 'fromPath',
    searchFields: ['fromPath', 'toPath'],
    defaultOrderBy: { createdAt: 'desc' },
    fields: [
      { name: 'fromPath', label: 'From', type: 'text', required: true, help: 'Old path, e.g. /old-article' },
      { name: 'toPath', label: 'To', type: 'text', required: true, help: 'New path or full URL.' },
      { name: 'status', label: 'Type', type: 'select', options: ['301', '302'], help: '301 permanent passes SEO value. 302 is temporary.' },
      { name: 'enabled', label: 'Enabled', type: 'boolean' },
    ],
  },
]

export function findResource(slug: string): ResourceDef | undefined {
  return RESOURCES.find((r) => r.slug === slug)
}

/** Strip anything not in the resource's allowlist, and coerce to the declared type. */
export function pickAllowedFields(resource: ResourceDef, body: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {}

  for (const field of resource.fields) {
    if (!(field.name in body)) continue
    const raw = body[field.name]

    switch (field.type) {
      case 'number':
        // 'status' on Redirect is a select of numeric strings.
        out[field.name] = raw === '' || raw === null ? 0 : Number(raw)
        break
      case 'boolean':
        out[field.name] = Boolean(raw)
        break
      case 'date':
        out[field.name] = raw ? new Date(raw as string) : null
        break
      case 'select':
        // Reject values outside the declared options rather than storing junk.
        if (field.options && !field.options.includes(String(raw))) continue
        out[field.name] = field.name === 'status' && resource.model === 'redirect' ? Number(raw) : raw
        break
      default:
        out[field.name] = raw === '' ? null : raw
    }
  }

  return out
}
