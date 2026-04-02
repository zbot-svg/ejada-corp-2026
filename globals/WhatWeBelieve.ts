import type { GlobalConfig } from 'payload'
import { isAdminOrEditor, isPublic } from '../access'

export const WhatWeBelieve: GlobalConfig = {
  slug: 'what-we-believe',
  label: 'What We Believe',
  admin: {
    group: 'Page Sections',
    description: 'Vision / Mission / Purpose beliefs section on a dark background.',
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
      defaultValue: 'What We Believe',
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Driven by purpose. Guided by vision.',
    },
    {
      name: 'beliefs',
      type: 'array',
      label: 'Belief Cards',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Each belief renders as a card with a large number, title, and body.' },
      fields: [
        { name: 'number', type: 'text', required: true, admin: { description: 'Display number, e.g. "01".' } },
        { name: 'title',  type: 'text', required: true, localized: true },
        { name: 'body',   type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'backdropWords',
      type: 'array',
      label: 'Backdrop Marquee Words',
      admin: { description: 'Words shown in the large ambient scrolling text behind the cards (e.g. VISION, MISSION, PURPOSE).' },
      fields: [
        { name: 'word', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
