import { useState, useCallback } from 'react'
import {
  enrollUserInClass,
  cancelUserEnrollment
} from '../services/userClassesService'

export const useClassActions = (userId, userInfo, onClassUpdate) => {
  const [claseSeleccionada, setClaseSeleccionada] = useState(null)
  const [error, setError] = useState('')

  const handleInscribir = useCallback(
    async (claseId) => {
      try {
        setClaseSeleccionada(claseId)
        setError('')

        const claseActualizada = await enrollUserInClass(claseId, userId)
        onClassUpdate(claseActualizada)

        return {
          success: true,
          message: `${userInfo.nombre} ha sido inscrito correctamente en la clase`
        }
      } catch (error) {
        console.error('Error al inscribir al usuario:', error)
        setError(error.message)
        return { success: false, error: error.message }
      } finally {
        setClaseSeleccionada(null)
      }
    },
    [userId, userInfo, onClassUpdate]
  )

  const handleCancelar = useCallback(
    async (claseId) => {
      try {
        setClaseSeleccionada(claseId)
        setError('')

        const claseActualizada = await cancelUserEnrollment(claseId, userId)
        onClassUpdate(claseActualizada)

        return {
          success: true,
          message: `La inscripción de ${userInfo.nombre} ha sido cancelada correctamente`
        }
      } catch (error) {
        console.error('Error al cancelar la inscripción:', error)
        setError(error.message)
        return { success: false, error: error.message }
      } finally {
        setClaseSeleccionada(null)
      }
    },
    [userId, userInfo, onClassUpdate]
  )

  return {
    claseSeleccionada,
    error,
    handleInscribir,
    handleCancelar
  }
}
