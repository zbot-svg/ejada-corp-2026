'use client'

import { useScroll, useSpring, motion } from 'framer-motion'

/**
 * ScrollProgress
 * ─────────────────────────────────────────────────────────────────────────────
 * A slim progress bar at the top of the viewport that fills as user scrolls.
 * Spring-smoothed for a premium fluid feel.
 *
 * Usage — add once to layout.tsx:
 *   <ScrollProgress />
 *   <ScrollProgress color="var(--color-accent-mint)" height={2} />
 */
interface ScrollProgressProps {
  color?: string
  height?: number
  zIndex?: number
}

export function ScrollProgress({
  color = 'var(--color-accent)',
  height = 2,
  zIndex = 100,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left pointer-events-none"
      style={{
        height,
        backgroundColor: color,
        scaleX,
        zIndex,
        transformOrigin: '0% 50%',
      }}
    />
  )
}
