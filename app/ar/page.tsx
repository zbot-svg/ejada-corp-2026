'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { CapabilityGrid } from '@/components/ui/capability-tile'
import { SectorTabs } from '@/components/ui/sector-tabs'
import { CaseStudyCard } from '@/components/ui/case-study-card'
import { Marquee, MarqueeText } from '@/components/primitives/marquee'
import { MagneticButton } from '@/components/ui/magnetic-button'
import { Parallax } from '@/components/primitives/parallax'

/* ─── Arabic Content ─────────────────────────────────────────────────
   Translated from lib/content.ts — mirrors every section exactly.
   Typography rules enforced throughout:
     • No letter-spacing (tracking) on Arabic text — Arabic is a
       connected script and spacing breaks glyph joins.
     • No uppercase transform on Arabic — Arabic has no case system.
     • phone / email fields get dir="ltr" HTML attribute.
────────────────────────────────────────────────────────────────────── */
const AR = {
  nav: {
    links: [
      { label: 'من نحن',     href: '#about' },
      { label: 'قدراتنا',    href: '#capabilities' },
      { label: 'القطاعات',   href: '#sectors' },
      { label: 'تواصل معنا', href: '#contact' },
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
      { number: '٠١', title: 'الاستراتيجية', description: 'تحديد الرؤية والأهداف التجارية التي توجِّه رحلة التحول.' },
      { number: '٠٢', title: 'التنسيق',      description: 'تصميم التماسك بين المنصات والبيانات والعمليات على مستوى المنظومة.' },
      { number: '٠٣', title: 'التنفيذ',      description: 'تطبيق حلول تقنية متينة وقابلة للتوسع.' },
      { number: '٠٤', title: 'النتائج',      description: 'تحقيق قيمة أعمال قابلة للقياس وأثر حقيقي ومستدام.' },
    ],
  },

  values: {
    label: 'قيمنا',
    acrostic: 'إجادة',
    subheadline: 'قيمنا هي أساس ثقافتنا. تُوجِّه طريقة عملنا وتعاوننا وتقديمنا للقيمة لعملائنا ومجتمعنا.',
    items: [
      { letter: 'إ', title: 'إتقان', description: 'الشفافية والأمانة والمساءلة' },
      { letter: 'ج', title: 'جدارة', description: 'أفكار متجددة ومقاربات مبتكرة' },
      { letter: 'ا', title: 'أمانة', description: 'فريق واحد وأهداف مشتركة' },
      { letter: 'د', title: 'دراية', description: 'استباق الأحداث والتحرك الحاسم' },
      { letter: 'ة', title: 'تعاون', description: 'الجودة والإتقان والنتائج' },
    ],
  },

  whatWeEnable: {
    label: 'ما نُمكِّن',
    headline: 'نتائج أعمال حقيقية — لا مجرد مشاريع تقنية.',
    outcomes: [
      { number: '٠١', title: 'النمو',     items: ['تسريع الإيرادات', 'التوسع في الأسواق', 'نماذج أعمال جديدة'] },
      { number: '٠٢', title: 'الكفاءة',   items: ['تحسين التكاليف', 'أتمتة العمليات', 'التميز التشغيلي'] },
      { number: '٠٣', title: 'الصمود',    items: ['إدارة المخاطر', 'الأمن والامتثال', 'استمرارية الأعمال'] },
      { number: '٠٤', title: 'التجربة',   items: ['رحلات العملاء', 'الخدمات الحكومية', 'تفاعل أصحاب المصلحة'] },
      { number: '٠٥', title: 'الابتكار',  items: ['قرارات مبنية على البيانات', 'تبني التقنيات الناشئة', 'الجاهزية للمستقبل'] },
    ],
  },

  capabilities: {
    label: 'قدراتنا',
    headline: 'قدرات متكاملة مُنسَّقة للأثر المؤسسي.',
    body: 'نصمم الروابط الحيوية بين الاستراتيجية والمنصات والبيانات والعمليات لبناء أنظمة مؤسسية متماسكة.',
    items: [
      {
        id: 'erp',
        number: '٠١',
        title: 'تطبيقات المؤسسات وتخطيط الموارد',
        shortDesc: 'تنفيذ SAP وOracle وتحسين منصات المؤسسات.',
        tags: ['SAP', 'Oracle', 'ERP', 'Microsoft'],
        longDesc: 'تنفيذ شامل لـ SAP وOracle وخدمات مُدارة. قدَّمنا أكثر من ١٠٠ مشروع ERP في المنطقة، تشمل المالية والموارد البشرية وسلاسل الإمداد والعمليات لعملاء من القطاعين المؤسسي والحكومي.',
      },
      {
        id: 'data-ai',
        number: '٠٢',
        title: 'البيانات والذكاء الاصطناعي والتحليلات',
        shortDesc: 'منصات البيانات وحلول الذكاء الاصطناعي وذكاء القرار.',
        tags: ['AI/ML', 'منصات البيانات', 'BI', 'تحليلات'],
        longDesc: 'من هندسة البيانات إلى أنظمة الذكاء الاصطناعي الإنتاجية. نبني الأسس التحليلية التي تحوِّل بيانات المؤسسة إلى ذكاء استباقي ورؤى قابلة للتنفيذ.',
      },
      {
        id: 'cloud',
        number: '٠٣',
        title: 'الحوسبة السحابية والبنية التحتية',
        shortDesc: 'الترحيل السحابي والبنية الهجينة والسحابة السيادية.',
        tags: ['AWS', 'Azure', 'هجين', 'سحابة سيادية'],
        longDesc: 'بنية تحتية سيادية ومرنة وقابلة للتوسع للمملكة. استراتيجيات الترحيل السحابي وتصميم البنية الهجينة وعمليات البنية التحتية المُدارة على مدار الساعة.',
      },
      {
        id: 'cyber',
        number: '٠٤',
        title: 'الأمن السيبراني والصمود',
        shortDesc: 'عمليات الأمن وحوكمة المخاطر وإدارة الهوية.',
        tags: ['SOC', 'GRC', 'ثقة صفرية', 'استخبارات التهديدات'],
        longDesc: 'حماية أكثر الأصول الرقمية حساسية في المملكة. خدمات أمن سيبراني شاملة تشمل عمليات SOC والحوكمة والامتثال وإدارة الهوية والاستجابة للحوادث.',
      },
      {
        id: 'managed',
        number: '٠٥',
        title: 'الخدمات المُدارة',
        shortDesc: 'إدارة عمليات تقنية المعلومات من البداية للنهاية.',
        tags: ['ITO', 'ServiceNow', 'عمليات', 'تحسين'],
        longDesc: 'إدارة كاملة لعمليات تقنية المعلومات — من البنية التحتية إلى التطبيقات. نعمل كامتداد سلس لفريق تقنية المعلومات لديكم، نُحسِّن الأداء باستمرار.',
      },
      {
        id: 'islamic-banking',
        number: '٠٦',
        title: 'تقنية المصرفية الإسلامية',
        shortDesc: 'خبرة عميقة حيث يلتقي الامتثال الشرعي بتقنية المؤسسات.',
        tags: ['امتثال شرعي', 'تمويل إسلامي', 'تقنية مصرفية'],
        longDesc: 'حلول تقنية متخصصة للمؤسسات المالية الإسلامية. خبرة عميقة في المصرفية الأساسية المتوافقة مع الشريعة وإدارة الثروات والإبلاغ التنظيمي.',
      },
    ],
  },

  sectors: [
    {
      id: 'financial',
      label: 'الخدمات المالية',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'تحويل المؤسسات المالية إلى مؤسسات مرنة وذكية جاهزة للنمو.',
        body: 'نتشارك مع البنوك الرائدة وشركات التأمين وشركات التقنية المالية لتحديث الأنظمة الأساسية وفتح قيمة البيانات وتقديم تجارب رقمية استثنائية.',
        metrics: [
          { label: 'عميل مالي', value: '٢٠+' },
          { label: 'سرعة المعالجة', value: '٤٠٪' },
          { label: 'كشف الاحتيال', value: '٢٤/٧' },
        ],
        outcomes: ['تحديث الأنظمة المصرفية الأساسية', 'تحول القنوات الرقمية', 'أتمتة المخاطر والامتثال', 'تقنية المصرفية الإسلامية'],
      },
      caseStudies: [
        {
          title: 'دراسة حالة — الخدمات المالية',
          client: 'مؤسسة مالية سعودية رائدة',
          status: 'مكتمل',
          challenge: 'احتاجت المؤسسة إلى تحديث منصة المصرفية الأساسية لدعم الخدمات الرقمية الفورية والامتثال التنظيمي.',
          outcomes: [
            { title: 'تحول المصرفية الأساسية', description: 'ترحيل شامل من الأنظمة القديمة إلى منصة حديثة أولى بالـ API.' },
            { title: 'تكامل القنوات الرقمية',  description: 'تجربة موحدة عبر تطبيقات الجوال والويب والفروع.' },
            { title: 'منصة البيانات والامتثال', description: 'بنية تحتية للتقارير التنظيمية الفورية وكشف الاحتيال.' },
          ],
        },
      ],
    },
    {
      id: 'government',
      label: 'الحكومة',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'تنسيق التحول الرقمي للخدمات الوطنية.',
        body: 'من البوابات الإلكترونية للمواطنين إلى الأنظمة الحكومية الخلفية، نبني المنصات التي تجعل رؤية المملكة ٢٠٣٠ حقيقة معاشة لملايين المواطنين.',
        metrics: [
          { label: 'مشروع حكومي', value: '٥٠+' },
          { label: 'مواطن يخدمهم', value: '١٠م+' },
          { label: 'وقت التشغيل',  value: '٩٩.٩٩٪' },
        ],
        outcomes: ['منصات الحكومة الرقمية', 'خدمات G2C', 'بنية المدن الذكية', 'منصات البيانات الوطنية'],
      },
      caseStudies: [
        {
          title: 'دراسة حالة — الحكومة',
          client: 'جهة حكومية وطنية',
          status: 'مكتمل',
          challenge: 'احتاجت جهة حكومية كبرى إلى توحيد أكثر من ٤٠ نظاماً قديماً في منصة رقمية موحدة تخدم الملايين.',
          outcomes: [
            { title: 'توحيد المنصات',    description: 'ترحيل ٤٠+ نظاماً إلى منصة رقمية موحدة قائمة على السحابة.' },
            { title: 'تجربة المواطن',    description: 'بوابة مواطن أولى بالجوال تقدم أكثر من ٢٠٠ خدمة رقمية.' },
            { title: 'الكفاءة التشغيلية', description: 'تقليص أوقات المعالجة بنسبة ٧٥٪ عبر الأتمتة الذكية.' },
          ],
        },
      ],
    },
    {
      id: 'healthcare',
      label: 'الرعاية الصحية',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'بناء الأنظمة الصحية الذكية لمستقبل أفضل.',
        body: 'نربط الأنظمة السريرية والتشغيلية والمالية لإنشاء أنظمة رعاية صحية موحدة تُحسِّن نتائج المرضى وكفاءة العمليات.',
        metrics: [
          { label: 'سرير مُدار',   value: '١٠ آلاف+' },
          { label: 'ملف مريض',    value: '٥م+' },
          { label: 'كفاءة أعلى',  value: '٣٥٪' },
        ],
        outcomes: ['تكامل الأنظمة السريرية', 'تنسيق رحلة المريض', 'تحليلات الرعاية الصحية', 'منصات الطب عن بُعد'],
      },
      caseStudies: [],
    },
    {
      id: 'transport',
      label: 'النقل',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'بناء البنية التحتية والذكاء خلف التنقل الحديث.',
        body: 'من المطارات إلى النقل العام إلى شبكات اللوجستيات، نُنسِّق التقنية التي تُحرِّك الأمم إلى الأمام.',
        metrics: [
          { label: 'راكب مُدار',       value: '١٠٠م+' },
          { label: 'وقت تشغيل الشبكة', value: '٩٩.٩٥٪' },
        ],
        outcomes: ['تجربة الركاب', 'ذكاء اللوجستيات', 'النقل الذكي', 'عمليات المطارات'],
      },
      caseStudies: [],
    },
    {
      id: 'retail',
      label: 'التجزئة',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'تمكين تجار التجزئة من تقديم تجارب سلسة.',
        body: 'نساعد تجار التجزئة على توحيد قنوات التجارة وتحسين سلاسل الإمداد وتقديم تجارب مخصصة على نطاق واسع.',
        metrics: [
          { label: 'وحدة SKU مُدارة',      value: '١م+' },
          { label: 'أسواق متعددة القنوات', value: '٥' },
        ],
        outcomes: ['التجارة متعددة القنوات', 'ذكاء سلسلة الإمداد', 'تحليلات العملاء', 'نقاط بيع موحدة'],
      },
      caseStudies: [],
    },
    {
      id: 'real-estate',
      label: 'العقارات',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'تمكين قادة العقار من بناء أنظمة عقارية ذكية.',
        body: 'من التطوير والإنشاء إلى إدارة العقارات وتجربة المستأجرين، نُرقمِّن كل طبقة من سلسلة القيمة العقارية.',
        metrics: [
          { label: 'عقار مُدار', value: '١٠٠+' },
          { label: 'قدم مربع',   value: '٥٠م+' },
        ],
        outcomes: ['منصات المباني الذكية', 'تطبيقات تجربة المستأجر', 'أنظمة إدارة الممتلكات', 'ERP للتطوير'],
      },
      caseStudies: [],
    },
    {
      id: 'stec',
      label: 'الرياضة والسياحة والثقافة',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'إطلاق تجارب استثنائية تُلهم الجماهير العالمية.',
        body: 'نوفِّر التقنية خلف أكثر وجهات الترفيه والرياضة والثقافة طموحاً في المملكة — من عمليات الأماكن إلى منصات تفاعل المشجعين.',
        metrics: [
          { label: 'موقع مُرقمَّن', value: '٢٠+' },
          { label: 'زائر سنوي',    value: '٣٠م+' },
        ],
        outcomes: ['عمليات الأماكن', 'تفاعل الجماهير', 'تقنية الفعاليات', 'المنصات الثقافية'],
      },
      caseStudies: [],
    },
    {
      id: 'mega',
      label: 'المشاريع الكبرى',
      highlight: {
        tagline: 'إضاءة على القطاع',
        headline: 'تشغيل العمود الفقري الرقمي لرؤية ٢٠٣٠.',
        body: 'إجادة شريك في التحول الرقمي لأكثر المشاريع العملاقة طموحاً في المملكة — المبادرات التي تُعيد تعريف المملكة العربية السعودية على الساحة العالمية.',
        metrics: [
          { label: 'مشروع عملاق', value: '٥+' },
          { label: 'نطاق التنفيذ', value: 'وطني' },
        ],
        outcomes: ['الاستراتيجية الرقمية للمشاريع العملاقة', 'منصات المدن الذكية', 'بنية تحتية للسياحة', 'تقنية الفعاليات الوطنية'],
      },
      caseStudies: [
        {
          title: 'دراسة حالة — المشاريع الكبرى',
          client: 'مشروع عملاق سعودي كبرى',
          status: 'جارٍ',
          challenge: 'تطلّب مشروع عملاق استراتيجية رقمية شاملة وبنية تقنية لإدارة عمليات متعددة الأطراف على نطاق غير مسبوق.',
          outcomes: [
            { title: 'الاستراتيجية الرقمية', description: 'خارطة طريق شاملة للتحول الرقمي متوافقة مع رؤية ٢٠٣٠.' },
            { title: 'منصة المدينة الذكية',  description: 'منصة IoT وتحليلات موحدة لإدارة العمليات على مستوى المدينة.' },
            { title: 'منظومة أصحاب المصلحة', description: 'منصة تعاون متكاملة تربط أكثر من ٥٠ طرفاً في المشروع.' },
          ],
        },
      ],
    },
  ],

  proofPoints: {
    label: 'بالأرقام',
    headline: 'أرقام تُعرِّف سجلنا الحافل.',
    subheadline: 'عبر ٧ قطاعات رئيسية في المنطقة.',
    marqueeItems: ['٢٠ عاماً', '·', '٥٠٠+ مشروع', '·', '٧ دول', '·', '٥٠+ عميل', '·'],
    stats: [
      { value: '٢٠+',  label: 'عاماً في المملكة' },
      { value: '٥٠٠+', label: 'مشروع منجز' },
      { value: '٧',    label: 'دول' },
      { value: '٥٠+',  label: 'عميل مؤسسي' },
    ],
  },

  partners: {
    label: 'شركاؤنا',
    headline: 'تحالفات تقنية عالمية.',
    body: 'نتعاون مع كبار شركاء التقنية العالميين لتقديم أفضل الحلول لعملائنا.',
    list: [
      'SAP', 'Oracle', 'Microsoft', 'AWS', 'Google Cloud',
      'Salesforce', 'ServiceNow', 'IBM', 'Adobe', 'VMware',
      'Red Hat', 'Cisco', 'Fortinet', 'CrowdStrike', 'Palo Alto Networks',
    ],
  },

  contact: {
    label: 'تواصل معنا',
    headline: 'لنُنسِّق تحوّلكم معاً.',
    body: 'تشاركوا مع إجادة لاكتشاف الفرص ودفع الابتكار وتأمين مستقبلكم الرقمي.',
    marqueeItems: ['لنبني معاً', '·', 'تواصل معنا', '·', 'ابدأ مشروعك', '·'],
    address: 'الرياض، المملكة العربية السعودية',
    email: 'info@ejada.com',
    phone: '+966 11 000 0000',
    sectors: [
      'الخدمات المالية', 'الحكومة والقطاع العام', 'الرعاية الصحية',
      'النقل', 'التجزئة', 'العقارات', 'الرياضة والسياحة والثقافة', 'المشاريع الكبرى',
    ],
    fields: {
      name:    'الاسم الكامل',
      company: 'المؤسسة / الشركة',
      email:   'البريد الإلكتروني',
      phone:   'الهاتف (اختياري)',
      sector:  'اختر القطاع',
      message: 'أخبرونا عن مشروعكم...',
      submit:  'إرسال الرسالة',
    },
    success: {
      title: 'تم الإرسال بنجاح',
      body: 'شكراً لتواصلكم. سيتواصل معكم فريقنا خلال يوم عمل واحد.',
    },
  },

  footer: {
    tagline: 'المُنسِّق الوطني للتحول في المملكة.',
    links: [
      { heading: 'الشركة',    items: ['من نحن', 'قدراتنا', 'القطاعات', 'الوظائف'] },
      { heading: 'الخدمات',  items: ['السحابة والذكاء الاصطناعي', 'تطبيقات المؤسسات', 'الأمن السيبراني', 'الخدمات المُدارة'] },
      { heading: 'المعرفة',  items: ['الأخبار', 'الفعاليات', 'الأوراق البيضاء', 'دراسات الحالة'] },
      { heading: 'التواصل',  items: ['اتصل بنا', 'الشركاء', 'القانونية', 'الخصوصية'] },
    ],
    copyright: '© ٢٠٢٦ إجادة سيستمز. جميع الحقوق محفوظة.',
    switchLang: 'English',
  },
}

