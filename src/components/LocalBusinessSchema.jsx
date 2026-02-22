export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'TAZSistemas',
    'image': 'https://www.tazsistemas.com.br/taz-logo.png',
    'description': 'Empresa especializada em desenvolvimento de software, criação de websites, e-mail profissional e blogs. Oferecemos soluções tecnológicas com arquitetura de ponta.',
    'url': 'https://www.tazsistemas.com.br',
    'telephone': '+55-28-99910-1540',
    'email': 'comercial@tazsistemas.com.br',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Rua Exemplo, 123',
      'addressLocality': 'Cachoeiro de Itapemirim',
      'addressRegion': 'ES',
      'postalCode': '29300-000',
      'addressCountry': 'BR'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '-20.8505',
      'longitude': '-41.1082'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '08:00',
      'closes': '18:00'
    },
    'priceRange': '$$'
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default LocalBusinessSchema
