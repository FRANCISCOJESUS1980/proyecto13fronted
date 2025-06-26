import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { fetchClasesUsuario, inscribirClase } from '../../../services/Api/index'
import { useAuth } from '../../../components/Header/hooks/useAuth'
import alertService from '../../../components/sweealert2/sweealert2'
import { API_BASE_URL } from '../../../services/Api/config'

export const useClasesUsuario = ({
  userId,
  selectedDate,
  setInscripcionExitosa,
  setCancelacionExitosa,
  claseSeleccionada,
  setClaseSeleccionada
}) => {
  const [clases, setClases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { userInfo } = useAuth() || {}

  const obtenerHoraClase = (clase) => {
    try {
      if (!clase.horario) return null

      let fechaClase

      if (clase.esFechaEspecifica && clase.fecha) {
        fechaClase = new Date(clase.fecha)
      } else {
        const hoy = new Date()
        const diaSemanaHoy = format(hoy, 'EEEE', { locale: es }).toLowerCase()

        if (clase.diaSemana === diaSemanaHoy) {
          fechaClase = new Date()
        } else {
          fechaClase = obtenerFechaPorDiaSemana(clase.diaSemana)
        }
      }

      if (!fechaClase) return null

      const [horas, minutos] = clase.horario.split(':')
      fechaClase.setHours(
        Number.parseInt(horas, 10),
        Number.parseInt(minutos, 10),
        0,
        0
      )

      return fechaClase
    } catch (error) {
      console.error('Error al obtener hora de clase:', error)
      return null
    }
  }

  const obtenerFechaPorDiaSemana = (diaSemana) => {
    if (!diaSemana) return null

    const diasSemana = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado'
    ]
    const diaIndice = diasSemana.indexOf(diaSemana.toLowerCase())

    if (diaIndice === -1) return null

    const hoy = new Date()
    const diaActual = hoy.getDay()

    let diasHasta = diaIndice - diaActual
    if (diasHasta <= 0) diasHasta += 7

    const fechaObjetivo = new Date(hoy)
    fechaObjetivo.setDate(hoy.getDate() + diasHasta)

    return fechaObjetivo
  }

  const esHoy = (fecha) => {
    const hoy = new Date()
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    )
  }

  const esDiaPasado = (fecha) => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaComparar = new Date(fecha)
    fechaComparar.setHours(0, 0, 0, 0)
    return fechaComparar < hoy
  }

  const claseYaPaso = (clase) => {
    const horaActual = new Date()
    const horaClase = obtenerHoraClase(clase)

    if (!horaClase) return false

    if (esHoy(horaClase)) {
      const horaFinClase = new Date(horaClase)
      horaFinClase.setMinutes(
        horaFinClase.getMinutes() + (clase.duracion || 60)
      )

      return horaActual > horaFinClase
    }

    if (esDiaPasado(horaClase)) {
      return true
    }

    return false
  }

  const puedeInscribirse = (clase) => {
    if (
      userInfo &&
      (userInfo.rol === 'admin' ||
        userInfo.rol === 'monitor' ||
        userInfo.rol === 'creador')
    ) {
      return true
    }

    const horaActual = new Date()
    const horaClase = obtenerHoraClase(clase)

    if (!horaClase) return true

    if (esDiaPasado(horaClase)) {
      return false
    }

    if (esHoy(horaClase)) {
      const diferenciaMinutos = (horaActual - horaClase) / (1000 * 60)
      return diferenciaMinutos <= 10
    }

    return true
  }

  const puedeCancelar = (clase) => {
    if (
      userInfo &&
      (userInfo.rol === 'admin' ||
        userInfo.rol === 'monitor' ||
        userInfo.rol === 'creador')
    ) {
      return true
    }

    const horaActual = new Date()
    const horaClase = obtenerHoraClase(clase)

    if (!horaClase) return true

    if (claseYaPaso(clase)) {
      return false
    }

    if (esHoy(horaClase)) {
      const diferenciaHoras = (horaClase - horaActual) / (1000 * 60 * 60)
      return diferenciaHoras >= 2
    }

    return true
  }

  useEffect(() => {
    const cargarClases = async () => {
      setLoading(true)
      try {
        const data = await fetchClasesUsuario()
        setClases(data)
        setError(null)
      } catch (err) {
        console.error('Error al cargar clases:', err)
        setError('No se pudieron cargar las clases')
        alertService.error('Error', 'No se pudieron cargar las clases')
      } finally {
        setLoading(false)
      }
    }

    cargarClases()
  }, [])

  const handleInscribir = async (claseId) => {
    if (!userId) {
      alertService.warning(
        'Inicio de sesión requerido',
        'Debes iniciar sesión para inscribirte en una clase'
      )
      return
    }

    if (!claseId) {
      console.error('Error: ID de clase no válido', claseId)
      alertService.error(
        'Error de identificación',
        'Error al identificar la clase. Por favor, recarga la página e intenta de nuevo.'
      )
      return
    }

    setLoading(true)
    setClaseSeleccionada(claseId)

    try {
      console.log('Inscribiendo a clase con ID:', claseId)
      const claseActualizada = await inscribirClase(claseId)

      setClases((prevClases) =>
        prevClases.map((clase) => {
          if (clase._id === claseId) {
            return claseActualizada
          }
          return clase
        })
      )

      if (window.updateBonoInfo) {
        setTimeout(() => {
          window.updateBonoInfo()
        }, 300)
      }

      alertService.success(
        '¡Inscripción exitosa!',
        '¡Te has inscrito correctamente a la clase!'
      )
      setInscripcionExitosa('¡Te has inscrito correctamente a la clase!')
      setTimeout(() => setInscripcionExitosa(null), 3000)
    } catch (err) {
      console.error('Error al inscribirse:', err)

      if (err.message && err.message.includes('bono activo')) {
        alertService.error(
          'Bono no disponible',
          'No tienes un bono activo para inscribirte. Contacta con administración.'
        )
      } else if (err.message && err.message.includes('sesiones')) {
        alertService.error(
          'Sin sesiones disponibles',
          'No tienes sesiones disponibles en tu bono. Contacta con administración.'
        )
      } else if (err.message && err.message.includes('expirado')) {
        alertService.error(
          'Bono expirado',
          'Tu bono ha expirado. Contacta con administración para renovarlo.'
        )
      } else if (err.message && err.message.includes('token')) {
        alertService.error(
          'Sesión expirada',
          'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
        )
      } else {
        alertService.error(
          'Error de inscripción',
          err.message || 'Error al inscribirse en la clase'
        )
      }
    } finally {
      setLoading(false)
      setClaseSeleccionada(null)
    }
  }

  const handleCancelar = async (claseId) => {
    if (!userId) {
      alertService.warning(
        'Inicio de sesión requerido',
        'Debes iniciar sesión para cancelar tu inscripción'
      )
      return
    }

    if (!claseId) {
      console.error('Error: ID de clase no válido', claseId)
      alertService.error(
        'Error de identificación',
        'Error al identificar la clase. Por favor, recarga la página e intenta de nuevo.'
      )
      return
    }

    const confirmResult = await alertService.confirm(
      '¿Cancelar inscripción?',
      '¿Estás seguro de que deseas cancelar tu inscripción a esta clase?',
      {
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, mantener inscripción'
      }
    )

    if (!confirmResult.isConfirmed) {
      return
    }

    setLoading(true)
    setClaseSeleccionada(claseId)

    try {
      console.log('=== FRONTEND: Iniciando cancelación ===')
      console.log('Clase ID:', claseId)
      console.log('Usuario ID:', userId)

      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No hay token de autenticación')
      }

      const response = await fetch(
        `${API_BASE_URL}/classes/${claseId}/cancelar`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      )

      const data = await response.json()
      console.log('=== FRONTEND: Respuesta completa del servidor ===', data)

      if (!response.ok) {
        throw new Error(data.message || 'Error al cancelar inscripción')
      }

      const claseActualizada = data.data
      console.log('=== FRONTEND: Clase actualizada recibida ===')
      console.log('Inscritos en respuesta:', claseActualizada.inscritos.length)

      setClases((prevClases) => {
        console.log('=== FRONTEND: Actualizando estado de clases ===')
        const nuevasClases = prevClases.map((clase) => {
          if (clase._id === claseId) {
            console.log('=== FRONTEND: Reemplazando clase ===')
            console.log('Antes - Inscritos:', clase.inscritos.length)
            console.log(
              'Después - Inscritos:',
              claseActualizada.inscritos.length
            )
            return claseActualizada
          }
          return clase
        })
        console.log('=== FRONTEND: Estado actualizado ===')
        return nuevasClases
      })

      if (window.updateBonoInfo) {
        console.log('=== FRONTEND: Actualizando información del bono ===')
        setTimeout(() => {
          window.updateBonoInfo()
        }, 300)
      }

      alertService.success(
        'Cancelación exitosa',
        'Has cancelado tu inscripción correctamente'
      )
      setCancelacionExitosa('Has cancelado tu inscripción correctamente')
      setTimeout(() => setCancelacionExitosa(null), 3000)

      console.log('=== FRONTEND: Cancelación completada exitosamente ===')
    } catch (err) {
      console.error('=== FRONTEND: Error al cancelar inscripción ===', err)
      if (err.message && err.message.includes('token')) {
        alertService.error(
          'Sesión expirada',
          'Tu sesión ha expirado. Por favor, inicia sesión de nuevo.'
        )
      } else {
        alertService.error(
          'Error de cancelación',
          err.message || 'Error al cancelar la inscripción'
        )
      }
    } finally {
      setLoading(false)
      setClaseSeleccionada(null)
    }
  }

  const estaInscrito = (clase) => {
    if (!userId || !clase || !clase.inscritos) return false

    return clase.inscritos.some((inscrito) => {
      if (typeof inscrito === 'string') {
        return inscrito === userId
      }
      return inscrito._id.toString() === userId.toString()
    })
  }

  const getClasesPorDia = () => {
    const diaSeleccionado = format(selectedDate, 'EEEE', {
      locale: es
    }).toLowerCase()

    const fechaSeleccionadaStr = format(selectedDate, 'yyyy-MM-dd')

    return clases.filter((clase) => {
      if (clase.esFechaEspecifica && clase.fecha) {
        try {
          const fechaClase = format(parseISO(clase.fecha), 'yyyy-MM-dd')
          return fechaClase === fechaSeleccionadaStr
        } catch (error) {
          console.error('Error al comparar fechas:', error)
          return false
        }
      }

      return !clase.esFechaEspecifica && clase.diaSemana === diaSeleccionado
    })
  }

  const clasesOrdenadas = getClasesPorDia().sort((a, b) => {
    const getMinutos = (horario) => {
      const [horas, minutos] = horario.split(':').map(Number)
      return horas * 60 + minutos
    }

    return getMinutos(a.horario) - getMinutos(b.horario)
  })

  const clasesDisponiblesHoy = clases.filter((clase) => {
    const diaHoy = format(new Date(), 'EEEE', { locale: es }).toLowerCase()
    return (
      (clase.esFechaEspecifica &&
        clase.fecha &&
        esHoy(new Date(clase.fecha))) ||
      (!clase.esFechaEspecifica && clase.diaSemana === diaHoy)
    )
  }).length

  const clasesInscritasHoy = clases.filter((clase) => {
    const diaHoy = format(new Date(), 'EEEE', { locale: es }).toLowerCase()
    const inscrito = estaInscrito(clase)
    return (
      inscrito &&
      ((clase.esFechaEspecifica &&
        clase.fecha &&
        esHoy(new Date(clase.fecha))) ||
        (!clase.esFechaEspecifica && clase.diaSemana === diaHoy))
    )
  }).length

  const totalClasesDisponibles = clases.length

  return {
    clases,
    clasesOrdenadas,
    loading,
    setLoading,
    error,
    handleInscribir,
    handleCancelar,
    estaInscrito,
    clasesDisponiblesHoy,
    clasesInscritasHoy,
    totalClasesDisponibles,
    puedeInscribirse,
    puedeCancelar
  }
}
