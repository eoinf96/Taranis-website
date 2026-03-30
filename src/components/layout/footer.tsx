import * as React from 'react'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import { Container } from '@/components/ui/container'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo / Brand */}
            <div>
              <img
                src="https://s3-us-west-1.amazonaws.com/public.tradehq.com/production/website/e75ea9ef-b396-4b1d-97af-5a636136fbd1/published/logo"
                alt="Taranis Electrical Logo"
                className="w-[126px] h-[80px] object-contain mb-4 brightness-0 invert"
              />
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Hemel Hempstead, UK</span>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <a
                href="mailto:taraniselectrical@outlook.com"
                className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>taraniselectrical@outlook.com</span>
              </a>
              <a
                href="tel:07925423673"
                className="flex items-center space-x-3 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>07925423673</span>
              </a>
            </div>

            {/* Social */}
            <div className="flex md:justify-end">
              <a
                href="https://www.instagram.com/taranis_electrical_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors text-sm"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
