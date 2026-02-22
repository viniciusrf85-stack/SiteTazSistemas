import { ArrowRight, Phone, Mail } from 'lucide-react'
import { trackCTAClick } from '../utils/analytics'
import './CTAButton.css'

/**
 * Componente de CTA Button reutilizável
 * @param {string} text - Texto do botão
 * @param {string} variant - Variante: 'primary', 'secondary', 'outline'
 * @param {string} size - Tamanho: 'sm', 'md', 'lg'
 * @param {string} icon - Ícone: 'arrow', 'phone', 'mail', 'none'
 * @param {string} location - Localização para analytics
 * @param {function} onClick - Função ao clicar
 * @param {string} href - URL para link
 * @param {boolean} disabled - Desabilitado
 * @param {string} ariaLabel - Label para acessibilidade
 */
function CTAButton({
  text = 'Clique aqui',
  variant = 'primary',
  size = 'md',
  icon = 'arrow',
  location = 'unknown',
  onClick,
  href,
  disabled = false,
  ariaLabel,
  className = ''
}) {
  const handleClick = (e) => {
    // Rastrear clique no analytics
    trackCTAClick(text, location)

    if (onClick) {
      onClick(e)
    }

    if (href && !href.startsWith('#')) {
      window.open(href, '_blank')
    }
  }

  const getIcon = () => {
    switch (icon) {
      case 'arrow':
        return <ArrowRight size={20} />
      case 'phone':
        return <Phone size={20} />
      case 'mail':
        return <Mail size={20} />
      default:
        return null
    }
  }

  const buttonClass = `cta-button cta-${variant} cta-${size} ${className}`

  if (href && href.startsWith('#')) {
    return (
      <a
        href={href}
        className={buttonClass}
        aria-label={ariaLabel || text}
        onClick={handleClick}
      >
        <span className="cta-text">{text}</span>
        {icon !== 'none' && <span className="cta-icon">{getIcon()}</span>}
      </a>
    )
  }

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel || text}
      aria-disabled={disabled}
    >
      <span className="cta-text">{text}</span>
      {icon !== 'none' && <span className="cta-icon">{getIcon()}</span>}
    </button>
  )
}

export default CTAButton
