'use client'

import { useState, useEffect } from 'react'
import { SectionLabel, AnimatedCounter, CapabilityTile, TabNav, FloatingOrb, GridPattern } from '@/components/ui'

const AR = {
  hero: {
    eyebrow: 'الملف التعريفي ٢٠٢٦',
    headline: 'المُنظّم الوطني\nللتحول.',
    tagline: 'نحن نجعل التعقيد يتحول إلى تماسك.',
    stats: [
      { value: '٢٠+', label: 'سنوات من التأثير' },
      { value: '٥٠٠+', label: 'مشروع منجز' },
      { value: '٧', label: 'دول' },
      { value: '٨', label: 'قطاعات' },
    ],
  },
  about: {
    label: 'من نحن',
    headline: 'المُنظّم الوطني للتحول في المملكة',
    body: 'نحن شركة إجادة سيستمز — الشريك التقني الاستراتيجي للمؤسسات السعودية الرائدة. نصمم التماسك حيث يوجد التعقيد.',
    stats: [
      { value: '٢٠+', label: 'سنوات في المملكة' },
      { value: '١,٠٠٠+', label: 'محترف' },
      { value: '٥٠+', label: 'عميل مؤسسي' },
      { value: '٥٠٠+', label: 'مشروع' },
    ],
  },
  beliefs: [
    { number: '٠١', title: 'الرؤية', body: 'نتطلع إلى مستقبل حيث تزيل التقنية الاحتكاك من كل تفاعل.' },
    { number: '٠٢', title: 'الرسالة', body: 'نتحالف مع المؤسسات التي تشكل المملكة ونُحوّلها من الداخل.' },
    { number: '٠٣', title: 'الغاية', body: 'كل تقنية نُنشئها، كل تجربة نرفعها —都是为了 سعودية أفضل.' },
  ],
  orchestrator: [
    { number: '٠١', title: 'الاستراتيجية', description: 'نبدأ بالتشخيص العميق — فهم حالتك الراهنة وقيودك.' },
    { number: '٠٢', title: 'التنسيق', description: 'نصمم مخطط التحول — القدرات والتبعيات والجداول الزمنية.' },
    { number: '٠٣', title: 'التنفيذ', description: 'نُنجز — نشر الحلول وإدارة التغيير وتدريب الفرق.' },
    { number: '٠٤', title: 'الاستدامة', description: 'لا نغادر عند الإطلاق. نراقب ونُحسّن ونُطوّر.' },
  ],
  values: [
    { letter: 'إ', title: 'النزاهة', description: 'الشفافية والأمانة' },
    { letter: 'ن', title: 'الابتكار', description: 'أفكار جديدة' },
    { letter: 'س', title: 'التضامن', description: 'فريق واحد' },
    { letter: 'ت', title: 'الاستباقية', description: 'نتوقع ونتحرك' },
    { letter: 'و', title: 'التميز', description: 'الجودة والنتائج' },
  ],
  enable: [
    { title: 'النمو', desc: 'تسريع الإيرادات والتوسع في الأسواق.' },
    { title: 'الكفاءة', desc: 'تحسين التكاليف وأتمتة العمليات.' },
    { title: 'المرونة', desc: 'إدارة المخاطر والأمن والامتثال.' },
    { title: 'التجربة', desc: 'رحلات العملاء والخدمات الحكومية.' },
    { title: 'الابتكار', desc: 'قرارات مبنية على البيانات.' },
  ],
  capabilities: [
    { number: '٠١', title: 'تطبيقات المؤسسات و ERP', short: 'تنفيذ SAP و Oracle.', tags: ['SAP', 'Oracle', 'ERP'], long: 'تنفيذ شامل وتحسين وخدمات مدارة لـ ERP.' },
    { number: '٠٢', title: 'البيانات والذكاء الاصطناعي', short: 'منصات البيانات وحلول الذكاء الاصطناعي.', tags: ['AI/ML', 'البيانات', 'BI'], long: 'من هندسة البيانات إلى أنظمة الذكاء الاصطناعي الإنتاجية.' },
    { number: '٠٣', title: 'الحوسبة السحابية', short: 'الهجرة والبنية التحتية السيادية.', tags: ['AWS', 'Azure', 'سحابة'], long: 'بنية تحتية سيادية وقابلة للتوسع.' },
    { number: '٠٤', title: 'الأمن السيبراني', short: 'عمليات الأمن وإدارة الهوية.', tags: ['SOC', 'GRC', 'الأمن'], long: 'حماية الأصول الرقمية الأكثر حساسية.' },
    { number: '٠٥', title: 'الخدمات المدارة', short: 'عمليات تكنولوجيا المعلومات.', tags: ['ITO', 'ServiceNow'], long: 'إدارة كاملة لعمليات تكنولوجيا المعلومات.' },
    { number: '٠٦', title: 'المصرفية الإسلامية', short: 'الامتثال الشرعي والتقنية.', tags: ['شرعي', 'مالية'], long: 'حلول تقنية للمؤسسات المالية الإسلامية.' },
  ],
  sectors: [
    { name: 'الخدمات المالية', description: 'نتحالف مع البنوك الرائدة لتحديث الأنظمة.' },
    { name: 'الحكومة', description: 'نبني المنصات التي تجعل رؤية ٢٠٣٠ حقيقة.' },
    { name: 'الصحة', description: 'تحديث تقديم الرعاية الصحية.' },
    { name: 'النقل واللوجستيات', description: 'بناء البنية التحتية الرقمية.' },
    { name: 'التجزئة', description: 'تحول التجزئة نحو التجارة متعددة القنوات.' },
    { name: 'العقارات', description: 'تحويل إدارة العقارات والتطوير.' },
    { name: 'الرياضة والسياحة', description: 'المنصات الرقمية للوجهات الترفيهية.' },
    { name: 'المشاريع الكبرى', description: 'التنسيق التقني على المستوى الوطني.' },
  ],
  proof: [
    { value: '٢٠+', label: 'سنوات في المملكة' },
    { value: '٥٠٠+', label: 'مشروع منجز' },
    { value: '٧', label: 'دول' },
    { value: '٨', label: 'قطاعات' },
  ],
  contact: {
    label: 'تواصل معنا',
    headline: 'لنُنظّم تحوّلك.',
    address: 'الرياض، المملكة العربية السعودية',
    email: 'info@ejada.com',
  },
}

