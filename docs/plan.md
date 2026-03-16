# plan.md — Taranis Electrical Website Rebuild (React + Vercel)

> Goal: **Rebuild taraniselectrical.co.uk as a modern, maintainable React site on Vercel** with visual/UX parity first, and a clean foundation for future enhancements. No backend services yet.

---

## 1) High-level objectives

- **Parity first:** replicate current pages, layout, content, and SEO signals.
- **Solid foundation:** modern stack, componentized UI, design tokens, accessibility, and performance baked in.
- **Low operational overhead:** deploy on Vercel with preview URLs, automated checks, and an easy content workflow to evolve later (e.g., add CMS/server later without rewrites).

---

## 2) Proposed tech stack

- **Framework:** **Next.js (App Router)** – ideal for Vercel, file-based routing, image optimization, and SEO.
- **Language:** **TypeScript** for safety and self-documenting code.
- **Styling:** **Tailwind CSS** + design tokens; optional **shadcn/ui** for accessible primitives.
- **Images/Icons:** `next/image` for optimization; SVG icons via `lucide-react`.
- **State/Forms:** Minimal local state; client/server components as needed. (Contact form can be stubbed or mailto: until backend added.)
- **Testing & Quality:** ESLint, Prettier, TypeCheck, **Playwright** (basic e2e), **Lighthouse CI** (perf budgets), **axe** (a11y).
- **Analytics (optional now):** Vercel Analytics or Plausible/GA4 later.
- **CI/CD:** Vercel Git integration with preview deployments on PRs.

---

## 3) Visual parity plan (scrape → extract → reproduce)

### 3.1 Crawl & capture
- **Tooling:** Node + **Playwright** (or Puppeteer).
- **Actions:**
  - Crawl public pages (home, services, projects/gallery, about, contact, legal pages) of https://taraniselectrical.co.uk/.
  - For each route:
    - Save **HTML snapshot** and computed styles.
    - Capture **full-page screenshots** (desktop 1440px, mobile 390px).
    - Download referenced **images**, **webfonts**, and **favicons** (for analysis; we’ll re-license/replace as needed).
  - Output structured inventory JSON (`/scripts/output/site-inventory.json`).

### 3.2 Derive design tokens
- **Colors:** Parse CSS variables and computed colors; cluster similar hex values; propose palette (primary, secondary, accent, neutrals, semantic).
- **Typography:** Extract font families, weights, sizes, line heights; map to Tailwind `fontSize` scale & font stack.
- **Spacing & radius:** Infer common spacing and border-radius values; map to Tailwind theme extensions.
- **Components:** Identify repeating patterns (cards, feature lists, testimonial blocks, logos bar, FAQ) to define reusable React components.

### 3.3 Asset handling & licensing
- **Logos & icons:** Ensure we have original source or create clean SVG equivalents.
- **Stock images:** If existing images are stock-licensed through the builder, we’ll either:
  - confirm license portability, or
  - replace with self-owned photos/placeholders now; swap later.
- **Fonts:** Confirm license. If unclear, substitute with a Google Font of similar metrics.

---

## 4) Content & IA (information architecture)

- **Home**
- **Services** – overview page + detail pages (EV charging, Solar PV, Battery storage, Domestic/Commercial electrical, EICR).
- **Projects / Gallery**
- **About**
- **Testimonials**
- **Contact**
- **Legal** – Privacy, Terms
- **(Optional later)** – Blog/Guides

---

## 5) Accessibility & SEO requirements

- **Accessibility:** semantic HTML, keyboard navigation, focus outlines, WCAG AA contrast, aria-labels, skip link.
- **SEO:** titles/descriptions per page, OG/Twitter cards, canonical URLs, sitemap, robots, LocalBusiness JSON-LD, headings hierarchy, alt text.

---

## 6) Performance targets

- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **Budgets:** images under 200KB hero, 100KB others; JS < 170KB gzipped.
- **Practices:** font subsetting, `display=swap`, critical CSS, lazy loading, route-level code splitting.

---

## 7) Component library (initial set)

- **Layout:** Header, Nav, MobileMenu, Footer, Container, Section, Breadcrumbs.
- **Content:** Hero, SectionHeading, RichText, Prose.
- **Cards & Lists:** ServiceCard, FeatureList, Stat, LogoCloud, Steps.
- **Testimonials:** TestimonialCard, TestimonialsCarousel.
- **Media:** ResponsiveImage, LightboxGallery, VideoEmbed.
- **Forms:** ContactForm (stub), Input, Textarea, Select, Checkbox.
- **CTAs:** PrimaryCTA, SecondaryCTA, StickyCTA.
- **Utility:** Badge, Alert, Tooltip.
- **Map (optional):** Static now, interactive later.

---

## 8) Migration steps (end-to-end)

1. Repo setup – Next.js + TS + Tailwind; CI (lint, typecheck); Vercel project.
2. Automated crawl – run Playwright script; produce inventory & screenshots.
3. Design tokens – derive palette/typography/spacing; commit Tailwind config.
4. Component scaffolding – build base UI primitives and blocks.
5. Page builds – Home → Services → Projects → About → Contact → Legal.
6. Content load – copy text content; optimize images; create alt text.
7. SEO & a11y – metadata, JSON-LD, sitemap/robots, axe fixes.
8. Perf passes – image compression, font subsetting, bundle analysis.
9. QA & parity check – compare vs screenshots; fix visual diffs.
10. Go-live – cutover DNS to Vercel; monitor vitals.

---

## 9) Scripts & automation

- **Crawl (Playwright):** screenshots, HTML, styles → JSON inventory.
- **Color/font extraction:** parse styles → `tokens.json` → Tailwind config.
- **Image pipeline:** optimize to WebP/AVIF.
- **Lighthouse CI:** perf budgets in CI.
- **Axe CI:** accessibility check.

---

## 10) Content to collect/confirm

- Logo (SVG), accreditations, service area, contact details, testimonials, project photos, legal pages.
