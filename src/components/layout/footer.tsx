import * as React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '@/components/ui/container'

const footerNavigation = {
  services: [
    { name: 'EV Charging Installation', href: '/services/ev-charging' },
    { name: 'Solar PV Installation', href: '/services/solar-pv' },
    { name: 'Battery Storage', href: '/services/battery-storage' },
    { name: 'Domestic Electrical', href: '/services/domestic' },
    { name: 'Commercial Electrical', href: '/services/commercial' },
    { name: 'EICR Testing', href: '/services/eicr' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Projects', href: '/projects' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold">Taranis Electrical</span>
              </div>
              <p className="text-neutral-300 mb-6 text-sm leading-relaxed">
                Professional electrical services across the UK. From domestic installations 
                to commercial projects, we deliver safe, reliable, and certified electrical work.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p>Serving all of the UK</p>
                    <p className="text-neutral-400">Licensed & Insured</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>24/7 Emergency Services</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {footerNavigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-neutral-300 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-neutral-300 hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
              <div className="space-y-3">
                <a
                  href="tel:+447123456789"
                  className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>07123 456 789</span>
                </a>
                <a
                  href="mailto:info@taraniselectrical.co.uk"
                  className="flex items-center space-x-3 text-neutral-300 hover:text-white transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>info@taraniselectrical.co.uk</span>
                </a>
              </div>

              {/* Accreditations placeholder */}
              <div className="mt-6">
                <h4 className="text-white font-medium mb-3 text-sm">Accredited & Certified</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-neutral-800 px-3 py-1 rounded text-xs">NICEIC</div>
                  <div className="bg-neutral-800 px-3 py-1 rounded text-xs">Part P</div>
                  <div className="bg-neutral-800 px-3 py-1 rounded text-xs">18th Edition</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © {currentYear} Taranis Electrical. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {footerNavigation.legal.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-400 hover:text-white transition-colors text-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}