'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { Stagger } from '@/components/primitives/fade-up'
import { MarqueeText } from '@/components/primitives/marquee'
import { useContent } from '@/lib/content-context'

export default function WhatWeBelieve() {
  const pageContent = useContent()
  const { whatWeBelieve } = pageContent

  return (
    <section
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: 'var(--color-text-primary)' }}
    >
      {/* Ambient marquee backdrop */}
      <div className="absolute inset-0 flex flex-col justify-center gap-0 pointer-events-none overflow-hidden select-none">
        {['VISION', 'MISSION', 'PURPOSE'].map((word, i) => (
          <MarqueeText
            key={word}
            items={[word, '·', word, '·', word, '·']}
            speed={60 + i * 15}
            reverse={i % 2 !== 0}
            className="opacity-[0.04]"
            textClassName="text-[clamp(60px,10vw,120px)] font-black text-white whitespace-nowrap"
          />
        ))}
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="mb-16">
          <SectionLabel light>{whatWeBelieve.label}</SectionLabel>
          <TextReveal
            by="word"
            delay={0.1}
            stagger={0.06}
            className="font-black leading-tight tracking-tight"
            style={{
              fontSize: 'clamp(28px,4vw,52px)',
              letterSpacing: '-0.025em',
              color: 'white',
            } as React.CSSProperties}
          >
            {whatWeBelieve.headline}
          </TextReveal>
        </div>

        <Stagger stagger={0.12} direction="up" distance={40} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whatWeBelieve.beliefs.map((belief: any) => (
            <motion.div
              key={belief.number}
              className="relative p-8 border group cursor-default"
              style={{
                borderColor: 'rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.04)',
              }}
              whileHover={{
                borderColor: 'var(--color-accent)',
                backgroundColor: 'rgba(255,255,255,0.07)',
                y: -4,
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: 'var(--color-accent)' }}
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />

              <div
                className="text-5xl font-black mb-6 leading-none"
                style={{ color: 'rgba(255,255,255,0.08)' }}
              >
                {belief.number}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{belief.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {belief.body}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
