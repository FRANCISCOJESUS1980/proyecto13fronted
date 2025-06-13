import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Administracion.css'
import Header from '../../../../components/Header/Header'
import Loading from '../../../../components/Loading/loading'
import AdminHeader from '../components/AdminHeader'
import AdminSections from '../components/AdminSections'
import AdminStats from '../components/AdminStats'
import { AdminProvider } from '../context/AdminContext'
import { obtenerTodosUsuarios } from '../../../../services/Api/index'

const Administracion = () => {
  const navigate = useNavigate()
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState(null)
  const [userRole, setUserRole] = useState('')
  const [loading, setLoading] = useState(true)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('rol')?.toLowerCase().trim()

    console.log('Verificando autenticación:', { token: !!token, role })

    if (
      !token ||
      !(role === 'administrador' || role === 'admin' || role === 'creador')
    ) {
      console.error('Acceso denegado: no tienes permisos.')
      navigate('/')
      return
    }

    setUserRole(role)

    const fetchUsuarios = async () => {
      try {
        setLoading(true)
        const data = await obtenerTodosUsuarios(token)
        setUsuarios(data || [])
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        setError(error.message || 'Error en la conexión con el servidor.')
        setUsuarios([])
      } finally {
        setLoading(false)
        setTimeout(() => setFadeIn(true), 100)
      }
    }

    fetchUsuarios()
  }, [navigate])

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO PANEL DE ADMINISTRACIÓN...'
        onComplete={() => setLoading(false)}
      />
    )
  }

  return (
    <AdminProvider>
      <div className={`cf-admin-container ${fadeIn ? 'cf-admin-fade-in' : ''}`}>
        <Header />
        <div className='cf-admin-content'>
          <AdminHeader userRole={userRole} />
          <AdminSections />
          <AdminStats usersCount={usuarios.length} error={error} />
        </div>
      </div>
    </AdminProvider>
  )
}

export default Administracion
