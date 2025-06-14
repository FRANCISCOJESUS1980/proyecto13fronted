import { useDashboardContext } from '../context/DashboardContext'
import { useCallback } from 'react'

export const useDashboardOptimized = () => {
  const context = useDashboardContext()

  const userData = useCallback(
    () => ({
      userName: context.userName,
      userId: context.userId,
      userRole: context.userRole,
      isAdmin: context.isAdmin
    }),
    [context.userName, context.userId, context.userRole, context.isAdmin]
  )

  const uiState = useCallback(
    () => ({
      loading: context.loading,
      animationComplete: context.animationComplete,
      unreadMessages: context.unreadMessages,
      showBonoSection: context.showBonoSection
    }),
    [
      context.loading,
      context.animationComplete,
      context.unreadMessages,
      context.showBonoSection
    ]
  )

  return {
    userData,
    uiState,
    handleLogout: context.handleLogout,
    userName: context.userName,
    userId: context.userId,
    userRole: context.userRole,
    loading: context.loading,
    animationComplete: context.animationComplete,
    unreadMessages: context.unreadMessages,
    isAdmin: context.isAdmin,
    showBonoSection: context.showBonoSection
  }
}
