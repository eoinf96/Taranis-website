import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Phone, CheckCircle } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle?: string
  description: string
  ctaPrimary?: {
    text: string
    href: string
  }
  ctaSecondary?: {
    text: string
    href: string
  }
  features?: string[]
  backgroundImage?: string
}

export function Hero({
  title,
  subtitle,
  description,
  ctaPrimary = { text: 'Get Free Quote', href: '/contact' },
  ctaSecondary = { text: 'Call Now', href: 'tel:+447123456789' },
  features = [],
  backgroundImage
}: HeroProps) {
  return (
    <section className="relative bg-neutral-900 text-white py-20 lg:py-32 overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 to-neutral-900/70" />
        </div>
      )}

      <Container className="relative z-10">
        <div className="max-w-3xl">
          {subtitle && (
            <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm text-primary font-medium mb-6">
              {subtitle}
            </div>
          )}
          
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>
          
          <p className="text-xl text-neutral-300 mb-8 leading-relaxed">
            {description}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <div className="flex flex-wrap gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-neutral-200">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href={ctaPrimary.href}>{ctaPrimary.text}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href={ctaSecondary.href} className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{ctaSecondary.text}</span>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}