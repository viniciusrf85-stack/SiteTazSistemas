import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import { ThemeProvider } from './context/ThemeContext'
import { initializeGA } from './utils/analytics'
import './styles/wcagCompliance.css'
import './styles/scrollAnimations.css'
import './App.css'

function App() {
  useEffect(() => {
    initializeGA()
  }, [])

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
