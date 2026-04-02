import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const ProofPoints: GlobalConfig = {
  slug: 'proof-points',
  label: 'Proof Points',
  admin: {
    group: 'Page Sections',
    description: 'Numbers section — key performance stats displayed in a marquee-backed grid.',
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
      defaultValue: 'Proof Points',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Figures that define our track record.',
    },
    {
      name: 'subheadline',
      type: 'text',
      localized: true,
      defaultValue: 'Across 7 key industries in the region.',
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Statistics',
      minRows: 2,
      maxRows: 8,
      admin: { description: 'Each stat renders as a large number with a label.' },
      fields: [
        { name: 'value', type: 'text', required: true, localized: true, admin: { description: 'e.g. "20+" or "500+".' } },
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'description', type: 'text', localized: true, admin: { description: 'Optional subtitle shown below the label.' } },
      ],
    },
    {
      name: 'marqueeItems',
      type: 'array',
      label: 'Backdrop Marquee Text',
      admin: { description: 'Words shown as large ambient scrolling text behind the stats.' },
      fields: [
        { name: 'text', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
