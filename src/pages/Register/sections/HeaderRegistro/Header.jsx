import { useState } from 'react'
import './Header.css'

const Header = ({ userName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header-logo'>
          <span className='logo-icon'>💪</span>
          <span className='logo-text'>AderCrossFit</span>
        </div>

        <button
          className='mobile-menu-btn'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'active' : ''}`}>
          <a href='/dashboard' className='nav-link active'>
            Dashboard
          </a>
          <a href='/workouts' className='nav-link'>
            Entrenamientos
          </a>
          <a href='/nutrition' className='nav-link'>
            Nutrición
          </a>
          <a href='/schedule' className='nav-link'>
            Horarios
          </a>
        </nav>

        <div className='header-actions'>
          <div className='notifications'>
            <button className='action-btn'>
              🔔
              <span className='notification-badge'>3</span>
            </button>
          </div>

          <div className='user-menu'>
            <button className='action-btn'>👤 {userName}</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
