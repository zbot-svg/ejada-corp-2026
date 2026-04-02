'use client'

import React from 'react'

/**
 * Admin Logo — displayed on the login page (dark background).
 * Uses the white Ejada logo with Arabic + English text.
 * Registered as admin.components.graphics.Logo in payload.config.ts.
 *
 * NOTE: This component only renders on the Login view, NOT on create-first-user.
 * For create-first-user, the CSS ::before watermark provides branding.
 */
export const Logo: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 0',
    }}>
      <img
        src="/brand/ejada-white-logo.png"
        alt="Ejada Systems"
        style={{
          height: '44px',
          width: 'auto',
          objectFit: 'contain',
        }}
        onError={(e) => {
          // Fallback: text-based logo if image fails to load
          const t = e.target as HTMLImageElement
          t.style.display = 'none'
          if (t.parentElement) {
            const fallback = document.createElement('div')
            fallback.style.cssText =
              'font-size:28px;font-weight:900;letter-spacing:-0.03em;color:white;text-align:center'
            fallback.innerHTML = '<span style="color:#1FED93">e</span>jada'
            t.parentElement.insertBefore(fallback, t)
          }
        }}
      />
      <div style={{
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.35)',
      }}>
        Content Management System
      </div>
    </div>
  )
}

export default Logo
