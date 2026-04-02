import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const Values: GlobalConfig = {
  slug: 'values',
  label: 'Our Values',
  admin: {
    group: 'Page Sections',
    description: 'INSPIRE values section — each letter maps to a company value.',
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
      defaultValue: 'Our Values',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'INSPIRE',
      admin: { description: 'The acrostic word (each letter = one value). Displayed large as a visual accent.' },
    },
    {
      name: 'subheadline',
      type: 'textarea',
      localized: true,
      defaultValue: 'Our values are the bedrock of our culture. They guide how we work, how we collaborate, and how we deliver value to our clients and community.',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Values',
      minRows: 1,
      maxRows: 10,
      admin: { description: 'One entry per letter/value. Order must match the headline acrostic.' },
      fields: [
        {
          name: 'letter',
          type: 'text',
          required: true,
          admin: { description: 'Single letter that matches the headline acrostic (e.g. "I").' },
        },
        { name: 'title',       type: 'text',     required: true, localized: true },
        { name: 'description', type: 'textarea',  required: true, localized: true },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional icon or illustration for this value.' },
        },
      ],
    },
  ],
}
