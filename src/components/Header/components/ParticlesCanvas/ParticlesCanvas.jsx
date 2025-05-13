import { useEffect, useRef } from 'react'
import './ParticlesCanvas.css'

const ParticlesCanvas = ({
  mouseVelocity,
  mouseSpeed,
  lastMousePosition,
  clickEffectActive,
  clickPosition
}) => {
  const particlesRef = useRef(null)
  const particlesArray = useRef([])
  const animationFrameId = useRef(null)

  useEffect(() => {
    if (!particlesRef.current) return

    const canvas = particlesRef.current
    const ctx = canvas.getContext('2d')
    const particles = particlesArray.current
    let width, height

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = canvas.offsetHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }

    const createParticles = () => {
      particles.length = 0
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1,
          baseSize: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          baseSpeedX: Math.random() * 1 - 0.5,
          baseSpeedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? '#ff3a3a' : '#ffffff',
          explosionFactor: 0
        })
      }
    }

    const connectParticles = (p1, p2) => {
      const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
      const maxDistance = 100

      if (distance < maxDistance) {
        ctx.beginPath()
        ctx.strokeStyle = `rgba(255, 255, 255, ${
          0.2 * (1 - distance / maxDistance)
        })`
        ctx.lineWidth = 0.5
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height)

      const mouseVelX = mouseVelocity.x
      const mouseVelY = mouseVelocity.y
      const speed = mouseSpeed

      if (speed > 1) {
        ctx.beginPath()
        ctx.arc(
          lastMousePosition.x,
          lastMousePosition.y - canvas.getBoundingClientRect().top,
          Math.min(speed * 2, 50),
          0,
          Math.PI * 2
        )
        ctx.fillStyle = `rgba(255, 0, 0, ${Math.min(speed / 20, 0.3)})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const speedFactor = Math.min(speed / 5, 10)

        p.speedX = p.baseSpeedX + mouseVelX * 0.05
        p.speedY = p.baseSpeedY + mouseVelY * 0.05

        p.size = p.baseSize * (1 + speedFactor * 0.1)

        if (clickEffectActive.current) {
          const dx = p.x - clickPosition.current.x
          const dy = p.y - clickPosition.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const angle = Math.atan2(dy, dx)
            const force = (1 - distance / 150) * 10
            p.explosionFactor = force
            p.speedX += Math.cos(angle) * force
            p.speedY += Math.sin(angle) * force
          }
        } else {
          p.explosionFactor *= 0.95
        }

        p.x +=
          p.speedX * (1 + speedFactor * 0.5) +
          p.explosionFactor * Math.cos(Math.random() * Math.PI * 2)
        p.y +=
          p.speedY * (1 + speedFactor * 0.5) +
          p.explosionFactor * Math.sin(Math.random() * Math.PI * 2)

        if (p.x > width) p.x = 0
        else if (p.x < 0) p.x = width
        if (p.y > height) p.y = 0
        else if (p.y < 0) p.y = height

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)

        const particleColor =
          speed > 5
            ? `rgba(255, ${Math.max(0, 255 - speed * 10)}, ${Math.max(
                0,
                255 - speed * 20
              )}, 1)`
            : p.color

        gradient.addColorStop(0, particleColor)
        gradient.addColorStop(1, 'rgba(255, 58, 58, 0)')
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        if (speed > 5) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 100, 100, ${Math.min(speed / 30, 0.5)})`
          ctx.lineWidth = 1
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - p.speedX * 5, p.y - p.speedY * 5)
          ctx.stroke()
        }

        for (let j = i + 1; j < particles.length; j++) {
          connectParticles(p, particles[j])
        }
      }

      animationFrameId.current = requestAnimationFrame(animateParticles)
    }

    window.addEventListener('resize', () => {
      resizeCanvas()
      createParticles()
    })

    resizeCanvas()
    createParticles()
    animateParticles()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [
    mouseVelocity,
    mouseSpeed,
    lastMousePosition,
    clickEffectActive,
    clickPosition
  ])

  return <canvas ref={particlesRef} className='cf-particles'></canvas>
}

export default ParticlesCanvas
