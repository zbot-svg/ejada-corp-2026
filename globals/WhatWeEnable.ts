import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const WhatWeEnable: GlobalConfig = {
  slug: 'what-we-enable',
  label: 'What We Enable',
  admin: {
    group: 'Page Sections',
    description: 'Business outcome pillars section — Growth, Efficiency, Resilience, Experience, Innovation.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      localized: true,
      defaultValue: 'What We Enable',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Business outcomes, not technology projects.',
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'outcomes',
      type: 'array',
      label: 'Outcome Pillars',
      minRows: 1,
      maxRows: 8,
      admin: { description: 'Each pillar appears as an expandable accordion card.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'e.g. "01".' } },
        { name: 'title',  type: 'text', required: true, localized: true },
        {
          name: 'items',
          type: 'array',
          label: 'Sub-items',
          fields: [
            { name: 'text', type: 'text', required: true, localized: true },
          ],
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Growth',     value: 'growth' },
            { label: 'Efficiency', value: 'efficiency' },
            { label: 'Resilience', value: 'resilience' },
            { label: 'Experience', value: 'experience' },
            { label: 'Innovation', value: 'innovation' },
            { label: 'Default',    value: 'default' },
          ],
        },
      ],
    },
  ],
}
