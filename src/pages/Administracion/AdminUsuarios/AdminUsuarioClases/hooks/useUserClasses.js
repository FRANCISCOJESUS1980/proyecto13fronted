import { useState, useEffect } from 'react'
import { fetchUserClasses } from '../services/userClassesService'
import { filterClassesByDate, sortClassesByTime } from '../utils/classUtils'
import { ERROR_MESSAGES } from '../constants/adminUsuarioClases'

export const useUserClasses = (selectedDate) => {
  const [clases, setClases] = useState([])
  const [clasesOrdenadas, setClasesOrdenadas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadClasses = async () => {
      if (!selectedDate) return

      try {
        setLoading(true)
        setError('')

        const data = await fetchUserClasses()
        const clasesDelDia = filterClassesByDate(data, selectedDate)
        const ordenadas = sortClassesByTime(clasesDelDia)

        setClases(clasesDelDia)
        setClasesOrdenadas(ordenadas)
      } catch (error) {
        console.error('Error al cargar clases:', error)
        setError(ERROR_MESSAGES.FETCH_CLASSES)
      } finally {
        setLoading(false)
      }
    }

    loadClasses()
  }, [selectedDate])

  const updateClasses = (updatedClass) => {
    setClases((prevClases) =>
      prevClases.map((clase) =>
        clase._id === updatedClass._id ? updatedClass : clase
      )
    )

    setClasesOrdenadas((prevClases) => {
      const updated = prevClases.map((clase) =>
        clase._id === updatedClass._id ? updatedClass : clase
      )
      return sortClassesByTime(updated)
    })
  }

  return {
    clases,
    clasesOrdenadas,
    loading,
    error,
    updateClasses
  }
}
