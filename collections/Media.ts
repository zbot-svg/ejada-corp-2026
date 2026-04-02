import type { CollectionConfig } from 'payload'
import { isAdminOrEditor, isPublic, isAdmin } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
    group: 'Admin',
    description: 'Images and documents used across the site.',
  },
  access: {
    read:   isPublic,        // all images are publicly accessible
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    // Responsive image sizes generated on upload
    imageSizes: [
      {
        name: 'thumbnail',
        width:  400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width:  768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'feature',
        width:  1200,
        height: 675,
        position: 'centre',
      },
      {
        name: 'og',
        width:  1200,
        height: 630,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    // Accept images and PDFs only
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Describe the image for screen readers and SEO.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional visible caption displayed beneath the image.',
      },
    },
  ],
  timestamps: true,
}
