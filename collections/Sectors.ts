import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublic } from '../access'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'order', 'active', 'updatedAt'],
    group: 'Site Structure',
    description: 'Sector entries for the Sectors section — each tab in the sector selector.',
  },
  access: {
    read:   isPublic,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    // ── Identity ────────────────────────────────────────────────────
    {
      name: 'id_slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-safe identifier (e.g. "financial-services"). Used by the frontend tab system.',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Tab label displayed in the sector navigation.' },
    },

    // ── Highlight block ─────────────────────────────────────────────
    {
      name: 'highlight',
      type: 'group',
      label: 'Sector Highlight',
      fields: [
        {
          name: 'tagline',
          type: 'text',
          localized: true,
          defaultValue: 'Sector Highlight',
          admin: { description: 'Small eyebrow label (e.g. "Sector Highlight").' },
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'Main sector headline.' },
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          localized: true,
          admin: { description: 'One-paragraph body copy for the sector panel.' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Sector panel image (recommended: 4:3 aspect ratio).' },
        },
        {
          name: 'metrics',
          type: 'array',
          label: 'Key Metrics',
          maxRows: 4,
          fields: [
            { name: 'value', type: 'text', required: true, localized: true },
            { name: 'label', type: 'text', required: true, localized: true },
          ],
        },
        {
          name: 'outcomes',
          type: 'array',
          label: 'Outcome Tags',
          admin: { description: 'Short outcome tag chips shown below the metrics.' },
          fields: [
            { name: 'tag', type: 'text', required: true, localized: true },
          ],
        },
      ],
    },

    // ── Case Studies ────────────────────────────────────────────────
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      maxDepth: 2,
      admin: {
        description: 'Link existing case studies to this sector.',
      },
    },

    // ── Sort & visibility ───────────────────────────────────────────
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Controls tab order. Lower numbers appear first.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Uncheck to hide this sector without deleting.' },
    },
  ],
  timestamps: true,
}
