import { useState, useEffect } from 'react'
import Header from '../../../components/Header/Header'
import { obtenerTodosUsuarios } from '../../../services/api'
import './AdminUsuarios.css'

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const data = await obtenerTodosUsuarios(token)
        setUsuarios(data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsuarios()
  }, [])

  if (loading) return <p>Cargando usuarios...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className='admin-container'>
      <Header />
      <h1>Administración de Usuarios</h1>
      <div className='usuarios-grid'>
        {usuarios.map((usuario) => (
          <div key={usuario._id} className='usuario-card'>
            <img
              src={usuario.avatar || 'default-avatar.jpg'}
              alt={usuario.nombre}
              className='usuario-avatar'
            />
            <h3>{usuario.nombre}</h3>
            <p>
              <strong>Email:</strong> {usuario.email}
            </p>
            <p>
              <strong>Rol:</strong> {usuario.rol}
            </p>
            <p>
              <strong>Estado:</strong> {usuario.estado}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminUsuarios
