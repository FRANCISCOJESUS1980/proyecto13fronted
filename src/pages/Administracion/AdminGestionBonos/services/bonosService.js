import { API_BASE_URL, handleApiError } from '../../../../services/Api/config'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No hay token de autenticación')
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export const obtenerBonoActivo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/me`, {
      headers: getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener bono')
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    handleApiError(error, 'Error al obtener bono:')
    throw error
  }
}

export const obtenerBonoUsuario = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/usuario/${userId}`, {
      headers: getAuthHeaders()
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener bono')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener bono:')
    throw error
  }
}

export const obtenerHistorialBonos = async (userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bonos/usuario/${userId}/historial`,
      {
        headers: getAuthHeaders()
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(
        errorData.message || 'Error al obtener historial de bonos'
      )
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener historial de bonos:')
    throw error
  }
}

export const crearBono = async (bonoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bonoData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al crear bono')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al crear bono:')
    throw error
  }
}

export const pausarBono = async (bonoId, pausaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/${bonoId}/pausar`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(pausaData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al pausar bono')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al pausar bono:')
    throw error
  }
}

export const reactivarBono = async (bonoId, reactivacionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/${bonoId}/reactivar`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(reactivacionData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al reactivar bono')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al reactivar bono:')
    throw error
  }
}

export const añadirSesiones = async (bonoId, sesionesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bonos/${bonoId}/agregar-sesiones`,
      {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(sesionesData)
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al añadir sesiones')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al añadir sesiones:')
    throw error
  }
}
