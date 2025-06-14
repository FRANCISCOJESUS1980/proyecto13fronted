import React from 'react'
import './UserDashboard.css'
import Header from '../../../../../components/Header/page/Header'
import Loading from '../../../../../components/Loading/loading'
import DashboardContent from '../components/DashboardContent'
import { DashboardProvider } from '../context/DashboardContext'
import { useDashboardOptimized } from '../hooks/useDashboardOptimized'

const UserDashboardInner = React.memo(() => {
  const { loading, animationComplete } = useDashboardOptimized()

  if (loading) {
    return (
      <Loading
        isVisible={loading}
        loadingText='CARGANDO DASHBOARD...'
        onComplete={() => {}}
      />
    )
  }

  return (
    <div
      className={`cf-dash-container ${
        animationComplete ? 'cf-dash-fade-in' : ''
      }`}
    >
      <Header />
      <DashboardContent />
    </div>
  )
})

UserDashboardInner.displayName = 'UserDashboardInner'

const UserDashboard = () => {
  return (
    <DashboardProvider>
      <UserDashboardInner />
    </DashboardProvider>
  )
}

export default UserDashboard
