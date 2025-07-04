import { TREND_TYPES } from '../constants/progressConstants.js'

const TrendIcon = ({ trend }) => {
  switch (trend) {
    case TREND_TYPES.AUMENTO:
      return (
        <span className='cf-progreso-trend-icon cf-progreso-trend-up'></span>
      )
    case TREND_TYPES.DISMINUCION:
      return (
        <span className='cf-progreso-trend-icon cf-progreso-trend-down'></span>
      )
    default:
      return (
        <span className='cf-progreso-trend-icon cf-progreso-trend-stable'></span>
      )
  }
}

export default TrendIcon
