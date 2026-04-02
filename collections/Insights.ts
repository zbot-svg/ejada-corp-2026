import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublishedOrLoggedIn } from '../access'
import { slugField, seoGroup, statusField } from '../fields'

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedAt', 'updatedAt'],
    group: 'Content',
    description: 'Articles, whitepapers, event recaps, and news. Supports drafts and versioning.',
    preview: (doc) => {
      if (doc?.slug) return `${process.env.NEXT_PUBLIC_SERVER_URL}/insights/${doc.slug}`
      return null
    },
  },
  versions: {
    drafts: {
      autosave: { interval: 3000 },
    },
    maxPerDoc: 30,
  },
  access: {
    read:   isPublishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    // ── Meta ────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    slugField('title'),
    statusField,
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Leave blank to use the creation date.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      admin: { position: 'sidebar' },
      options: [
        { label: '📰 News',        value: 'news' },
        { label: '📖 Whitepaper',  value: 'whitepaper' },
        { label: '📅 Event',       value: 'event' },
        { label: '💡 Insight',     value: 'insight' },
        { label: '📊 Case Study',  value: 'case-study' },
      ],
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes.',
      },
    },

    // ── Cover ────────────────────────────────────────────────────────
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Cover image for the article card and hero (recommended: 1200×675).' },
    },

    // ── Content ─────────────────────────────────────────────────────
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: { description: 'Short summary shown on listing cards (2–3 sentences).' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      localized: true,
      admin: { description: 'Full article body. Supports headings, images, code, and quotes.' },
    },

    // ── Tagging ──────────────────────────────────────────────────────
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      admin: { description: 'Topic tags for filtering (e.g. "SAP", "Vision 2030", "AI").' },
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
    {
      name: 'relatedSectors',
      type: 'select',
      hasMany: true,
      admin: { position: 'sidebar' },
      options: [
        { label: 'Financial Services',        value: 'financial-services' },
        { label: 'Government',                value: 'government' },
        { label: 'Healthcare',                value: 'healthcare' },
        { label: 'Transport',                 value: 'transport' },
        { label: 'Retail',                    value: 'retail' },
        { label: 'Real Estate',               value: 'real-estate' },
        { label: 'Sports, Tourism & Culture', value: 'stec' },
        { label: 'Mega Projects',             value: 'mega-projects' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show in featured/hero positions.' },
    },

    // ── SEO ──────────────────────────────────────────────────────────
    seoGroup,
  ],
  timestamps: true,
}
