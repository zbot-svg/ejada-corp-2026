// Admin CSS — imported here because this module is loaded client-side for all admin routes
import '@/styles/admin.css'

// Runtime style injection — Turbopack drops some CSS rules during bundling,
// so we inject critical fixes via <style> tag at runtime.
if (typeof document !== 'undefined') {
  const id = 'ejada-admin-runtime-fix'
  if (!document.getElementById(id)) {
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      /* ── GLOBAL SVG icon fix ── */
      /* Payload's .icon SVGs render at 300x300 without explicit sizing */
      .icon, svg.icon {
        width: 20px !important;
        height: 20px !important;
        max-width: 20px !important;
        max-height: 20px !important;
        flex-shrink: 0 !important;
      }
      /* Slightly smaller for indicators */
      .dropdown-indicator .icon,
      .clear-indicator .icon,
      .nav-group__indicator .icon {
        width: 16px !important;
        height: 16px !important;
        max-width: 16px !important;
        max-height: 16px !important;
      }
      /* Hamburger icon */
      .hamburger__close-icon .icon,
      .hamburger__open-icon .icon {
        width: 20px !important;
        height: 20px !important;
      }
      /* Dropdown containers */
      .dropdown-indicator,
      .clear-indicator {
        padding: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .rs__control {
        min-height: 42px !important;
      }
      /* Nav group indicators */
      .nav-group__indicator {
        width: 24px !important;
        height: 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      /* ── Dashboard card grid fix ── */
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
  }
}

import { Logo as Logo_0 } from '@/components/admin/Logo'
import { Icon as Icon_0 } from '@/components/admin/Icon'
import { AdminStyleProvider as AdminStyleProvider_0 } from '@/components/admin/AdminStyleProvider'
import { BeforeLogin as BeforeLogin_0 } from '@/components/admin/BeforeLogin'
import { DashboardBanner as DashboardBanner_0 } from '@/components/admin/DashboardBanner'
import { NavFooter as NavFooter_0 } from '@/components/admin/NavFooter'

export const importMap = {
  '/components/admin/Logo#Logo': Logo_0,
  '/components/admin/Icon#Icon': Icon_0,
  '/components/admin/AdminStyleProvider#AdminStyleProvider': AdminStyleProvider_0,
  '/components/admin/BeforeLogin#BeforeLogin': BeforeLogin_0,
  '/components/admin/DashboardBanner#DashboardBanner': DashboardBanner_0,
  '/components/admin/NavFooter#NavFooter': NavFooter_0,
}
