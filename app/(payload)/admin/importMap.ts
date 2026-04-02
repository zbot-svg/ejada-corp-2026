// Admin CSS — imported here because this module is loaded client-side for all admin routes
import '@/styles/admin.css'

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
