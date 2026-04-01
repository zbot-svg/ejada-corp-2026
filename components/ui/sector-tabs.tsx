'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

/**
 * SectorTabs
 * ─────────────────────────────────────────────────────────────────────────────
 * Animated tab navigation with a morphing sliding indicator.
 * Content cross-fades with spring transitions.
 *
 * Usage:
 *   <SectorTabs
 *     tabs={sectors.map(s => ({ id: s.id, label: s.label }))}
 *     renderContent={(activeId) => <SectorContent id={activeId} />}
 *   />
 */
interface Tab {
  id: string
  label: string
}

interface SectorTabsProps {
  tabs: Tab[]
  renderContent: (activeId: string) => React.ReactNode
  defaultTab?: string
  light?: boolean
}

export function SectorTabs({
  tabs,
  renderContent,
  defaultTab,
  light = false,
}: SectorTabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id || '')
  const [direction, setDirection] = useState(1)
  const prevIndex = useRef(0)

  const handleTab = (id: string) => {
    const nextIndex = tabs.findIndex(t => t.id === id)
    setDirection(nextIndex > prevIndex.current ? 1 : -1)
    prevIndex.current = nextIndex
    setActive(id)
  }

  const textActive = light ? 'text-white' : 'text-[var(--color-text-primary)]'
  const textInactive = light ? 'text-white/40' : 'text-[var(--color-text-muted)]'
  const borderBase = light ? 'border-white/10' : 'border-[var(--color-border)]'
  const indicator = light ? 'bg-white' : 'bg-[var(--color-accent)]'

  return (
    <div>
      {/* Tab nav */}
      <div className={`relative flex overflow-x-auto border-b ${borderBase} mb-10 scrollbar-none`}>
        {tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              className={`relative flex-shrink-0 px-5 py-3.5 text-sm font-semibold transition-colors duration-200 -mb-px
                ${isActive ? textActive : `${textInactive} hover:${textActive}`}`}
            >
              {tab.label}

              {/* Morphing sliding indicator */}
              {isActive && (
                <motion.div
                  layoutId="sector-tab-indicator"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${indicator}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Content with directional crossfade */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active}
          custom={direction}
          initial={{ opacity: 0, x: direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderContent(active)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/**
 * VerticalTabs
 * ─────────────────────────────────────────────────────────────────────────────
 * Stacked vertical tab nav — better for longer label lists on desktop.
 *
 * Usage:
 *   <VerticalTabs
 *     tabs={capabilities}
 *     renderContent={(id) => <CapabilityDetail id={id} />}
 *   />
 */
export function VerticalTabs({
  tabs,
  renderContent,
  defaultTab,
}: SectorTabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id || '')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
      {/* Left nav */}
      <div className="flex flex-col gap-1">
        {tabs.map((tab, i) => {
          const isActive = tab.id === active
          return (
            <motion.button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-3 text-left px-4 py-3 text-sm font-semibold
                transition-colors duration-200 rounded-none
                ${isActive
                  ? 'text-[var(--color-text-primary)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                }`}
              whileHover={{ x: 2 }}
            >
              {/* Left border indicator */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: 'var(--color-accent)' }}
                animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />

              <span
                className="text-[10px] font-mono"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {tab.label}
            </motion.button>
          )
        })}
      </div>

      {/* Right content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {renderContent(active)}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
