import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '../access'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'sector', 'status', 'createdAt'],
    group: 'Content',
    description: 'Inbound contact form submissions from the website.',
  },
  access: {
    // Submissions are created by the public (anonymous POST)
    read:   isAdminOrEditor,
    create: () => true,    // public — form handler calls this
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    // ── Submitter info ───────────────────────────────────────────────
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: { readOnly: true },
    },
    {
      name: 'company',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'phone',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'sector',
      type: 'text',
      admin: { readOnly: true },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: { readOnly: true },
    },

    // ── Source ────────────────────────────────────────────────────────
    {
      name: 'locale',
      type: 'select',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Language/locale the visitor used when submitting.',
      },
      options: [
        { label: 'English (en)', value: 'en' },
        { label: 'Arabic (ar)',  value: 'ar' },
      ],
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Page URL or campaign source where the form was submitted.',
      },
    },

    // ── CRM workflow ─────────────────────────────────────────────────
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: { position: 'sidebar' },
      options: [
        { label: '🆕 New',          value: 'new' },
        { label: '👁️ Reviewed',     value: 'reviewed' },
        { label: '💬 In Progress',  value: 'in-progress' },
        { label: '✅ Closed',       value: 'closed' },
        { label: '🗑️ Spam',         value: 'spam' },
      ],
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'Assign to a team member for follow-up.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal notes — not visible to the submitter.' },
    },
  ],
  timestamps: true,
}
