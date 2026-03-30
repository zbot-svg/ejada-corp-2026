'use client'

import { useRef } from 'react'
import { SectionLabel, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function WhatWeBelieve() {
  const { whatWeBelieve } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })

  return (
    <section className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10">
        <div ref={ref} className={className}>
          <SectionLabel light>{whatWeBelieve.label}</SectionLabel>
          <h2 className="text-white font-black leading-tight tracking-tight mb-16"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            {whatWeBelieve.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whatWeBelieve.beliefs.map((belief, i) => (
            <BeliefCard key={belief.number} belief={belief} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BeliefCard({ belief, index }: { belief: { number: string; title: string; body: string }; index: number }) {
  const { ref, visible, className } = useReveal({ threshold: 0.15, delay: index * 100 })

  return (
    <div
      ref={ref}
      className={`relative bg-white/5 border border-white/10 p-8 group hover:border-sky-400/50
        transition-all duration-300 hover:bg-white/8 hover:shadow-xl
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
    >
      {/* Accent line on hover */}
      <div className="absolute top-0 left-0 w-0.5 h-0 bg-sky-400 group-hover:h-full transition-all duration-500" />

      <div className="text-5xl font-black text-white/10 mb-6">{belief.number}</div>
      <h3 className="text-xl font-bold text-white mb-3">{belief.title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{belief.body}</p>
    </div>
  )
}
