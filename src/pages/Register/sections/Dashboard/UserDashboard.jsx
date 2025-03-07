import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Dashboard.css'
import Header from '../../../../components/Header/Header'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Usuario')
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)

        const token = localStorage.getItem('token')
        const storedUserId = localStorage.getItem('userId')

        if (!token) {
          navigate('/')
          return
        }

        if (storedUserId) {
          setUserId(storedUserId)
        }

        const storedName = localStorage.getItem('nombre')
        if (storedName) {
          setUserName(storedName)
        }

        const response = await axios.get(
          'http://localhost:5000/api/users/profile',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        if (response.data.success && response.data.data) {
          const userData = response.data.data

          setUserName(userData.nombre || 'Usuario')

          localStorage.setItem('nombre', userData.nombre)

          if (userData._id) {
            setUserId(userData._id)
            localStorage.setItem('userId', userData._id)
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error)

        const nombre = localStorage.getItem('nombre')
        if (nombre) {
          setUserName(nombre)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('userId')
    localStorage.removeItem('rol')
    navigate('/')
  }

  const sectionData = [
    {
      icon: '🏥',
      title: 'Información Médica',
      description: 'Gestiona tu información médica y de salud',
      path: '/dashboard/medico'
    },
    {
      icon: '📏',
      title: 'Aspecto Físico',
      description: 'Registra tus medidas y progreso físico',
      path: '/dashboard/aspecto'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      description: 'Conversa con otros miembros del box',
      path: '/dashboard/chat'
    },
    {
      icon: '🏋️‍♂️',
      title: 'Marcas Personales',
      description: 'Registra tus récords y logros',
      path: '/dashboard/marcas'
    },
    {
      icon: '⚙️',
      title: 'Editar Perfil',
      description: 'Modifica tu información personal',
      path: `/dashboard/editar-perfil/${userId}`
    }
  ]

  return (
    <div className='dashboard-container'>
      <Header />
      <div className='dashboard-header'>
        <h1>Bienvenido a AderCrossFit, {userName}</h1>
        <button className='logout-btn' onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {loading ? (
        <div className='loading-indicator'>Cargando tu información</div>
      ) : (
        <div className='dashboard-sections'>
          {sectionData.map((section, index) => (
            <div
              key={index}
              className='section-card'
              onClick={() => navigate(section.path)}
            >
              <span className='section-icon'>{section.icon}</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDashboard
