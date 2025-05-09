import { useState, useEffect, useCallback } from 'react'
import { fetchClasesAPI, deleteClaseAPI } from '../services/clasesService'
import alertService from '../../../../components/sweealert2/sweealert2'

export const useClases = () => {
  const [clases, setClases] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const fetchClases = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchClasesAPI()
      if (data.success) {
        setClases(data.data)
      }
    } catch (error) {
      console.error('Error al obtener las clases:', error)
      setError('Error al cargar las clases. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleDelete = async (id) => {
    setLoading(true)
    try {
      const data = await deleteClaseAPI(id)
      if (data.success) {
        fetchClases()
        alertService.success('¡Éxito!', 'Clase eliminada con éxito')
      }
    } catch (error) {
      console.error('Error al eliminar la clase:', error)
      alertService.error('Error', 'Error al eliminar la clase')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClases()
  }, [fetchClases])

  return {
    clases,
    loading,
    error,
    success,
    setError,
    setSuccess,
    fetchClases,
    handleDelete
  }
}
