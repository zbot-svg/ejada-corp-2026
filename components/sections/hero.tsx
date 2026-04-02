'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextReveal, RevealLine } from '@/components/primitives/text-reveal'
import { FadeUp } from '@/components/primitives/fade-up'
import { Parallax } from '@/components/primitives/parallax'
import { MagneticButton, ArrowButton } from '@/components/ui/magnetic-button'
import { useContent, useLocale } from '@/lib/content-context'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const pageContent = useContent()
  const { hero } = pageContent
  const { isRTL } = useLocale()
  const [loaded, setLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  // Scroll-linked parallax for the image layer
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* ── Parallax image layer (right 55% or left for RTL) ─────────────────────── */}
      <motion.div
        ref={imageRef}
        className={`absolute inset-y-0 w-full lg:w-[58%] ${isRTL ? 'left-0' : 'right-0'}`}
        style={{ y: imageY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-[115%] object-cover"
          style={{ objectPosition: 'center 30%' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {/* Gradient masks — left blend + bottom fade (flipped for RTL) */}
        <div
          className="absolute inset-0"
          style={{
            background: isRTL
              ? 'linear-gradient(to left, var(--color-bg) 0%, var(--color-bg) 5%, transparent 40%)'
              : 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 5%, transparent 40%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%)',
          }}
        />
      </motion.div>

      {/* ── Dot grid decoration ───────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Left content panel ────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col justify-between w-full lg:max-w-[52%] px-6 lg:px-20 pt-28 pb-10 lg:py-32"
        style={{ minHeight: '100svh', opacity }}
      >
        {/* Eyebrow row */}
        <FadeUp delay={0.3}>
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span
              className={isRTL ? 'text-[10px] font-bold' : 'text-[10px] font-bold uppercase tracking-[0.22em]'}
              style={{ color: 'var(--color-accent)' }}
            >
              {hero.eyebrow}
            </span>
          </div>
        </FadeUp>

        {/* ── Main content ─────────────────────────────────────────── */}
        <motion.div style={{ y: contentY }}>
          {/* Headline — word-by-word reveal */}
          <div className="mb-8">
            <TextReveal
              by="word"
              delay={0.5}
              stagger={0.08}
              from="bottom"
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: 'clamp(52px, 8vw, 108px)',
                letterSpacing: '-0.03em',
                color: 'var(--color-text-primary)',
              } as React.CSSProperties}
            >
              {hero.headline.replace('\n', ' ')}
            </TextReveal>
          </div>

          {/* Accent line + tagline */}
          <FadeUp delay={0.9}>
            <div className="flex items-start gap-5 mb-10">
              <div
                className="w-0.5 self-stretch flex-shrink-0 mt-1"
                style={{ backgroundColor: 'var(--color-accent)', minHeight: 48 }}
              />
              <div>
                <p
                  className="text-lg font-light leading-relaxed mb-1"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {hero.tagline}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {hero.location}
                </p>
              </div>
            </div>
          </FadeUp>

          {/* CTA row */}
          <FadeUp delay={1.1}>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton href="#capabilities" variant="primary">
                {hero.cta1}
              </MagneticButton>
              <ArrowButton href="#contact">
                {hero.cta2}
              </ArrowButton>
            </div>
          </FadeUp>
        </motion.div>

        {/* ── Bottom stats strip ───────────────────────────────────── */}
        <FadeUp delay={1.4}>
          <div
            className="flex flex-wrap gap-8 pt-8"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-black tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {stat.value}
                </div>
                <div
                  className={isRTL ? 'text-[10px] font-semibold mt-0.5' : 'text-[10px] font-semibold uppercase tracking-widest mt-0.5'}
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        className={`absolute bottom-8 hidden lg:flex flex-col items-center gap-2 ${isRTL ? 'left-8' : 'right-8'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.8 }}
      >
        <span
          className="text-[9px] font-bold uppercase tracking-[0.25em]"
          style={{ color: 'var(--color-text-muted)', writingMode: 'vertical-rl' }}
        >
          {hero.scrollLabel}
        </span>
        <motion.div
          className="w-px h-12"
          style={{ backgroundColor: 'var(--color-text-muted)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
        />
      </motion.div>

      {/* ── Ambient year text ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 right-0 text-[clamp(80px,14vw,180px)] font-black leading-none select-none pointer-events-none hidden lg:block"
        style={{
          color: 'var(--color-text-primary)',
          opacity: 0.03,
          lineHeight: 0.85,
        }}
      >
        {hero.year}
      </div>
    </section>
  )
}
