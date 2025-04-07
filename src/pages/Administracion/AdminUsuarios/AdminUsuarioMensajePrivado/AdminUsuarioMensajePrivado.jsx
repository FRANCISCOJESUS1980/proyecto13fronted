import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import { obtenerUsuarioPorId } from '../../../../services/Api/index'
import {
  obtenerConversacion,
  enviarMensajePrivado
} from '../../../../services/Api/mensajesPrivados'
import { getImageUrl } from '../../../Clases/utils/imageUtils'
import './AdminUsuarioMensajePrivado.css'

/*const AdminUsuarioMensajes = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const userData = await obtenerUsuarioPorId(userId, token)
        setUserInfo(userData.data)

        const conversacionData = await obtenerConversacion(token, userId)
        if (conversacionData.success) {
          setMensajes(conversacionData.data)
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!nuevoMensaje.trim()) return

    try {
      setEnviando(true)
      const token = localStorage.getItem('token')
      if (!token) throw new Error('No hay token de autenticación')

      const resultado = await enviarMensajePrivado(token, userId, nuevoMensaje)

      if (resultado.success) {
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

  if (loading && !userInfo) {
    return (
      <div className='admin-mensajes-container'>
        <Header />
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando conversación...</p>
        </div>
      </div>
    )
  }

  if (error && !userInfo) {
    return (
      <div className='admin-mensajes-container'>
        <Header />
        <div className='error-message'>Error: {error}</div>
      </div>
    )
  }

  return (
    <div className='admin-mensajes-container'>
      <Header />

      <div className='admin-mensajes-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver a usuarios
        </Button>

        <div className='usuario-info'>
          <img
            src={
              userInfo?.avatar ? getImageUrl(userInfo) : '/default-avatar.png'
            }
            alt={userInfo?.nombre}
            className='usuario-avatar-small'
          />
          <h1>Mensajes con {userInfo?.nombre}</h1>
        </div>
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='mensajes-container' ref={mensajesRef}>
        {mensajes.length === 0 ? (
          <div className='no-mensajes'>
            <p>No hay mensajes previos con este usuario.</p>
            <p>Envía un mensaje para iniciar la conversación.</p>
          </div>
        ) : (
          mensajes.map((mensaje) => (
            <div
              key={mensaje._id}
              className={`mensaje ${
                mensaje.remitente._id === userId ? 'recibido' : 'enviado'
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
    </div>
  )
}

export default AdminUsuarioMensajes*/
const AdminUsuarioMensajes = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState(null)
  const [mensajes, setMensajes] = useState([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [loading, setLoading] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const mensajesRef = useRef(null)

  // Cargar información del usuario y mensajes
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

        // Obtener información del usuario
        const userData = await obtenerUsuarioPorId(userId, token)
        if (userData && userData.data) {
          setUserInfo(userData.data)
        } else {
          throw new Error('No se pudo obtener la información del usuario')
        }

        // Obtener conversación
        const conversacionData = await obtenerConversacion(token, userId)
        if (conversacionData && conversacionData.success) {
          setMensajes(conversacionData.data)
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        setError(error.message || 'Error al cargar datos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId, navigate])

  // Scroll al último mensaje cuando se cargan o envían nuevos mensajes
  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes])

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
        // Añadir el mensaje a la conversación
        setMensajes([...mensajes, resultado.data])
        setNuevoMensaje('')
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

  if (loading && !userInfo) {
    return (
      <div className='admin-mensajes-container'>
        <Header />
        <div className='loading-container'>
          <div className='loading-spinner'></div>
          <p>Cargando conversación...</p>
        </div>
      </div>
    )
  }

  if (error && !userInfo) {
    return (
      <div className='admin-mensajes-container'>
        <Header />
        <div className='error-message'>Error: {error}</div>
        <Button
          variant='secondary'
          size='sm'
          className='back-button mt-4'
          onClick={handleVolver}
        >
          ← Volver a usuarios
        </Button>
      </div>
    )
  }

  return (
    <div className='admin-mensajes-container'>
      <Header />

      <div className='admin-mensajes-header'>
        <Button
          variant='secondary'
          size='sm'
          className='back-button'
          onClick={handleVolver}
        >
          ← Volver a usuarios
        </Button>

        {userInfo && (
          <div className='usuario-info'>
            <img
              src={
                userInfo.avatar ? getImageUrl(userInfo) : '/default-avatar.png'
              }
              alt={userInfo.nombre}
              className='usuario-avatar-small'
            />
            <h1>Mensajes con {userInfo.nombre}</h1>
          </div>
        )}
      </div>

      {error && <div className='error-message'>{error}</div>}

      <div className='mensajes-container' ref={mensajesRef}>
        {mensajes.length === 0 ? (
          <div className='no-mensajes'>
            <p>No hay mensajes previos con este usuario.</p>
            <p>Envía un mensaje para iniciar la conversación.</p>
          </div>
        ) : (
          mensajes.map((mensaje) => {
            // Determinar si el mensaje es del admin o del usuario
            const esAdmin = mensaje.remitente._id !== userId

            return (
              <div
                key={mensaje._id}
                className={`mensaje ${esAdmin ? 'enviado' : 'recibido'}`}
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
    </div>
  )
}

export default AdminUsuarioMensajes
