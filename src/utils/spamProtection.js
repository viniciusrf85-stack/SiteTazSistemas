/**
 * Proteção contra Spam para TAZSistemas
 * Implementa rate limiting e detecção de comportamento suspeito
 */

const STORAGE_KEY = 'taz_form_submissions'
const MAX_SUBMISSIONS_PER_HOUR = 5
const MAX_SUBMISSIONS_PER_DAY = 20
const SUBMISSION_TIMEOUT = 3000 // 3 segundos entre submissões

/**
 * Classe para gerenciar proteção contra spam
 */
export class SpamProtection {
  constructor() {
    this.lastSubmissionTime = 0
  }

  /**
   * Obtém o histórico de submissões do localStorage
   * @returns {array} - Array de timestamps de submissões
   */
  getSubmissionHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Erro ao obter histórico de submissões:', error)
      return []
    }
  }

  /**
   * Salva uma nova submissão no histórico
   * @param {number} timestamp - Timestamp da submissão
   */
  saveSubmission(timestamp) {
    try {
      const history = this.getSubmissionHistory()
      history.push(timestamp)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch (error) {
      console.error('Erro ao salvar submissão:', error)
    }
  }

  /**
   * Limpa submissões antigas do histórico
   */
  cleanOldSubmissions() {
    try {
      const history = this.getSubmissionHistory()
      const now = Date.now()
      const oneDayAgo = now - 24 * 60 * 60 * 1000

      const recentSubmissions = history.filter(timestamp => timestamp > oneDayAgo)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSubmissions))
    } catch (error) {
      console.error('Erro ao limpar submissões antigas:', error)
    }
  }

  /**
   * Conta submissões na última hora
   * @returns {number} - Número de submissões na última hora
   */
  getSubmissionsLastHour() {
    const history = this.getSubmissionHistory()
    const now = Date.now()
    const oneHourAgo = now - 60 * 60 * 1000

    return history.filter(timestamp => timestamp > oneHourAgo).length
  }

  /**
   * Conta submissões no último dia
   * @returns {number} - Número de submissões no último dia
   */
  getSubmissionsLastDay() {
    const history = this.getSubmissionHistory()
    const now = Date.now()
    const oneDayAgo = now - 24 * 60 * 60 * 1000

    return history.filter(timestamp => timestamp > oneDayAgo).length
  }

  /**
   * Verifica se a submissão é válida (não é spam)
   * @returns {object} - { isValid: boolean, message: string }
   */
  checkSubmission() {
    const now = Date.now()

    // Verificar timeout mínimo entre submissões
    if (now - this.lastSubmissionTime < SUBMISSION_TIMEOUT) {
      return {
        isValid: false,
        message: 'Por favor, aguarde alguns segundos antes de enviar novamente.'
      }
    }

    // Verificar limite por hora
    const submissionsLastHour = this.getSubmissionsLastHour()
    if (submissionsLastHour >= MAX_SUBMISSIONS_PER_HOUR) {
      return {
        isValid: false,
        message: `Limite de ${MAX_SUBMISSIONS_PER_HOUR} submissões por hora atingido. Tente novamente mais tarde.`
      }
    }

    // Verificar limite por dia
    const submissionsLastDay = this.getSubmissionsLastDay()
    if (submissionsLastDay >= MAX_SUBMISSIONS_PER_DAY) {
      return {
        isValid: false,
        message: `Limite de ${MAX_SUBMISSIONS_PER_DAY} submissões por dia atingido. Tente novamente amanhã.`
      }
    }

    return { isValid: true, message: '' }
  }

  /**
   * Registra uma submissão bem-sucedida
   */
  recordSubmission() {
    this.lastSubmissionTime = Date.now()
    this.saveSubmission(this.lastSubmissionTime)
    this.cleanOldSubmissions()
  }

  /**
   * Detecta padrões suspeitos no formulário
   * @param {object} formData - Dados do formulário
   * @returns {array} - Array de avisos de suspeita
   */
  detectSuspiciousPatterns(formData) {
    const warnings = []

    // Detectar múltiplos links na mensagem
    const linkCount = (formData.message.match(/https?:\/\//g) || []).length
    if (linkCount > 2) {
      warnings.push('Mensagem contém muitos links')
    }

    // Detectar spam keywords
    const spamKeywords = ['viagra', 'casino', 'lottery', 'click here', 'free money']
    const messageLower = formData.message.toLowerCase()
    spamKeywords.forEach(keyword => {
      if (messageLower.includes(keyword)) {
        warnings.push(`Mensagem contém palavra suspeita: ${keyword}`)
      }
    })

    // Detectar mensagens muito curtas (possível teste)
    if (formData.message.length < 15) {
      warnings.push('Mensagem muito curta')
    }

    // Detectar repetição de caracteres
    if (/(.)\1{9,}/.test(formData.message)) {
      warnings.push('Mensagem contém repetição excessiva de caracteres')
    }

    return warnings
  }

  /**
   * Reseta o histórico de submissões (para testes)
   */
  resetHistory() {
    localStorage.removeItem(STORAGE_KEY)
    this.lastSubmissionTime = 0
  }
}

// Instância singleton
export const spamProtection = new SpamProtection()

/**
 * Hook para usar proteção contra spam
 * @returns {object} - Métodos de proteção
 */
export const useSpamProtection = () => {
  return {
    checkSubmission: () => spamProtection.checkSubmission(),
    recordSubmission: () => spamProtection.recordSubmission(),
    detectSuspiciousPatterns: (formData) => spamProtection.detectSuspiciousPatterns(formData),
    getSubmissionsLastHour: () => spamProtection.getSubmissionsLastHour(),
    getSubmissionsLastDay: () => spamProtection.getSubmissionsLastDay()
  }
}
