import React from 'react'
import SectionIcon from './Sectionicon'
import { useNavigationDashboard } from '../hooks/useNavigationDashboard'

const DashboardCard = React.memo(({ section, index }) => {
  const { navigateToSection } = useNavigationDashboard()

  const handleClick = React.useCallback(() => {
    navigateToSection(section.path)
  }, [navigateToSection, section.path])

  const getAnimationDelay = React.useCallback((index) => {
    return `${index * 0.1}s`
  }, [])

  return (
    <div
      className={`cf-dash-card cf-dash-card-${section.color}`}
      onClick={handleClick}
      style={{ animationDelay: getAnimationDelay(index) }}
    >
      <div className='cf-dash-card-content'>
        <div
          className={`cf-dash-card-icon-container cf-dash-icon-${section.color}`}
        >
          <SectionIcon iconType={section.icon} />
        </div>
        <div className='cf-dash-card-info'>
          <h2 className='cf-dash-card-title'>{section.title}</h2>
          <p className='cf-dash-card-description'>{section.description}</p>
        </div>
        {section.badge && (
          <div className='cf-dash-notification-badge'>
            <span>{section.badge}</span>
          </div>
        )}
        <div
          className={`cf-dash-card-arrow cf-dash-arrow-${section.color}`}
        ></div>
      </div>
    </div>
  )
})

DashboardCard.displayName = 'DashboardCard'

export default DashboardCard
