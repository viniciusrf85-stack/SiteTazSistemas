import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import './Toast.css'

/**
 * Componente Toast para exibir mensagens de feedback
 * @param {string} message - Mensagem a exibir
 * @param {string} type - Tipo de mensagem: 'success', 'error', 'warning', 'info'
 * @param {number} duration - Duração em ms (0 = não fecha automaticamente)
 * @param {function} onClose - Callback ao fechar
 */
function Toast({ message, type = 'info', duration = 5000, onClose }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const handleClose = () => {
    setIsVisible(false)
    if (onClose) onClose()
  }

  if (!isVisible) return null

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />
      case 'error':
        return <AlertCircle size={20} />
      case 'warning':
        return <AlertCircle size={20} />
      case 'info':
        return <Info size={20} />
      default:
        return <Info size={20} />
    }
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-message">
        {message}
      </div>
      <button 
        className="toast-close"
        onClick={handleClose}
        aria-label="Fechar mensagem"
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Toast
