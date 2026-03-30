'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/container'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Contact us', href: '#contact' },
  { name: 'Our work', href: '#gallery' },
  { name: 'Services', href: '#services' },
  { name: 'Testimonials', href: '#testimonials' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[1030] bg-transparent">
      <Container>
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="https://s3-us-west-1.amazonaws.com/public.tradehq.com/production/website/e75ea9ef-b396-4b1d-97af-5a636136fbd1/published/logo"
              alt="Taranis Electrical Logo"
              className="w-[126px] h-[80px] object-contain"
            />
          </Link>

          {/* Desktop Navigation - white rounded box */}
          <nav className="hidden lg:flex items-center bg-white rounded-[5px] px-6 py-3 shadow-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-neutral-700 hover:text-primary transition-colors font-medium text-sm whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 bg-white rounded-[5px] shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-neutral-700" />
            ) : (
              <Menu className="w-6 h-6 text-neutral-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white rounded-[5px] shadow-sm mb-4 mx-2">
            <nav className="py-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors font-medium text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </Container>
    </header>
  )
}
