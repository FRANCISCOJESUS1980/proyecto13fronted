import { memo } from 'react'

const MedicalSubmitButton = memo(({ loading }) => {
  return (
    <button
      type='submit'
      disabled={loading}
      className='cf-medico-submit-button'
    >
      <span className={loading ? 'cf-medico-hidden-text' : ''}>
        Guardar Información Médica
        <span className='cf-medico-arrow-right'></span>
      </span>

      {loading && (
        <div className='cf-medico-loader-wrapper'>
          <div className='cf-medico-spinner'></div>
        </div>
      )}

      <div className='cf-medico-progress-container'>
        <div className='cf-medico-progress-indicator'></div>
      </div>
    </button>
  )
})

MedicalSubmitButton.displayName = 'MedicalSubmitButton'

export default MedicalSubmitButton
