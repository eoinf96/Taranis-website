import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Residential Solar & Battery Installation',
    location: 'Manchester, UK',
    description: '10kW solar array with Tesla Powerwall 2 battery storage system for a family home.',
    image: '/placeholder-solar.jpg',
    services: ['Solar PV', 'Battery Storage', 'Smart Meter'],
    year: '2024'
  },
  {
    title: 'Commercial EV Charging Hub',
    location: 'Birmingham, UK', 
    description: '8-bay EV charging station for office complex with load management system.',
    image: '/placeholder-ev.jpg',
    services: ['EV Charging', 'Load Management', 'Commercial Install'],
    year: '2024'
  },
  {
    title: 'Complete House Rewire',
    location: 'London, UK',
    description: 'Full electrical rewire of Victorian terrace with modern consumer unit and smart controls.',
    image: '/placeholder-rewire.jpg', 
    services: ['Full Rewire', 'Consumer Unit', 'Smart Lighting'],
    year: '2023'
  },
  {
    title: 'Industrial Electrical Installation',
    location: 'Leeds, UK',
    description: 'New electrical installation for manufacturing facility including three-phase power distribution.',
    image: '/placeholder-industrial.jpg',
    services: ['Three Phase', 'Industrial Install', 'Emergency Lighting'],
    year: '2023'
  },
  {
    title: 'Solar Farm Connection',
    location: 'Scotland, UK',
    description: '50kW solar farm with grid connection and monitoring systems.',
    image: '/placeholder-solar-farm.jpg',
    services: ['Solar PV', 'Grid Connection', 'Monitoring'],
    year: '2023'
  },
  {
    title: 'Office Electrical Upgrade',
    location: 'Bristol, UK',
    description: 'Complete electrical upgrade for modern office including LED lighting and EV charging.',
    image: '/placeholder-office.jpg',
    services: ['LED Lighting', 'EV Charging', 'Office Fit-out'],
    year: '2024'
  }
]

export default function ProjectsPage() {
  return (
    <>
      <Hero
        title="Our Latest Projects"
        subtitle="Case Studies"
        description="Explore our recent electrical installations across the UK. From residential solar installations to commercial EV charging hubs."
        ctaPrimary={{ text: 'Get Quote for Your Project', href: '/contact' }}
        ctaSecondary={{ text: 'View All Services', href: '/services' }}
      />

      <Section>
        <SectionHeading
          title="Recent Projects"
          subtitle="Our Work"
          description="A selection of our recent electrical installations showcasing our expertise across different sectors."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-neutral-100 flex items-center justify-center">
                <span className="text-neutral-400 text-sm">Project Image</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-neutral-500">{project.year}</span>
                  <span className="text-sm text-neutral-500">{project.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-neutral-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.services.map((service, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary text-white">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Get in touch today for a free consultation and quote for your electrical project.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact" className="inline-flex items-center space-x-2">
              <span>Get Free Quote</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  )
}