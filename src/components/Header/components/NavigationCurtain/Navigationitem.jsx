import { Link } from 'react-router-dom'

const NavigationItem = ({
  to,
  text,
  icon,
  isActive,
  index,
  hoverItem,
  handleMouseEnter,
  handleMouseLeave,
  toggleMenu
}) => {
  return (
    <li
      className={`cf-nav-item ${isActive(to) ? 'active' : ''}`}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      data-hover={hoverItem === index}
    >
      <Link to={to} className='cf-nav-link' onClick={toggleMenu}>
        <span className='cf-nav-text'>{text}</span>
        <span className='cf-nav-icon'>{icon}</span>
        <div className='cf-nav-link-highlight'></div>
      </Link>
    </li>
  )
}

export default NavigationItem
