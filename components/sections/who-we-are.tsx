'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { FadeUp, FadeRight } from '@/components/primitives/fade-up'
import { CountUp } from '@/components/primitives/count-up'
import { Parallax } from '@/components/primitives/parallax'
import { TextReveal } from '@/components/primitives/text-reveal'
import { useContent } from '@/lib/content-context'

export default function WhoWeAre() {
  const pageContent = useContent()
  const { whoWeAre, footprint } = pageContent

  return (
    <>
      {/* ── Who We Are ─────────────────────────────────────── */}
      <section id="about" className="relative overflow-hidden section-pad" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            <div>
              <FadeUp delay={0.05}><SectionLabel>{whoWeAre.label}</SectionLabel></FadeUp>

              <div className="mb-6">
                <TextReveal
                  by="word" delay={0.1} stagger={0.05}
                  className="font-black leading-tight tracking-tight"
                  style={{ fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.025em', color: 'var(--color-text-primary)' } as React.CSSProperties}
                >
                  {whoWeAre.headline}
                </TextReveal>
              </div>

              <FadeUp delay={0.3}>
                <p className="text-base leading-relaxed mb-10 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
                  {whoWeAre.body}
                </p>
              </FadeUp>

              <div className="grid grid-cols-3 gap-6">
                {whoWeAre.stats.slice(0, 6).map((stat, i) => (
                  <div key={stat.label} className="border-t pt-4" style={{ borderColor: 'var(--color-border)' }}>
                    <CountUp value={stat.value} label={stat.label} size="lg" delay={i * 0.1 + 0.2} />
                  </div>
                ))}
              </div>
            </div>

            <FadeRight delay={0.15} threshold={0.1}>
              <div className="relative">
                <Parallax speed={0.12} className="aspect-[3/4] overflow-hidden">
                  <img src="/images/building-01.jpg" alt="Ejada HQ" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </Parallax>
                <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 pointer-events-none -z-10"
                  style={{ border: '1px solid var(--color-border)' }} />
                <motion.div
                  className="absolute -bottom-6 -left-6 px-6 py-4 shadow-xl"
                  style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
                >
                  <div className="text-3xl font-black leading-none">20+</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-80 mt-1">Years in KSA</div>
                </motion.div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ── Footprint ──────────────────────────────────────── */}
      <section className="relative overflow-hidden section-pad-sm" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="container mx-auto px-6 lg:px-10">
          <FadeUp>
            <SectionLabel>{footprint.label}</SectionLabel>
            <h2 className="font-black leading-tight tracking-tight mb-3"
              style={{ fontSize: 'clamp(24px,3.5vw,40px)', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
              {footprint.headline}
            </h2>
            <p className="text-sm leading-relaxed mb-10 max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
              {footprint.body}
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {footprint.locations.map((loc, i) => (
              <motion.div key={loc.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: i * 0.07 }}
                className="group p-4 border cursor-default"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                whileHover={{ borderColor: 'var(--color-accent)', y: -2 }}
              >
                <div className="text-[9px] font-bold uppercase tracking-widest mb-1.5" style={{ color: 'var(--color-accent)' }}>{loc.type}</div>
                <div className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>{loc.city}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{loc.country}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
