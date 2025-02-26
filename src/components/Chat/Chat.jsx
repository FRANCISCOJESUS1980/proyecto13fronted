import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import './Chat.css'

const BACKEND_URL = 'http://localhost:5000'
const socket = io(BACKEND_URL, {
  reconnectionAttempts: 5,
  transports: ['websocket'],
  withCredentials: true
})

const Chat = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const loadInitialMessages = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${BACKEND_URL}/api/chat/messages`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
        }
      })

      if (response.status === 401) {
        console.warn('Token inválido. Redirigiendo al login...')
        localStorage.removeItem('token')
        window.location.href = '/login'
        return
      }

      if (response.status === 429) {
        console.warn('Demasiadas solicitudes. Esperando...')
        setTimeout(loadInitialMessages, 5000)
        return
      }

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No autorizado`)
      }

      const data = await response.json()
      setMessages(data)
      setIsLoading(false)
      scrollToBottom()
    } catch (error) {
      console.error('Error al cargar mensajes:', error.message)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadInitialMessages()

    const handleChatHistory = (history) => {
      setMessages(history)
      setIsLoading(false)
      scrollToBottom()
    }

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
      scrollToBottom()
    }

    socket.on('chatHistory', handleChatHistory)
    socket.on('chatMessage', handleNewMessage)
    socket.on('error', (error) => console.error('Error del socket:', error))

    return () => {
      socket.off('chatHistory', handleChatHistory)
      socket.off('chatMessage', handleNewMessage)
      socket.off('error')
    }
  }, [])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (message.trim()) {
      try {
        socket.emit('chatMessage', message)
        setMessage('')
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
      }
    }
  }

  return (
    <div className='chat-container'>
      <Header />
      <button className='back-button' onClick={() => navigate('/dashboard')}>
        ← Volver al Dashboard
      </button>
      <div className='chat-content'>
        <h2 className='chat-title'>Chat en Vivo</h2>
        <div className='chat-box'>
          {isLoading ? (
            <div className='loading-messages'>Cargando mensajes...</div>
          ) : messages.length === 0 ? (
            <div className='no-messages'>No hay mensajes aún</div>
          ) : (
            messages.map((msg, index) => (
              <div key={msg._id || index} className='message-wrapper'>
                <div className='message'>
                  {msg.text}
                  <span className='message-time'>
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className='chat-input-container'>
          <input
            className='chat-input'
            type='text'
            placeholder='Escribe un mensaje...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit' className='send-button'>
            Enviar
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
