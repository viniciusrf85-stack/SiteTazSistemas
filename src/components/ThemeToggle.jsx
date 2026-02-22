import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './ThemeToggle.css'

/**
 * Componente para alternar entre Light e Dark Mode
 */
function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDarkMode}
      title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          {isDarkMode ? (
            <Moon size={16} className="theme-icon" />
          ) : (
            <Sun size={16} className="theme-icon" />
          )}
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
