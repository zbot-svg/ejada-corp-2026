'use client'

import { useRef } from 'react'
import { SectionLabel, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function Values() {
  const { values } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })
  const { ref: rRef, visible: rVisible, className: rClass } = useReveal({ threshold: 0.1, delay: 150 })

  return (
    <section className="relative bg-white overflow-hidden section-pad">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — editorial headline */}
          <div ref={ref} className={className}>
            <SectionLabel>{values.label}</SectionLabel>
            <div className="text-[clamp(64px,10vw,120px)] font-black leading-none text-navy tracking-tighter"
              style={{ letterSpacing: '-0.04em' }}>
              {values.headline}
            </div>
            <p className="text-base text-mid leading-relaxed mt-8 max-w-sm">
              {values.subheadline}
            </p>
          </div>

          {/* Right — values list */}
          <div ref={rRef} className={rClass}>
            {values.values.map((val, i) => (
              <ValueRow key={val.letter} value={val} index={i} visible={rVisible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ValueRow({ value, index, visible }: {
  value: { letter: string; title: string; description: string }
  index: number
  visible: boolean
}) {
  return (
    <div
      className={`group flex items-start gap-6 py-5 border-b border-gray-100
        last:border-b-0 hover:border-blue-600/20 transition-all duration-300
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
      style={{ transitionDelay: visible ? `${index * 80}ms` : '0ms' }}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center
        bg-navy text-white text-xl font-black group-hover:bg-blue-600 transition-colors duration-300">
        {value.letter}
      </div>
      <div className="flex-1 pt-2">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="text-base font-bold text-navy group-hover:text-blue-600 transition-colors duration-200">
            {value.title}
          </h4>
          <div className="w-4 h-px bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right flex-shrink-0 mt-3" />
        </div>
        <p className="text-sm text-muted mt-0.5">{value.description}</p>
      </div>
    </div>
  )
}
