import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../boton/boton'
import './Header.css'
import logo from '../../assets/imagenes/logoalex.jpg'

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
