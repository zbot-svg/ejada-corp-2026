# Ejada Systems — Awwwards-Winning Corporate Website

## 1. Concept & Vision

An award-grade corporate experience that positions Ejada as the definitive **National Transformation Orchestrator** of Saudi Arabia. Not a brochure site — a living editorial platform that moves like a premium print publication and thinks like a digital product. Every scroll should feel intentional. Every section should command attention. The site communicates: *we are not just a tech company, we are the architects of the Kingdom's digital future.*

**Personality:** Authoritative, elegant, precise. The confidence of a 20-year institution with the energy of a startup. Premium without being cold. Corporate without being corporate.

**North star:** The kind of site that makes you stop scrolling and say *this is what Saudi tech leadership looks like.*

---

## 2. Design Language

### Aesthetic Direction
**Editorial Luxury meets Technical Precision** — inspired by the world's best editorial design (Wallpaper*, Bloomberg Businessweek) merged with the digital craft of Awwwards winners like AOTM, IDM, and Instrument. Clean, structured, confident. Typography leads. White space is deliberate. Motion is purposeful, never decorative.

### Color Palette
```
--navy:        #001081   /* Primary — authority, trust */
--navy-deep:   #000850   /* Hero backgrounds, dark sections */
--navy-light:  #0018A0   /* Hover states */
--sky:         #0070C0   /* Interactive elements, CTAs */
--sky-light:   #009EE0   /* Accents, highlights */
--teal:        #4A90A4   /* Secondary accent */
--cream:       #F5F3F0   /* Primary background */
--white:       #FFFFFF   /* Cards, panels */
--charcoal:    #2D3436   /* Primary text */
--mid:         #5D5D5D   /* Secondary text */
--muted:       #898989   /* Tertiary text, labels */
--divider:     rgba(45,52,54,0.12)
--dark-panel:  #3D5A80   /* Cover slide left panel */
```

### Typography
```
Primary:   Readex Pro (Google Fonts) — headlines, body, all UI
Fallback:  'Inter', system-ui, sans-serif
Weights:   200 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

Scale:
  Display:  clamp(64px, 10vw, 120px) — 800 — tight tracking, hero only
  H1:       clamp(40px, 6vw, 72px)   — 800 — section titles
  H2:       clamp(28px, 4vw, 48px)   — 700
  H3:       clamp(20px, 3vw, 28px)   — 700
  H4:       18px                       — 600
  Body Lg:  16px                       — 400
  Body:     14px                       — 400
  Small:    12px                       — 500
  Label:    10px                       — 600 — uppercase tracking-[0.2em]
```

### Spatial System
```
Base grid:  8px
Section:    120px vertical padding (desktop), 80px (mobile)
Container:  max-width 1280px, 80px horizontal padding (desktop)
Cards:      24px internal padding
Gutters:    24px (desktop), 16px (mobile)
```

### Motion Philosophy
Motion communicates hierarchy and confidence — it never rushes the user.

```
Entrance:   opacity 0→1 + translateY(40px→0), 600ms cubic-bezier(0.16, 1, 0.3, 1)
Stagger:    80ms delay between sibling elements
Hover:      scale(1.02) + shadow lift, 200ms ease-out
Page load:  Full-cover navy slide-out, 800ms, after 200ms delay
Scroll:     Parallax hero image (0.3x scroll speed), sticky nav fade-in on scroll
Counters:   Count-up animation when section enters viewport, 1500ms ease-out
Sections:   Each section reveals via IntersectionObserver (threshold: 0.12)
Dark/light: Smooth background transition on scroll, 300ms
```

### Visual Assets
- **Icons:** Phosphor Icons (thin weight, 1.5px stroke) — matches editorial lightness
- **Images:** Dark overlay (`rgba(0,8,80,0.55)`) on all images for text legibility
- **Decorative:** Subtle 48px dot-grid pattern at 3% opacity in hero backgrounds
- **Dividers:** 1px `--divider` lines, 48px wide accent lines before section labels
- **No rounded corners** on primary elements (0px radius) — sharp, editorial
- **Cards:** 1px border, no shadow by default, shadow on hover

---

## 3. Layout & Structure

### Page Architecture
Single long-scroll page with distinct, full-bleed sections. Navigation is sticky minimal header that transitions from transparent to white/frosted on scroll.

