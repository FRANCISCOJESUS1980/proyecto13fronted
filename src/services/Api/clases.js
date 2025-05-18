import { API_BASE_URL, handleApiError, checkResponse } from './config'
import { isValid, format } from 'date-fns'
import { es } from 'date-fns/locale'

const getAuthHeaders = (token) => {
  if (!token) {
    token = localStorage.getItem('token')
    if (!token) {
      throw new Error('No hay token de autenticación')
    }
  }
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export const fetchClases = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: getAuthHeaders(token)
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al obtener clases:')
    throw error
  }
}

export const deleteClase = async (id, token) => {
  try {
    console.log('Intentando eliminar clase con ID:', id)

    if (!id) {
      throw new Error('ID de clase no válido')
    }

    if (id.length > 100 || id.includes('eyJ')) {
      console.error('Se está pasando un token como ID:', id)
      throw new Error('ID de clase no válido (parece ser un token)')
    }

    const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    })

    return await checkResponse(response)
  } catch (error) {
    handleApiError(error, 'Error al eliminar clase:')
    throw error
  }
}

export const guardarClaseAPI = async (
  token,
  formData,
  editingId,
  modoCreacion
) => {
  try {
    console.log('Datos recibidos en guardarClaseAPI:', {
      formData,
      editingId,
      modoCreacion
    })

    if (!formData || typeof formData !== 'object') {
      throw new Error(
        'Datos de formulario no válidos: formData no es un objeto'
      )
    }

    if (!formData.horarios || !Array.isArray(formData.horarios)) {
      if (formData.hora && formData.duracion) {
        formData.horarios = [
          {
            hora: formData.hora,
            duracion: formData.duracion
          }
        ]
        console.log(
          'Horarios creados a partir de hora y duración:',
          formData.horarios
        )
      } else {
        throw new Error(
          'Datos de formulario incompletos: horarios no es un array válido'
        )
      }
    }

    const horariosInvalidos = formData.horarios.some(
      (h) => !h.hora || !h.duracion
    )

    if (horariosInvalidos) {
      throw new Error('Todos los horarios deben tener hora y duración')
    }

    if (modoCreacion === 'semanal' && !formData.diaSemana) {
      throw new Error('Debes seleccionar un día de la semana')
    }

    if (modoCreacion === 'fecha' && !formData.fecha) {
      throw new Error('Debes seleccionar una fecha específica')
    }

    const clasesCreadas = []
    const clasesConError = []

    for (const horario of formData.horarios) {
      const formDataToSend = new FormData()

      formDataToSend.append('nombre', formData.nombre)
      formDataToSend.append('descripcion', formData.descripcion)
      formDataToSend.append('horario', horario.hora)
      formDataToSend.append('duracion', horario.duracion)
      formDataToSend.append('capacidadMaxima', formData.capacidadMaxima)
      formDataToSend.append('categoria', formData.categoria)
      formDataToSend.append('nivel', formData.nivel)
      formDataToSend.append('ubicacion', formData.ubicacion)

      if (modoCreacion === 'semanal') {
        formDataToSend.append('diaSemana', formData.diaSemana)
        formDataToSend.append('fecha', '')
        formDataToSend.append('esFechaEspecifica', 'false')
      } else {
        formDataToSend.append('fecha', formData.fecha)
        formDataToSend.append('esFechaEspecifica', 'true')

        const fechaSeleccionada = new Date(formData.fecha)
        if (isValid(fechaSeleccionada)) {
          const diaSemanaCalculado = format(fechaSeleccionada, 'EEEE', {
            locale: es
          }).toLowerCase()
          formDataToSend.append('diaSemana', diaSemanaCalculado)
        } else {
          throw new Error('La fecha seleccionada no es válida')
        }
      }

      if (formData.entrenador && formData.entrenador !== '') {
        formDataToSend.append('entrenador', formData.entrenador)
      }

      if (
        formData.imagen &&
        formData.imagen instanceof File &&
        clasesCreadas.length === 0
      ) {
        formDataToSend.append('imagen', formData.imagen)
      }

      const url = editingId
        ? `${API_BASE_URL}/classes/${editingId}`
        : `${API_BASE_URL}/classes`

      const method = editingId ? 'PUT' : 'POST'

      try {
        const response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formDataToSend
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || `HTTP error! status: ${response.status}`
          )
        }

        clasesCreadas.push(data.data)
      } catch (error) {
        clasesConError.push({ horario: horario.hora, error: error.message })
      }
    }

    return {
      success: clasesCreadas.length > 0,
      clasesCreadas: clasesCreadas.length,
      clasesConError: clasesConError.length
    }
  } catch (error) {
    handleApiError(error, 'Error al guardar clase:')
    throw error
  }
}

export const fetchClasesUsuario = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/classes`, {
      headers: getAuthHeaders(),
      credentials: 'include'
    })

    const data = await checkResponse(response)

    if (data && Array.isArray(data.data)) {
      return data.data
    } else {
      throw new Error('La respuesta del servidor no es válida')
    }
  } catch (error) {
    handleApiError(error, 'Error al obtener clases:')
    throw error
  }
}

export const inscribirClase = async (claseId) => {
  try {
    if (!claseId) {
      throw new Error('ID de clase no válido')
    }

    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/inscribir`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al inscribirse')
    }

    return data.data
  } catch (error) {
    handleApiError(error, 'Error al inscribirse:')
    throw error
  }
}

export const cancelarClase = async (claseId) => {
  try {
    if (!claseId) {
      throw new Error('ID de clase no válido')
    }

    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/cancelar`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al cancelar inscripción')
    }

    return data.data
  } catch (error) {
    handleApiError(error, 'Error al cancelar inscripción:')
    throw error
  }
}

export const inscribirClaseAdmin = async (claseId, userId) => {
  try {
    if (!claseId || !userId) {
      throw new Error('ID de clase o usuario no válido')
    }

    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/inscribir-usuario`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId }),
        credentials: 'include'
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al inscribir al usuario')
    }

    return data.data
  } catch (error) {
    handleApiError(error, 'Error al inscribir al usuario:')
    throw error
  }
}

export const cancelarClaseAdmin = async (claseId, userId) => {
  try {
    if (!claseId || !userId) {
      throw new Error('ID de clase o usuario no válido')
    }

    const response = await fetch(
      `${API_BASE_URL}/classes/${claseId}/cancelar-usuario`,
      {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId }),
        credentials: 'include'
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al cancelar inscripción')
    }

    return data.data
  } catch (error) {
    handleApiError(error, 'Error al cancelar inscripción:')
    throw error
  }
}
