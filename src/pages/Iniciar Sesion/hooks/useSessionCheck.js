import { useEffect } from 'react'
import alertService from '../../../components/sweealert2/sweealert2'

export const useSessionCheck = (navigate) => {
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      alertService
        .confirm(
          'Sesión activa',
          'Ya tienes una sesión iniciada. ¿Quieres ir al dashboard?',
          {
            confirmButtonText: 'Ir al dashboard',
            cancelButtonText: 'Cerrar sesión actual'
          }
        )
        .then((result) => {
          if (result.isConfirmed) {
            navigate('/dashboard')
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('nombre')
            localStorage.removeItem('rol')

            alertService.success(
              'Sesión cerrada',
              'La sesión anterior ha sido cerrada correctamente.'
            )
          }
        })
    }
  }, [navigate])
}