```
[NAVIGATION] — Fixed, transparent → frosted glass on scroll
    ↓
[001 HERO / COVER] — Full viewport, dark navy panel + background image
    ↓
[002 WHO WE ARE] — 2-column: text left, image right
    ↓
[003 OUR FOOTPRINT] — Stats bar + Saudi map region
    ↓
[004 WHAT WE BELIEVE] — 3-column belief grid, dark background
    ↓
[005 ORCHESTRATOR MODEL] — 4-pillar grid, animated connectors
    ↓
[006 OUR VALUES] — Split layout: large typography left, values list right
    ↓
[007 WHAT WE ENABLE] — 5 outcome cards, horizontal scroll on mobile
    ↓
[008 OUR CAPABILITIES] — 2-col: text + interactive capability grid
    ↓
[009 SECTOR DEEP DIVES] — Tabbed/accordion industry expertise
    ↓
[010 PROOF POINTS] — Full-width dark, animated stat counters
    ↓
[011 OUR PARTNERS] — Logo grid, subtle hover reveal
    ↓
[012 OUR COMMITMENT] — ESG/sustainability, editorial 2-col
    ↓
[013 CONTACT] — Full-bleed dark, bold CTA + form
    ↓
[FOOTER]
```

### Layout Rules
- **Hero:** Always full-viewport height (100svh)
- **Section transitions:** Alternating cream/white/dark backgrounds for rhythm
- **Two-column splits:** 520px content panel + remaining for image/visual
- **Dark sections:** Dark navy (`--navy-deep`) for visual contrast breaks
- **Mobile:** Single column, 24px padding, section padding 64px

### Responsive Strategy
```
Desktop (≥1024px): Full layouts, all animations active
Tablet  (768-1023): Reduced columns, maintained hierarchy
Mobile  (<768px): Single column, horizontal scroll for multi-col grids
```

---

## 4. Features & Interactions

### Navigation
- Fixed top, transparent initially
- On scroll > 80px: white background, frosted glass (`backdrop-filter: blur(12px)`), subtle bottom border
- Logo left, nav links center, CTA button right
- Mobile: Hamburger → full-screen overlay menu with staggered link animations
- Active section highlighted via scroll spy

### Hero Section (001)
- Full 100svh height
- Left panel (dark navy, 480px): Logo, headline, tagline, year badge
- Right panel: Full-bleed background image (dark overlay) of Saudi Arabia/KSA urban
- On load: Content fades in staggered (logo → title → tagline → scroll indicator)
- Scroll indicator: Animated bouncing chevron, pulses every 2s
- Parallax: Background image scrolls at 0.3x speed

### Who We Are (002)
- Two-column: Text panel (scrolls in from left) | Image panel (scrolls in from right)
- Section label + headline + body text + key stats row
- Stats animate (count-up) when section enters viewport

### Our Footprint (003)
- Animated stats bar: "20 Years | 7 Countries | 50+ Clients | 500+ Projects"
- Interactive region map (Saudi Arabia + GCC) with hover tooltips per city
- Cities: Riyadh (HQ), Jeddah, Dubai, Kuwait, Qatar, Bahrain, Muscat

### What We Believe (004)
- Dark navy background section (visual contrast break)
- 3 belief cards in equal-width grid
- Each card: Number (01/02/03) + bold title + body text
- Hover: Card lifts with sky-blue left border accent

### Orchestrator Model (005)
- 4 pillars in a row: Define → Design → Deliver → Drive
- Animated connecting line/arrows between pillars
- Each pillar: Icon + title + short description
- On hover: Pillar expands slightly, accent color border appears

### Our Values (006)
- Left: Large editorial quote "Our Values" in display type
- Right: 6 values as stacked rows with dividers
- Hover on value: Subtle slide-right animation, accent color appears

### What We Enable (007)
- 5 outcome cards in a row: Revenue Acceleration | Cost Optimization | Risk & Compliance | Citizen Experience | Data-Driven Decisions
- Each card: Icon + title + 1-line description
- Horizontal scroll on mobile
- Hover: Card lifts, sky-blue top border appears

### Our Capabilities (008)
- Left panel: Sticky text while capability tiles scroll on right
- Capability tiles (6): Enterprise Apps | Data & AI | Cloud & Infra | Cybersecurity | Managed Services | Islamic Banking Tech
- Each tile: Title + tags + hover reveals full description
- Click: Expands inline with more detail (accordion-style)

### Sector Deep Dives (009)
- Tab navigation: Finance | Government | Healthcare | Transport | Retail | Real Estate | STEC | Mega Projects
- Each tab: Highlight card (2-col image + text) + 1-2 case study cards below
- Tab switch: Content cross-fades (200ms)

### Proof Points (010)
- Full-width dark navy background
- 4 large animated counters: 500+ Projects | 7 Countries | 20 Years | 50+ Clients
- Count-up animation triggers on viewport entry
- Sub-headline: "Across 7 key industries in the region"

### Our Partners (011)
- Section label + headline
- Logo grid: 4 cols × 3 rows of technology partner logos (SAP, Oracle, Microsoft, AWS, Google, Salesforce, ServiceNow, IBM, etc.)
- Grayscale by default, color on hover

### Our Commitment (012)
- Editorial 2-col: Large image left | Text right
- ESG commitment statements + talent development + sustainability

### Contact (013)
- Full-bleed dark navy
- Large headline: "Let's Orchestrate Your Transformation."
- Contact form: Name, Company, Email, Phone, Sector (dropdown), Message
- Submit button with loading state
- Right panel: Contact details (address, email, phone) + social links

