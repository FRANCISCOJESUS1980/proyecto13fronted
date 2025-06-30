import { User } from 'lucide-react'
import { DEFAULT_AVATAR } from '../constants/adminUsuarioClases'

const UserHeader = ({ userInfo, clasesInscritasTotal }) => {
  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = DEFAULT_AVATAR
  }

  return (
    <div className='cf-user-header'>
      <div className='cf-user-avatar-container'>
        {userInfo?.avatar ? (
          <img
            src={userInfo.avatar || DEFAULT_AVATAR}
            alt={userInfo.nombre}
            className='cf-user-avatar'
            onError={handleImageError}
          />
        ) : (
          <div className='cf-user-avatar-placeholder'>
            <User size={24} />
          </div>
        )}
      </div>

      <div className='cf-user-details'>
        <h1 className='cf-user-title'>
          Gestionar clases de {userInfo?.nombre}
        </h1>

        <div className='cf-user-stats'>
          <span className='cf-user-stat'>
            <span className='cf-user-stat-value'>{clasesInscritasTotal}</span>
            <span className='cf-user-stat-label'>clases inscritas</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default UserHeader
