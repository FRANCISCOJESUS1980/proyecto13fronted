import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export const useNavigationDashboard = () => {
  const navigate = useNavigate()

  const navigateToSection = useCallback(
    (path) => {
      navigate(path)
    },
    [navigate]
  )

  return {
    navigate,
    navigateToSection
  }
}
