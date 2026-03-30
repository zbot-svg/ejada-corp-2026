'use client'

import { useRef } from 'react'
import { SectionLabel, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function Partners() {
  const { partners } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })

  return (
    <section className="relative bg-white overflow-hidden section-pad-sm border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-10">
        <div ref={ref} className={className}>
          <SectionLabel>{partners.label}</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-3"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
                {partners.headline}
              </h2>
              <p className="text-base text-mid leading-relaxed">{partners.body}</p>
            </div>
          </div>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
          {partners.list.map((partner, i) => (
            <PartnerLogo key={partner} name={partner} delay={i * 50} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnerLogo({ name, delay }: { name: string; delay: number }) {
  const { ref, visible, className } = useReveal({ threshold: 0.3, delay })

  return (
    <div
      ref={ref}
      className={`${className} bg-gray-50 border border-gray-200 px-6 py-5 flex items-center justify-center
        group hover:bg-navy hover:border-navy transition-all duration-300 cursor-default`}
    >
      <span className="text-sm font-bold text-gray-400 group-hover:text-white transition-colors duration-300 text-center leading-tight">
        {name}
      </span>
    </div>
  )
}
