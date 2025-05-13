import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from './useReduceMotion'

export const useMouseEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 })
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 })
  const [mouseSpeed, setMouseSpeed] = useState(0)

  const { isReducedMotion } = useReducedMotion()
  const lastUpdateTime = useRef(Date.now())
  const clickEffectActive = useRef(false)
  const clickPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isReducedMotion) return

    const handleMouseMove = (e) => {
      const now = Date.now()
      const dt = now - lastUpdateTime.current
      lastUpdateTime.current = now

      const newPosition = {
        x: e.clientX,
        y: e.clientY
      }

      if (dt > 0) {
        const velX = ((newPosition.x - lastMousePosition.x) / dt) * 5
        const velY = ((newPosition.y - lastMousePosition.y) / dt) * 5

        setMouseVelocity({ x: velX, y: velY })

        const speed = Math.sqrt(velX * velX + velY * velY)
        setMouseSpeed(speed)
      }

      setLastMousePosition(newPosition)
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      })
    }

    const handleClick = (e) => {
      clickEffectActive.current = true
      clickPosition.current = {
        x: e.clientX,
        y:
          e.clientY -
          (document.querySelector('.cf-header')?.getBoundingClientRect().top ||
            0)
      }

      setTimeout(() => {
        clickEffectActive.current = false
      }, 1000)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [isReducedMotion, lastMousePosition.x, lastMousePosition.y])

  return {
    mousePosition,
    mouseVelocity,
    lastMousePosition,
    mouseSpeed,
    clickEffectActive,
    clickPosition
  }
}
