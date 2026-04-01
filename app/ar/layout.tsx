import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'إجادة سيستمز — المُنسِّق الوطني للتحول الرقمي',
  description: 'إجادة سيستمز: الشريك التقني الاستراتيجي للمؤسسات السعودية الرائدة. أكثر من ٢٠ عاماً في قيادة التحول الرقمي لتحقيق رؤية المملكة ٢٠٣٠.',
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
