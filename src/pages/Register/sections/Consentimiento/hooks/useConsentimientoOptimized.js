import { useConsentimientoContext } from '../context/ConsentimientoContext'
import { useCallback } from 'react'

export const useConsentimientoOptimized = () => {
  const context = useConsentimientoContext()

  const formData = useCallback(
    () => ({
      aceptado: context.aceptado,
      autorizaImagen: context.autorizaImagen,
      userId: context.userId
    }),
    [context.aceptado, context.autorizaImagen, context.userId]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      error: context.error,
      canSubmit: context.autorizaImagen !== null && !context.loading
    }),
    [context.loading, context.error, context.autorizaImagen]
  )

  return {
    formData,
    uiState,
    setAutorizaImagen: context.setAutorizaImagen,
    resetError: context.resetError,
    handleAccept: context.handleAccept,
    aceptado: context.aceptado,
    autorizaImagen: context.autorizaImagen,
    userId: context.userId,
    loading: context.loading,
    error: context.error
  }
}
