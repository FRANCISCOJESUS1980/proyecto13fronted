import { useVideosContext } from '../context/VideosContext'
import { useCallback } from 'react'

export const useVideosOptimized = () => {
  const context = useVideosContext()

  const uiState = useCallback(
    () => ({
      isLoading: context.isLoading,
      videosReady: context.videosReady
    }),
    [context.isLoading, context.videosReady]
  )

  return {
    uiState,
    handleBackNavigation: context.handleBackNavigation,
    isLoading: context.isLoading,
    videosReady: context.videosReady
  }
}
