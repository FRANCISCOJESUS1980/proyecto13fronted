import React from 'react'
import DashboardHeader from './DashboardHeader'
import BonoSection from './BonoSection'
import DashboardSections from './DashboardSections'

const DashboardContent = React.memo(() => {
  return (
    <div className='cf-dash-content'>
      <DashboardHeader />
      <BonoSection />
      <DashboardSections />
    </div>
  )
})

DashboardContent.displayName = 'DashboardContent'

export default DashboardContent
