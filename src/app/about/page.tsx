import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, Award, Users, Shield, Phone } from 'lucide-react'

const certifications = [
  'NICEIC Approved Contractor',
  'MCS Certified Installer', 
  'OZEV Approved Installer',
  '18th Edition Qualified',
  'Part P Certified',
  'Fully Insured (£2M Public Liability)'
]

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All work carried out to the highest safety standards with full certifications and testing.'
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: '12 month workmanship guarantee on all installations with manufacturer warranties.'
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Transparent pricing, clear communication, and dedicated customer service throughout.'
  }
]

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Taranis Electrical"
        subtitle="Professional & Trusted"
        description="We&apos;re a team of qualified electricians providing professional electrical services across the UK. From renewable energy installations to traditional electrical work."
        ctaPrimary={{ text: 'Get Free Quote', href: '/contact' }}
        ctaSecondary={{ text: 'View Our Services', href: '/services' }}
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="Professional Electrical Contractors"
              subtitle="Who We Are"
              description="With years of experience in the electrical industry, we specialize in both traditional electrical work and modern renewable energy solutions."
            />
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Our team of qualified electricians are committed to providing safe, reliable, and 
              professional electrical services across the UK. We stay up-to-date with the latest 
              regulations and technologies to ensure every installation meets the highest standards.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              From EV charging installations and solar PV systems to complete house rewires and 
              commercial electrical work, we have the expertise and certifications to handle any 
              electrical project.
            </p>
            <Button asChild>
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Our Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-neutral-700">{cert}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <p className="text-sm text-neutral-600 mb-3">
                <strong>Emergency Call Out:</strong> Available 24/7 for urgent electrical issues
              </p>
              <a 
                href="tel:+447123456789"
                className="inline-flex items-center space-x-2 text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">07123 456 789</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <SectionHeading
          title="Why Choose Us"
          subtitle="Our Values"
          description="We&apos;re committed to delivering exceptional electrical services with a focus on safety, quality, and customer satisfaction."
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                {value.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-white border border-neutral-200 rounded-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
                Service Areas
              </h2>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                We provide electrical services across the UK, with particular focus on:
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-neutral-600">
                <div>• Greater Manchester</div>
                <div>• West Midlands</div>
                <div>• London & South East</div>
                <div>• Yorkshire</div>
                <div>• North West England</div>
                <div>• Scotland (Central Belt)</div>
              </div>
              <p className="text-sm text-neutral-500 mt-4">
                * Emergency call-out available nationwide
              </p>
            </div>
            <div className="bg-primary/5 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
              <p className="text-neutral-600 mb-4">
                Ready to begin your electrical project? Get in touch for a free, 
                no-obligation quote and consultation.
              </p>
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link href="/contact">Request Free Quote</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <a href="tel:+447123456789">Call: 07123 456 789</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}