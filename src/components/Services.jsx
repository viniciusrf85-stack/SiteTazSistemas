import { Code, Users, Brain, ArrowRight } from 'lucide-react'
import './Services.css'

function Services() {
  const services = [
    {
      icon: <Code size={48} />,
      title: 'Desenvolvimento de Software Sob Medida',
      description: 'Sistemas personalizados, aplicações web e mobile sob medida para suas necessidades específicas.',
      items: [
        'Desenvolvimento de sistemas personalizados',
        'Aplicações web e mobile',
        'Integrações e APIs',
        'Sustentação de softwares'
      ]
    },
    {
      icon: <Brain size={48} />,
      title: 'Consultoria em Arquitetura de Software',
      description: 'Orientações estratégicas para transformação digital e otimização de processos através da tecnologia.',
      items: [
        'Consultoria em tecnologia',
        'Análise e otimização de processos',
        'Transformação digital',
        'Arquitetura de sistemas'
      ]
    },
    {
      icon: <Users size={48} />,
      title: 'Alocação de Desenvolvedores e Especialistas',
      description: 'Equipe especializada para complementar seu time ou executar projetos específicos.',
      items: [
        'Desenvolvedores especializados',
        'Arquitetos de software',
        'Analistas e testadores',
        'Suporte técnico'
      ]
    }
  ]

  return (
    <section id="servicos" className="services">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Serviços de Desenvolvimento e Tecnologia</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-items">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
              <button className="service-link">
                Ver mais <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
