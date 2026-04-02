'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─── Arabic Content ─────────────────────────────────────────────────
   Translated from lib/content.ts — mirrors every English section.
   Typography rules enforced throughout:
     • No letter-spacing (tracking) on Arabic text — Arabic is a
       connected script and spacing breaks glyph joins.
     • No uppercase transform on Arabic — Arabic has no case system.
     • phone / email fields get dir="ltr" HTML attribute to keep
       Latin characters reading left-to-right inside the RTL page.
────────────────────────────────────────────────────────────────────── */
const AR = {
  nav: {
    links: [
      { label: 'من نحن',       href: '#about' },
      { label: 'قدراتنا',      href: '#capabilities' },
      { label: 'القطاعات',     href: '#sectors' },
      { label: 'تواصل معنا',   href: '#contact' },
    ],
    cta: 'تواصل معنا',
  },

  hero: {
    eyebrow: 'الملف المؤسسي — ٢٠٢٦',
    headline: 'مُنسِّقو\nالتماسك.',
    tagline: 'حُماة الثقة.',
    location: 'الرياض · المملكة العربية السعودية',
    cta1: 'استكشف قدراتنا',
    cta2: 'ابدأ مشروعك',
    stats: [
      { value: '٢٠+',   label: 'عاماً' },
      { value: '٥٠٠+',  label: 'مشروع' },
      { value: '١٠٠٠+', label: 'متخصص' },
      { value: '٧',     label: 'دول' },
    ],
  },

  whoWeAre: {
    label: 'من نحن',
    headline: 'المُنسِّق الوطني للتحول في المملكة',
    body: 'نوجد لنُنسِّق أنظمة مؤسسية ذكية وسيادية ومرنة على نطاق واسع. على مدى قرابة عقدين، صمَّمنا الروابط الحيوية بين الاستراتيجية والمنصات والبيانات والعمليات — محوِّلين الأنظمة المتشتتة إلى ميزة تنافسية متماسكة.',
    stats: [
      { value: '٢٠+',   label: 'عاماً في المملكة' },
      { value: '١٠٠٠+', label: 'متخصص' },
      { value: '٥٠+',   label: 'عميل مؤسسي' },
      { value: '٥٠٠+',  label: 'مشروع منجز' },
      { value: '٢٥+',   label: 'شريك استراتيجي' },
      { value: '٧',     label: 'دول' },
    ],
  },

  whatWeBelieve: {
    label: 'ما نؤمن به',
    headline: 'مدفوعون بالهدف. موجَّهون بالرؤية.',
    beliefs: [
      {
        number: '٠١',
        title: 'الرؤية',
        body: 'نتطلع إلى مستقبل تُعيد فيه التقنية والخبرة والإبداع البشري تشكيل الأعمال والحكومات والمجتمع.',
      },
      {
        number: '٠٢',
        title: 'الرسالة',
        body: 'تمكين عملائنا من الازدهار في مشهد رقمي متطور — من خلال خبرة عميقة وابتكار حقيقي وجودة لا تقبل المساومة.',
      },
      {
        number: '٠٣',
        title: 'الغاية',
        body: 'تنسيق التحول والتغيير الإيجابي لبناء عالم أكثر ذكاءً وترابطاً.',
      },
    ],
    quote: '«لا نبني أنظمة فحسب — نُنسِّق التماسك المؤسسي.»',
    quoteAttrib: '— إجادة سيستمز',
  },

  orchestrator: {
    label: 'كيف نعمل',
    headline: 'نموذج المُنسِّق',
    body: 'لا نكتفي بتثبيت التقنية؛ بل نضمن اندماجها في كلٍّ استراتيجي متماسك. هذا انضباط مستمر في التصميم والحوكمة والتحسين — لا حالة ثابتة.',
    steps: [
      {
        number: '٠١',
        title: 'الاستراتيجية',
        description: 'تحديد الرؤية والأهداف التجارية التي توجِّه رحلة التحول.',
      },
      {
        number: '٠٢',
        title: 'التنسيق',
        description: 'تصميم التماسك بين المنصات والبيانات والعمليات على مستوى المنظومة.',
      },
      {
        number: '٠٣',
        title: 'التنفيذ',
        description: 'تطبيق حلول تقنية متينة وقابلة للتوسع.',
      },
      {
        number: '٠٤',
        title: 'النتائج',
        description: 'تحقيق قيمة أعمال قابلة للقياس وأثر حقيقي ومستدام.',
      },
    ],
  },

  values: {
    label: 'قيمنا',
    acrostic: 'إجادة',
    subheadline: 'قيمنا هي أساس ثقافتنا. تُوجِّه طريقة عملنا وتعاوننا وتقديمنا للقيمة لعملائنا ومجتمعنا.',
    items: [
      { letter: 'إ', title: 'إتقان',  description: 'الشفافية والأمانة والمساءلة' },
      { letter: 'ج', title: 'جدارة',  description: 'أفكار متجددة ومقاربات مبتكرة' },
      { letter: 'ا', title: 'أمانة',  description: 'فريق واحد وأهداف مشتركة' },
      { letter: 'د', title: 'دراية',  description: 'استباق الأحداث والتحرك الحاسم' },
      { letter: 'ة', title: 'تعاون',  description: 'الجودة والإتقان والنتائج' },
    ],
  },

  whatWeEnable: {
    label: 'ما نُمكِّن',
    headline: 'نتائج أعمال حقيقية — لا مجرد مشاريع تقنية.',
    outcomes: [
      {
        number: '٠١',
        title: 'النمو',
        items: ['تسريع الإيرادات', 'التوسع في الأسواق', 'نماذج أعمال جديدة'],
      },
      {
        number: '٠٢',
        title: 'الكفاءة',
        items: ['تحسين التكاليف', 'أتمتة العمليات', 'التميز التشغيلي'],
      },
      {
        number: '٠٣',
        title: 'الصمود',
        items: ['إدارة المخاطر', 'الأمن والامتثال', 'استمرارية الأعمال'],
      },
      {
        number: '٠٤',
        title: 'التجربة',
        items: ['رحلات العملاء', 'الخدمات الحكومية', 'تفاعل أصحاب المصلحة'],
      },
      {
        number: '٠٥',
        title: 'الابتكار',
        items: ['قرارات مبنية على البيانات', 'تبني التقنيات الناشئة', 'الجاهزية للمستقبل'],
      },
    ],
  },

  capabilities: {
    label: 'قدراتنا',
    headline: 'قدرات متكاملة مُنسَّقة للأثر المؤسسي.',
    body: 'نصمم الروابط الحيوية بين الاستراتيجية والمنصات والبيانات والعمليات لبناء أنظمة مؤسسية متماسكة.',
    items: [
      {
        number: '٠١',
        title: 'تطبيقات المؤسسات وتخطيط الموارد',
        short: 'تنفيذ SAP وOracle وتحسين منصات المؤسسات.',
        tags: ['SAP', 'Oracle', 'ERP', 'Microsoft'],
        long: 'تنفيذ شامل لـ SAP وOracle وخدمات مُدارة. قدَّمنا أكثر من ١٠٠ مشروع ERP في المنطقة، تشمل المالية والموارد البشرية وسلاسل الإمداد.',
      },
      {
        number: '٠٢',
        title: 'البيانات والذكاء الاصطناعي والتحليلات',
        short: 'منصات البيانات وحلول الذكاء الاصطناعي وذكاء القرار.',
        tags: ['AI/ML', 'منصات البيانات', 'BI', 'تحليلات'],
        long: 'من هندسة البيانات إلى أنظمة الذكاء الاصطناعي الإنتاجية. نبني الأسس التحليلية التي تحوِّل بيانات المؤسسة إلى ذكاء استباقي ورؤى قابلة للتنفيذ.',
      },
      {
        number: '٠٣',
        title: 'الحوسبة السحابية والبنية التحتية',
        short: 'الترحيل السحابي والبنية الهجينة والسحابة السيادية.',
        tags: ['AWS', 'Azure', 'هجين', 'سحابة سيادية'],
        long: 'بنية تحتية سيادية ومرنة وقابلة للتوسع للمملكة. استراتيجيات الترحيل السحابي وتصميم البنية الهجينة وعمليات البنية التحتية المُدارة.',
      },
      {
        number: '٠٤',
        title: 'الأمن السيبراني والصمود',
        short: 'عمليات الأمن وحوكمة المخاطر وإدارة الهوية.',
        tags: ['SOC', 'GRC', 'ثقة صفرية', 'استخبارات التهديدات'],
        long: 'حماية أكثر الأصول الرقمية حساسية في المملكة. خدمات أمن سيبراني شاملة تشمل عمليات SOC والحوكمة والامتثال وإدارة الهوية.',
      },
      {
        number: '٠٥',
        title: 'الخدمات المُدارة',
        short: 'إدارة عمليات تقنية المعلومات من البداية للنهاية.',
        tags: ['ITO', 'ServiceNow', 'عمليات', 'تحسين'],
        long: 'إدارة كاملة لعمليات تقنية المعلومات — من البنية التحتية إلى التطبيقات. نعمل كامتداد سلس لفريق تقنية المعلومات لديكم.',
      },
      {
        number: '٠٦',
        title: 'تقنية المصرفية الإسلامية',
        short: 'خبرة عميقة حيث يلتقي الامتثال الشرعي بتقنية المؤسسات.',
        tags: ['امتثال شرعي', 'تمويل إسلامي', 'تقنية مصرفية'],
        long: 'حلول تقنية متخصصة للمؤسسات المالية الإسلامية. خبرة عميقة في المصرفية الأساسية المتوافقة مع الشريعة والإبلاغ التنظيمي.',
      },
    ],
  },

  sectors: {
    label: 'القطاعات',
    headline: 'ثمانية قطاعات. نهج تنسيق واحد.',
    items: [
      {
        id: 'financial',
        label: 'الخدمات المالية',
        headline: 'تحويل المؤسسات المالية إلى مؤسسات مرنة وذكية جاهزة للنمو.',
        body: 'نتشارك مع البنوك الرائدة وشركات التأمين وشركات التقنية المالية لتحديث الأنظمة الأساسية وفتح قيمة البيانات وتقديم تجارب رقمية استثنائية.',
        metrics: [{ label: 'عميل مالي', value: '٢٠+' }, { label: 'سرعة المعالجة', value: '٤٠٪' }],
      },
      {
        id: 'government',
        label: 'الحكومة',
        headline: 'تنسيق التحول الرقمي للخدمات الوطنية.',
        body: 'من البوابات الإلكترونية للمواطنين إلى الأنظمة الحكومية الخلفية، نبني المنصات التي تجعل رؤية المملكة ٢٠٣٠ حقيقة معاشة لملايين المواطنين.',
        metrics: [{ label: 'مشروع حكومي', value: '٥٠+' }, { label: 'مواطن يخدمهم', value: '١٠م+' }],
      },
      {
        id: 'healthcare',
        label: 'الرعاية الصحية',
        headline: 'بناء الأنظمة الصحية الذكية لمستقبل أفضل.',
        body: 'نربط الأنظمة السريرية والتشغيلية والمالية لإنشاء أنظمة رعاية صحية موحدة تُحسِّن نتائج المرضى وكفاءة العمليات.',
        metrics: [{ label: 'سرير مُدار', value: '١٠ آلاف+' }, { label: 'كفاءة أعلى', value: '٣٥٪' }],
      },
      {
        id: 'transport',
        label: 'النقل',
        headline: 'بناء البنية التحتية والذكاء خلف التنقل الحديث.',
        body: 'من المطارات إلى النقل العام إلى شبكات اللوجستيات، نُنسِّق التقنية التي تُحرِّك الأمم إلى الأمام.',
        metrics: [{ label: 'راكب مُدار', value: '١٠٠م+' }, { label: 'وقت تشغيل الشبكة', value: '٩٩.٩٥٪' }],
      },
      {
        id: 'retail',
        label: 'التجزئة',
        headline: 'تمكين تجار التجزئة من تقديم تجارب سلسة.',
        body: 'نساعد تجار التجزئة على توحيد قنوات التجارة وتحسين سلاسل الإمداد وتقديم تجارب مخصصة على نطاق واسع.',
        metrics: [{ label: 'وحدة SKU مُدارة', value: '١م+' }, { label: 'أسواق متعددة القنوات', value: '٥' }],
      },
      {
        id: 'real-estate',
        label: 'العقارات',
        headline: 'تمكين قادة العقار من بناء أنظمة عقارية ذكية.',
        body: 'من التطوير والإنشاء إلى إدارة العقارات وتجربة المستأجرين، نُرقمِّن كل طبقة من سلسلة القيمة العقارية.',
        metrics: [{ label: 'عقار مُدار', value: '١٠٠+' }, { label: 'قدم مربع', value: '٥٠م+' }],
      },
      {
        id: 'stec',
        label: 'الرياضة والسياحة والثقافة',
        headline: 'إطلاق تجارب استثنائية تُلهم الجماهير العالمية.',
        body: 'نوفِّر التقنية خلف أكثر وجهات الترفيه والرياضة والثقافة طموحاً في المملكة — من عمليات الأماكن إلى منصات تفاعل المشجعين.',
        metrics: [{ label: 'موقع مُرقمَّن', value: '٢٠+' }, { label: 'زائر سنوي', value: '٣٠م+' }],
      },
      {
        id: 'mega',
        label: 'المشاريع الكبرى',
        headline: 'تشغيل العمود الفقري الرقمي لرؤية ٢٠٣٠.',
        body: 'إجادة شريك في التحول الرقمي لأكثر المشاريع العملاقة طموحاً في المملكة — المبادرات التي تُعيد تعريف المملكة العربية السعودية على الساحة العالمية.',
        metrics: [{ label: 'مشروع عملاق', value: '٥+' }, { label: 'نطاق التنفيذ', value: 'وطني' }],
      },
    ],
  },

  proofPoints: {
    label: 'بالأرقام',
    headline: 'أرقام تُعرِّف سجلنا الحافل.',
    subheadline: 'عبر ٧ قطاعات رئيسية في المنطقة.',
    stats: [
      { value: '٢٠+',   label: 'عاماً في المملكة' },
      { value: '٥٠٠+',  label: 'مشروع منجز' },
      { value: '٧',     label: 'دول' },
      { value: '٥٠+',   label: 'عميل مؤسسي' },
    ],
  },

  partners: {
    label: 'شركاؤنا',
    headline: 'تحالفات تقنية عالمية.',
    body: 'نتعاون مع كبار شركاء التقنية العالميين لتقديم أفضل الحلول لعملائنا.',
    list: ['SAP', 'Oracle', 'Microsoft', 'AWS', 'Google Cloud', 'Salesforce', 'ServiceNow', 'IBM', 'Cisco', 'Fortinet'],
  },

  contact: {
    label: 'تواصل معنا',
    headline: 'لنُنسِّق تحوّلكم معاً.',
    body: 'تشاركوا مع إجادة لاكتشاف الفرص ودفع الابتكار وتأمين مستقبلكم الرقمي.',
    address: 'الرياض، المملكة العربية السعودية',
    email: 'info@ejada.com',
    phone: '+966 11 000 0000',
    fields: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      company: 'المؤسسة / الشركة',
      message: 'كيف يمكننا المساعدة؟',
      submit: 'إرسال',
    },
    success: {
      title: 'تم الإرسال بنجاح',
      body: 'شكراً لتواصلكم. سيتواصل معكم فريقنا خلال يوم عمل واحد.',
    },
  },

  footer: {
    tagline: 'المُنسِّق الوطني للتحول في المملكة.',
    copyright: `© ٢٠٢٦ إجادة سيستمز. جميع الحقوق محفوظة.`,
    switchLang: 'English',
  },
}

