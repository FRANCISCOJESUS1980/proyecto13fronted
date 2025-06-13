import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [userRole, setUserRole] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token')
        const role = localStorage.getItem('rol')?.toLowerCase().trim()

        console.log('Token:', token ? 'Existe' : 'No existe')
        console.log('Rol:', role)

        if (
          !token ||
          !(role === 'administrador' || role === 'admin' || role === 'creador')
        ) {
          setIsAuthorized(false)
          setUserRole('')
        } else {
          setIsAuthorized(true)
          setUserRole(role)
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error)
        setIsAuthorized(false)
        setUserRole('')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return { userRole, isAuthorized, isLoading }
}
