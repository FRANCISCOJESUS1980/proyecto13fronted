import { useCallback } from 'react'
import alertService from '../../../../components/sweealert2/sweealert2'

export const useFormValidation = () => {
  const validateForm = useCallback((formData) => {
    if (formData.password.length < 6) {
      alertService.error(
        'Contraseña débil',
        'La contraseña debe tener al menos 6 caracteres'
      )
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alertService.error(
        'Email no válido',
        'Por favor, introduce un email válido'
      )
      return false
    }

    if (formData.nombre.trim().length < 3) {
      alertService.error(
        'Nombre demasiado corto',
        'El nombre debe tener al menos 3 caracteres'
      )
      return false
    }

    return true
  }, [])

  return { validateForm }
}
