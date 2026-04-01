'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/**
 * CapabilityTile
 * ─────────────────────────────────────────────────────────────────────────────
 * An expandable tile with premium hover and accordion animations.
 * Uses AnimatePresence for smooth expand/collapse.
 *
 * Usage:
 *   <CapabilityTile
 *     number="01"
 *     title="Enterprise Applications"
 *     shortDesc="SAP, Oracle, Salesforce implementation and optimization."
 *     tags={['SAP', 'Oracle', 'Salesforce']}
 *     longDesc="Full-cycle ERP and CRM transformation..."
 *     index={0}
 *   />
 */
interface CapabilityTileProps {
  number: string
  title: string
  shortDesc: string
  tags: string[]
  longDesc: string
  index?: number
  icon?: React.ReactNode
}

export function CapabilityTile({
  number,
  title,
  shortDesc,
  tags,
  longDesc,
  index = 0,
  icon,
}: CapabilityTileProps) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: index * 0.07,
      }}
    >
      <motion.div
        className="relative overflow-hidden border cursor-pointer group"
        style={{
          borderColor: expanded
            ? 'var(--color-accent)'
            : 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
        animate={{
          borderColor: expanded ? 'var(--color-accent)' : 'var(--color-border)',
        }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        onClick={() => setExpanded(!expanded)}
        data-cursor="text"
        data-cursor-label={expanded ? 'Close' : 'Read'}
      >
        {/* Top accent line — animates in on hover/expand */}
        <motion.div
          className="absolute top-0 left-0 h-0.5"
          style={{ backgroundColor: 'var(--color-accent)' }}
          initial={{ width: '0%' }}
          animate={{ width: expanded ? '100%' : '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {number}
              </span>
              {icon && (
                <div style={{ color: 'var(--color-accent)' }}>{icon}</div>
              )}
            </div>

            {/* Animated +/× toggle */}
            <motion.div
              className="relative w-5 h-5 flex-shrink-0 mt-0.5"
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="7" y1="1" x2="7" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Title */}
          <h3
            className="text-base font-bold leading-snug mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-200"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h3>

          {/* Short description */}
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="pt-4 mt-4 text-sm leading-relaxed"
                  style={{
                    borderTop: '1px solid var(--color-border)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {longDesc}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * CapabilityGrid
 * ─────────────────────────────────────────────────────────────────────────────
 * Pre-built 3-column grid layout for capability tiles.
 *
 * Usage:
 *   <CapabilityGrid capabilities={pageContent.capabilities.items} />
 */
interface CapabilityItem {
  id: string
  number: string
  title: string
  shortDesc: string
  tags: string[]
  longDesc: string
}

export function CapabilityGrid({ capabilities }: { capabilities: CapabilityItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {capabilities.map((cap, i) => (
        <CapabilityTile key={cap.id} {...cap} index={i} />
      ))}
    </div>
  )
}
