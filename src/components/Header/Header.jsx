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
  const location = useLocation()
  const headerRef = useRef(null)
  const curtainRef = useRef(null)
  const indicatorRef = useRef(null)
  const logoRef = useRef(null)
  const particlesRef = useRef(null)
  const particlesArray = useRef([])
  const animationFrameId = useRef(null)

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
    if (!particlesRef.current || menuOpen) return

    const canvas = particlesRef.current
    const ctx = canvas.getContext('2d')
    const particles = particlesArray.current

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = 270
    }

    const createParticles = () => {
      particles.length = 0
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.5 + 0.1
        })
      }
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, `rgba(255, 58, 58, ${p.opacity})`)
        gradient.addColorStop(1, 'rgba(255, 58, 58, 0)')
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        p.x += p.speedX
        p.y += p.speedY

        if (p.x > canvas.width) p.x = 0
        else if (p.x < 0) p.x = canvas.width

        if (p.y > canvas.height) p.y = 0
        else if (p.y < 0) p.y = canvas.height
      }

      animationFrameId.current = requestAnimationFrame(animateParticles)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    createParticles()
    animateParticles()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [menuOpen])

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

  return (
    <>
      <header
        className={`cf-header ${
          scrollPosition > 50 ? 'cf-header-scrolled' : ''
        }`}
        ref={headerRef}
        data-menu-open={menuOpen}
      >
        <canvas ref={particlesRef} className='cf-particles'></canvas>
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
          <div className='cf-curtain-shape cf-shape-1'></div>
          <div className='cf-curtain-shape cf-shape-2'></div>
          <div className='cf-curtain-shape cf-shape-3'></div>
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
