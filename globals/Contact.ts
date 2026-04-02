import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const Contact: GlobalConfig = {
  slug: 'contact-section',
  label: 'Contact Section',
  admin: {
    group: 'Page Sections',
    description: 'Contact form section copy, office details, and form field labels.',
  },
  access: {
    read:   isPublic,
    update: isAdminOrEditor,
  },
  fields: [
    // ── Copy ─────────────────────────────────────────────────────────
    {
      name: 'label',
      type: 'text',
      localized: true,
      defaultValue: 'Contact',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: "Let's orchestrate your transformation.",
    },
    {
      name: 'body',
      type: 'textarea',
      localized: true,
      defaultValue: 'Partner with Ejada to unlock value, drive innovation, and secure your future.',
    },

    // ── Office details ───────────────────────────────────────────────
    {
      name: 'address',
      type: 'text',
      localized: true,
      defaultValue: 'Riyadh, Saudi Arabia',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'info@ejada.com',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+966 11 000 0000',
    },

    // ── Form settings ────────────────────────────────────────────────
    {
      name: 'form',
      type: 'group',
      label: 'Form Labels',
      admin: { description: 'Localized labels and placeholder text for the contact form fields.' },
      fields: [
        { name: 'namePlaceholder',     type: 'text', localized: true, defaultValue: 'Your Name *' },
        { name: 'emailPlaceholder',    type: 'text', localized: true, defaultValue: 'Email Address *' },
        { name: 'phonePlaceholder',    type: 'text', localized: true, defaultValue: 'Phone Number' },
        { name: 'companyPlaceholder',  type: 'text', localized: true, defaultValue: 'Company' },
        { name: 'messagePlaceholder',  type: 'text', localized: true, defaultValue: 'Tell us about your initiative *' },
        { name: 'sectorPlaceholder',   type: 'text', localized: true, defaultValue: 'Select Sector (optional)' },
        { name: 'submitLabel',         type: 'text', localized: true, defaultValue: 'Send Message' },
        { name: 'successHeadline',     type: 'text', localized: true, defaultValue: "Message received — we'll be in touch shortly." },
      ],
    },

    // ── Sector dropdown options ──────────────────────────────────────
    {
      name: 'sectorOptions',
      type: 'array',
      label: 'Sector Dropdown Options',
      admin: { description: 'Options shown in the sector dropdown in the contact form.' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true },
      ],
    },

    // ── Backdrop marquee ─────────────────────────────────────────────
    {
      name: 'marqueeItems',
      type: 'array',
      label: 'Backdrop Marquee Items',
      admin: { description: 'Text items scrolling behind the section.' },
      fields: [
        { name: 'text', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
