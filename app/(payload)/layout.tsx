/**
 * Payload admin layout — provides ConfigProvider context for all admin pages.
 *
 * Payload's PageConfigProvider (used inside RootPage) calls useConfig() which
 * requires a parent ConfigProvider. Without this layout, useConfig() returns
 * undefined and the admin throws TypeError: Cannot destructure property 'config'.
 *
 * This layout does NOT render <html>/<body> (the root app layout handles those).
 * It only adds Payload's config context around admin routes.
 */
import type { ClientConfig } from 'payload'
import React from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { initI18n } from '@payloadcms/translations'
import { ConfigProvider } from '@payloadcms/ui/providers/Config'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { importMap } from './admin/importMap'

export default async function PayloadAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize Payload (uses singleton — subsequent calls are cached)
  const resolvedConfig = await config
  const payload = await getPayload({ config: resolvedConfig, importMap })

  // Build i18n (English default for unauthenticated access like create-first-user)
  const i18n = await initI18n({
    config: resolvedConfig.i18n,
    context: 'client',
    language: 'en',
  })

  // Get serializable client config (functions stripped, safe for RSC → client boundary)
  const clientConfig = getClientConfig({
    config: resolvedConfig,
    i18n,
    importMap,
    user: undefined,
  }) as ClientConfig

  return (
    <ConfigProvider config={clientConfig}>
      {children}
    </ConfigProvider>
  )
}
