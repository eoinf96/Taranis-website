import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { ServiceCard } from '@/components/content/service-card'
import { 
  Zap, 
  Sun, 
  Battery, 
  Home as HomeIcon, 
  Building, 
  Shield
} from 'lucide-react'

const services = [
  {
    title: 'EV Charging Installation',
    description: 'Professional EV charging point installation for homes and businesses. OZEV approved installer with government grants available.',
    icon: Zap,
    href: '/services/ev-charging',
    features: ['OZEV Approved Installer', 'Government Grants Available', 'All Brands Supported', 'Tethered & Untethered Options']
  },
  {
    title: 'Solar PV Installation', 
    description: 'Reduce energy bills with professional solar panel installation. MCS certified installations with 25 year warranties.',
    icon: Sun,
    href: '/services/solar-pv',
    features: ['MCS Certified', 'Battery Ready Systems', '25 Year Warranty', 'Energy Monitoring']
  },
  {
    title: 'Battery Storage Systems',
    description: 'Store solar energy and reduce grid dependency with our battery storage solutions including Tesla Powerwall.',
    icon: Battery,
    href: '/services/battery-storage', 
    features: ['Tesla Powerwall Certified', 'Grid Backup Capability', 'Smart Controls', 'Scalable Systems']
  },
  {
    title: 'Domestic Electrical',
    description: 'Complete electrical services for homes including rewiring, consumer units, additional sockets, and lighting.',
    icon: HomeIcon,
    href: '/services/domestic',
    features: ['Full Rewiring', 'Consumer Unit Upgrades', 'Additional Sockets', 'LED Lighting']
  },
  {
    title: 'Commercial Electrical',
    description: 'Professional electrical solutions for businesses, offices, and industrial facilities with maintenance contracts.',
    icon: Building,
    href: '/services/commercial',
    features: ['Emergency Lighting', 'PAT Testing', 'Maintenance Contracts', '24/7 Call Out']
  },
  {
    title: 'EICR Testing',
    description: 'Electrical Installation Condition Reports for safety compliance and insurance requirements with same day reports.',
    icon: Shield,
    href: '/services/eicr',
    features: ['Same Day Reports', 'Landlord Compliance', 'Remedial Work Included', 'Insurance Approved']
  }
]

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Professional Electrical Services"
        subtitle="Comprehensive Solutions"
        description="From modern energy solutions like EV charging and solar installations to traditional electrical work. All services delivered by NICEIC approved contractors."
        features={[
          'NICEIC Approved Contractor',
          'All Work Guaranteed', 
          'Free Quotes & Surveys',
          'Emergency Call Out Available'
        ]}
      />

      <Section>
        <SectionHeading
          title="Our Services"
          subtitle="What We Offer"
          description="Comprehensive electrical services covering everything from renewable energy installations to traditional electrical work."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Section>
    </>
  )
}