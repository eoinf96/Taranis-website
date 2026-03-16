'use client'

import { useEffect } from 'react'

interface LocalBusinessSchema {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  name: string
  image?: string
  telephone: string
  email?: string
  url: string
  address?: {
    '@type': 'PostalAddress'
    addressCountry: string
    addressRegion?: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude?: number
    longitude?: number
  }
  openingHoursSpecification?: {
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }[]
  sameAs?: string[]
  priceRange?: string
  paymentAccepted?: string[]
  areaServed?: string | string[]
}

interface ServiceSchema {
  '@context': 'https://schema.org'
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'LocalBusiness'
    name: string
    telephone: string
    url: string
  }
  serviceType: string
  areaServed: string | string[]
}

interface JsonLdProps {
  data: LocalBusinessSchema | ServiceSchema
}

export function JsonLd({ data }: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
}

export function LocalBusinessJsonLd() {
  const localBusinessData: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Taranis Electrical',
    telephone: '+447123456789',
    email: 'info@taraniselectrical.co.uk',
    url: 'https://taraniselectrical.co.uk',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification', 
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '16:00'
      }
    ],
    priceRange: '££',
    paymentAccepted: ['Cash', 'Card', 'Bank Transfer'],
    areaServed: [
      'England',
      'Scotland',
      'Wales',
      'Northern Ireland'
    ]
  }

  return <JsonLd data={localBusinessData} />
}

export function ElectricalServiceJsonLd() {
  const serviceData: ServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Electrical Services',
    description: 'Professional electrical services including EV charging installation, solar PV, battery storage, domestic and commercial electrical work across the UK.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Taranis Electrical',
      telephone: '+447123456789',
      url: 'https://taraniselectrical.co.uk'
    },
    serviceType: 'Electrical Services',
    areaServed: [
      'England',
      'Scotland', 
      'Wales',
      'Northern Ireland'
    ]
  }

  return <JsonLd data={serviceData} />
}