import { Helmet } from 'react-helmet-async'

export function SEO({ 
  title = 'TAZSistemas - Technology, Architecture, Zenith',
  description = 'Desenvolvimento de software, sites, e-mail e blogs. Soluções em tecnologia com arquitetura de ponta e excelência em entrega.',
  image = 'https://www.tazsistemas.com.br/taz-logo-horizontal.png',
  url = 'https://www.tazsistemas.com.br/',
  type = 'website'
}) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'TAZSistemas',
    'url': 'https://www.tazsistemas.com.br',
    'logo': 'https://www.tazsistemas.com.br/taz-logo.png',
    'description': description,
    'sameAs': [
      'https://www.facebook.com/tazsistemas',
      'https://www.instagram.com/tazsistemas',
      'https://www.linkedin.com/company/tazsistemas',
      'https://twitter.com/tazsistemas'
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'BR'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+55-28-99910-1540',
      'contactType': 'Customer Support',
      'email': 'comercial@tazsistemas.com.br'
    },
    'areaServed': 'BR',
    'knowsAbout': [
      'Desenvolvimento de Software',
      'Criação de Websites',
      'Consultoria em Tecnologia',
      'Alocação de Profissionais',
      'Arquitetura de Sistemas'
    ]
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  )
}

export default SEO
