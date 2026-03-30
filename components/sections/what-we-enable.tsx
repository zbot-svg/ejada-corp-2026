'use client'

import { useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function WhatWeEnable() {
  const { whatWeEnable } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })

  return (
    <section className="relative bg-cream overflow-hidden section-pad">
      <div className="container mx-auto px-6 lg:px-10">
        <div ref={ref} className={className}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {whatWeEnable.label}
            </span>
          </div>
          <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-16 max-w-2xl"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {whatWeEnable.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {whatWeEnable.outcomes.map((outcome, i) => (
            <OutcomeCard key={outcome.number} outcome={outcome} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function OutcomeCard({ outcome, index }: {
  outcome: { number: string; title: string; items: string[] }
  index: number
}) {
  const { ref, visible, className } = useReveal({ threshold: 0.15, delay: index * 80 })

  return (
    <div
      ref={ref}
      className={`relative bg-white border border-gray-200 p-6 group hover:border-blue-500/40
        hover:shadow-md transition-all duration-300 hover:-translate-y-1
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="text-3xl font-black text-blue-600/15 mb-4">{outcome.number}</div>
      <h3 className="text-base font-bold text-navy mb-3">{outcome.title}</h3>
      <ul className="space-y-1.5">
        {outcome.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-mid">
            <span className="w-1 h-1 rounded-full bg-sky-400 mt-2 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
