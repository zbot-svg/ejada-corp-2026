'use client'

import { useState } from 'react'
import { SectionLabel, CapabilityTile, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function Capabilities() {
  const { capabilities } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.05 })
  const [activeCapability, setActiveCapability] = useState<string | null>(null)

  return (
    <section id="capabilities" className="relative bg-white overflow-hidden section-pad">
      <div className="container mx-auto px-6 lg:px-10">
        <div ref={ref} className={className}>
          <SectionLabel>{capabilities.label}</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">
            <div>
              <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-4"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {capabilities.headline}
              </h2>
              <p className="text-base text-mid leading-relaxed max-w-lg">
                {capabilities.body}
              </p>
            </div>
          </div>
        </div>

        {/* Capability tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.items.map((cap, i) => (
            <CapabilityTile
              key={cap.id}
              number={cap.number}
              title={cap.title}
              shortDesc={cap.shortDesc}
              tags={cap.tags}
              longDesc={cap.longDesc}
              visible={visible}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
