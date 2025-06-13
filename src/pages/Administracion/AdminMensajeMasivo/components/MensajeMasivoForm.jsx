import React from 'react'
import FormHeader from './FormHeader'
import FormFields from './FormFields'
import FormActions from './FormActions'
import { useMensajeMasivoOptimized } from '../hooks/useMensajeMasivoOptimized'
import { useNavigationOptimized } from '../hooks/useNavigationOptimized'

const MensajeMasivoForm = React.memo(() => {
  const { animationComplete, enviarMensaje, hasUnsavedChanges } =
    useMensajeMasivoOptimized()
  const { navigateWithConfirmation, handleAuthError } = useNavigationOptimized()

  const handleSubmit = React.useCallback(
    async (e) => {
      e.preventDefault()

      try {
        const success = await enviarMensaje()
        if (!success) {
          return
        }
      } catch (error) {
        if (error.message === 'Token no encontrado') {
          handleAuthError()
        }
      }
    },
    [enviarMensaje, handleAuthError]
  )

  const handleBackToUsers = React.useCallback(() => {
    navigateWithConfirmation('/administracion/usuarios', hasUnsavedChanges, {
      title: '¿Abandonar mensaje?',
      text: 'Perderás los datos que has introducido. ¿Quieres volver a la página de usuarios?',
      confirmButtonText: 'Sí, volver',
      cancelButtonText: 'No, continuar editando'
    })
  }, [navigateWithConfirmation, hasUnsavedChanges])

  return (
    <div
      className={`cf-form-wrapper ${
        animationComplete ? 'cf-form-visible' : ''
      }`}
    >
      <FormHeader />

      <form onSubmit={handleSubmit} className='cf-admin-mensaje-masivo-form'>
        <FormFields />
        <FormActions />
      </form>

      <p className='cf-login-text'>
        <span onClick={handleBackToUsers} className='cf-login-link'>
          Volver a la lista de usuarios
        </span>
      </p>
    </div>
  )
})

MensajeMasivoForm.displayName = 'MensajeMasivoForm'

export default MensajeMasivoForm
