import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { ServiceCard } from '@/components/content/service-card'
import { Button } from '@/components/ui/button'
import { LocalBusinessJsonLd, ElectricalServiceJsonLd } from '@/components/seo/json-ld'
import { 
  Zap, 
  Sun, 
  Battery, 
  Home as HomeIcon, 
  Building, 
  Shield, 
  CheckCircle2, 
  Star,
  Phone
} from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    title: 'EV Charging Installation',
    description: 'Professional EV charging point installation for homes and businesses. Government grants available.',
    icon: Zap,
    href: '/services/ev-charging',
    features: ['OZEV Approved Installer', 'Government Grants Available', 'All Brands Supported']
  },
  {
    title: 'Solar PV Installation', 
    description: 'Reduce energy bills with professional solar panel installation. MCS certified installations.',
    icon: Sun,
    href: '/services/solar-pv',
    features: ['MCS Certified', 'Battery Ready', '25 Year Warranty']
  },
  {
    title: 'Battery Storage Systems',
    description: 'Store solar energy and reduce grid dependency with our battery storage solutions.',
    icon: Battery,
    href: '/services/battery-storage', 
    features: ['Tesla Powerwall', 'Grid Backup', 'Smart Controls']
  },
  {
    title: 'Domestic Electrical',
    description: 'Complete electrical services for homes including rewiring, consumer units, and installations.',
    icon: HomeIcon,
    href: '/services/domestic',
    features: ['Rewiring', 'Consumer Units', 'Fault Finding']
  },
  {
    title: 'Commercial Electrical',
    description: 'Professional electrical solutions for businesses, offices, and industrial facilities.',
    icon: Building,
    href: '/services/commercial',
    features: ['Emergency Lighting', 'PAT Testing', 'Maintenance Contracts']
  },
  {
    title: 'EICR Testing',
    description: 'Electrical Installation Condition Reports for safety compliance and insurance requirements.',
    icon: Shield,
    href: '/services/eicr',
    features: ['Same Day Reports', 'Landlord Compliance', 'Remedial Work']
  }
]

const whyChooseUs = [
  'NICEIC Approved Contractor',
  'Fully Insured & Qualified',
  '24/7 Emergency Call Out',
  'Free No-Obligation Quotes',
  'Government Scheme Approved',
  '12 Month Workmanship Guarantee'
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Manchester',
    rating: 5,
    text: 'Excellent service from start to finish. Professional installation of our EV charger with government grant applied. Highly recommended!'
  },
  {
    name: 'Mike Thompson', 
    location: 'Birmingham',
    rating: 5,
    text: 'Great work on our solar panel installation. The team was professional, tidy, and completed on time. Very happy with the results.'
  },
  {
    name: 'Emma Wilson',
    location: 'London',
    rating: 5,
    text: 'Fast response for electrical fault finding. Fixed the issue quickly and provided clear explanation of the problem. Will use again.'
  }
]

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <ElectricalServiceJsonLd />
      <Hero
        title="Professional Electrical Services Across the UK"
        subtitle="Trusted & Certified"
        description="From EV charging and solar installations to domestic and commercial electrical work. NICEIC approved contractors with 24/7 emergency services."
        features={[
          'NICEIC Approved Contractor',
          'Government Grants Available', 
          '24/7 Emergency Service',
          'Free Quotes & Surveys'
        ]}
      />

      <Section>
        <SectionHeading
          title="Our Electrical Services"
          subtitle="What We Do"
          description="Comprehensive electrical services for homes and businesses across the UK. From modern energy solutions to traditional electrical work."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="Why Choose Taranis Electrical?"
              subtitle="Trusted Experts"
              description="We're committed to providing safe, reliable, and professional electrical services with full certifications and insurance."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {whyChooseUs.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+447123456789" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </Button>
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Emergency Call Out</h3>
            <div className="space-y-4 text-neutral-600">
              <p>Need urgent electrical help? Our emergency electricians are available 24/7 across the UK.</p>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-primary">24/7 Emergency Line</span>
                </div>
                <a href="tel:+447123456789" className="text-2xl font-bold text-neutral-900">
                  07123 456 789
                </a>
              </div>
              <p className="text-sm">
                • Power outages • Electrical faults • Safety concerns • Emergency repairs
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Testimonials"
          description="Don't just take our word for it. See what our satisfied customers have to say about our electrical services."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200">
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-600 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <div>
                <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                <div className="text-sm text-neutral-500">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, no-obligation quote on any of our electrical services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get Free Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <a href="tel:+447123456789" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>07123 456 789</span>
              </a>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
