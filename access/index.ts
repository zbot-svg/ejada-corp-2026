import type { Access } from 'payload'

/** Full admin — unrestricted */
export const isAdmin: Access = ({ req: { user } }) =>
  Boolean(user?.role === 'admin')

/** Admin or content editor — can create and edit content */
export const isAdminOrEditor: Access = ({ req: { user } }) =>
  Boolean(user && (user.role === 'admin' || user.role === 'editor'))

/** Any authenticated user (admin, editor, viewer) */
export const isLoggedIn: Access = ({ req: { user } }) =>
  Boolean(user)

/** Always public — anonymous users can read */
export const isPublic: Access = () => true

/**
 * Published-or-authenticated read gate.
 * Anonymous visitors see only published docs.
 * Logged-in users (editors, admins) can see drafts too.
 */
export const isPublishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}

/** An admin can change anything; users can only update their own record. */
export const isAdminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.id === id
}
