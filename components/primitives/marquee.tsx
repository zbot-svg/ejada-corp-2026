'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

/**
 * Marquee
 * ─────────────────────────────────────────────────────────────────────────────
 * Infinite horizontal scroll marquee. Renders children twice for seamless loop.
 * Pure CSS animation — no scroll dependency, always moving.
 *
 * Usage:
 *   // Partner logos strip
 *   <Marquee speed={30} gap={64}>
 *     {logos.map(l => <LogoItem key={l.id} {...l} />)}
 *   </Marquee>
 *
 *   // Large ambient text strip
 *   <Marquee speed={20} reverse className="py-6 opacity-[0.04]">
 *     {['EJADA', '·', 'NATIONAL TRANSFORMATION', '·', 'ORCHESTRATOR', '·'].map((t, i) => (
 *       <span key={i} className="text-[clamp(40px,8vw,80px)] font-black whitespace-nowrap mx-8">
 *         {t}
 *       </span>
 *     ))}
 *   </Marquee>
 */
interface MarqueeProps {
  children: ReactNode
  speed?: number          // seconds for one full cycle (lower = faster)
  reverse?: boolean       // scroll right-to-left
  gap?: number            // gap between items in px
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  speed = 40,
  reverse = false,
  gap = 48,
  pauseOnHover = false,
  className = '',
}: MarqueeProps) {
  return (
    <div
      className={`overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
          ...(pauseOnHover ? { ['--play-state' as string]: 'running' } : {}),
        }}
      >
        {/* Render twice for seamless loop */}
        <div className="flex" style={{ gap }}>
          {children}
        </div>
        <div className="flex" style={{ gap, paddingLeft: gap }} aria-hidden>
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        ${pauseOnHover ? `div:hover { animation-play-state: paused; }` : ''}
      `}</style>
    </div>
  )
}

/**
 * MarqueeText
 * ─────────────────────────────────────────────────────────────────────────────
 * Convenience wrapper for ambient text strips.
 * Handles the large decorative text pattern automatically.
 *
 * Usage:
 *   <MarqueeText
 *     items={['EJADA', '·', 'NATIONAL TRANSFORMATION', '·']}
 *     className="text-[8vw] font-black text-navy/[0.04]"
 *   />
 */
export function MarqueeText({
  items,
  speed = 35,
  reverse = false,
  separator = '·',
  className = '',
  textClassName = '',
}: {
  items: string[]
  speed?: number
  reverse?: boolean
  separator?: string
  className?: string
  textClassName?: string
}) {
  return (
    <Marquee speed={speed} reverse={reverse} gap={0} className={className}>
      {items.map((item, i) => (
        <span key={i} className={`whitespace-nowrap px-6 ${textClassName}`}>
          {item}
          {i < items.length - 1 && (
            <span className="mx-6 opacity-40">{separator}</span>
          )}
        </span>
      ))}
    </Marquee>
  )
}
