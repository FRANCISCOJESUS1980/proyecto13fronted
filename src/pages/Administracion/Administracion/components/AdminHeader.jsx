import React from 'react'

const AdminHeader = React.memo(({ userRole }) => {
  return (
    <div className='cf-admin-header'>
      <div className='cf-admin-welcome'>
        <div className='cf-admin-welcome-icon'></div>
        <h1 className='cf-admin-title'>
          Panel de <span className='cf-admin-highlight'>Administración</span>
        </h1>
      </div>
      <div className='cf-admin-role-badge'>
        {userRole === 'creador' ? 'Creador' : 'Administrador'}
      </div>
    </div>
  )
})

AdminHeader.displayName = 'AdminHeader'

export default AdminHeader
