import React from 'react'
import DashboardCard from './DashboardCard'
import { useSectionData } from '../hooks/useSectionData'

const DashboardSections = React.memo(() => {
  const { sectionData } = useSectionData()

  return (
    <div className='cf-dash-sections'>
      {sectionData.map((section, index) => (
        <DashboardCard
          key={`${section.title}-${index}`}
          section={section}
          index={index}
        />
      ))}
    </div>
  )
})

DashboardSections.displayName = 'DashboardSections'

export default DashboardSections
