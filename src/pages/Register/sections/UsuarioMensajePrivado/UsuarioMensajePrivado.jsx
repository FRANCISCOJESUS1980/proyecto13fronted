import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import {
  obtenerMensajesPrivados,
  obtenerConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos
} from '../../../../services/Api/mensajesPrivados'
import { getImageUrl } from '../../../../utils/imageUtils'
import './UsuarioMensajePrivado.css'

/*const UserMensajes = () => {
  const navigate = useNavigate()
  const [conversaciones, setConversaciones] = useState([])
  const [conversacionActual, setConversacionActual] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)

  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const data = await obtenerMensajesPrivados(token)
        if (data.success) {
          setConversaciones(data.data)
        }
      } catch (error) {
        console.error('Error al cargar conversaciones:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchConversaciones()
  }, [])

  useEffect(() => {
    const fetchMensajes = async () => {
      if (!conversacionActual) return

      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const data = await obtenerConversacion(token, conversacionActual._id)
        if (data.success) {
          setMensajes(data.data)

          await marcarMensajesComoLeidos(token, conversacionActual._id)
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMensajes()
  }, [conversacionActual])

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  const handleVolver = () => {
    navigate('/dashboard')
  }

  const handleSeleccionarConversacion = (conversacion) => {
    setConversacionActual(conversacion)
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() || !conversacionActual) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      const resultado = await enviarMensajePrivado(
        token,
        conversacionActual._id,
        nuevoMensaje
      )

      if (resultado.success) {
        // Añadir el mensaje a la conversación
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')
      } else {
        setError('No se pudo enviar el mensaje')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setError(error.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className='user-mensajes-container'>
      <Header />

      <div className='user-mensajes-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver al dashboard
        </Button>
        <h1>Mensajes Privados</h1>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='mensajes-layout'>
        <div className='conversaciones-sidebar'>
          <h2>Conversaciones</h2>
          {loading && !conversacionActual ? (
            <div className='loading-container-small'>
              <div className='loading-spinner-small'></div>
              <p>Cargando...</p>
            </div>
          ) : conversaciones.length === 0 ? (
            <div className='no-conversaciones'>
              <p>No tienes conversaciones activas.</p>
            </div>
          ) : (
            <div className='conversaciones-lista'>
              {conversaciones.map((conv) => (
                <div
                  key={conv._id}
                  className={`conversacion-item ${
                    conversacionActual?._id === conv._id ? 'activa' : ''
                  } ${conv.tieneNoLeidos ? 'no-leido' : ''}`}
                  onClick={() => handleSeleccionarConversacion(conv)}
                >
                  <img
                    src={getImageUrl(conv.admin) || '/default-avatar.png'}
                    alt={conv.admin.nombre}
                    className='conversacion-avatar'
                  />
                  <div className='conversacion-info'>
                    <h3>{conv.admin.nombre}</h3>
                    <p>
                      {conv.ultimoMensaje?.substring(0, 30)}
                      {conv.ultimoMensaje?.length > 30 ? '...' : ''}
                    </p>
                  </div>
                  {conv.tieneNoLeidos && (
                    <span className='badge-no-leido'></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='mensajes-main'>
          {!conversacionActual ? (
            <div className='seleccionar-conversacion'>
              <p>Selecciona una conversación para ver los mensajes</p>
            </div>
          ) : (
            <>
              <div className='mensajes-header'>
                <img
                  src={
                    getImageUrl(conversacionActual.admin) ||
                    '/default-avatar.png'
                  }
                  alt={conversacionActual.admin.nombre}
                  className='conversacion-avatar'
                />
                <h2>{conversacionActual.admin.nombre}</h2>
              </div>

              <div className='mensajes-container' ref={mensajesRef}>
                {loading ? (
                  <div className='loading-container-small'>
                    <div className='loading-spinner-small'></div>
                    <p>Cargando mensajes...</p>
                  </div>
                ) : mensajes.length === 0 ? (
                  <div className='no-mensajes'>
                    <p>No hay mensajes en esta conversación.</p>
                  </div>
                ) : (
                  mensajes.map((mensaje) => (
                    <div
                      key={mensaje._id}
                      className={`mensaje ${
                        mensaje.remitente._id === conversacionActual.admin._id
                          ? 'recibido'
                          : 'enviado'
                      }`}
                    >
                      <div className='mensaje-contenido'>
                        <p>{mensaje.mensaje}</p>
                        <span className='mensaje-fecha'>
                          {new Date(mensaje.fecha).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form className='mensaje-form' onSubmit={handleEnviarMensaje}>
                <textarea
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  placeholder='Escribe un mensaje...'
                  disabled={enviando}
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='md'
                  isLoading={enviando}
                  disabled={enviando || !nuevoMensaje.trim()}
                >
                  Enviar
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMensajes*/
const UserMensajes = () => {
  const navigate = useNavigate()
  const [conversaciones, setConversaciones] = useState([])
  const [conversacionActual, setConversacionActual] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)

  // Cargar conversaciones
  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId') // Obtener el ID del usuario desde localStorage

        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        // Guardar el ID del usuario en el estado si es necesario
        if (userId) {
          // Aquí podrías guardar el ID en un estado si lo necesitas para otras operaciones
          console.log('ID de usuario obtenido:', userId)
        } else {
          console.warn('No se encontró ID de usuario en localStorage')
        }

        const data = await obtenerMensajesPrivados(token)
        if (data.success) {
          setConversaciones(data.data)
        }
      } catch (error) {
        console.error('Error al cargar conversaciones:', error)
        setError(
          'No se pudieron cargar las conversaciones. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchConversaciones()
  }, [navigate])

  // Cargar mensajes de la conversación seleccionada
  useEffect(() => {
    const fetchMensajes = async () => {
      if (!conversacionActual) return

      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const data = await obtenerConversacion(token, conversacionActual._id)
        if (data.success) {
          setMensajes(data.data)

          // Marcar mensajes como leídos
          await marcarMensajesComoLeidos(token, conversacionActual._id)

          // Actualizar el estado de la conversación en la lista
          setConversaciones((prevConversaciones) =>
            prevConversaciones.map((conv) =>
              conv._id === conversacionActual._id
                ? { ...conv, tieneNoLeidos: false }
                : conv
            )
          )
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
        setError(
          'No se pudieron cargar los mensajes. Por favor, intenta de nuevo más tarde.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchMensajes()
  }, [conversacionActual, navigate])

  // Scroll al último mensaje cuando se cargan o envían nuevos mensajes
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  const handleVolver = () => {
    navigate('/dashboard')
  }

  const handleSeleccionarConversacion = (conversacion) => {
    setConversacionActual(conversacion)
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim() || !conversacionActual) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      // Para un usuario normal, el destinatario es el admin de la conversación
      const destinatarioId = conversacionActual.admin._id

      const resultado = await enviarMensajePrivado(
        token,
        destinatarioId,
        nuevoMensaje
      )

      if (resultado.success) {
        // Añadir el mensaje a la conversación
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')

        // Actualizar la conversación en la lista
        setConversaciones((prevConversaciones) =>
          prevConversaciones.map((conv) =>
            conv._id === conversacionActual._id
              ? { ...conv, ultimoMensaje: nuevoMensaje }
              : conv
          )
        )
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
    <div className='user-mensajes-container'>
      <Header />

      <div className='user-mensajes-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver al dashboard
        </Button>
        <h1>Mensajes Privados</h1>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='mensajes-layout'>
        <div className='conversaciones-sidebar'>
          <h2>Conversaciones</h2>
          {loading && !conversacionActual ? (
            <div className='loading-container-small'>
              <div className='loading-spinner-small'></div>
              <p>Cargando...</p>
            </div>
          ) : conversaciones.length === 0 ? (
            <div className='no-conversaciones'>
              <p>No tienes conversaciones activas.</p>
              <p>Los administradores te contactarán aquí.</p>
            </div>
          ) : (
            <div className='conversaciones-lista'>
              {conversaciones.map((conv) => (
                <div
                  key={conv._id}
                  className={`conversacion-item ${
                    conversacionActual?._id === conv._id ? 'activa' : ''
                  } ${conv.tieneNoLeidos ? 'no-leido' : ''}`}
                  onClick={() => handleSeleccionarConversacion(conv)}
                >
                  <img
                    src={getImageUrl(conv.admin) || '/default-avatar.png'}
                    alt={conv.admin.nombre}
                    className='conversacion-avatar'
                  />
                  <div className='conversacion-info'>
                    <h3>{conv.admin.nombre}</h3>
                    <p>
                      {conv.ultimoMensaje?.substring(0, 30)}
                      {conv.ultimoMensaje?.length > 30 ? '...' : ''}
                    </p>
                  </div>
                  {conv.tieneNoLeidos && (
                    <span className='badge-no-leido'></span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='mensajes-main'>
          {!conversacionActual ? (
            <div className='seleccionar-conversacion'>
              <p>Selecciona una conversación para ver los mensajes</p>
              {conversaciones.length === 0 && (
                <p>Aún no tienes mensajes de administradores</p>
              )}
            </div>
          ) : (
            <>
              <div className='mensajes-header'>
                <img
                  src={
                    getImageUrl(conversacionActual.admin) ||
                    '/default-avatar.png'
                  }
                  alt={conversacionActual.admin.nombre}
                  className='conversacion-avatar'
                />
                <h2>{conversacionActual.admin.nombre}</h2>
              </div>

              <div className='mensajes-container' ref={mensajesRef}>
                {loading ? (
                  <div className='loading-container-small'>
                    <div className='loading-spinner-small'></div>
                    <p>Cargando mensajes...</p>
                  </div>
                ) : mensajes.length === 0 ? (
                  <div className='no-mensajes'>
                    <p>No hay mensajes en esta conversación.</p>
                    <p>Envía un mensaje para comenzar.</p>
                  </div>
                ) : (
                  mensajes.map((mensaje) => {
                    // Determinar si el mensaje es del usuario actual o del admin
                    const esUsuarioActual =
                      mensaje.remitente._id === conversacionActual.usuario._id

                    return (
                      <div
                        key={mensaje._id}
                        className={`mensaje ${
                          esUsuarioActual ? 'enviado' : 'recibido'
                        }`}
                      >
                        <div className='mensaje-contenido'>
                          <p>{mensaje.mensaje}</p>
                          <span className='mensaje-fecha'>
                            {new Date(mensaje.fecha).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <form className='mensaje-form' onSubmit={handleEnviarMensaje}>
                <textarea
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  placeholder='Escribe un mensaje...'
                  disabled={enviando}
                />
                <Button
                  type='submit'
                  variant='primary'
                  size='md'
                  isLoading={enviando}
                  disabled={enviando || !nuevoMensaje.trim()}
                >
                  Enviar
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserMensajes
