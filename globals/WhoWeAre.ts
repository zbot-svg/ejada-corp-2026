import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const WhoWeAre: GlobalConfig = {
  slug: 'who-we-are',
  label: 'Who We Are',
  admin: {
    group: 'Page Sections',
    description: 'About section — headline, body copy, key stats, and the office footprint grid.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    // ── Section label ────────────────────────────────────────────────
    {
      name: 'label',
      type: 'text',
      localized: true,
      defaultValue: 'Who We Are',
    },

    // ── Headline block ───────────────────────────────────────────────
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: "The Kingdom's National Transformation Orchestrator",
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue: 'We exist to orchestrate intelligent, sovereign, and resilient enterprise ecosystems at scale. For nearly two decades, we have designed the critical connections between strategy, platforms, data, and operations — transforming fragmented systems into coherent competitive advantage.',
    },

    // ── Stats ────────────────────────────────────────────────────────
    {
      name: 'stats',
      type: 'array',
      label: 'Key Stats',
      maxRows: 6,
      admin: { description: 'Displayed in a 3-column grid below the body copy.' },
      fields: [
        { name: 'value', type: 'text', required: true, localized: true },
        { name: 'label', type: 'text', required: true, localized: true },
      ],
    },

    // ── Photo ────────────────────────────────────────────────────────
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Right-side portrait image (recommended: 3:4 aspect ratio).' },
    },

    // ── Footprint sub-section ────────────────────────────────────────
    {
      name: 'footprint',
      type: 'group',
      label: 'Our Footprint',
      fields: [
        { name: 'label',    type: 'text',     localized: true, defaultValue: 'Our Footprint' },
        { name: 'headline', type: 'text',     required: true, localized: true, defaultValue: 'Headquartered in Saudi Arabia. Delivering across the region.' },
        { name: 'body',     type: 'textarea', localized: true, defaultValue: 'Strategic presence across four countries, enabling seamless delivery and local expertise for regional transformation initiatives.' },
        {
          name: 'locations',
          type: 'array',
          label: 'Office Locations',
          fields: [
            { name: 'city',    type: 'text', required: true, localized: true },
            { name: 'country', type: 'text', required: true, localized: true },
            {
              name: 'type',
              type: 'select',
              required: true,
              options: [
                { label: 'Headquarters',       value: 'Headquarters' },
                { label: 'Office',             value: 'Office' },
                { label: 'Delivery Center',    value: 'Delivery Center' },
                { label: 'Development Center', value: 'Development Center' },
                { label: 'Sales Office',       value: 'Sales Office' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
