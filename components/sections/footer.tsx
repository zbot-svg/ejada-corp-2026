'use client'

import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { useContent, useLocale } from '@/lib/content-context'

export default function Footer() {
  const pageContent = useContent()
  const { isRTL } = useLocale()
  const { footer } = pageContent

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-text-primary)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2">
            <img
              src="/brand/ejada-white-logo.png"
              alt="Ejada Systems"
              className="h-8 w-auto mb-5"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
                if (t.parentElement) {
                  t.parentElement.innerHTML = `<div style="font-size:20px;font-weight:900;color:white;margin-bottom:20px;letter-spacing:-0.03em"><span style="color:var(--color-accent)">e</span>jada</div>`
                }
              }}
            />
            <p className="text-sm leading-relaxed max-w-xs mb-8" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {footer.tagline}
            </p>
            <MagneticButton href="#contact" variant="outline" strength={0.2}
              className="border-white/20 text-white hover:bg-white hover:text-[var(--color-text-primary)]"
            >
              {pageContent.footer.cta}
            </MagneticButton>
          </div>

          {/* Link columns */}
          {footer.links.map((col, ci) => (
            <div key={col.heading}>
              <div
                className="text-[9px] font-bold uppercase tracking-[0.22em] mb-5"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              >
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.items.map((item, ii) => (
                  <motion.li key={item}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + ii * 0.04 }}
                  >
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {footer.copyright}
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            <a href={`https://${pageContent.footer.bottomLinks.website}`} dir="ltr" className="hover:text-white transition-colors">
              {pageContent.footer.bottomLinks.website}
            </a>
            <span>·</span>
            <a href={`mailto:${pageContent.footer.bottomLinks.email}`} dir="ltr" className="hover:text-white transition-colors">
              {pageContent.footer.bottomLinks.email}
            </a>
            <span>·</span>
            <span>{pageContent.footer.bottomLinks.location}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
