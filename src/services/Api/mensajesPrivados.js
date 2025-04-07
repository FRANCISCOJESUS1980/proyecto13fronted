/*import { API_BASE_URL, handleApiError, checkResponse } from './config'

export const obtenerMensajesPrivados = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mensajes-privados`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener mensajes privados:')
    return { success: false, data: [] }
  }
}

// Obtener conversación con un usuario específico
export const obtenerConversacion = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/conversacion/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener conversación:')
    return { success: false, data: [] }
  }
}

// Enviar un mensaje privado
export const enviarMensajePrivado = async (token, destinatarioId, mensaje) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mensajes-privados`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        destinatario: destinatarioId,
        mensaje
      })
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al enviar mensaje privado:')
    return { success: false }
  }
}

// Marcar mensajes como leídos
export const marcarMensajesComoLeidos = async (token, conversacionId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/marcar-leidos/${conversacionId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al marcar mensajes como leídos:')
    return { success: false }
  }
}

// Eliminar un mensaje
export const eliminarMensajePrivado = async (token, mensajeId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/${mensajeId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al eliminar mensaje:')
    return { success: false }
  }
}*/
import { API_BASE_URL, handleApiError, checkResponse } from './config'

// Obtener todos los mensajes privados para un usuario
export const obtenerMensajesPrivados = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mensajes-privados`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener mensajes privados:')
    return { success: false, data: [] }
  }
}

// Obtener conversación con un usuario específico
export const obtenerConversacion = async (token, userId) => {
  try {
    // Verificar que el userId existe
    if (!userId) {
      console.error('ID de usuario no proporcionado para obtener conversación')
      return { success: false, data: [], message: 'ID de usuario no válido' }
    }

    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/conversacion/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener conversación:')
    return {
      success: false,
      data: [],
      message: error.message || 'Error al obtener conversación'
    }
  }
}

// Enviar un mensaje privado
export const enviarMensajePrivado = async (token, destinatarioId, mensaje) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mensajes-privados`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        destinatario: destinatarioId,
        mensaje
      })
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al enviar mensaje privado:')
    return { success: false }
  }
}

// Marcar mensajes como leídos
export const marcarMensajesComoLeidos = async (token, conversacionId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/marcar-leidos/${conversacionId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al marcar mensajes como leídos:')
    return { success: false }
  }
}

// Eliminar un mensaje
export const eliminarMensajePrivado = async (token, mensajeId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/${mensajeId}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al eliminar mensaje:')
    return { success: false }
  }
}
