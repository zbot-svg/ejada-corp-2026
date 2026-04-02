// Admin CSS — imported here because this module is loaded client-side for all admin routes
import '@/styles/admin.css'

// Fix oversized SVG icons in Payload's select dropdowns.
// Turbopack sometimes drops CSS rules targeting SVG sub-selectors,
// so we inject a <style> tag at runtime as a guaranteed fix.
if (typeof document !== 'undefined') {
  const id = 'ejada-admin-svg-fix'
  if (!document.getElementById(id)) {
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      .template-minimal .dropdown-indicator,
      .template-minimal .clear-indicator {
        width: 36px !important;
        height: 36px !important;
        padding: 8px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .template-minimal .dropdown-indicator svg,
      .template-minimal .clear-indicator svg,
      .template-minimal .icon--chevron,
      .template-minimal .dropdown-indicator__icon {
        width: 16px !important;
        height: 16px !important;
        max-width: 16px !important;
        max-height: 16px !important;
        flex-shrink: 0 !important;
      }
      .template-minimal .rs__indicators {
        max-height: 42px !important;
        align-self: center !important;
      }
      .template-minimal .rs__control {
        min-height: 42px !important;
        max-height: 60px !important;
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
