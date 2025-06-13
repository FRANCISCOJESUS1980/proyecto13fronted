import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

const AdminCard = React.memo(({ section, index }) => {
  const navigate = useNavigate()
  const { setActiveSection } = useAdmin()

  const handleCardClick = () => {
    setActiveSection(section.title)
    navigate(section.path)
  }

  const getAnimationDelay = (index) => {
    return `${index * 0.1}s`
  }

  return (
    <div
      className={`cf-admin-card cf-admin-card-${section.color}`}
      onClick={handleCardClick}
      style={{ animationDelay: getAnimationDelay(index) }}
    >
      <div className='cf-admin-card-content'>
        <div
          className={`cf-admin-card-icon-container cf-admin-icon-${section.color}`}
        >
          <div
            className={`cf-admin-section-icon cf-admin-${section.icon}-icon`}
          ></div>
        </div>
        <div className='cf-admin-card-info'>
          <h2 className='cf-admin-card-title'>{section.title}</h2>
          <p className='cf-admin-card-description'>{section.description}</p>
        </div>
        <div className='cf-admin-card-arrow'></div>
      </div>
    </div>
  )
})

AdminCard.displayName = 'AdminCard'

export default AdminCard
