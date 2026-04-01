'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticCursor
 * ─────────────────────────────────────────────────────────────────────────────
 * A premium two-part cursor:
 *   • Outer ring  — large, slow follower with spring physics
 *   • Inner dot   — small, instant tracker
 *
 * Elements with data-magnetic attract the outer ring on hover.
 * Elements with data-cursor="text" expand into a text pill.
 * Elements with data-cursor="hide" hide the cursor entirely.
 *
 * Usage in any component:
 *   <button data-magnetic>Click me</button>
 *   <a data-cursor="text" data-cursor-label="View">Project</a>
 */
export function MagneticCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Outer ring — spring with lag
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 })

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'hidden'>('default')
  const [cursorLabel, setCursorLabel] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    let currentX = -200
    let currentY = -200

    const onMouseMove = (e: MouseEvent) => {
      currentX = e.clientX
      currentY = e.clientY

      if (!isVisible) setIsVisible(true)

      // Check for magnetic elements
      const target = e.target as HTMLElement
      const magnetic = target.closest('[data-magnetic]')
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor')
      const label = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label') || ''

      if (cursorType === 'hide') {
        setCursorState('hidden')
      } else if (cursorType === 'text') {
        setCursorState('text')
        setCursorLabel(label)
      } else if (magnetic || target.closest('button, a, [role="button"]')) {
        setCursorState('hover')
      } else {
        setCursorState('default')
        setCursorLabel('')
      }

      // Magnetic pull toward element center
      if (magnetic) {
        const rect = (magnetic as HTMLElement).getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        mouseX.set(cx + dx * 0.35)
        mouseY.set(cy + dy * 0.35)
      } else {
        mouseX.set(currentX)
        mouseY.set(currentY)
      }
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, mouseX, mouseY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  const ringSize = cursorState === 'text' ? 96 : cursorState === 'hover' ? 56 : 36
  const ringOpacity = cursorState === 'hidden' ? 0 : isVisible ? 1 : 0

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
          mixBlendMode: cursorState === 'hover' ? 'difference' : 'normal',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <div
          className="w-full h-full rounded-full border transition-all duration-200"
          style={{
            borderColor: 'var(--color-accent)',
            backgroundColor: cursorState === 'hover' ? 'var(--color-accent)' : 'transparent',
            opacity: cursorState === 'hover' ? 0.15 : 1,
          }}
        />
        {cursorState === 'text' && (
          <span className="absolute text-[10px] font-bold uppercase tracking-widest text-center"
            style={{ color: 'var(--color-accent)' }}>
            {cursorLabel || 'View'}
          </span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorState === 'hover' ? 6 : 5,
          height: cursorState === 'hover' ? 6 : 5,
          opacity: cursorState === 'hidden' ? 0 : isVisible ? 1 : 0,
          backgroundColor: 'var(--color-accent)',
        }}
        transition={{ type: 'tween', duration: 0 }}
      />
    </>
  )
}
