'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion'

/**
 * CaseStudyCard
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium project/case study card with:
 *   - 3D tilt effect on mouse hover
 *   - Image parallax on hover
 *   - Smooth overlay reveal
 *
 * Usage:
 *   <CaseStudyCard
 *     badge="Finance"
 *     title="Core Banking Transformation"
 *     client="Saudi National Bank"
 *     image="/images/case-banking.jpg"
 *     outcomes={[
 *       { title: '40% faster', description: 'Transaction processing speed' },
 *     ]}
 *     index={0}
 *   />
 */
interface Outcome {
  title: string
  description: string
}

interface CaseStudyCardProps {
  badge: string
  title: string
  client: string
  image?: string
  outcomes: Outcome[]
  index?: number
  href?: string
}

export function CaseStudyCard({
  badge,
  title,
  client,
  image,
  outcomes,
  index = 0,
  href,
}: CaseStudyCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hovered, setHovered] = useState(false)

  // 3D tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setHovered(false)
  }

  // Use a div wrapper always; handle href via inner anchor if needed
  const isLink = !!href

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: index * 0.1,
      }}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="block overflow-hidden border group cursor-pointer"
        style={{
          rotateX,
          rotateY,
          borderColor: hovered ? 'var(--color-accent)' : 'var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          transformStyle: 'preserve-3d',
          transition: 'border-color 0.2s ease',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        data-cursor="text"
        data-cursor-label="View"
        onClick={href ? () => { window.location.href = href } : undefined}
      >
        {/* Image area */}
        <div className="relative h-52 overflow-hidden" style={{ backgroundColor: 'var(--color-bg-accent)' }}>
          {image && (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              animate={hovered ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ opacity: 0.7 }}
            />
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,8,32,0.85) 0%, rgba(0,8,32,0.2) 60%, transparent 100%)',
            }}
          />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
              style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
            >
              {badge}
            </span>
          </div>

          {/* Hover arrow */}
          <motion.div
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-white/30 rounded-full text-white"
            animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {client}
          </p>
          <h4
            className="text-base font-bold leading-snug mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-200"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {title}
          </h4>

          {/* Outcomes */}
          <div className="space-y-2.5">
            {outcomes.slice(0, 2).map((outcome, i) => (
              <div key={i} className="flex gap-2.5 items-start">
                <div
                  className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
                <div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {outcome.title}
                  </span>
                  <span
                    className="text-xs ml-1.5"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {outcome.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
