import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
//import { ArrowLeft, Send } from 'lucide-react'
import Header from '../../../components/Header/Header'
import Button from '../../../components/Button/Button'
import { enviarMensajeMasivo } from '../../../services/Api/mensajesPrivados'
import alertService from '../../../components/sweealert2/sweealert2'
import './AdminMensajeMasivo.css'

const AdminMensajeMasivo = () => {
  const navigate = useNavigate()
  const [mensaje, setMensaje] = useState('')
  const [asunto, setAsunto] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [enviarEmail, setEnviarEmail] = useState(true)
  const [animationComplete, setAnimationComplete] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [mensaje])

  const handleVolver = () => {
    if (mensaje.trim() || asunto.trim()) {
      alertService
        .confirm(
          '¿Abandonar mensaje?',
          'Perderás los datos que has introducido. ¿Quieres volver a la página de usuarios?',
          {
            confirmButtonText: 'Sí, volver',
            cancelButtonText: 'No, continuar editando'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/administracion/usuarios')
          }
        })
    } else {
      navigate('/administracion/usuarios')
    }
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!mensaje.trim() || !asunto.trim()) {
      alertService.error('Error', 'El asunto y el mensaje son obligatorios')
      return
    }

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const resultado = await enviarMensajeMasivo(token, {
        asunto,
        mensaje,
        enviarEmail
      })

      if (resultado && resultado.success) {
        setMensaje('')
        setAsunto('')
        alertService.success(
          '¡Mensaje enviado!',
          'El mensaje ha sido enviado a todos los usuarios'
        )
      } else {
        setError('No se pudo enviar el mensaje masivo')
        alertService.error(
          'Error',
          resultado.message || 'No se pudo enviar el mensaje masivo'
        )
      }
    } catch (error) {
      console.error('Error al enviar mensaje masivo:', error)
      setError(error.message || 'Error al enviar el mensaje masivo')
      alertService.error(
        'Error',
        error.message || 'Error al enviar el mensaje masivo'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className='cf-admin-mensaje-masivo-page'>
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

        <h2 className='cf-admin-mensaje-masivo-heading'>Mensaje Masivo</h2>

        <form
          onSubmit={handleEnviarMensaje}
          className='cf-admin-mensaje-masivo-form'
        >
          <div className='cf-input-wrapper'>
            <div className='cf-input-field'>
              <span className='cf-input-icon cf-mail-icon'></span>
              <input
                type='text'
                name='asunto'
                placeholder='Asunto del mensaje'
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                required
                className='cf-text-input'
                autoComplete='off'
              />
            </div>

            <div className='cf-input-field'>
              <span className='cf-input-icon cf-message-icon'></span>
              <textarea
                ref={textareaRef}
                name='mensaje'
                placeholder='Escribe el mensaje para todos los usuarios...'
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
                className='cf-text-input'
                rows={6}
              />
            </div>

            <div className='cf-admin-mensaje-masivo-checkbox-container'>
              <input
                type='checkbox'
                id='enviarEmail'
                checked={enviarEmail}
                onChange={(e) => setEnviarEmail(e.target.checked)}
                className='cf-admin-mensaje-masivo-checkbox'
              />
              <label
                htmlFor='enviarEmail'
                className='cf-admin-mensaje-masivo-checkbox-label'
              >
                Enviar notificación por email a los usuarios
              </label>
            </div>
          </div>

          <div className='cf-button-container'>
            <Button
              type='button'
              variant='secondary'
              onClick={handleVolver}
              disabled={enviando}
              className='cf-secondary-button'
            >
              Cancelar
            </Button>

            <Button
              type='submit'
              variant='primary'
              disabled={enviando || !mensaje.trim() || !asunto.trim()}
              className='cf-submit-button'
              rightIcon={
                enviando ? (
                  <div className='cf-loader-wrapper'>
                    <div className='cf-spinner'></div>
                  </div>
                ) : (
                  <span className='cf-arrow-right'></span>
                )
              }
            >
              <span className={enviando ? 'cf-hidden-text' : ''}>
                Enviar a todos
              </span>

              {enviando && (
                <div className='cf-loader-wrapper'>
                  <div className='cf-spinner'></div>
                </div>
              )}

              <div className='cf-progress-container'>
                <div className='cf-progress-indicator'></div>
              </div>
            </Button>
          </div>
        </form>

        <p className='cf-login-text'>
          <span onClick={handleVolver} className='cf-login-link'>
            Volver a la lista de usuarios
          </span>
        </p>
      </div>
    </div>
  )
}

export default AdminMensajeMasivo
