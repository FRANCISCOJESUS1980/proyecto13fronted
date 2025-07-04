import { useLocation } from 'react-router-dom'
import { useEffect, useState, useCallback, useRef } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useScrollPosition } from '../hooks/useScrollPosition'
import { useMouseEffects } from '../hooks/useMouseEffects'
import { useReducedMotion } from '../hooks/useReduceMotion'
import Logo from '../components/logo/logo'
import MenuIndicator from '../components/MenuIndicator/MenuIndicator'
import NavigationCurtain from '../components/NavigationCurtain/NavigationCurtain'
import ParticlesCanvas from '../components/ParticlesCanvas/ParticlesCanvas'
import './Header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoverItem, setHoverItem] = useState(null)

  const location = useLocation()
  const headerRef = useRef(null)
  const curtainRef = useRef(null)
  const indicatorRef = useRef(null)

  const { isAuthenticated, userRole } = useAuth()
  const { scrollPosition, isScrolling } = useScrollPosition()
  const {
    mousePosition,
    mouseVelocity,
    mouseSpeed,
    lastMousePosition,
    clickEffectActive,
    clickPosition
  } = useMouseEffects()
  const { isReducedMotion } = useReducedMotion()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

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
        <ParticlesCanvas
          mouseVelocity={mouseVelocity}
          mouseSpeed={mouseSpeed}
          lastMousePosition={lastMousePosition}
          clickEffectActive={clickEffectActive}
          clickPosition={clickPosition}
        />
        <div className='cf-header-bg'>
          <div className='cf-header-bg-gradient'></div>
          <div className='cf-header-bg-noise'></div>
        </div>
        <div className='cf-header-content'>
          <Logo menuOpen={menuOpen} />
          <MenuIndicator
            menuOpen={menuOpen}
            toggleMenu={toggleMenu}
            indicatorRef={indicatorRef}
          />
        </div>
      </header>

      <NavigationCurtain
        menuOpen={menuOpen}
        curtainRef={curtainRef}
        getParallaxStyle={getParallaxStyle}
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        isActive={isActive}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        hoverItem={hoverItem}
        toggleMenu={toggleMenu}
      />
    </>
  )
}

export default Header
