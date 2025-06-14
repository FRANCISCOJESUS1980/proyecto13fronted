import React from 'react'
import { UserCog, MessageSquare, CreditCard } from 'lucide-react'
import { useNavigationUsuarios } from '../hooks/useNavigationUsuarios'

const UsuarioCard = React.memo(({ usuario, index }) => {
  const { goToGestionarUsuario, goToMensajePrivado, goToGestionarBonos } =
    useNavigationUsuarios()

  const getRoleBadgeClass = React.useCallback((rol) => {
    const rolLower = rol?.toLowerCase() || ''
    if (rolLower.includes('admin') || rolLower.includes('administrador'))
      return 'cf-admin-usuarios-badge-admin'
    if (rolLower.includes('creador')) return 'cf-admin-usuarios-badge-creador'
    if (rolLower.includes('entrenador'))
      return 'cf-admin-usuarios-badge-entrenador'
    return 'cf-admin-usuarios-badge-usuario'
  }, [])

  const getStatusBadgeClass = React.useCallback((estado) => {
    const estadoLower = estado?.toLowerCase() || 'activo'
    if (estadoLower.includes('activo')) return 'cf-admin-usuarios-badge-activo'
    if (estadoLower.includes('inactivo'))
      return 'cf-admin-usuarios-badge-inactivo'
    if (estadoLower.includes('pendiente'))
      return 'cf-admin-usuarios-badge-pendiente'
    return 'cf-admin-usuarios-badge-default'
  }, [])

  const getAnimationDelay = React.useCallback((index) => {
    return `${index * 0.05}s`
  }, [])

  const handleGestionarUsuario = React.useCallback(() => {
    goToGestionarUsuario(usuario._id)
  }, [goToGestionarUsuario, usuario._id])

  const handleMensajePrivado = React.useCallback(() => {
    goToMensajePrivado(usuario._id)
  }, [goToMensajePrivado, usuario._id])

  const handleGestionarBonos = React.useCallback(() => {
    goToGestionarBonos(usuario._id)
  }, [goToGestionarBonos, usuario._id])

  return (
    <div
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
          <p className='cf-admin-usuarios-info-text'>{usuario.email}</p>
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
            <p className='cf-admin-usuarios-info-text'>{usuario.telefono}</p>
          </div>
        )}
      </div>

      <div className='cf-admin-usuarios-card-footer'>
        <button
          className='cf-admin-usuarios-btn cf-admin-usuarios-btn-gestionar'
          onClick={handleGestionarUsuario}
        >
          <UserCog size={16} />
          <span>Gestionar Clases</span>
        </button>
        <button
          className='cf-admin-usuarios-btn cf-admin-usuarios-btn-mensaje'
          onClick={handleMensajePrivado}
        >
          <MessageSquare size={16} />
          <span>Mensaje Privado</span>
        </button>
        <button
          className='cf-admin-usuarios-btn cf-admin-usuarios-btn-bonos'
          onClick={handleGestionarBonos}
        >
          <CreditCard size={16} />
          <span>Gestionar Bonos</span>
        </button>
      </div>
    </div>
  )
})

UsuarioCard.displayName = 'UsuarioCard'

export default UsuarioCard
