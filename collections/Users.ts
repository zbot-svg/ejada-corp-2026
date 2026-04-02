import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrSelf, isLoggedIn } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
    cookies: {
      sameSite: 'Lax',
      secure: true,
    },
    loginWithUsername: false,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    group: 'Admin',
    description: 'CMS user accounts. Admins have full access; editors manage content; viewers have read-only.',
  },
  access: {
    read:   isLoggedIn,   // any logged-in user can read user list
    create: isAdmin,      // only admins create accounts
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { description: 'Full display name.' },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      admin: {
        position: 'sidebar',
        description: 'Controls what this user can do in the CMS.',
      },
      access: {
        update: ({ req: { user } }) => Boolean(user?.role === 'admin'),
      },
      options: [
        { label: '🔑 Admin — full access',           value: 'admin' },
        { label: '✏️ Editor — create & edit content', value: 'editor' },
        { label: '👁️ Viewer — read-only',             value: 'viewer' },
      ],
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}
