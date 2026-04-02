'use client'

import { useRef, useEffect, useState, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

/**
 * TextReveal
 * ─────────────────────────────────────────────────────────────────────────────
 * Splits text into words or characters and animates each one in on scroll.
 *
 * Usage:
 *   <TextReveal as="h1" className="font-display">
 *     Architects of Coherence
 *   </TextReveal>
 *
 *   <TextReveal by="word" delay={0.2} className="text-xl">
 *     Building the Kingdom's digital future
 *   </TextReveal>
 */

type RevealBy = 'word' | 'char' | 'line'
type As = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'

interface TextRevealProps {
  children: string | ReactNode
  as?: As
  by?: RevealBy
  delay?: number
  duration?: number
  stagger?: number
  className?: string
  style?: React.CSSProperties
  once?: boolean
  threshold?: number
  from?: 'bottom' | 'top' | 'left' | 'right'
  blur?: boolean
}

const charVariants: Variants = {
  hidden: (from: string) => ({
    opacity: 0,
    y: from === 'bottom' ? 60 : from === 'top' ? -60 : 0,
    x: from === 'left' ? -40 : from === 'right' ? 40 : 0,
    filter: 'blur(8px)',
    rotateX: from === 'bottom' ? 20 : 0,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      mass: 0.5,
    },
  },
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: 0,
    },
  }),
}

export function TextReveal({
  children,
  as: Tag = 'div',
  by = 'word',
  delay = 0,
  duration = 0.6,
  stagger = 0.04,
  className = '',
  style,
  once = true,
  threshold = 0.15,
  from = 'bottom',
  blur = true,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, amount: threshold })

  // Detect RTL to avoid overflow-hidden clipping Arabic descenders
  const [isRTL, setIsRTL] = useState(false)
  useEffect(() => {
    setIsRTL(document.documentElement.dir === 'rtl')
  }, [])

  // Convert children to string if needed
  const text = typeof children === 'string' ? children : ''

  // Split by word or character
  const units =
    by === 'char'
      ? text.split('')
      : by === 'word'
      ? text.split(/(\s+)/)
      : [text]

  if (!text) {
    // Fallback: just render children with a simple fade
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={stagger}
      style={{ transitionDelay: `${delay}s`, ...style }}
      className={`overflow-hidden ${className}`}
      aria-label={text}
    >
      {units.map((unit, i) => {
        // Whitespace — render as-is
        if (/^\s+$/.test(unit)) {
          return <span key={i} aria-hidden> </span>
        }

        return (
          <span
            key={i}
            className={`inline-block ${isRTL ? '' : 'overflow-hidden'}`}
            style={{ perspective: '1000px' }}
          >
            <motion.span
              className="inline-block"
              variants={{
                hidden: {
                  opacity: 0,
                  y: from === 'bottom' ? 50 : from === 'top' ? -50 : 0,
                  x: from === 'left' ? -30 : from === 'right' ? 30 : 0,
                  filter: blur ? 'blur(6px)' : 'none',
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: 'blur(0px)',
                  transition: {
                    type: 'spring',
                    stiffness: 100,
                    damping: 18,
                    delay: delay + i * stagger,
                  },
                },
              }}
              aria-hidden
            >
              {unit === ' ' ? '\u00A0' : unit}
            </motion.span>
          </span>
        )
      })}
    </motion.div>
  )
}

/**
 * RevealLine
 * ─────────────────────────────────────────────────────────────────────────────
 * A single line that slides up from beneath a clip mask — editorial print feel.
 *
 * Usage:
 *   <RevealLine delay={0.2}>
 *     <h2 className="font-h1">Our capabilities</h2>
 *   </RevealLine>
 */
export function RevealLine({
  children,
  delay = 0,
  className = '',
  once = true,
}: {
  children: ReactNode
  delay?: number
  className?: string
  once?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: 0.3 })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 18,
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
