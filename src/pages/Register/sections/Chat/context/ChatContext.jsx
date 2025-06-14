import {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  useRef
} from 'react'
import {
  loadChatMessages,
  createSocketConnection,
  updateChatMessage,
  deleteChatMessage,
  deleteAllChatMessages
} from '../../../../../services/Api/index'
import alertService from '../../../../../components/sweealert2/sweealert2'

const socket = createSocketConnection()

const initialState = {
  messages: [],
  message: '',
  editingMessageId: null,
  editText: '',

  currentUserName: 'Usuario',
  currentUserId: '',
  userRole: '',

  isLoading: true,
  animationComplete: false
}

const ACTIONS = {
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  DELETE_MESSAGE: 'DELETE_MESSAGE',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_EDITING_MESSAGE: 'SET_EDITING_MESSAGE',
  SET_EDIT_TEXT: 'SET_EDIT_TEXT',
  CANCEL_EDITING: 'CANCEL_EDITING',
  SET_USER_INFO: 'SET_USER_INFO',
  SET_LOADING: 'SET_LOADING',
  SET_ANIMATION_COMPLETE: 'SET_ANIMATION_COMPLETE'
}

function chatReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_MESSAGES:
      return { ...state, messages: action.payload }

    case ACTIONS.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }

    case ACTIONS.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg._id === action.payload._id ? action.payload : msg
        )
      }

    case ACTIONS.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((msg) => msg._id !== action.payload)
      }

    case ACTIONS.SET_MESSAGE:
      return { ...state, message: action.payload }

    case ACTIONS.SET_EDITING_MESSAGE: {
      const messageToEdit = state.messages.find(
        (msg) => msg._id === action.payload
      )
      return {
        ...state,
        editingMessageId: action.payload,
        editText: messageToEdit ? messageToEdit.text : ''
      }
    }

    case ACTIONS.SET_EDIT_TEXT:
      return { ...state, editText: action.payload }

    case ACTIONS.CANCEL_EDITING:
      return { ...state, editingMessageId: null, editText: '' }

    case ACTIONS.SET_USER_INFO:
      return {
        ...state,
        currentUserName: action.payload.name || state.currentUserName,
        currentUserId: action.payload.id || state.currentUserId,
        userRole: action.payload.role || state.userRole
      }

    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload }

    case ACTIONS.SET_ANIMATION_COMPLETE:
      return { ...state, animationComplete: action.payload }

    default:
      return state
  }
}

