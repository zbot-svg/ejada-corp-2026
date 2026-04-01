import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { fileURLToPath } from 'url'
import path from 'path'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      title: 'Ejada CMS',
      description: 'Ejada Systems content management',
    },
  },

  editor: lexicalEditor(),

  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [],
    },
    {
      slug: 'media',
      upload: true,
      fields: [
        { name: 'alt', type: 'text', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      slug: 'case-studies',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'client', type: 'text', required: true },
        { name: 'sector', type: 'select', options: [
          'Financial Services', 'Government', 'Healthcare',
          'Transportation', 'Retail', 'Real Estate', 'Energy',
        ]},
        { name: 'badge', type: 'text' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'outcomes',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'text', required: true },
          ],
        },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      slug: 'partners',
      admin: { useAsTitle: 'name' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'logo', type: 'upload', relationTo: 'media' },
        { name: 'website', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
  ],

  globals: [
    // ── Site Settings (theme, SEO, contact) ──────────────────────
    {
      slug: 'site-settings',
      label: 'Site Settings',
      admin: {
        description: 'Global site configuration including theme, contact info, and SEO defaults.',
      },
      fields: [
        // Theme switcher — feeds ThemeProvider on the frontend
        {
          name: 'theme',
          type: 'select',
          label: 'Color Theme',
          defaultValue: 'light',
          options: [
            { label: 'Light — Warm cream + Navy (default)', value: 'light' },
            { label: 'Dark — Deep navy + Electric blue', value: 'dark' },
            { label: 'Electric — Pure white + Vivid blue', value: 'electric' },
          ],
          admin: {
            description: 'Controls the global color theme across the entire website.',
          },
        },

        // Custom accent color override
        {
          type: 'collapsible',
          label: 'Custom Colors (optional overrides)',
          fields: [
            { name: 'accentColor', type: 'text', label: 'Accent Color (hex)', defaultValue: '#0000FF' },
            { name: 'accentMint', type: 'text', label: 'Mint Accent (hex)', defaultValue: '#1FED93' },
          ],
        },

        // Contact details
        {
          type: 'collapsible',
          label: 'Contact Information',
          fields: [
            { name: 'address', type: 'text', defaultValue: 'Riyadh, Saudi Arabia' },
            { name: 'email', type: 'email', defaultValue: 'info@ejada.com' },
            { name: 'phone', type: 'text', defaultValue: '+966 11 000 0000' },
          ],
        },

        // SEO
        {
          type: 'collapsible',
          label: 'SEO Defaults',
          fields: [
            { name: 'seoTitle', type: 'text', defaultValue: 'Ejada Systems — National Transformation Orchestrator' },
            { name: 'seoDescription', type: 'textarea' },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },

    // ── Navigation ─────────────────────────────────────────────
    {
      slug: 'navigation',
      label: 'Navigation',
      fields: [
        {
          name: 'links',
          type: 'array',
          label: 'Nav Links',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        {
          name: 'ctaLabel',
          type: 'text',
          defaultValue: 'Get in Touch',
        },
      ],
    },

    // ── Hero ───────────────────────────────────────────────────
    {
      slug: 'hero',
      label: 'Hero Section',
      fields: [
        { name: 'eyebrow', type: 'text', defaultValue: 'Corporate Profile — 2026' },
        { name: 'headline', type: 'text', defaultValue: 'Architects of Coherence.' },
        { name: 'tagline', type: 'text', defaultValue: 'Custodians of Trust.' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
        {
          name: 'stats',
          type: 'array',
          label: 'Hero Stats',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],

  db: sqliteAdapter({
    // On Vercel the project root is read-only — only /tmp is writable.
    // If DATABASE_URI is a relative file path (e.g. "file:./ejada.db"), rewrite it
    // to /tmp on Vercel. Otherwise honour whatever DATABASE_URI is set to.
    client: {
      url: (() => {
        const uri = process.env.DATABASE_URI
        if (process.env.VERCEL) {
          // Relative file:// URIs can't be written on Vercel's read-only FS
          if (!uri || uri.startsWith('file:./') || uri.startsWith('file:ejada')) {
            return 'file:/tmp/ejada.db'
          }
        }
        return uri || `file:${path.resolve(dirname, './ejada.db')}`
      })(),
    },
    // push: true applies the schema directly to the DB on every cold start.
    // This avoids the need for committed migration files and works well with
    // Vercel's ephemeral /tmp filesystem where the DB is always fresh.
    push: true,
  }),

  secret: process.env.PAYLOAD_SECRET || 'ejada-cms-secret-dev-key-change-in-production',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
