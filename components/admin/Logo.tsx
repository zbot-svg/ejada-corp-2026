'use client'

import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <img
        src="/brand/ejada-white-logo.png"
        alt="Ejada Systems"
        style={{ height: '36px', width: 'auto' }}
        onError={(e) => {
          const t = e.target as HTMLImageElement
          t.style.display = 'none'
          if (t.parentElement) {
            const fallback = document.createElement('div')
            fallback.style.cssText = 'font-size:28px;font-weight:900;letter-spacing:-0.03em;color:white'
            fallback.innerHTML = '<span style="color:#1FED93">e</span>jada'
            t.parentElement.insertBefore(fallback, t)
          }
        }}
      />
      <div style={{
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.4)',
      }}>
        Content Management
      </div>
    </div>
  )
}

export default Logo
