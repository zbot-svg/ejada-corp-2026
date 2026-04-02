'use client'

import React from 'react'

/**
 * Admin Icon — displayed in the nav sidebar header.
 * Uses the Ejada insignia (e mark) + "Ejada CMS" text.
 * Registered as admin.components.graphics.Icon in payload.config.ts.
 */
export const Icon: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <img
        src="/brand/ejada-insignia-blue.png"
        alt="Ejada"
        style={{
          width: '26px',
          height: '26px',
          objectFit: 'contain',
        }}
        onError={(e) => {
          // Fallback: styled "e" badge
          const t = e.target as HTMLImageElement
          t.style.display = 'none'
          if (t.parentElement) {
            const fallback = document.createElement('div')
            fallback.style.cssText =
              'width:26px;height:26px;border-radius:6px;background:linear-gradient(135deg,#001081,#0018A0);display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:900;color:#1FED93;line-height:1'
            fallback.textContent = 'e'
            t.parentElement.insertBefore(fallback, t)
          }
        }}
      />
      <span style={{
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--theme-text)',
      }}>
        Ejada CMS
      </span>
    </div>
  )
}

export default Icon
