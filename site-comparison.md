# Site Comparison: Target vs Local Development

> **IMPORTANT**: Keep our current tech stack (Next.js, Tailwind CSS v4, React 19). Do NOT replicate Bootstrap or their specific implementation. Focus on VISUAL SIMILARITY only -- design, layout, colors, typography, spacing, and overall look and feel. All implementation should use our existing Tailwind/Next.js patterns.

## Summary of Major Differences

The local site is a generic, multi-page Next.js + Tailwind CSS site focused on UK-wide electrical services (EV charging, solar, etc.). The target site is a single-page Bootstrap 5 site specific to Taranis Electrical in Hemel Hempstead. They share almost no structural similarity.

---

## 1. Tech Stack

| Aspect | Target Site | Local Dev Site (KEEP AS-IS) |
|--------|------------|----------------|
| Framework | Static HTML / TradeHQ | Next.js (keep) |
| CSS | Bootstrap 5.1.1 | Tailwind CSS v4 (keep) |
| Font | Inter, Arial, sans-serif | Arial, Helvetica, sans-serif |
| Icons | Font Awesome | SVG/inline |
| Structure | Single-page with anchors | Multi-page with routes |

## 2. Color Scheme

| Element | Target | Local |
|---------|--------|-------|
| Primary accent | `rgb(222, 135, 63)` (orange) | `rgb(13, 110, 253)` (blue) |
| Body bg | white `rgb(255, 255, 255)` | dark `rgb(10, 10, 10)` |
| Body text | dark `rgb(33, 37, 41)` | light `rgb(237, 237, 237)` |
| Section headings | orange `rgb(222, 135, 63)` | black `rgb(0, 0, 0)` |
| Hero text | white | white |
| Hero bg | Image + gradient overlay | Solid black `rgb(0, 0, 0)` |
| Footer bg | orange `rgb(222, 135, 63)` | black `rgb(0, 0, 0)` |
| Button (primary) | white bg, black text | blue bg, white text |
| Services section bg | `rgb(249, 249, 249)` light gray | transparent |

## 3. Header / Navigation

| Aspect | Target | Local |
|--------|--------|-------|
| Position | `fixed` (transparent, overlays hero) | `sticky` top |
| Background | transparent `rgba(0,0,0,0)` | white with shadow |
| Logo | Image logo (~126x80px) | Text "T" + "Taranis Electrical" |
| Nav links | In white rounded box (bg white, border-radius 5px) | Hidden in hamburger menu |
| Nav items | Home, Contact us, Our work, Services, Testimonials | Not visible (mobile menu) |
| z-index | 1030 | 50 |

## 4. Sections Comparison

### Target Site Sections (in order):
1. **Hero** - Full-screen bg image with gradient, content on left col-md-5
2. **Enquiry Form** - "How can we help?" with contact form
3. **Our Work Gallery** - 8 images in carousel grid (powered by Instagram plugin - Phase 1: placeholder only)
4. **Contact Us** - Google Maps + contact details
5. **Services** - 5 service cards with icons (col-md-6 col-lg-4)
6. **Testimonials** - Carousel with quotes
7. **Footer** - Orange, 3-column with logo/email/phone

### Local Site Sections (in order):
1. **Hero** - "Professional Electrical Services Across the UK" with badges/CTAs
2. **Services** - 6 detailed service cards with descriptions and feature lists (EV Charging, Solar PV, Battery Storage, Domestic, Commercial, EICR)
3. **Why Choose Us** - Trust badges and emergency call-out
4. **Testimonials** - 3 static testimonial cards
5. **CTA** - "Ready to Get Started?" blue banner
6. **Footer** - Black, multi-column with service links, company links, contact info, accreditations

## 5. Key Structural Differences

### Hero Section
- **Target**: Background image (lightbulb) with left-to-right black gradient. Content restricted to left 40% (col-md-5). "Get in touch" button (white bg).
- **Local**: Solid dark background, full-width centered text. "Get Free Quote" + "Call Now" buttons (blue).

### Services
- **Target**: Simple cards with icon (48x48, orange bg container) + heading + dash placeholder text. 5 services: Domestic/Commercial Installations, Rewires, Lighting/Sockets, Fuse Board, Maintenance.
- **Local**: Detailed cards with description paragraphs, bullet-point feature lists, and "Learn more" links. 6 services: EV Charging, Solar PV, Battery Storage, Domestic, Commercial, EICR.

### Contact/Enquiry
- **Target**: Has a full enquiry form ("How can we help?") with Name, Email, Phone, Job address, Job description, Attachments, reCAPTCHA. Also a Contact Us section with Google Maps embed.
- **Local**: No contact form on homepage. Links to `/contact` route.

### Gallery
- **Target**: "Our work" section with 8 gallery images in Bootstrap carousel (col-sm-3 grid).
- **Local**: No gallery section.

### Testimonials
- **Target**: Bootstrap carousel (one at a time) with avatar, name, role, blockquote. Prev/Next controls.
- **Local**: 3 static cards side-by-side with quote marks, name, location.

### Footer
- **Target**: Orange bg, simple 3-col (logo, email, phone), location, Instagram link, "Powered by Tradify".
- **Local**: Black bg, complex multi-column with Services links, Company links, Contact info, Accreditation badges, Privacy/Terms links.

## 6. Content Differences

| Content | Target | Local |
|---------|--------|-------|
| Business name | Taranis Electrical | Taranis Electrical |
| Location | Hemel Hempstead, UK | "Across the UK" |
| Phone | 07925423673 | 07123 456 789 (placeholder) |
| Email | taraniselectrical@outlook.com | info@taraniselectrical.co.uk |
| Certification | NAPIT-approved | NICEIC Approved (different!) |
| Social | Instagram (@taranis_electrical_) | None |
| Experience | "Over 10 years" | Not mentioned |
| Tagline | "Named after the Gaelic god of thunder" | "Trusted & Certified" |

## 7. Implementation Priority (Phase 1 - Structure & Layout)

To match the target site, the local site needs:

1. **Convert to single-page layout** with anchor navigation instead of multi-page routing
2. **Fix header**: Make it fixed/transparent, overlay on hero. Add actual logo image. Create white rounded nav box with correct links.
3. **Hero section**: Add background image with gradient overlay. Restrict content to left ~40%. Update text content and button style.
4. **Add Enquiry Form section**: Full form with fields matching target
5. **Add Gallery section**: "Our work" section with placeholder (NOTE: target uses Instagram plugin integration - actual feed is OUT OF SCOPE for Phase 1, use placeholder content)
6. **Add Contact Us section**: Google Maps embed + contact details with icons
7. **Update Services section**: Match target's 5 services with icon + heading layout
8. **Update Testimonials**: Switch to carousel format with avatar/name/role
9. **Update Footer**: Orange background, simple 3-column layout
10. **Update color scheme**: Primary accent from blue to orange `rgb(222, 135, 63)`
11. **Update content**: Correct phone, email, location, certifications, descriptions
