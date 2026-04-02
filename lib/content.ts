// ─── CMS-Ready Content Layer ───────────────────────────────────────
// All page content lives here. Replace this file's data with a CMS fetch
// to make the site fully dynamic. Types match headless CMS schemas.

export interface Belief {
  number: string
  title: string
  body: string
}

export interface OrchestratorPillar {
  number: string
  title: string
  description: string
}

export interface Value {
  letter: string
  title: string
  description: string
}

export interface Outcome {
  number: string
  title: string
  items: string[]
}

export interface Capability {
  id: string
  number: string
  title: string
  shortDesc: string
  tags: string[]
  longDesc: string
}

export interface Sector {
  id: string
  label: string
  highlight: {
    tagline: string
    headline: string
    body: string
    metrics: { label: string; value: string }[]
    outcomes: string[]
  }
  caseStudies: {
    title: string
    client: string
    status: string
    challenge: string
    outcomes: { title: string; description: string }[]
  }[]
}

export interface Enabler {
  number: string
  title: string
  items: { title: string; description: string }[]
}

export interface Partner {
  name: string
  logo: string
}

// ─── Page Content ────────────────────────────────────────────────────
export const pageContent = {
  meta: {
    title: 'Ejada Systems — National Transformation Orchestrator',
    description: 'Saudi Arabia\'s leading technology transformation partner. 20 years orchestrating enterprise transformation across finance, government, healthcare, and beyond.',
  },

  nav: {
    links: [
      { label: 'About', href: '#about' },
      { label: 'Capabilities', href: '#capabilities' },
      { label: 'Sectors', href: '#sectors' },
      { label: 'Insights', href: '#insights' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: 'Get in Touch',
    langSwitch: 'عربي',
    langHref: '/ar',
  },

  hero: {
    eyebrow: 'Corporate Profile — 2026',
    headline: 'Architects of\nCoherence.',
    tagline: 'Custodians of Trust.',
    location: 'Riyadh · Kingdom of Saudi Arabia',
    cta1: 'Explore Capabilities',
    cta2: 'Start a Project',
    stats: [
      { value: '20+', label: 'Years' },
      { value: '500+', label: 'Projects' },
      { value: '1K+', label: 'Professionals' },
      { value: '7', label: 'Countries' },
    ],
    scrollLabel: 'Scroll',
    year: '2026',
    website: 'www.ejada.com',
  },

  whoWeAre: {
    label: 'Who We Are',
    headline: 'The Kingdom\'s National Transformation Orchestrator',
    body: 'We exist to orchestrate intelligent, sovereign, and resilient enterprise ecosystems at scale. For nearly two decades, we have designed the critical connections between strategy, platforms, data, and operations — transforming fragmented systems into coherent competitive advantage.',
    stats: [
      { value: '20+', label: 'Years in KSA' },
      { value: '1,000+', label: 'Professionals' },
      { value: '50+', label: 'Clients' },
      { value: '500+', label: 'Projects' },
      { value: '25+', label: 'Partners' },
      { value: '7', label: 'Countries' },
    ],
    // image added from uploaded assets
  },

  footprint: {
    label: 'Our Footprint',
    headline: 'Headquartered in Saudi Arabia. Delivering across the region.',
    body: 'Strategic presence across four countries, enabling seamless delivery and local expertise for regional transformation initiatives.',
    locations: [
      { city: 'Riyadh', country: 'Saudi Arabia', type: 'Headquarters' },
      { city: 'Jeddah', country: 'Saudi Arabia', type: 'Office' },
      { city: 'Dubai', country: 'UAE', type: 'Delivery Center' },
      { city: 'Cairo', country: 'Egypt', type: 'Delivery Center' },
      { city: 'Amman', country: 'Jordan', type: 'Delivery Center' },
      { city: 'Hyderabad', country: 'India', type: 'Development Center' },
    ],
  },

  whatWeBelieve: {
    label: 'What We Believe',
    headline: 'Driven by purpose. Guided by vision.',
    beliefs: [
      {
        number: '01',
        title: 'Vision',
        body: 'Pioneering a future where technology, expertise, and human creativity reshape business, government, and society.',
      },
      {
        number: '02',
        title: 'Mission',
        body: 'Empowering clients to thrive in an evolving digital landscape through deep expertise, innovation, and uncompromising quality.',
      },
      {
        number: '03',
        title: 'Purpose',
        body: 'Orchestrating transformation and positive change to build a smarter, more connected world.',
      },
    ],
  },

  orchestratorModel: {
    label: 'How We Work',
    headline: 'The Orchestrator Model',
    body: 'We don\'t just install technology; we ensure it integrates into a coherent, strategic whole. This is a discipline of continuous design, governance, and refinement — not a static state.',
    pillars: [
      {
        number: '01',
        title: 'Strategy',
        description: 'Defining the vision and business objectives that guide transformation.',
      },
      {
        number: '02',
        title: 'Orchestration',
        description: 'Architecting system coherence across platforms, data, and operations.',
      },
      {
        number: '03',
        title: 'Execution',
        description: 'Implementing robust, scalable technology solutions.',
      },
      {
        number: '04',
        title: 'Outcomes',
        description: 'Delivering measurable business value and impact.',
      },
    ],
  },

  values: {
    label: 'Our Values',
    headline: 'INSPIRE',
    subheadline: 'Our values are the bedrock of our culture. They guide how we work, how we collaborate, and how we deliver value to our clients and community.',
    values: [
      { letter: 'I', title: 'Integrity', description: 'Transparency, honesty, accountability' },
      { letter: 'N', title: 'Novelty', description: 'New ideas, creative approaches' },
      { letter: 'S', title: 'Solidarity', description: 'One team, shared goals' },
      { letter: 'P', title: 'Proactivity', description: 'Anticipate, act decisively' },
      { letter: 'I', title: 'Innovation', description: 'Emerging tech, forward-looking' },
      { letter: 'R', title: 'Respect', description: 'Diverse perspectives, inclusion' },
      { letter: 'E', title: 'Excellence', description: 'Quality, mastery, outcomes' },
    ],
  },

  whatWeEnable: {
    label: 'What We Enable',
    headline: 'Business outcomes, not technology projects.',
    outcomes: [
      {
        number: '01',
        title: 'Growth',
        items: ['Revenue acceleration', 'Market expansion', 'New business models'],
      },
      {
        number: '02',
        title: 'Efficiency',
        items: ['Cost optimization', 'Process automation', 'Operational excellence'],
      },
      {
        number: '03',
        title: 'Resilience',
        items: ['Risk management', 'Security & compliance', 'Business continuity'],
      },
      {
        number: '04',
        title: 'Experience',
        items: ['Customer journeys', 'Citizen services', 'Stakeholder engagement'],
      },
      {
        number: '05',
        title: 'Innovation',
        items: ['Data-driven decisions', 'Emerging tech adoption', 'Future readiness'],
      },
    ],
  },

  capabilities: {
    label: 'Our Capabilities',
    headline: 'Integrated capabilities, orchestrated for impact.',
    body: 'Designing the critical connections between strategy, platforms, data, and operations to build coherent enterprise ecosystems.',
    items: [
      {
        id: 'erp',
        number: '01',
        title: 'Enterprise Applications & ERP',
        shortDesc: 'SAP, Oracle, and enterprise platform implementation and optimization.',
        tags: ['SAP', 'Oracle', 'ERP', 'Microsoft'],
        longDesc: 'End-to-end SAP and Oracle implementation, optimization, and managed services. We have delivered 100+ ERP projects across the region, covering finance, HR, supply chain, and operations for enterprise and government clients.',
      },
      {
        id: 'data-ai',
        number: '02',
        title: 'Data, AI & Analytics',
        shortDesc: 'Data platforms, AI/ML solutions, and decision intelligence.',
        tags: ['AI/ML', 'Data Platforms', 'BI', 'Analytics'],
        longDesc: 'From data lake architecture to production AI/ML systems. We build the analytical foundations that turn raw enterprise data into predictive intelligence and actionable insight.',
      },
      {
        id: 'cloud',
        number: '03',
        title: 'Cloud & Infrastructure',
        shortDesc: 'Cloud migration, hybrid infrastructure, and sovereign cloud orchestration.',
        tags: ['AWS', 'Azure', 'Hybrid', 'Sovereign Cloud'],
        longDesc: 'Sovereign, scalable, and resilient infrastructure for the Kingdom. Cloud migration strategies, hybrid architecture design, and 24/7 managed infrastructure operations.',
      },
      {
        id: 'cyber',
        number: '04',
        title: 'Cybersecurity & Resilience',
        shortDesc: 'Security operations, GRC, identity management, and threat intelligence.',
        tags: ['SOC', 'GRC', 'Zero Trust', 'Threat Intel'],
        longDesc: 'Protecting the Kingdom\'s most critical digital assets. Comprehensive cybersecurity services including SOC operations, governance & compliance, identity management, and incident response.',
      },
      {
        id: 'managed',
        number: '05',
        title: 'Managed Services',
        shortDesc: 'End-to-end IT operations. Managed. Optimized. Continuously.',
        tags: ['ITO', 'ServiceNow', 'Operations', 'Optimization'],
        longDesc: 'Complete IT operations management — from infrastructure to applications. We operate as a seamless extension of your IT team, continuously optimizing performance and reducing total cost of ownership.',
      },
      {
        id: 'islamic-banking',
        number: '06',
        title: 'Islamic Banking Technology',
        shortDesc: 'Deep domain expertise where Shariah compliance meets enterprise technology.',
        tags: ['Shariah Compliance', 'Islamic Finance', 'Banktech'],
        longDesc: 'Specialized technology solutions for Islamic financial institutions. Deep domain expertise in Shariah-compliant core banking, treasury, wealth management, and regulatory reporting.',
      },
    ],
  },

  enablers: {
    label: 'Our Enablers',
    headline: 'Accelerating value delivery.',
    body: 'Strategic assets that differentiate our delivery and ensure scalability across all lines of business.',
    items: [
      {
        number: '01',
        title: 'Pre-built Solutions',
        items: [
          { title: 'Horizontal Solutions', description: 'Ready-to-deploy modules for HR, Finance, and Operations that reduce development time.' },
          { title: 'Industry Specific', description: 'Tailored accelerators for Banking, Healthcare, and Government sectors.' },
        ],
      },
      {
        number: '02',
        title: 'Fit-for-Purpose Capabilities',
        items: [
          { title: 'IPO Readiness', description: 'Governance, compliance, and operational standards aligned with public market requirements.' },
          { title: 'Scalability Engine', description: 'Flexible resource models and delivery frameworks to adapt to mega-project demands.' },
        ],
      },
    ],
  },

  approach: {
    label: 'Our Approach',
    quote: '"We think before we build. We advise before we act. We orchestrate before we deliver."',
    headline: 'Ejada does not simply implement technology.',
    body: 'We partner with enterprises to shape strategy, design architecture, orchestrate ecosystems, and sustain value — acting as a trusted extension of leadership teams.',
    steps: [
      {
        number: '01',
        title: 'Strategic Alignment',
        description: 'We begin every engagement with executive workshops to align technology initiatives with business strategy, ensuring shared vision and measurable objectives.',
      },
      {
        number: '02',
        title: 'Architecture Blueprinting',
        description: 'We design comprehensive solution architectures that balance innovation with pragmatism — building for today while engineering for tomorrow.',
      },
      {
        number: '03',
        title: 'Orchestrated Delivery',
        description: 'Our proven delivery framework ensures all workstreams integrate seamlessly, with continuous governance and quality assurance at every milestone.',
      },
      {
        number: '04',
        title: 'Sustained Outcomes',
        description: 'We don\'t disappear at go-live. Our managed services and continuous improvement practices ensure lasting value and evolving capability.',
      },
    ],
  },

  insightToImpact: {
    label: 'From Insight to Impact',
    headline: 'We span the full spectrum — from strategic thinking to operational excellence.',
    body: 'Ejada\'s unique strength lies in connecting advisory-grade insight with enterprise-scale delivery and sustained operations.',
    phases: [
      {
        title: 'Advisory',
        subtitle: 'Insight',
        items: ['Strategic Assessment', 'Vision Alignment', 'Architecture Design'],
      },
      {
        title: 'Enterprise',
        subtitle: 'Delivery',
        items: ['Implementation', 'Integration', 'Change Management'],
      },
      {
        title: 'Managed',
        subtitle: 'Operations',
        items: ['24/7 Operations', 'Continuous Optimization', 'Innovation Pipeline'],
      },
    ],
  },

  sectorsSection: {
    label: 'Sectors',
    headline: 'Deep expertise, sector by sector.',
    caseStudiesLabel: 'Case Studies',
    allSectorsLabel: 'All Sectors',
  },

  sectors: [
    {
      id: 'financial-services',
      label: 'Financial Services',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Transforming financial institutions into resilient, intelligent, growth-ready enterprises.',
        body: 'We partner with leading banks, insurers, and fintechs to modernize core systems, unlock data value, and deliver exceptional digital experiences for customers across the Kingdom and the region.',
        metrics: [
          { label: 'FS Clients', value: '20+' },
          { label: 'Process Speed', value: '40%' },
          { label: 'Fraud Detection', value: '24/7' },
        ],
        outcomes: ['Core Banking Modernization', 'Digital Channel Transformation', 'Risk & Compliance Automation', 'Islamic Banking Technology'],
      },
      caseStudies: [
        {
          title: 'Financial Services — Case Study',
          client: 'Leading Saudi Financial Institution',
          status: 'Completed',
          challenge: 'The institution needed to modernize its legacy core banking platform to support real-time digital services, regulatory compliance, and accelerated product launches.',
          outcomes: [
            { title: 'Core Banking Transformation', description: 'End-to-end migration from legacy systems to a modern, API-first core banking platform.' },
            { title: 'Digital Channel Integration', description: 'Unified omnichannel experience across mobile, web, and branch operations.' },
            { title: 'Data & Compliance Platform', description: 'Real-time regulatory reporting and fraud detection infrastructure.' },
          ],
        },
      ],
    },
    {
      id: 'government',
      label: 'Government',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Orchestrating the digital transformation of national services.',
        body: 'From citizen-facing portals to backend government systems, we build the platforms that make the Kingdom\'s Vision 2030 a lived reality for millions of citizens.',
        metrics: [
          { label: 'Gov Projects', value: '50+' },
          { label: 'Citizens Served', value: '10M+' },
          { label: 'Uptime', value: '99.99%' },
        ],
        outcomes: ['Digital Government Platforms', 'G2C Service Orchestration', 'Smart City Infrastructure', 'National Data Platforms'],
      },
      caseStudies: [
        {
          title: 'Government — Case Study',
          client: 'National Government Entity',
          status: 'Completed',
          challenge: 'A major government authority needed to consolidate 40+ legacy systems into a unified digital platform serving millions of citizens.',
          outcomes: [
            { title: 'Platform Consolidation', description: 'Migrated 40+ legacy systems to a unified cloud-native digital platform.' },
            { title: 'Citizen Experience', description: 'Launched a mobile-first citizen portal with 200+ digital services.' },
            { title: 'Operational Efficiency', description: 'Reduced processing times by 75% through intelligent automation.' },
          ],
        },
      ],
    },
    {
      id: 'healthcare',
      label: 'Healthcare',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Building the intelligent healthcare ecosystems of tomorrow.',
        body: 'We connect clinical, operational, and financial systems to create unified healthcare ecosystems that improve patient outcomes and operational efficiency.',
        metrics: [
          { label: 'Hospital Beds Managed', value: '10K+' },
          { label: 'Patient Records', value: '5M+' },
          { label: 'Efficiency Gain', value: '35%' },
        ],
        outcomes: ['Clinical Systems Integration', 'Patient Journey Orchestration', 'Healthcare Analytics', 'Telemedicine Platforms'],
      },
      caseStudies: [
        {
          title: 'Healthcare — Case Study',
          client: 'Leading Healthcare Provider',
          status: 'Completed',
          challenge: 'A major hospital network needed to integrate disparate clinical and administrative systems to improve patient care coordination and operational efficiency.',
          outcomes: [
            { title: 'Clinical System Integration', description: 'Unified electronic health records across 12 hospital facilities.' },
            { title: 'Patient Flow Optimization', description: 'Real-time bed management and patient journey tracking system.' },
            { title: 'Analytics Platform', description: 'Population health analytics and clinical decision support tools.' },
          ],
        },
      ],
    },
    {
      id: 'transport',
      label: 'Transport',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Building the infrastructure and intelligence behind modern mobility.',
        body: 'From airports to public transit to logistics networks, we orchestrate the technology that moves nations forward.',
        metrics: [
          { label: 'Passengers Managed', value: '100M+' },
          { label: 'Network Uptime', value: '99.95%' },
        ],
        outcomes: ['Passenger Experience', 'Logistics Intelligence', 'Smart Transit', 'Airport Operations'],
      },
      caseStudies: [],
    },
    {
      id: 'retail',
      label: 'Retail',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Empowering retailers to deliver seamless customer experiences.',
        body: 'We help retailers unify commerce channels, optimize supply chains, and deliver personalized experiences at scale.',
        metrics: [
          { label: 'SKUs Managed', value: '1M+' },
          { label: 'Omnichannel Markets', value: '5' },
        ],
        outcomes: ['Omnichannel Commerce', 'Supply Chain Intelligence', 'Customer Analytics', 'Unified POS'],
      },
      caseStudies: [],
    },
    {
      id: 'real-estate',
      label: 'Real Estate',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Enabling real estate leaders to build and manage intelligent property ecosystems.',
        body: 'From development and construction through to property management and tenant experience, we digitize every layer of the real estate value chain.',
        metrics: [
          { label: 'Properties Managed', value: '100+' },
          { label: 'Sq Ft Under Management', value: '50M+' },
        ],
        outcomes: ['Smart Building Platforms', 'Tenant Experience Apps', 'Property Management Systems', 'Development ERP'],
      },
      caseStudies: [],
    },
    {
      id: 'stec',
      label: 'Sports, Tourism & Culture',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Powering world-class experiences that inspire global audiences.',
        body: 'We deliver the technology behind Saudi Arabia\'s most ambitious entertainment, sports, and cultural destinations — from venue operations to fan engagement platforms.',
        metrics: [
          { label: 'Venues Digitalized', value: '20+' },
          { label: 'Annual Visitors', value: '30M+' },
        ],
        outcomes: ['Venue Operations', 'Fan Engagement', 'Event Technology', 'Cultural Platform'],
      },
      caseStudies: [],
    },
    {
      id: 'mega-projects',
      label: 'Mega Projects',
      highlight: {
        tagline: 'Sector Highlight',
        headline: 'Powering the digital backbone of Vision 2030.',
        body: 'Ejada is proud to be a digital transformation partner on the Kingdom\'s most ambitious giga-projects — the ventures that are redefining Saudi Arabia on the world stage.',
        metrics: [
          { label: 'Giga-Projects', value: '5+' },
          { label: 'Delivery Scale', value: 'National' },
        ],
        outcomes: ['Giga-Project Digital Strategy', 'Smart City Platforms', 'Tourism Infrastructure', 'National Event Technology'],
      },
      caseStudies: [
        {
          title: 'Mega Projects — Case Study',
          client: 'Major Saudi Giga-Project',
          status: 'In Progress',
          challenge: 'A landmark giga-project required a comprehensive digital strategy and technology architecture to manage complex multi-stakeholder operations at unprecedented scale.',
          outcomes: [
            { title: 'Digital Strategy', description: 'Comprehensive digital transformation roadmap aligned with Vision 2030.' },
            { title: 'Smart City Platform', description: 'Unified IoT and analytics platform managing city-wide operations.' },
            { title: 'Stakeholder Ecosystem', description: 'Integrated collaboration platform connecting 50+ project stakeholders.' },
          ],
        },
      ],
    },
  ] as Sector[],

  proofPoints: {
    label: 'Proof Points',
    headline: 'Figures that define our track record.',
    subheadline: 'Across 7 key industries in the region.',
    stats: [
      { value: '20+', label: 'Years in the Kingdom' },
      { value: '500+', label: 'Projects Delivered' },
      { value: '7', label: 'Countries' },
      { value: '50+', label: 'Enterprise Clients' },
    ],
  },

  partners: {
    label: 'Our Partners',
    headline: 'Global Technology Alliances.',
    body: 'Collaborating with world-class technology partners to deliver best-of-breed solutions.',
    list: [
      'SAP', 'Oracle', 'Microsoft', 'AWS', 'Google Cloud',
      'Salesforce', 'ServiceNow', 'IBM', 'Adobe', 'VMware',
      'Red Hat', 'Cisco', 'Fortinet', 'CrowdStrike', ' Palo Alto Networks',
    ] as string[],
  },

  commitment: {
    label: 'Our Commitment',
    headline: 'Deeply rooted in the Kingdom\'s future.',
    body: 'Driving national impact through talent development, sustainable practices, and deep community partnership. We believe technology\'s greatest purpose is to elevate human potential.',
    pillars: [
      { title: 'National Talent', description: 'Investing in Saudi talent development through training programs, university partnerships, and graduate recruitment.' },
      { title: 'Sustainability', description: 'Embedding sustainable practices across our operations and helping clients achieve their ESG objectives.' },
      { title: 'Community', description: 'Active engagement with the communities where we operate — from STEM education to digital inclusion initiatives.' },
    ],
  },

  contact: {
    label: 'Contact',
    headline: 'Let\'s orchestrate your transformation.',
    body: 'Partner with Ejada to unlock value, drive innovation, and secure your future.',
    address: 'Riyadh, Saudi Arabia',
    email: 'info@ejada.com',
    phone: '+966 11 000 0000',
    website: 'www.ejada.com',
    sectorOptions: [
      'Financial Services', 'Government & Public Sector', 'Healthcare',
      'Transportation', 'Retail & Consumer', 'Energy & Utilities', 'Real Estate',
    ],
    formLabels: {
      name: 'Full Name', company: 'Company', email: 'Email Address',
      phone: 'Phone (optional)', sector: 'Select Sector',
      message: 'Tell us about your project...',
    },
    contactLabels: { address: 'Address', email: 'Email', phone: 'Phone' },
    submit: 'Send Message',
    submitting: 'Sending...',
    success: { title: 'Message received.', body: 'We\'ll be in touch within one business day.' },
    marqueeItems: ['LET\'S BUILD', '·', 'GET IN TOUCH', '·', 'START A PROJECT', '·'],
  },

  proofPointsMarquee: ['20 YEARS', '·', '500+ PROJECTS', '·', '7 COUNTRIES', '·', '50+ CLIENTS', '·'],

  footer: {
    brand: 'Ejada Systems',
    tagline: 'The Kingdom\'s National Transformation Orchestrator.',
    cta: 'Get in Touch',
    links: [
      { heading: 'Company', items: ['About', 'Capabilities', 'Sectors', 'Careers'] },
      { heading: 'Services', items: ['Cloud & AI', 'Enterprise Apps', 'Cybersecurity', 'Managed Services'] },
      { heading: 'Insights', items: ['News', 'Events', 'Whitepapers', 'Case Studies'] },
      { heading: 'Connect', items: ['Contact', 'Partners', 'Legal', 'Privacy'] },
    ],
    copyright: `© ${new Date().getFullYear()} Ejada Systems. All rights reserved.`,
    bottomLinks: { website: 'www.ejada.com', email: 'info@ejada.com', location: 'Riyadh, KSA' },
  },
}
