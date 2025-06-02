import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './loading.css'

const Loading = ({ isVisible = true, onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(0)

  const phrases = [
    'CONECTANDO REDES SOCIALES...',
    'CARGANDO CONTENIDO...',
    'PREPARANDO EXPERIENCIA...',
    'ACTIVANDO MODO SOCIAL...',
    'CASI LISTOS PARA CONECTAR...'
  ]

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }
        return prev + /*2*/ 0.5
      })
    }, /*30*/ 50)

    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(phraseInterval)
    }
  }, [isVisible, onComplete])

  const particles = Array.from({ length: 20 }, (_, i) => i)

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
                  duration: 3 + Math.random() * 2,
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
                  🔗
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
                <span>{progress}%</span>
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
              Conectando con tus redes sociales
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
