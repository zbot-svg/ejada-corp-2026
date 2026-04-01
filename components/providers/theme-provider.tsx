'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'electric'

interface ThemeColors {
  bg: string
  bgSecondary: string
  bgAccent: string
  textPrimary: string
  textSecondary: string
  textMuted: string
  accent: string
  accentLight: string
  accentMint: string
  surface: string
  border: string
  navBg: string
  navText: string
  heroPanel: string
}

const themes: Record<Theme, ThemeColors> = {
  light: {
    bg:           '#F5F1EB',
    bgSecondary:  '#FFFFFF',
    bgAccent:     '#EEE9E0',
    textPrimary:  '#001081',
    textSecondary:'#2D3436',
    textMuted:    '#6B7280',
    accent:       '#0000FF',
    accentLight:  '#0070C0',
    accentMint:   '#1FED93',
    surface:      '#FFFFFF',
    border:       'rgba(0,16,129,0.10)',
    navBg:        'rgba(245,241,235,0.85)',
    navText:      '#001081',
    heroPanel:    '#F5F1EB',
  },
  dark: {
    bg:           '#000820',
    bgSecondary:  '#001040',
    bgAccent:     '#001681',
    textPrimary:  '#FFFFFF',
    textSecondary:'#C5CFDA',
    textMuted:    '#6B7280',
    accent:       '#0000FF',
    accentLight:  '#009EE0',
    accentMint:   '#1FED93',
    surface:      '#001040',
    border:       'rgba(255,255,255,0.10)',
    navBg:        'rgba(0,8,32,0.90)',
    navText:      '#FFFFFF',
    heroPanel:    '#000820',
  },
  electric: {
    bg:           '#FFFFFF',
    bgSecondary:  '#F0F2FF',
    bgAccent:     '#E8ECFF',
    textPrimary:  '#0000FF',
    textSecondary:'#001081',
    textMuted:    '#5B6CC9',
    accent:       '#0000FF',
    accentLight:  '#4444FF',
    accentMint:   '#1FED93',
    surface:      '#FFFFFF',
    border:       'rgba(0,0,255,0.12)',
    navBg:        'rgba(255,255,255,0.90)',
    navText:      '#0000FF',
    heroPanel:    '#F0F2FF',
  },
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  colors: ThemeColors
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => {},
  colors: themes.light,
})

export function useTheme() {
  return useContext(ThemeContext)
}

function applyTheme(theme: Theme) {
  const colors = themes[theme]
  const root = document.documentElement

  root.setAttribute('data-theme', theme)

  root.style.setProperty('--color-bg', colors.bg)
  root.style.setProperty('--color-bg-secondary', colors.bgSecondary)
  root.style.setProperty('--color-bg-accent', colors.bgAccent)
  root.style.setProperty('--color-text-primary', colors.textPrimary)
  root.style.setProperty('--color-text-secondary', colors.textSecondary)
  root.style.setProperty('--color-text-muted', colors.textMuted)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-accent-light', colors.accentLight)
  root.style.setProperty('--color-accent-mint', colors.accentMint)
  root.style.setProperty('--color-surface', colors.surface)
  root.style.setProperty('--color-border', colors.border)
  root.style.setProperty('--color-nav-bg', colors.navBg)
  root.style.setProperty('--color-nav-text', colors.navText)
  root.style.setProperty('--color-hero-panel', colors.heroPanel)
}

export function ThemeProvider({
  children,
  defaultTheme = 'light',
}: {
  children: ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)

  useEffect(() => {
    const stored = localStorage.getItem('ejada-theme') as Theme | null
    const initial = stored || defaultTheme
    setThemeState(initial)
    applyTheme(initial)
  }, [defaultTheme])

  const setTheme = (next: Theme) => {
    setThemeState(next)
    localStorage.setItem('ejada-theme', next)

    // Smooth transition: temporarily add transition class
    document.documentElement.style.setProperty('--theme-transition', 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)')
    applyTheme(next)
    setTimeout(() => {
      document.documentElement.style.removeProperty('--theme-transition')
    }, 500)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}
