import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import alertService from '../../../../components/sweealert2/sweealert2'

export const useNavigationOptimized = () => {
  const navigate = useNavigate()

  const navigateWithConfirmation = useCallback(
    (path, hasUnsavedChanges, confirmOptions = {}) => {
      if (hasUnsavedChanges) {
        const defaultOptions = {
          title: '¿Abandonar mensaje?',
          text: 'Perderás los datos que has introducido. ¿Quieres continuar?',
          confirmButtonText: 'Sí, continuar',
          cancelButtonText: 'No, seguir editando'
        }

        const options = { ...defaultOptions, ...confirmOptions }

        alertService
          .confirm(options.title, options.text, {
            confirmButtonText: options.confirmButtonText,
            cancelButtonText: options.cancelButtonText
          })
          .then((result) => {
            if (result.isConfirmed) {
              navigate(path)
            }
          })
      } else {
        navigate(path)
      }
    },
    [navigate]
  )

  const handleAuthError = useCallback(() => {
    navigate('/iniciar-sesion')
  }, [navigate])

  return {
    navigate,
    navigateWithConfirmation,
    handleAuthError
  }
}
