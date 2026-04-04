import type { Metadata } from 'next'
import { getHomeContent } from '@/lib/get-home-content'
import { ContentProvider } from '@/lib/content-context'
import Navigation from '@/components/sections/navigation'
import Hero from '@/components/sections/hero'
import WhoWeAre from '@/components/sections/who-we-are'
import WhatWeBelieve from '@/components/sections/what-we-believe'
import OrchestratorModel from '@/components/sections/orchestrator-model'
import Values from '@/components/sections/values'
import WhatWeEnable from '@/components/sections/what-we-enable'
import Capabilities from '@/components/sections/capabilities'
import Sectors from '@/components/sections/sectors'
import ProofPoints from '@/components/sections/proof-points'
import Partners from '@/components/sections/partners'
import Contact from '@/components/sections/contact'
import Footer from '@/components/sections/footer'

export const metadata: Metadata = {
  title: 'Ejada Systems — التحول الوطني',
  description: 'شريك التحول التقني الرائد في المملكة العربية السعودية',
}

// ISR: revalidate every 60 seconds
export const revalidate = 60

export default async function ArabicHomePage() {
  const cmsData = await getHomeContent('ar')

  return (
    <ContentProvider locale="ar" cmsContent={cmsData as any}>
      <main>
        <Navigation />
        <Hero />
        <WhoWeAre />
        <WhatWeBelieve />
        <OrchestratorModel />
        <Values />
        <WhatWeEnable />
        <Capabilities />
        <Sectors />
        <ProofPoints />
        <Partners />
        <Contact />
        <Footer />
      </main>
    </ContentProvider>
  )
}