const ChatContext = createContext()

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext debe ser usado dentro de ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  const messagesEndRef = useRef(null)

  const actions = useMemo(
    () => ({
      setMessages: (messages) =>
        dispatch({ type: ACTIONS.SET_MESSAGES, payload: messages }),
      addMessage: (message) =>
        dispatch({ type: ACTIONS.ADD_MESSAGE, payload: message }),
      updateMessage: (message) =>
        dispatch({ type: ACTIONS.UPDATE_MESSAGE, payload: message }),
      deleteMessage: (messageId) =>
        dispatch({ type: ACTIONS.DELETE_MESSAGE, payload: messageId }),
      setMessage: (message) =>
        dispatch({ type: ACTIONS.SET_MESSAGE, payload: message }),
      setEditingMessage: (messageId) =>
        dispatch({ type: ACTIONS.SET_EDITING_MESSAGE, payload: messageId }),
      setEditText: (text) =>
        dispatch({ type: ACTIONS.SET_EDIT_TEXT, payload: text }),
      cancelEditing: () => dispatch({ type: ACTIONS.CANCEL_EDITING }),
      setUserInfo: (userInfo) =>
        dispatch({ type: ACTIONS.SET_USER_INFO, payload: userInfo }),
      setLoading: (loading) =>
        dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
      setAnimationComplete: (complete) =>
        dispatch({ type: ACTIONS.SET_ANIMATION_COMPLETE, payload: complete })
    }),
    []
  )

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  useEffect(() => {
    const nombre = localStorage.getItem('nombre')
    const userId = localStorage.getItem('userId')
    const rol = localStorage.getItem('rol')

    actions.setUserInfo({
      name: nombre || 'Usuario',
      id: userId || '',
      role: rol || ''
    })
  }, [actions])

  useEffect(() => {
    const timer = setTimeout(() => {
      actions.setAnimationComplete(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [actions])

  const fetchInitialMessages = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await loadChatMessages(token)

      if (data && Array.isArray(data)) {
        actions.setMessages(data)
      }

      actions.setLoading(false)
      scrollToBottom()
    } catch (error) {
      console.error('Error al cargar mensajes:', error.message)
      alertService.error('Error', 'No se pudieron cargar los mensajes del chat')
      actions.setLoading(false)
    }
  }, [actions, scrollToBottom])

  useEffect(() => {
    fetchInitialMessages()

    const handleChatHistory = (history) => {
      actions.setMessages(history)
      actions.setLoading(false)
      scrollToBottom()
    }

    const handleNewMessage = (newMessage) => {
      actions.addMessage(newMessage)
      scrollToBottom()
    }

    const handleMessageUpdated = (updatedMessage) => {
      actions.updateMessage(updatedMessage)
    }

    const handleMessageDeleted = (deletedMessage) => {
      actions.deleteMessage(deletedMessage._id)
    }

    socket.on('chatHistory', handleChatHistory)
    socket.on('chatMessage', handleNewMessage)
    socket.on('messageUpdated', handleMessageUpdated)
    socket.on('messageDeleted', handleMessageDeleted)
    socket.on('error', (error) => {
      console.error('Error del socket:', error)
      alertService.error(
        'Error de conexión',
        'Se ha producido un error en la conexión del chat'
      )
    })

    return () => {
      socket.off('chatHistory', handleChatHistory)
      socket.off('chatMessage', handleNewMessage)
      socket.off('messageUpdated', handleMessageUpdated)
      socket.off('messageDeleted', handleMessageDeleted)
      socket.off('error')
    }
  }, [actions, fetchInitialMessages, scrollToBottom])

  const sendMessage = useCallback(
    async (e) => {
      e?.preventDefault()
      if (state.message.trim()) {
        try {
          const messageData = {
            text: state.message,
            userId: state.currentUserId,
            userName: state.currentUserName
          }

          socket.emit('chatMessage', messageData)
          actions.setMessage('')
        } catch (error) {
          console.error('Error al enviar mensaje:', error)
          alertService.error('Error', 'No se pudo enviar el mensaje')
        }
      }
    },
    [state.message, state.currentUserId, state.currentUserName, actions]
  )

  const saveEdit = useCallback(async () => {
    if (state.editText.trim() && state.editingMessageId) {
      try {
        const token = localStorage.getItem('token')
        await updateChatMessage(state.editingMessageId, state.editText, token)
        actions.cancelEditing()
        alertService.success('¡Éxito!', 'Mensaje actualizado correctamente')
      } catch (error) {
        console.error('Error al actualizar mensaje:', error)
        alertService.error(
          'Error',
          'No se pudo actualizar el mensaje: ' + error.message
        )
      }
    }
  }, [state.editText, state.editingMessageId, actions])

  const handleDeleteMessage = useCallback(async (messageId) => {
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
            await deleteChatMessage(messageId, token)
            alertService.success('¡Eliminado!', 'El mensaje ha sido eliminado')
          } catch (error) {
            console.error('Error al eliminar mensaje:', error)
            alertService.error(
              'Error',
              'No se pudo eliminar el mensaje: ' + error.message
            )
          }
        }
      })
  }, [])

  const handleDeleteAllMessages = useCallback(async () => {
    alertService
      .confirm(
        '¿Estás completamente seguro?',
        'Esta acción eliminará TODOS los mensajes del chat y no se puede deshacer',
        {
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, eliminar todos',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          reverseButtons: true,
          focusCancel: true
        }
      )
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem('token')
            await deleteAllChatMessages(token)
            alertService.success(
              '¡Eliminados!',
              'Todos los mensajes han sido eliminados'
            )
          } catch (error) {
            console.error('Error al eliminar todos los mensajes:', error)
            alertService.error(
              'Error',
              'No se pudieron eliminar todos los mensajes: ' + error.message
            )
          }
        }
      })
  }, [])

  const canModifyMessage = useCallback(
    (msg) => {
      return msg.userId === state.currentUserId || state.userRole === 'admin'
    },
    [state.currentUserId, state.userRole]
  )

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString()

    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    return { date: formattedDate, time: formattedTime }
  }, [])

  const contextValue = useMemo(
    () => ({
      ...state,
      messagesEndRef,
      ...actions,
      sendMessage,
      saveEdit,
      handleDeleteMessage,
      handleDeleteAllMessages,
      canModifyMessage,
      formatDate,
      scrollToBottom
    }),
    [
      state,
      actions,
      sendMessage,
      saveEdit,
      handleDeleteMessage,
      handleDeleteAllMessages,
      canModifyMessage,
      formatDate,
      scrollToBottom
    ]
  )

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  )
}
