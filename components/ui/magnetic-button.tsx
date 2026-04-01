'use client'

import { useRef, useState, ReactNode, MouseEvent } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * MagneticButton
 * ─────────────────────────────────────────────────────────────────────────────
 * A button that magnetically pulls toward the cursor when hovered.
 * The inner content shifts more aggressively than the outer container
 * creating a "reaching toward you" effect.
 *
 * Usage:
 *   <MagneticButton>Get in Touch</MagneticButton>
 *   <MagneticButton variant="outline" href="/contact">Start a Project</MagneticButton>
 *   <MagneticButton variant="ghost" icon={<ArrowRight />}>Learn More</MagneticButton>
 *   <MagneticButton variant="pill" className="bg-mint">Download PDF</MagneticButton>
 */

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'pill' | 'dark'

interface MagneticButtonProps {
  children: ReactNode
  href?: string
  variant?: ButtonVariant
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  onClick?: () => void
  disabled?: boolean
  strength?: number      // 0–1, magnetic pull strength
  type?: 'button' | 'submit' | 'reset'
}

export function MagneticButton({
  children,
  href,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  className = '',
  onClick,
  disabled = false,
  strength = 0.35,
  type = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 200, damping: 20 })
  const y = useSpring(0, { stiffness: 200, damping: 20 })
  const innerX = useSpring(0, { stiffness: 300, damping: 25 })
  const innerY = useSpring(0, { stiffness: 300, damping: 25 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength

    x.set(dx)
    y.set(dy)
    innerX.set(dx * 0.6)
    innerY.set(dy * 0.6)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    innerX.set(0)
    innerY.set(0)
    setIsHovered(false)
  }

  const baseStyles: Record<ButtonVariant, string> = {
    primary: `
      px-7 py-3.5 text-sm font-semibold
      bg-[var(--color-text-primary)] text-white
      border border-[var(--color-text-primary)]
      hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)]
    `,
    dark: `
      px-7 py-3.5 text-sm font-semibold
      bg-[var(--color-accent)] text-white
      border border-[var(--color-accent)]
      hover:bg-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]
    `,
    outline: `
      px-7 py-3.5 text-sm font-semibold
      bg-transparent text-[var(--color-text-primary)]
      border border-[var(--color-text-primary)]
      hover:bg-[var(--color-text-primary)] hover:text-white
    `,
    ghost: `
      px-4 py-2 text-sm font-semibold
      bg-transparent text-[var(--color-text-primary)]
      border border-transparent
      hover:border-[var(--color-border)]
    `,
    pill: `
      px-6 py-2.5 text-xs font-bold uppercase tracking-widest
      bg-[var(--color-accent-mint)] text-[var(--color-text-primary)]
      rounded-full border border-transparent
    `,
  }

  const content = (
    <motion.div
      className="flex items-center gap-2.5"
      style={{ x: innerX, y: innerY }}
    >
      {icon && iconPosition === 'left' && (
        <motion.span
          animate={isHovered ? { x: -2, rotate: -10 } : { x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {icon}
        </motion.span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <motion.span
          animate={isHovered ? { x: 4 } : { x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.div>
  )

  const combinedClassName = `
    relative inline-flex items-center justify-center
    overflow-hidden
    transition-colors duration-200 cursor-pointer select-none
    ${baseStyles[variant]}
    ${disabled ? 'opacity-40 pointer-events-none' : ''}
    ${className}
  `

  // Animated shine overlay
  const shine = isHovered && (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: '200%', opacity: [0, 0.15, 0] }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      }}
    />
  )

  const motionStyle = { x, y }
  const handlers = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: () => setIsHovered(true),
  }

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...handlers}
        href={href}
        style={motionStyle}
        className={combinedClassName}
        data-magnetic
      >
        {shine}
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...handlers}
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={motionStyle}
      className={combinedClassName}
      data-magnetic
    >
      {shine}
      {content}
    </motion.button>
  )
}

/**
 * ArrowButton
 * ─────────────────────────────────────────────────────────────────────────────
 * Minimal animated link with a sliding arrow — common on editorial sites.
 *
 * Usage:
 *   <ArrowButton href="/capabilities">View All Capabilities</ArrowButton>
 */
export function ArrowButton({
  children,
  href,
  onClick,
  className = '',
  light = false,
}: {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  light?: boolean
}) {
  const [hovered, setHovered] = useState(false)
  const color = light ? 'text-white' : 'text-[var(--color-text-primary)]'
  const borderColor = light ? 'border-white/20' : 'border-[var(--color-border)]'

  const inner = (
    <div
      className={`group flex items-center gap-3 text-sm font-semibold ${color} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="relative">
        {children}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-current transition-all duration-300 ${hovered ? 'w-full' : 'w-0'}`}
        />
      </span>
      <motion.div
        animate={hovered ? { x: 4 } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex items-center justify-center w-8 h-8 border rounded-full"
        style={{ borderColor: light ? 'rgba(255,255,255,0.3)' : 'var(--color-border)' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  )

  if (href) return <a href={href}>{inner}</a>
  return <button onClick={onClick}>{inner}</button>
}
