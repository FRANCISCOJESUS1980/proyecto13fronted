import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useRef
} from 'react'
import { useNavigate } from 'react-router-dom'
import {
  obtenerMensajesPrivados,
  obtenerMensajesConversacion,
  enviarMensajePrivado,
  marcarMensajesComoLeidos,
  actualizarMensajePrivado,
  eliminarMensajePrivado
} from '../../../../../services/Api/index'
import alertService from '../../../../../components/sweealert2/sweealert2'

const initialState = {
  adminInfo: null,
  conversacionId: null,
  mensajes: [],
  userId: null,
  nuevoMensaje: '',
  enviando: false,
  editingMessageId: null,
  editText: '',
  loading: true,
  error: '',
  animationComplete: false
}

const ACTIONS = {
  SET_ADMIN_INFO: 'SET_ADMIN_INFO',
  SET_CONVERSACION_ID: 'SET_CONVERSACION_ID',
  SET_MENSAJES: 'SET_MENSAJES',
  ADD_MENSAJE: 'ADD_MENSAJE',
  UPDATE_MENSAJE: 'UPDATE_MENSAJE',
  DELETE_MENSAJE: 'DELETE_MENSAJE',
  SET_USER_ID: 'SET_USER_ID',
  SET_NUEVO_MENSAJE: 'SET_NUEVO_MENSAJE',
  SET_ENVIANDO: 'SET_ENVIANDO',
  SET_EDITING_MESSAGE: 'SET_EDITING_MESSAGE',
  SET_EDIT_TEXT: 'SET_EDIT_TEXT',
  CANCEL_EDITING: 'CANCEL_EDITING',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE'
}

function mensajesPrivadosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ADMIN_INFO:
      return { ...state, adminInfo: action.payload }

    case ACTIONS.SET_CONVERSACION_ID:
      return { ...state, conversacionId: action.payload }

    case ACTIONS.SET_MENSAJES:
      return { ...state, mensajes: action.payload }

    case ACTIONS.ADD_MENSAJE:
      return { ...state, mensajes: [...state.mensajes, action.payload] }

    case ACTIONS.UPDATE_MENSAJE:
      return {
        ...state,
        mensajes: state.mensajes.map((msg) =>
          msg._id === action.payload.id
            ? { ...msg, mensaje: action.payload.texto }
            : msg
        )
      }

    case ACTIONS.DELETE_MENSAJE:
      return {
        ...state,
        mensajes: state.mensajes.filter((msg) => msg._id !== action.payload)
      }

    case ACTIONS.SET_USER_ID:
      return { ...state, userId: action.payload }

    case ACTIONS.SET_NUEVO_MENSAJE:
      return { ...state, nuevoMensaje: action.payload }

    case ACTIONS.SET_ENVIANDO:
      return { ...state, enviando: action.payload }

    case ACTIONS.SET_EDITING_MESSAGE: {
      const messageToEdit = state.mensajes.find(
        (msg) => msg._id === action.payload
      )
      return {
        ...state,
        editingMessageId: action.payload,
        editText: messageToEdit ? messageToEdit.mensaje : ''
      }
    }

    case ACTIONS.SET_EDIT_TEXT:
      return { ...state, editText: action.payload }

    case ACTIONS.CANCEL_EDITING:
      return { ...state, editingMessageId: null, editText: '' }

    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }

    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: '' }

    case ACTIONS.SET_ANIMATION_COMPLETE:
      return { ...state, animationComplete: action.payload }

    default:
      return state
  }
}

const MensajesPrivadosContext = createContext()

export const useMensajesPrivadosContext = () => {
  const context = useContext(MensajesPrivadosContext)
  if (!context) {
    throw new Error(
      'useMensajesPrivadosContext debe ser usado dentro de MensajesPrivadosProvider'
    )
  }
  return context
}

