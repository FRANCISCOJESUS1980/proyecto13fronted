import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export const useNavigationChat = () => {
  const navigate = useNavigate()

  const goToDashboard = useCallback(() => {
    navigate('/dashboard')
  }, [navigate])

  return {
    navigate,
    goToDashboard
  }
}
