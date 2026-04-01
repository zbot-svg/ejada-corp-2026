import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'مجموعة إنجاز — المشرف الوطني للتحول',
  description: 'شريككم التقني الرائد في المملكة العربية السعودية. أكثر من ٢٠ عاماً في قيادة التحول الرقمي للمؤسسات الحكومية والخاصة.',
}

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div dir="rtl" lang="ar">
      {children}
    </div>
  )
}
