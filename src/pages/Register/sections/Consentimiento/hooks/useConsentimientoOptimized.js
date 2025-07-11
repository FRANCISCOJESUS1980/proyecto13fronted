import { useConsentimientoContext } from '../context/ConsentimientoContext'
import { useCallback } from 'react'

export const useConsentimientoOptimized = () => {
  const context = useConsentimientoContext()

  const formData = useCallback(
    () => ({
      aceptado: context.aceptado,
      autorizaImagen: context.autorizaImagen,
      nombreCompleto: context.nombreCompleto,
      dni: context.dni,
      firmaDigital: context.firmaDigital,
      userId: context.userId
    }),
    [
      context.aceptado,
      context.autorizaImagen,
      context.nombreCompleto,
      context.dni,
      context.firmaDigital,
      context.userId
    ]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      error: context.error,
      canSubmit:
        context.autorizaImagen !== null &&
        context.nombreCompleto &&
        context.nombreCompleto.trim() !== '' &&
        context.dni &&
        context.dni.trim() !== '' &&
        context.firmaDigital &&
        context.firmaDigital !== '' &&
        !context.loading
    }),
    [
      context.loading,
      context.error,
      context.autorizaImagen,
      context.nombreCompleto,
      context.dni,
      context.firmaDigital
    ]
  )

  return {
    formData,
    uiState,
    setAutorizaImagen: context.setAutorizaImagen,
    setNombreCompleto: context.setNombreCompleto,
    setDni: context.setDni,
    setFirmaDigital: context.setFirmaDigital,
    resetError: context.resetError,
    handleAccept: context.handleAccept,
    aceptado: context.aceptado,
    autorizaImagen: context.autorizaImagen,
    nombreCompleto: context.nombreCompleto,
    dni: context.dni,
    firmaDigital: context.firmaDigital,
    userId: context.userId,
    loading: context.loading,
    error: context.error
  }
}
