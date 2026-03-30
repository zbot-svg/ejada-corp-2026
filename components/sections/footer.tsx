'use client'

import { pageContent } from '@/lib/content'

export default function Footer() {
  const { footer } = pageContent

  return (
    <footer className="bg-navy-deep border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/ejada-white-logo.png"
              alt="Ejada Systems"
              className="h-8 w-auto mb-4"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
                t.parentElement!.innerHTML = `<div class="text-xl font-black text-white mb-4"><span class="text-sky-400">e</span>jada</div>`
              }}
            />
            <p className="text-sm text-white/40 leading-relaxed">
              {footer.tagline}
            </p>
          </div>

          {/* Link columns */}
          {footer.links.map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">
                {col.heading}
              </div>
              <ul className="space-y-2.5">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">{footer.copyright}</p>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>www.ejada.com</span>
            <span>·</span>
            <span>info@ejada.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
