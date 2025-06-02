import { memo } from 'react'
import { LoginForm } from '../components/LoginForm'
import { LoginHeader } from '../components/LoginHeader'
import { LoginAnimations } from '../components/LoginAnimations'
import { useLoginLogic } from '../hooks/useLoginLogic'
import './iniciarsesion.css'

const Iniciarsesion = () => {
  const {
    formData,
    isLoading,
    animationComplete,
    handleChange,
    handleSubmit,
    handleRegisterClick,
    mostrarAyuda
  } = useLoginLogic()

  return (
    <div className='login-page'>
      <LoginHeader />
      <LoginAnimations />

      <div
        className={`form-wrapper ${animationComplete ? 'form-visible' : ''}`}
      >
        <div className='logo-wrapper'>
          <div className='dumbbell-logo'></div>
        </div>

        <h2 className='login-heading'>Iniciar Sesión</h2>

        <LoginForm
          formData={formData}
          isLoading={isLoading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <div className='login-actions'>
          <p className='signup-text'>
            ¿No tienes una cuenta?{' '}
            <span onClick={handleRegisterClick} className='signup-link'>
              Regístrate aquí
            </span>
          </p>

          <p className='help-text'>
            <span onClick={mostrarAyuda} className='help-link'>
              ¿Necesitas ayuda?
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default memo(Iniciarsesion)