// Nav inline
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveSection(`#${e.target.id}`) })
    }, { threshold: 0.35 })
    sections.forEach((s) => obs.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-navy-deep/95 backdrop-blur-sm border-b border-white/8' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ejada-blue-logo.png" alt="إجادة" className="h-7 w-auto" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
          <nav className="hidden lg:flex items-center gap-6">
            {[{ label: 'من نحن', href: '#about' }, { label: 'القطاعات', href: '#sectors' }, { label: 'القدرات', href: '#capabilities' }, { label: 'تواصل معنا', href: '#contact' }].map((l) => (
              <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${activeSection === l.href ? 'text-white' : 'text-white/50 hover:text-white'}`}>{l.label}</a>
            ))}
          </nav>
          <a href="#contact" className="hidden lg:inline-flex px-5 py-2.5 bg-sky-400 text-navy-deep text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">تواصل معنا</a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-navy-deep flex flex-col justify-center px-10">
          {[{ label: 'من نحن', href: '#about' }, { label: 'القطاعات', href: '#sectors' }, { label: 'القدرات', href: '#capabilities' }, { label: 'تواصل معنا', href: '#contact' }].map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-3xl font-black text-white py-3 border-b border-white/10 hover:text-sky-400 transition-colors" style={{ animationDelay: `${i * 60}ms` }}>{l.label}</a>
          ))}
        </div>
      )}
    </>
  )
}

function Hero() {
  const { hero } = AR
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#000850' }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.2 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-deep" />
      </div>
      <FloatingOrb size={700} color="#0070C0" blur={150} duration={9} className="-top-20 -left-40 opacity-20" />
      <FloatingOrb size={400} color="#009EE0" blur={80} duration={6} className="top-1/3 right-10 opacity-15" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '72px 72px' }} />
      <div className="container mx-auto px-6 lg:px-10 relative z-10 w-full max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">{hero.eyebrow}</span>
        </div>
        <h1 className="text-white font-black leading-[0.93] tracking-tight mb-6 whitespace-pre-line" style={{ fontSize: 'clamp(44px, 7vw, 88px)', letterSpacing: '-0.03em' }}>{hero.headline}</h1>
        <p className="text-white/45 text-base lg:text-lg leading-relaxed mb-10">{hero.tagline}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#about" className="inline-flex items-center gap-2.5 px-8 py-4 bg-sky-400 text-navy-deep font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-200">اكتشف عملنا</a>
          <a href="#contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-white/60 border border-white/20 text-sm font-semibold uppercase tracking-widest hover:border-white/50 hover:text-white transition-all duration-200">تواصل معنا</a>
        </div>
        <div className="flex flex-wrap items-center gap-8 lg:gap-16 py-6 border-t border-white/10 mt-16">
          {hero.stats.map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2.5">
              <span className="text-2xl lg:text-3xl font-black text-white">{value}</span>
              <span className="text-xs text-white/35 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const { about } = AR
  return (
    <section id="about" className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel light>{about.label}</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white font-black leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>{about.headline}</h2>
            <p className="text-white/55 text-base leading-relaxed mb-10">{about.body}</p>
            <div className="grid grid-cols-2 gap-6">
              {about.stats.map(({ value, label }) => (
                <div key={label} className="border-r-2 border-sky-400 pl-4">
                  <div className="text-3xl font-black text-white">{value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about-img.jpg" alt="إجادة" className="w-full h-full object-cover" style={{ opacity: 0.75 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Beliefs() {
  return (
    <section id="story" className="relative bg-navy overflow-hidden py-24 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/curved-lines.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.06 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <SectionLabel light>ما نؤمن به</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 mb-16">
          {AR.beliefs.map((item, i) => (
            <div key={item.number} className="bg-navy p-8 lg:p-10">
              <div className="text-xs font-mono text-sky-400 mb-6">{item.number}</div>
              <h3 className="text-xl lg:text-2xl font-black text-white mb-4 leading-tight tracking-tight">{item.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-6" style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}>
            &ldquo;لا نُنشئ أنظمة فحسب. نُنظّم التماسك.&rdquo;
          </p>
          <p className="text-sm text-white/30 uppercase tracking-widest">— إجادة سيستمز</p>
        </div>
      </div>
    </section>
  )
}

function Orchestrator() {
  return (
    <section className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel light>نموذج المُنظّم</SectionLabel>
        <h2 className="text-white font-black leading-tight mb-16 max-w-2xl" style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.025em' }}>
          أربع مراحل. رحلة تحول واحدة متماسكة.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AR.orchestrator.map((step, i) => (
            <div key={step.number} className="group">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-sky-400/50">{step.number}</span>
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:border-sky-400/40 group-hover:text-sky-400 transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">{step.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section id="values" className="relative bg-cream overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel>قيمنا</SectionLabel>
        <h2 className="text-navy font-black leading-tight mb-16" style={{ fontSize: 'clamp(36px, 5vw, 72px)', letterSpacing: '-0.03em' }}>إِنْجِدُوا</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
          {AR.values.map((v) => (
            <div key={v.letter} className="text-center group">
              <div className="text-5xl lg:text-6xl font-black text-navy/10 group-hover:text-sky-400/30 transition-colors mb-3 leading-none">{v.letter}</div>
              <div className="text-sm font-bold text-navy mb-1.5">{v.title}</div>
              <div className="text-xs text-charcoal/40 leading-relaxed">{v.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Enable() {
  return (
    <section id="services" className="relative bg-white overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel>ما نُمكّن</SectionLabel>
        <h2 className="text-navy font-black leading-tight mb-4" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>نتائج أعمال، ليس مشاريع تقنية.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {AR.enable.map((item, i) => (
            <div key={item.title} className="bg-white border p-8 hover:shadow-lift transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 bg-navy/5 flex items-center justify-center mb-5 text-navy">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-navy leading-tight mb-3">{item.title}</h3>
              <p className="text-sm text-charcoal/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-navy overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionLabel light>قدراتنا</SectionLabel>
            <h2 className="text-white font-black leading-tight mb-6" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>قدرات متكاملة، مُنسّقة للأثر.</h2>
            <p className="text-white/50 text-sm leading-relaxed">نصمم الروابط الحيوية بين الاستراتيجية والمنصات والبيانات والعمليات.</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {AR.capabilities.map((cap, i) => (
              <div key={cap.number} className="bg-navy-deep/60 border border-white/10 p-8 group hover:border-sky-400/30 transition-all duration-300">
                <div className="text-xs font-mono text-sky-400/40 mb-4">{cap.number}</div>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{cap.title}</h3>
                <p className="text-sm text-white/45 mb-5 leading-relaxed">{cap.short}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => <span key={tag} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 text-white/40">{tag}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Sectors() {
  const [active, setActive] = useState(0)
  return (
    <section id="sectors" className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel light>القطاعات التي نخدمها</SectionLabel>
        <h2 className="text-white font-black leading-tight mb-12" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
          ثمانية قطاعات. نهج واحد متماسك للتحول.
        </h2>
        <TabNav tabs={AR.sectors.map((s, i) => ({ id: String(i), label: s.name }))} active={String(active)} onChange={(id) => setActive(parseInt(id))} />
        <div className="max-w-2xl">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-sky-400">قطاع</div>
          <h3 className="text-3xl font-black text-white mb-3 leading-tight">{AR.sectors[active].name}</h3>
          <p className="text-white/50 text-sm leading-relaxed">{AR.sectors[active].description}</p>
        </div>
      </div>
    </section>
  )
}

function Proof() {
  return (
    <section className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <SectionLabel light>بالأرقام</SectionLabel>
        <h2 className="text-white font-black leading-tight mb-16" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>أرقام تُعرّف مسارنا.</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {AR.proof.map((item) => (
            <AnimatedCounter key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className="relative bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-4">شركاؤنا</div>
        <h2 className="text-navy font-black leading-tight mb-12" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em' }}>
          نبني الثقة مع المؤسسات الرائدة
        </h2>
        <div className="flex flex-wrap items-center gap-8 lg:gap-12 opacity-40">
          {['SAP', 'Oracle', 'Microsoft', 'AWS', 'ServiceNow', 'Cisco'].map((p) => (
            <div key={p} className="text-sm font-bold text-navy/60 uppercase tracking-widest">{p}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { contact } = AR
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="relative bg-navy-deep overflow-hidden py-24 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/neon-lines.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.06 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel light>{contact.label}</SectionLabel>
            <h2 className="text-white font-black leading-tight mb-4" style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.025em' }}>{contact.headline}</h2>
            <div className="space-y-4 mt-10">
              <div className="flex items-center gap-4"><span className="text-xs font-bold uppercase tracking-widest text-white/25 w-16">العنوان</span><span className="text-white/60 text-sm">{contact.address}</span></div>
              <div className="flex items-center gap-4"><span className="text-xs font-bold uppercase tracking-widest text-white/25 w-16">البريد</span><span className="text-white/60 text-sm">{contact.email}</span></div>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center mb-4 text-sky-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">تم الإرسال</h3>
                <p className="text-white/40 text-sm">سنتواصل معك خلال يوم عمل واحد.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                <input type="text" placeholder="الاسم الكامل" required className="w-full bg-transparent border-b border-white/20 text-white/60 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/20" />
                <input type="email" placeholder="البريد الإلكتروني" required className="w-full bg-transparent border-b border-white/20 text-white/60 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/20" />
                <input type="text" placeholder="الشركة" className="w-full bg-transparent border-b border-white/20 text-white/60 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/20" />
                <textarea placeholder="رسالتك..." rows={4} className="w-full bg-transparent border-b border-white/20 text-white/60 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors resize-none placeholder:text-white/20" />
                <button type="submit" className="w-full py-3.5 bg-sky-400 text-navy-deep font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">إرسال الرسالة</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10 py-12">
      <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/ejada-white-logo.png" alt="إجادة" className="h-8 w-auto" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
        <div className="text-sm text-white/25">© ٢٠٢٦ إجادة سيستمز. جميع الحقوق محفوظة.</div>
      </div>
    </footer>
  )
}

export default function ArabicHome() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Beliefs />
      <Orchestrator />
      <Values />
      <Enable />
      <Capabilities />
      <Sectors />
      <Proof />
      <Partners />
      <Contact />
      <Footer />
    </main>
  )
}