/**
 * Payload admin layout — provides the full RootProvider context tree for all admin pages.
 *
 * This mirrors Payload's own RootLayout (from @payloadcms/next/layouts) but intentionally
 * omits the <html>/<body> wrapper since Next.js requires those to exist only in the root
 * app layout (app/layout.tsx). Without this layout the admin throws errors like:
 *   - TypeError: Cannot destructure property 'config' (missing ConfigProvider)
 *   - Error: useServerFunctions must be used within a ServerFunctionsProvider
 *
 * We import from internal dist paths for utilities that are not re-exported publicly.
 */
import { rtlLanguages } from '@payloadcms/translations'
import { RootProvider } from '@payloadcms/ui'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { cookies as nextCookies } from 'next/headers'
import { applyLocaleFiltering } from 'payload/shared'
import React from 'react'

import { handleServerFunctions } from '@payloadcms/next/layouts'
// Internal utilities — not in the public exports barrel but stable dist paths
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getNavPrefs } from '@payloadcms/next/dist/elements/Nav/getNavPrefs.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { getRequestTheme } from '@payloadcms/next/dist/utilities/getRequestTheme.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { initReq } from '@payloadcms/next/dist/utilities/initReq.js'

import config from '@payload-config'
import { importMap } from './admin/importMap'

export default async function PayloadAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server Action used by RootProvider → ServerFunctionsProvider to dispatch
  // named admin operations (form-state, render-document, render-list, etc.)
  async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
    'use server'
    return handleServerFunctions({ ...args, config, importMap })
  }

  const {
    cookies,
    headers,
    languageCode,
    permissions,
    req,
    req: {
      payload: { config: resolvedConfig },
    },
  } = await initReq({ configPromise: config, importMap, key: 'PayloadAdminLayout' })

  const theme = getRequestTheme({ config: resolvedConfig, cookies, headers })
  const dir = rtlLanguages.includes(languageCode) ? 'RTL' : 'LTR'

  const languageOptions = Object.entries(resolvedConfig.i18n.supportedLanguages || {}).reduce(
    (acc: { label: string; value: string }[], [language, languageConfig]: [string, any]) => {
      if (Object.keys(resolvedConfig.i18n.supportedLanguages).includes(language)) {
        acc.push({
          label: languageConfig.translations.general.thisLanguage,
          value: language,
        })
      }
      return acc
    },
    [],
  )

  async function switchLanguageServerAction(lang: string) {
    'use server'
    const cookies = await nextCookies()
    cookies.set({
      name: `${resolvedConfig.cookiePrefix || 'payload'}-lng`,
      path: '/',
      value: lang,
    })
  }

  const navPrefs = await getNavPrefs(req)

  const clientConfig = getClientConfig({
    config: resolvedConfig,
    i18n: req.i18n,
    importMap,
    user: req.user,
  })

  await applyLocaleFiltering({ clientConfig, config: resolvedConfig, req })

  return (
    <RootProvider
      config={clientConfig}
      dateFNSKey={req.i18n.dateFNSKey}
      fallbackLang={resolvedConfig.i18n.fallbackLanguage}
      isNavOpen={navPrefs?.open ?? true}
      languageCode={languageCode}
      languageOptions={languageOptions}
      locale={req.locale}
      permissions={req.user ? permissions : null}
      serverFunction={serverFunction}
      switchLanguageServerAction={switchLanguageServerAction}
      theme={theme}
      translations={req.i18n.translations}
      user={req.user}
    >
      {children}
    </RootProvider>
  )
}
