import axios from 'axios'

const API_URL = 'http://localhost:5000/api'

export const fetchClasesUsuario = async () => {
  try {
    const response = await axios.get(`${API_URL}/classes`, {
      withCredentials: true
    })

    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data
    } else {
      throw new Error('La respuesta del servidor no es válida')
    }
  } catch (error) {
    console.error('Error al obtener clases:', error)
    throw new Error('No se pudieron cargar las clases')
  }
}

export const inscribirClase = async (claseId) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.post(
      `${API_URL}/classes/${claseId}/inscribir`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Error al inscribirse')
    }
  } catch (error) {
    console.error('Error al inscribirse:', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Error al inscribirse en la clase'
    )
  }
}

export const cancelarClase = async (claseId) => {
  try {
    const token = localStorage.getItem('token')

    const response = await axios.post(
      `${API_URL}/classes/${claseId}/cancelar`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    )

    if (response.data.success) {
      return response.data.data
    } else {
      throw new Error(response.data.message || 'Error al cancelar inscripción')
    }
  } catch (error) {
    console.error('Error al cancelar inscripción:', error)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Error al cancelar la inscripción'
    )
  }
}
