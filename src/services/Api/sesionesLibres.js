import { API_BASE_URL, handleApiError } from './config'

export const obtenerSesionesLibresUsuario = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/sesiones-libres/usuario/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener sesiones libres')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener sesiones libres:')
    throw error
  }
}

export const añadirSesionesLibres = async (token, userId, sesionesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/sesiones-libres/usuario/${userId}/anadir`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sesionesData)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al añadir sesiones libres')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al añadir sesiones libres:')
    throw error
  }
}

export const quitarSesionesLibres = async (token, userId, sesionesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/sesiones-libres/usuario/${userId}/quitar`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sesionesData)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al quitar sesiones libres')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al quitar sesiones libres:')
    throw error
  }
}

export const obtenerMisSesiones = async (token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/sesiones-libres/mis-sesiones`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener mis sesiones')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener mis sesiones:')
    throw error
  }
}

export const obtenerEstadisticasSesionesLibres = async (token) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/sesiones-libres/estadisticas`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener estadísticas')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener estadísticas:')
    throw error
  }
}
