import { API_BASE_URL, handleApiError } from './config'

export const obtenerBonoUsuario = async (token, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/usuario/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
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

export const obtenerHistorialBonos = async (token, userId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bonos/usuario/${userId}/historial`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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

export const crearBono = async (token, bonoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
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

export const pausarBono = async (token, bonoId, pausaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/${bonoId}/pausar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
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

export const reactivarBono = async (token, bonoId, reactivacionData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/${bonoId}/reactivar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
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

export const añadirSesiones = async (token, bonoId, sesionesData) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/bonos/${bonoId}/agregar-sesiones`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
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
export const obtenerBonos = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al obtener bonos')
    }

    return await response.json()
  } catch (error) {
    handleApiError(error, 'Error al obtener bonos:')
    throw error
  }
}

export const obtenerBonoActivo = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bonos/activo`, {
      credentials: 'include'
    })

    if (!response.ok) {
      const errorData = await response.json()

      if (
        response.status === 404 ||
        (errorData &&
          errorData.message &&
          errorData.message.includes('no tiene un bono activo'))
      ) {
        return null
      }
      throw new Error(errorData.message || 'Error al obtener bono activo')
    }

    const data = await response.json()

    if (data && data.success) {
      return data.data
    } else {
      return null
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener bono activo:')
    return null
  }
}
