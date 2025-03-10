/*import { format, isValid } from 'date-fns'
import { es } from 'date-fns/locale'

const API_URL = 'http://localhost:5000/api'

export const fetchClasesAPI = async () => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/classes`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export const deleteClaseAPI = async (id) => {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_URL}/classes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return await response.json()
}

export const guardarClase = async (formData, editingId, modoCreacion) => {
  const token = localStorage.getItem('token')

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
      ? `${API_URL}/classes/${editingId}`
      : `${API_URL}/classes`

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
}*/
import {
  fetchClases as fetchClasesApi,
  deleteClase as deleteClaseApi,
  guardarClaseAPI as guardarClaseApiCentral
} from '../../../../services/api'

export const fetchClasesAPI = async () => {
  const token = localStorage.getItem('token')
  return await fetchClasesApi(token)
}

export const deleteClaseAPI = async (id) => {
  const token = localStorage.getItem('token')
  return await deleteClaseApi(token, id)
}

export const guardarClase = async (formData, editingId, modoCreacion) => {
  const token = localStorage.getItem('token')
  return await guardarClaseApiCentral(token, formData, editingId, modoCreacion)
}
