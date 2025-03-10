/*import { useState, useEffect } from 'react'
import axios from 'axios'

export const useUsuario = () => {
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn('No hay token en localStorage')
          setLoading(false)
          return
        }

        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        })

        setUserId(response.data.userId)
        setUserInfo(response.data)
      } catch (err) {
        console.error(
          'Error al obtener usuario:',
          err.response?.data || err.message
        )
        setError('Error al obtener información del usuario')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return {
    userId,
    userInfo,
    loading,
    error
  }
}*/

import { useState, useEffect } from 'react'
import { obtenerUsuarioActualConInfo } from '../../../services/api'

export const useUsuario = () => {
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn('No hay token en localStorage')
          setLoading(false)
          return
        }

        const userData = await obtenerUsuarioActualConInfo(token)

        setUserId(userData.userId)
        setUserInfo(userData)
      } catch (err) {
        console.error(
          'Error al obtener usuario:',
          err.response?.data || err.message
        )
        setError('Error al obtener información del usuario')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return {
    userId,
    userInfo,
    loading,
    error
  }
}
