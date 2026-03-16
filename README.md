# Taranis Electrical Website

A modern, responsive website for Taranis Electrical - professional electrical services across the UK.

## 🚀 Features

- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS v4
- **Responsive Design**: Mobile-first design that works on all devices  
- **Performance Optimized**: Fast loading with Core Web Vitals optimization
- **SEO Ready**: Structured data, meta tags, and sitemap
- **Accessibility**: WCAG AA compliant with keyboard navigation
- **Professional UI**: Clean, modern design with consistent branding

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Testing**: Playwright
- **Code Quality**: ESLint, Prettier

## 🏗️ Services Covered

- EV Charging Installation
- Solar PV Systems
- Battery Storage Solutions
- Domestic Electrical Work
- Commercial Electrical Services
- EICR Testing & Certification

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taranis-electrical
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run test:e2e` - Run Playwright tests
- `npm run crawl` - Crawl existing site for design analysis
- `npm run extract-tokens` - Extract design tokens from crawled data

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            
│   ├── ui/                # Base UI components
│   ├── layout/            # Layout components
│   ├── content/           # Content components
│   └── seo/               # SEO components
├── lib/                   # Utility functions
└── styles/                # Global styles

scripts/
├── crawl-site.ts         # Automated site crawling
└── extract-design-tokens.ts  # Design token extraction
```

## 🎨 Design System

The project uses a custom design system built with Tailwind CSS:

- **Colors**: Primary blue, secondary orange, neutral grays
- **Typography**: Inter font family with semantic sizing
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI primitives

## 🔧 Development Workflow

1. **Design Token Extraction**: Automated crawling of existing site to extract colors, fonts, and spacing
2. **Component Development**: Building reusable components with TypeScript
3. **Page Implementation**: Creating pages with visual parity to existing site
4. **Testing**: E2E testing with Playwright
5. **Deployment**: Automated deployment with Vercel

## 🌐 Deployment

The site is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables if needed
3. Deploy automatically on push to main branch

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP < 2.5s, CLS < 0.1, INP < 200ms
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Images**: Optimized with Next.js Image component
- **Fonts**: Font optimization and display swap

## 🔍 SEO Features

- Meta tags and Open Graph data
- JSON-LD structured data for Local Business
- Semantic HTML structure
- Sitemap generation
- Canonical URLs

## ♿ Accessibility

- WCAG AA compliance
- Keyboard navigation support
- Screen reader optimization
- Focus management
- Color contrast compliance

## 🧪 Testing

End-to-end testing with Playwright:

```bash
npm run test:e2e
```

## 📝 License

This project is proprietary and confidential.

## 📞 Contact

For questions about this project:

- **Email**: info@taraniselectrical.co.uk  
- **Phone**: 07123 456 789
- **Website**: https://taraniselectrical.co.uk

---

Built with ❤️ for Taranis Electrical
