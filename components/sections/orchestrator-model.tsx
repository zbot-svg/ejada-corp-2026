'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { FadeUp, Stagger } from '@/components/primitives/fade-up'
import { useContent } from '@/lib/content-context'

export default function OrchestratorModel() {
  const pageContent = useContent()
  const { orchestratorModel } = pageContent
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.7], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Subtle background grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: 0.5,
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <FadeUp delay={0.05}><SectionLabel>{orchestratorModel.label}</SectionLabel></FadeUp>

          <TextReveal
            by="word" delay={0.1} stagger={0.05}
            className="font-black leading-tight tracking-tight mb-6"
            style={{
              fontSize: 'clamp(28px,4vw,52px)',
              letterSpacing: '-0.025em',
              color: 'var(--color-text-primary)',
            } as React.CSSProperties}
          >
            {orchestratorModel.headline}
          </TextReveal>

          <FadeUp delay={0.35}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {orchestratorModel.body}
            </p>
          </FadeUp>
        </div>

        {/* Animated connector line */}
        <div className="relative hidden lg:block mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
            style={{ backgroundColor: 'var(--color-border)' }} />
          <motion.div
            className="absolute top-1/2 left-0 h-px -translate-y-1/2"
            style={{
              width: lineWidth,
              backgroundColor: 'var(--color-accent)',
            }}
          />
        </div>

        {/* Pillars */}
        <Stagger stagger={0.1} direction="up" distance={32} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {orchestratorModel.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              className="relative p-6 border group cursor-default"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
              whileHover={{
                borderColor: 'var(--color-accent)',
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              {/* Top accent on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: 'var(--color-accent)' }}
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Number */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xs font-mono"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {pillar.number}
                </span>
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-border)' }} />
                {/* Arrow for connected flow */}
                {i < orchestratorModel.pillars.length - 1 && (
                  <div className="hidden lg:block" style={{ color: 'var(--color-text-muted)' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>

              <h3
                className="text-lg font-black mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-200"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
