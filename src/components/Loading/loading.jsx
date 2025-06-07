import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './loading.css'

const Loading = ({
  isVisible = true,
  onComplete,
  loadingText = 'CARGANDO...'
}) => {
  const [progress, setProgress] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)

  const getPhrasesForContext = (text) => {
    if (text.includes('FORMULARIO MÉDICO') || text.includes('MÉDICO')) {
      return [
        'CARGANDO FORMULARIO MÉDICO...',
        'OBTENIENDO HISTORIAL CLÍNICO...',
        'VERIFICANDO DATOS DE SALUD...',
        'PREPARANDO CAMPOS MÉDICOS...',
        'LISTO PARA COMPLETAR...'
      ]
    }
    if (text.includes('PERFIL') || text.includes('USUARIO')) {
      return [
        'CARGANDO PERFIL DE USUARIO...',
        'OBTENIENDO DATOS PERSONALES...',
        'VERIFICANDO INFORMACIÓN...',
        'PREPARANDO FORMULARIO...',
        'CASI LISTO PARA EDITAR...'
      ]
    }
    if (text.includes('INFORMACIÓN MÉDICA') || text.includes('MEDICAL')) {
      return [
        'CARGANDO INFORMACIÓN MÉDICA...',
        'OBTENIENDO DATOS DE SALUD...',
        'PROCESANDO HISTORIALES...',
        'VERIFICANDO INFORMACIÓN...',
        'PREPARANDO VISTA MÉDICA...'
      ]
    }
    if (text.includes('FACTURACIÓN')) {
      return [
        'CARGANDO FACTURACIÓN...',
        'OBTENIENDO BONOS...',
        'CALCULANDO ESTADÍSTICAS...',
        'PROCESANDO DATOS FINANCIEROS...',
        'PREPARANDO DASHBOARD...'
      ]
    }
    if (text.includes('CONSENTIMIENTOS')) {
      return [
        'CARGANDO CONSENTIMIENTOS...',
        'OBTENIENDO DATOS...',
        'PROCESANDO INFORMACIÓN...',
        'PREPARANDO VISTA...',
        'CASI LISTO...'
      ]
    }

    return [
      loadingText,
      'OBTENIENDO DATOS...',
      'PROCESANDO INFORMACIÓN...',
      'PREPARANDO EXPERIENCIA...',
      'CASI LISTOS...'
    ]
  }

  const phrases = getPhrasesForContext(loadingText)

  const getIconForContext = (text) => {
    if (text.includes('FORMULARIO MÉDICO') || text.includes('MÉDICO'))
      return '🩺'
    if (text.includes('PERFIL') || text.includes('USUARIO')) return '👤'
    if (text.includes('INFORMACIÓN MÉDICA') || text.includes('MEDICAL'))
      return '🏥'
    if (text.includes('FACTURACIÓN')) return '💰'
    if (text.includes('CONSENTIMIENTOS')) return '📋'
    if (text.includes('REDES') || text.includes('SOCIAL')) return '🔗'
    return '⚡'
  }

  const contextIcon = getIconForContext(loadingText)

  const getFooterText = (text) => {
    if (text.includes('FORMULARIO MÉDICO') || text.includes('MÉDICO'))
      return 'Preparando formulario de salud'
    if (text.includes('PERFIL') || text.includes('USUARIO'))
      return 'Preparando edición de perfil'
    if (text.includes('INFORMACIÓN MÉDICA') || text.includes('MEDICAL'))
      return 'Cargando datos médicos de usuarios'
    if (text.includes('FACTURACIÓN')) return 'Cargando datos financieros'
    if (text.includes('CONSENTIMIENTOS'))
      return 'Cargando panel de administración'
    if (text.includes('REDES') || text.includes('SOCIAL'))
      return 'Conectando con tus redes sociales'
    return 'Cargando aplicación'
  }

  const footerText = getFooterText(loadingText)

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }

        return prev + 0.5
      })
    }, 100)

    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearInterval(phraseInterval)
    }
  }, [isVisible, onComplete, phrases.length])

  const particles = Array.from({ length: 10 }, (_, i) => i)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className='cf-loading-container'
        >
          <div className='cf-loading-particles'>
            {particles.map((particle) => (
              <motion.div
                key={particle}
                className='cf-loading-particle'
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y:
                    Math.random() *
                    (typeof window !== 'undefined' ? window.innerHeight : 800)
                }}
                animate={{
                  x:
                    Math.random() *
                    (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y:
                    Math.random() *
                    (typeof window !== 'undefined' ? window.innerHeight : 800),
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>

          <div className='cf-loading-content'>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
              className='cf-loading-logo'
            >
              <div className='cf-loading-logo-circle'>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear'
                  }}
                  className='cf-loading-logo-icon'
                >
                  {contextIcon}
                </motion.div>
              </div>
            </motion.div>

            <div className='cf-loading-barbell-container'>
              <motion.div
                className='cf-loading-barbell'
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  className='cf-loading-weight cf-loading-weight-left'
                  animate={{
                    y: [-5, 5, -5],
                    rotateZ: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut'
                  }}
                />

                <motion.div
                  className='cf-loading-bar'
                  animate={{
                    scaleX: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut'
                  }}
                />

                <motion.div
                  className='cf-loading-weight cf-loading-weight-right'
                  animate={{
                    y: [5, -5, 5],
                    rotateZ: [2, -2, 2]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'easeInOut'
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              className='cf-loading-text-container'
              key={currentPhrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className='cf-loading-text'>{phrases[currentPhrase]}</h2>
            </motion.div>

            <div className='cf-loading-progress-container'>
              <div className='cf-loading-progress-header'>
                <span>PROGRESO</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <div className='cf-loading-progress-bar'>
                <motion.div
                  className='cf-loading-progress-fill'
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <motion.div
                    className='cf-loading-progress-shine'
                    animate={{ x: [-100, 320] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut'
                    }}
                  />
                </motion.div>
              </div>
            </div>

            <div className='cf-loading-rings'>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className='cf-loading-ring'
                  style={{
                    width: 100 + i * 40,
                    height: 100 + i * 40
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 0.2, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.3,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>

            <motion.p
              className='cf-loading-bottom-text'
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {footerText}
            </motion.p>
          </div>

          <motion.div
            className='cf-loading-corner cf-loading-corner-tl'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
          <motion.div
            className='cf-loading-corner cf-loading-corner-tr'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.div
            className='cf-loading-corner cf-loading-corner-bl'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.div
            className='cf-loading-corner cf-loading-corner-br'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loading
