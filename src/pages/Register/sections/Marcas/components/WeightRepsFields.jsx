import { memo } from 'react'
import PropTypes from 'prop-types'

const WeightRepsFields = memo(
  ({ peso, repeticiones, pesoError, repeticionesError, onChange }) => {
    return (
      <div className='cf-pr-form-row'>
        <div className='cf-pr-form-group'>
          <label htmlFor='peso' className='cf-pr-label'>
            <span className='cf-pr-label-icon cf-pr-weight-icon'></span>
            Peso (kg)
          </label>
          <div className='cf-pr-input-wrapper'>
            <input
              type='number'
              id='peso'
              name='peso'
              value={peso}
              onChange={(e) => onChange('peso', e.target.value)}
              min='0'
              step='0.5'
              className={`cf-pr-input ${pesoError ? 'cf-pr-error' : ''}`}
            />
            <span className='cf-pr-input-unit'>kg</span>
          </div>
          {pesoError && (
            <span className='cf-pr-error-message'>
              <span className='cf-pr-error-icon'></span>
              {pesoError}
            </span>
          )}
        </div>

        <div className='cf-pr-form-group'>
          <label htmlFor='repeticiones' className='cf-pr-label'>
            <span className='cf-pr-label-icon cf-pr-reps-icon'></span>
            Repeticiones
          </label>
          <input
            type='number'
            id='repeticiones'
            name='repeticiones'
            value={repeticiones}
            onChange={(e) => onChange('repeticiones', e.target.value)}
            min='1'
            className={`cf-pr-input ${repeticionesError ? 'cf-pr-error' : ''}`}
          />
          {repeticionesError && (
            <span className='cf-pr-error-message'>
              <span className='cf-pr-error-icon'></span>
              {repeticionesError}
            </span>
          )}
        </div>
      </div>
    )
  }
)

WeightRepsFields.displayName = 'WeightRepsFields'

WeightRepsFields.propTypes = {
  peso: PropTypes.string.isRequired,
  repeticiones: PropTypes.string.isRequired,
  pesoError: PropTypes.string,
  repeticionesError: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default WeightRepsFields
