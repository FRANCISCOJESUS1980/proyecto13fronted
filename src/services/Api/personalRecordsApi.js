import { API_BASE_URL, handleApiError, checkResponse } from './config'

const getAuthToken = () => {
  return localStorage.getItem('token')
}

export const fetchPersonalRecordsApi = async () => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/personal-records`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await checkResponse(response)

    console.log('Datos recibidos de la API:', responseData)

    if (responseData && responseData.success && responseData.data) {
      return responseData.data
    } else if (Array.isArray(responseData)) {
      return responseData
    } else {
      return []
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener marcas personales:')
    return []
  }
}

export const fetchUniqueExercisesApi = async () => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/personal-records/exercises`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return responseData.data
    } else if (Array.isArray(responseData)) {
      return responseData
    } else {
      return []
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener ejercicios únicos:')
    return []
  }
}

export const addPersonalRecordApi = async (recordData) => {
  try {
    const token = getAuthToken()

    const response = await fetch(`${API_BASE_URL}/personal-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(recordData)
    })

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return {
        success: true,
        data: responseData.data,
        message: responseData.message || 'Marca personal guardada con éxito'
      }
    } else {
      return {
        success: true,
        data: responseData,
        message: 'Marca personal guardada con éxito'
      }
    }
  } catch (error) {
    handleApiError(error, 'Error al guardar marca personal:')
    throw error
  }
}

export const updatePersonalRecordApi = async (recordId, recordData) => {
  try {
    const token = getAuthToken()

    const response = await fetch(
      `${API_BASE_URL}/personal-records/${recordId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(recordData)
      }
    )

    const responseData = await checkResponse(response)

    if (responseData && responseData.success && responseData.data) {
      return {
        success: true,
        data: responseData.data,
        message: responseData.message || 'Marca personal actualizada con éxito'
      }
    } else {
      return {
        success: true,
        data: responseData,
        message: 'Marca personal actualizada con éxito'
      }
    }
  } catch (error) {
    handleApiError(error, 'Error al actualizar marca personal:')
    throw error
  }
}

export const deletePersonalRecordApi = async (recordId) => {
  try {
    const token = getAuthToken()

    const response = await fetch(
      `${API_BASE_URL}/personal-records/${recordId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const responseData = await checkResponse(response)

    return {
      success: true,
      message: responseData.message || 'Marca personal eliminada con éxito'
    }
  } catch (error) {
    handleApiError(error, 'Error al eliminar marca personal:')
    throw error
  }
}
