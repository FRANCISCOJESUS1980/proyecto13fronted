import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../../assets/imagenes/logoalex.jpg'
import background from '../../assets/imagenes/background.jpg'

const Header = () => {
  return (
    <header className='header'>
      <img src={background} alt='Background' className='header-background' />
      <div className='header-content'>
        <img src={logo} alt='Logo' className='logo' />
        <nav className='nav'>
          <Link to='/'>Inicio</Link>
          <Link to='/registro'>Registro</Link>
          <Link to='/iniciar-sesion'>Iniciar Sesión</Link>
          <Link to='/clases'>Clases</Link>
          <Link to='/productos'>Productos</Link>
          <Link to='/contacto'>Contacto</Link>
          <Link to='/precios'>Precios</Link>
          <Link to='/entrenamientos'>Entrenamientos</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
