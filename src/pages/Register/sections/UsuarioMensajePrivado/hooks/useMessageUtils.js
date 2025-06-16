import { useCallback } from 'react'

export const useMessageUtils = () => {
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleString()
  }, [])

  const isOwnMessage = useCallback((mensaje, userId) => {
    return mensaje.remitente._id === userId
  }, [])

  return {
    formatDate,
    isOwnMessage
  }
}
