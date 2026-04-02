import type { Field } from 'payload'

/* ─── Slug ──────────────────────────────────────────────────────────────
   Auto-generated from the source field on create. Editors can override.
   Added to sidebar so it stays out of the main edit area.
────────────────────────────────────────────────────────────────────────── */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'URL-safe identifier. Auto-generated from the title — override if needed.',
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData, operation }) => {
        // Only auto-generate on create, or when the slug is blank
        if (operation === 'create' || !value) {
          const source = siblingData[sourceField]
          if (typeof source === 'string') {
            return source
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
          }
        }
        return value
      },
    ],
  },
})

/* ─── SEO Group ─────────────────────────────────────────────────────────
   Reusable collapsible SEO block for any collection that needs it.
────────────────────────────────────────────────────────────────────────── */
export const seoGroup: Field = {
  type: 'collapsible',
  label: 'SEO / Social',
  admin: {
    description: 'Override meta tags for this document.',
    initCollapsed: true,
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      admin: { description: 'Falls back to the document title if blank.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      admin: { description: 'Recommended: 120–160 characters.' },
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media' as const,
      admin: { description: 'Open Graph / social share image (1200×630 px recommended).' },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Exclude this page from search engines.' },
    },
  ],
}

/* ─── Status badge (sidebar) ────────────────────────────────────────────
   Quick visual "status" indicator added to the sidebar of every versioned collection.
────────────────────────────────────────────────────────────────────────── */
export const statusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  admin: { position: 'sidebar' },
  options: [
    { label: '🟡 Draft',     value: 'draft' },
    { label: '👀 In Review', value: 'review' },
    { label: '✅ Published', value: 'published' },
    { label: '🗄️ Archived',  value: 'archived' },
  ],
}

/* ─── Bilingual text convenience ────────────────────────────────────────
   A localized text field — just adds `localized: true` as a shorthand.
────────────────────────────────────────────────────────────────────────── */
export const localText = (name: string, label?: string, required = false): Field => ({
  name,
  type: 'text',
  label: label ?? name,
  required,
  localized: true,
})

export const localTextarea = (name: string, label?: string): Field => ({
  name,
  type: 'textarea',
  label: label ?? name,
  localized: true,
})
