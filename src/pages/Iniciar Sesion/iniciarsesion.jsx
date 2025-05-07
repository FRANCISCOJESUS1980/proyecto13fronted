import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import handleSubmitHelper from '../../utils/HandleSubmit'
import alertService from '../../components/sweealert2/sweealert2'
import './iniciarsesion.css'

const Iniciarsesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [intentosFallidos, setIntentosFallidos] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      alertService
        .confirm(
          'Sesión activa',
          'Ya tienes una sesión iniciada. ¿Quieres ir al dashboard?',
          {
            confirmButtonText: 'Ir al dashboard',
            cancelButtonText: 'Cerrar sesión actual'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard')
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('nombre')
            localStorage.removeItem('rol')

            alertService.success(
              'Sesión cerrada',
              'La sesión anterior ha sido cerrada correctamente.'
            )
          }
        })
    }
  }, [navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alertService.error(
        'Email no válido',
        'Por favor, introduce un email válido'
      )
      return false
    }

    if (formData.password.length < 1) {
      alertService.error(
        'Contraseña requerida',
        'Por favor, introduce tu contraseña'
      )
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await handleSubmitHelper(e, 'login', {
        formData,
        setIsLoading,
        navigate,
        onError: () => {
          const nuevosIntentos = intentosFallidos + 1
          setIntentosFallidos(nuevosIntentos)

          if (nuevosIntentos >= 3) {
            alertService.warning(
              'Demasiados intentos fallidos',
              '¿Has olvidado tu contraseña? Contacta con el administrador para restablecerla.'
            )
          }
        }
      })
    } catch (error) {
      console.error('Error en inicio de sesión:', error)
      alertService.error(
        'Error de conexión',
        'No se pudo conectar con el servidor. Inténtalo de nuevo más tarde.'
      )
    }
  }

  const handleRegisterClick = () => {
    if (formData.email || formData.password) {
      alertService
        .confirm(
          '¿Ir a registro?',
          'Perderás los datos introducidos. ¿Quieres ir a la página de registro?',
          {
            confirmButtonText: 'Sí, ir a registro',
            cancelButtonText: 'No, continuar aquí'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/registro')
          }
        })
    } else {
      navigate('/registro')
    }
  }

  const mostrarAyuda = () => {
    alertService.info(
      'Ayuda de inicio de sesión',
      `
      <div style="text-align: left;">
        <p><strong>¿No puedes iniciar sesión?</strong></p>
        <ul>
          <li>Verifica que tu email esté escrito correctamente</li>
          <li>Asegúrate de que tu contraseña sea la correcta</li>
          <li>Si olvidaste tu contraseña, contacta con el administrador</li>
          <li>Si no tienes una cuenta, regístrate primero</li>
        </ul>
      </div>
      `
    )
  }

  return (
    <div className='login-page'>
      <Header />
      <div className='animation-wrapper'>
        <div className='dumbbell-anim'></div>
        <div className='kettlebell-anim'></div>
        <div className='barbell-anim'></div>
      </div>

      <div
        className={`form-wrapper ${animationComplete ? 'form-visible' : ''}`}
      >
        <div className='logo-wrapper'>
          <div className='dumbbell-logo'></div>
        </div>

        <h2 className='login-heading'>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className='login-form'>
          <div className='input-wrapper'>
            <div className='input-field'>
              <span className='input-icon user-icon'></span>
              <input
                type='email'
                name='email'
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleChange}
                required
                className='text-input'
                autoComplete='email'
              />
            </div>

            <div className='input-field'>
              <span className='input-icon lock-icon'></span>
              <input
                type='password'
                name='password'
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                required
                className='text-input'
                autoComplete='current-password'
              />
            </div>
          </div>

          <button type='submit' disabled={isLoading} className='submit-button'>
            <span className={isLoading ? 'hidden-text' : ''}>
              Iniciar Sesión
              <span className='arrow-right'></span>
            </span>

            {isLoading && (
              <div className='loader-wrapper'>
                <div className='spinner'></div>
              </div>
            )}

            <div className='progress-container'>
              <div className='progress-indicator'></div>
            </div>
          </button>
        </form>

        <div className='login-actions'>
          <p className='signup-text'>
            ¿No tienes una cuenta?{' '}
            <span onClick={handleRegisterClick} className='signup-link'>
              Regístrate aquí
            </span>
          </p>

          <p className='help-text'>
            <span onClick={mostrarAyuda} className='help-link'>
              ¿Necesitas ayuda?
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Iniciarsesion
