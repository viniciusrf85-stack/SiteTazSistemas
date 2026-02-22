/**
 * Utilitário para Google Analytics 4
 * Gerencia rastreamento de eventos e conversões
 */

// ID do Google Analytics
const GA_MEASUREMENT_ID = 'G-CGDHV3NKDM'

/**
 * Inicializa Google Analytics
 * Deve ser chamado uma vez no App.jsx
 */
export const initializeGA = () => {
  // Carregar script do Google Analytics
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Inicializar gtag
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    anonymize_ip: true
  })
}

/**
 * Rastreia um evento customizado
 * @param {string} eventName - Nome do evento
 * @param {object} eventParams - Parâmetros do evento
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  } else {
    console.warn('Google Analytics não está inicializado')
  }
}

/**
 * Rastreia visualização de página
 * @param {string} pagePath - Caminho da página
 * @param {string} pageTitle - Título da página
 */
export const trackPageView = (pagePath, pageTitle) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle
  })
}

/**
 * Rastreia clique em CTA
 * @param {string} ctaName - Nome do CTA
 * @param {string} ctaLocation - Localização do CTA (hero, services, etc)
 */
export const trackCTAClick = (ctaName, ctaLocation) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation
  })
}

/**
 * Rastreia envio de formulário
 * @param {string} formName - Nome do formulário
 * @param {object} formData - Dados do formulário (sem informações sensíveis)
 */
export const trackFormSubmission = (formName, formData = {}) => {
  trackEvent('form_submit', {
    form_name: formName,
    form_fields: Object.keys(formData).length
  })
}

/**
 * Rastreia erro no formulário
 * @param {string} formName - Nome do formulário
 * @param {string} errorField - Campo com erro
 * @param {string} errorMessage - Mensagem de erro
 */
export const trackFormError = (formName, errorField, errorMessage) => {
  trackEvent('form_error', {
    form_name: formName,
    error_field: errorField,
    error_message: errorMessage
  })
}

/**
 * Rastreia scroll até uma seção
 * @param {string} sectionName - Nome da seção
 */
export const trackSectionScroll = (sectionName) => {
  trackEvent('section_scroll', {
    section_name: sectionName
  })
}

/**
 * Rastreia clique em link externo
 * @param {string} linkUrl - URL do link
 * @param {string} linkText - Texto do link
 */
export const trackExternalLink = (linkUrl, linkText) => {
  trackEvent('external_link_click', {
    link_url: linkUrl,
    link_text: linkText
  })
}

/**
 * Rastreia tempo de permanência na página
 * @param {number} timeOnPage - Tempo em segundos
 */
export const trackTimeOnPage = (timeOnPage) => {
  trackEvent('time_on_page', {
    time_seconds: Math.round(timeOnPage)
  })
}

/**
 * Rastreia clique em botão
 * @param {string} buttonName - Nome do botão
 * @param {string} buttonLocation - Localização do botão
 */
export const trackButtonClick = (buttonName, buttonLocation) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: buttonLocation
  })
}

/**
 * Rastreia scroll de página (porcentagem)
 * @param {number} scrollPercentage - Porcentagem de scroll (0-100)
 */
export const trackScrollDepth = (scrollPercentage) => {
  trackEvent('scroll_depth', {
    scroll_percentage: scrollPercentage
  })
}

/**
 * Hook para rastrear eventos em componentes React
 * @returns {object} - Métodos de rastreamento
 */
export const useAnalytics = () => {
  return {
    trackEvent,
    trackPageView,
    trackCTAClick,
    trackFormSubmission,
    trackFormError,
    trackSectionScroll,
    trackExternalLink,
    trackTimeOnPage,
    trackButtonClick,
    trackScrollDepth
  }
}

/**
 * Classe para gerenciar analytics
 */
export class AnalyticsManager {
  constructor() {
    this.pageStartTime = Date.now()
    this.scrollTracked = new Set()
  }

  /**
   * Rastreia tempo total na página
   */
  trackPageTime() {
    const timeOnPage = (Date.now() - this.pageStartTime) / 1000
    trackTimeOnPage(timeOnPage)
  }

  /**
   * Rastreia scroll depth
   * @param {number} currentScroll - Scroll atual em pixels
   * @param {number} totalHeight - Altura total da página
   */
  trackScrollDepth(currentScroll, totalHeight) {
    const scrollPercentage = Math.round((currentScroll / totalHeight) * 100)
    
    // Rastrear em intervalos de 25%
    const interval = Math.floor(scrollPercentage / 25) * 25
    
    if (!this.scrollTracked.has(interval) && interval > 0) {
      this.scrollTracked.add(interval)
      trackScrollDepth(interval)
    }
  }

  /**
   * Reseta o rastreamento
   */
  reset() {
    this.pageStartTime = Date.now()
    this.scrollTracked.clear()
  }
}

export const analyticsManager = new AnalyticsManager()
