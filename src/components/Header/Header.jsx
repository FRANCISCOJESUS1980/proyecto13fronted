import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Header.css'
import logo from '../../assets/imagenes/logoalex.jpg'
import background from '../../assets/imagenes/background.jpg'

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    setIsAuthenticated(!!token)
    setUserRole(role)
  }, [])

  return (
    <header className='header'>
      <img src={background} alt='Background' className='header-background' />
      <div className='header-content'>
        <img src={logo} alt='Logo' className='logo' />
        <nav className='nav'>
          <Link to='/'>Inicio</Link>
          <Link to='/registro'>Registro o inicio</Link>
          {isAuthenticated ? (
            <>
              <Link to='/dashboard'>Mi Dashboard</Link>
              {(userRole === 'administrador' ||
                userRole === 'admin' ||
                userRole === 'creador') && (
                <Link to='/administracion'>Administración</Link>
              )}
            </>
          ) : (
            <Link to='/iniciar-sesion'>Iniciar Sesión</Link>
          )}
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
