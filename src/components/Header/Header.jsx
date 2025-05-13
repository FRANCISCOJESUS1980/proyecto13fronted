/*import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback, memo, useRef } from 'react'
import Button from '../Button/Button'
import CartIcon from '../../pages/Productos/components/Carticon/Carticon'
import './Header.css'
import logo from '../../../public/imagenes/logoalex.jpg'

const MobileMenuButton = memo(({ isOpen, onClick }) => {
  return (
    <button
      className={`cf-mobile-menu-button ${isOpen ? 'cf-mobile-menu-open' : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={isOpen}
    >
      <div className='cf-mobile-menu-icon'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  )
})

MobileMenuButton.displayName = 'MobileMenuButton'

const NavLink = memo(({ to, variant = 'secondary', children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <Button
      variant={isActive ? 'primary' : variant}
      size='sm'
      className={isActive ? 'active-link' : ''}
    >
      <Link to={to}>{children}</Link>
    </Button>
  )
})

NavLink.displayName = 'NavLink'

const MenuOverlay = memo(({ isVisible, onClick }) => {
  return (
    <div
      className={`cf-menu-overlay ${isVisible ? 'cf-overlay-visible' : ''}`}
      onClick={onClick}
      aria-hidden='true'
    />
  )
})

MenuOverlay.displayName = 'MenuOverlay'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef(null)
  const navRef = useRef(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('rol')?.toLowerCase().trim()

      setIsAuthenticated(!!token)
      setUserRole(role || '')
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        event.target.closest('.cf-mobile-menu-button') === null
      ) {
        setMenuOpen(false)
      }
    }

    const handleEscKey = (event) => {
      if (menuOpen && event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)

    if (menuOpen && window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => !prevState)
  }, [])

  const isAdmin =
    userRole === 'administrador' ||
    userRole === 'admin' ||
    userRole === 'creador'

  return (
    <header className='cf-header' ref={headerRef}>
      <div className='cf-header-content'>
        <div className='cf-logo-container'>
          <img
            src={logo || '/placeholder.svg'}
            alt='Logo'
            className='cf-logo'
            loading='eager'
            width='100%'
            height='150'
          />
        </div>

        <MobileMenuButton isOpen={menuOpen} onClick={toggleMenu} />
        <MenuOverlay isVisible={menuOpen} onClick={() => setMenuOpen(false)} />

        <nav className={`cf-nav ${menuOpen ? 'cf-nav-open' : ''}`} ref={navRef}>
          <NavLink to='/'>Inicio</NavLink>

          {!isAuthenticated && (
            <NavLink to='/registro'>Registro o inicio</NavLink>
          )}

          {isAuthenticated && (
            <>
              <NavLink to='/dashboard' variant='primary'>
                Mi Dashboard
              </NavLink>

              {isAdmin && (
                <NavLink to='/administracion' variant='primary'>
                  Administración
                </NavLink>
              )}
            </>
          )}

          <NavLink to='/contacto'>Contacto</NavLink>
          <NavLink to='/tarifas'>Tarifas</NavLink>
          <NavLink to='/redessociales'>RedesSociales</NavLink>
          <NavLink to='/productos'>Productos</NavLink>

          <div className='cf-cart-wrapper'>
            <CartIcon />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header*/

