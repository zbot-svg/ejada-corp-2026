'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * PartnerLogo
 * ─────────────────────────────────────────────────────────────────────────────
 * Grayscale partner logo that colorizes on hover with a smooth spring.
 *
 * Usage:
 *   <PartnerLogo name="SAP" src="/logos/sap.svg" index={0} />
 */
interface PartnerLogoProps {
  name: string
  src?: string
  index?: number
}

export function PartnerLogo({ name, src, index = 0 }: PartnerLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: index * 0.04,
      }}
      className="flex items-center justify-center p-6 border group cursor-pointer"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        height: 80,
      }}
      whileHover={{
        borderColor: 'var(--color-accent)',
        backgroundColor: 'var(--color-bg-accent)',
      }}
      data-magnetic
    >
      {src ? (
        <motion.img
          src={src}
          alt={name}
          className="max-h-8 w-auto object-contain"
          style={{ filter: 'grayscale(1)', opacity: 0.5 }}
          whileHover={{ filter: 'grayscale(0)', opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <span
          className="text-xs font-bold uppercase tracking-widest transition-colors duration-200"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {name}
        </span>
      )}
    </motion.div>
  )
}

/**
 * PartnerGrid
 * ─────────────────────────────────────────────────────────────────────────────
 * Pre-built responsive grid for partner logos.
 *
 * Usage:
 *   <PartnerGrid partners={pageContent.partners} columns={5} />
 */
interface Partner {
  name: string
  logo?: string
}

export function PartnerGrid({
  partners,
  columns = 4,
}: {
  partners: Partner[]
  columns?: 3 | 4 | 5 | 6
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const colClass: Record<number, string> = {
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6',
  }

  return (
    <div ref={ref} className={`grid ${colClass[columns]} gap-3`}>
      {isInView &&
        partners.map((partner, i) => (
          <PartnerLogo
            key={partner.name}
            name={partner.name}
            src={partner.logo}
            index={i}
          />
        ))}
    </div>
  )
}
