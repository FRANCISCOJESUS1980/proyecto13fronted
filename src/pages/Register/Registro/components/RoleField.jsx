import { memo } from 'react'
import PropTypes from 'prop-types'

export const RoleField = memo(({ formData }) => {
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'admin':
        return 'Administrador'
      case 'entrenador':
      case 'monitor':
        return 'Entrenador'
      default:
        return 'Usuario'
    }
  }

  return (
    <div className='cf-input-field cf-role-field'>
      <span className='cf-input-icon cf-badge-icon'></span>
      <input
        type='text'
        name='rol'
        value={formData.rol}
        readOnly
        className='cf-text-input cf-role-input'
      />
      <div className='cf-role-badge'>{getRoleDisplayName(formData.rol)}</div>
    </div>
  )
})

RoleField.propTypes = {
  formData: PropTypes.shape({
    rol: PropTypes.string.isRequired
  }).isRequired
}

RoleField.displayName = 'RoleField'
