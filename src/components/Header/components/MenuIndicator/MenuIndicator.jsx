import './MenuIndicador.css'

const MenuIndicator = ({ menuOpen, toggleMenu, indicatorRef }) => {
  return (
    <div
      className={`cf-menu-indicator ${menuOpen ? 'cf-indicator-active' : ''}`}
      onClick={toggleMenu}
      ref={indicatorRef}
      role='button'
      aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      aria-expanded={menuOpen}
      tabIndex={0}
    >
      <div className='cf-indicator-bar'></div>
      <div className='cf-indicator-text'>{menuOpen ? 'CERRAR' : 'MENÚ'}</div>
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
  )
}

export default MenuIndicator
