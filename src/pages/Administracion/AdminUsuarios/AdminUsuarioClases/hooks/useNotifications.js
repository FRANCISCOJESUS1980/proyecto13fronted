import { useState, useCallback } from 'react'
import { NOTIFICATION_TIMEOUT } from '../constants/adminUsuarioClases'

export const useNotifications = () => {
  const [inscripcionExitosa, setInscripcionExitosa] = useState(null)
  const [cancelacionExitosa, setCancelacionExitosa] = useState(null)

  const showInscripcionExitosa = useCallback((message) => {
    setInscripcionExitosa(message)
    setTimeout(() => setInscripcionExitosa(null), NOTIFICATION_TIMEOUT)
  }, [])

  const showCancelacionExitosa = useCallback((message) => {
    setCancelacionExitosa(message)
    setTimeout(() => setCancelacionExitosa(null), NOTIFICATION_TIMEOUT)
  }, [])

  const clearNotifications = useCallback(() => {
    setInscripcionExitosa(null)
    setCancelacionExitosa(null)
  }, [])

  return {
    inscripcionExitosa,
    cancelacionExitosa,
    showInscripcionExitosa,
    showCancelacionExitosa,
    clearNotifications
  }
}
