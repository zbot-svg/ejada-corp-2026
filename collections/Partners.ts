import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublic } from '../access'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'tier', 'order', 'updatedAt'],
    group: 'Content',
    description: 'Technology alliance partners shown in the Partners section.',
  },
  access: {
    read:   isPublic,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Official partner/vendor name (e.g. "SAP", "Oracle").' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Partner logo — SVG or PNG preferred, transparent background.' },
    },
    {
      name: 'website',
      type: 'text',
      admin: { description: 'Partner website URL (https://...).' },
    },
    {
      name: 'tier',
      type: 'select',
      defaultValue: 'standard',
      admin: { position: 'sidebar' },
      options: [
        { label: '🥇 Premier', value: 'premier' },
        { label: '🥈 Gold',    value: 'gold' },
        { label: '— Standard', value: 'standard' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first in the marquee.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to temporarily hide from the site without deleting.',
      },
    },
  ],
  timestamps: true,
}
