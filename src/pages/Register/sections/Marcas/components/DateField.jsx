import { memo } from 'react'
import PropTypes from 'prop-types'

const DateField = memo(({ value, error, onChange }) => {
  return (
    <div className='cf-pr-form-group'>
      <label htmlFor='fecha' className='cf-pr-label'>
        <span className='cf-pr-label-icon cf-pr-date-icon'></span>
        Fecha
      </label>
      <input
        type='date'
        id='fecha'
        name='fecha'
        value={value}
        onChange={(e) => onChange('fecha', e.target.value)}
        max={new Date().toISOString().split('T')[0]}
        className={`cf-pr-input cf-pr-date-input ${error ? 'cf-pr-error' : ''}`}
      />
      {error && (
        <span className='cf-pr-error-message'>
          <span className='cf-pr-error-icon'></span>
          {error}
        </span>
      )}
    </div>
  )
})

DateField.displayName = 'DateField'

DateField.propTypes = {
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default DateField
