import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import {
  obtenerMensajesPrivados,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos
} from '../../../../services/Api/mensajesPrivados'
import { getImageUrl } from '../../../../pages/Clases/utils/imageUtils'
import './UsuarioMensajePrivado.css'

const UsuarioMensajePrivado = () => {
  const navigate = useNavigate()
  const [adminInfo, setAdminInfo] = useState(null)
  const [conversacionId, setConversacionId] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)
  const [userId, setUserId] = useState(null)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      setUserId(storedUserId)
    }
  }, [])

  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const data = await obtenerMensajesPrivados(token)

        if (data.success && data.data.length > 0) {
          const conversacion = data.data[0]
          setAdminInfo(conversacion.admin)
          setConversacionId(conversacion._id)

          if (conversacion._id) {
            await cargarMensajesConversacion(token, conversacion._id)
          }
        } else {
          setMensajes([])
          setLoading(false)
        }
      } catch (error) {
        console.error('Error al cargar conversaciones:', error)
        setError(
          'No se pudo cargar la conversación. Por favor, intenta de nuevo más tarde.'
        )
        setLoading(false)
      }
    }

    fetchConversaciones()
  }, [navigate])

  const cargarMensajesConversacion = async (token, convId) => {
    try {
      if (!convId) return

      console.log('Cargando mensajes para conversación ID:', convId)

      const data = await obtenerMensajesConversacion(token, convId)

      if (data.success) {
        setMensajes(data.data || [])

        await marcarMensajesComoLeidos(token, convId)
        console.log('Mensajes marcados como leídos')
      } else {
        console.error('Error en la respuesta al obtener mensajes:', data)
        setError('No se pudieron cargar los mensajes.')
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
      setError('Error al cargar los mensajes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  const handleVolver = () => {
    navigate('/dashboard')
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() || !adminInfo) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const destinatarioId = adminInfo._id

      const resultado = await enviarMensajePrivado(
        token,
        destinatarioId,
        nuevoMensaje
      )

      if (resultado.success) {
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')

        if (conversacionId) {
          await cargarMensajesConversacion(token, conversacionId)
        }
      } else {
        setError('No se pudo enviar el mensaje')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setError('Error al enviar el mensaje. Por favor, intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className='cf-mensajes-container'>
      <div className='cf-mensajes-animation-wrapper'>
        <div className='cf-mensajes-bubble-anim'></div>
        <div className='cf-mensajes-chat-anim'></div>
      </div>

      <Header />

      <div className='cf-mensajes-back-button'>
        <Button variant='secondary' size='sm' onClick={handleVolver}>
          <span className='cf-mensajes-back-icon'></span>
          Volver al dashboard
        </Button>
      </div>

      <div
        className={`cf-mensajes-content-wrapper ${
          animationComplete ? 'cf-mensajes-content-visible' : ''
        }`}
      >
        <div className='cf-mensajes-header'>
          <div className='cf-mensajes-title-container'>
            <div className='cf-mensajes-logo-wrapper'>
              <div className='cf-mensajes-chat-logo'></div>
            </div>
            <h1 className='cf-mensajes-heading'>Mensajes con Administración</h1>
          </div>
        </div>

        {error && (
          <div className='cf-mensajes-error'>
            <span className='cf-mensajes-error-icon'></span>
            {error}
          </div>
        )}

        <div className='cf-mensajes-chat-container'>
          {adminInfo && (
            <div className='cf-mensajes-chat-header'>
              <div className='cf-mensajes-avatar-container'>
                <img
                  src={getImageUrl(adminInfo) || '/default-avatar.png'}
                  alt={adminInfo.nombre}
                  className='cf-mensajes-avatar'
                />
                <span className='cf-mensajes-status-indicator'></span>
              </div>
              <div className='cf-mensajes-chat-info'>
                <h2 className='cf-mensajes-chat-name'>{adminInfo.nombre}</h2>
                <p className='cf-mensajes-chat-role'>Administrador</p>
              </div>
            </div>
          )}

          <div className='cf-mensajes-messages-container' ref={mensajesRef}>
            {loading ? (
              <div className='cf-mensajes-loading'>
                <div className='cf-mensajes-spinner'></div>
                <p>Cargando mensajes...</p>
              </div>
            ) : mensajes.length === 0 ? (
              <div className='cf-mensajes-empty'>
                <div className='cf-mensajes-empty-icon'></div>
                <p>No hay mensajes previos.</p>
                <p>
                  Envía un mensaje para comenzar una conversación con el
                  administrador.
                </p>
              </div>
            ) : (
              <div className='cf-mensajes-messages-list'>
                {mensajes.map((mensaje) => {
                  const esUsuarioActual = mensaje.remitente._id === userId

                  return (
                    <div
                      key={mensaje._id}
                      className={`cf-mensajes-message ${
                        esUsuarioActual
                          ? 'cf-mensajes-sent'
                          : 'cf-mensajes-received'
                      }`}
                    >
                      <div className='cf-mensajes-message-content'>
                        <p>{mensaje.mensaje}</p>
                        <span className='cf-mensajes-message-time'>
                          {new Date(mensaje.fecha).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <form className='cf-mensajes-form' onSubmit={handleEnviarMensaje}>
            <div className='cf-mensajes-input-container'>
              <textarea
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder='Escribe un mensaje...'
                disabled={enviando || !adminInfo}
                className='cf-mensajes-textarea'
              />
              <button
                type='submit'
                className='cf-mensajes-send-button'
                disabled={enviando || !nuevoMensaje.trim() || !adminInfo}
              >
                {enviando ? (
                  <div className='cf-mensajes-spinner-small'></div>
                ) : (
                  <span className='cf-mensajes-send-icon'></span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UsuarioMensajePrivado