/* ─── Shared primitives ──────────────────────────────────────────── */

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

/** Eyebrow label with animated accent line — RTL aware (x animation flipped) */
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const color = light ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'
  const accent = light ? 'var(--color-accent-light)' : 'var(--color-accent)'
  return (
    <div ref={ref} className="flex items-center gap-3 mb-6">
      <motion.div
        className="h-px"
        style={{ backgroundColor: accent }}
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      {/* x: 8 (enter from right) for RTL reading direction */}
      <motion.span
        className="text-[10px] font-bold"
        style={{ color, letterSpacing: 0 }}
        initial={{ opacity: 0, x: 8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        {children}
      </motion.span>
    </div>
  )
}

function Counter({ value }: { value: string }) {
  // Numeric portion of values like '٢٠+' or '١٠٠٠+'
  return <span>{value}</span>
}

/* ─── Navigation ─────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[#000850]/95 backdrop-blur-sm border-b border-white/8' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          {/* Logo — flex order handles RTL automatically */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/ejada-white-logo.png"
            alt="إجادة"
            className="h-7 w-auto"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />

          <nav className="hidden lg:flex items-center gap-6">
            {AR.nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/55 hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="/" className="text-xs font-medium text-white/40 hover:text-white/70 transition-colors" dir="ltr">
              EN
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 bg-sky-400 text-[#000850] text-xs font-bold hover:bg-white transition-colors"
            >
              {AR.nav.cta}
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-white" aria-label="القائمة">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-[#000850] flex flex-col justify-center px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="text-sm text-white/30 mb-8 hover:text-white/60 transition-colors" dir="ltr">
              English
            </a>
            {AR.nav.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-3xl font-black text-white py-3 border-b border-white/10 hover:text-sky-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex items-center justify-center py-3.5 bg-sky-400 text-[#000850] font-bold text-sm hover:bg-white transition-colors"
            >
              {AR.nav.cta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────── */
function Hero() {
  const { hero } = AR
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', backgroundColor: 'var(--color-bg)' }}
    >
      {/* Image panel — flipped to left side for RTL */}
      <div className="absolute inset-y-0 left-0 w-full lg:w-[58%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-[115%] object-cover"
          style={{ objectPosition: 'center 30%' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to left, var(--color-bg) 0%, var(--color-bg) 5%, transparent 40%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%)' }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-text-primary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content panel — right side in RTL */}
      <div
        className="relative z-10 flex flex-col justify-between w-full lg:max-w-[52%] ms-auto px-6 lg:px-20 pt-28 pb-10 lg:py-32"
        style={{ minHeight: '100svh' }}
      >
        <FadeUp delay={0.3}>
          <div className="flex items-center gap-3">
            <div className="h-px w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span className="text-[10px] font-bold" style={{ color: 'var(--color-accent)' }}>
              {hero.eyebrow}
            </span>
          </div>
        </FadeUp>

        <div>
          <FadeUp delay={0.5}>
            <h1
              className="font-black leading-none mb-8 whitespace-pre-line"
              style={{
                fontSize: 'clamp(52px, 8vw, 108px)',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
              }}
            >
              {hero.headline}
            </h1>
          </FadeUp>

          <FadeUp delay={0.8}>
            <div className="flex items-start gap-5 mb-10">
              <div
                className="w-0.5 self-stretch flex-shrink-0 mt-1"
                style={{ backgroundColor: 'var(--color-accent)', minHeight: 48 }}
              />
              <div>
                <p className="text-lg font-light leading-relaxed mb-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {hero.tagline}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {hero.location}
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={1.0}>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-sm hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
              >
                {hero.cta1}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-semibold border hover:opacity-80 transition-all duration-200"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
              >
                {hero.cta2}
              </a>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={1.3}>
          <div className="flex flex-wrap gap-8 pt-8" style={{ borderTop: '1px solid var(--color-border)' }}>
            {hero.stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                  <Counter value={s.value} />
                </div>
                <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Who We Are ─────────────────────────────────────────────────── */
function WhoWeAre() {
  const { whoWeAre } = AR
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-6 lg:px-20">
        <SectionLabel>{whoWeAre.label}</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2
              className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--color-text-primary)' }}
            >
              {whoWeAre.headline}
            </h2>
            <p className="text-base leading-[1.9] mb-10" style={{ color: 'var(--color-text-secondary)' }}>
              {whoWeAre.body}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {whoWeAre.stats.map(({ value, label }) => (
                <div key={label} className="border-s-2 ps-4" style={{ borderColor: 'var(--color-accent)' }}>
                  <div className="text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>
                    <Counter value={value} />
                  </div>
                  <div className="text-xs font-medium mt-1" style={{ color: 'var(--color-text-muted)' }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="relative h-[420px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-img.jpg"
                alt="إجادة سيستمز"
                className="w-full h-full object-cover"
                style={{ opacity: 0.85 }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

/* ─── What We Believe ────────────────────────────────────────────── */
function WhatWeBelieve() {
  const { whatWeBelieve } = AR
  return (
    <section id="story" className="relative overflow-hidden py-24 lg:py-32 bg-[#001081]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/curved-lines.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <SectionLabel light>{whatWeBelieve.label}</SectionLabel>
        <h2
          className="font-black leading-tight text-white mb-16 max-w-xl"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          {whatWeBelieve.headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 mb-16">
          {whatWeBelieve.beliefs.map((b) => (
            <FadeUp key={b.number}>
              <div className="bg-[#001081] p-8 lg:p-10 h-full">
                <div className="text-xs font-mono text-sky-400 mb-6">{b.number}</div>
                <h3 className="text-xl font-black text-white mb-4 leading-tight">{b.title}</h3>
                <p className="text-sm text-white/50 leading-[1.9]">{b.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(20px, 3vw, 36px)' }}
            >
              {whatWeBelieve.quote}
            </p>
            <p className="text-sm text-white/30">{whatWeBelieve.quoteAttrib}</p>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Orchestrator Model ─────────────────────────────────────────── */
function OrchestratorModel() {
  const { orchestrator } = AR
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#000820]">
      <div className="container mx-auto px-6 lg:px-20">
        <SectionLabel light>{orchestrator.label}</SectionLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <FadeUp>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
            >
              {orchestrator.headline}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/50 text-sm leading-[1.85] lg:pt-3">{orchestrator.body}</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {orchestrator.steps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.08}>
              <div className="group">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-mono text-sky-400/50">{step.number}</span>
                  <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-white/40 group-hover:border-sky-400/40 group-hover:text-sky-400 transition-all duration-300">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{step.title}</h3>
                <p className="text-sm text-white/45 leading-[1.85]">{step.description}</p>
              </div>
            </FadeUp>
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
    <section id="values" className="relative overflow-hidden py-24 lg:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-6 lg:px-20">
        <SectionLabel>{values.label}</SectionLabel>
        <h2
          className="font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(40px, 6vw, 80px)', color: 'var(--color-text-primary)' }}
        >
          {values.acrostic}
        </h2>
        <p className="text-sm mb-16 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
          {values.subheadline}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-12 gap-x-6">
          {values.items.map((v, i) => (
            <FadeUp key={v.letter} delay={i * 0.06}>
              <div className="text-center group">
                <div
                  className="text-5xl lg:text-6xl font-black mb-3 leading-none group-hover:opacity-30 transition-colors"
                  style={{ color: 'var(--color-accent)', opacity: 0.1 }}
                >
                  {v.letter}
                </div>
                <div className="text-sm font-bold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                  {v.title}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {v.description}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── What We Enable ─────────────────────────────────────────────── */
function WhatWeEnable() {
  const { whatWeEnable } = AR
  return (
    <section id="services" className="relative overflow-hidden py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-20">
        <SectionLabel>{whatWeEnable.label}</SectionLabel>
        <h2
          className="font-black leading-tight mb-12"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--color-text-primary)' }}
        >
          {whatWeEnable.headline}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {whatWeEnable.outcomes.map((item, i) => (
            <FadeUp key={item.number} delay={i * 0.07}>
              <div
                className="border p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group h-full"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div
                  className="text-xs font-mono mb-4"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {item.number}
                </div>
                <h3 className="text-base font-bold mb-4 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                  {item.title}
                </h3>
                <ul className="space-y-1.5">
                  {item.items.map((it) => (
                    <li key={it} className="text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
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
    <section id="capabilities" className="relative overflow-hidden py-24 lg:py-32 bg-[#001081]">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionLabel light>{capabilities.label}</SectionLabel>
            <h2
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              {capabilities.headline}
            </h2>
            <p className="text-white/50 text-sm leading-[1.85]">{capabilities.body}</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.items.map((cap, i) => (
              <FadeUp key={cap.number} delay={i * 0.06}>
                <div className="bg-[#000820]/60 border border-white/10 p-8 group hover:border-sky-400/30 transition-all duration-300 h-full">
                  <div className="text-xs font-mono text-sky-400/40 mb-4">{cap.number}</div>
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight">{cap.title}</h3>
                  <p className="text-sm text-white/45 mb-5 leading-[1.75]">{cap.short}</p>
                  <div className="flex flex-wrap gap-2">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-1 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
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
  const current = sectors.items[active]

  return (
    <section id="sectors" className="relative overflow-hidden py-24 lg:py-32 bg-[#000820]">
      <div className="container mx-auto px-6 lg:px-20">
        <SectionLabel light>{sectors.label}</SectionLabel>
        <h2
          className="font-black text-white leading-tight mb-12"
          style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
        >
          {sectors.headline}
        </h2>

        {/* Tab nav */}
        <div className="flex flex-wrap gap-2 mb-12">
          {sectors.items.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-xs font-medium border transition-all duration-200 ${
                active === i
                  ? 'bg-sky-400 border-sky-400 text-[#000850]'
                  : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl"
          >
            <div className="text-xs font-bold text-sky-400 mb-3">{current.label}</div>
            <h3 className="text-2xl font-black text-white mb-4 leading-tight">{current.headline}</h3>
            <p className="text-white/50 text-sm leading-[1.85] mb-6">{current.body}</p>
            <div className="flex flex-wrap gap-6">
              {current.metrics.map((m) => (
                <div key={m.label} className="border-s-2 border-sky-400 ps-4">
                  <div className="text-2xl font-black text-white">{m.value}</div>
                  <div className="text-xs text-white/40 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

/* ─── Proof Points ───────────────────────────────────────────────── */
function ProofPoints() {
  const { proofPoints } = AR
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-[#000850]">
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <SectionLabel light>{proofPoints.label}</SectionLabel>
        <h2
          className="font-black text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          {proofPoints.headline}
        </h2>
        <p className="text-white/30 text-sm mb-16">{proofPoints.subheadline}</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {proofPoints.stats.map((s, i) => (
            <FadeUp key={s.label} delay={i * 0.08}>
              <div className="border-s-2 border-sky-400/40 ps-6">
                <div className="text-4xl lg:text-5xl font-black text-white mb-2">
                  <Counter value={s.value} />
                </div>
                <div className="text-xs font-medium text-white/35">{s.label}</div>
              </div>
            </FadeUp>
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
    <section className="relative py-24 lg:py-32 overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="container mx-auto px-6 lg:px-20">
        <SectionLabel>{partners.label}</SectionLabel>
        <h2
          className="font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--color-text-primary)' }}
        >
          {partners.headline}
        </h2>
        <p className="text-sm mb-12" style={{ color: 'var(--color-text-muted)' }}>
          {partners.body}
        </p>
        <div className="flex flex-wrap items-center gap-8 lg:gap-12" style={{ opacity: 0.4 }}>
          {partners.list.map((p) => (
            <div
              key={p}
              className="text-sm font-bold"
              style={{ color: 'var(--color-text-primary)' }}
              dir="ltr"
            >
              {p}
            </div>
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
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32 bg-[#000820]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/neon-lines.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.06 }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel light>{contact.label}</SectionLabel>
            <h2
              className="font-black text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(32px, 4.5vw, 56px)' }}
            >
              {contact.headline}
            </h2>
            <p className="text-white/50 text-sm leading-[1.85] mb-10">{contact.body}</p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white/25 w-20">العنوان</span>
                <span className="text-white/60 text-sm">{contact.address}</span>
              </div>
              {/* Email — display LTR so the address reads correctly */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white/25 w-20">البريد</span>
                <span className="text-white/60 text-sm" dir="ltr">{contact.email}</span>
              </div>
              {/* Phone — always LTR */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white/25 w-20">الهاتف</span>
                <span className="text-white/60 text-sm" dir="ltr">{contact.phone}</span>
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
                <input
                  type="text"
                  placeholder={contact.fields.name}
                  required
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/25"
                />
                {/* Email input — dir="ltr" so typed address reads left-to-right */}
                <input
                  type="email"
                  placeholder={contact.fields.email}
                  required
                  dir="ltr"
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/25 text-start"
                />
                <input
                  type="text"
                  placeholder={contact.fields.company}
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors placeholder:text-white/25"
                />
                <textarea
                  placeholder={contact.fields.message}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 text-white/70 text-sm py-2.5 focus:outline-none focus:border-sky-400 transition-colors resize-none placeholder:text-white/25"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 bg-sky-400 text-[#000850] font-bold text-sm hover:bg-white transition-colors"
                >
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
        <img
          src="/brand/ejada-white-logo.png"
          alt="إجادة"
          className="h-8 w-auto"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div className="flex items-center gap-6">
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors" dir="ltr">
            {footer.switchLang}
          </a>
          <div className="text-sm text-white/25">{footer.copyright}</div>
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
  )
}
