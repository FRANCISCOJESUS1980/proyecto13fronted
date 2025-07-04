import {
  safeToFixed,
  getTrendClass,
  getTrendLabel,
  getMeasureUnit
} from '../utils/chartUtils.js'
import TrendIcon from './TrendIcon.jsx'

const TrendsAnalysis = ({ trendsData, selectedMedida }) => {
  if (!trendsData) return null

  const unit = getMeasureUnit(selectedMedida)

  return (
    <div className='cf-progreso-tendencias-card'>
      <h3 className='cf-progreso-tendencias-title'>
        <span className='cf-progreso-analysis-icon'></span>
        Análisis de Tendencias
      </h3>
      <div className='cf-progreso-tendencias-grid'>
        <div className='cf-progreso-tendencia-item'>
          <div className='cf-progreso-tendencia-label'>
            <span className='cf-progreso-tendencia-icon cf-progreso-direction-icon'></span>
            Tendencia:
          </div>
          <div
            className={`cf-progreso-tendencia-value ${getTrendClass(
              trendsData.tendencia
            )}`}
          >
            <TrendIcon trend={trendsData.tendencia} />
            {getTrendLabel(trendsData.tendencia)}
          </div>
        </div>

        <div className='cf-progreso-tendencia-item'>
          <div className='cf-progreso-tendencia-label'>
            <span className='cf-progreso-tendencia-icon cf-progreso-change-icon'></span>
            Cambio total:
          </div>
          <div className='cf-progreso-tendencia-value'>
            {trendsData.diferencia > 0 ? '+' : ''}
            {safeToFixed(trendsData.diferencia)} {unit}
          </div>
        </div>

        <div className='cf-progreso-tendencia-item'>
          <div className='cf-progreso-tendencia-label'>
            <span className='cf-progreso-tendencia-icon cf-progreso-rate-icon'></span>
            Tasa de cambio:
          </div>
          <div className='cf-progreso-tendencia-value'>
            {trendsData.tasaCambio > 0 ? '+' : ''}
            {safeToFixed(trendsData.tasaCambio)} {trendsData.unidad || ''}
          </div>
        </div>

        <div className='cf-progreso-tendencia-item'>
          <div className='cf-progreso-tendencia-label'>
            <span className='cf-progreso-tendencia-icon cf-progreso-calendar-icon'></span>
            Período analizado:
          </div>
          <div className='cf-progreso-tendencia-value'>
            {trendsData.valores && trendsData.valores.length > 0
              ? `${new Date(
                  trendsData.valores[0].fecha
                ).toLocaleDateString()} - 
                 ${new Date(
                   trendsData.valores[trendsData.valores.length - 1].fecha
                 ).toLocaleDateString()}`
              : 'N/A'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrendsAnalysis
