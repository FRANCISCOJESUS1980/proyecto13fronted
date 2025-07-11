import React from 'react'
import { Users, CheckCircle, XCircle, FileSignature } from 'lucide-react'

const StatCard = React.memo(
  ({ icon: Icon, value, label, iconClass, trend }) => (
    <div className='cf-consentimientos-stat-card'>
      <div className={`cf-consentimientos-stat-icon ${iconClass}`}>
        <Icon size={24} />
      </div>
      <div className='cf-consentimientos-stat-content'>
        <span className='cf-consentimientos-stat-value'>{value}</span>
        <span className='cf-consentimientos-stat-label'>{label}</span>
        {trend && (
          <span className='cf-consentimientos-stat-trend'>{trend}</span>
        )}
      </div>
    </div>
  )
)

StatCard.displayName = 'StatCard'

const ConsentimientosStats = React.memo(({ stats, paginationInfo }) => {
  const conFirma = stats.total - (stats.sinFirma || 0)
  const porcentajeAutorizan =
    stats.total > 0 ? Math.round((stats.autorizan / stats.total) * 100) : 0

  return (
    <div className='cf-consentimientos-stats'>
      <StatCard
        icon={Users}
        value={stats.total}
        label='Total consentimientos'
        iconClass='cf-consentimientos-stat-icon-total'
      />
      <StatCard
        icon={CheckCircle}
        value={stats.autorizan}
        label='Autorizan imagen'
        iconClass='cf-consentimientos-stat-icon-autoriza'
        trend={`${porcentajeAutorizan}%`}
      />
      <StatCard
        icon={XCircle}
        value={stats.noAutorizan}
        label='No autorizan imagen'
        iconClass='cf-consentimientos-stat-icon-no-autoriza'
        trend={`${100 - porcentajeAutorizan}%`}
      />
      <StatCard
        icon={FileSignature}
        value={conFirma}
        label='Con firma digital'
        iconClass='cf-consentimientos-stat-icon-firma'
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
