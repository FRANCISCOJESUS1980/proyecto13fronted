import { API_BASE_URL, handleApiError, checkResponse } from './config'
const getAuthToken = () => {
  return localStorage.getItem('token')
}

export const fetchLatestStatsApi = async () => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/physical/stats/latest`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      if (responseData.data.medidas) {
        return { medidas: responseData.data.medidas }
      } else {
        return { medidas: responseData.data }
      }
    } else {
      return { medidas: {} }
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener estadísticas recientes:')
    return { medidas: {} }
  }
}

export const fetchStatsHistoryApi = async () => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/physical/stats/history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return Array.isArray(responseData.data) ? responseData.data : []
    } else {
      return []
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener historial de estadísticas:')
    return []
  }
}

export const fetchTrendsApi = async (medida) => {
  try {
    const token = getAuthToken()

    const response = await fetch(
      `${API_BASE_URL}/physical/stats/trends/${medida}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return responseData.data
    }

    return responseData
  } catch (error) {
    handleApiError(error, `Error al obtener tendencias para ${medida}:`)
    return {
      tendencia: 'estable',
      diferencia: 0,
      tasaCambio: 0,
      unidad: '',
      valores: []
    }
  }
}

export const saveStatsApi = async (statsData) => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/physical/stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(statsData)
    })

    const responseData = await checkResponse(response)

    return {
      success: responseData.success,
      message: responseData.message || 'Estadísticas guardadas correctamente'
    }
  } catch (error) {
    handleApiError(error, 'Error al guardar estadísticas:')
    throw error
  }
}

export const fetchObjetivosApi = async () => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/physical/objetivos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return Array.isArray(responseData.data) ? responseData.data : []
    } else {
      return Array.isArray(responseData) ? responseData : []
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener objetivos:')
    return []
  }
}

export const createObjetivoApi = async (objetivoData) => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/physical/objetivos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(objetivoData)
    })

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return responseData.data
    }

    return {}
  } catch (error) {
    handleApiError(error, 'Error al crear objetivo:')
    throw error
  }
}

export const deleteObjetivoApi = async (objetivoId) => {
  try {
    const token = getAuthToken()

    const response = await fetch(
      `${API_BASE_URL}/physical/objetivos/${objetivoId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const responseData = await checkResponse(response)

    return {
      success: responseData.success,
      message: responseData.message || 'Objetivo eliminado correctamente'
    }
  } catch (error) {
    handleApiError(error, 'Error al eliminar objetivo:')
    throw error
  }
}
