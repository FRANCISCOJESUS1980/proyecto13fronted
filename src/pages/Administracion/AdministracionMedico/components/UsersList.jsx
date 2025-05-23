import { User } from 'lucide-react'
import { memo } from 'react'

const UsersList = memo(({ filteredUsers, selectedUser, onUserSelect }) => {
  return (
    <div className='cf-medical-info-users-list'>
      <h2 className='cf-medical-info-section-title'>Usuarios</h2>
      {filteredUsers.length === 0 ? (
        <div className='cf-medical-info-no-results'>
          <div className='cf-medical-info-no-results-icon'></div>
          <p className='cf-medical-info-no-results-text'>
            No se encontraron usuarios con esos criterios
          </p>
        </div>
      ) : (
        <ul className='cf-medical-info-users-ul'>
          {filteredUsers.map((info) => (
            <li
              key={info._id}
              className={`cf-medical-info-user-item ${
                selectedUser && selectedUser._id === info._id
                  ? 'cf-medical-info-selected'
                  : ''
              }`}
              onClick={() =>
                info.user && info.user._id ? onUserSelect(info.user._id) : null
              }
            >
              <div className='cf-medical-info-user-list-item'>
                <div className='cf-medical-info-user-avatar-container'>
                  {info.user.avatar ? (
                    <img
                      src={info.user.avatar || '/placeholder.svg'}
                      alt={info.user.nombre || 'Usuario'}
                      className='cf-medical-info-user-avatar'
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = '/default-avatar.png'
                      }}
                    />
                  ) : (
                    <div className='cf-medical-info-user-avatar-placeholder'>
                      <User size={20} />
                    </div>
                  )}
                </div>
                <div className='cf-medical-info-user-info'>
                  <span className='cf-medical-info-user-name'>
                    {info.user.nombre || 'Sin nombre'}
                  </span>
                  <span className='cf-medical-info-user-email'>
                    {info.user.email}
                  </span>
                </div>
                {info.bloodType && (
                  <span className='cf-medical-info-blood-type-badge'>
                    {info.bloodType}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
})

UsersList.displayName = 'UsersList'

export default UsersList
