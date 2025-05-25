import React from 'react'

const StatCard = React.memo(({ icon, value, label, iconClass }) => (
  <div className='cf-consentimientos-stat-card'>
    <div className={`cf-consentimientos-stat-icon ${iconClass}`}></div>
    <div className='cf-consentimientos-stat-content'>
      <span className='cf-consentimientos-stat-value'>{value}</span>
      <span className='cf-consentimientos-stat-label'>{label}</span>
    </div>
  </div>
))

StatCard.displayName = 'StatCard'

const ConsentimientosStats = React.memo(({ stats, paginationInfo }) => {
  return (
    <div className='cf-consentimientos-stats'>
      <StatCard
        value={stats.total}
        label='Total consentimientos'
        iconClass='cf-consentimientos-stat-icon-total'
      />
      <StatCard
        value={stats.autorizan}
        label='Autorizan imagen'
        iconClass='cf-consentimientos-stat-icon-autoriza'
      />
      <StatCard
        value={stats.noAutorizan}
        label='No autorizan imagen'
        iconClass='cf-consentimientos-stat-icon-no-autoriza'
      />

      {paginationInfo && paginationInfo.totalPages > 1 && (
        <div className='cf-consentimientos-pagination-info'>
          <span className='cf-consentimientos-pagination-text'>
            Mostrando {paginationInfo.startIndex} - {paginationInfo.endIndex} de{' '}
            {paginationInfo.totalItems} resultados
          </span>
        </div>
      )}
    </div>
  )
})

ConsentimientosStats.displayName = 'ConsentimientosStats'

export default ConsentimientosStats
