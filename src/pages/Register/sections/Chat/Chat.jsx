/*import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header/Header'
import Loading from '../../../../components/Loading/loading'
import {
  loadChatMessages,
  createSocketConnection,
  updateChatMessage,
  deleteChatMessage,
  deleteAllChatMessages
} from '../../../../services/Api/index'
import Button from '../../../../components/Button/Button'
import alertService from '../../../../components/sweealert2/sweealert2'
import './Chat.css'

const socket = createSocketConnection()

const Chat = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserName, setCurrentUserName] = useState('Usuario')
  const [currentUserId, setCurrentUserId] = useState('')
  const [userRole, setUserRole] = useState('')
  const [editingMessageId, setEditingMessageId] = useState(null)
  const [editText, setEditText] = useState('')
  const [animationComplete, setAnimationComplete] = useState(false)
  const messagesEndRef = useRef(null)
  const chatBoxRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const nombre = localStorage.getItem('nombre')
    const userId = localStorage.getItem('userId')
    const rol = localStorage.getItem('rol')

    if (nombre) {
      setCurrentUserName(nombre)
    }

    if (userId) {
      setCurrentUserId(userId)
    }

    if (rol) {
      setUserRole(rol)
    }
  }, [])

  const fetchInitialMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      const data = await loadChatMessages(token)

      if (data && Array.isArray(data)) {
        setMessages(data)
      }

      setIsLoading(false)
      scrollToBottom()
    } catch (error) {
      console.error('Error al cargar mensajes:', error.message)
      alertService.error('Error', 'No se pudieron cargar los mensajes del chat')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInitialMessages()

    const handleChatHistory = (history) => {
      setMessages(history)
      setIsLoading(false)
      scrollToBottom()
    }

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
      scrollToBottom()
    }

    const handleMessageUpdated = (updatedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg._id === updatedMessage._id ? updatedMessage : msg
        )
      )
    }

    const handleMessageDeleted = (deletedMessage) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== deletedMessage._id)
      )
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
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim()) {
      try {
        const messageData = {
          text: message,
          userId: currentUserId,
          userName: currentUserName
        }

        socket.emit('chatMessage', messageData)
        setMessage('')
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        alertService.error('Error', 'No se pudo enviar el mensaje')
      }
    }
  }

  const startEditing = (msg) => {
    setEditingMessageId(msg._id)
    setEditText(msg.text)
  }

  const cancelEditing = () => {
    setEditingMessageId(null)
    setEditText('')
  }

  const saveEdit = async () => {
    if (editText.trim() && editingMessageId) {
      try {
        const token = localStorage.getItem('token')
        await updateChatMessage(editingMessageId, editText, token)
        cancelEditing()
        alertService.success('¡Éxito!', 'Mensaje actualizado correctamente')
      } catch (error) {
        console.error('Error al actualizar mensaje:', error)
        alertService.error(
          'Error',
          'No se pudo actualizar el mensaje: ' + error.message
        )
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
  }

  const handleDeleteAllMessages = async () => {
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
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString()

    const formattedTime = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })

    return { date: formattedDate, time: formattedTime }
  }

  const canModifyMessage = (msg) => {
    return msg.userId === currentUserId || userRole === 'admin'
  }

  if (isLoading) {
    return (
      <Loading
        isVisible={isLoading}
        loadingText='CARGANDO CHAT...'
        onComplete={() => setIsLoading(false)}
      />
    )
  }

  return (
    <div
      className={`cf-chat-container ${
        animationComplete ? 'cf-chat-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-chat-main-content'>
        <div className='cf-chat-header-actions'>
          <Button
            variant='secondary'
            onClick={() => navigate('/dashboard')}
            leftIcon={<span className='cf-chat-back-icon'></span>}
            className='cf-chat-back-button'
          >
            Volver al Dashboard
          </Button>

          {userRole === 'admin' && (
            <Button
              variant='secondary'
              onClick={handleDeleteAllMessages}
              className='cf-chat-delete-all-button'
            >
              <span className='cf-chat-delete-all-icon'></span>
              Eliminar Todos los Mensajes
            </Button>
          )}
        </div>

        <div className='cf-chat-content'>
          <div className='cf-chat-title-container'>
            <div className='cf-chat-icon'></div>
            <h2 className='cf-chat-title'>Chat en Vivo</h2>
          </div>

          <div className='cf-chat-box' ref={chatBoxRef}>
            {messages.length === 0 ? (
              <div className='cf-chat-no-messages'>
                <div className='cf-chat-empty-icon'></div>
                <p>No hay mensajes aún</p>
                <p>¡Sé el primero en enviar un mensaje!</p>
              </div>
            ) : (
              <div className='cf-chat-messages-container'>
                {messages.map((msg, index) => {
                  const { date, time } = formatDate(msg.createdAt)
                  const displayName = msg.userName || 'Usuario'
                  const isEditing = editingMessageId === msg._id
                  const isOwnMessage = msg.userId === currentUserId
                  const isAdmin = msg.userRole === 'admin'

                  return (
                    <div
                      key={msg._id || index}
                      className={`cf-chat-message-wrapper ${
                        isOwnMessage ? 'cf-chat-own-message' : ''
                      } ${isAdmin ? 'cf-chat-admin-message' : ''}`}
                    >
                      <div className='cf-chat-message'>
                        <div className='cf-chat-message-header'>
                          <span className='cf-chat-message-username'>
                            {isAdmin && (
                              <span className='cf-chat-admin-badge'>Admin</span>
                            )}
                            {displayName}
                          </span>
                          <span className='cf-chat-message-date'>{date}</span>
                        </div>

                        {isEditing ? (
                          <div className='cf-chat-message-edit'>
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className='cf-chat-edit-textarea'
                              autoFocus
                            />
                            <div className='cf-chat-edit-buttons'>
                              <button
                                onClick={saveEdit}
                                className='cf-chat-edit-save-btn'
                              >
                                <span className='cf-chat-save-icon'></span>
                                Guardar
                              </button>
                              <button
                                onClick={cancelEditing}
                                className='cf-chat-edit-cancel-btn'
                              >
                                <span className='cf-chat-cancel-icon'></span>
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className='cf-chat-message-body'>
                              {msg.text}
                            </div>
                            <div className='cf-chat-message-footer'>
                              <span className='cf-chat-message-time'>
                                {time}
                              </span>

                              {canModifyMessage(msg) && (
                                <div className='cf-chat-message-actions'>
                                  <button
                                    onClick={() => startEditing(msg)}
                                    className='cf-chat-message-action-btn cf-chat-edit-btn'
                                    title='Editar mensaje'
                                  >
                                    <span className='cf-chat-edit-icon'></span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteMessage(msg._id)}
                                    className='cf-chat-message-action-btn cf-chat-delete-btn'
                                    title='Eliminar mensaje'
                                  >
                                    <span className='cf-chat-delete-icon'></span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className='cf-chat-input-container'>
            <div className='cf-chat-input-wrapper'>
              <input
                className='cf-chat-input'
                type='text'
                placeholder='Escribe un mensaje...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type='submit'
                variant='primary'
                size='md'
                className='cf-chat-send-button'
                disabled={!message.trim()}
              >
                <span className='cf-chat-send-icon'></span>
                <span className='cf-chat-send-text'>Enviar</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chat*/

import React from 'react'
import './Chat.css'
import Header from '../../../../components/Header/page/Header'
import Loading from '../../../../components/Loading/loading'
import ChatHeader from './components/ChatHeader'
import ChatMainContent from './components/ChatContent'
import { ChatProvider } from './context/ChatContext'
import { useChatOptimized } from './hooks/useChatOptimized'

const ChatInner = React.memo(() => {
  const { isLoading, animationComplete } = useChatOptimized()

  if (isLoading) {
    return (
      <Loading
        isVisible={isLoading}
        loadingText='CARGANDO CHAT...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div
      className={`cf-chat-container ${
        animationComplete ? 'cf-chat-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-chat-main-content'>
        <ChatHeader />
        <ChatMainContent />
      </div>
    </div>
  )
})

ChatInner.displayName = 'ChatInner'

const Chat = () => {
  return (
    <ChatProvider>
      <ChatInner />
    </ChatProvider>
  )
}

export default Chat
