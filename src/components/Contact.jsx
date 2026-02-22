import { Mail, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para enviar o formulário
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setFormData({ name: '', email: '', phone: '', message: '' })
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

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Seu telefone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Sua mensagem"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              <Send size={20} />
              Falar com um especialista
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
