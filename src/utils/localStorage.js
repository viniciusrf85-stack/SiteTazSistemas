/**
 * Utilitário para gerenciar dados no localStorage
 * Fornece métodos seguros para salvar e recuperar dados
 */

const STORAGE_PREFIX = 'taz_'

/**
 * Salva dados no localStorage
 * @param {string} key - Chave para armazenar
 * @param {*} value - Valor a armazenar (será convertido para JSON)
 * @returns {boolean} - True se bem-sucedido, False caso contrário
 */
export const setLocalStorage = (key, value) => {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`
    const serialized = JSON.stringify(value)
    localStorage.setItem(prefixedKey, serialized)
    return true
  } catch (error) {
    console.error(`Erro ao salvar no localStorage (${key}):`, error)
    return false
  }
}

/**
 * Recupera dados do localStorage
 * @param {string} key - Chave para recuperar
 * @param {*} defaultValue - Valor padrão se não encontrado
 * @returns {*} - Valor armazenado ou valor padrão
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`
    const item = localStorage.getItem(prefixedKey)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Erro ao recuperar do localStorage (${key}):`, error)
    return defaultValue
  }
}

/**
 * Remove dados do localStorage
 * @param {string} key - Chave para remover
 * @returns {boolean} - True se bem-sucedido, False caso contrário
 */
export const removeLocalStorage = (key) => {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`
    localStorage.removeItem(prefixedKey)
    return true
  } catch (error) {
    console.error(`Erro ao remover do localStorage (${key}):`, error)
    return false
  }
}

/**
 * Limpa todos os dados prefixados da aplicação
 * @returns {boolean} - True se bem-sucedido, False caso contrário
 */
export const clearLocalStorage = () => {
  try {
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
    return true
  } catch (error) {
    console.error('Erro ao limpar localStorage:', error)
    return false
  }
}

/**
 * Verifica se uma chave existe no localStorage
 * @param {string} key - Chave a verificar
 * @returns {boolean} - True se existe, False caso contrário
 */
export const hasLocalStorage = (key) => {
  try {
    const prefixedKey = `${STORAGE_PREFIX}${key}`
    return localStorage.getItem(prefixedKey) !== null
  } catch (error) {
    console.error(`Erro ao verificar localStorage (${key}):`, error)
    return false
  }
}

/**
 * Obtém todas as chaves armazenadas
 * @returns {array} - Array de chaves (sem prefixo)
 */
export const getAllLocalStorageKeys = () => {
  try {
    const keys = Object.keys(localStorage)
    return keys
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .map(key => key.replace(STORAGE_PREFIX, ''))
  } catch (error) {
    console.error('Erro ao obter chaves do localStorage:', error)
    return []
  }
}

/**
 * Salva dados com expiração
 * @param {string} key - Chave para armazenar
 * @param {*} value - Valor a armazenar
 * @param {number} expirationTime - Tempo de expiração em ms
 * @returns {boolean} - True se bem-sucedido, False caso contrário
 */
export const setLocalStorageWithExpiration = (key, value, expirationTime) => {
  try {
    const data = {
      value,
      expirationTime: Date.now() + expirationTime
    }
    return setLocalStorage(key, data)
  } catch (error) {
    console.error(`Erro ao salvar com expiração (${key}):`, error)
    return false
  }
}

/**
 * Recupera dados com verificação de expiração
 * @param {string} key - Chave para recuperar
 * @param {*} defaultValue - Valor padrão se expirado ou não encontrado
 * @returns {*} - Valor armazenado ou valor padrão
 */
export const getLocalStorageWithExpiration = (key, defaultValue = null) => {
  try {
    const data = getLocalStorage(key)
    
    if (!data || !data.expirationTime) {
      return defaultValue
    }

    if (Date.now() > data.expirationTime) {
      removeLocalStorage(key)
      return defaultValue
    }

    return data.value
  } catch (error) {
    console.error(`Erro ao recuperar com expiração (${key}):`, error)
    return defaultValue
  }
}

/**
 * Hook para usar localStorage em componentes React
 * @param {string} key - Chave para armazenar
 * @param {*} initialValue - Valor inicial
 * @returns {array} - [value, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = React.useState(() => {
    try {
      const item = getLocalStorage(key)
      return item !== null ? item : initialValue
    } catch (error) {
      console.error(`Erro ao inicializar localStorage (${key}):`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      setLocalStorage(key, valueToStore)
    } catch (error) {
      console.error(`Erro ao atualizar localStorage (${key}):`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Classe para gerenciar dados do usuário no localStorage
 */
export class UserDataManager {
  constructor() {
    this.prefix = 'user_'
  }

  /**
   * Salva dados do usuário
   * @param {object} userData - Dados do usuário
   */
  saveUserData(userData) {
    return setLocalStorage(`${this.prefix}data`, userData)
  }

  /**
   * Recupera dados do usuário
   * @returns {object} - Dados do usuário
   */
  getUserData() {
    return getLocalStorage(`${this.prefix}data`, {})
  }

  /**
   * Atualiza um campo específico dos dados do usuário
   * @param {string} field - Campo a atualizar
   * @param {*} value - Novo valor
   */
  updateUserField(field, value) {
    const userData = this.getUserData()
    userData[field] = value
    return this.saveUserData(userData)
  }

  /**
   * Remove dados do usuário
   */
  clearUserData() {
    return removeLocalStorage(`${this.prefix}data`)
  }

  /**
   * Verifica se há dados do usuário salvos
   * @returns {boolean}
   */
  hasUserData() {
    return hasLocalStorage(`${this.prefix}data`)
  }
}

export const userDataManager = new UserDataManager()
