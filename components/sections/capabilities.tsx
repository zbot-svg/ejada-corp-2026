'use client'

import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { FadeUp } from '@/components/primitives/fade-up'
import { CapabilityGrid } from '@/components/ui/capability-tile'
import { Parallax } from '@/components/primitives/parallax'
import { useContent } from '@/lib/content-context'

export default function Capabilities() {
  const pageContent = useContent()
  const { capabilities } = pageContent

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Very subtle parallax background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Parallax speed={0.08} className="w-full h-full">
          <img
            src="/images/building-02.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.05]"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </Parallax>
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <FadeUp delay={0.05}><SectionLabel>{capabilities.label}</SectionLabel></FadeUp>
            <TextReveal
              by="word" delay={0.1} stagger={0.05}
              className="font-black leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px,4vw,52px)',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
              } as React.CSSProperties}
            >
              {capabilities.headline}
            </TextReveal>
          </div>
          <FadeUp delay={0.25}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {capabilities.body}
            </p>
          </FadeUp>
        </div>

        {/* Capability tiles — upgraded component with accordion */}
        <CapabilityGrid capabilities={capabilities.items} />
      </div>
    </section>
  )
}
