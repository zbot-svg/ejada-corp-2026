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
      /* ── Layout fix: Turbopack drops Payload's layout CSS ── */
      .template-default {
        display: grid !important;
        grid-template-columns: 230px 1fr !important;
        min-height: 100vh !important;
      }
      .template-default > aside.nav,
      .template-default > .nav {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 230px !important;
        height: 100vh !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        display: flex !important;
        flex-direction: column !important;
        background: var(--theme-elevation-1, #FFFFFF) !important;
        border-right: 1px solid var(--theme-color-gray-100, #EEE9E0) !important;
        z-index: 100 !important;
        padding-bottom: 80px !important;
      }
      .nav-group a, .nav-group button {
        display: block !important;
        padding: 6px 16px 6px 20px !important;
        font-size: 13px !important;
        text-decoration: none !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      .nav-group a:hover {
        background: rgba(0, 16, 129, 0.04) !important;
      }
      .nav-group__toggle {
        display: flex !important;
        align-items: center !important;
        width: 100% !important;
        padding: 12px 16px 4px 16px !important;
        background: none !important;
        border: none !important;
        cursor: pointer !important;
      }
      @media (max-width: 768px) {
        .template-default {
          display: block !important;
        }
        .template-default > aside.nav,
        .template-default > .nav {
          left: -240px !important;
          transition: left 0.3s ease !important;
        }
        .template-default > aside.nav.nav--nav-open,
        .template-default > .nav.nav--nav-open {
          left: 0 !important;
        }
      }
      /* ── SVG icon fix ── */
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
      /* ── Dashboard card grid ── */
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
      /* ── Dashboard header cleanup ── */
      /* Payload renders its own dashboard heading — hide it since DashboardBanner replaces it */
      .dashboard__wrap > header {
        display: none !important;
      }
      /* Hide duplicate locale selectors on the dashboard */
      .dashboard__wrap > .render-locale-selector {
        display: none !important;
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
