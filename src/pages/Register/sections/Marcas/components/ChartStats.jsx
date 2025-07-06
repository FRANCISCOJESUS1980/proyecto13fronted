import { memo } from 'react'
import PropTypes from 'prop-types'

const ChartStats = memo(({ chartData, chartStats, isMobile }) => {
  return (
    <div
      className={`cf-chart-stats ${isMobile ? 'cf-chart-stats-mobile' : ''}`}
    >
      <div className='cf-stat-card'>
        <div className='cf-stat-label'>{isMobile ? 'Prom.' : 'Promedio'}</div>
        <div className='cf-stat-value'>{chartStats.avgWeight} kg</div>
      </div>
      <div className='cf-stat-card'>
        <div className='cf-stat-label'>{isMobile ? 'Máx.' : 'Máximo'}</div>
        <div className='cf-stat-value'>
          {Math.max(...chartData.map((item) => item.peso))} kg
        </div>
      </div>
      <div className='cf-stat-card'>
        <div className='cf-stat-label'>Progreso</div>
        <div
          className={`cf-stat-value ${
            chartStats.progressPercentage >= 0 ? 'cf-positive' : 'cf-negative'
          }`}
        >
          {chartStats.progressPercentage !== null
            ? `${chartStats.progressPercentage}%`
            : 'N/A'}
        </div>
      </div>
    </div>
  )
})

ChartStats.displayName = 'ChartStats'

ChartStats.propTypes = {
  chartData: PropTypes.array.isRequired,
  chartStats: PropTypes.object.isRequired,
  isMobile: PropTypes.bool
}

export default ChartStats
