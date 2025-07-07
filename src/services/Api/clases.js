import { API_BASE_URL, handleApiError, checkResponse } from './config'
import { isValid, format } from 'date-fns'
import { es } from 'date-fns/locale'
import alertService from '../../components/sweealert2/sweealert2'

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
    if (!id) {
      throw new Error('ID de clase no válido')
    }

    if (id.length > 100 || id.includes('eyJ')) {
      console.error('Se está pasando un token como ID:', id)
      throw new Error('ID de clase no válido (parece ser un token)')
    }

    const confirmResult = await alertService.confirm(
      '¿Eliminar clase?',
      '¿Estás seguro de que deseas eliminar esta clase? Esta acción no se puede deshacer.',
      {
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
        icon: 'warning'
      }
    )

    if (!confirmResult.isConfirmed) {
      return { cancelled: true }
    }

    const response = await fetch(`${API_BASE_URL}/classes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    })

    const result = await checkResponse(response)

    if (result) {
      alertService.success(
        'Clase eliminada',
        'La clase ha sido eliminada correctamente'
      )
    }

    return result
  } catch (error) {
    handleApiError(error, 'Error al eliminar clase:')
    alertService.error('Error', error.message || 'Error al eliminar la clase')
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

    alertService.loading(
      'Guardando clases',
      'Estamos procesando tu solicitud. Por favor, espera...'
    )

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

    alertService.close()

    const result = {
      success: clasesCreadas.length > 0,
      clasesCreadas: clasesCreadas.length,
      clasesConError: clasesConError.length
    }

    if (result.success) {
      alertService.success(
        'Clases guardadas',
        `${result.clasesCreadas} horarios de clase ${
          editingId ? 'actualizados' : 'creados'
        } con éxito`
      )
    }

    if (result.clasesConError > 0) {
      alertService.warning(
        'Atención',
        `Hubo errores al crear ${result.clasesConError} horarios. Por favor, inténtalo de nuevo.`
      )
    }

    return result
  } catch (error) {
    try {
      alertService.close()
    } catch (e) {
      console.error('Error al cerrar alerta:', e)
    }

    handleApiError(error, 'Error al guardar clase:')
    alertService.error('Error', error.message || 'Error al guardar la clase')
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

    const confirmResult = await alertService.confirm(
      'Inscribir usuario',
      '¿Estás seguro de que deseas inscribir a este usuario en la clase?',
      {
        confirmButtonText: 'Sí, inscribir',
        cancelButtonText: 'No, cancelar'
      }
    )

    if (!confirmResult.isConfirmed) {
      return { cancelled: true }
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

    alertService.success(
      'Usuario inscrito',
      'El usuario ha sido inscrito correctamente a la clase'
    )
    return data.data
  } catch (error) {
    handleApiError(error, 'Error al inscribir al usuario:')
    alertService.error(
      'Error',
      error.message || 'Error al inscribir al usuario'
    )
    throw error
  }
}

export const cancelarClaseAdmin = async (claseId, userId) => {
  try {
    if (!claseId || !userId) {
      throw new Error('ID de clase o usuario no válido')
    }

    const confirmResult = await alertService.confirm(
      'Cancelar inscripción',
      '¿Estás seguro de que deseas cancelar la inscripción de este usuario?',
      {
        confirmButtonText: 'Sí, cancelar inscripción',
        cancelButtonText: 'No, mantener inscripción',
        icon: 'warning'
      }
    )

    if (!confirmResult.isConfirmed) {
      return { cancelled: true }
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

    alertService.success(
      'Inscripción cancelada',
      'La inscripción del usuario ha sido cancelada correctamente'
    )
    return data.data
  } catch (error) {
    handleApiError(error, 'Error al cancelar inscripción:')
    alertService.error(
      'Error',
      error.message || 'Error al cancelar la inscripción'
    )
    throw error
  }
}
