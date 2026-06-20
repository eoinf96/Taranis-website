import * as React from 'react'
import { Phone, Mail, MapPin, Instagram } from 'lucide-react'
import { Container } from '@/components/ui/container'
import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Logo */}
            <div>
              <div className="bg-white p-4 inline-block">
                <Image
                  src="/logo.jpg"
                  alt="Taranis Electrical Logo"
                  width={126}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Contact Details - Email & Phone */}
            <div className="space-y-4">
              <a
                href="mailto:taraniselectrical@outlook.com"
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="break-all">taraniselectrical@outlook.com</span>
              </a>
              <a
                href="tel:07925423673"
                className="flex items-center gap-3 text-white/90 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>07925423673</span>
              </a>
            </div>

            {/* Location & Social */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/80 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <address className="not-italic">Hemel Hempstead, UK</address>
              </div>
              <a
                href="https://www.instagram.com/taranis_electrical_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/60 text-xs">
          <span>© {new Date().getFullYear()} Taranis Electrical. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
