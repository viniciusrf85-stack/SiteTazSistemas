export function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Início',
        'item': 'https://www.tazsistemas.com.br/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Serviços',
        'item': 'https://www.tazsistemas.com.br/#servicos'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Benefícios',
        'item': 'https://www.tazsistemas.com.br/#beneficios'
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': 'Sobre',
        'item': 'https://www.tazsistemas.com.br/#sobre'
      },
      {
        '@type': 'ListItem',
        'position': 5,
        'name': 'Contato',
        'item': 'https://www.tazsistemas.com.br/#contato'
      }
    ]
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  )
}

export default BreadcrumbSchema
