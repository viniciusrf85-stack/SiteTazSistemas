import { AlertCircle } from 'lucide-react'
import './FormError.css'

/**
 * Componente para exibir erro em um campo do formulário
 * @param {string} error - Mensagem de erro
 * @param {string} fieldName - Nome do campo (para acessibilidade)
 */
function FormError({ error, fieldName }) {
  if (!error) return null

  return (
    <div 
      className="form-error"
      role="alert"
      aria-live="polite"
      aria-label={`Erro no campo ${fieldName}: ${error}`}
    >
      <AlertCircle size={16} className="error-icon" />
      <span className="error-message">{error}</span>
    </div>
  )
}

export default FormError
