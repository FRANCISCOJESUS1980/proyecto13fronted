import React from 'react'
import Button from '../../../../components/Button/Button'
import { useMensajeMasivoOptimized } from '../hooks/useMensajeMasivoOptimized'
import { useNavigationOptimized } from '../hooks/useNavigationOptimized'

const FormActions = React.memo(() => {
  const { enviando, isFormValid, hasUnsavedChanges } =
    useMensajeMasivoOptimized()
  const { navigateWithConfirmation } = useNavigationOptimized()

  const handleCancel = React.useCallback(() => {
    navigateWithConfirmation('/administracion/usuarios', hasUnsavedChanges, {
      title: '¿Abandonar mensaje?',
      text: 'Perderás los datos que has introducido. ¿Quieres volver a la página de usuarios?',
      confirmButtonText: 'Sí, volver',
      cancelButtonText: 'No, continuar editando'
    })
  }, [navigateWithConfirmation, hasUnsavedChanges])

  return (
    <div className='cf-button-container'>
      <Button
        type='button'
        variant='secondary'
        onClick={handleCancel}
        disabled={enviando}
        className='cf-secondary-button'
      >
        Cancelar
      </Button>

      <Button
        type='submit'
        variant='primary'
        disabled={enviando || !isFormValid}
        className='cf-submit-button'
        rightIcon={
          enviando ? (
            <div className='cf-loader-wrapper'>
              <div className='cf-spinner'></div>
            </div>
          ) : (
            <span className='cf-arrow-right'></span>
          )
        }
      >
        <span className={enviando ? 'cf-hidden-text' : ''}>Enviar a todos</span>

        {enviando && (
          <div className='cf-loader-wrapper'>
            <div className='cf-spinner'></div>
          </div>
        )}

        <div className='cf-progress-container'>
          <div className='cf-progress-indicator'></div>
        </div>
      </Button>
    </div>
  )
})

FormActions.displayName = 'FormActions'

export default FormActions
