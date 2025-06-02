import { useCallback } from 'react'
import alertService from '../../../components/sweealert2/sweealert2'

export const useFormValidation = () => {
  const validateForm = useCallback((formData) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alertService.error(
        'Email no válido',
        'Por favor, introduce un email válido'
      )
      return false
    }

    if (formData.password.length < 1) {
      alertService.error(
        'Contraseña requerida',
        'Por favor, introduce tu contraseña'
      )
      return false
    }

    return true
  }, [])

  return { validateForm }
}
