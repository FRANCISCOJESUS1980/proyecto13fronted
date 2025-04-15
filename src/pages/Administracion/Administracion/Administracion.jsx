import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Administracion.css'
import Header from '../../../components/Header/Header'
import { obtenerTodosUsuarios } from '../../../services/Api/index'

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

  const sectionData = [
    {
      title: 'Crear Clases',
      description: 'Agrega nuevas clases para los usuarios.',
      path: '/administracion/clases',
      icon: 'calendar',
      color: 'blue'
    },
    {
      title: 'Crear Productos',
      description: 'Agrega nuevos productos a la tienda.',
      path: '/administracion/productos',
      icon: 'shopping',
      color: 'green'
    },
    {
      title: 'Ver Usuarios',
      description: 'Lista de todos los usuarios registrados.',
      path: '/administracion/usuarios',
      icon: 'users',
      color: 'purple'
    },
    {
      title: 'Información Médica',
      description: 'Revisa y gestiona los datos médicos de todos los usuarios.',
      path: '/admin/medical-info',
      icon: 'heart',
      color: 'pink'
    },
    {
      title: 'Consentimientos',
      description:
        'Revisa los consentimientos y autorizaciones de imagen de los usuarios.',
      path: '/administracion/consentimientos',
      icon: 'document',
      color: 'amber'
    }
  ]

  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`
  }

  return (
    <div className={`cf-admin-container ${fadeIn ? 'cf-admin-fade-in' : ''}`}>
      <Header />
      <div className='cf-admin-content'>
        <div className='cf-admin-header'>
          <div className='cf-admin-welcome'>
            <div className='cf-admin-welcome-icon'></div>
            <h1 className='cf-admin-title'>
              Panel de{' '}
              <span className='cf-admin-highlight'>Administración</span>
            </h1>
          </div>
          <div className='cf-admin-role-badge'>
            {userRole === 'creador' ? 'Creador' : 'Administrador'}
          </div>
        </div>

        {loading ? (
          <div className='cf-admin-loading'>
            <div className='cf-admin-spinner'></div>
            <p className='cf-admin-loading-text'>Cargando información...</p>
          </div>
        ) : (
          <>
            <div className='cf-admin-sections'>
              {sectionData.map((section, index) => (
                <div
                  key={index}
                  className={`cf-admin-card cf-admin-card-${section.color}`}
                  onClick={() => navigate(section.path)}
                  style={{ animationDelay: getAnimationDelay(index) }}
                >
                  <div className='cf-admin-card-content'>
                    <div
                      className={`cf-admin-card-icon-container cf-admin-icon-${section.color}`}
                    >
                      <div
                        className={`cf-admin-section-icon cf-admin-${section.icon}-icon`}
                      ></div>
                    </div>
                    <div className='cf-admin-card-info'>
                      <h2 className='cf-admin-card-title'>{section.title}</h2>
                      <p className='cf-admin-card-description'>
                        {section.description}
                      </p>
                    </div>
                    <div className='cf-admin-card-arrow'></div>
                  </div>
                </div>
              ))}
            </div>

            <div className='cf-admin-stats-container'>
              <h2 className='cf-admin-section-title'>Usuarios Registrados</h2>
              {error ? (
                <div className='cf-admin-error-message'>
                  <div className='cf-admin-error-icon'></div>
                  <p>{error}</p>
                </div>
              ) : (
                <div className='cf-admin-stats-card'>
                  <div className='cf-admin-stats-icon'></div>
                  <div className='cf-admin-stats-content'>
                    <p className='cf-admin-stats-label'>Total de usuarios</p>
                    <p className='cf-admin-stats-value'>{usuarios.length}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Administracion
