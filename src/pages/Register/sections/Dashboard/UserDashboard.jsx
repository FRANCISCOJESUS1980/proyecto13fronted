import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './UserDashboard.css'
import Header from '../../../../components/Header/Header'
import { obtenerPerfilUsuario } from '../../../../services/Api/index'
import { obtenerMensajesNoLeidos } from '../../../../services/Api/mensajesPrivados'

const UserDashboard = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Usuario')
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

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

        const response = await obtenerPerfilUsuario(token)

        if (response.success && response.data) {
          const userData = response.data

          setUserName(userData.nombre || 'Usuario')

          localStorage.setItem('nombre', userData.nombre)

          if (userData._id) {
            setUserId(userData._id)
            localStorage.setItem('userId', userData._id)
          }
        }

        await checkUnreadMessages()
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

    const intervalId = setInterval(checkUnreadMessages, 60000)

    return () => clearInterval(intervalId)
  }, [navigate])

  const checkUnreadMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await obtenerMensajesNoLeidos(token)

      if (response.success) {
        setUnreadMessages(response.cantidad)
      } else {
        console.error('Error al obtener mensajes no leídos:', response.message)
        setUnreadMessages(0)
      }
    } catch (error) {
      console.error('Error al verificar mensajes no leídos:', error)
      setUnreadMessages(0)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('nombre')
    localStorage.removeItem('userId')
    localStorage.removeItem('rol')
    navigate('/')
  }

  const sectionData = [
    {
      icon: 'medical',
      title: 'Información Médica',
      description: 'Gestiona tu información médica y de salud',
      path: '/dashboard/medico',
      color: 'blue'
    },
    {
      icon: 'physical',
      title: 'Aspecto Físico',
      description: 'Registra tus medidas y progreso físico',
      path: '/dashboard/aspecto',
      color: 'green'
    },
    {
      icon: 'chat',
      title: 'Chat en Vivo',
      description: 'Conversa con otros miembros del box',
      path: '/dashboard/chat',
      color: 'purple'
    },
    {
      icon: 'message',
      title: 'Mensajes Privados',
      description: 'Comunicación directa con administración',
      path: '/dashboard/mensajes',
      badge: unreadMessages > 0 ? unreadMessages : null,
      color: 'pink'
    },
    {
      icon: 'record',
      title: 'Marcas Personales',
      description: 'Registra tus récords y logros',
      path: '/dashboard/marcas',
      color: 'amber'
    },
    {
      icon: 'profile',
      title: 'Editar Perfil',
      description: 'Modifica tu información personal',
      path: `/dashboard/editar-perfil/${userId}`,
      color: 'orange'
    },
    // Nuevas tarjetas añadidas
    {
      icon: 'video',
      title: 'Videos',
      description: 'Accede a videos de entrenamiento y tutoriales',
      path: '/videos',
      color: 'red'
    },
    {
      icon: 'class',
      title: 'Clases',
      description: 'Consulta horarios y reserva tus clases',
      path: '/clases',
      color: 'teal'
    },
    {
      icon: 'product',
      title: 'Productos',
      description: 'Explora nuestra tienda de productos',
      path: '/productos',
      color: 'indigo'
    }
  ]

  const renderSectionIcon = (iconType) => {
    switch (iconType) {
      case 'medical':
        return (
          <span className='cf-dash-section-icon cf-dash-medical-icon'></span>
        )
      case 'physical':
        return (
          <span className='cf-dash-section-icon cf-dash-physical-icon'></span>
        )
      case 'chat':
        return <span className='cf-dash-section-icon cf-dash-chat-icon'></span>
      case 'message':
        return (
          <span className='cf-dash-section-icon cf-dash-message-icon'></span>
        )
      case 'record':
        return (
          <span className='cf-dash-section-icon cf-dash-record-icon'></span>
        )
      case 'profile':
        return (
          <span className='cf-dash-section-icon cf-dash-profile-icon'></span>
        )
      // Nuevos iconos añadidos
      case 'video':
        return <span className='cf-dash-section-icon cf-dash-video-icon'></span>
      case 'class':
        return <span className='cf-dash-section-icon cf-dash-class-icon'></span>
      case 'product':
        return (
          <span className='cf-dash-section-icon cf-dash-product-icon'></span>
        )
      default:
        return (
          <span className='cf-dash-section-icon cf-dash-default-icon'></span>
        )
    }
  }

  return (
    <div
      className={`cf-dash-container ${
        animationComplete ? 'cf-dash-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-dash-content'>
        <div className='cf-dash-header'>
          <div className='cf-dash-welcome'>
            <div className='cf-dash-welcome-icon'></div>
            <h1 className='cf-dash-title'>
              Bienvenido a AderCrossFit,{' '}
              <span className='cf-dash-username'>{userName}</span>
            </h1>
          </div>
          <button className='cf-dash-logout-btn' onClick={handleLogout}>
            <span className='cf-dash-logout-icon'></span>
            <span className='cf-dash-logout-text'>Cerrar Sesión</span>
          </button>
        </div>

        {loading ? (
          <div className='cf-dash-loading'>
            <div className='cf-dash-spinner'></div>
            <p className='cf-dash-loading-text'>Cargando tu información...</p>
          </div>
        ) : (
          <div className='cf-dash-sections'>
            {sectionData.map((section, index) => (
              <div
                key={index}
                className={`cf-dash-card cf-dash-card-${section.color}`}
                onClick={() => navigate(section.path)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='cf-dash-card-content'>
                  <div
                    className={`cf-dash-card-icon-container cf-dash-icon-${section.color}`}
                  >
                    {renderSectionIcon(section.icon)}
                  </div>
                  <div className='cf-dash-card-info'>
                    <h2 className='cf-dash-card-title'>{section.title}</h2>
                    <p className='cf-dash-card-description'>
                      {section.description}
                    </p>
                  </div>
                  {section.badge && (
                    <div className='cf-dash-notification-badge'>
                      <span>{section.badge}</span>
                    </div>
                  )}
                  <div
                    className={`cf-dash-card-arrow cf-dash-arrow-${section.color}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserDashboard
