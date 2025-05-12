import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import Header from '../../../../components/Header/Header'
import Button from '../../../../components/Button/Button'
import { obtenerUsuarioPorId } from '../../../../services/Api/index'
import {
  obtenerConversacion,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos,
  actualizarMensajePrivado,
  eliminarMensajePrivado
} from '../../../../services/Api/index'
import { getImageUrl } from '../../../../pages/Clases/utils/imageUtils'
import alertService from '../../../../components/sweealert2/sweealert2'
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
  const [editingMessageId, setEditingMessageId] = useState(null)
  const [editText, setEditText] = useState('')

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
          alertService.error('Error', 'ID de usuario no válido')
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
        alertService.error('Error', error.message || 'Error al cargar datos')
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
        alertService.error('Error', 'No se pudieron cargar los mensajes.')
      }
    } catch (error) {
      console.error('Error al cargar mensajes:', error)
      setError('Error al cargar los mensajes.')
      alertService.error('Error', 'Error al cargar los mensajes.')
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
        alertService.error('Error', 'No se pudo enviar el mensaje')
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error)
      setError(error.message || 'Error al enviar el mensaje')
      alertService.error('Error', error.message || 'Error al enviar el mensaje')
    } finally {
      setEnviando(false)
    }
  }

  const startEditing = (msg) => {
    setEditingMessageId(msg._id)
    setEditText(msg.mensaje)
  }

  const cancelEditing = (skipConfirmation = false) => {
    const mensajeOriginal = mensajes.find((m) => m._id === editingMessageId)

    const hayChangesSinGuardar =
      mensajeOriginal && editText !== mensajeOriginal.mensaje

    if (skipConfirmation || !hayChangesSinGuardar) {
      setEditingMessageId(null)
      setEditText('')
    } else {
      alertService
        .confirm(
          '¿Cancelar edición?',
          'Tienes cambios sin guardar. ¿Estás seguro de que quieres cancelar?',
          {
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, seguir editando',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            reverseButtons: true
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            setEditingMessageId(null)
            setEditText('')
          }
        })
    }
  }

  const saveEdit = async () => {
    if (editText.trim() && editingMessageId) {
      try {
        const token = localStorage.getItem('token')

        console.log('Guardando edición para mensaje (admin):', editingMessageId)
        console.log('Nuevo texto:', editText)

        const resultado = await actualizarMensajePrivado(
          token,
          editingMessageId,
          editText
        )

        console.log('Resultado de la actualización:', resultado)

        if (resultado && resultado.success) {
          setMensajes(
            mensajes.map((msg) =>
              msg._id === editingMessageId ? { ...msg, mensaje: editText } : msg
            )
          )

          if (conversacionActual && conversacionActual._id) {
            await cargarMensajesConversacion(token, conversacionActual._id)
          }

          alertService.success('¡Éxito!', 'Mensaje actualizado correctamente')

          cancelEditing(true)
        } else {
          const errorMsg =
            'No se pudo actualizar el mensaje: ' +
            (resultado.message || 'Error desconocido')
          setError(errorMsg)
          alertService.error('Error', errorMsg)
        }
      } catch (error) {
        console.error('Error al actualizar mensaje:', error)
        const errorMsg = 'Error al actualizar el mensaje: ' + error.message
        setError(errorMsg)
        alertService.error('Error', errorMsg)
      }
    }
  }

  const handleDeleteMessage = async (messageId) => {
    alertService
      .confirm('¿Estás seguro?', '¿Quieres eliminar este mensaje?', {
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        reverseButtons: true
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('token')

            const resultado = await eliminarMensajePrivado(token, messageId)

            if (resultado && resultado.success) {
              setMensajes(mensajes.filter((msg) => msg._id !== messageId))

              if (conversacionActual && conversacionActual._id) {
                await cargarMensajesConversacion(token, conversacionActual._id)
              }

              alertService.success(
                '¡Eliminado!',
                'El mensaje ha sido eliminado'
              )
            } else {
              alertService.error('Error', 'No se pudo eliminar el mensaje')
              setError('No se pudo eliminar el mensaje')
            }
          } catch (error) {
            console.error('Error al eliminar mensaje:', error)
            const errorMsg = 'Error al eliminar el mensaje: ' + error.message
            alertService.error('Error', errorMsg)
            setError(errorMsg)
          }
        }
      })
  }

  const canModifyMessage = (msg) => {
    return msg.remitente._id !== userId
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

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error])

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
                const isEditing = editingMessageId === mensaje._id

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
                        {isEditing ? (
                          <div className='cf-admin-mensajes-mensaje-edit'>
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className='cf-admin-mensajes-edit-textarea'
                              autoFocus
                            />
                            <div className='cf-admin-mensajes-edit-buttons'>
                              <button
                                onClick={saveEdit}
                                className='cf-admin-mensajes-edit-save-btn'
                              >
                                <span className='cf-admin-mensajes-save-icon'></span>
                                Guardar
                              </button>
                              <button
                                onClick={() => cancelEditing()}
                                className='cf-admin-mensajes-edit-cancel-btn'
                              >
                                <span className='cf-admin-mensajes-cancel-icon'></span>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p>{mensaje.mensaje}</p>
                            <span className='cf-admin-mensajes-mensaje-fecha'>
                              {formatearFecha(mensaje.fecha)}
                            </span>

                            {canModifyMessage(mensaje) && (
                              <div className='cf-admin-mensajes-mensaje-actions'>
                                <button
                                  onClick={() => startEditing(mensaje)}
                                  className='cf-admin-mensajes-mensaje-action-btn cf-admin-mensajes-edit-btn'
                                  title='Editar mensaje'
                                >
                                  <span className='cf-admin-mensajes-edit-icon'></span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteMessage(mensaje._id)
                                  }
                                  className='cf-admin-mensajes-mensaje-action-btn cf-admin-mensajes-delete-btn'
                                  title='Eliminar mensaje'
                                >
                                  <span className='cf-admin-mensajes-delete-icon'></span>
                                </button>
                              </div>
                            )}
                          </>
                        )}
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
