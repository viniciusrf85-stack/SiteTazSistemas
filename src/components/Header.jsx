import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
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
            <h1>TazSistemas</h1>
          </div>
          
          <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio') }}>Home</a>
            
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos') }}>
                Nossos Serviços <ChevronDown size={16} />
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
            
            <a href="#beneficios" onClick={(e) => { e.preventDefault(); scrollToSection('beneficios') }}>Benefícios</a>
            <a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('sobre') }}>Quem Somos</a>
            <a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contato') }} className="btn-contact">
              Contato
            </a>
          </nav>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
