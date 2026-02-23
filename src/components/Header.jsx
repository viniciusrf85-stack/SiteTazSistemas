import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import './Header.css'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
      setServicesOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <picture>
              <source srcSet="/taz-logo.webp" type="image/webp" />
              <img src="/taz-logo.png" alt="TAZ Zenith" className="logo-image" />
            </picture>
            <div className="logo-text">
              <h1>TAZSistemas</h1>
              <span className="logo-tagline">Technology · Architecture · zenith</span>
              <div className="logo-subtitle-container">
                <p className="logo-subtitle">Levamos sua tecnologia e arquitetura ao</p>
                <p className="logo-subtitle logo-subtitle-highlight">ponto máximo de excelência</p>
              </div>
            </div>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio') }} className="nav-link">
              Início
            </a>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos') }} className="nav-link">
                Serviços <ChevronDown size={16} />
              </a>
              {servicesOpen && (
                <div className="dropdown-menu">
                  <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos') }}>
                    Desenvolvimento de Software
                  </a>
                  <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos') }}>
                    Consultoria Especializada
                  </a>
                  <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos') }}>
                    Alocação de Profissionais
                  </a>
                </div>
              )}
            </div>
            
            <a href="#beneficios" onClick={(e) => { e.preventDefault(); scrollToSection('beneficios') }} className="nav-link">
              Benefícios
            </a>
            <a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('sobre') }} className="nav-link">
              Sobre
            </a>
            <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contato') }} className="btn btn-primary">
              Contato
            </a>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <button 
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
