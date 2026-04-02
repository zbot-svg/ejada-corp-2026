'use client'

import React, { useEffect } from 'react'

// Inject global SVG fix — Payload's .icon SVGs render at 300x300 without this
function useAdminStyleFix() {
  useEffect(() => {
    const id = 'ejada-admin-svg-fix'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      .icon, svg.icon {
        width: 20px !important;
        height: 20px !important;
        max-width: 20px !important;
        max-height: 20px !important;
        flex-shrink: 0 !important;
      }
      .dropdown-indicator .icon,
      .clear-indicator .icon,
      .nav-group__indicator .icon {
        width: 16px !important;
        height: 16px !important;
        max-width: 16px !important;
        max-height: 16px !important;
      }
      .hamburger__close-icon .icon,
      .hamburger__open-icon .icon {
        width: 20px !important;
        height: 20px !important;
      }
      .dropdown-indicator,
      .clear-indicator {
        padding: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .nav-group__indicator {
        width: 24px !important;
        height: 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .rs__control {
        min-height: 42px !important;
      }
      .dashboard__card-list {
        display: grid !important;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
        gap: 16px !important;
        padding: 16px 0 !important;
      }
      .dashboard__card-list .card {
        border-radius: 10px !important;
        border: 1px solid var(--theme-color-gray-100, #EEE9E0) !important;
        padding: 20px !important;
        transition: all 0.2s ease !important;
      }
      .dashboard__card-list .card:hover {
        border-color: #0070C0 !important;
        box-shadow: 0 4px 16px rgba(0, 16, 129, 0.08) !important;
        transform: translateY(-2px) !important;
      }
    `
    document.head.appendChild(style)
  }, [])
}

/**
 * Admin Icon — displayed in the nav sidebar header.
 * Uses the Ejada insignia (e mark) + "Ejada CMS" text.
 * Registered as admin.components.graphics.Icon in payload.config.ts.
 */
export const Icon: React.FC = () => {
  useAdminStyleFix()

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