export const MensajesPrivadosProvider = ({ children }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(mensajesPrivadosReducer, initialState)
  const mensajesRef = useRef(null)

  const actions = useMemo(
    () => ({
      setAdminInfo: (info) =>
        dispatch({ type: ACTIONS.SET_ADMIN_INFO, payload: info }),
      setConversacionId: (id) =>
        dispatch({ type: ACTIONS.SET_CONVERSACION_ID, payload: id }),
      setMensajes: (mensajes) =>
        dispatch({ type: ACTIONS.SET_MENSAJES, payload: mensajes }),
      addMensaje: (mensaje) =>
        dispatch({ type: ACTIONS.ADD_MENSAJE, payload: mensaje }),
      updateMensaje: (id, texto) =>
        dispatch({ type: ACTIONS.UPDATE_MENSAJE, payload: { id, texto } }),
      deleteMensaje: (id) =>
        dispatch({ type: ACTIONS.DELETE_MENSAJE, payload: id }),
      setUserId: (id) => dispatch({ type: ACTIONS.SET_USER_ID, payload: id }),
      setNuevoMensaje: (mensaje) =>
        dispatch({ type: ACTIONS.SET_NUEVO_MENSAJE, payload: mensaje }),
      setEnviando: (enviando) =>
        dispatch({ type: ACTIONS.SET_ENVIANDO, payload: enviando }),
      setEditingMessage: (id) =>
        dispatch({ type: ACTIONS.SET_EDITING_MESSAGE, payload: id }),
      setEditText: (text) =>
        dispatch({ type: ACTIONS.SET_EDIT_TEXT, payload: text }),
      cancelEditing: () => dispatch({ type: ACTIONS.CANCEL_EDITING }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setError: (error) =>
        dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
      clearError: () => dispatch({ type: ACTIONS.CLEAR_ERROR }),
      setAnimationComplete: (complete) =>
        dispatch({ type: ACTIONS.SET_ANIMATION_COMPLETE, payload: complete })
    }),
    []
  )

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    if (storedUserId) {
      actions.setUserId(storedUserId)
    }
  }, [actions])

  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setAnimationComplete(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [actions])

  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        actions.clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [state.error, actions])

  useEffect(() => {
    if (mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [state.mensajes])

  const cargarMensajesConversacion = useCallback(
    async (token, convId) => {
      try {
        if (!convId) return

        console.log('Cargando mensajes para conversación ID:', convId)

        const data = await obtenerMensajesConversacion(token, convId)

        if (data.success) {
          actions.setMensajes(data.data || [])

          await marcarMensajesComoLeidos(token, convId)
          console.log('Mensajes marcados como leídos')
        } else {
          console.error('Error en la respuesta al obtener mensajes:', data)
          alertService.error('Error', 'No se pudieron cargar los mensajes.')
          actions.setError('No se pudieron cargar los mensajes.')
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
        alertService.error('Error', 'Error al cargar los mensajes.')
        actions.setError('Error al cargar los mensajes.')
      } finally {
        actions.setLoading(false)
      }
    },
    [actions]
  )

  const fetchConversaciones = useCallback(async () => {
    try {
      actions.setLoading(true)
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/iniciar-sesion')
        return
      }

      const data = await obtenerMensajesPrivados(token)

      if (data.success && data.data.length > 0) {
        const conversacion = data.data[0]
        actions.setAdminInfo(conversacion.admin)
        actions.setConversacionId(conversacion._id)

        if (conversacion._id) {
          await cargarMensajesConversacion(token, conversacion._id)
        }
      } else {
        actions.setMensajes([])
        actions.setLoading(false)
      }
    } catch (error) {
      console.error('Error al cargar conversaciones:', error)
      alertService.error(
        'Error',
        'No se pudo cargar la conversación. Por favor, intenta de nuevo más tarde.'
      )
      actions.setError(
        'No se pudo cargar la conversación. Por favor, intenta de nuevo más tarde.'
      )
      actions.setLoading(false)
    }
  }, [navigate, actions, cargarMensajesConversacion])

  useEffect(() => {
    fetchConversaciones()
  }, [fetchConversaciones])

  const handleEnviarMensaje = useCallback(
    async (e) => {
      e?.preventDefault()
      if (!state.nuevoMensaje.trim() || !state.adminInfo) return

      try {
        actions.setEnviando(true)
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/iniciar-sesion')
          return
        }

        const destinatarioId = state.adminInfo._id

        const resultado = await enviarMensajePrivado(
          token,
          destinatarioId,
          state.nuevoMensaje
        )

        if (resultado.success) {
          actions.addMensaje(resultado.data)
          actions.setNuevoMensaje('')

          if (state.conversacionId) {
            await cargarMensajesConversacion(token, state.conversacionId)
          }
        } else {
          alertService.error('Error', 'No se pudo enviar el mensaje')
          actions.setError('No se pudo enviar el mensaje')
        }
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        alertService.error(
          'Error',
          'Error al enviar el mensaje. Por favor, intenta de nuevo.'
        )
        actions.setError(
          'Error al enviar el mensaje. Por favor, intenta de nuevo.'
        )
      } finally {
        actions.setEnviando(false)
      }
    },
    [
      state.nuevoMensaje,
      state.adminInfo,
      state.conversacionId,
      navigate,
      actions,
      cargarMensajesConversacion
    ]
  )

  const saveEdit = useCallback(async () => {
    if (state.editText.trim() && state.editingMessageId) {
      try {
        const token = localStorage.getItem('token')

        console.log('Guardando edición para mensaje:', state.editingMessageId)
        console.log('Nuevo texto:', state.editText)

        const resultado = await actualizarMensajePrivado(
          token,
          state.editingMessageId,
          state.editText
        )

        console.log('Resultado de la actualización:', resultado)

        if (resultado && resultado.success) {
          actions.updateMensaje(state.editingMessageId, state.editText)

          if (state.conversacionId) {
            await cargarMensajesConversacion(token, state.conversacionId)
          }

          alertService.success('¡Éxito!', 'Mensaje actualizado correctamente')
        } else {
          const errorMsg =
            'No se pudo actualizar el mensaje: ' +
            (resultado.message || 'Error desconocido')
          alertService.error('Error', errorMsg)
          actions.setError(errorMsg)
        }

        actions.cancelEditing()
      } catch (error) {
        console.error('Error al actualizar mensaje:', error)
        const errorMsg = 'Error al actualizar el mensaje: ' + error.message
        alertService.error('Error', errorMsg)
        actions.setError(errorMsg)
      }
    }
  }, [
    state.editText,
    state.editingMessageId,
    state.conversacionId,
    actions,
    cargarMensajesConversacion
  ])

  const handleDeleteMessage = useCallback(
    async (messageId) => {
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
                actions.deleteMensaje(messageId)

                if (state.conversacionId) {
                  await cargarMensajesConversacion(token, state.conversacionId)
                }

                alertService.success(
                  '¡Eliminado!',
                  'El mensaje ha sido eliminado'
                )
              } else {
                alertService.error('Error', 'No se pudo eliminar el mensaje')
                actions.setError('No se pudo eliminar el mensaje')
              }
            } catch (error) {
              console.error('Error al eliminar mensaje:', error)
              const errorMsg = 'Error al eliminar el mensaje: ' + error.message
              alertService.error('Error', errorMsg)
              actions.setError(errorMsg)
            }
          }
        })
    },
    [state.conversacionId, actions, cargarMensajesConversacion]
  )

  const handleVolver = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  const contextValue = useMemo(
    () => ({
      ...state,
      mensajesRef,
      ...actions,
      handleEnviarMensaje,
      saveEdit,
      handleDeleteMessage,
      handleVolver,
      cargarMensajesConversacion
    }),
    [
      state,
      actions,
      handleEnviarMensaje,
      saveEdit,
      handleDeleteMessage,
      handleVolver,
      cargarMensajesConversacion
    ]
  )

  return (
    <MensajesPrivadosContext.Provider value={contextValue}>
      {children}
    </MensajesPrivadosContext.Provider>
  )
}
