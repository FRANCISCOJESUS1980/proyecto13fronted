import { memo } from 'react'
import PropTypes from 'prop-types'

export const SubmitButton = memo(({ isLoading }) => {
  return (
    <button type='submit' disabled={isLoading} className='cf-submit-button'>
      <span className={isLoading ? 'cf-hidden-text' : ''}>
        Registrarse
        <span className='cf-arrow-right'></span>
      </span>

      {isLoading && (
        <div className='cf-loader-wrapper'>
          <div className='cf-spinner'></div>
        </div>
      )}

      <div className='cf-progress-container'>
        <div className='cf-progress-indicator'></div>
      </div>
    </button>
  )
})

SubmitButton.propTypes = {
  isLoading: PropTypes.bool.isRequired
}

SubmitButton.displayName = 'SubmitButton'
