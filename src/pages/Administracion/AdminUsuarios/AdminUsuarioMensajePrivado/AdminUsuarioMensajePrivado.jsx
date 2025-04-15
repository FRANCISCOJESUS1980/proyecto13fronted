import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import { obtenerUsuarioPorId } from '../../../../services/Api/usuarios'
import {
  obtenerConversacion,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos
} from '../../../../services/Api/mensajesPrivados'
import { getImageUrl } from '../../../../pages/Clases/utils/imageUtils'
import './AdminUsuarioMensajePrivado.css'

const AdminUsuarioMensajes = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [conversacionActual, setConversacionActual] = useState(null)
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [fadeIn, setFadeIn] = useState(false)
  const mensajesRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        if (!userId) {
          setError('ID de usuario no válido')
          setLoading(false)
          return
        }

        console.log('Cargando datos para usuario:', userId)

        const userData = await obtenerUsuarioPorId(userId, token)
        if (userData && userData.data) {
          setUserInfo(userData.data)
        } else {
          throw new Error('No se pudo obtener la información del usuario')
        }

        const conversacionData = await obtenerConversacion(token, userId)
        console.log('Respuesta de conversación:', conversacionData)

        if (conversacionData && conversacionData.success) {
          setMensajes(conversacionData.data || [])

          if (
            conversacionData.conversacion ||
            conversacionData.conversacionActual
          ) {
            const conv =
              conversacionData.conversacion ||
              conversacionData.conversacionActual
            setConversacionActual(conv)

            if (conv && conv._id) {
              await cargarMensajesConversacion(token, conv._id)
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError(error.message || 'Error al cargar datos')
      } finally {
        setLoading(false)

        setTimeout(() => setFadeIn(true), 100)
      }
    }

    fetchData()
  }, [userId, navigate])

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
    }
  }

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [nuevoMensaje])

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() || !userId) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const resultado = await enviarMensajePrivado(token, userId, nuevoMensaje)

      if (resultado && resultado.success) {
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')

        if (conversacionActual && conversacionActual._id) {
          await cargarMensajesConversacion(token, conversacionActual._id)
        }
      } else {
        setError('No se pudo enviar el mensaje')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setError(error.message || 'Error al enviar el mensaje')
    } finally {
      setEnviando(false)
    }
  }

  const formatearFecha = (fecha) => {
    const fechaObj = new Date(fecha)
    const hoy = new Date()
    const ayer = new Date(hoy)
    ayer.setDate(hoy.getDate() - 1)

    if (fechaObj.toDateString() === hoy.toDateString()) {
      return `Hoy, ${fechaObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    } else if (fechaObj.toDateString() === ayer.toDateString()) {
      return `Ayer, ${fechaObj.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    } else {
      return fechaObj.toLocaleDateString([], {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }

  if (loading && !userInfo) {
    return (
      <div className='cf-admin-mensajes-container'>
        <Header />
        <div className='cf-admin-mensajes-content'>
          <div className='cf-admin-mensajes-loading'>
            <div className='cf-admin-mensajes-spinner'></div>
            <p className='cf-admin-mensajes-loading-text'>
              Cargando conversación...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error && !userInfo) {
    return (
      <div className='cf-admin-mensajes-container'>
        <Header />
        <div className='cf-admin-mensajes-content'>
          <div className='cf-admin-mensajes-error'>
            <div className='cf-admin-mensajes-error-icon'></div>
            <p>Error: {error}</p>
          </div>
          <Button
            variant='secondary'
            size='sm'
            onClick={handleVolver}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a AdminUsuarios
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`cf-admin-mensajes-container ${
        fadeIn ? 'cf-admin-mensajes-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-admin-mensajes-content'>
        <div className='cf-admin-mensajes-header'>
          <Button
            variant='secondary'
            size='sm'
            className='cf-admin-mensajes-back-btn'
            onClick={handleVolver}
            leftIcon={<ArrowLeft size={18} />}
          >
            Volver a AdminUsuarios
          </Button>

          {userInfo && (
            <div className='cf-admin-mensajes-usuario-info'>
              <div className='cf-admin-mensajes-avatar-container'>
                {userInfo.avatar ? (
                  <img
                    src={
                      userInfo.avatar
                        ? getImageUrl(userInfo)
                        : '/default-avatar.png'
                    }
                    alt={userInfo.nombre}
                    className='cf-admin-mensajes-avatar'
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/default-avatar.png'
                    }}
                  />
                ) : (
                  <div className='cf-admin-mensajes-avatar-placeholder'>
                    {userInfo.nombre
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .substring(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>
              <div className='cf-admin-mensajes-usuario-details'>
                <h1 className='cf-admin-mensajes-title'>
                  Mensajes con {userInfo.nombre}
                </h1>
                <span className='cf-admin-mensajes-email'>
                  {userInfo.email}
                </span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className='cf-admin-mensajes-error'>
            <div className='cf-admin-mensajes-error-icon'></div>
            <p>{error}</p>
          </div>
        )}

        <div className='cf-admin-mensajes-chat-container'>
          <div className='cf-admin-mensajes-chat' ref={mensajesRef}>
            {mensajes.length === 0 ? (
              <div className='cf-admin-mensajes-empty'>
                <div className='cf-admin-mensajes-empty-icon'></div>
                <h3 className='cf-admin-mensajes-empty-title'>
                  No hay mensajes previos
                </h3>
                <p className='cf-admin-mensajes-empty-text'>
                  No hay mensajes previos con este usuario.
                  <br />
                  Envía un mensaje para iniciar la conversación.
                </p>
              </div>
            ) : (
              mensajes.map((mensaje, index) => {
                const esAdmin = mensaje.remitente._id !== userId
                const mostrarFecha =
                  index === 0 ||
                  new Date(mensaje.fecha).toDateString() !==
                    new Date(mensajes[index - 1].fecha).toDateString()

                return (
                  <div
                    key={mensaje._id}
                    className='cf-admin-mensajes-mensaje-wrapper'
                  >
                    {mostrarFecha && (
                      <div className='cf-admin-mensajes-fecha-separador'>
                        <span>
                          {new Date(mensaje.fecha).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div
                      className={`cf-admin-mensajes-mensaje ${
                        esAdmin ? 'enviado' : 'recibido'
                      }`}
                    >
                      <div className='cf-admin-mensajes-mensaje-contenido'>
                        <p>{mensaje.mensaje}</p>
                        <span className='cf-admin-mensajes-mensaje-fecha'>
                          {formatearFecha(mensaje.fecha)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <form
            className='cf-admin-mensajes-form'
            onSubmit={handleEnviarMensaje}
          >
            <div className='cf-admin-mensajes-textarea-container'>
              <textarea
                ref={textareaRef}
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder='Escribe un mensaje...'
                disabled={enviando}
                className='cf-admin-mensajes-textarea'
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    if (nuevoMensaje.trim()) {
                      handleEnviarMensaje(e)
                    }
                  }
                }}
              />
            </div>
            <button
              type='submit'
              className='cf-admin-mensajes-send-btn'
              disabled={enviando || !nuevoMensaje.trim()}
            >
              {enviando ? (
                <div className='cf-admin-mensajes-send-spinner'></div>
              ) : (
                <Send size={20} className='cf-admin-mensajes-send-icon' />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminUsuarioMensajes
