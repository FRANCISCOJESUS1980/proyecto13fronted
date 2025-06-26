import React from 'react'
import BonoInfo from '../../../../Administracion/AdminGestionBonos/BonoInfo/BonoInfo'
import { useDashboardOptimized } from '../hooks/useDashboardOptimized'

const BonoSection = React.memo(() => {
  const { userId, showBonoSection } = useDashboardOptimized()

  if (!showBonoSection) {
    return null
  }

  return (
    <div className='cf-dash-bono-section'>
      <h2 className='cf-dash-section-title'>Tu Bono y Sesiones</h2>
      <div className='cf-dash-bono-container'>
        <BonoInfo userId={userId} />
      </div>
    </div>
  )
})

BonoSection.displayName = 'BonoSection'

export default BonoSection
