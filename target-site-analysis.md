# Target Website Analysis: taraniselectrical.co.uk

## Tech Stack
- **CSS Framework**: Bootstrap 5.1.1
- **Font**: Inter, Arial, sans-serif (body); Roboto also loaded
- **Icons**: Font Awesome (fas classes)
- **Built with**: Tradify/TradeHQ website builder

## Color Scheme
- **Primary accent**: `rgb(222, 135, 63)` (orange) - used for section headings, service icons, footer bg
- **Body text**: `rgb(33, 37, 41)` (dark gray/Bootstrap default)
- **Hero text**: white (`rgb(255, 255, 255)`)
- **Hero button**: white bg, black text (inverted)
- **Section headings**: orange `rgb(222, 135, 63)`, font-weight 800, ~33.6px
- **Hero H1**: white, font-weight 800, ~34px
- **Nav links**: black, font-size 12.8px, font-weight 500
- **Services section bg**: `rgb(249, 249, 249)` (light gray)
- **Footer bg**: `rgb(222, 135, 63)` (orange), white text
- **Service icon bg**: `rgba(222, 135, 63, 0.1)` (10% orange), icon color orange

## Overall Page Structure

Single-page layout with anchor navigation. Sections in order:

### 1. Header (Fixed)
- `position: fixed`, `z-index: 1030`, transparent background
- Classes: `fixed-top container-fluid g-3 header`
- Contains `<nav class="navbar navbar-expand-md navbar-light">`
- **Logo**: Left-aligned, ~126x80px, links to `#top`
- **Nav menu**: `<ul class="navbar-nav ms-auto mb-lg-0 p-2">` with **white background**, `border-radius: 5px` - appears as a floating white pill/box
- Nav items: Home, Contact us, Our work, Services, Testimonials (all anchor links)

### 2. Hero Section (`#hero-section`)
- Classes: `hero-section container-fluid g-3`
- Background: `linear-gradient(90deg, rgb(0,0,0) 0%, transparent 65%, transparent 100%)` overlaid on a hero image (lightbulb photo)
- Background size: cover
- Padding top: 112px (accounts for fixed header)
- Height: ~786px
- Inner layout: `.row.align-items-center.py-5` > `.col-md-5.order-2.order-md-1` (content on left ~40% width)
- Content:
  - H1: "Electrical Experts in Hemel Hempstead" (white, 34px, weight 800)
  - Paragraph: Company description (white, 19.2px)
  - Button: "Get in touch" (white bg, black text, `.btn.btn-primary`, border-radius 4px)

### 3. Enquiry Section (`#enquiry-section`)
- Classes: `container-lg g-3 enquiry-section`
- Anchor: `#enquiry`
- Layout: centered column, py-5
- H1: "How can we help?" (orange)
- Subtitle paragraph
- Form with fields: Name, Email address, Phone, Job address, Job description (textarea with helper text), Attachments (file upload with drag-drop)
- reCAPTCHA
- Submit button: "Send your enquiry" (disabled until reCAPTCHA completed)

### 4. Our Work / Gallery Section (`#our-work-section`)
- Classes: `container-lg g-md-3 our-work-section`
- Anchor: `#our-work`
- H1: "Our work" (orange, centered)
- Bootstrap carousel with 8 gallery images
- Images in `col-sm-3` grid (4 per row on desktop)
- Gallery item class: `.gallery-item-crop` wrapping each `<img>`

### 5. Contact Us Section (`#contact-us-section`)
- Classes: `container-fluid g-3 p-0 contact-us-section`
- Anchor: `#contact-us`
- White background
- Inner: `.col.contact-outer` (display: flex)
- Contains:
  - Google Maps embed (map of area)
  - Contact details block with:
    - H1: "Contact us" (orange)
    - Location: "Hemel Hempstead, UK" (with icon)
    - Email: taraniselectrical@outlook.com (with icon, mailto link)
    - Phone: 07925423673 (with icon, tel link)

### 6. Services Section (`#services-section`)
- Classes: `services-section container-fluid g-3`
- Anchor: `#services`
- Background: `rgb(249, 249, 249)` (light gray)
- H1: "Our services" (orange)
- 5 service cards in a grid: `.row.py-5.services`
- Each card: `.service-item.col-md-6.col-lg-4.mt-3.px-3`
  - Icon container: 48x48px, bg `rgba(222,135,63,0.1)`, border-radius 4px, orange icon
  - H2: service name
  - Paragraph: "-" (placeholder text)
- Services listed:
  1. Domestic and Commercial Installations (fa-building)
  2. Full or Partial Rewires (fa-tools)
  3. Extra Lighting and Sockets (fa-lightbulb)
  4. Fuse Board Upgrade (fa-wrench)
  5. Maintenance Contracts (fa-tools)

### 7. Testimonials Section (`#testimonials-section`)
- Classes: `container-lg g-0 g-md-3 mb-md-5 testimonials-section`
- Anchor: `#testimonials`
- H1: "Testimonials" (white, weight 800) - likely has dark background behind caption
- Subtitle: "Take a look at what customers say about Taranis electrical"
- Bootstrap carousel (`.carousel.carousel-dark.slide`) with border
- Testimonial items have: SVG quote icon, blockquote text, figure with avatar image + figcaption (name + role)
- Box shadow: `rgba(0,0,0,0.1) 0px 0px 30px 0px`
- Prev/Next carousel controls

### 8. Footer
- Classes: `footer text-white container-fluid g-3`
- Background: `rgb(222, 135, 63)` (orange)
- Inner: `.row.py-md-5.py-3`
- 3-column layout on md+ (`col-md-4`):
  1. Logo image
  2. Email icon + taraniselectrical@outlook.com (mailto)
  3. Phone icon + 07925423673 (tel)
- Additional row:
  - Location: "Hemel Hempstead, UK"
  - Instagram link (https://www.instagram.com/taranis_electrical_)
- Bottom: "Powered by Tradify Electrical Management Software"

## Key Layout Patterns
- Uses Bootstrap 5 grid system extensively (container-fluid, container-lg, row, col-*)
- Responsive breakpoints: md (navbar expand), sm (gallery cols), lg (service cards 3-col)
- Fixed header with transparent bg overlaying hero
- Single-page with smooth scroll anchor navigation
- Sections alternate between full-width (container-fluid) and constrained (container-lg)
- Orange accent color used consistently throughout
