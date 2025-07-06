import { memo } from 'react'
import PropTypes from 'prop-types'
import { EJERCICIOS_COMUNES } from '../constants/personalRecordsConstants.js'

const ExerciseField = memo(
  ({ value, customExercise, error, onChange, onToggleCustom }) => {
    return (
      <div className='cf-pr-form-group'>
        <label htmlFor='ejercicio-select' className='cf-pr-label'>
          <span className='cf-pr-label-icon cf-pr-exercise-icon'></span>
          Ejercicio
        </label>
        <div className='cf-pr-input-container'>
          {!customExercise ? (
            <div className='cf-pr-select-wrapper'>
              <select
                id='ejercicio-select'
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`cf-pr-select ${error ? 'cf-pr-error' : ''}`}
              >
                <option value=''>Selecciona un ejercicio</option>
                {EJERCICIOS_COMUNES.map((ejercicio) => (
                  <option key={ejercicio} value={ejercicio}>
                    {ejercicio}
                  </option>
                ))}
                <option value='custom'>Otro (personalizado)</option>
              </select>
              <span className='cf-pr-select-arrow'></span>
            </div>
          ) : (
            <input
              type='text'
              id='ejercicio'
              name='ejercicio'
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder='Escribe el nombre del ejercicio'
              className={`cf-pr-input ${error ? 'cf-pr-error' : ''}`}
            />
          )}
          {customExercise && (
            <button
              type='button'
              className='cf-pr-select-list-btn'
              onClick={() => onToggleCustom(false)}
            >
              <span className='cf-pr-list-icon'></span>
              Seleccionar de la lista
            </button>
          )}
        </div>
        {error && (
          <span className='cf-pr-error-message'>
            <span className='cf-pr-error-icon'></span>
            {error}
          </span>
        )}
      </div>
    )
  }
)

ExerciseField.displayName = 'ExerciseField'

ExerciseField.propTypes = {
  value: PropTypes.string.isRequired,
  customExercise: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onToggleCustom: PropTypes.func.isRequired
}

export default ExerciseField
