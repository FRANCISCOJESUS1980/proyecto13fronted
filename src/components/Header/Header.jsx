import { Link, useLocation } from 'react-router-dom'
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

export default Header
