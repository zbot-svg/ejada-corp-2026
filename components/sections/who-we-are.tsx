'use client'

import { useState, useEffect, useRef } from 'react'
import { SectionLabel, useReveal, StatCounter } from '@/components/ui'
import { pageContent } from '@/lib/content'

function WhoWeAreSection() {
  const { whoWeAre } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <section id="about" className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10 section-pad">
        <div className="grid grid-cols-1 lg:grid-template-columns-tight gap-12 lg:gap-20 items-center">

          {/* Text panel */}
          <div ref={ref} className={className}>
            <SectionLabel>{whoWeAre.label}</SectionLabel>
            <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              {whoWeAre.headline}
            </h2>
            <p className="text-base text-mid leading-relaxed mb-10 max-w-xl">
              {whoWeAre.body}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-6">
              {whoWeAre.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl lg:text-4xl font-black text-navy leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image panel */}
          <div
            className="relative reveal-right"
            style={{ transitionDelay: '200ms' }}
            ref={useRef(null)}
          >
            <div className="relative aspect-[4/3] bg-navy-deep overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/who-we-are.jpg"
                alt="Ejada team"
                className={`w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-60' : 'opacity-0'}`}
                onLoad={() => setImgLoaded(true)}
                onError={(e) => {
                  setImgLoaded(true)
                  const t = e.target as HTMLImageElement
                  t.style.display = 'none'
                  t.parentElement!.style.background = '#001081'
                  t.parentElement!.innerHTML += `<div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-white/10 text-8xl font-black">ejada</div>
                  </div>`
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-blue-600/20" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FootprintSection() {
  const { footprint } = pageContent
  const { ref, visible, className } = useReveal({ threshold: 0.1 })

  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10 section-pad-sm">
        <div ref={ref} className={className}>
          <SectionLabel>{footprint.label}</SectionLabel>
          <h2 className="text-h2 font-black text-navy leading-tight tracking-tight mb-3"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            {footprint.headline}
          </h2>
          <p className="text-base text-mid leading-relaxed mb-10 max-w-xl">
            {footprint.body}
          </p>
        </div>

        {/* Locations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
          {footprint.locations.map((loc, i) => (
            <LocationPill key={loc.city} location={loc} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LocationPill({ location, delay }: { location: { city: string; country: string; type: string }; delay: number }) {
  const { ref, visible, className } = useReveal({ threshold: 0.2, delay })
  return (
    <div ref={ref} className={`${className} bg-white border border-gray-200 p-4 hover:border-blue-500/40 transition-colors group`}>
      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{location.type}</div>
      <div className="text-sm font-bold text-navy group-hover:text-blue-600 transition-colors">{location.city}</div>
      <div className="text-xs text-muted mt-0.5">{location.country}</div>
    </div>
  )
}

export default function WhoWeAre() {
  return (
    <>
      <WhoWeAreSection />
      <FootprintSection />
    </>
  )
}
