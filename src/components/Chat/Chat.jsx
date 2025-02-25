import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'
import Header from '../Header/Header'
import './Chat.css'

const BACKEND_URL = 'http://localhost:5000'
const socket = io(BACKEND_URL)

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadInitialMessages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/chat/messages`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        console.log('Fallback a socket para cargar mensajes')
        return
      }

      const data = await response.json()
      setMessages(data)
      setIsLoading(false)
      setTimeout(scrollToBottom, 100)
    } catch (error) {
      console.log('Usando socket como fallback para cargar mensajes')
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadInitialMessages()

    socket.on('chatHistory', (history) => {
      setMessages(history)
      setIsLoading(false)
      setTimeout(scrollToBottom, 100)
    })

    socket.on('chatMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setTimeout(scrollToBottom, 100)
    })

    socket.on('error', (error) => {
      console.error('Error del socket:', error)
    })

    return () => {
      socket.off('chatHistory')
      socket.off('chatMessage')
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
