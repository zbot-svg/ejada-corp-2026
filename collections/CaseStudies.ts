import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublishedOrLoggedIn } from '../access'
import { slugField, seoGroup, statusField } from '../fields'

const SECTOR_OPTIONS = [
  { label: 'Financial Services',         value: 'financial-services' },
  { label: 'Government',                 value: 'government' },
  { label: 'Healthcare',                 value: 'healthcare' },
  { label: 'Transport',                  value: 'transport' },
  { label: 'Retail',                     value: 'retail' },
  { label: 'Real Estate',                value: 'real-estate' },
  { label: 'Sports, Tourism & Culture',  value: 'stec' },
  { label: 'Mega Projects',              value: 'mega-projects' },
]

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'sector', 'status', 'updatedAt'],
    group: 'Content',
    description: 'Client success stories shown in the Sectors section and elsewhere.',
    preview: (doc) => {
      if (doc?.slug) return `${process.env.NEXT_PUBLIC_SERVER_URL}/case-studies/${doc.slug}`
      return null
    },
  },
  versions: {
    drafts: {
      autosave: { interval: 3000 },
    },
    maxPerDoc: 20,
  },
  access: {
    read:   isPublishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Keep status in sync with published state
        return data
      },
    ],
  },
  fields: [
    // ── Core info ───────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Case study headline shown on the card.' },
    },
    slugField('title'),
    {
      name: 'client',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Client or organisation name.' },
    },
    {
      name: 'sector',
      type: 'select',
      required: true,
      options: SECTOR_OPTIONS,
      admin: { position: 'sidebar' },
    },
    statusField,
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Featured case studies appear at the top of listings.',
      },
    },

    // ── Media ───────────────────────────────────────────────────────
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: { description: 'Hero image for the case study card (recommended: 768×512).' },
    },

    // ── Headline block ──────────────────────────────────────────────
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      admin: {
        description: 'One-sentence sector tagline (e.g. "Sector Highlight").',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'The main outcome statement for this case study.' },
    },
    {
      name: 'challenge',
      type: 'textarea',
      localized: true,
      admin: { description: 'Problem statement — what challenge did the client face?' },
    },

    // ── Outcomes ────────────────────────────────────────────────────
    {
      name: 'outcomes',
      type: 'array',
      label: 'Outcomes',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Key results achieved. Each outcome is shown on the card.' },
      fields: [
        { name: 'title',       type: 'text',     required: true, localized: true },
        { name: 'description', type: 'textarea', required: true, localized: true },
      ],
    },

    // ── Metrics ─────────────────────────────────────────────────────
    {
      name: 'metrics',
      type: 'array',
      label: 'Key Metrics',
      maxRows: 4,
      admin: { description: 'Quantitative results (e.g. "40%", "10M+ users").' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },

    // ── Body content ────────────────────────────────────────────────
    {
      name: 'body',
      type: 'richText',
      localized: true,
      admin: { description: 'Full case study narrative (optional — for detail pages).' },
    },

    // ── Related ─────────────────────────────────────────────────────
    {
      name: 'relatedCaseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxDepth: 1,
      admin: {
        position: 'sidebar',
        description: 'Up to 3 related case studies.',
      },
    },

    // ── SEO ─────────────────────────────────────────────────────────
    seoGroup,
  ],
  timestamps: true,
}
