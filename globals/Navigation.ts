import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  admin: {
    group: 'Configuration',
    description: 'Top navigation links and call-to-action button.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      label: 'Nav Links',
      minRows: 1,
      maxRows: 8,
      admin: { description: 'Primary navigation links displayed in the top bar.' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href',  type: 'text', required: true, admin: { description: 'Anchor or page path (e.g. #about or /insights).' } },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Get in Touch',
      admin: { description: 'Label for the primary CTA button in the nav.' },
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '#contact',
      admin: { description: 'Link target for the CTA button.' },
    },
    {
      name: 'announcementBar',
      type: 'group',
      label: 'Announcement Bar',
      admin: { description: 'Optional slim bar above the nav (leave empty to hide).' },
      fields: [
        { name: 'enabled',  type: 'checkbox', defaultValue: false },
        { name: 'message',  type: 'text', localized: true },
        { name: 'linkLabel', type: 'text', localized: true },
        { name: 'linkHref',  type: 'text' },
      ],
    },
  ],
}
