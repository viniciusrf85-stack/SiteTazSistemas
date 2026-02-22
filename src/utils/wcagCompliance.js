/**
 * Utilitário para WCAG 2.1 AA Compliance
 * Fornece funções para garantir acessibilidade
 */

/**
 * Verifica se um elemento tem contraste suficiente
 * WCAG AA requer contraste de 4.5:1 para texto normal
 * @param {string} foreground - Cor do texto (hex)
 * @param {string} background - Cor de fundo (hex)
 * @returns {boolean} - True se tem contraste suficiente
 */
export const hasEnoughContrast = (foreground, background) => {
  const getLuminance = (hex) => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff

    const [rs, gs, bs] = [r, g, b].map(x => {
      x = x / 255
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
    })

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05) >= 4.5
}

/**
 * Verifica se um elemento tem aria-label ou aria-labelledby
 * @param {HTMLElement} element - Elemento a verificar
 * @returns {boolean} - True se tem label acessível
 */
export const hasAccessibleLabel = (element) => {
  return (
    element.hasAttribute('aria-label') ||
    element.hasAttribute('aria-labelledby') ||
    element.textContent.trim().length > 0 ||
    element.hasAttribute('title')
  )
}

/**
 * Verifica se um botão tem texto acessível
 * @param {HTMLElement} button - Elemento botão
 * @returns {boolean} - True se tem texto acessível
 */
export const hasButtonLabel = (button) => {
  return (
    button.textContent.trim().length > 0 ||
    button.hasAttribute('aria-label') ||
    button.hasAttribute('aria-labelledby') ||
    button.querySelector('img[alt]')
  )
}

/**
 * Verifica se uma imagem tem alt text
 * @param {HTMLImageElement} img - Elemento imagem
 * @returns {boolean} - True se tem alt text
 */
export const hasAltText = (img) => {
  return img.hasAttribute('alt') && img.getAttribute('alt').trim().length > 0
}

/**
 * Verifica se um link tem texto descritivo
 * @param {HTMLAnchorElement} link - Elemento link
 * @returns {boolean} - True se tem texto descritivo
 */
export const hasDescriptiveLink = (link) => {
  const text = link.textContent.trim().toLowerCase()
  const genericTexts = ['clique aqui', 'leia mais', 'saiba mais', 'link', 'aqui']
  return !genericTexts.includes(text) && text.length > 0
}

/**
 * Verifica se um formulário tem labels para todos os inputs
 * @param {HTMLFormElement} form - Elemento formulário
 * @returns {array} - Array de inputs sem labels
 */
export const checkFormLabels = (form) => {
  const inputs = form.querySelectorAll('input, textarea, select')
  const missingLabels = []

  inputs.forEach(input => {
    const hasLabel =
      input.hasAttribute('aria-label') ||
      input.hasAttribute('aria-labelledby') ||
      input.hasAttribute('placeholder') ||
      form.querySelector(`label[for="${input.id}"]`)

    if (!hasLabel) {
      missingLabels.push(input)
    }
  })

  return missingLabels
}

/**
 * Verifica se a página tem heading estruturado
 * @returns {boolean} - True se tem estrutura de headings correta
 */
export const hasProperHeadingStructure = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  
  if (headings.length === 0) return false

  // Deve ter apenas um H1
  const h1Count = document.querySelectorAll('h1').length
  if (h1Count !== 1) return false

  // Verificar se não há saltos de nível (ex: H1 -> H3)
  let lastLevel = 0
  for (const heading of headings) {
    const level = parseInt(heading.tagName[1])
    if (level > lastLevel + 1) {
      return false
    }
    lastLevel = level
  }

  return true
}

/**
 * Verifica se a página tem skip link
 * @returns {boolean} - True se tem skip link
 */
export const hasSkipLink = () => {
  const skipLink = document.querySelector('a[href="#main"], a[href="#content"]')
  return !!skipLink
}

/**
 * Verifica se todos os inputs têm type adequado
 * @returns {array} - Array de inputs com type inadequado
 */
