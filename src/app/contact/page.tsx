import { Hero } from '@/components/content/hero'
import { Section, SectionHeading } from '@/components/content/section-heading'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    primary: '07123 456 789',
    secondary: '24/7 Emergency Line',
    href: 'tel:+447123456789',
    description: 'Call us directly for immediate assistance or to discuss your project.'
  },
  {
    icon: Mail,
    title: 'Email',
    primary: 'info@taraniselectrical.co.uk',
    secondary: 'Response within 2 hours',
    href: 'mailto:info@taraniselectrical.co.uk',
    description: 'Send us an email with details of your electrical requirements.'
  },
  {
    icon: MapPin,
    title: 'Service Area',
    primary: 'UK Wide Coverage',
    secondary: 'Emergency call-out available',
    href: '#coverage',
    description: 'We provide services across the UK with emergency coverage nationwide.'
  }
]

const services = [
  'EV Charging Installation',
  'Solar PV Systems',
  'Battery Storage',
  'Domestic Electrical',
  'Commercial Electrical', 
  'EICR Testing',
  'Emergency Call-out',
  'Maintenance Contracts'
]

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Get In Touch"
        description="Ready to start your electrical project? Get in touch today for a free, no-obligation quote."
        ctaText="Call Now: 07925 423 673"
        ctaHref="tel:+447925423673"
      />

      <Section>
        <SectionHeading
          title="How to Reach Us"
          subtitle="Get In Touch"
          description="Choose the method that works best for you. We&apos;re here to help with all your electrical needs."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-neutral-200 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <method.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {method.title}
              </h3>
              <a 
                href={method.href}
                className="text-primary hover:underline font-medium text-lg block mb-1"
              >
                {method.primary}
              </a>
              <p className="text-sm text-neutral-500 mb-3">{method.secondary}</p>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-neutral-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <SectionHeading
              title="Request a Free Quote"
              subtitle="Get Started"
              description="Tell us about your electrical project and we&apos;ll provide a detailed, no-obligation quote."
            />
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                  Service Required *
                </label>
                <select
                  id="service"
                  required
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select a service...</option>
                  {services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  placeholder="Please describe your electrical requirements, including location and any specific details..."
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Quote Request
              </Button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-semibold">Response Times</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Email Enquiries:</span>
                  <span className="font-medium">Within 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Quote Requests:</span>
                  <span className="font-medium">Same day</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Emergency Call-out:</span>
                  <span className="font-medium text-error">24/7</span>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-6 rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Emergency Contact</h3>
              </div>
              <p className="mb-4 text-primary-100">
                Electrical emergency? Don&apos;t wait - call our 24/7 emergency line now.
              </p>
              <Button variant="secondary" asChild className="w-full">
                <a href="tel:+447123456789" className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>07123 456 789</span>
                </a>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
              <h3 className="text-lg font-semibold mb-3">What Happens Next?</h3>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">1</div>
                  <span>We&apos;ll review your enquiry and get back to you within 2 hours</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">2</div>
                  <span>Schedule a free site survey and consultation</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">3</div>
                  <span>Provide detailed quote with no hidden costs</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-medium">4</div>
                  <span>Complete your project safely and professionally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}