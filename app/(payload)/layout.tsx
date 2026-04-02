/**
 * Payload admin layout — provides the full RootProvider context tree.
 *
 * Mirrors Payload's own RootLayout but WITHOUT <html>/<body> so it can nest
 * under app/layout.tsx (which owns the html/body structure).
 *
 * All utilities (initReq, getRequestTheme, getNavPrefs) are inlined rather
 * than imported from @payloadcms/next/dist/... internal paths — Turbopack
 * can only resolve packages through their declared `exports` map.
 */
import { initI18n } from '@payloadcms/translations'
import { RootProvider, defaultTheme } from '@payloadcms/ui'
import { getClientConfig } from '@payloadcms/ui/utilities/getClientConfig'
import { cookies as nextCookies, headers as getHeaders } from 'next/headers'
import {
  createLocalReq,
  executeAuthStrategies,
  getAccessResults,
  getPayload,
  getRequestLanguage,
  parseCookies,
} from 'payload'
import { PREFERENCE_KEYS, applyLocaleFiltering } from 'payload/shared'
import React from 'react'

import { handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap'

// Ejada admin branding
import '@/styles/admin.css'

// ─── Inlined: getRequestTheme ────────────────────────────────────────────────
// (mirrors @payloadcms/next/dist/utilities/getRequestTheme.js)
function getRequestTheme({
  config: cfg,
  cookies,
  headers,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cookies: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any
}): string {
  const accepted = ['dark', 'light']
  if (cfg.admin?.theme !== 'all' && accepted.includes(cfg.admin?.theme)) {
    return cfg.admin.theme
  }
  const prefix = cfg.cookiePrefix || 'payload'
  const themeCookie = cookies.get(`${prefix}-theme`)
  const fromCookie = typeof themeCookie === 'string' ? themeCookie : themeCookie?.value
  if (fromCookie && accepted.includes(fromCookie)) return fromCookie
  const fromHeader = headers.get('Sec-CH-Prefers-Color-Scheme')
  if (fromHeader && accepted.includes(fromHeader)) return fromHeader
  return defaultTheme
}

export default async function PayloadAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server Action: dispatches all named Payload admin operations
  // (form-state, render-document, render-list, etc.)
  async function serverFunction(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: any,
  ) {
    'use server'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return handleServerFunctions({ ...(args as any), config, importMap })
  }

  // ── Build req (mirrors initReq) ──────────────────────────────────────────
  const resolvedConfig = await config
  const headers = await getHeaders()
  const cookies = parseCookies(headers)

  const languageCode = getRequestLanguage({ config: resolvedConfig, cookies, headers })

  const i18n = await initI18n({
    config: resolvedConfig.i18n,
    context: 'client',
    language: languageCode,
  })

  const payload = await getPayload({ config: resolvedConfig, importMap })

  const { user } = await executeAuthStrategies({ headers, payload })

  const req = await createLocalReq(
    {
      req: {
        headers,
        host: headers.get('host') ?? undefined,
        i18n,
        user,
      },
    },
    payload,
  )

  // No localization configured — locale stays undefined
  req.locale = undefined

  const permissions = await getAccessResults({ req })

  // ── Inlined: getNavPrefs ─────────────────────────────────────────────────
  // (mirrors @payloadcms/next/dist/elements/Nav/getNavPrefs.js)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let navPrefs: any = null
  if (req.user?.collection) {
    navPrefs = await payload
      .find({
        collection: 'payload-preferences',
        depth: 0,
        limit: 1,
        pagination: false,
        req,
        where: {
          and: [
            { key: { equals: PREFERENCE_KEYS.NAV } },
            { 'user.relationTo': { equals: req.user.collection } },
            { 'user.value': { equals: req.user.id } },
          ],
        },
      })
      .then((res) => res?.docs?.[0]?.value)
      .catch(() => null)
  }

  // ── Build client config ───────────────────────────────────────────────────
  const theme = getRequestTheme({ config: resolvedConfig, cookies, headers })

  const languageOptions = Object.entries(resolvedConfig.i18n.supportedLanguages || {}).reduce(
    (acc: { label: string; value: string }[], [language, languageConfig]: [string, unknown]) => {
      const lc = languageConfig as { translations: { general: { thisLanguage: string } } }
      if (Object.keys(resolvedConfig.i18n.supportedLanguages).includes(language)) {
        acc.push({ label: lc.translations.general.thisLanguage, value: language })
      }
      return acc
    },
    [],
  )

  async function switchLanguageServerAction(lang: string) {
    'use server'
    const c = await nextCookies()
    const resolvedCfg = await config
    c.set({
      name: `${resolvedCfg.cookiePrefix || 'payload'}-lng`,
      path: '/',
      value: lang,
    })
  }

  const clientConfig = getClientConfig({
    config: resolvedConfig,
    i18n,
    importMap,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: req.user as any,
  })

  await applyLocaleFiltering({ clientConfig, config: resolvedConfig, req })

  return (
    <RootProvider
      config={clientConfig}
      dateFNSKey={i18n.dateFNSKey}
      fallbackLang={resolvedConfig.i18n.fallbackLanguage}
      isNavOpen={navPrefs?.open ?? true}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      languageCode={languageCode as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      languageOptions={languageOptions as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locale={req.locale as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      permissions={req.user ? (permissions as any) : null}
      serverFunction={serverFunction}
      switchLanguageServerAction={switchLanguageServerAction}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      theme={theme as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      translations={i18n.translations as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user={req.user as any}
    >
      {children}
    </RootProvider>
  )
}
