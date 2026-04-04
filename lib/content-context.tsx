'use client'

import { createContext, useContext, ReactNode } from 'react'
import { pageContent } from './content'
import { pageContentAr } from './content-ar'

export type PageContent = typeof pageContent
export type Locale = 'en' | 'ar'

interface LocaleContextValue {
  locale: Locale
  content: PageContent
  isRTL: boolean
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  content: pageContent,
  isRTL: false,
})

export function ContentProvider({
  locale,
  children,
}: {
  locale: Locale
  children: ReactNode
}) {
  const content = locale === 'ar' ? pageContentAr : pageContent
  const isRTL = locale === 'ar'
  return (
    <LocaleContext.Provider value={{ locale, content, isRTL }}>
      {children}
    </LocaleContext.Provider>
  )
}

/** Returns the locale-appropriate page content */
export function useContent(): PageContent {
  return useContext(LocaleContext).content
}

/** Returns locale metadata (locale code, isRTL) */
export function useLocale() {
  const { locale, isRTL } = useContext(LocaleContext)
  return { locale, isRTL }
}
