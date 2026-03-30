'use client'

import { useEffect, useRef, useState } from 'react'
import { GridPattern, ScrollIndicator } from '@/components/ui'
import { pageContent } from '@/lib/content'

export default function Hero() {
  const { hero } = pageContent
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex" style={{ background: '#000850' }}>
      {/* Background image panel */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-cover.jpg"
          alt=""
          className="w-full h-full object-cover opacity-30"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000850] 0%, from-[#000850]/70 40%, transparent 100%" />
      </div>

      <GridPattern light />

      {/* Left panel */}
      <div className="relative z-10 flex flex-col justify-between w-full max-w-2xl p-12 lg:p-20"
        style={{ minHeight: '100svh' }}>

        {/* Logo */}
        <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
          style={{ transitionDelay: '200ms' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/ejada-white-logo.png"
            alt="Ejada Systems"
            className="h-10 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = '<div class="text-2xl font-black tracking-tight text-white"><span class="text-sky-400">e</span>jada</div>'
            }}
          />
        </div>

        {/* Center content */}
        <div>
          {/* Eyebrow */}
          <div className={`mb-6 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}>
            <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
              {hero.eyebrow}
            </span>
          </div>

          {/* Main headline */}
          <h1 className={`font-black leading-none tracking-tight mb-6 transition-all duration-700
            ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              fontSize: 'clamp(52px, 8vw, 100px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
            {hero.headline.split('\n').map((line, i) => (
              <span key={i} className="block text-white">
                {i === 0 ? line : <span className="text-sky-400">{line}</span>}
              </span>
            ))}
          </h1>

          {/* Tagline */}
          <div className={`transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '600ms' }}>
            <p className="text-lg font-light text-white/70 mb-2" style={{ fontFamily: "'Readex Pro', sans-serif" }}>
              {hero.tagline}
            </p>
            <div className="h-px w-16 bg-sky-400 mt-4" />
          </div>
        </div>

        {/* Footer */}
        <div className={`flex items-end justify-between transition-all duration-700
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '800ms' }}>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-1">Al Riyāḍ, Kingdom of Saudi Arabia</div>
            <div className="text-xs text-white/40">{hero.website}</div>
          </div>

          <ScrollIndicator />
        </div>
      </div>

      {/* Right decorative panel — year */}
      <div className="absolute right-0 bottom-0 hidden lg:block">
        <div className="text-[200px] font-black text-white/[0.03] leading-none select-none pointer-events-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          {hero.year}
        </div>
      </div>
    </section>
  )
}