import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef } from 'react'
import CartIcon from '../../pages/Productos/components/Carticon/Carticon'
import './Header.css'
import logo from '../../../public/imagenes/logoalex.jpg'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoverItem, setHoverItem] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 })
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 })
  const [mouseSpeed, setMouseSpeed] = useState(0)

  const location = useLocation()
  const headerRef = useRef(null)
  const curtainRef = useRef(null)
  const indicatorRef = useRef(null)
  const logoRef = useRef(null)
  const particlesRef = useRef(null)
  const particlesArray = useRef([])
  const animationFrameId = useRef(null)
  const lastUpdateTime = useRef(Date.now())
  const clickEffectActive = useRef(false)
  const clickPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = () => setIsReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('rol')?.toLowerCase().trim()

      setIsAuthenticated(!!token)
      setUserRole(role || '')
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position)

      if (!isScrolling) {
        setIsScrolling(true)
        setTimeout(() => setIsScrolling(false), 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling])

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
        y: e.clientY - (headerRef.current?.getBoundingClientRect().top || 0)
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
  }, [mouseVelocity, mouseSpeed])

  useEffect(() => {
    if (!logoRef.current || menuOpen) return

    const logo = logoRef.current

    const handleMouseMove = (e) => {
      const rect = logo.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const tiltX = ((y - centerY) / centerY) * 10
      const tiltY = ((centerX - x) / centerX) * 10

      logo.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`
    }

    const handleMouseLeave = () => {
      logo.style.transform =
        'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    logo.addEventListener('mousemove', handleMouseMove)
    logo.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      logo.removeEventListener('mousemove', handleMouseMove)
      logo.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [menuOpen])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'

      window.scrollTo({ top: 0, behavior: 'smooth' })

      const updateCurtainHeight = () => {
        const curtain = curtainRef.current
        if (curtain) {
          curtain.style.display = 'none'
          curtain.offsetHeight
          curtain.style.display = 'flex'
        }
      }

      setTimeout(updateCurtainHeight, 300)

      const timer = setTimeout(() => {
        const items = document.querySelectorAll('.cf-nav-item')
        items.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('cf-item-visible')
          }, index * 100)
        })
      }, 300)

      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''

      const items = document.querySelectorAll('.cf-nav-item')
      items.forEach((item) => {
        item.classList.remove('cf-item-visible')
      })
    }
  }, [menuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prevState) => {
      if (!prevState) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return !prevState
    })
  }, [])

  const isAdmin =
    userRole === 'administrador' ||
    userRole === 'admin' ||
    userRole === 'creador'

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleMouseEnter = (index) => {
    setHoverItem(index)
  }

  const handleMouseLeave = () => {
    setHoverItem(null)
  }

  const getParallaxStyle = (depth = 1) => {
    if (isReducedMotion) return {}

    const x = (mousePosition.x - 0.5) * depth * 30
    const y = (mousePosition.y - 0.5) * depth * 30
    return {
      transform: `translate(${x}px, ${y}px)`
    }
  }

  return (
    <>
      <header
        className={`cf-header ${
          scrollPosition > 50 ? 'cf-header-scrolled' : ''
        }`}
        ref={headerRef}
        data-menu-open={menuOpen}
      >
        <canvas
          ref={particlesRef}
          className='cf-particles'
          style={{ zIndex: 2 }}
        ></canvas>
        <div className='cf-header-bg'>
          <div className='cf-header-bg-gradient'></div>
          <div className='cf-header-bg-noise'></div>
        </div>
        <div className='cf-header-content'>
          <div className='cf-logo-container' ref={logoRef}>
            <div className='cf-logo-reflection'></div>
            <img
              src={logo || '/placeholder.svg'}
              alt='Logo CrossFit Box'
              className='cf-logo'
              loading='eager'
            />
            <div className='cf-logo-glow'></div>
            <div className='cf-logo-shine'></div>
          </div>

          <div
            className={`cf-menu-indicator ${
              menuOpen ? 'cf-indicator-active' : ''
            }`}
            onClick={toggleMenu}
            ref={indicatorRef}
            role='button'
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            tabIndex={0}
          >
            <div className='cf-indicator-bar'></div>
            <div className='cf-indicator-text'>
              {menuOpen ? 'CERRAR' : 'MENÚ'}
            </div>
            <div className='cf-indicator-arrow'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='6 9 12 15 18 9'></polyline>
              </svg>
            </div>
            <div className='cf-indicator-pulse'></div>
          </div>
        </div>
      </header>

      <div
        className={`cf-curtain ${menuOpen ? 'cf-curtain-open' : ''}`}
        ref={curtainRef}
      >
        <div className='cf-curtain-bg'>
          <div
            className='cf-curtain-shape cf-shape-1'
            style={getParallaxStyle(0.2)}
          ></div>
          <div
            className='cf-curtain-shape cf-shape-2'
            style={getParallaxStyle(0.4)}
          ></div>
          <div
            className='cf-curtain-shape cf-shape-3'
            style={getParallaxStyle(0.3)}
          ></div>
          <div className='cf-curtain-noise'></div>
        </div>

        <div className='cf-curtain-content'>
          <nav className='cf-nav'>
            <ul className='cf-nav-list'>
              <li
                className={`cf-nav-item ${isActive('/') ? 'active' : ''}`}
                onMouseEnter={() => handleMouseEnter(0)}
                onMouseLeave={handleMouseLeave}
                data-hover={hoverItem === 0}
              >
                <Link to='/' className='cf-nav-link' onClick={toggleMenu}>
                  <span className='cf-nav-text'>Inicio</span>
                  <span className='cf-nav-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'></path>
                      <polyline points='9 22 9 12 15 12 15 22'></polyline>
                    </svg>
                  </span>
                  <div className='cf-nav-link-highlight'></div>
                </Link>
              </li>

              {!isAuthenticated && (
                <li
                  className={`cf-nav-item ${
                    isActive('/registro') ? 'active' : ''
                  }`}
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={handleMouseLeave}
                  data-hover={hoverItem === 1}
                >
                  <Link
                    to='/registro'
                    className='cf-nav-link'
                    onClick={toggleMenu}
                  >
                    <span className='cf-nav-text'>Registro o inicio</span>
                    <span className='cf-nav-icon'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                        <circle cx='12' cy='7' r='4'></circle>
                      </svg>
                    </span>
                    <div className='cf-nav-link-highlight'></div>
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <>
                  <li
                    className={`cf-nav-item ${
                      isActive('/dashboard') ? 'active' : ''
                    }`}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                    data-hover={hoverItem === 2}
                  >
                    <Link
                      to='/dashboard'
                      className='cf-nav-link'
                      onClick={toggleMenu}
                    >
                      <span className='cf-nav-text'>Mi Dashboard</span>
                      <span className='cf-nav-icon'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <rect
                            x='3'
                            y='3'
                            width='18'
                            height='18'
                            rx='2'
                            ry='2'
                          ></rect>
                          <line x1='3' y1='9' x2='21' y2='9'></line>
                          <line x1='9' y1='21' x2='9' y2='9'></line>
                        </svg>
                      </span>
                      <div className='cf-nav-link-highlight'></div>
                    </Link>
                  </li>

                  {isAdmin && (
                    <li
                      className={`cf-nav-item ${
                        isActive('/administracion') ? 'active' : ''
                      }`}
                      onMouseEnter={() => handleMouseEnter(3)}
                      onMouseLeave={handleMouseLeave}
                      data-hover={hoverItem === 3}
                    >
                      <Link
                        to='/administracion'
                        className='cf-nav-link'
                        onClick={toggleMenu}
                      >
                        <span className='cf-nav-text'>Administración</span>
                        <span className='cf-nav-icon'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M12 20h9'></path>
                            <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'></path>
                          </svg>
                        </span>
                        <div className='cf-nav-link-highlight'></div>
                      </Link>
                    </li>
                  )}
                </>
              )}

              <li
                className={`cf-nav-item ${
                  isActive('/contacto') ? 'active' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(4)}
                onMouseLeave={handleMouseLeave}
                data-hover={hoverItem === 4}
              >
                <Link
                  to='/contacto'
                  className='cf-nav-link'
                  onClick={toggleMenu}
                >
                  <span className='cf-nav-text'>Contacto</span>
                  <span className='cf-nav-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'></path>
                    </svg>
                  </span>
                  <div className='cf-nav-link-highlight'></div>
                </Link>
              </li>

              <li
                className={`cf-nav-item ${
                  isActive('/tarifas') ? 'active' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(5)}
                onMouseLeave={handleMouseLeave}
                data-hover={hoverItem === 5}
              >
                <Link
                  to='/tarifas'
                  className='cf-nav-link'
                  onClick={toggleMenu}
                >
                  <span className='cf-nav-text'>Tarifas</span>
                  <span className='cf-nav-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <line x1='12' y1='1' x2='12' y2='23'></line>
                      <path d='M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'></path>
                    </svg>
                  </span>
                  <div className='cf-nav-link-highlight'></div>
                </Link>
              </li>

              <li
                className={`cf-nav-item ${
                  isActive('/redessociales') ? 'active' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(6)}
                onMouseLeave={handleMouseLeave}
                data-hover={hoverItem === 6}
              >
                <Link
                  to='/redessociales'
                  className='cf-nav-link'
                  onClick={toggleMenu}
                >
                  <span className='cf-nav-text'>Redes Sociales</span>
                  <span className='cf-nav-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z'></path>
                    </svg>
                  </span>
                  <div className='cf-nav-link-highlight'></div>
                </Link>
              </li>

              <li
                className={`cf-nav-item ${
                  isActive('/productos') ? 'active' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(7)}
                onMouseLeave={handleMouseLeave}
                data-hover={hoverItem === 7}
              >
                <Link
                  to='/productos'
                  className='cf-nav-link cf-productos-link'
                  onClick={toggleMenu}
                >
                  <span className='cf-nav-text'>Productos</span>
                  <span className='cf-nav-icon'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z'></path>
                      <line x1='3' y1='6' x2='21' y2='6'></line>
                      <path d='M16 10a4 4 0 0 1-8 0'></path>
                    </svg>
                  </span>
                  <div className='cf-nav-link-highlight'></div>
                </Link>
                <div
                  className='cf-cart-wrapper'
                  onClick={(e) => e.stopPropagation()}
                >
                  <CartIcon />
                  <div className='cf-cart-pulse'></div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
