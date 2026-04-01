'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageToggle() {
  const pathname = usePathname()
  const isArabic = pathname.startsWith('/ar')

  const arabicHref = isArabic ? '/' : '/ar'
  const label = isArabic ? 'EN' : 'العربية'

  return (
    <Link
      href={arabicHref}
      className="text-sm font-semibold uppercase tracking-widest transition-colors px-3 py-1.5 border border-current rounded"
      style={{ color: 'inherit' }}
    >
      {label}
    </Link>
  )
}
