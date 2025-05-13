import { useState, useEffect } from 'react'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('rol')?.toLowerCase().trim()

      setIsAuthenticated(!!token)
      setUserRole(role || '')
    }

    checkAuth()

    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const isAdmin =
    userRole === 'administrador' ||
    userRole === 'admin' ||
    userRole === 'creador'

  return { isAuthenticated, userRole, isAdmin }
}
