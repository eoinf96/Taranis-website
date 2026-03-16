'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <Container>
        <div className="flex justify-between items-center py-4 lg:py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">
                Taranis Electrical
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-sm text-neutral-600">
              <a
                href="tel:+447123456789"
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>07123 456 789</span>
              </a>
              <a
                href="mailto:info@taraniselectrical.co.uk"
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@taraniselectrical.co.uk</span>
              </a>
            </div>
            <Button asChild>
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-neutral-700 hover:text-primary transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4 mt-4 border-t border-neutral-200">
              <div className="space-y-2 text-sm">
                <a
                  href="tel:+447123456789"
                  className="flex items-center space-x-2 px-3 py-2 text-neutral-600 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>07123 456 789</span>
                </a>
                <a
                  href="mailto:info@taraniselectrical.co.uk"
                  className="flex items-center space-x-2 px-3 py-2 text-neutral-600 hover:text-primary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@taraniselectrical.co.uk</span>
                </a>
              </div>
              <div className="mt-4 px-3">
                <Button asChild className="w-full">
                  <Link href="/contact">Get Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}