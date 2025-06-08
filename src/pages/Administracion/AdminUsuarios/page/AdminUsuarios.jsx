import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Search,
  UserCog,
  MessageSquare,
  Users,
  CreditCard
} from 'lucide-react'
import Header from '../../../../components/Header/Header'
import Loading from '../../../../components/Loading/loading'
import { obtenerTodosUsuarios } from '../../../../services/Api/index'
import Button from '../../../../components/Button/Button'
import './AdminUsuarios.css'

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([])
  const [filteredUsuarios, setFilteredUsuarios] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [fadeIn, setFadeIn] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No hay token de autenticación')

        const data = await obtenerTodosUsuarios(token)
        setUsuarios(data)
        setFilteredUsuarios(data)
      } catch (error) {
        console.error('Error al obtener usuarios:', error)
        setError(error.message)
      } finally {
        setLoading(false)
        setTimeout(() => setFadeIn(true), 100)
      }
    }

    fetchUsuarios()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsuarios(usuarios)
    } else {
      const filtered = usuarios.filter(
        (usuario) =>
          usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredUsuarios(filtered)
    }
  }, [searchTerm, usuarios])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleGestionarUsuario = (userId) => {
    navigate(`/admin/usuario/${userId}/clases`)
  }

  const handleMensajePrivado = (userId) => {
    navigate(`/admin/usuario/${userId}/mensajes`)
  }

  const handleGestionarBonos = (userId) => {
    navigate(`/admin/usuario/${userId}/bonos`)
  }

  const handleMensajeMasivo = () => {
    navigate('/administracion/mensaje-masivo')
  }

  const getRoleBadgeClass = (rol) => {
    const rolLower = rol?.toLowerCase() || ''
    if (rolLower.includes('admin') || rolLower.includes('administrador'))
      return 'cf-admin-usuarios-badge-admin'
    if (rolLower.includes('creador')) return 'cf-admin-usuarios-badge-creador'
    if (rolLower.includes('entrenador'))
      return 'cf-admin-usuarios-badge-entrenador'
    return 'cf-admin-usuarios-badge-usuario'
  }

  const getStatusBadgeClass = (estado) => {
    const estadoLower = estado?.toLowerCase() || 'activo'
    if (estadoLower.includes('activo')) return 'cf-admin-usuarios-badge-activo'
    if (estadoLower.includes('inactivo'))
      return 'cf-admin-usuarios-badge-inactivo'
    if (estadoLower.includes('pendiente'))
      return 'cf-admin-usuarios-badge-pendiente'
    return 'cf-admin-usuarios-badge-default'
  }

  const getAnimationDelay = (index) => {
    return `${index * 0.05}s`
  }

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO ADMINISTRACIÓN DE USUARIOS...'
        onComplete={() => setLoading(false)}
      />
    )
  }

  if (error)
    return (
      <div className='cf-admin-usuarios-container'>
        <Header />
        <div className='cf-admin-usuarios-content'>
          <div className='cf-admin-usuarios-error'>
            <div className='cf-admin-usuarios-error-icon'></div>
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    )

  return (
    <div
      className={`cf-admin-usuarios-container ${
        fadeIn ? 'cf-admin-usuarios-fade-in' : ''
      }`}
    >
      <Header />
      <div className='cf-admin-usuarios-content'>
        <div className='cf-admin-usuarios-header'>
          <Button
            variant='secondary'
            onClick={() => navigate('/administracion')}
            leftIcon={<ArrowLeft size={18} />}
            className='cf-admin-usuarios-back-btn'
          >
            Volver a Administración
          </Button>
          <h1 className='cf-admin-usuarios-title'>
            Administración de Usuarios
          </h1>
          <Button
            variant='secondary'
            onClick={handleMensajeMasivo}
            leftIcon={<Users size={18} />}
            className='cf-admin-usuarios-mensaje-masivo-btn'
          >
            Mensaje Masivo
          </Button>
        </div>

        <div className='cf-admin-usuarios-search-container'>
          <div className='cf-admin-usuarios-search'>
            <input
              type='text'
              placeholder='Buscar por nombre o email...'
              value={searchTerm}
              onChange={handleSearchChange}
              className='cf-admin-usuarios-search-input'
            />
            <div className='cf-admin-usuarios-search-icon'>
              <Search size={18} />
            </div>
          </div>
          <div className='cf-admin-usuarios-search-stats'>
            Mostrando {filteredUsuarios.length} de {usuarios.length} usuarios
          </div>
        </div>

        <div className='cf-admin-usuarios-grid'>
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((usuario, index) => (
              <div
                key={usuario._id}
                className='cf-admin-usuarios-card'
                style={{ animationDelay: getAnimationDelay(index) }}
              >
                <div className='cf-admin-usuarios-card-header'>
                  <div className='cf-admin-usuarios-avatar-container'>
                    {usuario.avatar ? (
                      <img
                        src={usuario.avatar || '/imagenes/default-avatar.png'}
                        alt={usuario.nombre}
                        className='cf-admin-usuarios-avatar'
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = '/imagenes/default-avatar.png'
                        }}
                      />
                    ) : (
                      <div className='cf-admin-usuarios-avatar-placeholder'>
                        {usuario.nombre
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .substring(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className='cf-admin-usuarios-card-title'>
                    <h3 className='cf-admin-usuarios-name'>{usuario.nombre}</h3>
                    <span
                      className={`cf-admin-usuarios-badge ${getRoleBadgeClass(
                        usuario.rol
                      )}`}
                    >
                      {usuario.rol}
                    </span>
                  </div>
                </div>

                <div className='cf-admin-usuarios-card-content'>
                  <div className='cf-admin-usuarios-info-item'>
                    <div className='cf-admin-usuarios-info-icon cf-admin-usuarios-email-icon'></div>
                    <p className='cf-admin-usuarios-info-text'>
                      {usuario.email}
                    </p>
                  </div>

                  <div className='cf-admin-usuarios-info-item'>
                    <div className='cf-admin-usuarios-info-icon cf-admin-usuarios-status-icon'></div>
                    <p className='cf-admin-usuarios-info-text'>
                      Estado:{' '}
                      <span
                        className={`cf-admin-usuarios-status-badge ${getStatusBadgeClass(
                          usuario.estado
                        )}`}
                      >
                        {usuario.estado || 'Activo'}
                      </span>
                    </p>
                  </div>

                  {usuario.telefono && (
                    <div className='cf-admin-usuarios-info-item'>
                      <div className='cf-admin-usuarios-info-icon cf-admin-usuarios-phone-icon'></div>
                      <p className='cf-admin-usuarios-info-text'>
                        {usuario.telefono}
                      </p>
                    </div>
                  )}
                </div>

                <div className='cf-admin-usuarios-card-footer'>
                  <button
                    className='cf-admin-usuarios-btn cf-admin-usuarios-btn-gestionar'
                    onClick={() => handleGestionarUsuario(usuario._id)}
                  >
                    <UserCog size={16} />
                    <span>Gestionar Clases</span>
                  </button>
                  <button
                    className='cf-admin-usuarios-btn cf-admin-usuarios-btn-mensaje'
                    onClick={() => handleMensajePrivado(usuario._id)}
                  >
                    <MessageSquare size={16} />
                    <span>Mensaje Privado</span>
                  </button>
                  <button
                    className='cf-admin-usuarios-btn cf-admin-usuarios-btn-bonos'
                    onClick={() => handleGestionarBonos(usuario._id)}
                  >
                    <CreditCard size={16} />
                    <span>Gestionar Bonos</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='cf-admin-usuarios-empty'>
              <div className='cf-admin-usuarios-empty-icon'></div>
              <h3 className='cf-admin-usuarios-empty-title'>
                No se encontraron usuarios
              </h3>
              <p className='cf-admin-usuarios-empty-text'>
                No hay usuarios que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminUsuarios
