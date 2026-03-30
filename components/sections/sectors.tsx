'use client'

import { useState } from 'react'
import { SectionLabel, TabNav, CaseStudyCard, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function Sectors() {
  const { sectors } = pageContent
  const [active, setActive] = useState(sectors[0].id)
  const activeSector = sectors.find((s) => s.id === active)!

  return (
    <section id="sectors" className="relative bg-cream overflow-hidden section-pad">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel>Sectors</SectionLabel>

        {/* Tab nav */}
        <TabNav
          tabs={sectors.map((s) => ({ id: s.id, label: s.label }))}
          active={active}
          onChange={setActive}
        />

        {/* Sector content */}
        <div key={active} className="animate-fade-in">
          <SectorHighlight sector={activeSector} />
          {activeSector.caseStudies.length > 0 && (
            <div className="mt-12">
              <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-6">Case Studies</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeSector.caseStudies.map((cs, i) => (
                  <CaseStudyCard
                    key={cs.title}
                    badge={cs.status}
                    title={cs.title}
                    client={cs.client}
                    outcomes={cs.outcomes}
                    visible={true}
                    delay={i * 120}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function SectorHighlight({ sector }: { sector: typeof pageContent.sectors[0] }) {
  const { ref, visible, className } = useReveal({ threshold: 0.1 })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div ref={ref} className={className}>
        <div className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
          {sector.highlight.tagline}
        </div>
        <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-4"
          style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
          {sector.highlight.headline}
        </h2>
        <p className="text-base text-mid leading-relaxed mb-8">
          {sector.highlight.body}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-6 mb-8">
          {sector.highlight.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-3xl font-black text-navy">{m.value}</div>
              <div className="text-xs text-muted mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="flex flex-wrap gap-2">
          {sector.highlight.outcomes.map((outcome) => (
            <span key={outcome} className="px-3 py-1.5 text-xs font-semibold bg-navy/5 text-navy border border-navy/10">
              {outcome}
            </span>
          ))}
        </div>
      </div>

      {/* Visual */}
      <div
        className="relative aspect-[4/3] bg-navy-deep overflow-hidden reveal-right"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/sectors/${sector.id}.jpg`}
          alt={sector.label}
          className="w-full h-full object-cover opacity-40"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            t.style.display = 'none'
            t.parentElement!.innerHTML = `
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-white/15 text-[120px] font-black">${sector.id[0].toUpperCase()}</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/50 to-transparent" />
            `
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <div className="text-5xl font-black text-white/20">{sector.label[0]}</div>
        </div>
      </div>
    </div>
  )
}
