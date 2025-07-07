import { API_BASE_URL, checkResponse, handleApiError } from './config'

export const guardarConsentimiento = async (consentimientoData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consentimientos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(consentimientoData)
    })

    const data = await checkResponse(response)

    return {
      success: true,
      data
    }
  } catch (error) {
    console.error('Error al guardar consentimiento:', error)
    return {
      success: false,
      message: error.message || 'Error al guardar el consentimiento'
    }
  }
}

export const obtenerTodosConsentimientos = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/consentimientos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(error, 'Error al obtener los consentimientos')
  }
}

export const obtenerConsentimientoPorUsuario = async (userId, token) => {
  try {
    if (!userId) {
      throw new Error('El userId es requerido para obtener el consentimiento')
    }

    const response = await fetch(
      `${API_BASE_URL}/consentimientos/usuario/${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(
      error,
      'Error al obtener el consentimiento del usuario'
    )
  }
}

export const eliminarConsentimiento = async (id, token) => {
  try {
    if (!id) {
      throw new Error('El ID del consentimiento es requerido para eliminarlo')
    }

    const response = await fetch(`${API_BASE_URL}/consentimientos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return await checkResponse(response)
  } catch (error) {
    return handleApiError(error, 'Error al eliminar el consentimiento')
  }
}
export const verificarConsentimiento = async (userId, token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/consentimientos/usuario/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    if (response.status === 404) {
      return {
        success: true,
        consentimientoFirmado: false,
        consentimiento: null
      }
    }

    const data = await checkResponse(response)

    return {
      success: true,
      consentimientoFirmado: true,
      consentimiento: data.data
    }
  } catch (error) {
    console.error('Error en verificarConsentimiento:', error)

    if (error.message && error.message.includes('404')) {
      return {
        success: true,
        consentimientoFirmado: false,
        consentimiento: null
      }
    }

    return {
      success: false,
      consentimientoFirmado: false,
      consentimiento: null,
      error: error.message
    }
  }
}
