import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublic } from '../access'

export const Capabilities: CollectionConfig = {
  slug: 'capabilities',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['number', 'title', 'order', 'updatedAt'],
    group: 'Site Structure',
    description: 'Service capability tiles shown in the Capabilities section.',
  },
  access: {
    read:   isPublic,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'number',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Display sequence number (e.g. "01", "02").',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Capability name shown on the tile.' },
    },
    {
      name: 'shortDesc',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'One-line description shown on the collapsed tile.' },
    },
    {
      name: 'longDesc',
      type: 'textarea',
      required: true,
      localized: true,
      admin: { description: 'Full description shown when the tile is expanded.' },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Technology Tags',
      admin: { description: 'Partner technology or tool labels (e.g. "SAP", "AWS").' },
      fields: [
        { name: 'tag', type: 'text', required: true },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      admin: { position: 'sidebar', description: 'Icon displayed on the tile.' },
      options: [
        { label: 'Enterprise / ERP', value: 'erp' },
        { label: 'Data / AI',        value: 'data-ai' },
        { label: 'Cloud',            value: 'cloud' },
        { label: 'Security',         value: 'security' },
        { label: 'Managed Services', value: 'managed' },
        { label: 'Banking',          value: 'banking' },
        { label: 'Default',          value: 'default' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      admin: {
        position: 'sidebar',
        description: 'Controls display order. Lower numbers appear first.',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Uncheck to hide without deleting.' },
    },
  ],
  timestamps: true,
}
