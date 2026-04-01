'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

/**
 * FadeUp / FadeIn / FadeLeft / FadeRight
 * ─────────────────────────────────────────────────────────────────────────────
 * Drop-in scroll reveal wrappers. Wraps any content and animates it into view.
 *
 * Usage:
 *   <FadeUp>
 *     <Card />
 *   </FadeUp>
 *
 *   <FadeUp delay={0.2} distance={60} duration={0.8}>
 *     <h2>Headline</h2>
 *   </FadeUp>
 *
 *   <FadeUp direction="left">
 *     <SidePanel />
 *   </FadeUp>
 */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  direction?: Direction
  className?: string
  once?: boolean
  threshold?: number
  blur?: boolean
  scale?: boolean
}

function getInitial(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':    return { y: distance, x: 0 }
    case 'down':  return { y: -distance, x: 0 }
    case 'left':  return { x: distance, y: 0 }
    case 'right': return { x: -distance, y: 0 }
    default:      return { x: 0, y: 0 }
  }
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 40,
  direction = 'up',
  className = '',
  once = true,
  threshold = 0.12,
  blur = false,
  scale = false,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const { x, y } = getInitial(direction, distance)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y, filter: blur ? 'blur(10px)' : 'none', scale: scale ? 0.96 : 1 }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: 'blur(0px)', scale: 1 }
          : { opacity: 0, x, y, filter: blur ? 'blur(10px)' : 'none', scale: scale ? 0.96 : 1 }
      }
      transition={{
        type: 'spring',
        stiffness: 70,
        damping: 20,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// Named convenience exports
export const FadeIn = (props: FadeUpProps) => <FadeUp {...props} direction="none" />
export const FadeLeft = (props: FadeUpProps) => <FadeUp {...props} direction="right" />
export const FadeRight = (props: FadeUpProps) => <FadeUp {...props} direction="left" />

/**
 * Stagger
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps children and staggers their reveal animations in sequence.
 *
 * Usage:
 *   <Stagger stagger={0.1} delay={0.2}>
 *     <Card />
 *     <Card />
 *     <Card />
 *   </Stagger>
 */
interface StaggerProps {
  children: ReactNode
  stagger?: number
  delay?: number
  direction?: Direction
  distance?: number
  className?: string
  once?: boolean
  threshold?: number
}

const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
}

const staggerChild = (direction: Direction, distance: number): Variants => ({
  hidden: {
    opacity: 0,
    ...getInitial(direction, distance),
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
    },
  },
})

export function Stagger({
  children,
  stagger = 0.08,
  delay = 0,
  direction = 'up',
  distance = 32,
  className = '',
  once = true,
  threshold = 0.1,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount: threshold })
  const childVariants = staggerChild(direction, distance)

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={stagger}
      style={{ transitionDelay: `${delay}s` }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  )
}
