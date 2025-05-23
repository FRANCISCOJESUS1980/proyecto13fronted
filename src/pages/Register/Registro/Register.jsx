import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Consentimiento from '../sections/Consentimiento/Consentimiento'
import Header from '../../../components/Header/Header'
import { verificarCodigoAutorizacion } from '../../../services/Api/index'
import handleSubmitHelper from '../../../utils/HandleSubmit'
import alertService from '../../../components/sweealert2/sweealert2'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'usuario',
    codigoAutorizacion: ''
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const maxSize = 5 * 1024 * 1024
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']

      if (file.size > maxSize) {
        alertService.error(
          'Archivo demasiado grande',
          'La imagen debe ser menor a 5MB. Por favor, selecciona otra imagen.'
        )
        return
      }

      if (!validTypes.includes(file.type)) {
        alertService.error(
          'Formato no válido',
          'Por favor, selecciona una imagen en formato JPG, PNG o GIF.'
        )
        return
      }

      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (formData.codigoAutorizacion && !isVerifyingCode) {
      const timeoutId = setTimeout(async () => {
        setIsVerifyingCode(true)

        try {
          const data = await verificarCodigoAutorizacion(
            formData.codigoAutorizacion
          )
          console.log('Respuesta del servidor:', data)
          console.log('Rol recibido:', data.rol)

          if (data && data.success) {
            const nuevoRol = data.rol
            setFormData((prev) => ({ ...prev, rol: nuevoRol }))

            alertService.success(
              'Código válido',
              `Rol asignado: ${
                nuevoRol === 'admin' ? 'Administrador' : 'Entrenador'
              }`
            )
          } else if (formData.codigoAutorizacion.trim() !== '') {
            setFormData((prev) => ({ ...prev, rol: 'usuario' }))
            alertService.error(
              'Código no válido',
              'Se te asignará el rol de usuario'
            )
          }
        } catch (error) {
          console.error('Error al verificar código:', error)
          if (formData.codigoAutorizacion.trim() !== '') {
            setFormData((prev) => ({ ...prev, rol: 'usuario' }))
            alertService.error(
              'Error',
              'Error al verificar código. Se te asignará el rol de usuario'
            )
          }
        } finally {
          setIsVerifyingCode(false)
        }
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [formData.codigoAutorizacion])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (formData.password.length < 6) {
      alertService.error(
        'Contraseña débil',
        'La contraseña debe tener al menos 6 caracteres'
      )
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alertService.error(
        'Email no válido',
        'Por favor, introduce un email válido'
      )
      return false
    }

    if (formData.nombre.trim().length < 3) {
      alertService.error(
        'Nombre demasiado corto',
        'El nombre debe tener al menos 3 caracteres'
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

    await handleSubmitHelper(e, 'registro', {
      formData,
      selectedImage,
      setIsLoading,
      setRegistroExitoso
    })
  }

  const handleLoginClick = () => {
    if (
      formData.nombre ||
      formData.email ||
      formData.password ||
      selectedImage
    ) {
      alertService
        .confirm(
          '¿Abandonar registro?',
          'Perderás los datos que has introducido. ¿Quieres ir a la página de inicio de sesión?',
          {
            confirmButtonText: 'Sí, ir a iniciar sesión',
            cancelButtonText: 'No, continuar con el registro'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/iniciar-sesion')
          }
        })
    } else {
      navigate('/iniciar-sesion')
    }
  }

  return (
    <div className='cf-register-page'>
      {registroExitoso ? (
        <Consentimiento onConsentAccepted={() => navigate('/dashboard')} />
      ) : (
        <>
          <Header />

          <div className='cf-animation-wrapper'>
            <div className='cf-dumbbell-anim'></div>
            <div className='cf-kettlebell-anim'></div>
            <div className='cf-barbell-anim'></div>
          </div>

          <div
            className={`cf-form-wrapper ${
              animationComplete ? 'cf-form-visible' : ''
            }`}
          >
            <div className='cf-logo-wrapper'>
              <div className='cf-dumbbell-logo'></div>
            </div>

            <h2 className='cf-register-heading'>Registro</h2>

            <form onSubmit={handleSubmit} className='cf-register-form'>
              <div className='cf-avatar-upload'>
                <div
                  className='cf-avatar-preview'
                  style={{
                    backgroundImage: previewUrl
                      ? `url(${previewUrl})`
                      : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999999' strokeWidth='1.5'%3E%3Cpath strokeLinecap='round' strokeLinejoin='round' d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'/%3E%3C/svg%3E\")"
                  }}
                >
                  <div className='cf-avatar-overlay'>
                    <span>Cambiar</span>
                  </div>
                </div>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='cf-avatar-input'
                  id='avatar-upload'
                />
                <label htmlFor='avatar-upload' className='cf-avatar-label'>
                  Seleccionar imagen de perfil
                </label>
              </div>

              <div className='cf-input-wrapper'>
                <div className='cf-input-field'>
                  <span className='cf-input-icon cf-user-icon'></span>
                  <input
                    type='text'
                    name='nombre'
                    placeholder='Nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className='cf-text-input'
                    autoComplete='name'
                  />
                </div>

                <div className='cf-input-field'>
                  <span className='cf-input-icon cf-email-icon'></span>
                  <input
                    type='email'
                    name='email'
                    placeholder='Correo electrónico'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='cf-text-input'
                    autoComplete='email'
                  />
                </div>

                <div className='cf-input-field'>
                  <span className='cf-input-icon cf-lock-icon'></span>
                  <input
                    type='password'
                    name='password'
                    placeholder='Contraseña'
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className='cf-text-input'
                    autoComplete='new-password'
                  />
                </div>

                <div className='cf-input-field'>
                  <span className='cf-input-icon cf-key-icon'></span>
                  <input
                    type='text'
                    name='codigoAutorizacion'
                    placeholder='Código de acceso (opcional)'
                    value={formData.codigoAutorizacion}
                    onChange={handleChange}
                    className='cf-text-input'
                    autoComplete='off'
                  />
                </div>

                <div className='cf-input-field cf-role-field'>
                  <span className='cf-input-icon cf-badge-icon'></span>
                  <input
                    type='text'
                    name='rol'
                    value={formData.rol}
                    readOnly
                    className='cf-text-input cf-role-input'
                  />
                  <div className='cf-role-badge'>
                    {formData.rol === 'admin'
                      ? 'Administrador'
                      : formData.rol === 'entrenador' ||
                        formData.rol === 'monitor'
                      ? 'Entrenador'
                      : 'Usuario'}
                  </div>
                </div>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='cf-submit-button'
              >
                <span className={isLoading ? 'cf-hidden-text' : ''}>
                  Registrarse
                  <span className='cf-arrow-right'></span>
                </span>

                {isLoading && (
                  <div className='cf-loader-wrapper'>
                    <div className='cf-spinner'></div>
                  </div>
                )}

                <div className='cf-progress-container'>
                  <div className='cf-progress-indicator'></div>
                </div>
              </button>
            </form>

            <p className='cf-login-text'>
              ¿Ya tienes una cuenta?{' '}
              <span onClick={handleLoginClick} className='cf-login-link'>
                Inicia sesión aquí
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Register
