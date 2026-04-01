'use client'

import { useState, useEffect } from 'react'
import { SectionLabel, AnimatedCounter, CapabilityTile, TabNav, FloatingOrb, GridPattern } from '@/components/ui'

/* ─── Arabic Content — Saudi IT Industry Standard ───────────────── */
const AR = {
  nav: {
    links: [
      { label: 'من نحن',       href: '#about' },
      { label: 'القطاعات',     href: '#sectors' },
      { label: 'قدراتنا',      href: '#capabilities' },
      { label: 'تواصل معنا',   href: '#contact' },
    ],
    cta: 'تواصل معنا',
  },

  hero: {
    eyebrow: 'الملف المؤسسي — ٢٠٢٦',
    headline: 'المُنسِّق الوطني\nللتحول الرقمي.',
    tagline: 'نحوّل التعقيد التقني إلى تماسك مؤسسي — لبناء مملكة أكثر ذكاءً.',
    cta1: 'اكتشف أعمالنا',
    cta2: 'ابدأ حواراً',
    stats: [
      { value: '٢٠+', label: 'عاماً من الريادة' },
      { value: '٥٠٠+', label: 'مشروع مُنجز' },
      { value: '٧',   label: 'دول' },
      { value: '٨',   label: 'قطاعات' },
    ],
  },

  about: {
    label: 'من نحن',
    headline: 'الشريك التقني الاستراتيجي للمؤسسات السعودية',
    body: 'إجادة سيستمز هي شركة تقنية معلومات سعودية رائدة، تؤمن بأن التقنية ليست غاية في حد ذاتها، بل أداة لتعزيز الكفاءة المؤسسية وتسريع مستهدفات رؤية المملكة ٢٠٣٠. نجمع بين الخبرة التقنية العميقة وفهم السياق المحلي لنُقدّم تحولاً حقيقياً ومستداماً.',
    stats: [
      { value: '٢٠+',   label: 'عاماً في المملكة' },
      { value: '١٬٠٠٠+', label: 'كفاءة مؤهلة' },
      { value: '٥٠+',   label: 'عميل مؤسسي' },
      { value: '٥٠٠+',  label: 'مشروع منجز' },
    ],
  },

  beliefs: [
    {
      number: '٠١',
      title: 'الرؤية',
      body: 'نتطلع إلى مستقبل تُزيل فيه التقنية كل احتكاك، وتُمكّن كل مؤسسة من تحقيق أثرها الحقيقي.',
    },
    {
      number: '٠٢',
      title: 'الرسالة',
      body: 'نتحالف مع المؤسسات الكبرى التي تُشكّل ملامح المملكة، ونُحوّلها من الداخل بتقنية دقيقة وشراكة استراتيجية.',
    },
    {
      number: '٠٣',
      title: 'الغاية',
      body: 'كل نظام نُطوّره، وكل تجربة نَرفعها، وكل بيانة نُحوّلها إلى قرار — من أجل مملكة رقمية أكثر تطوراً.',
    },
  ],

  orchestrator: {
    label: 'نموذج التنسيق',
    headline: 'أربع مراحل. رحلة تحوّل متكاملة.',
    steps: [
      {
        number: '٠١',
        title: 'التشخيص الاستراتيجي',
        description: 'نبدأ بفهم عميق للوضع الراهن: البنية التقنية، الفجوات التشغيلية، وأولويات الأعمال — قبل أي توصية.',
      },
      {
        number: '٠٢',
        title: 'التصميم المعماري',
        description: 'نُصمّم خارطة طريق التحول: القدرات المطلوبة، التبعيات، الأطر الزمنية — وفق أفضل الممارسات العالمية.',
      },
      {
        number: '٠٣',
        title: 'التنفيذ والتكامل',
        description: 'ننفّذ بدقة: نشر الحلول، تكامل الأنظمة، إدارة التغيير، وتأهيل الكوادر البشرية على المنصات الجديدة.',
      },
      {
        number: '٠٤',
        title: 'التحسين المستمر',
        description: 'لا نغادر عند الإطلاق. نرصد الأداء، نُحسّن الإجراءات، ونطوّر الحلول لتواكب تطور أعمالكم.',
      },
    ],
  },

  values: {
    label: 'قيمنا',
    acrostic: 'إجادة',
    items: [
      { letter: 'إ', title: 'إتقان',  description: 'نلتزم بأعلى معايير الجودة في كل مشروع نتعهده.' },
      { letter: 'ج', title: 'جدارة',  description: 'نكسب ثقة عملائنا بالنتائج الملموسة، لا بالوعود.' },
      { letter: 'ا', title: 'أمانة',  description: 'شراكة مبنية على الشفافية والمسؤولية المتبادلة.' },
      { letter: 'د', title: 'دراية',  description: 'خبرة تقنية عميقة وفهم حقيقي للسياق المحلي.' },
      { letter: 'ة', title: 'تعاون',  description: 'فريق متكامل يعمل كامتداد لمؤسسة عميلنا.' },
    ],
  },

  enable: {
    label: 'ما نُمكِّن',
    headline: 'نتائج أعمال حقيقية — لا مجرد مشاريع تقنية.',
    items: [
      { title: 'النمو المستدام',    desc: 'تسريع الإيرادات والتوسع في الأسواق عبر حلول رقمية مدروسة.' },
      { title: 'الكفاءة التشغيلية', desc: 'تحسين التكاليف وأتمتة العمليات لرفع الإنتاجية المؤسسية.' },
      { title: 'الصمود والمرونة',   desc: 'إدارة المخاطر، الأمن السيبراني، والامتثال للوائح التنظيمية.' },
      { title: 'تجربة المستفيد',    desc: 'تصميم رحلات المستخدم وتحسين خدمات القطاع الحكومي والخاص.' },
      { title: 'ذكاء الأعمال',      desc: 'قرارات استراتيجية مبنية على البيانات والتحليلات المتقدمة.' },
    ],
  },

  capabilities: {
    label: 'قدراتنا',
    headline: 'قدرات متكاملة — مُنسَّقة للأثر المؤسسي.',
    sub: 'نصمم الروابط الحيوية بين الاستراتيجية والمنصات والبيانات والعمليات لتحقيق تحول رقمي شامل ومستدام.',
    items: [
      {
        number: '٠١',
        title: 'تطبيقات المؤسسات وتخطيط الموارد (ERP)',
        short: 'تنفيذ SAP وOracle وتحسين أنظمة ERP.',
        tags: ['SAP', 'Oracle', 'ERP', 'S/4HANA'],
        long: 'تنفيذ شامل، ترحيل، تكامل وخدمات مُدارة لمنظومة تخطيط موارد المؤسسات.',
      },
      {
        number: '٠٢',
        title: 'البيانات والذكاء الاصطناعي',
        short: 'منصات البيانات، ذكاء الأعمال، وحلول الذكاء الاصطناعي.',
        tags: ['AI/ML', 'تحليلات البيانات', 'BI', 'مستودعات البيانات'],
        long: 'من هندسة البيانات إلى نماذج الذكاء الاصطناعي الإنتاجية ومنصات ذكاء الأعمال.',
      },
      {
        number: '٠٣',
        title: 'الحوسبة السحابية والبنية التحتية',
        short: 'الترحيل السحابي والبنية التحتية السيادية.',
        tags: ['AWS', 'Azure', 'سحابة سيادية', 'DevOps'],
        long: 'بنية تحتية مرنة وقابلة للتوسع، تتوافق مع متطلبات الحوكمة والسيادة الرقمية.',
      },
      {
        number: '٠٤',
        title: 'الأمن السيبراني وإدارة الهوية',
        short: 'عمليات الأمن، GRC، وإدارة الهوية والوصول.',
        tags: ['SOC', 'GRC', 'IAM', 'استجابة الحوادث'],
        long: 'حماية الأصول الرقمية الأكثر حساسية وفق أعلى معايير الأمن السيبراني.',
      },
      {
        number: '٠٥',
        title: 'الخدمات المُدارة وعمليات تقنية المعلومات',
        short: 'إدارة كاملة لعمليات تقنية المعلومات على مدار الساعة.',
        tags: ['ITO', 'ServiceNow', 'ITIL', 'مركز خدمة'],
        long: 'تشغيل ومراقبة ودعم متكامل للبنية التحتية والتطبيقات المؤسسية.',
      },
      {
        number: '٠٦',
        title: 'التمويل الإسلامي والتقنية المالية',
        short: 'حلول تقنية للامتثال الشرعي ومنظومة المال الإسلامي.',
        tags: ['شريعة', 'FinTech', 'SAMA', 'مؤسسات مالية'],
        long: 'بناء وتطوير الأنظمة التقنية للمؤسسات المالية الإسلامية وفق ضوابط الهيئة الشرعية.',
      },
    ],
  },

  sectors: {
    label: 'القطاعات التي نخدمها',
    headline: 'ثمانية قطاعات — نهج واحد متكامل للتحول.',
    items: [
      {
        name: 'الخدمات المالية والمصرفية',
        description: 'نُحدّث الأنظمة المصرفية الأساسية ونبني المنصات الرقمية للبنوك وشركات التأمين وهيئات السوق المالية.',
      },
      {
        name: 'القطاع الحكومي والخدمات الوطنية',
        description: 'نبني المنصات الرقمية التي تجعل مستهدفات رؤية المملكة ٢٠٣٠ حقيقة واقعة، بكفاءة تشغيلية عالية.',
      },
      {
        name: 'الرعاية الصحية والصحة الرقمية',
        description: 'نرفع جودة تقديم الرعاية الصحية بأنظمة المعلومات الصحية وحلول الصحة الرقمية المتكاملة.',
      },
      {
        name: 'النقل واللوجستيات',
        description: 'نبني البنية التحتية الرقمية لمنظومة النقل الوطنية، بما يتوافق مع مشاريع رؤية ٢٠٣٠.',
      },
      {
        name: 'التجزئة والتجارة الإلكترونية',
        description: 'تحويل التجزئة نحو نموذج التجارة متعددة القنوات وتعزيز تجربة المستهلك الرقمية.',
      },
      {
        name: 'التطوير العقاري وإدارة الأصول',
        description: 'رقمنة إدارة العقارات والمشاريع التطويرية الكبرى بمنظومات متكاملة وذكية.',
      },
      {
        name: 'الرياضة والترفيه والسياحة',
        description: 'المنصات الرقمية للوجهات الترفيهية ومنظومات إدارة الفعاليات الوطنية الكبرى.',
      },
      {
        name: 'المشاريع الوطنية الكبرى (ميغا بروجكت)',
        description: 'التنسيق التقني الاستراتيجي للمبادرات الوطنية بمستوى التعقيد والضخامة المؤسسية الكبيرة.',
      },
    ],
  },

  proof: {
    label: 'بالأرقام',
    headline: 'أرقام تعكس مسيرة ثلاثة عقود من الإنجاز.',
    items: [
      { value: '٢٠+',   label: 'عاماً في المملكة' },
      { value: '٥٠٠+',  label: 'مشروع مُنجز' },
      { value: '٧',     label: 'دول' },
      { value: '١٬٠٠٠+', label: 'كفاءة مؤهلة' },
    ],
  },

  partners: {
    label: 'شركاؤنا الاستراتيجيون',
    headline: 'تحالفات عالمية — لخدمة السوق المحلي.',
    names: ['SAP', 'Oracle', 'Microsoft', 'AWS', 'ServiceNow', 'Cisco'],
  },

  contact: {
    label: 'تواصل معنا',
    headline: 'لنُنسّق تحوّلكم معاً.',
    address: 'الرياض، المملكة العربية السعودية',
    email: 'info@ejada.com',
    phone: '+966 11 000 0000',
    fields: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      company: 'المؤسسة / الشركة',
      message: 'كيف يمكننا المساعدة؟',
      submit: 'إرسال الرسالة',
    },
    success: {
      title: 'تم الإرسال بنجاح',
      body: 'شكراً لتواصلكم. سيتواصل معكم فريقنا خلال يوم عمل واحد.',
    },
  },

  footer: {
    copy: '© ٢٠٢٦ إجادة سيستمز. جميع الحقوق محفوظة.',
    switchLang: 'English',
  },
}

