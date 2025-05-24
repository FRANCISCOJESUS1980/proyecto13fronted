import { memo } from 'react'

const FormActions = memo(({ isSubmitting, onCancel }) => {
  return (
    <>
      <button
        type='submit'
        disabled={isSubmitting}
        className='cf-edit-user-submit-button'
      >
        <span className={isSubmitting ? 'cf-edit-user-hidden-text' : ''}>
          Actualizar Perfil
          <span className='cf-edit-user-arrow-right'></span>
        </span>

        {isSubmitting && (
          <div className='cf-edit-user-loader-wrapper'>
            <div className='cf-edit-user-spinner'></div>
          </div>
        )}

        <div className='cf-edit-user-progress-container'>
          <div className='cf-edit-user-progress-indicator'></div>
        </div>
      </button>

      <button
        type='button'
        onClick={onCancel}
        className='cf-edit-user-cancel-button'
      >
        Cancelar
      </button>
    </>
  )
})

FormActions.displayName = 'FormActions'

export default FormActions
