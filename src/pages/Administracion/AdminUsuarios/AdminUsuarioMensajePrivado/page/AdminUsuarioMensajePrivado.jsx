import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send } from 'lucide-react'
import Header from '../../../../../components/Header/Header'
import Button from '../../../../../components/Button/Button'
import { getImageUrl } from '../../../../Clases/utils/imageUtils'
import alertService from '../../../../../components/sweealert2/sweealert2'
import { useMessagingState } from '../hooks/useMessagingState'
import { useMessagingApi } from '../hooks/useMessagingApi'
import MessageList from '../components/MessageList'
import './AdminUsuarioMensajePrivado.css'

const AdminUsuarioMensajes = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const [state, dispatch] = useMessagingState()
  const api = useMessagingApi()
  const mensajesRef = useRef(null)
  const textareaRef = useRef(null)

  const cargarMensajesConversacion = async (token, convId) => {
    try {
      const mensajes = await api.fetchMessages(convId)
      dispatch({ type: 'SET_MENSAJES', payload: mensajes })
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error al cargar los mensajes.' })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true })

        if (!userId) {
          dispatch({ type: 'SET_ERROR', payload: 'ID de usuario no válido' })
          alertService.error('Error', 'ID de usuario no válido')
          dispatch({ type: 'SET_LOADING', payload: false })
          return
        }

        console.log('Cargando datos para usuario:', userId)

        const userData = await api.fetchUserInfo(userId)
        if (userData) {
          dispatch({ type: 'SET_USER_INFO', payload: userData })
        }

        const conversationData = await api.fetchConversation(userId)
        if (conversationData) {
          dispatch({ type: 'SET_MENSAJES', payload: conversationData.mensajes })

          if (conversationData.conversacion) {
            dispatch({
              type: 'SET_CONVERSACION',
              payload: conversationData.conversacion
            })

            if (conversationData.conversacion._id) {
              const token = localStorage.getItem('token')
              await cargarMensajesConversacion(
                token,
                conversationData.conversacion._id
              )
            }
          }
        }
      } catch (error) {
        console.error('Error al cargar datos:', error)
        dispatch({
          type: 'SET_ERROR',
          payload: error.message || 'Error al cargar datos'
        })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
        setTimeout(() => dispatch({ type: 'SET_FADE_IN', payload: true }), 100)
      }
    }

    fetchData()
  }, [userId])

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [state.mensajes])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [state.nuevoMensaje])

  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_ERROR', payload: '' })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.error])

  const handleVolver = () => {
    navigate('/administracion/usuarios')
  }

  const handleEnviarMensaje = async (e) => {
    e.preventDefault()
    if (!state.nuevoMensaje.trim() || !userId) return

    try {
      dispatch({ type: 'SET_ENVIANDO', payload: true })

      const nuevoMensaje = await api.sendMessage(userId, state.nuevoMensaje)

      if (nuevoMensaje) {
        dispatch({ type: 'ADD_MENSAJE', payload: nuevoMensaje })
        dispatch({ type: 'SET_NUEVO_MENSAJE', payload: '' })

        if (state.conversacionActual && state.conversacionActual._id) {
          const token = localStorage.getItem('token')
          await cargarMensajesConversacion(token, state.conversacionActual._id)
        }
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error.message || 'Error al enviar el mensaje'
      })
    } finally {
      dispatch({ type: 'SET_ENVIANDO', payload: false })
    }
  }

  const startEditing = (msg) => {
    dispatch({
      type: 'SET_EDITING',
      payload: { id: msg._id, text: msg.mensaje }
    })
  }

  const cancelEditing = (skipConfirmation = false) => {
    const mensajeOriginal = state.mensajes.find(
      (m) => m._id === state.editingMessageId
    )
    const hayChangesSinGuardar =
      mensajeOriginal && state.editText !== mensajeOriginal.mensaje

    if (skipConfirmation || !hayChangesSinGuardar) {
      dispatch({ type: 'CLEAR_EDITING' })
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
            dispatch({ type: 'CLEAR_EDITING' })
          }
        })
    }
  }

  const saveEdit = async () => {
    if (state.editText.trim() && state.editingMessageId) {
      try {
        const success = await api.updateMessage(
          state.editingMessageId,
          state.editText
        )

        if (success) {
          dispatch({
            type: 'UPDATE_MENSAJE',
            payload: { id: state.editingMessageId, mensaje: state.editText }
          })

          if (state.conversacionActual && state.conversacionActual._id) {
            const token = localStorage.getItem('token')
            await cargarMensajesConversacion(
              token,
              state.conversacionActual._id
            )
          }

          cancelEditing(true)
        }
      } catch (error) {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Error al actualizar el mensaje: ' + error.message
        })
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
            const success = await api.deleteMessage(messageId)

            if (success) {
              dispatch({ type: 'DELETE_MENSAJE', payload: messageId })

              if (state.conversacionActual && state.conversacionActual._id) {
                const token = localStorage.getItem('token')
                await cargarMensajesConversacion(
                  token,
                  state.conversacionActual._id
                )
              }
            }
          } catch (error) {
            dispatch({
              type: 'SET_ERROR',
              payload: 'Error al eliminar el mensaje: ' + error.message
            })
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

  if (state.loading && !state.userInfo) {
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

  if (state.error && !state.userInfo) {
    return (
      <div className='cf-admin-mensajes-container'>
        <Header />
        <div className='cf-admin-mensajes-content'>
          <div className='cf-admin-mensajes-error'>
            <div className='cf-admin-mensajes-error-icon'></div>
            <p>Error: {state.error}</p>
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
        state.fadeIn ? 'cf-admin-mensajes-fade-in' : ''
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

          {state.userInfo && (
            <div className='cf-admin-mensajes-usuario-info'>
              <div className='cf-admin-mensajes-avatar-container'>
                {state.userInfo.avatar ? (
                  <img
                    src={
                      state.userInfo.avatar
                        ? getImageUrl(state.userInfo)
                        : '/default-avatar.png'
                    }
                    alt={state.userInfo.nombre}
                    className='cf-admin-mensajes-avatar'
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = '/default-avatar.png'
                    }}
                  />
                ) : (
                  <div className='cf-admin-mensajes-avatar-placeholder'>
                    {state.userInfo.nombre
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
                  Mensajes con {state.userInfo.nombre}
                </h1>
                <span className='cf-admin-mensajes-email'>
                  {state.userInfo.email}
                </span>
              </div>
            </div>
          )}
        </div>

        {state.error && (
          <div className='cf-admin-mensajes-error'>
            <div className='cf-admin-mensajes-error-icon'></div>
            <p>{state.error}</p>
          </div>
        )}

        <div className='cf-admin-mensajes-chat-container'>
          <MessageList
            ref={mensajesRef}
            mensajes={state.mensajes}
            userId={userId}
            editingMessageId={state.editingMessageId}
            editText={state.editText}
            onStartEditing={startEditing}
            onCancelEditing={cancelEditing}
            onSaveEdit={saveEdit}
            onDeleteMessage={handleDeleteMessage}
            onSetEditText={(text) =>
              dispatch({ type: 'SET_EDIT_TEXT', payload: text })
            }
            formatearFecha={formatearFecha}
            canModifyMessage={canModifyMessage}
          />

          <form
            className='cf-admin-mensajes-form'
            onSubmit={handleEnviarMensaje}
          >
            <div className='cf-admin-mensajes-textarea-container'>
              <textarea
                ref={textareaRef}
                value={state.nuevoMensaje}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_NUEVO_MENSAJE',
                    payload: e.target.value
                  })
                }
                placeholder='Escribe un mensaje...'
                disabled={state.enviando}
                className='cf-admin-mensajes-textarea'
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    if (state.nuevoMensaje.trim()) {
                      handleEnviarMensaje(e)
                    }
                  }
                }}
              />
            </div>
            <button
              type='submit'
              className='cf-admin-mensajes-send-btn'
              disabled={state.enviando || !state.nuevoMensaje.trim()}
            >
              {state.enviando ? (
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
