import { useChatContext } from '../context/ChatContext'
import { useCallback } from 'react'

export const useChatOptimized = () => {
  const context = useChatContext()

  const chatData = useCallback(
    () => ({
      messages: context.messages,
      message: context.message,
      editingMessageId: context.editingMessageId,
      editText: context.editText,
      messagesCount: context.messages.length
    }),
    [
      context.messages,
      context.message,
      context.editingMessageId,
      context.editText
    ]
  )

  const userData = useCallback(
    () => ({
      currentUserName: context.currentUserName,
      currentUserId: context.currentUserId,
      userRole: context.userRole,
      isAdmin: context.userRole === 'admin'
    }),
    [context.currentUserName, context.currentUserId, context.userRole]
  )

  const uiState = useCallback(
    () => ({
      isLoading: context.isLoading,
      animationComplete: context.animationComplete
    }),
    [context.isLoading, context.animationComplete]
  )

  return {
    chatData,
    userData,
    uiState,
    messagesEndRef: context.messagesEndRef,
    setMessage: context.setMessage,
    setEditingMessage: context.setEditingMessage,
    setEditText: context.setEditText,
    cancelEditing: context.cancelEditing,
    sendMessage: context.sendMessage,
    saveEdit: context.saveEdit,
    handleDeleteMessage: context.handleDeleteMessage,
    handleDeleteAllMessages: context.handleDeleteAllMessages,
    canModifyMessage: context.canModifyMessage,
    formatDate: context.formatDate,
    messages: context.messages,
    message: context.message,
    editingMessageId: context.editingMessageId,
    editText: context.editText,
    currentUserName: context.currentUserName,
    currentUserId: context.currentUserId,
    userRole: context.userRole,
    isLoading: context.isLoading,
    animationComplete: context.animationComplete
  }
}
