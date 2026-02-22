import { TrendingUp, Zap, Settings, DollarSign, Shield, Target } from 'lucide-react'
import './Benefits.css'

function Benefits() {
  const benefits = [
    {
      icon: <TrendingUp size={40} />,
      title: 'Melhoria do resultado financeiro',
      description: 'Otimização de processos que geram economia e aumento de receita'
    },
    {
      icon: <Zap size={40} />,
      title: 'Execução ágil e especializada',
      description: 'Projetos entregues com qualidade e dentro do prazo estabelecido'
    },
    {
      icon: <Settings size={40} />,
      title: 'Atualização tecnológica contínua',
      description: 'Sempre utilizando as tecnologias mais modernas do mercado'
    },
    {
      icon: <Target size={40} />,
      title: 'Customização de processos',
      description: 'Soluções adaptadas às necessidades específicas do seu negócio'
    },
    {
      icon: <DollarSign size={40} />,
      title: 'Redução de custos',
      description: 'Eficiência operacional que reduz gastos desnecessários'
    },
    {
      icon: <Shield size={40} />,
      title: 'Conformidade com a LGPD',
      description: 'Garantia de segurança e conformidade com regulamentações'
    }
  ]

  return (
    <section id="beneficios" className="benefits">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Benefícios gerados</h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">{benefit.icon}</div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
