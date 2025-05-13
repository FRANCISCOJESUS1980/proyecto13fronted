import { Link } from 'react-router-dom'
import CartIcon from '../../../../pages/Productos/components/Carticon/Carticon'
import NavigationItem from './NavigationItem'
import './NavigationCurtain.css'

const NavigationCurtain = ({
  menuOpen,
  curtainRef,
  getParallaxStyle,
  isAuthenticated,
  userRole,
  isActive,
  handleMouseEnter,
  handleMouseLeave,
  hoverItem,
  toggleMenu
}) => {
  const isAdmin =
    userRole === 'administrador' ||
    userRole === 'admin' ||
    userRole === 'creador'

  return (
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
            <NavigationItem
              to='/'
              text='Inicio'
              icon={
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
              }
              isActive={isActive}
              index={0}
              hoverItem={hoverItem}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              toggleMenu={toggleMenu}
            />

            {!isAuthenticated && (
              <NavigationItem
                to='/registro'
                text='Registro o inicio'
                icon={
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
                }
                isActive={isActive}
                index={1}
                hoverItem={hoverItem}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                toggleMenu={toggleMenu}
              />
            )}

            {isAuthenticated && (
              <>
                <NavigationItem
                  to='/dashboard'
                  text='Mi Dashboard'
                  icon={
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
                  }
                  isActive={isActive}
                  index={2}
                  hoverItem={hoverItem}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  toggleMenu={toggleMenu}
                />

                {isAdmin && (
                  <NavigationItem
                    to='/administracion'
                    text='Administración'
                    icon={
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
                    }
                    isActive={isActive}
                    index={3}
                    hoverItem={hoverItem}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    toggleMenu={toggleMenu}
                  />
                )}
              </>
            )}

            <NavigationItem
              to='/contacto'
              text='Contacto'
              icon={
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
              }
              isActive={isActive}
              index={4}
              hoverItem={hoverItem}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              toggleMenu={toggleMenu}
            />

            <NavigationItem
              to='/tarifas'
              text='Tarifas'
              icon={
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
              }
              isActive={isActive}
              index={5}
              hoverItem={hoverItem}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              toggleMenu={toggleMenu}
            />

            <NavigationItem
              to='/redessociales'
              text='Redes Sociales'
              icon={
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
              }
              isActive={isActive}
              index={6}
              hoverItem={hoverItem}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              toggleMenu={toggleMenu}
            />

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
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default NavigationCurtain
