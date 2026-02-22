import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

/**
 * Provider para gerenciar Dark Mode
 * Deve envolver toda a aplicação em App.jsx
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar preferência salva no localStorage
    const saved = localStorage.getItem('taz_theme_mode')
    if (saved) {
      return saved === 'dark'
    }

    // Verificar preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Atualizar documento quando mudar tema
  useEffect(() => {
    const htmlElement = document.documentElement
    
    if (isDarkMode) {
      htmlElement.classList.add('dark-mode')
      htmlElement.style.colorScheme = 'dark'
    } else {
      htmlElement.classList.remove('dark-mode')
      htmlElement.style.colorScheme = 'light'
    }

    // Salvar preferência
    localStorage.setItem('taz_theme_mode', isDarkMode ? 'dark' : 'light')

    // Atualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDarkMode ? '#0a0a0a' : '#1A1A2E'
      )
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook para usar o contexto de tema
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider')
  }
  return context
}
