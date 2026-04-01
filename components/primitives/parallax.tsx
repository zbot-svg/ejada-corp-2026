'use client'

import { useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'

/**
 * Parallax
 * ─────────────────────────────────────────────────────────────────────────────
 * Scroll-linked parallax layer. As the user scrolls, the child moves at a
 * different speed than the page — creating depth.
 *
 * Usage:
 *   <Parallax speed={0.3}>
 *     <img src="hero.jpg" className="w-full h-full object-cover" />
 *   </Parallax>
 *
 *   // Negative speed = moves opposite direction (outward parallax)
 *   <Parallax speed={-0.15} axis="x">
 *     <DecorativeElement />
 *   </Parallax>
 */
interface ParallaxProps {
  children: ReactNode
  speed?: number           // 0 = no movement, 1 = full page speed, 0.3 = 30% offset
  axis?: 'y' | 'x'
  className?: string
  style?: React.CSSProperties
  spring?: boolean         // smoother but slightly delayed
}

export function Parallax({
  children,
  speed = 0.3,
  axis = 'y',
  className = '',
  style,
  spring: useSpring_ = false,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Map scroll progress [0→1] to translate offset
  const translateRaw = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 100}%`, `${speed * 100}%`]
  )

  const translateSpring = useSpring(translateRaw as MotionValue<string>, {
    stiffness: 100,
    damping: 30,
  })

  const translate = useSpring_ ? translateSpring : translateRaw

  const motionStyle =
    axis === 'y'
      ? { y: translate }
      : { x: translate }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={style}>
      <motion.div
        style={{
          ...motionStyle,
          willChange: 'transform',
          // Compensate for overflow so edges don't clip
          height: Math.abs(speed) > 0 ? `${100 + Math.abs(speed) * 200}%` : '100%',
          width: axis === 'x' ? `${100 + Math.abs(speed) * 200}%` : '100%',
          top: axis === 'y' ? `${-Math.abs(speed) * 100}%` : 'auto',
          left: axis === 'x' ? `${-Math.abs(speed) * 100}%` : 'auto',
          position: 'relative',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/**
 * ParallaxText
 * ─────────────────────────────────────────────────────────────────────────────
 * Large text that moves horizontally as the user scrolls.
 * Common pattern on Awwwards-winning sites.
 *
 * Usage:
 *   <ParallaxText speed={0.08} className="text-[20vw] font-black opacity-5">
 *     EJADA SYSTEMS
 *   </ParallaxText>
 */
interface ParallaxTextProps {
  children: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
}

export function ParallaxText({
  children,
  speed = 0.1,
  reverse = false,
  className = '',
}: ParallaxTextProps) {
  const { scrollY } = useScroll()
  const factor = reverse ? -speed : speed

  const x = useTransform(scrollY, [0, 3000], ['0%', `${factor * 100}%`])

  return (
    <div className="overflow-hidden pointer-events-none">
      <motion.div style={{ x, whiteSpace: 'nowrap' }} className={className}>
        {children}
      </motion.div>
    </div>
  )
}

/**
 * ScrollRevealScale
 * ─────────────────────────────────────────────────────────────────────────────
 * Element scales from small to full size as it enters the viewport —
 * the "zoom in" reveal used on premium portfolio sites.
 *
 * Usage:
 *   <ScrollRevealScale>
 *     <img src="project.jpg" className="w-full h-full object-cover" />
 *   </ScrollRevealScale>
 */
export function ScrollRevealScale({
  children,
  className = '',
  from = 0.85,
}: {
  children: ReactNode
  className?: string
  from?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.3'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [from, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.8, 1])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ scale, opacity, transformOrigin: 'center center' }}>
        {children}
      </motion.div>
    </div>
  )
}
