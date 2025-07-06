import { memo } from 'react'
import PropTypes from 'prop-types'
import { CHART_TYPES } from '../constants/personalRecordsConstants.js'

const ChartControls = memo(
  ({
    selectedExercise,
    chartType,
    uniqueExercises,
    onExerciseChange,
    onChartTypeChange,
    isMobile
  }) => {
    return (
      <div
        className={`cf-chart-controls ${
          isMobile ? 'cf-chart-controls-mobile' : ''
        }`}
      >
        <div className='cf-chart-select-container'>
          <label htmlFor='exercise-select'>Ejercicio:</label>
          <select
            id='exercise-select'
            value={selectedExercise}
            onChange={(e) => onExerciseChange(e.target.value)}
            className='cf-chart-select'
          >
            {uniqueExercises.map((exercise) => (
              <option key={exercise} value={exercise}>
                {exercise}
              </option>
            ))}
          </select>
        </div>

        <div className='cf-chart-type-selector'>
          <button
            className={`cf-chart-type-btn ${
              chartType === CHART_TYPES.LINE ? 'cf-active' : ''
            }`}
            onClick={() => onChartTypeChange(CHART_TYPES.LINE)}
          >
            {isMobile ? 'L' : 'Línea'}
          </button>
          <button
            className={`cf-chart-type-btn ${
              chartType === CHART_TYPES.BAR ? 'cf-active' : ''
            }`}
            onClick={() => onChartTypeChange(CHART_TYPES.BAR)}
          >
            {isMobile ? 'B' : 'Barras'}
          </button>
        </div>
      </div>
    )
  }
)

ChartControls.displayName = 'ChartControls'

ChartControls.propTypes = {
  selectedExercise: PropTypes.string.isRequired,
  chartType: PropTypes.string.isRequired,
  uniqueExercises: PropTypes.array.isRequired,
  onExerciseChange: PropTypes.func.isRequired,
  onChartTypeChange: PropTypes.func.isRequired,
  isMobile: PropTypes.bool
}

export default ChartControls