/* ─── RTL-safe primitives ─────────────────────────────────────────── */

/** FadeUp — identical to the shared primitive; kept inline for clarity */
function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 70, damping: 20, delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * SectionLabel — RTL-aware version.
 * • No letter-spacing (breaks Arabic glyph joins).
 * • x: 8 entrance animation (enter from right = RTL reading start).
 */
function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const textColor = light ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'
  const accentColor = light ? 'var(--color-accent-light)' : 'var(--color-accent)'
  return (
    <div ref={ref} className="flex items-center gap-3 mb-6">
      <motion.div
        className="h-px"
        style={{ backgroundColor: accentColor }}
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      />
      <motion.span
        className="text-[10px] font-bold"
        style={{ color: textColor, letterSpacing: 0 }}
        initial={{ opacity: 0, x: 8 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      >
        {children}
      </motion.span>
    </div>
  )
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
      {/* Image panel — left side for RTL */}
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
                <div className="text-2xl font-black" style={{ color: 'var(--color-text-primary)' }}>{s.value}</div>
                <div className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

/* ─── Who We Are ──────────────────────────────────────────────────── */
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
                  <div className="text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>{value}</div>
                  <div className="text-xs font-medium mt-1" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
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
            <p className="font-black text-white leading-tight mb-6" style={{ fontSize: 'clamp(20px, 3vw, 36px)' }}>
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
            <h2 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
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
                  className="text-5xl lg:text-6xl font-black mb-3 leading-none transition-opacity"
                  style={{ color: 'var(--color-accent)', opacity: 0.1 }}
                >
                  {v.letter}
                </div>
                <div className="text-sm font-bold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>{v.title}</div>
                <div className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{v.description}</div>
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
                className="border p-8 hover:shadow-lg transition-all duration-300 h-full"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="text-xs font-mono mb-4" style={{ color: 'var(--color-accent)' }}>{item.number}</div>
                <h3 className="text-base font-bold mb-4 leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                  {item.title}
                </h3>
                <ul className="space-y-1.5">
                  {item.items.map((it) => (
                    <li key={it} className="text-xs leading-snug" style={{ color: 'var(--color-text-muted)' }}>{it}</li>
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

/* ─── Capabilities — uses shared CapabilityGrid ───────────────────── */
function Capabilities() {
  const { capabilities } = AR
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-secondary)' }}
    >
      {/* Subtle parallax background */}
      <div className="absolute inset-0 pointer-events-none">
        <Parallax speed={0.08} className="w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/building-02.jpg"
            alt=""
            className="w-full h-full object-cover opacity-[0.05]"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </Parallax>
      </div>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-14">
          <div>
            <FadeUp delay={0.05}><SectionLabel>{capabilities.label}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-black leading-tight"
                style={{
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {capabilities.headline}
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.25}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {capabilities.body}
            </p>
          </FadeUp>
        </div>

        {/* Accordion tiles — same component as English */}
        <CapabilityGrid capabilities={capabilities.items} />
      </div>
    </section>
  )
}

/* ─── Arabic sector content renderer (mirrors English SectorContent) */
function ARSectorContent({ id }: { id: string }) {
  const sector = AR.sectors.find((s) => s.id === id)
  if (!sector) return null
  const { highlight, caseStudies } = sector

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-14">
        <div>
          <div className="text-xs font-bold mb-3" style={{ color: 'var(--color-accent)' }}>
            {highlight.tagline}
          </div>
          <h2
            className="font-black leading-tight mb-5"
            style={{ fontSize: 'clamp(22px, 3vw, 38px)', color: 'var(--color-text-primary)' }}
          >
            {highlight.headline}
          </h2>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-muted)' }}>
            {highlight.body}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-8 mb-8 pb-8 border-b" style={{ borderColor: 'var(--color-border)' }}>
            {highlight.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-3xl font-black leading-none" style={{ color: 'var(--color-text-primary)' }}>
                  {m.value}
                </div>
                <div className="text-[10px] font-semibold mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Outcome tags */}
          <div className="flex flex-wrap gap-2">
            {highlight.outcomes.map((outcome) => (
              <span
                key={outcome}
                className="px-3 py-1.5 text-xs font-semibold"
                style={{
                  backgroundColor: 'var(--color-bg-accent)',
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {outcome}
              </span>
            ))}
          </div>
        </div>

        {/* Sector image */}
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{ backgroundColor: 'var(--color-bg-accent)' }}
        >
          <Parallax speed={0.1} className="w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/sectors/${id}.jpg`}
              alt={sector.label}
              className="w-full h-full object-cover"
              style={{ opacity: 0.7 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
          </Parallax>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--color-text-primary) 0%, transparent 60%)' }}
          />
          <div className="absolute bottom-6 left-6">
            <span className="text-7xl font-black opacity-20 text-white leading-none">
              {sector.label[0]}
            </span>
          </div>
          <motion.div
            className="absolute top-4 right-4 px-3 py-1.5 text-xs font-bold text-white"
            style={{ backgroundColor: 'var(--color-accent)' }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sector.label}
          </motion.div>
        </div>
      </div>

      {/* Case studies */}
      {caseStudies.length > 0 && (
        <div>
          <div className="text-xs font-bold mb-6" style={{ color: 'var(--color-text-muted)' }}>
            دراسات الحالة
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard
                key={cs.title}
                badge={cs.status}
                title={cs.title}
                client={cs.client}
                outcomes={cs.outcomes}
                index={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Sectors — uses shared SectorTabs ───────────────────────────── */
function Sectors() {
  return (
    <section
      id="sectors"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-xl">
            <FadeUp delay={0.05}><SectionLabel>القطاعات</SectionLabel></FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-black leading-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--color-text-primary)' }}
              >
                ثمانية قطاعات. نهج تنسيق واحد.
              </h2>
            </FadeUp>
          </div>
        </div>

        <SectorTabs
          tabs={AR.sectors.map((s) => ({ id: s.id, label: s.label }))}
          renderContent={(id) => <ARSectorContent id={id} />}
        />
      </div>
    </section>
  )
}

/* ─── Proof Points ───────────────────────────────────────────────── */
function ProofPoints() {
  const { proofPoints } = AR
  return (
    <section
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: 'var(--color-text-primary)' }}
    >
      {/* Ambient marquee backdrop */}
      <div className="absolute inset-0 flex items-center pointer-events-none overflow-hidden select-none">
        <MarqueeText
          items={proofPoints.marqueeItems}
          speed={50}
          className="opacity-[0.05]"
          textClassName="text-[clamp(48px,8vw,100px)] font-black text-white whitespace-nowrap"
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 65%)', opacity: 0.08 }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-20">
          <div>
            <SectionLabel light>{proofPoints.label}</SectionLabel>
            <FadeUp>
              <h2
                className="font-black leading-tight text-white"
                style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
              >
                {proofPoints.headline}
              </h2>
            </FadeUp>
          </div>
          <motion.p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: 'rgba(255,255,255,0.45)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {proofPoints.subheadline}
          </motion.p>
        </div>

        {/* Stats with vertical dividers */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-t border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          {proofPoints.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative py-10 px-6 lg:px-10"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 80, damping: 20, delay: i * 0.1 }}
            >
              {i > 0 && (
                <div
                  className="absolute start-0 top-6 bottom-6 w-px"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                />
              )}
              <div
                className="font-black leading-none text-white"
                style={{ fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs font-semibold mt-2"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Partners — uses shared Marquee (two rows) ───────────────────── */
function Partners() {
  const { partners } = AR
  const half = Math.ceil(partners.list.length / 2)

  return (
    <section
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ backgroundColor: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container mx-auto px-6 lg:px-10 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end">
          <div className="lg:col-span-2">
            <FadeUp delay={0.05}><SectionLabel>{partners.label}</SectionLabel></FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="font-black leading-tight"
                style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--color-text-primary)' }}
              >
                {partners.headline}
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.25}>
            <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {partners.body}
            </p>
          </FadeUp>
        </div>
      </div>

      {/* First marquee strip */}
      <Marquee speed={35} gap={0} pauseOnHover className="mb-3">
        {partners.list.slice(0, half).map((name) => (
          <div
            key={name}
            className="flex-shrink-0 px-8 py-5 border-r text-sm font-bold cursor-default transition-colors duration-200"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
              minWidth: 160,
              textAlign: 'center',
            }}
            dir="ltr"
          >
            {name.trim()}
          </div>
        ))}
      </Marquee>

      {/* Second marquee strip — reversed */}
      <Marquee speed={45} reverse gap={0} pauseOnHover>
        {partners.list.slice(half).map((name) => (
          <div
            key={name}
            className="flex-shrink-0 px-8 py-5 border-r text-sm font-bold cursor-default transition-colors duration-200"
            style={{
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-muted)',
              minWidth: 160,
              textAlign: 'center',
            }}
            dir="ltr"
          >
            {name.trim()}
          </div>
        ))}
      </Marquee>
    </section>
  )
}

/* ─── Contact ────────────────────────────────────────────────────── */
function Contact() {
  const { contact } = AR
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', sector: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ backgroundColor: 'var(--color-text-primary)' }}
    >
      {/* Ambient marquee */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden select-none">
        <MarqueeText
          items={contact.marqueeItems}
          speed={40}
          className="opacity-[0.05]"
          textClassName="text-[clamp(40px,7vw,90px)] font-black text-white whitespace-nowrap"
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Copy */}
          <div>
            <SectionLabel light>{contact.label}</SectionLabel>
            <FadeUp>
              <h2
                className="font-black leading-tight text-white mb-6"
                style={{ fontSize: 'clamp(32px, 5vw, 64px)', letterSpacing: '-0.03em' }}
              >
                {contact.headline}
              </h2>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-base leading-relaxed mb-12 max-w-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {contact.body}
              </p>
            </FadeUp>

            <FadeUp delay={0.5}>
              <div className="space-y-5">
                {[
                  { label: 'العنوان', value: contact.address,             ltr: false },
                  { label: 'البريد',  value: contact.email,               ltr: true  },
                  { label: 'الهاتف',  value: contact.phone,               ltr: true  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-16 text-xs font-bold pt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {item.label}
                    </div>
                    <div className="text-sm text-white" dir={item.ltr ? 'ltr' : undefined}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-16 text-center"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: 'var(--color-accent-mint)' }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14l7 7 11-11" stroke="#001081" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">{contact.success.title}</h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{contact.success.body}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'name',    label: contact.fields.name,    type: 'text' },
                      { name: 'company', label: contact.fields.company,  type: 'text' },
                    ].map((field) => (
                      <div key={field.name}>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.label}
                          required
                          className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white/60"
                          style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      {/* Email — dir="ltr" so typed address reads L-R inside RTL page */}
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={contact.fields.email}
                        required
                        dir="ltr"
                        className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white/60 text-start"
                        style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                      />
                    </div>
                    <div>
                      {/* Phone — always LTR */}
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={contact.fields.phone}
                        dir="ltr"
                        className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 focus:border-white/60 text-start"
                        style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                      />
                    </div>
                  </div>

                  <select
                    name="sector"
                    value={form.sector}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b px-0 py-3 text-sm outline-none transition-colors duration-200 appearance-none cursor-pointer"
                    style={{
                      borderColor: 'rgba(255,255,255,0.2)',
                      color: form.sector ? 'white' : 'rgba(255,255,255,0.3)',
                    }}
                  >
                    <option value="" disabled style={{ background: '#001081' }}>{contact.fields.sector}</option>
                    {contact.sectors.map((s) => (
                      <option key={s} value={s} style={{ background: '#001081' }}>{s}</option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={contact.fields.message}
                    rows={4}
                    required
                    className="w-full bg-transparent border-b px-0 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-200 resize-none focus:border-white/60"
                    style={{ borderColor: 'rgba(255,255,255,0.2)' }}
                  />

                  <MagneticButton
                    type="submit"
                    variant="dark"
                    disabled={loading}
                    className="w-full justify-center py-4"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        />
                        جارٍ الإرسال...
                      </span>
                    ) : (
                      contact.fields.submit
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────────────── */
function Footer() {
  const { footer } = AR
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-text-primary)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="container mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">

          {/* Brand col */}
          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/ejada-white-logo.png"
              alt="إجادة سيستمز"
              className="h-8 w-auto mb-5"
              onError={(e) => {
                const t = e.target as HTMLImageElement
                t.style.display = 'none'
                if (t.parentElement) {
                  t.parentElement.innerHTML = `<div style="font-size:20px;font-weight:900;color:white;margin-bottom:20px;letter-spacing:-0.03em"><span style="color:var(--color-accent)">إ</span>جادة</div>`
                }
              }}
            />
            <p className="text-sm leading-relaxed max-w-xs mb-8" style={{ color: 'rgba(255,255,255,0.38)' }}>
              {footer.tagline}
            </p>
            <div className="flex items-center gap-4">
              <MagneticButton href="#contact" variant="outline" strength={0.2}
                className="border-white/20 text-white hover:bg-white hover:text-[var(--color-text-primary)]"
              >
                {AR.nav.cta}
              </MagneticButton>
              <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors" dir="ltr">
                {footer.switchLang}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footer.links.map((col, ci) => (
            <div key={col.heading}>
              <div
                className="text-[9px] font-bold mb-5"
                style={{ color: 'rgba(255,255,255,0.28)', letterSpacing: 0 }}
              >
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.items.map((item, ii) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.05 + ii * 0.04 }}
                  >
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.45)' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'white')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)')}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            {footer.copyright}
          </p>
          <div className="flex items-center gap-5 text-xs" style={{ color: 'rgba(255,255,255,0.28)' }}>
            <a href="https://www.ejada.com" className="hover:text-white transition-colors" dir="ltr">
              www.ejada.com
            </a>
            <span>·</span>
            <a href="mailto:info@ejada.com" className="hover:text-white transition-colors" dir="ltr">
              info@ejada.com
            </a>
            <span>·</span>
            <span>الرياض، المملكة العربية السعودية</span>
          </div>
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
