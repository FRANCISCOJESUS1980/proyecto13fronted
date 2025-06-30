import { useState, useEffect } from 'react'
import { obtenerUsuarioPorId } from '../../../../../services/Api/index'
import { ERROR_MESSAGES } from '../constants/adminUsuarioClases'

export const useUserInfo = (userId) => {
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId) return

      try {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('token')
        if (!token) throw new Error(ERROR_MESSAGES.NO_TOKEN)

        const userData = await obtenerUsuarioPorId(userId, token)
        setUserInfo(userData.data)
      } catch (error) {
        console.error('Error al obtener información del usuario:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [userId])

  return { userInfo, loading, error }
}
