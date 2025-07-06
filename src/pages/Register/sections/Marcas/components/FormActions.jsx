import { memo } from 'react'
import PropTypes from 'prop-types'

const FormActions = memo(({ isEditing, onCancel, onSubmit }) => {
  return (
    <div className='cf-pr-form-actions'>
      <button type='button' onClick={onCancel} className='cf-pr-cancel-btn'>
        <span className='cf-pr-cancel-icon'></span>
        Cancelar
      </button>
      <button type='submit' className='cf-pr-submit-btn'>
        <span
          className={`cf-pr-submit-icon ${
            isEditing ? 'cf-pr-edit-icon' : 'cf-pr-save-icon'
          }`}
        ></span>
        {isEditing ? 'Actualizar' : 'Guardar'}
      </button>
    </div>
  )
})

FormActions.displayName = 'FormActions'

FormActions.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default FormActions
