import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'

interface HeroProps {
  title: string
  description: string
  ctaText?: string
  ctaHref?: string
}

export function Hero({
  title,
  description,
  ctaText = 'Get in touch',
  ctaHref = '#contact',
}: HeroProps) {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background image with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://s3-us-west-1.amazonaws.com/public.tradehq.com/production/website/e75ea9ef-b396-4b1d-97af-5a636136fbd1/published/hero)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/0 to-transparent" />

      <Container className="relative z-10" maxWidth="container">
        <div className="max-w-full lg:max-w-[500px]">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6 text-white">
            {title}
          </h1>

          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            {description}
          </p>

          <Link
            href={ctaHref}
            className="inline-block bg-white/60 text-black/60 font-medium px-3 py-1.5 rounded text-sm border border-white/60 hover:bg-white/70 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      </Container>
    </section>
  )
}
