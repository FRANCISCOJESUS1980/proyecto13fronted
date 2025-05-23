import { useState, useEffect, useCallback, useMemo } from 'react'
import { obtenerUsuarioPorId } from '../../../../services/Api/index'
import {
  obtenerBonoUsuario,
  crearBono,
  pausarBono,
  reactivarBono,
  añadirSesiones,
  obtenerHistorialBonos
} from '../../../../services/Api/index'

const TIPOS_BONO = {
  '8 Sesiones': { sesiones: 8, precio: 40, duracion: 1 },
  '10 Sesiones': { sesiones: 10, precio: 45, duracion: 1 },
  '12 Sesiones': { sesiones: 12, precio: 50, duracion: 1 },
  '16 Sesiones': { sesiones: 16, precio: 55, duracion: 1 },
  '20 Sesiones': { sesiones: 20, precio: 60, duracion: 1 },
  Ilimitado: { sesiones: 999, precio: 65, duracion: 1 },
  'Bono 5 sesiones': { sesiones: 5, precio: 40, duracion: 2 },
  'Curso de iniciación + 2 meses': { sesiones: 16, precio: 80, duracion: 2 },
  'Drop in': { sesiones: 1, precio: 10, duracion: 1 }
}

export const useGestionBonos = (userId) => {
  const [usuario, setUsuario] = useState(null)
  const [bonoActivo, setBonoActivo] = useState(null)
  const [historialBonos, setHistorialBonos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showNuevoBonoModal, setShowNuevoBonoModal] = useState(false)
  const [showPausarBonoModal, setShowPausarBonoModal] = useState(false)
  const [showAñadirSesionesModal, setShowAñadirSesionesModal] = useState(false)

  const [nuevoBonoForm, setNuevoBonoForm] = useState(() => ({
    tipo: '8 Sesiones',
    sesionesTotal: 8,
    precio: 40,
    duracionMeses: 1
  }))

  const [pausarBonoForm, setPausarBonoForm] = useState(() => ({
    motivo: ''
  }))

  const [sesionesForm, setSesionesForm] = useState(() => ({
    sesionesAdicionales: 1
  }))

  const getToken = useCallback(() => {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('No hay token de autenticación')
    return token
  }, [])

  const cargarDatos = useCallback(async () => {
    setLoading(true)
    try {
      const token = getToken()

      const usuarioData = await obtenerUsuarioPorId(userId, token)
      setUsuario(usuarioData)

      try {
        const bonoData = await obtenerBonoUsuario(token, userId)
        setBonoActivo(bonoData.data)
      } catch (err) {
        setBonoActivo(null)
      }

      try {
        const historialData = await obtenerHistorialBonos(token, userId)
        setHistorialBonos(historialData.data)
      } catch (err) {
        console.error('Error al cargar historial de bonos:', err)
        setHistorialBonos([])
      }

      setError(null)
    } catch (err) {
      console.error('Error al cargar datos:', err)
      setError(err.message || 'Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }, [userId, getToken])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const handleNuevoBonoChange = useCallback((e) => {
    const { name, value } = e.target

    setNuevoBonoForm((prevForm) => {
      if (name === 'tipo' && TIPOS_BONO[value]) {
        return {
          tipo: value,
          sesionesTotal: TIPOS_BONO[value].sesiones,
          precio: TIPOS_BONO[value].precio,
          duracionMeses: TIPOS_BONO[value].duracion
        }
      }

      return {
        ...prevForm,
        [name]:
          name === 'duracionMeses' ||
          name === 'sesionesTotal' ||
          name === 'precio'
            ? parseInt(value)
            : value
      }
    })
  }, [])

  const handleCrearBono = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)

      try {
        const token = getToken()

        const response = await crearBono(token, {
          userId,
          ...nuevoBonoForm
        })

        setBonoActivo(response.data)

        const historialData = await obtenerHistorialBonos(token, userId)
        setHistorialBonos(historialData.data)

        setShowNuevoBonoModal(false)
        setError(null)
      } catch (err) {
        console.error('Error al crear bono:', err)
        setError(err.message || 'Error al crear el bono')
      } finally {
        setLoading(false)
      }
    },
    [userId, nuevoBonoForm, getToken]
  )

  const handlePausarBono = useCallback(
    async (e) => {
      e.preventDefault()
      setLoading(true)

      try {
        const token = getToken()

        await pausarBono(token, bonoActivo._id, pausarBonoForm)

        const bonoData = await obtenerBonoUsuario(token, userId)
        setBonoActivo(bonoData.data)

        setShowPausarBonoModal(false)
        setPausarBonoForm({ motivo: '' })
        setError(null)
      } catch (err) {
        console.error('Error al pausar bono:', err)
        setError(err.message || 'Error al pausar el bono')
      } finally {
        setLoading(false)
      }
    },
    [userId, bonoActivo, pausarBonoForm, getToken]
  )

  const handleReactivarBono = useCallback(async () => {
    if (!bonoActivo) return

    setLoading(true)

    try {
      const token = getToken()

      await reactivarBono(token, bonoActivo._id, { diasExtension: 0 })

      const bonoData = await obtenerBonoUsuario(token, userId)
      setBonoActivo(bonoData.data)

      setError(null)
    } catch (err) {
      console.error('Error al reactivar bono:', err)
      setError(err.message || 'Error al reactivar el bono')
    } finally {
      setLoading(false)
    }
  }, [userId, bonoActivo, getToken])

  const handleAñadirSesiones = useCallback(
    async (e) => {
      e.preventDefault()
      if (!bonoActivo) return

      setLoading(true)

      try {
        const token = getToken()

        await añadirSesiones(token, bonoActivo._id, sesionesForm)

        const bonoData = await obtenerBonoUsuario(token, userId)
        setBonoActivo(bonoData.data)

        setShowAñadirSesionesModal(false)
        setSesionesForm({ sesionesAdicionales: 1 })
        setError(null)
      } catch (err) {
        console.error('Error al añadir sesiones:', err)
        setError(err.message || 'Error al añadir sesiones')
      } finally {
        setLoading(false)
      }
    },
    [userId, bonoActivo, sesionesForm, getToken]
  )

  const formatFecha = useCallback((fechaStr) => {
    if (!fechaStr) return ''

    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }, [])

  const updatePausarBonoForm = useCallback((newValues) => {
    setPausarBonoForm((prev) => ({ ...prev, ...newValues }))
  }, [])

  const updateSesionesForm = useCallback((newValues) => {
    setSesionesForm((prev) => ({ ...prev, ...newValues }))
  }, [])

  const openNuevoBonoModal = useCallback(() => setShowNuevoBonoModal(true), [])
  const closeNuevoBonoModal = useCallback(
    () => setShowNuevoBonoModal(false),
    []
  )

  const openPausarBonoModal = useCallback(
    () => setShowPausarBonoModal(true),
    []
  )
  const closePausarBonoModal = useCallback(
    () => setShowPausarBonoModal(false),
    []
  )

  const openAñadirSesionesModal = useCallback(
    () => setShowAñadirSesionesModal(true),
    []
  )
  const closeAñadirSesionesModal = useCallback(
    () => setShowAñadirSesionesModal(false),
    []
  )

  return useMemo(
    () => ({
      usuario,
      bonoActivo,
      historialBonos,
      loading,
      error,
      showNuevoBonoModal,
      showPausarBonoModal,
      showAñadirSesionesModal,
      nuevoBonoForm,
      pausarBonoForm,
      sesionesForm,

      openNuevoBonoModal,
      closeNuevoBonoModal,
      openPausarBonoModal,
      closePausarBonoModal,
      openAñadirSesionesModal,
      closeAñadirSesionesModal,

      handleNuevoBonoChange,
      handleCrearBono,
      handlePausarBono,
      handleReactivarBono,
      handleAñadirSesiones,
      updatePausarBonoForm,
      updateSesionesForm,

      formatFecha,

      recargarDatos: cargarDatos
    }),
    [
      usuario,
      bonoActivo,
      historialBonos,
      loading,
      error,
      showNuevoBonoModal,
      showPausarBonoModal,
      showAñadirSesionesModal,
      nuevoBonoForm,
      pausarBonoForm,
      sesionesForm,
      openNuevoBonoModal,
      closeNuevoBonoModal,
      openPausarBonoModal,
      closePausarBonoModal,
      openAñadirSesionesModal,
      closeAñadirSesionesModal,
      handleNuevoBonoChange,
      handleCrearBono,
      handlePausarBono,
      handleReactivarBono,
      handleAñadirSesiones,
      updatePausarBonoForm,
      updateSesionesForm,
      formatFecha,
      cargarDatos
    ]
  )
}
