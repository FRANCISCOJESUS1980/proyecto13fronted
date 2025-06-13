import { useMensajeMasivoContext } from '../context/MensajeMasivoContext'
import { useCallback } from 'react'

export const useMensajeMasivoOptimized = () => {
  const context = useMensajeMasivoContext()

  const formData = useCallback(
    () => ({
      mensaje: context.mensaje,
      asunto: context.asunto,
      enviarEmail: context.enviarEmail
    }),
    [context.mensaje, context.asunto, context.enviarEmail]
  )

  const uiState = useCallback(
    () => ({
      enviando: context.enviando,
      error: context.error,
      animationComplete: context.animationComplete
    }),
    [context.enviando, context.error, context.animationComplete]
  )

  const derivedState = useCallback(
    () => ({
      hasUnsavedChanges: context.hasUnsavedChanges,
      isFormValid: context.isFormValid
    }),
    [context.hasUnsavedChanges, context.isFormValid]
  )

  return {
    formData,
    uiState,
    derivedState,
    setMensaje: context.setMensaje,
    setAsunto: context.setAsunto,
    setEnviarEmail: context.setEnviarEmail,
    setAnimationComplete: context.setAnimationComplete,
    resetForm: context.resetForm,
    enviarMensaje: context.enviarMensaje,
    mensaje: context.mensaje,
    asunto: context.asunto,
    enviarEmail: context.enviarEmail,
    enviando: context.enviando,
    error: context.error,
    animationComplete: context.animationComplete,
    hasUnsavedChanges: context.hasUnsavedChanges,
    isFormValid: context.isFormValid
  }
}
