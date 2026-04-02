'use client'

import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/section-label'
import { TextReveal } from '@/components/primitives/text-reveal'
import { FadeUp } from '@/components/primitives/fade-up'
import { SectorTabs } from '@/components/ui/sector-tabs'
import { CaseStudyCard } from '@/components/ui/case-study-card'
import { Parallax } from '@/components/primitives/parallax'
import { ArrowButton } from '@/components/ui/magnetic-button'
import { useContent } from '@/lib/content-context'

function SectorContent({ id, content }: { id: string; content: ReturnType<typeof useContent> }) {
  const sector = content.sectors.find(s => s.id === id)
  if (!sector) return null
  const { highlight, caseStudies } = sector

  return (
    <div>
      {/* Sector highlight — 2 col */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--color-accent)' }}
          >
            {highlight.tagline}
          </div>
          <h2
            className="font-black leading-tight tracking-tight mb-5"
            style={{
              fontSize: 'clamp(22px,3vw,38px)',
              letterSpacing: '-0.02em',
              color: 'var(--color-text-primary)',
            }}
          >
            {highlight.headline}
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {highlight.body}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
            {highlight.metrics.map((m) => (
              <div key={m.label}>
                <div
                  className="text-3xl font-black leading-none"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {m.value}
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-widest mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Outcome tags */}
          <div className="flex flex-wrap gap-2">
            {highlight.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="px-3 py-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {outcome}
              </span>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden" style={{ backgroundColor: 'var(--color-bg-accent)' }}>
          <Parallax speed={0.1} className="w-full h-full">
            <img
              src={`/images/sectors/${id}.jpg`}
              alt={sector.label}
              className="w-full h-full object-cover"
              style={{ opacity: 0.7 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </Parallax>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--color-text-primary) 0%, transparent 60%)' }}
          />
          <div className="absolute bottom-6 left-6">
            <span
              className="text-7xl font-black opacity-20 text-white leading-none"
            >
              {sector.label[0]}
            </span>
          </div>
          <motion.div
            className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sector.label}
          </motion.div>
        </div>
      </div>

      {/* Case studies */}
      {caseStudies.length > 0 && (
        <div>
          <div
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {content.sectorsSection.caseStudiesLabel}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard
                key={cs.title}
                badge={cs.status}
                title={cs.title}
                client={cs.client}
                outcomes={cs.outcomes}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Sectors() {
  const pageContent = useContent()

  return (
    <section
      id="sectors"
      className="relative overflow-hidden section-pad"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <FadeUp delay={0.05}>
              <SectionLabel>{pageContent.sectorsSection.label}</SectionLabel>
            </FadeUp>
            <TextReveal
              by="word" delay={0.1} stagger={0.05}
              className="font-black leading-tight tracking-tight"
              style={{
                fontSize: 'clamp(28px,4vw,52px)',
                letterSpacing: '-0.025em',
                color: 'var(--color-text-primary)',
              } as React.CSSProperties}
            >
              {pageContent.sectorsSection.headline}
            </TextReveal>
          </div>
          <FadeUp delay={0.3}>
            <ArrowButton href="#contact">{pageContent.sectorsSection.allSectorsLabel}</ArrowButton>
          </FadeUp>
        </div>

        {/* Tabs — morphing indicator + directional crossfade */}
        <SectorTabs
          tabs={pageContent.sectors.map(s => ({ id: s.id, label: s.label }))}
          renderContent={(id) => <SectorContent id={id} content={pageContent} />}
        />
      </div>
    </section>
  )
}
