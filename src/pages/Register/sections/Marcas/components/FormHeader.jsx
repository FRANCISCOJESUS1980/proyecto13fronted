import { memo } from 'react'
import PropTypes from 'prop-types'

const FormHeader = memo(({ isEditing, onCancel }) => {
  return (
    <div className='cf-pr-header'>
      <div className='cf-pr-title-container'>
        <div className='cf-pr-form-icon'></div>
        <h3 className='cf-pr-title'>
          {isEditing ? 'Editar Marca Personal' : 'Nueva Marca Personal'}
        </h3>
      </div>
      <button
        type='button'
        className='cf-pr-close-btn'
        onClick={onCancel}
        aria-label='Cerrar formulario'
      >
        <span className='cf-pr-close-icon'></span>
      </button>
    </div>
  )
})

FormHeader.displayName = 'FormHeader'

FormHeader.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default FormHeader
