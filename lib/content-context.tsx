'use client'

import { createContext, useContext, ReactNode } from 'react'
import { pageContent } from './content'
import { pageContentAr } from './content-ar'

export type Locale = 'en' | 'ar'
export type PageContent = typeof pageContent

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
  cmsContent,
}: {
  locale: Locale
  children: ReactNode
  cmsContent?: PageContent
}) {
  const staticContent = locale === 'ar' ? pageContentAr : pageContent
  const content = cmsContent || staticContent
  const isRTL = locale === 'ar'
  return (
    <LocaleContext.Provider value={{ locale, content, isRTL }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useContent(): PageContent {
  return useContext(LocaleContext).content
}

export function useLocale() {
  const { locale, isRTL } = useContext(LocaleContext)
  return { locale, isRTL }
}
