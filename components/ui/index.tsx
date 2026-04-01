'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

// ─── Section Label ───────────────────────────────────────────────────
interface SectionLabelProps {
  children: ReactNode
  light?: boolean
  className?: string
}
export function SectionLabel({ children, light = false, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <div className={`h-px w-8 ${light ? 'bg-sky-400' : 'bg-blue-600'}`} />
      <span className={`text-xs font-semibold uppercase tracking-widest
        ${light ? 'text-sky-400' : 'text-blue-600'}`}>
        {children}
      </span>
    </div>
  )
}

// ─── Scroll Reveal Hook ─────────────────────────────────────────────
interface UseRevealOptions {
  threshold?: number
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function useReveal({ threshold = 0.12, delay = 0, direction = 'up' }: UseRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const translate: Record<string, string> = {
    up:    'translate-y-8',
    left:  '-translate-x-8',
    right: 'translate-x-8',
    none:  '',
  }

  return { ref, visible, className: `transition-all duration-700 ease-out
    ${visible ? 'translate-y-0 translate-x-0 opacity-100' : `${translate[direction]} opacity-0`}`,
    delay: visible ? 0 : delay }
}

// ─── Stat Counter ───────────────────────────────────────────────────
interface StatCounterProps {
  value: string
  label: string
  visible: boolean
  className?: string
}
export function StatCounter({ value, label, visible, className = '' }: StatCounterProps) {
  const [display, setDisplay] = useState('0')
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!visible || hasAnimated.current) return
    hasAnimated.current = true

    // Extract numeric part and suffix
    const match = value.match(/^([\d,.]+)(.*)$/)
    if (!match) { setDisplay(value); return }

    const target = parseFloat(match[1].replace(/,/g, ''))
    const suffix = match[2]
    const isFloat = match[1].includes('.')
    const duration = 1500
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = target * eased
      setDisplay(
        (isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix
      )
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [visible, value])

  return (
    <div className={`text-center ${className}`}>
      <div className="text-5xl lg:text-6xl font-black text-white leading-none">{display}</div>
      <div className="text-xs font-bold uppercase tracking-widest mt-2 text-sky-400">{label}</div>
    </div>
  )
}

// ─── Capability Tile ─────────────────────────────────────────────────
interface CapabilityTileProps {
  number: string
  title: string
  shortDesc: string
  tags: string[]
  longDesc: string
  visible: boolean
  delay?: number
}
export function CapabilityTile({ number, title, shortDesc, tags, longDesc, visible, delay = 0 }: CapabilityTileProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`relative bg-white border border-gray-200 p-6 cursor-pointer
        transition-all duration-300 group
        ${expanded ? 'shadow-lg border-blue-500/40' : 'hover:shadow-md hover:border-blue-500/30'}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-blue-600 transform origin-left transition-transform duration-300
        ${expanded ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />

      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-mono text-muted">{number}</span>
        <svg className={`w-4 h-4 text-muted transition-transform duration-300 flex-shrink-0 mt-0.5
          ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <h3 className="text-base font-bold text-navy mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-mid leading-relaxed mb-4">{shortDesc}</p>

      <div className="flex flex-wrap gap-1.5 mb-0">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-cream text-muted">
            {tag}
          </span>
        ))}
      </div>

      {/* Expanded content */}
      <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-h-48 mt-4 pt-4 border-t border-gray-100' : 'max-h-0'}`}>
        <p className="text-sm text-mid leading-relaxed">{longDesc}</p>
      </div>
    </div>
  )
}

// ─── Tab Navigation ─────────────────────────────────────────────────
interface Tab {
  id: string
  label: string
}
interface TabNavProps {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}
export function TabNav({ tabs, active, onChange }: TabNavProps) {
  return (
    <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px
            ${active === tab.id
              ? 'text-navy border-blue-600'
              : 'text-muted border-transparent hover:text-navy hover:border-gray-300'
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

// ─── Case Study Card ─────────────────────────────────────────────────
interface CaseStudyCardProps {
  image?: string
  badge: string
  title: string
  client: string
  outcomes: { title: string; description: string }[]
  visible: boolean
  delay?: number
}
export function CaseStudyCard({ badge, title, client, outcomes, visible, delay = 0, image }: CaseStudyCardProps) {
  return (
    <div className={`bg-white border border-gray-200 overflow-hidden group
      transition-all duration-500 hover:shadow-lg hover:border-blue-500/30
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {/* Image area */}
      <div className="relative h-48 bg-navy-deep overflow-hidden">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-6xl font-black">{badge[0]}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="text-xs font-bold uppercase tracking-widest text-sky-400">{badge}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-base font-bold text-navy leading-tight">{title}</h4>
            <p className="text-xs text-muted mt-0.5">{client}</p>
          </div>
          <span className="flex-shrink-0 px-2 py-1 text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            {badge.includes('Completed') ? 'Done' : 'Active'}
          </span>
        </div>

        <div className="space-y-3 mt-4">
          {outcomes.map((outcome, i) => (
            <div key={i} className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-navy">{outcome.title}</div>
                <div className="text-xs text-mid mt-0.5 leading-relaxed">{outcome.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── CTA Button ─────────────────────────────────────────────────────
interface CTAButtonProps {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  className?: string
  onClick?: () => void
}
export function CTAButton({ children, href, variant = 'primary', className = '', onClick }: CTAButtonProps) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200'
  const variants = {
    primary: 'bg-navy text-white hover:bg-navy-light hover:shadow-lg',
    secondary: 'bg-transparent text-navy border border-navy hover:bg-navy hover:text-white',
    ghost: 'bg-transparent text-navy hover:text-blue-600',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return <button onClick={onClick} className={cls}>{children}</button>
}

// ─── Scroll Indicator ───────────────────────────────────────────────
export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2 animate-bounceDown" style={{ animationDuration: '1.8s' }}>
      <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
      <svg className="w-5 h-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  )
}

// ─── Grid Dot Pattern ───────────────────────────────────────────────
export function GridPattern({ light = false }: { light?: boolean }) {
  return (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: light
          ? 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)'
          : 'linear-gradient(#001081 1px, transparent 1px), linear-gradient(90deg, #001081 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    />
  )
}

// FloatingOrb — animated gradient blob
export function FloatingOrb({ size = 600, color = '#0070C0', blur = 120, duration = 8, className = '' }: {
  size?: number, color?: string, blur?: number, duration?: number, className?: string
}) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none animate-float ${className}`}
      style={{
        width: size, height: size,
        background: `radial-gradient(circle, ${color}55 0%, ${color}11 50%, transparent 70%)`,
        filter: `blur(${blur}px)`,
        animationDuration: `${duration}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
      }}
    />
  )
}

// AnimatedCounter — simple counter
export function AnimatedCounter({ value, label }: { value: string, label: string }) {
  return (
    <div className="text-center">
      <div className="text-5xl lg:text-7xl font-black text-white mb-2">{value}</div>
      <div className="text-xs text-white/35 uppercase tracking-widest">{label}</div>
    </div>
  )
}
