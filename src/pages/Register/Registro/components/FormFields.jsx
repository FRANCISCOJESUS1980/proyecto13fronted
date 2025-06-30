import { memo } from 'react'
import PropTypes from 'prop-types'
import { RoleField } from './RoleField'

export const FormFields = memo(
  ({ formData, isVerifyingCode, handleChange }) => {
    return (
      <div className='cf-input-wrapper'>
        <div className='cf-input-field'>
          <span className='cf-input-icon cf-user-icon'></span>
          <input
            type='text'
            name='nombre'
            placeholder='Nombre'
            value={formData.nombre}
            onChange={handleChange}
            required
            className='cf-text-input'
            autoComplete='name'
          />
        </div>

        <div className='cf-input-field'>
          <span className='cf-input-icon cf-email-icon'></span>
          <input
            type='email'
            name='email'
            placeholder='Correo electrónico'
            value={formData.email}
            onChange={handleChange}
            required
            className='cf-text-input'
            autoComplete='email'
          />
        </div>

        <div className='cf-input-field'>
          <span className='cf-input-icon cf-lock-icon'></span>
          <input
            type='password'
            name='password'
            placeholder='Contraseña'
            value={formData.password}
            onChange={handleChange}
            required
            className='cf-text-input'
            autoComplete='new-password'
          />
        </div>

        <div className='cf-input-field'>
          <span className='cf-input-icon cf-key-icon'></span>
          <input
            type='text'
            name='codigoAutorizacion'
            placeholder='Código de acceso (opcional)'
            value={formData.codigoAutorizacion}
            onChange={handleChange}
            className='cf-text-input'
            autoComplete='off'
          />
          {isVerifyingCode && (
            <div className='cf-verifying-indicator'>
              <span>Verificando...</span>
            </div>
          )}
        </div>

        <RoleField formData={formData} />
      </div>
    )
  }
)

FormFields.propTypes = {
  formData: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    rol: PropTypes.string.isRequired,
    codigoAutorizacion: PropTypes.string.isRequired
  }).isRequired,
  isVerifyingCode: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired
}

FormFields.displayName = 'FormFields'
