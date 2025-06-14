import React from 'react'
import { useDashboardOptimized } from '../hooks/useDashboardOptimized'

const DashboardHeader = React.memo(() => {
  const { userName, handleLogout } = useDashboardOptimized()

  return (
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
  )
})

DashboardHeader.displayName = 'DashboardHeader'

export default DashboardHeader
