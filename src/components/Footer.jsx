import { Mail, Phone } from 'lucide-react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">TazSistemas</h3>
            <p>
              Soluções em tecnologia e desenvolvimento de sistemas personalizados 
              para transformar sua empresa.
            </p>
          </div>

          <div className="footer-section">
            <h4>Menu</h4>
            <ul>
              <li><a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio') }}>Home</a></li>
              <li><a href="#servicos" onClick={(e) => { e.preventDefault(); scrollToSection('servicos') }}>Nossos Serviços</a></li>
              <li><a href="#beneficios" onClick={(e) => { e.preventDefault(); scrollToSection('beneficios') }}>Benefícios</a></li>
              <li><a href="#sobre" onClick={(e) => { e.preventDefault(); scrollToSection('sobre') }}>Quem Somos</a></li>
              <li><a href="#contato" onClick={(e) => { e.preventDefault(); scrollToSection('contato') }}>Contato</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contato</h4>
            <ul className="contact-list">
              <li>
                <Phone size={16} />
                <span>(28) 99910-1540</span>
              </li>
              <li>
                <Mail size={16} />
                <span>comercial@tazsistemas.com.br</span>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Funcionamento</h4>
            <p>De Segunda a Sexta<br />das 8hs às 18hs</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>TazSistemas {currentYear} © Todos os direitos reservados</p>
          <div className="footer-links">
            <a href="#">Política de privacidade e termos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
