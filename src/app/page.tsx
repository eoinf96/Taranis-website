import { Hero } from '@/components/content/hero'
import { EnquiryForm } from '@/components/content/enquiry-form'
import { TestimonialCarousel } from '@/components/content/testimonial-carousel'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { LocalBusinessJsonLd, ElectricalServiceJsonLd } from '@/components/seo/json-ld'
import {
  Building,
  Cable,
  Lightbulb,
  ShieldCheck,
  Wrench,
  Phone,
  MapPin,
  Mail
} from 'lucide-react'

const services = [
  { title: 'Domestic and Commercial Installations', icon: Building },
  { title: 'Full or Partial Rewires', icon: Cable },
  { title: 'Extra Lighting and Sockets', icon: Lightbulb },
  { title: 'Fuse Board Upgrade', icon: ShieldCheck },
  { title: 'Maintenance Contracts', icon: Wrench },
]

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <ElectricalServiceJsonLd />
      <Hero
        title="Electrical Experts in Hemel Hempstead"
        description="Named after the Gaelic god of thunder, Taranis Electrical provides top-quality electrical services for both commercial and domestic clients. With over 10 years experience, we are known for our reliability and outstanding service. NAPIT-approved."
      />

      <EnquiryForm />

      <Section id="gallery">
        <SectionHeading
          title="Our work"
          centered
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="aspect-square bg-neutral-200 rounded"></div>
          ))}
        </div>
      </Section>

      <Section id="contact" className="py-0">
        <div className="h-[400px] w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39571.0!2d-0.47!3d51.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876444b0e7e2e3b%3A0x4e7b5c5e4e6a5c5e!2sHemel%20Hempstead!5e0!3m2!1sen!2suk!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Taranis Electrical location"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Contact us"
          centered
        />
        <div className="max-w-md mx-auto space-y-4 text-center">
          <p className="text-neutral-700">Hemel Hempstead, UK</p>
          <a href="mailto:taraniselectrical@outlook.com" className="block text-primary hover:underline">
            taraniselectrical@outlook.com
          </a>
          <a href="tel:07925423673" className="block text-primary hover:underline">
            07925423673
          </a>
        </div>
      </Section>

      <Section id="services" className="bg-[rgb(249,249,249)]">
        <SectionHeading
          title="Our services"
          centered
        />
        <div className="space-y-4 max-w-3xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.title} className="flex items-center gap-4">
                <Icon className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h2 className="text-base font-semibold text-primary">{service.title}</h2>
                  <div className="text-neutral-500">-</div>
                </div>
              </div>
            )
          })}
        </div>
      </Section>

      <TestimonialCarousel />
    </>
  )
}
