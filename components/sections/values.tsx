'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { FadeUp, FadeLeft, FadeRight } from '@/components/primitives/fade-up'
import { useContent } from '@/lib/content-context'

export default function Values() {
  const pageContent = useContent()
  const { values } = pageContent

  return (
    <section
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Background image — very subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/images/stacked-slabs.jpg" alt="" className="w-full h-full object-cover opacity-[0.04]"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — editorial large type */}
          <FadeLeft delay={0.05}>
            <SectionLabel>{values.label}</SectionLabel>
            <div
              className="font-black leading-none tracking-tighter select-none"
              style={{
                fontSize: 'clamp(64px,10vw,128px)',
                letterSpacing: '-0.04em',
                color: 'var(--color-text-primary)',
              }}
            >
              {values.headline}
            </div>
            <p className="text-base leading-relaxed mt-8 max-w-sm" style={{ color: 'var(--color-text-muted)' }}>
              {values.subheadline}
            </p>
          </FadeLeft>

          {/* Right — staggered values list */}
          <FadeRight delay={0.15}>
            <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {values.values.map((val, i) => (
                <motion.div
                  key={val.letter}
                  className="group flex items-start gap-5 py-5 cursor-default"
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.07 }}
                  whileHover={{ x: 4 }}
                >
                  {/* Letter badge */}
                  <motion.div
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center text-lg font-black text-white transition-colors duration-200"
                    style={{ backgroundColor: 'var(--color-text-primary)' }}
                    whileHover={{ backgroundColor: 'var(--color-accent)' }}
                  >
                    {val.letter}
                  </motion.div>

                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <h4
                        className="text-sm font-bold group-hover:text-[var(--color-accent)] transition-colors duration-200"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {val.title}
                      </h4>
                      <motion.div
                        className="h-px w-5 flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-accent)' }}
                        initial={{ scaleX: 0, originX: 1 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.25 }}
                      />
                    </div>
                    <p className="text-xs leading-relaxed mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeRight>
        </div>
      </div>
    </section>
  )
}
