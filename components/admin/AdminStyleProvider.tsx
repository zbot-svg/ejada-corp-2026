'use client'

import React from 'react'
import '@/styles/admin.css'

/**
 * Provider component that loads admin CSS into the bundle.
 * Registered as admin.components.providers in payload.config.ts.
 * CSS import in a client component is reliably bundled by Turbopack.
 */
export const AdminStyleProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export default AdminStyleProvider
