import { ArrowRight } from 'lucide-react'
import './Hero.css'

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="inicio" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Desenvolvimento de Software e Soluções em Tecnologia
          </h1>
          <p className="hero-subtitle">
            Transformamos suas ideias em realidade com desenvolvimento de software, criação de sites, e-mail profissional e blogs. Tecnologia, arquitetura e excelência para o seu negócio.
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => scrollToSection('servicos')}
            >
              Nossos serviços
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="hero-background"></div>
    </section>
  )
}

export default Hero
