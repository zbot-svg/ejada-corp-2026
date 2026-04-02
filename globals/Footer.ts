import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    group: 'Configuration',
    description: 'Footer content — brand tagline, link columns, social links, and copyright.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    // ── Brand ────────────────────────────────────────────────────────
    {
      name: 'brand',
      type: 'text',
      localized: true,
      defaultValue: 'Ejada Systems',
      admin: { description: 'Brand name displayed in the footer.' },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      defaultValue: "The Kingdom's National Transformation Orchestrator.",
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Footer logo (light/white version preferred).' },
    },

    // ── CTA ──────────────────────────────────────────────────────────
    {
      name: 'ctaLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Start a Conversation',
    },
    {
      name: 'ctaHref',
      type: 'text',
      defaultValue: '#contact',
    },

    // ── Link columns ─────────────────────────────────────────────────
    {
      name: 'columns',
      type: 'array',
      label: 'Link Columns',
      maxRows: 5,
      admin: { description: 'Each column has a heading and a list of links.' },
      fields: [
        { name: 'heading', type: 'text', required: true, localized: true },
        {
          name: 'links',
          type: 'array',
          label: 'Links',
          fields: [
            { name: 'label', type: 'text', required: true, localized: true },
            { name: 'href',  type: 'text', required: true },
          ],
        },
      ],
    },

    // ── Social ───────────────────────────────────────────────────────
    {
      name: 'social',
      type: 'group',
      label: 'Social Links',
      admin: { description: 'Leave blank to hide a social link.' },
      fields: [
        { name: 'linkedIn', type: 'text', label: 'LinkedIn URL' },
        { name: 'twitter',  type: 'text', label: 'X / Twitter URL' },
        { name: 'youtube',  type: 'text', label: 'YouTube URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
      ],
    },

    // ── Bottom bar ───────────────────────────────────────────────────
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      defaultValue: '© 2026 Ejada Systems. All rights reserved.',
      admin: { description: 'Copyright notice shown in the footer bottom bar.' },
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal Links',
      admin: { description: 'Privacy Policy, Terms of Use, etc.' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'href',  type: 'text', required: true },
      ],
    },

    // ── Newsletter ───────────────────────────────────────────────────
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter Signup',
      fields: [
        { name: 'enabled',     type: 'checkbox', defaultValue: false },
        { name: 'headline',    type: 'text', localized: true, defaultValue: 'Stay Informed' },
        { name: 'placeholder', type: 'text', localized: true, defaultValue: 'Your email address' },
        { name: 'buttonLabel', type: 'text', localized: true, defaultValue: 'Subscribe' },
      ],
    },
  ],
}
