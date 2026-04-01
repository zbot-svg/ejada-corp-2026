'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * SectionLabel
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium section eyebrow label with an animated accent line.
 *
 * Usage:
 *   <SectionLabel>Who We Are</SectionLabel>
 *   <SectionLabel light number="001">Our Capabilities</SectionLabel>
 *   <SectionLabel accent="mint">Proof Points</SectionLabel>
 */
interface SectionLabelProps {
  children: string
  light?: boolean
  number?: string
  accent?: 'blue' | 'mint' | 'white'
  className?: string
  animate?: boolean
}

export function SectionLabel({
  children,
  light = false,
  number,
  accent = 'blue',
  className = '',
  animate = true,
}: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  const accentColor = {
    blue:  light ? 'var(--color-accent-light)' : 'var(--color-accent)',
    mint:  'var(--color-accent-mint)',
    white: 'rgba(255,255,255,0.6)',
  }[accent]

  const textColor = light
    ? 'rgba(255,255,255,0.7)'
    : 'var(--color-text-muted)'

  return (
    <div
      ref={ref}
      className={`flex items-center gap-3 mb-6 ${className}`}
    >
      {/* Animated accent line */}
      <motion.div
        className="h-px"
        style={{ backgroundColor: accentColor }}
        initial={animate ? { width: 0 } : { width: 32 }}
        animate={animate && isInView ? { width: 32 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />

      {number && (
        <span
          className="text-[10px] font-mono"
          style={{ color: accentColor }}
        >
          {number}
        </span>
      )}

      <motion.span
        className="text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: textColor }}
        initial={animate ? { opacity: 0, x: -8 } : { opacity: 1 }}
        animate={animate && isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        {children}
      </motion.span>
    </div>
  )
}
