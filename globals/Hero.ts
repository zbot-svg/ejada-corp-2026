import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
  admin: {
    group: 'Page Sections',
    description: 'Full-screen hero: eyebrow label, headline, tagline, background, and key stats.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    // ── Copy ─────────────────────────────────────────────────────────
    {
      name: 'eyebrow',
      type: 'text',
      localized: true,
      defaultValue: 'Corporate Profile — 2026',
      admin: { description: 'Small label above the headline (e.g. "Corporate Profile — 2026").' },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Architects of\nCoherence.',
      admin: { description: 'Main hero headline. Use \\n for a line break.' },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      defaultValue: 'Custodians of Trust.',
      admin: { description: 'Subtitle shown below the headline.' },
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Explore Our Story',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '#about',
    },

    // ── Visuals ──────────────────────────────────────────────────────
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Hero background image (recommended: 1920×1080 or 16:9).' },
    },
    {
      name: 'backgroundVideo',
      type: 'text',
      admin: { description: 'Optional background video URL (mp4). Takes precedence over image if provided.' },
    },
    {
      name: 'overlayOpacity',
      type: 'number',
      defaultValue: 0.55,
      min: 0,
      max: 1,
      admin: { description: 'Dark overlay opacity (0–1). Higher = more readable text.' },
    },

    // ── Stats ────────────────────────────────────────────────────────
    {
      name: 'stats',
      type: 'array',
      label: 'Hero Stats',
      maxRows: 4,
      admin: { description: 'Key metrics shown in the hero bottom bar.' },
      fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },

    // ── Meta ─────────────────────────────────────────────────────────
    {
      name: 'marqueeItems',
      type: 'array',
      label: 'Scroll Marquee Items',
      admin: { description: 'Words/phrases shown in the ambient scrolling text strip (if used).' },
      fields: [
        { name: 'text', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
