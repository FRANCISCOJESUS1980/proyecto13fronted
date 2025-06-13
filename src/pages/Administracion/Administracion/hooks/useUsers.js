import { useState, useEffect, useCallback } from 'react'
import { obtenerTodosUsuarios } from '../../../../services/Api/index'

export const useUsers = (isAuthorized) => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUsers = useCallback(async () => {
    if (!isAuthorized) {
      setLoading(false)
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      const data = await obtenerTodosUsuarios(token)
      setUsers(data || [])
      setError(null)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      setError(error.message || 'Error en la conexión con el servidor.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }, [isAuthorized])

  useEffect(() => {
    if (isAuthorized === true) {
      fetchUsers()
    } else if (isAuthorized === false) {
      setLoading(false)
    }
  }, [isAuthorized, fetchUsers])

  return { users, error, loading, refreshUsers: fetchUsers }
}
