'use client'

import { useState, useEffect } from 'react'
import { pageContent } from '@/lib/content'

export default function Navigation() {
  const { nav } = pageContent
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_rgba(0,16,129,0.08)]'
          : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <a href="#hero" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/ejada-blue-logo.png"
                alt="Ejada Systems"
                className="h-7 w-auto"
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                  t.parentElement!.innerHTML = `<div class="text-xl font-black tracking-tight">
                    <span class="text-blue-600">e</span><span class="text-navy">jada</span>
                  </div>`
                }}
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors
                    ${scrolled ? 'text-muted hover:text-navy' : 'text-white/70 hover:text-white'}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="#contact"
                className={`px-5 py-2 text-sm font-semibold transition-all duration-200
                  ${scrolled
                    ? 'bg-navy text-white hover:bg-navy-light hover:shadow-md'
                    : 'bg-white text-navy hover:bg-white/90 hover:shadow-md'
                  }`}
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden p-2 transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-navy-deep flex flex-col justify-center px-10 pt-20">
          <nav className="flex flex-col gap-6">
            {nav.links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-sky-400 transition-colors"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center px-6 py-3 bg-sky-400 text-navy-deep font-bold text-sm uppercase tracking-widest"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
