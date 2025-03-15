import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Header/Header'
import {
  loadChatMessages,
  createSocketConnection
} from '../../services/Api/index'
import Button from '../Button/Button'
import './Chat.css'

const socket = createSocketConnection()

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
      <Button
        variant='secondary'
        onClick={() => navigate('/dashboard')}
        leftIcon={<span>←</span>}
      >
        Volver al Dashboard
      </Button>

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
          <Button type='submit' variant='primary' size='md'>
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Chat
