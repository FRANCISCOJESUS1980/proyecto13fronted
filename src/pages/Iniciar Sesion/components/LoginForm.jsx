import { memo } from 'react'
import PropTypes from 'prop-types'

export const LoginForm = memo(
  ({ formData, isLoading, handleChange, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit} className='login-form'>
        <div className='input-wrapper'>
          <div className='input-field'>
            <span className='input-icon user-icon'></span>
            <input
              type='email'
              name='email'
              placeholder='Correo electrónico'
              value={formData.email}
              onChange={handleChange}
              required
              className='text-input'
              autoComplete='email'
            />
          </div>

          <div className='input-field'>
            <span className='input-icon lock-icon'></span>
            <input
              type='password'
              name='password'
              placeholder='Contraseña'
              value={formData.password}
              onChange={handleChange}
              required
              className='text-input'
              autoComplete='current-password'
            />
          </div>
        </div>

        <button type='submit' disabled={isLoading} className='submit-button'>
          <span className={isLoading ? 'hidden-text' : ''}>
            Iniciar Sesión
            <span className='arrow-right'></span>
          </span>

          {isLoading && (
            <div className='loader-wrapper'>
              <div className='spinner'></div>
            </div>
          )}

          <div className='progress-container'>
            <div className='progress-indicator'></div>
          </div>
        </button>
      </form>
    )
  }
)

LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'
