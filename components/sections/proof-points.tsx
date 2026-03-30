'use client'

import { useRef } from 'react'
import { SectionLabel, StatCounter, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function ProofPoints() {
  const { proofPoints } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.2 })

  return (
    <section className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0070C0 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div ref={ref} className={className}>
          <SectionLabel light>{proofPoints.label}</SectionLabel>
          <h2 className="text-white font-black leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            {proofPoints.headline}
          </h2>
          <p className="text-sm text-white/40 mb-16 max-w-md">
            {proofPoints.subheadline}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {proofPoints.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }}
            >
              <StatCounter value={stat.value} label={stat.label} visible={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