export const checkInputTypes = () => {
  const inputs = document.querySelectorAll('input')
  const invalidInputs = []

  inputs.forEach(input => {
    const type = input.getAttribute('type')
    const validTypes = [
      'text', 'email', 'password', 'number', 'tel', 'url',
      'date', 'time', 'checkbox', 'radio', 'submit', 'button',
      'file', 'hidden', 'search', 'color', 'range'
    ]

    if (!validTypes.includes(type)) {
      invalidInputs.push(input)
    }
  })

  return invalidInputs
}

/**
 * Verifica se a página tem focus visível
 * @returns {boolean} - True se tem focus visível
 */
export const hasFocusVisible = () => {
  const style = document.createElement('style')
  style.textContent = ':focus-visible { outline: 2px solid; }'
  document.head.appendChild(style)
  
  const hasFocus = window.getComputedStyle(document.body).outline !== 'none'
  style.remove()
  
  return hasFocus
}

/**
 * Classe para auditar WCAG compliance
 */
export class WCAGAuditor {
  constructor() {
    this.issues = []
  }

  /**
   * Executa auditoria completa
   */
  audit() {
    this.issues = []
    
    this.checkHeadings()
    this.checkImages()
    this.checkLinks()
    this.checkForms()
    this.checkContrast()
    this.checkFocus()
    this.checkLanguage()

    return this.issues
  }

  /**
   * Verifica estrutura de headings
   */
  checkHeadings() {
    if (!hasProperHeadingStructure()) {
      this.issues.push({
        level: 'error',
        message: 'Estrutura de headings inadequada. Deve haver um H1 e sem saltos de nível.',
        wcag: '1.3.1'
      })
    }
  }

  /**
   * Verifica imagens
   */
  checkImages() {
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      if (!hasAltText(img)) {
        this.issues.push({
          level: 'error',
          message: `Imagem sem alt text: ${img.src}`,
          wcag: '1.1.1',
          element: img
        })
      }
    })
  }

  /**
   * Verifica links
   */
  checkLinks() {
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      if (!hasDescriptiveLink(link)) {
        this.issues.push({
          level: 'warning',
          message: `Link com texto genérico: "${link.textContent.trim()}"`,
          wcag: '2.4.4',
          element: link
        })
      }
    })
  }

  /**
   * Verifica formulários
   */
  checkForms() {
    const forms = document.querySelectorAll('form')
    forms.forEach(form => {
      const missingLabels = checkFormLabels(form)
      missingLabels.forEach(input => {
        this.issues.push({
          level: 'error',
          message: 'Input sem label acessível',
          wcag: '1.3.1',
          element: input
        })
      })
    })
  }

  /**
   * Verifica contraste
   */
  checkContrast() {
    const elements = document.querySelectorAll('*')
    elements.forEach(el => {
      const fg = window.getComputedStyle(el).color
      const bg = window.getComputedStyle(el).backgroundColor

      if (fg && bg && !hasEnoughContrast(fg, bg)) {
        this.issues.push({
          level: 'warning',
          message: 'Contraste insuficiente',
          wcag: '1.4.3',
          element: el
        })
      }
    })
  }

  /**
   * Verifica focus visível
   */
  checkFocus() {
    if (!hasFocusVisible()) {
      this.issues.push({
        level: 'warning',
        message: 'Foco não é visível em elementos interativos',
        wcag: '2.4.7'
      })
    }
  }

  /**
   * Verifica atributo de idioma
   */
  checkLanguage() {
    if (!document.documentElement.hasAttribute('lang')) {
      this.issues.push({
        level: 'error',
        message: 'Elemento html sem atributo lang',
        wcag: '3.1.1'
      })
    }
  }

  /**
   * Retorna relatório de auditoria
   */
  getReport() {
    const errors = this.issues.filter(i => i.level === 'error')
    const warnings = this.issues.filter(i => i.level === 'warning')

    return {
      total: this.issues.length,
      errors: errors.length,
      warnings: warnings.length,
      issues: this.issues
    }
  }
}

export const wcagAuditor = new WCAGAuditor()
