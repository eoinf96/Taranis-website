export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Taranis Electrical',
    telephone: '+447925423673',
    email: 'taraniselectrical@outlook.com',
    url: 'https://taraniselectrical.co.uk',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Hemel Hempstead',
      addressRegion: 'Hertfordshire',
      addressCountry: 'GB',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    priceRange: '££',
    paymentAccepted: ['Cash', 'Card', 'Bank Transfer'],
    areaServed: 'Hemel Hempstead',
    sameAs: ['https://www.instagram.com/taranis_electrical_'],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ElectricalServiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Electrical Services',
    description:
      'Professional electrical services for domestic and commercial clients in Hemel Hempstead and surrounding areas. Rewires, fuse board upgrades, lighting, sockets, and maintenance contracts. NAPIT approved.',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Taranis Electrical',
      telephone: '+447925423673',
      url: 'https://taraniselectrical.co.uk',
    },
    serviceType: 'Electrical Services',
    areaServed: 'Hemel Hempstead',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
