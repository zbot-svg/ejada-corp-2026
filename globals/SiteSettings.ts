import type { GlobalConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isLoggedIn } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Configuration',
    description: 'Global site configuration: theme, branding, contact details, and SEO defaults.',
  },
  access: {
    read:   isLoggedIn,
    update: isAdmin,
  },
  fields: [
    // ── Theme ────────────────────────────────────────────────────────
    {
      name: 'theme',
      type: 'select',
      label: 'Color Theme',
      defaultValue: 'light',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Light — Warm cream + Navy (default)', value: 'light' },
        { label: 'Dark — Deep navy + Electric blue',    value: 'dark' },
        { label: 'Electric — Pure white + Vivid blue',  value: 'electric' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Custom Color Overrides',
      admin: { initCollapsed: true },
      fields: [
        { name: 'accentColor', type: 'text', label: 'Accent Color (hex)', defaultValue: '#0000FF' },
        { name: 'accentMint',  type: 'text', label: 'Mint Accent (hex)',  defaultValue: '#1FED93' },
      ],
    },

    // ── Branding ─────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Branding',
      fields: [
        { name: 'siteName',   type: 'text',   required: true, localized: true, defaultValue: 'Ejada Systems' },
        { name: 'tagline',    type: 'text',   localized: true, defaultValue: "The Kingdom's National Transformation Orchestrator." },
        { name: 'siteLogo',   type: 'upload', relationTo: 'media', admin: { description: 'Primary logo (SVG or PNG, transparent background).' } },
        { name: 'faviconUrl', type: 'text',   admin: { description: 'Favicon URL relative to /public (e.g. /favicon.ico).' } },
      ],
    },

    // ── Contact ──────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Contact Information',
      fields: [
        { name: 'address', type: 'text',  localized: true, defaultValue: 'Riyadh, Saudi Arabia' },
        { name: 'email',   type: 'email', defaultValue: 'info@ejada.com' },
        { name: 'phone',   type: 'text',  defaultValue: '+966 11 000 0000' },
        { name: 'website', type: 'text',  defaultValue: 'www.ejada.com' },
        { name: 'linkedIn', type: 'text', admin: { description: 'LinkedIn profile URL.' } },
        { name: 'twitter',  type: 'text', admin: { description: 'X / Twitter profile URL.' } },
      ],
    },

    // ── SEO ──────────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Default SEO',
      admin: { description: 'Fallback values used when page-level SEO is not set.' },
      fields: [
        {
          name: 'defaultMetaTitle',
          type: 'text',
          localized: true,
          defaultValue: 'Ejada Systems — National Transformation Orchestrator',
        },
        {
          name: 'defaultMetaDescription',
          type: 'textarea',
          localized: true,
          defaultValue: "Saudi Arabia's leading technology transformation partner. 20 years orchestrating enterprise transformation across finance, government, healthcare, and beyond.",
        },
        {
          name: 'defaultOgImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Fallback Open Graph image (1200×630).' },
        },
        {
          name: 'googleSiteVerification',
          type: 'text',
          admin: { description: 'Google Search Console verification meta tag content.' },
        },
        {
          name: 'robotsTxt',
          type: 'textarea',
          admin: { description: 'Custom robots.txt content. Leave blank to use the default.' },
        },
      ],
    },

    // ── Analytics ────────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Analytics & Scripts',
      admin: { initCollapsed: true, description: 'Tracking IDs and custom head/body scripts.' },
      fields: [
        { name: 'gtmId',           type: 'text', label: 'GTM Container ID',      admin: { description: 'e.g. GTM-XXXXXXX' } },
        { name: 'ga4Id',           type: 'text', label: 'GA4 Measurement ID',    admin: { description: 'e.g. G-XXXXXXXXXX' } },
        { name: 'hotjarId',        type: 'text', label: 'Hotjar Site ID' },
        { name: 'customHeadCode',  type: 'textarea', label: 'Custom <head> Code',  admin: { description: 'Injected just before </head>. Use with care.' } },
        { name: 'customBodyCode',  type: 'textarea', label: 'Custom <body> Code',  admin: { description: 'Injected just after <body>. Use with care.' } },
      ],
    },

    // ── Maintenance ──────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Maintenance Mode',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'maintenanceMode',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Show maintenance page to non-admin visitors.' },
        },
        {
          name: 'maintenanceMessage',
          type: 'textarea',
          localized: true,
          defaultValue: "We're currently performing scheduled maintenance. We'll be back shortly.",
        },
      ],
    },
  ],
}
