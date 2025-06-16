import { useMensajesPrivadosContext } from '../context/MensajesPrivadosContext'
import { useCallback } from 'react'

export const useMensajesPrivadosOptimized = () => {
  const context = useMensajesPrivadosContext()

  const conversacionData = useCallback(
    () => ({
      adminInfo: context.adminInfo,
      conversacionId: context.conversacionId,
      mensajes: context.mensajes,
      mensajesCount: context.mensajes.length
    }),
    [context.adminInfo, context.conversacionId, context.mensajes]
  )

  const formData = useCallback(
    () => ({
      nuevoMensaje: context.nuevoMensaje,
      enviando: context.enviando,
      canSend:
        context.nuevoMensaje.trim() && context.adminInfo && !context.enviando
    }),
    [context.nuevoMensaje, context.enviando, context.adminInfo]
  )

  const editingData = useCallback(
    () => ({
      editingMessageId: context.editingMessageId,
      editText: context.editText,
      isEditing: context.editingMessageId !== null
    }),
    [context.editingMessageId, context.editText]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      error: context.error,
      animationComplete: context.animationComplete,
      userId: context.userId
    }),
    [context.loading, context.error, context.animationComplete, context.userId]
  )

  return {
    conversacionData,
    formData,
    editingData,
    uiState,
    mensajesRef: context.mensajesRef,
    setNuevoMensaje: context.setNuevoMensaje,
    setEditingMessage: context.setEditingMessage,
    setEditText: context.setEditText,
    cancelEditing: context.cancelEditing,
    handleEnviarMensaje: context.handleEnviarMensaje,
    saveEdit: context.saveEdit,
    handleDeleteMessage: context.handleDeleteMessage,
    handleVolver: context.handleVolver,
    adminInfo: context.adminInfo,
    mensajes: context.mensajes,
    nuevoMensaje: context.nuevoMensaje,
    enviando: context.enviando,
    editingMessageId: context.editingMessageId,
    editText: context.editText,
    loading: context.loading,
    error: context.error,
    animationComplete: context.animationComplete,
    userId: context.userId
  }
}
