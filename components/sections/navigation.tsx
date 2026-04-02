'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { useTheme } from '@/components/providers/theme-provider'
import { useContent, useLocale } from '@/lib/content-context'
import type { Theme } from '@/components/providers/theme-provider'

const themeOptions: { id: Theme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'electric', label: 'Electric' },
]

const themeSwatchColor: Record<Theme, string> = {
  light: '#F5F1EB',
  dark: '#000820',
  electric: '#0000DD',
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [themeOpen, setThemeOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const pageContent = useContent()
  const { isRTL } = useLocale()

  const { scrollYProgress } = useScroll()
  const navOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = pageContent.nav.links.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [pageContent.nav.links])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.6 }}
      >
        {/* Frosted glass bg */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: navOpacity,
            backgroundColor: 'var(--color-nav-bg)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid var(--color-border)',
          }}
        />

        <div className="relative container mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="#hero" className="flex items-center" data-magnetic>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/ejada-blue-logo.png"
                alt="Ejada Systems"
                className="h-7 w-auto"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                  if (t.parentElement) {
                    t.parentElement.innerHTML = `<div style="font-size:18px;font-weight:900;letter-spacing:-0.03em;color:var(--color-nav-text)"><span style="color:var(--color-accent)">e</span>jada</div>`
                  }
                }}
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {pageContent.nav.links.map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-4 right-4 h-px"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Right: theme + lang + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Theme picker */}
              <div className="relative">
                <button
                  onClick={() => setThemeOpen(!themeOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-full transition-colors duration-200"
                  style={{
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-muted)',
                    backgroundColor: 'var(--color-surface)',
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>

                <AnimatePresence>
                  {themeOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 p-1 border shadow-lg z-50 min-w-[120px]"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                      onMouseLeave={() => setThemeOpen(false)}
                    >
                      {themeOptions.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => { setTheme(t.id); setThemeOpen(false) }}
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-left"
                          style={{
                            color: theme === t.id ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                            backgroundColor: theme === t.id ? 'var(--color-bg-accent)' : 'transparent',
                          }}
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: themeSwatchColor[t.id], border: '1px solid var(--color-border)' }}
                          />
                          {t.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href={pageContent.nav.langHref}
                className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 border transition-colors duration-200 hover:opacity-80"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
              >
                {pageContent.nav.langSwitch}
              </a>

              <MagneticButton href="#contact" variant="primary" strength={0.2}>
                {pageContent.nav.cta}
              </MagneticButton>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-px bg-current"
                style={{ color: 'var(--color-nav-text)' }}
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
              <motion.span
                className="block w-6 h-px bg-current"
                style={{ color: 'var(--color-nav-text)' }}
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block w-6 h-px bg-current"
                style={{ color: 'var(--color-nav-text)' }}
                animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between p-8 pt-24"
            style={{ backgroundColor: 'var(--color-text-primary)' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          >
            <nav className="flex flex-col gap-2">
              {pageContent.nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-black tracking-tight text-white hover:opacity-70 transition-opacity py-2"
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1, type: 'spring', stiffness: 100, damping: 20 }}
                >
                  <span className="text-xs font-mono mr-4 opacity-30">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3.5 font-bold text-sm uppercase tracking-widest text-white"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                {pageContent.nav.cta}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
