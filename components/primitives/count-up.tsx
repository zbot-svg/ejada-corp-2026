'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { gsap } from 'gsap'

/**
 * CountUp
 * ─────────────────────────────────────────────────────────────────────────────
 * GSAP-powered number counter with easeOut curve. Triggers on viewport entry.
 * Supports integers, floats, K/M suffixes, and prefix symbols.
 *
 * Usage:
 *   <CountUp value="500+" label="Projects Delivered" size="display" />
 *   <CountUp value="20" label="Years in KSA" prefix="" suffix="+" size="xl" />
 *   <CountUp value="1,000" label="Professionals" />
 */

interface CountUpProps {
  value: string               // e.g. "500+", "20", "1,000+", "$2.4B"
  label: string
  prefix?: string
  size?: 'display' | 'xl' | 'lg' | 'md'
  className?: string
  labelClassName?: string
  light?: boolean             // white text on dark bg
  duration?: number           // animation duration in seconds
  delay?: number
  ease?: string
}

function parseValue(raw: string): { num: number; suffix: string; prefix: string } {
  // Extract prefix (non-digit start like $ £ €)
  const prefixMatch = raw.match(/^([^0-9,.]*)/)
  const prefix = prefixMatch ? prefixMatch[1] : ''
  const rest = raw.slice(prefix.length)

  // Extract suffix (+, K, M, B, etc.)
  const numMatch = rest.match(/^([\d,. ]+)(.*)$/)
  if (!numMatch) return { num: 0, suffix: raw, prefix: '' }

  const num = parseFloat(numMatch[1].replace(/,/g, '').trim())
  const suffix = numMatch[2]
  return { num, suffix, prefix }
}

export function CountUp({
  value,
  label,
  prefix: propPrefix,
  size = 'xl',
  className = '',
  labelClassName = '',
  light = false,
  duration = 2,
  delay = 0,
  ease = 'power3.out',
}: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const hasRun = useRef(false)

  const { num, suffix, prefix: parsedPrefix } = parseValue(value)
  const displayPrefix = propPrefix !== undefined ? propPrefix : parsedPrefix

  // Determine decimal places
  const decimals = value.includes('.') ? value.split('.')[1]?.replace(/[^0-9]/, '').length ?? 0 : 0

  useEffect(() => {
    if (!isInView || hasRun.current || !numberRef.current) return
    hasRun.current = true

    const obj = { value: 0 }
    gsap.to(obj, {
      value: num,
      duration,
      delay,
      ease,
      onUpdate() {
        if (!numberRef.current) return
        const formatted =
          decimals > 0
            ? obj.value.toFixed(decimals)
            : Math.floor(obj.value).toLocaleString()
        numberRef.current.textContent = `${displayPrefix}${formatted}${suffix}`
      },
      onComplete() {
        if (numberRef.current) {
          numberRef.current.textContent = `${displayPrefix}${
            decimals > 0 ? num.toFixed(decimals) : num.toLocaleString()
          }${suffix}`
        }
      },
    })
  }, [isInView, num, suffix, displayPrefix, decimals, duration, delay, ease])

  const sizeClasses: Record<string, string> = {
    display: 'text-[clamp(64px,10vw,120px)] font-black leading-none tracking-[-0.03em]',
    xl:      'text-[clamp(48px,7vw,80px)] font-black leading-none tracking-[-0.03em]',
    lg:      'text-[clamp(36px,5vw,56px)] font-black leading-none tracking-[-0.025em]',
    md:      'text-[clamp(28px,4vw,40px)] font-black leading-none tracking-[-0.02em]',
  }

  return (
    <div ref={ref} className={`${className}`}>
      <div className={sizeClasses[size]}>
        <span
          ref={numberRef}
          style={{ color: light ? 'white' : 'var(--color-text-primary)' }}
        >
          {displayPrefix}0{suffix}
        </span>
      </div>
      <div
        className={`mt-2 text-xs font-semibold uppercase tracking-[0.18em] ${labelClassName}`}
        style={{ color: light ? 'rgba(255,255,255,0.5)' : 'var(--color-text-muted)' }}
      >
        {label}
      </div>
    </div>
  )
}

/**
 * CountUpRow
 * ─────────────────────────────────────────────────────────────────────────────
 * A pre-built horizontal row of CountUp stats.
 *
 * Usage:
 *   <CountUpRow
 *     stats={[
 *       { value: '20+', label: 'Years in KSA' },
 *       { value: '500+', label: 'Projects' },
 *     ]}
 *   />
 */
interface StatItem {
  value: string
  label: string
  prefix?: string
}

interface CountUpRowProps {
  stats: StatItem[]
  light?: boolean
  divided?: boolean
  className?: string
  size?: CountUpProps['size']
}

export function CountUpRow({
  stats,
  light = false,
  divided = true,
  className = '',
  size = 'xl',
}: CountUpRowProps) {
  return (
    <div
      className={`flex flex-wrap gap-8 lg:gap-0 ${className}`}
    >
      {stats.map((stat, i) => (
        <div key={i} className="flex gap-8 lg:gap-0">
          <CountUp
            value={stat.value}
            label={stat.label}
            prefix={stat.prefix}
            light={light}
            size={size}
            className="flex-1 text-center lg:px-12"
          />
          {divided && i < stats.length - 1 && (
            <div
              className="hidden lg:block w-px self-stretch"
              style={{
                background: light
                  ? 'rgba(255,255,255,0.12)'
                  : 'var(--color-border)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
