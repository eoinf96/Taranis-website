import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get In Touch"
        description="Ready to start your electrical project? Fill in the enquiry form or reach out to us directly."
        ctaText="Send an enquiry"
        ctaHref="/#enquiry"
      />

      <Section>
        <SectionHeading
          title="Contact us"
          centered
        />
        <div className="max-w-lg mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-neutral-700">Phone</p>
              <a href="tel:07925423673" className="text-primary hover:underline">
                07925 423 673
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-neutral-700">Email</p>
              <a href="mailto:taraniselectrical@outlook.com" className="text-primary hover:underline break-all">
                taraniselectrical@outlook.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-neutral-700">Location</p>
              <p className="text-neutral-600">Hemel Hempstead, UK</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Instagram className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-medium text-neutral-700">Instagram</p>
              <a
                href="https://www.instagram.com/taranis_electrical_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @taranis_electrical_
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-neutral-600 mb-4">
            Prefer to send us the details of your job?
          </p>
          <Link
            href="/#enquiry"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded hover:bg-primary-600 transition-colors"
          >
            Fill in our enquiry form
          </Link>
        </div>
      </Section>
    </>
  )
}