/* ─── Navigation ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveSection(`#${e.target.id}`) }) },
      { threshold: 0.35 }
    )
    sections.forEach((s) => obs.observe(s))
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect() }
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[#000850]/95 backdrop-blur-sm border-b border-white/8' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ejada-white-logo.png" alt="إجادة" className="h-7 w-auto" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
          <nav className="hidden lg:flex items-center gap-6">
            {AR.nav.links.map((l) => (
              <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors duration-200 ${activeSection === l.href ? 'text-white' : 'text-white/50 hover:text-white'}`}>{l.label}</a>
            ))}
          </nav>
          <div className="hidden lg:flex items-center gap-3">
            <a href="/" className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider">EN</a>
            <a href="#contact" className="px-5 py-2.5 bg-sky-400 text-[#000850] text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">{AR.nav.cta}</a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white" aria-label="القائمة">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-[#000850] flex flex-col justify-center px-10">
          <a href="/" className="text-sm text-white/30 mb-8 uppercase tracking-widest hover:text-white/60 transition-colors">English</a>
          {AR.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-3xl font-black text-white py-3 border-b border-white/10 hover:text-sky-400 transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-8 inline-flex items-center justify-center py-3.5 bg-sky-400 text-[#000850] font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
            {AR.nav.cta}
          </a>
        </div>
      )}
    </>
  )
}

/* ─── Hero ───────────────────────────────────────────────────────── */
function Hero() {
  const { hero } = AR
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#000850' }}>
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" className="w-full h-full object-cover" style={{ opacity: 0.18 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000850] via-[#001081] to-[#000850]" />
      </div>
      <FloatingOrb size={700} color="#0070C0" blur={150} duration={9} className="-top-20 -right-40 opacity-20" />
      <FloatingOrb size={400} color="#009EE0" blur={80} duration={6} className="top-1/3 left-10 opacity-15" />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10 w-full max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">{hero.eyebrow}</span>
        </div>
        <h1 className="text-white font-black leading-[0.93] tracking-tight mb-6 whitespace-pre-line"
          style={{ fontSize: 'clamp(44px, 7vw, 96px)', letterSpacing: '-0.03em' }}>
          {hero.headline}
        </h1>
        <p className="text-white/45 text-base lg:text-lg leading-relaxed mb-10 max-w-xl">{hero.tagline}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#about" className="inline-flex items-center gap-2.5 px-8 py-4 bg-sky-400 text-[#000850] font-bold text-sm uppercase tracking-widest hover:bg-white transition-all duration-200">
            {hero.cta1}
          </a>
          <a href="#contact" className="inline-flex items-center gap-2.5 px-8 py-4 text-white/60 border border-white/20 text-sm font-semibold uppercase tracking-widest hover:border-white/50 hover:text-white transition-all duration-200">
            {hero.cta2}
          </a>
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

/* ─── About ──────────────────────────────────────────────────────── */
function About() {
  const { about } = AR
  return (
    <section id="about" className="relative bg-[#000820] overflow-hidden py-24 lg:py-32">
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel light>{about.label}</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-white font-black leading-tight mb-6" style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>{about.headline}</h2>
            <p className="text-white/55 text-base leading-[1.9] mb-10">{about.body}</p>
            <div className="grid grid-cols-2 gap-6">
              {about.stats.map(({ value, label }) => (
                /* RTL: accent border on inline-start (right side in RTL), padding on start */
                <div key={label} className="border-s-2 border-sky-400 ps-4">
                  <div className="text-3xl font-black text-white">{value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[420px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about-img.jpg" alt="إجادة سيستمز" className="w-full h-full object-cover" style={{ opacity: 0.75 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000820] via-[#000820]/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Beliefs ────────────────────────────────────────────────────── */
function Beliefs() {
  const { beliefs } = AR
  return (
    <section id="story" className="relative bg-[#001081] overflow-hidden py-24 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/curved-lines.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.06 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <SectionLabel light>ما نؤمن به</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 mb-16">
          {beliefs.map((item) => (
            <div key={item.number} className="bg-[#001081] p-8 lg:p-10">
              <div className="text-xs font-mono text-sky-400 mb-6">{item.number}</div>
              <h3 className="text-xl lg:text-2xl font-black text-white mb-4 leading-tight">{item.title}</h3>
              <p className="text-sm text-white/50 leading-[1.9]">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl lg:text-4xl font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(22px, 3.5vw, 40px)' }}>
            &ldquo;لا نبني أنظمة فحسب — نُنسِّق التماسك المؤسسي.&rdquo;
          </p>
          <p className="text-sm text-white/30 uppercase tracking-widest">— إجادة سيستمز</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Orchestrator ───────────────────────────────────────────────── */
function Orchestrator() {
  const { orchestrator } = AR
  return (
    <section className="relative bg-[#000820] overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel light>{orchestrator.label}</SectionLabel>
        <h2 className="text-white font-black leading-tight mb-16 max-w-2xl"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.025em' }}>
          {orchestrator.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {orchestrator.steps.map((step) => (
            <div key={step.number} className="group">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-sky-400/50">{step.number}</span>
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:border-sky-400/40 group-hover:text-sky-400 transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 leading-tight">{step.title}</h3>
              <p className="text-sm text-white/45 leading-[1.85]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Values ─────────────────────────────────────────────────────── */
function Values() {
  const { values } = AR
  return (
    <section id="values" className="relative bg-[#F5F3F0] overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel>{values.label}</SectionLabel>
        <h2 className="font-black leading-tight mb-16 text-[#001081]"
          style={{ fontSize: 'clamp(36px, 5vw, 80px)', letterSpacing: '-0.03em' }}>
          {values.acrostic}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
          {values.items.map((v) => (
            <div key={v.letter} className="text-center group">
              <div className="text-5xl lg:text-6xl font-black text-[#001081]/10 group-hover:text-sky-400/30 transition-colors mb-3 leading-none">{v.letter}</div>
              <div className="text-sm font-bold text-[#001081] mb-1.5">{v.title}</div>
              <div className="text-xs text-[#2D3436]/50 leading-relaxed">{v.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Enable ─────────────────────────────────────────────────────── */
function Enable() {
  const { enable } = AR
  return (
    <section id="services" className="relative bg-white overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel>{enable.label}</SectionLabel>
        <h2 className="text-[#001081] font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
          {enable.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {enable.items.map((item) => (
            <div key={item.title} className="bg-white border border-[#001081]/10 p-8 hover:shadow-lift transition-all duration-300 cursor-pointer group hover:border-sky-400/40">
              <div className="w-12 h-12 bg-[#001081]/5 flex items-center justify-center mb-5 text-[#001081] group-hover:bg-sky-400/10 group-hover:text-sky-400 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-[#001081] leading-tight mb-3">{item.title}</h3>
              <p className="text-sm text-[#2D3436]/50 leading-[1.75]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Capabilities ───────────────────────────────────────────────── */
function Capabilities() {
  const { capabilities } = AR
  return (
    <section id="capabilities" className="relative bg-[#001081] overflow-hidden py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionLabel light>{capabilities.label}</SectionLabel>
            <h2 className="text-white font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
              {capabilities.headline}
            </h2>
            <p className="text-white/50 text-sm leading-[1.85]">{capabilities.sub}</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.items.map((cap) => (
              <div key={cap.number} className="bg-[#000820]/60 border border-white/10 p-8 group hover:border-sky-400/30 transition-all duration-300">
                <div className="text-xs font-mono text-sky-400/40 mb-4">{cap.number}</div>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{cap.title}</h3>
                <p className="text-sm text-white/45 mb-5 leading-[1.75]">{cap.short}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 text-white/40">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Sectors ────────────────────────────────────────────────────── */
function Sectors() {
  const [active, setActive] = useState(0)
  const { sectors } = AR
  return (
    <section id="sectors" className="relative bg-[#000820] overflow-hidden py-24 lg:py-32">
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10">
        <SectionLabel light>{sectors.label}</SectionLabel>
        <h2 className="text-white font-black leading-tight mb-12"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', letterSpacing: '-0.02em' }}>
          {sectors.headline}
        </h2>
        <TabNav
          tabs={sectors.items.map((s, i) => ({ id: String(i), label: s.name }))}
          active={String(active)}
          onChange={(id) => setActive(parseInt(id))}
        />
        <div className="max-w-2xl mt-10">
          <div className="mb-4 text-xs font-bold uppercase tracking-widest text-sky-400">القطاع</div>
          <h3 className="text-3xl font-black text-white mb-4 leading-tight">{sectors.items[active].name}</h3>
          <p className="text-white/50 text-sm leading-[1.85]">{sectors.items[active].description}</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Proof Points ───────────────────────────────────────────────── */
function Proof() {
  const { proof } = AR
  return (
    <section className="relative bg-[#000850] overflow-hidden py-24 lg:py-32">
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <SectionLabel light>{proof.label}</SectionLabel>
        <h2 className="text-white font-black leading-tight mb-16"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
          {proof.headline}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {proof.items.map((item) => (
            <AnimatedCounter key={item.label} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Partners ───────────────────────────────────────────────────── */
function Partners() {
  const { partners } = AR
  return (
    <section className="relative bg-[#F5F3F0] py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#001081]/40 mb-4">{partners.label}</div>
        <h2 className="text-[#001081] font-black leading-tight mb-12"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.02em' }}>
          {partners.headline}
        </h2>
        <div className="flex flex-wrap items-center gap-8 lg:gap-12 opacity-40">
          {partners.names.map((p) => (
            <div key={p} className="text-sm font-bold text-[#001081]/60 uppercase tracking-widest">{p}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────────────── */
function Contact() {
  const { contact } = AR
  const [sent, setSent] = useState(false)
  return (
    <section id="contact" className="relative bg-[#000820] overflow-hidden py-24 lg:py-32">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/neon-lines.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.06 }} onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
      <GridPattern />
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel light>{contact.label}</SectionLabel>
            <h2 className="text-white font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', letterSpacing: '-0.025em' }}>
              {contact.headline}
            </h2>
            <div className="space-y-4 mt-10">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/25 w-20">العنوان</span>
                <span className="text-white/60 text-sm">{contact.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/25 w-20">البريد</span>
                <span className="text-white/60 text-sm">{contact.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-widest text-white/25 w-20">الهاتف</span>
                <span className="text-white/60 text-sm dir-ltr">{contact.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 lg:p-10">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-sky-400/10 border border-sky-400/20 flex items-center justify-center mb-4 text-sky-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{contact.success.title}</h3>
                <p className="text-white/40 text-sm">{contact.success.body}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
                <input type="text" placeholder={contact.fields.name} required
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/25" />
                <input type="email" placeholder={contact.fields.email} required
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/25 dir-ltr text-right" />
                <input type="text" placeholder={contact.fields.company}
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/25" />
                <textarea placeholder={contact.fields.message} rows={4}
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors resize-none placeholder:text-white/25" />
                <button type="submit"
                  className="w-full py-3.5 bg-sky-400 text-[#000850] font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors">
                  {contact.fields.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  const { footer } = AR
  return (
    <footer className="bg-[#001081] border-t border-white/10 py-12">
      <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/ejada-white-logo.png" alt="إجادة" className="h-8 w-auto" onError={(e) => { const t = e.target as HTMLImageElement; t.style.display = 'none' }} />
        <div className="flex items-center gap-6">
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest">{footer.switchLang}</a>
          <div className="text-sm text-white/25">{footer.copy}</div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */
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
