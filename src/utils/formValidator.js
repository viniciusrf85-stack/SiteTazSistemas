/**
 * Validador de Formulário para TAZSistemas
 * Contém regras de validação para o formulário de contato
 */

export const validateForm = (formData) => {
  const errors = {}

  // Validar Nome
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Nome é obrigatório'
  } else if (formData.name.trim().length < 3) {
    errors.name = 'Nome deve ter pelo menos 3 caracteres'
  } else if (formData.name.trim().length > 100) {
    errors.name = 'Nome não pode ter mais de 100 caracteres'
  }

  // Validar Email
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email é obrigatório'
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Email inválido'
  }

  // Validar Telefone (opcional, mas se preenchido, validar)
  if (formData.phone && formData.phone.trim() !== '') {
    if (!isValidPhone(formData.phone)) {
      errors.phone = 'Telefone inválido. Use o formato: (XX) XXXXX-XXXX'
    }
  }

  // Validar Mensagem
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Mensagem é obrigatória'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Mensagem deve ter pelo menos 10 caracteres'
  } else if (formData.message.trim().length > 5000) {
    errors.message = 'Mensagem não pode ter mais de 5000 caracteres'
  }

  return errors
}

/**
 * Valida se o email é válido
 * @param {string} email - Email a validar
 * @returns {boolean} - True se válido, False caso contrário
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida se o telefone é válido (formato brasileiro)
 * @param {string} phone - Telefone a validar
 * @returns {boolean} - True se válido, False caso contrário
 */
export const isValidPhone = (phone) => {
  // Remove caracteres especiais
  const cleanPhone = phone.replace(/\D/g, '')
  // Valida formato: (XX) XXXXX-XXXX ou XXXXXXXXXX ou (XX) XXXX-XXXX
  return cleanPhone.length >= 10 && cleanPhone.length <= 11
}

/**
 * Sanitiza dados do formulário para evitar XSS
 * @param {object} formData - Dados do formulário
 * @returns {object} - Dados sanitizados
 */
export const sanitizeFormData = (formData) => {
  return {
    name: sanitizeString(formData.name),
    email: sanitizeString(formData.email).toLowerCase(),
    phone: sanitizeString(formData.phone),
    message: sanitizeString(formData.message)
  }
}

/**
 * Sanitiza uma string removendo caracteres perigosos
 * @param {string} str - String a sanitizar
 * @returns {string} - String sanitizada
 */
export const sanitizeString = (str) => {
  if (typeof str !== 'string') return ''
  
  return str
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .replace(/javascript:/gi, '') // Remove javascript:
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
}

/**
 * Formata telefone para exibição
 * @param {string} phone - Telefone a formatar
 * @returns {string} - Telefone formatado
 */
export const formatPhone = (phone) => {
  const cleanPhone = phone.replace(/\D/g, '')
  
  if (cleanPhone.length === 11) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7)}`
  } else if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 6)}-${cleanPhone.slice(6)}`
  }
  
  return phone
}

/**
 * Verifica se o formulário tem erros
 * @param {object} errors - Objeto de erros
 * @returns {boolean} - True se tem erros, False caso contrário
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0
}

/**
 * Retorna o primeiro erro encontrado
 * @param {object} errors - Objeto de erros
 * @returns {string} - Primeira mensagem de erro ou vazio
 */
export const getFirstError = (errors) => {
  const errorKeys = Object.keys(errors)
  return errorKeys.length > 0 ? errors[errorKeys[0]] : ''
}
