'use client'

import { SectionLabel, useReveal } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function OrchestratorModel() {
  const { orchestratorModel } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })
  const { ref: pRef, visible: pVisible } = useReveal({ threshold: 0.1, delay: 200 })

  return (
    <section className="relative bg-cream overflow-hidden section-pad">
      <div className="container mx-auto px-6 lg:px-10">
        <div ref={ref} className={className}>
          <SectionLabel>{orchestratorModel.label}</SectionLabel>
          <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {orchestratorModel.headline}
          </h2>
          <p className="text-base text-mid leading-relaxed max-w-2xl">
            {orchestratorModel.body}
          </p>
        </div>

        {/* Pillars */}
        <div ref={pRef} className={`mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${pVisible ? '' : 'opacity-0'}`}>
          {orchestratorModel.pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} index={i} visible={pVisible} />
          ))}
        </div>

        {/* Connector line */}
        <div className="hidden lg:block mt-[-2rem] ml-[12.5%] mr-[12.5%] relative z-10">
          <div className="h-0.5 bg-gradient-to-r from-blue-600 via-sky-400 to-navy" />
        </div>
      </div>
    </section>
  )
}

function PillarCard({ pillar, index, visible }: {
  pillar: { number: string; title: string; description: string }
  index: number
  visible: boolean
}) {
  return (
    <div className={`relative bg-white border border-gray-200 p-8 group
      transition-all duration-500 hover:shadow-lg hover:border-blue-500/40 hover:-translate-y-1
      ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Connector dot on left */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-600
        hidden lg:flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-sky-400" />
      </div>

      <div className="text-4xl font-black text-blue-600/20 mb-4">{pillar.number}</div>
      <h3 className="text-xl font-bold text-navy mb-3">{pillar.title}</h3>
      <p className="text-sm text-mid leading-relaxed">{pillar.description}</p>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}
