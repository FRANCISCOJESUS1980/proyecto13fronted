import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useAuthGuard = (allowedRoles = []) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    if (!token || !allowedRoles.includes(role)) {
      console.error('Acceso denegado: no tienes permisos.')
      navigate('/')
      return
    }
  }, [navigate, allowedRoles])

  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('rol')?.toLowerCase().trim()
  }
}
