import { getPayload } from 'payload'
import config from '@payload-config'
import { pageContent } from './content'
import { pageContentAr } from './content-ar'

export async function getHomeContent(locale: 'en' | 'ar' = 'en') {
  try {
    const payload = await getPayload({ config })

    const defaults = locale === 'ar' ? pageContentAr : pageContent

    // Fetch all globals in parallel — if any fail, use static fallback
    const results = await Promise.all([
      payload.findGlobal({ slug: 'navigation', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'hero', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'who-we-are', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'what-we-believe', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'orchestrator-model', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'values', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'what-we-enable', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'proof-points', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'contact', depth: 0 }).catch(() => null),
      payload.findGlobal({ slug: 'footer', depth: 0 }).catch(() => null),
    ])

    const [nav, hero, whoWeAre, whatWeBelieve, orchestratorModel, values, whatWeEnable, proofPoints, contact, footer] = results

    return {
      // Use CMS data if available, otherwise fall back to static
      nav: nav || defaults.nav,
      hero: hero || defaults.hero,
      whoWeAre: whoWeAre || defaults.whoWeAre,
      whatWeBelieve: whatWeBelieve || defaults.whatWeBelieve,
      orchestratorModel: orchestratorModel || defaults.orchestratorModel,
      values: values || defaults.values,
      whatWeEnable: whatWeEnable || defaults.whatWeEnable,
      proofPoints: proofPoints || defaults.proofPoints,
      contact: contact || defaults.contact,
      footer: footer || defaults.footer,
      // Keep static fallback data for sections not yet wired
      footprint: defaults.footprint,
      capabilities: defaults.capabilities,
      sectors: defaults.sectors,
      partners: defaults.partners,
      proofPointsMarquee: defaults.proofPointsMarquee,
      meta: defaults.meta,
      isCMS: nav !== null, // true if at least one CMS fetch succeeded
    }
  } catch (error) {
    console.error('CMS fetch failed, using static content:', error)
    const defaults = locale === 'ar' ? pageContentAr : pageContent
    return {
      ...defaults,
      isCMS: false,
    }
  }
}
