import React from 'react'

const AdminStats = React.memo(({ usersCount, error }) => {
  return (
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
            <p className='cf-admin-stats-value'>{usersCount}</p>
          </div>
        </div>
      )}
    </div>
  )
})

AdminStats.displayName = 'AdminStats'

export default AdminStats
