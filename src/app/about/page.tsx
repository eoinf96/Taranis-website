import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import Link from 'next/link'
import { CheckCircle2, Shield, Award, Users, Phone } from 'lucide-react'

const certifications = [
  'NAPIT Approved Contractor',
  '18th Edition Qualified',
  'Part P Certified',
  'Fully Insured (Public Liability)',
]

const values = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All work carried out to the highest safety standards with full certifications and testing.',
  },
  {
    icon: Award,
    title: 'Quality Guaranteed',
    description: 'Workmanship guarantee on all installations — we take pride in getting it right first time.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Transparent pricing, clear communication, and a tidy finish on every job.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Taranis Electrical"
        description="Named after the Gaelic god of thunder, Taranis Electrical provides top-quality electrical services for both commercial and domestic clients in Hemel Hempstead and the surrounding area."
        ctaText="Get in touch"
        ctaHref="/#enquiry"
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="Professional Electrical Contractor"
              subtitle="Who We Are"
              description="With over 10 years of experience, we are known for our reliability and outstanding service."
            />
            <p className="text-neutral-600 mb-6 leading-relaxed">
              Our electrician is committed to providing safe, reliable, and professional electrical
              services across Hemel Hempstead and the surrounding area. We stay up-to-date with
              the latest regulations to ensure every installation meets the highest standards.
            </p>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              From consumer unit replacements and full rewires to extra sockets, lighting, and
              maintenance contracts, we have the expertise to handle any electrical project for
              domestic and commercial clients.
            </p>
            <Link
              href="/#enquiry"
              className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-primary-600 transition-colors"
            >
              Get in touch
            </Link>
          </div>
          <div className="bg-neutral-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Our Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-neutral-700">{cert}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <a
                href="tel:07925423673"
                className="inline-flex items-center space-x-2 text-primary hover:underline"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">07925 423 673</span>
              </a>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <SectionHeading
          title="Why Choose Us"
          subtitle="Our Values"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">{value.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bg-white border border-neutral-200 rounded-lg p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4">
            Based in Hemel Hempstead
          </h2>
          <p className="text-neutral-600 mb-8 max-w-xl mx-auto leading-relaxed">
            We serve Hemel Hempstead and the surrounding area. Get in touch to discuss your
            project and we will get back to you as soon as possible.
          </p>
          <Link
            href="/#enquiry"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-primary-600 transition-colors"
          >
            Send an enquiry
          </Link>
        </div>
      </Section>
    </>
  )
}
