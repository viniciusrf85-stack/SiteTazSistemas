import { useEffect, useRef, useState } from 'react'

/**
 * Hook para animar elementos quando entram na viewport
 * @param {object} options - Opções do Intersection Observer
 * @returns {object} - { ref, isVisible }
 */
export const useScrollAnimation = (options = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        // Parar de observar após primeira vez
        observer.unobserve(entry.target)
      }
    }, defaultOptions)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return { ref, isVisible }
}

/**
 * Hook para rastrear scroll depth
 * @param {function} callback - Função chamada quando scroll muda
 */
export const useScrollDepth = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100
      
      if (callback) {
        callback(scrollPercentage)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [callback])
}

/**
 * Hook para rastrear quando usuário chega em uma seção
 * @param {string} sectionId - ID da seção
 * @param {function} callback - Função chamada quando seção é visível
 */
export const useScrollToSection = (sectionId, callback) => {
  useEffect(() => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && callback) {
          callback(sectionId)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(section)

    return () => observer.unobserve(section)
  }, [sectionId, callback])
}

/**
 * Hook para parallax effect
 * @param {number} speed - Velocidade do parallax (0-1)
 * @returns {object} - { ref, offset }
 */
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const elementTop = rect.top
      const elementHeight = rect.height
      const windowHeight = window.innerHeight

      // Calcular quanto do elemento está visível
      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        const scrolled = window.scrollY
        setOffset(scrolled * speed)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { ref, offset }
}

/**
 * Hook para fade in animation ao scroll
 * @param {object} options - Opções customizadas
 * @returns {object} - { ref, isVisible }
 */
export const useFadeInOnScroll = (options = {}) => {
  return useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  })
}

/**
 * Hook para slide in animation ao scroll
 * @param {object} options - Opções customizadas
 * @returns {object} - { ref, isVisible }
 */
export const useSlideInOnScroll = (options = {}) => {
  return useScrollAnimation({
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
    ...options
  })
}
