import { API_BASE_URL, handleApiError, checkResponse } from './config'

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

export const obtenerMensajesConversacion = async (token, conversacionId) => {
  try {
    if (!conversacionId) {
      console.error('ID de conversación no proporcionado')
      return {
        success: false,
        data: [],
        message: 'ID de conversación no válido'
      }
    }

    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/conversacion/${conversacionId}`,
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
    handleApiError(error, 'Error al obtener mensajes de conversación:')
    return {
      success: false,
      data: [],
      message: error.message || 'Error al obtener mensajes'
    }
  }
}

export const obtenerConversacion = async (token, userId) => {
  try {
    if (!userId) {
      console.error('ID de usuario no proporcionado para obtener conversación')
      return { success: false, data: [], message: 'ID de usuario no válido' }
    }

    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/usuario/${userId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await checkResponse(response)

    if (data.conversacion) {
      data.conversacionActual = data.conversacion
    }

    return data
  } catch (error) {
    handleApiError(error, 'Error al obtener conversación:')
    return {
      success: false,
      data: [],
      message: error.message || 'Error al obtener conversación'
    }
  }
}

export const enviarMensajePrivado = async (
  token,
  destinatarioId,
  mensaje,
  enviarEmail = true
) => {
  try {
    if (!destinatarioId) {
      console.error('ID de destinatario no proporcionado')
      return { success: false, message: 'ID de destinatario no válido' }
    }

    const response = await fetch(`${API_BASE_URL}/mensajes-privados`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        destinatario: destinatarioId,
        mensaje,
        enviarEmail
      })
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al enviar mensaje privado:')
    return { success: false }
  }
}
export const enviarMensajeMasivo = async (
  token,
  { asunto, mensaje, enviarEmail = true }
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/mensajes-privados/masivo`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        asunto,
        mensaje,
        enviarEmail
      })
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al enviar mensaje masivo:')
    return {
      success: false,
      message: error.message || 'Error al enviar mensaje masivo'
    }
  }
}

export const marcarMensajesComoLeidos = async (token, conversacionId) => {
  try {
    if (!conversacionId) {
      console.error('ID de conversación no proporcionado')
      return { success: false, message: 'ID de conversación no válido' }
    }

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

export const obtenerMensajesNoLeidos = async (token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/no-leidos`,
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
    handleApiError(error, 'Error al obtener mensajes no leídos:')
    return { success: false, cantidad: 0 }
  }
}

export const actualizarMensajePrivado = async (
  token,
  mensajeId,
  nuevoTexto
) => {
  try {
    if (!mensajeId) {
      console.error('ID de mensaje no proporcionado')
      return { success: false, message: 'ID de mensaje no válido' }
    }

    const response = await fetch(
      `${API_BASE_URL}/mensajes-privados/${mensajeId}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ mensaje: nuevoTexto })
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(responseData.message || 'Error al actualizar el mensaje')
    }

    return responseData
  } catch (error) {
    console.error('Error al actualizar mensaje privado:', error)
    return { success: false, message: error.message }
  }
}

export const updatePrivateMessage = actualizarMensajePrivado
export const deletePrivateMessage = eliminarMensajePrivado
