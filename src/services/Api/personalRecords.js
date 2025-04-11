import { API_BASE_URL, checkResponse, handleApiError } from './config'

export const getPersonalRecords = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/personal-records`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await checkResponse(response)
    return data.data || data
  } catch (error) {
    handleApiError(error, 'Error al obtener las marcas personales')
    throw error
  }
}

export const getUniqueExercises = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/personal-records/exercises`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await checkResponse(response)
    return data.data || data
  } catch (error) {
    handleApiError(error, 'Error al obtener los ejercicios únicos')
    throw error
  }
}

export const createPersonalRecord = async (record) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/personal-records`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(record)
    })

    const data = await checkResponse(response)
    return data.data || data
  } catch (error) {
    handleApiError(error, 'Error al crear la marca personal')
    throw error
  }
}

export const updatePersonalRecord = async (id, record) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/personal-records/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(record)
    })

    const data = await checkResponse(response)
    return data.data || data
  } catch (error) {
    handleApiError(error, 'Error al actualizar la marca personal')
    throw error
  }
}

export const deletePersonalRecord = async (id) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_BASE_URL}/personal-records/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await checkResponse(response)
    return data
  } catch (error) {
    handleApiError(error, 'Error al eliminar la marca personal')
    throw error
  }
}

export const getPersonalRecordStats = async (ejercicio) => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(
      `${API_BASE_URL}/personal-records/stats?ejercicio=${encodeURIComponent(
        ejercicio
      )}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await checkResponse(response)
    return data.data || data
  } catch (error) {
    handleApiError(error, 'Error al obtener estadísticas del ejercicio')
    throw error
  }
}
