'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { FadeUp } from '@/components/primitives/fade-up'
import { pageContent } from '@/lib/content'

export default function WhatWeEnable() {
  const { whatWeEnable } = pageContent

  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <FadeUp delay={0.05}><SectionLabel>{whatWeEnable.label}</SectionLabel></FadeUp>
            <TextReveal
              by="word" delay={0.1} stagger={0.06}
              className="font-black leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px,4vw,52px)',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
              } as React.CSSProperties}
            >
              {whatWeEnable.headline}
            </TextReveal>
          </div>
        </div>

        {/* Outcome cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
          {whatWeEnable.outcomes.map((outcome, i) => (
            <motion.div
              key={outcome.number}
              className="flex-shrink-0 w-[260px] lg:w-auto relative p-6 border group cursor-default"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.08 }}
              whileHover={{ y: -4, borderColor: 'var(--color-accent)', transition: { duration: 0.2 } }}
            >
              {/* Top accent on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: 'var(--color-accent-mint)' }}
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />

              <span
                className="text-xs font-mono mb-4 block"
                style={{ color: 'var(--color-accent)' }}
              >
                {outcome.number}
              </span>

              <h3
                className="text-xl font-black mb-4 group-hover:text-[var(--color-accent)] transition-colors duration-200"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {outcome.title}
              </h3>

              <ul className="space-y-2">
                {outcome.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <div
                      className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    />
                    <span className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