### Footer
- Dark background matching footer color
- 4-col links + brand statement + copyright

---

## 5. Component Inventory

### Navigation
- **Default:** Transparent background, white text (on dark hero), navy text (after scroll)
- **Scrolled:** White/frosted, navy text, subtle shadow
- **Mobile:** Hamburger → full-screen navy overlay, staggered link reveals

### Section Label
- 48px accent line + uppercase label text (10px, 600, tracking-[0.2em])
- Color: `--sky` on light sections, `--sky-light` on dark sections

### Stat Counter
- Large number (display size, 800), label below (uppercase, 10px)
- Animates from 0 to target value when in viewport
- Uses easeOutExpo curve

### Capability Tile
- Default: White bg, border, title + 2 tags
- Hover: Lifted, sky top border, description revealed
- Active/Expanded: Full description inline accordion

### Case Study Card
- Image (dark overlay) + sector badge + title + 1-line description
- Hover: Image zoom (scale 1.05), overlay lightens slightly

### Tab Button
- Default: Muted text, no border
- Active: Navy text, sky underline (2px)
- Hover: Navy text

### Form Input
- Border-bottom only (underline style), 1px `--divider`
- Focus: Border turns sky-blue, label floats up
- Error: Red underline + error message below

### CTA Button
- Primary: Navy bg, white text, no radius, 600 weight
- Hover: Navy-light bg + subtle shadow
- Secondary: Transparent, navy border, navy text
- Hover: Navy bg, white text

### Scroll Indicator
- Bouncing chevron (down arrow), white at 60% opacity
- Animates: translateY(0→8px→0), 1.5s infinite ease-in-out

---

## 6. Technical Approach

### Framework & Stack
```
Framework:     Next.js 14 (App Router) — already configured in ejada-web
Styling:       Tailwind CSS v4 + custom CSS (design tokens as CSS vars)
Animation:     Framer Motion 11+ (scroll animations, page transitions)
Icons:         Phosphor Icons (@phosphor-icons/react)
Fonts:         Readex Pro (Google Fonts, loaded via next/font)
Images:        next/image (optimized, lazy loading)
CMS-ready:     Content layered as React components — swap static data for CMS props
Deployment:    Vercel (zbot-2872 account, already configured)
```

### Architecture
```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main homepage (all sections composed here)
│   └── globals.css         # Design tokens, base styles, animations
├── components/
│   ├── sections/           # One file per section
│   │   ├── hero.tsx
│   │   ├── who-we-are.tsx
│   │   ├── footprint.tsx
│   │   ├── what-we-believe.tsx
│   │   ├── orchestrator-model.tsx
│   │   ├── values.tsx
│   │   ├── what-we-enable.tsx
│   │   ├── capabilities.tsx
│   │   ├── sectors.tsx
│   │   ├── proof-points.tsx
│   │   ├── partners.tsx
│   │   ├── commitment.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── ui/                 # Reusable UI primitives
│   │   ├── nav.tsx
│   │   ├── section-label.tsx
│   │   ├── stat-counter.tsx
│   │   ├── capability-tile.tsx
│   │   ├── case-study-card.tsx
│   │   ├── tab-nav.tsx
│   │   ├── cta-button.tsx
│   │   └── scroll-indicator.tsx
│   └── providers/
│       └── animation-provider.tsx  # Framer Motion variants
├── lib/
│   ├── tokens.ts           # Design tokens (colors, spacing, type)
│   ├── content.ts          # All static content (CMS-ready data layer)
│   └── utils.ts            # cn(), formatting helpers
└── public/
    ├── brand/              # Logo assets
    └── images/             # Slide imagery (from uploaded images)
```

### CMS Strategy
- All page content lives in `lib/content.ts` as structured TypeScript objects
- Content shape matches what a headless CMS (Contentful, Sanity, Payload) would deliver
- Each content block has: `id`, `type`, `title`, `body`, `image`, `tags`, `metrics`
- Components accept typed props — swapping `content.ts` for a CMS fetch is a one-file change
- Sanity CMS schema can be auto-generated from the content types

### Performance Targets
```
LCP:    < 2.5s (hero image preloaded)
FID:    < 100ms
CLS:    < 0.1 (reserved image slots, font-display: swap)
Bundle: < 200kb initial JS (dynamic imports for below-fold sections)
```

### Key Implementation Notes
- Use `next/image` with `priority` for hero, lazy for everything else
- Framer Motion `whileInView` + `viewport={{ once: true, amount: 0.12 }}` for scroll reveals
- `useScroll` + `useTransform` for parallax effects
- `useState` + `useEffect` for scroll-spy navigation
- CSS `scroll-behavior: smooth` + `scroll-margin-top` on all sections
- Dark sections use CSS custom properties for seamless theme switching
