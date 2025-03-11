import { API_BASE_URL, handleApiError, checkResponse } from './config'
import { io } from 'socket.io-client'

const SOCKET_CONFIG = {
  reconnectionAttempts: 5,
  transports: ['websocket'],
  withCredentials: true
}

export const createSocketConnection = () => {
  return io(API_BASE_URL.replace('/api', ''), SOCKET_CONFIG)
}

export const loadChatMessages = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/messages`, {
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
      return []
    }

    if (response.status === 429) {
      console.warn('Demasiadas solicitudes. Esperando...')

      return new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await loadChatMessages(token))
        }, 5000)
      })
    }

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al cargar mensajes del chat:')
    return []
  }
}
