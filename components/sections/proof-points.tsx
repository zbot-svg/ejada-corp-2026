'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { CountUpRow } from '@/components/primitives/count-up'
import { MarqueeText } from '@/components/primitives/marquee'
import { useContent } from '@/lib/content-context'

export default function ProofPoints() {
  const pageContent = useContent()
  const { proofPoints } = pageContent

  return (
    <section
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: 'var(--color-text-primary)' }}
    >
      {/* Ambient marquee backdrop */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden select-none">
        <MarqueeText
          items={pageContent.proofPointsMarquee}
          speed={50}
          className="opacity-[0.05]"
          textClassName="text-[clamp(48px,8vw,100px)] font-black text-white whitespace-nowrap"
        />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 65%)', opacity: 0.08 }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20">
          <div>
            <SectionLabel light>{proofPoints.label}</SectionLabel>
            <TextReveal
              by="word" delay={0.1} stagger={0.06}
              className="font-black leading-tight tracking-tight text-white"
              style={{
                fontSize: 'clamp(28px,4vw,52px)',
                letterSpacing: '-0.025em',
              } as React.CSSProperties}
            >
              {proofPoints.headline}
            </TextReveal>
          </div>
          <motion.p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {proofPoints.subheadline}
          </motion.p>
        </div>

        {/* Count-up stats with dividers */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          {proofPoints.stats.map((stat: any, i: number) => (
            <motion.div
              key={stat.label}
              className="relative py-10 px-6 lg:px-10"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.1 }}
            >
              {/* Vertical divider */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-6 bottom-6 w-px"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                />
              )}
              <div
                className="text-[clamp(48px,7vw,80px)] font-black leading-none tracking-tight text-white"
                style={{ letterSpacing: '-0.03em' }}
              >
                {/* Uses in-view counting via CountUp internally */}
                {stat.value}
              </div>
              <div
                className="text-xs font-semibold uppercase tracking-[0.18em] mt-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
