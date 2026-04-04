'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { FadeUp } from '@/components/primitives/fade-up'
import { Marquee } from '@/components/primitives/marquee'
import { PartnerGrid } from '@/components/ui/partner-logo'
import { useContent } from '@/lib/content-context'

export default function Partners() {
  const pageContent = useContent()
  const { partners } = pageContent

  return (
    <section
      className="relative overflow-hidden section-pad-sm"
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container mx-auto px-6 lg:px-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <div className="lg:col-span-2">
            <FadeUp delay={0.05}><SectionLabel>{partners.label}</SectionLabel></FadeUp>
            <TextReveal
              by="word" delay={0.1} stagger={0.05}
              className="font-black leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px,4vw,48px)',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
              } as React.CSSProperties}
            >
              {partners.headline}
            </TextReveal>
          </div>
          <FadeUp delay={0.25}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {partners.body}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Marquee strip — first pass */}
      <Marquee
        speed={35}
        gap={0}
        pauseOnHover
        className="mb-3"
      >
        {partners.list.slice(0, Math.ceil(partners.list.length / 2)).map((name: any) => (
          <div
            key={name}
            className="flex-shrink-0 px-8 py-5 border-r text-sm font-bold uppercase tracking-widest cursor-default transition-colors duration-200"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
              minWidth: 160,
              textAlign: 'center',
            }}
          >
            {name.trim()}
          </div>
        ))}
      </Marquee>

      {/* Marquee strip — second pass, reversed */}
      <Marquee
        speed={45}
        reverse
        gap={0}
        pauseOnHover
      >
        {partners.list.slice(Math.ceil(partners.list.length / 2)).map((name: any) => (
          <div
            key={name}
            className="flex-shrink-0 px-8 py-5 border-r text-sm font-bold uppercase tracking-widest cursor-default transition-colors duration-200"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
              minWidth: 160,
              textAlign: 'center',
            }}
          >
            {name.trim()}
          </div>
        ))}
      </Marquee>
    </section>
  )
}
