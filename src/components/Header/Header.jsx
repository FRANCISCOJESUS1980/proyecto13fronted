/*import { Link } from 'react-router-dom'
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

export default Header*/
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../boton/boton'
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
    <header className='headerheader'>
      <img
        src={background || '/placeholder.svg'}
        alt='Background'
        className='header-background'
      />
      <div className='header-content'>
        <img src={logo || '/placeholder.svg'} alt='Logo' className='logo' />
        <nav className='nav'>
          <Button variant='secondary' size='sm'>
            <Link to='/'>Inicio</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/registro'>Registro o inicio</Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant='primary' size='sm'>
                <Link to='/dashboard'>Mi Dashboard</Link>
              </Button>

              {(userRole === 'administrador' ||
                userRole === 'admin' ||
                userRole === 'creador') && (
                <Button variant='primary' size='sm'>
                  <Link to='/administracion'>Administración</Link>
                </Button>
              )}
            </>
          ) : (
            <Button variant='primary' size='sm'>
              <Link to='/iniciar-sesion'>Iniciar Sesión</Link>
            </Button>
          )}

          <Button variant='secondary' size='sm'>
            <Link to='/clases'>Clases</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/productos'>Productos</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/contacto'>Contacto</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/precios'>Precios</Link>
          </Button>

          <Button variant='secondary' size='sm'>
            <Link to='/entrenamientos'>Entrenamientos</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Header
