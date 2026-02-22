import { Mail, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import Toast from './Toast'
import FormError from './FormError'
import { validateForm, sanitizeFormData, formatPhone } from '../utils/formValidator'
import { useSpamProtection } from '../utils/spamProtection'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [errors, setErrors] = useState({})
  const [toast, setToast] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const spamProtection = useSpamProtection()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Limpar erro do campo ao começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Verificar proteção contra spam
      const spamCheck = spamProtection.checkSubmission()
      if (!spamCheck.isValid) {
        setToast({
          message: spamCheck.message,
          type: 'warning',
          duration: 5000
        })
        setIsSubmitting(false)
        return
      }

      // Validar formulário
      const validationErrors = validateForm(formData)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        setToast({
          message: 'Por favor, corrija os erros no formulário.',
          type: 'error',
          duration: 5000
        })
        setIsSubmitting(false)
        return
      }

      // Detectar padrões suspeitos
      const suspiciousPatterns = spamProtection.detectSuspiciousPatterns(formData)
      if (suspiciousPatterns.length > 0) {
        console.warn('Padrões suspeitos detectados:', suspiciousPatterns)
        // Aqui você pode decidir se quer bloquear ou apenas avisar
      }

      // Sanitizar dados
      const sanitizedData = sanitizeFormData(formData)

      // Simular envio (quando tiver backend, substituir por chamada API)
      await simulateSubmission(sanitizedData)

      // Registrar submissão bem-sucedida
      spamProtection.recordSubmission()

      // Exibir mensagem de sucesso
      setToast({
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        type: 'success',
        duration: 5000
      })

      // Limpar formulário
      setFormData({ name: '', email: '', phone: '', message: '' })
      setErrors({})

    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setToast({
        message: 'Erro ao enviar mensagem. Tente novamente mais tarde.',
        type: 'error',
        duration: 5000
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Simula o envio do formulário
   * Quando tiver backend, substituir por chamada API real
   */
  const simulateSubmission = (data) => {
    return new Promise((resolve) => {
      // Simular delay de rede
      setTimeout(() => {
        console.log('Dados do formulário:', data)
        // Aqui você faria a chamada API real
        resolve()
      }, 1000)
    })
  }

  return (
    <section id="contato" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Quer saber mais?</h2>
          <p className="section-subtitle">
            Entre em contato. Vamos agendar uma reunião para entender sua demanda 
            e formular uma solução para seu problema.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-text">
                <h3>Telefone</h3>
                <p>(28) 99910-1540</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div className="info-text">
                <h3>Email</h3>
                <p>comercial@tazsistemas.com.br</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'has-error' : ''}
                  disabled={isSubmitting}
                  aria-label="Nome"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <FormError error={errors.name} fieldName="Nome" />
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'has-error' : ''}
                  disabled={isSubmitting}
                  aria-label="Email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <FormError error={errors.email} fieldName="Email" />
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Seu telefone (opcional)"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'has-error' : ''}
                disabled={isSubmitting}
                aria-label="Telefone"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <FormError error={errors.phone} fieldName="Telefone" />
              )}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Sua mensagem"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'has-error' : ''}
                disabled={isSubmitting}
                aria-label="Mensagem"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              ></textarea>
              {errors.message && (
                <FormError error={errors.message} fieldName="Mensagem" />
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              <Send size={20} />
              {isSubmitting ? 'Enviando...' : 'Falar com um especialista'}
            </button>
          </form>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  )
}

export default Contact
